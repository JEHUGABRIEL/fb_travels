"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleNotch,
  faTriangleExclamation,
  faPlaneDeparture,
  faArrowRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { cabins, cabinsEn, flightDestinations, flightDestinationsEn } from "@/lib/flights-data";
import type { FlightCabin, FlightOffer } from "@/lib/flights-data";
import { whatsappLink } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "loading" | "done" | "error" | "unconfigured";

type ApiResponse = {
  configured?: boolean;
  offers?: FlightOffer[];
  mode?: "live" | "test";
  error?: string;
};

const field =
  "mt-1.5 w-full rounded-lg border border-nuit/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-nuit placeholder:text-nuit/40 focus:border-azur focus:ring-2 focus:ring-azur/15";

const copy = {
  fr: {
    title: "Rechercher un vol en direct",
    subtitle: "Horaires et tarifs fournis par notre partenaire aérien. Au départ de Bangui (BGF).",
    live: "Temps réel",
    destination: "Destination",
    depart: "Date de départ",
    return: "Date de retour",
    optional: "(option)",
    travellers: "Voyageurs",
    cabin: "Classe",
    search: "Rechercher",
    idle: "Sélectionnez votre destination et vos dates pour afficher les vols disponibles.",
    loading: "Recherche des meilleurs vols…",
    unconfigured: "La recherche en direct n'est pas encore activée.",
    fallback:
      "Pas d'inquiétude : envoyez-nous votre trajet, un conseiller recherche les vols et vous répond avec les options disponibles.",
    request: "Demander une recherche",
    none: "Aucun vol trouvé pour ces dates.",
    noneText:
      "Essayez une autre date ou une destination voisine. Nous pouvons aussi chercher un trajet avec correspondance pour vous.",
    found: (n: number, pax: number) =>
      `${n} option${n > 1 ? "s" : ""} trouvée${n > 1 ? "s" : ""} pour ${pax} voyageur${pax > 1 ? "s" : ""}`,
    test: "Mode test — tarifs de démonstration",
    total: (pax: number) => `total, ${pax} voyageur${pax > 1 ? "s" : ""}`,
    direct: "Direct",
    stops: (n: number) => `${n} escale${n > 1 ? "s" : ""}`,
    book: "Demander à réserver ce vol",
    disclaimer:
      "Tarifs indicatifs, soumis à disponibilité et à confirmation par la compagnie. Le prix final est validé avec l'agence avant l'émission.",
    defaultError: "La recherche de vols est momentanément indisponible.",
    network: "Connexion impossible. Vérifiez votre réseau et réessayez.",
    requestMsg: "Bonjour FB Travel, je souhaite un vol au départ de Bangui.",
    bookMsg: "Bonjour FB Travel, je souhaite réserver ce vol trouvé sur votre site.",
    airline: "Compagnie",
    fare: "Tarif",
    reference: "Référence",
  },
  en: {
    title: "Search live flights",
    subtitle: "Schedules and fares provided by our airline partner. Departing from Bangui (BGF).",
    live: "Live",
    destination: "Destination",
    depart: "Departure date",
    return: "Return date",
    optional: "(optional)",
    travellers: "Travellers",
    cabin: "Cabin",
    search: "Search",
    idle: "Choose your destination and dates to see available flights.",
    loading: "Searching for the best flights…",
    unconfigured: "Live search is not activated yet.",
    fallback:
      "No worries: send us your route and an adviser will look up the flights and reply with the available options.",
    request: "Request a search",
    none: "No flights found for these dates.",
    noneText:
      "Try another date or a nearby destination. We can also look for an itinerary with a connection for you.",
    found: (n: number, pax: number) =>
      `${n} option${n > 1 ? "s" : ""} found for ${pax} traveller${pax > 1 ? "s" : ""}`,
    test: "Test mode — demonstration fares",
    total: (pax: number) => `total, ${pax} traveller${pax > 1 ? "s" : ""}`,
    direct: "Direct",
    stops: (n: number) => `${n} stop${n > 1 ? "s" : ""}`,
    book: "Ask to book this flight",
    disclaimer:
      "Indicative fares, subject to availability and airline confirmation. The final price is confirmed with the agency before ticketing.",
    defaultError: "Flight search is temporarily unavailable.",
    network: "Connection failed. Check your network and try again.",
    requestMsg: "Hello FB Travel, I would like a flight from Bangui.",
    bookMsg: "Hello FB Travel, I would like to book this flight found on your website.",
    airline: "Airline",
    fare: "Fare",
    reference: "Reference",
  },
} as const;

function formatMoney(amount: number, currency: string, locale: Locale) {
  const tag = locale === "fr" ? "fr-FR" : "en-GB";
  try {
    return new Intl.NumberFormat(tag, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString(tag)} ${currency}`;
  }
}

function displayDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.slice(0, 10).split("-");
  return d && m && y ? `${d}/${m}` : "";
}

function displayTime(iso: string) {
  return iso ? iso.slice(11, 16) : "—";
}

export function FlightSearch({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale];
  const destinations = locale === "fr" ? flightDestinations : flightDestinationsEn;
  const cabinOptions = locale === "fr" ? cabins : cabinsEn;
  const [destination, setDestination] = useState<string>(destinations[0].code);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState("1");
  const [cabin, setCabin] = useState<FlightCabin>("economy");
  const [status, setStatus] = useState<Status>("idle");
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [mode, setMode] = useState<"live" | "test">("live");
  const [error, setError] = useState<string | null>(null);

  const destinationLabel = destinations.find((d) => d.code === destination)?.city ?? destination;

  const whatsappFallback = whatsappLink(
    [
      t.requestMsg,
      "",
      `${t.destination} : ${destinationLabel}`,
      departDate ? `${t.depart} : ${departDate}` : null,
      returnDate ? `${t.return} : ${returnDate}` : null,
      `${t.travellers} : ${adults}`,
      `${t.cabin} : ${cabinOptions.find((c) => c.value === cabin)?.label ?? cabin}`,
    ]
      .filter((l): l is string => l !== null)
      .join("\n"),
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    setOffers([]);

    try {
      const response = await fetch("/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: "BGF",
          destination,
          departDate,
          returnDate: returnDate || undefined,
          adults: Number(adults),
          cabin,
        }),
      });
      const data = (await response.json()) as ApiResponse;

      if (data.configured === false) {
        setStatus("unconfigured");
        return;
      }
      if (!response.ok) {
        setError(locale === "en" ? t.defaultError : (data.error ?? t.defaultError));
        setStatus("error");
        return;
      }

      setOffers(data.offers ?? []);
      setMode(data.mode ?? "live");
      setStatus("done");
    } catch {
      setError(t.network);
      setStatus("error");
    }
  }

  return (
    <section
      aria-labelledby="recherche-vols"
      className="rounded-2xl bg-white p-5 shadow-2xl shadow-nuit/20 ring-1 ring-nuit/5 sm:p-7"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="recherche-vols" className="font-display text-2xl font-bold">
            {t.title}
          </h2>
          <p className="mt-1 text-sm text-nuit/60">{t.subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-brume px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-wide text-azur">
          <span className="h-1.5 w-1.5 rounded-full bg-azur" />
          {t.live}
        </span>
      </div>

      <form onSubmit={onSubmit} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <label htmlFor="vol-destination" className="block text-[0.8rem] font-semibold text-nuit/80">
            {t.destination}
          </label>
          <select
            id="vol-destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={field}
          >
            {destinations.map((d) => (
              <option key={d.code} value={d.code}>
                {d.city} ({d.code})
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="vol-depart" className="block text-[0.8rem] font-semibold text-nuit/80">
            {t.depart}
          </label>
          <input
            id="vol-depart"
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            required
            className={field}
          />
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="vol-retour" className="block text-[0.8rem] font-semibold text-nuit/80">
            {t.return} <span className="font-normal text-nuit/45">{t.optional}</span>
          </label>
          <input
            id="vol-retour"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={departDate || undefined}
            className={field}
          />
        </div>
        <div className="lg:col-span-1">
          <label htmlFor="vol-passagers" className="block text-[0.8rem] font-semibold text-nuit/80">
            {t.travellers}
          </label>
          <input
            id="vol-passagers"
            type="number"
            min={1}
            max={9}
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            className={field}
          />
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="vol-classe" className="block text-[0.8rem] font-semibold text-nuit/80">
            {t.cabin}
          </label>
          <select
            id="vol-classe"
            value={cabin}
            onChange={(e) => setCabin(e.target.value as FlightCabin)}
            className={field}
          >
            {cabinOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end lg:col-span-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-soleil px-5 py-2.5 text-sm font-bold text-nuit transition-colors hover:bg-soleil-clair disabled:cursor-wait disabled:opacity-70"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4" />
            {t.search}
          </button>
        </div>
      </form>

      <div aria-live="polite" className="mt-6">
        {status === "idle" && <p className="text-sm text-nuit/55">{t.idle}</p>}

        {status === "loading" && (
          <p className="flex items-center gap-3 text-sm font-semibold text-nuit/70">
            <FontAwesomeIcon icon={faCircleNotch} className="h-4 w-4 animate-spin text-azur" />
            {t.loading}
          </p>
        )}

        {(status === "unconfigured" || status === "error") && (
          <div className="rounded-xl border border-soleil/40 bg-soleil/10 p-5">
            <p className="flex items-start gap-3 font-semibold">
              <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5 h-4 w-4 shrink-0 text-corail" />
              {status === "unconfigured" ? t.unconfigured : error}
            </p>
            <p className="mt-2 text-sm text-nuit/70">{t.fallback}</p>
            <a
              href={whatsappFallback}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-nuit px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-azur"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4 text-soleil-clair" />
              {t.request}
            </a>
          </div>
        )}

        {status === "done" && offers.length === 0 && (
          <div className="rounded-xl border border-nuit/10 bg-brume p-5">
            <p className="font-semibold">{t.none}</p>
            <p className="mt-1 text-sm text-nuit/70">{t.noneText}</p>
            <a
              href={whatsappFallback}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-nuit px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-azur"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4 text-soleil-clair" />
              {t.request}
            </a>
          </div>
        )}

        {status === "done" && offers.length > 0 && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-nuit/70">
                {t.found(offers.length, Number(adults))}
              </p>
              {mode === "test" && (
                <span className="rounded-full bg-soleil/20 px-3 py-1 text-[0.7rem] font-bold text-corail">
                  {t.test}
                </span>
              )}
            </div>
            <ul className="mt-3 space-y-3">
              {offers.map((offer) => (
                <li key={offer.id} className="rounded-xl border border-nuit/10 p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-brume text-azur">
                        {offer.airline.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={offer.airline.logo} alt="" className="h-7 w-7 object-contain" />
                        ) : (
                          <FontAwesomeIcon icon={faPlaneDeparture} className="h-4 w-4" />
                        )}
                      </span>
                      <div>
                        <p className="font-bold leading-tight">{offer.airline.name}</p>
                        <p className="text-xs text-nuit/50">{offer.airline.code}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-extrabold">
                        {formatMoney(offer.price.amount, offer.price.currency, locale)}
                      </p>
                      <p className="text-[0.7rem] text-nuit/50">{t.total(Number(adults))}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-nuit/10 pt-3">
                    {offer.slices.map((slice, i) => (
                      <div
                        key={`${offer.id}-${i}`}
                        className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm"
                      >
                        <p className="font-semibold">
                          {slice.origin}{" "}
                          <FontAwesomeIcon icon={faArrowRight} className="mx-1 h-3 w-3 text-nuit/40" />{" "}
                          {slice.destination}
                        </p>
                        <p className="text-nuit/60">
                          {displayDate(slice.departure)} · {displayTime(slice.departure)} →{" "}
                          {displayTime(slice.arrival)}
                        </p>
                        <p className="text-nuit/60">
                          {slice.stops === 0 ? t.direct : t.stops(slice.stops)}
                          {slice.duration ? ` · ${slice.duration}` : ""}
                        </p>
                        {slice.segments.length > 1 && (
                          <p className="text-xs text-nuit/45">
                            via {slice.segments.slice(0, -1).map((s) => s.to).join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <a
                    href={whatsappLink(
                      [
                        t.bookMsg,
                        "",
                        `${offer.slices[0]?.origin} → ${offer.slices[0]?.destination}`,
                        `${locale === "fr" ? "Aller" : "Outbound"} : ${offer.slices[0]?.departure}`,
                        offer.slices[1]
                          ? `${locale === "fr" ? "Retour" : "Return"} : ${offer.slices[1].departure}`
                          : null,
                        `${t.airline} : ${offer.airline.name}`,
                        `${t.fare} : ${formatMoney(offer.price.amount, offer.price.currency, locale)}`,
                        `${t.reference} : ${offer.id}`,
                        `${t.travellers} : ${adults}`,
                      ]
                        .filter((l): l is string => l !== null)
                        .join("\n"),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-azur hover:text-nuit"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
                    {t.book}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-xs text-nuit/50">
              <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azur" />
              {t.disclaimer}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
