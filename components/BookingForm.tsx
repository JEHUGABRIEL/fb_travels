"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { whatsappLink } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const field =
  "mt-1.5 w-full rounded border border-nuit/20 bg-white px-3.5 py-3 text-[1rem] text-nuit placeholder:text-nuit/40 focus:border-azur";

const copy = {
  fr: {
    title: "Demander un devis de vol",
    round: "Aller-retour",
    oneWay: "Aller simple",
    tripAria: "Type de trajet",
    from: "Départ",
    to: "Destination",
    toPlaceholder: "Douala, Paris, Dakar…",
    depart: "Date de départ",
    return: "Date de retour",
    travellers: "Voyageurs",
    cabin: "Classe",
    economy: "Économique",
    business: "Affaires",
    note: "Votre demande s'ouvre dans WhatsApp, prête à envoyer. L'agence vous répond avec les vols disponibles et le prix.",
    submit: "Envoyer ma demande",
    greeting: "Bonjour FB Travel, je souhaite un devis pour un billet d'avion.",
    trip: "Trajet",
    fromField: "Départ",
    toField: "Destination",
    departField: "Date de départ",
    returnField: "Date de retour",
    paxField: "Voyageurs",
    cabinField: "Classe",
    toDefine: "à préciser",
  },
  en: {
    title: "Request a flight quote",
    round: "Return",
    oneWay: "One way",
    tripAria: "Type of trip",
    from: "From",
    to: "Destination",
    toPlaceholder: "Douala, Paris, Dakar…",
    depart: "Departure date",
    return: "Return date",
    travellers: "Travellers",
    cabin: "Cabin",
    economy: "Economy",
    business: "Business",
    note: "Your request opens in WhatsApp, ready to send. The agency replies with available flights and the price.",
    submit: "Send my request",
    greeting: "Hello FB Travel, I would like a quote for a flight ticket.",
    trip: "Trip",
    fromField: "From",
    toField: "Destination",
    departField: "Departure date",
    returnField: "Return date",
    paxField: "Travellers",
    cabinField: "Cabin",
    toDefine: "to be specified",
  },
} as const;

export function BookingForm({ locale = "fr" }: { locale?: Locale }) {
  const [trip, setTrip] = useState<"round" | "oneWay">("round");
  const t = copy[locale];
  const returnDisabled = trip === "oneWay";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      t.greeting,
      "",
      `${t.trip} : ${trip === "round" ? t.round : t.oneWay}`,
      `${t.fromField} : ${d.get("from") || "Bangui"}`,
      `${t.toField} : ${d.get("to") || t.toDefine}`,
      `${t.departField} : ${d.get("depart") || t.toDefine}`,
      trip === "round" ? `${t.returnField} : ${d.get("return") || t.toDefine}` : null,
      `${t.paxField} : ${d.get("pax") || "1"}`,
      `${t.cabinField} : ${d.get("cabin") || t.economy}`,
    ].filter((l): l is string => l !== null);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-labelledby="devis-titre"
      className="rounded-sm bg-white p-5 shadow-2xl shadow-nuit/25 ring-1 ring-nuit/10 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="devis-titre" className="flex items-center gap-3 font-display text-2xl font-bold">
          <FontAwesomeIcon icon={faPlaneDeparture} className="h-5 w-5 text-azur" />
          {t.title}
        </h2>
        <div role="radiogroup" aria-label={t.tripAria} className="flex rounded border border-nuit/20 p-1">
          {(["round", "oneWay"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={trip === value}
              onClick={() => setTrip(value)}
              className={`rounded px-4 py-2 text-sm font-semibold transition-colors ${
                trip === value ? "bg-nuit text-white" : "text-nuit hover:bg-brume"
              }`}
            >
              {t[value]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <label className="block text-sm font-semibold lg:col-span-2">
          {t.from}
          <input name="from" defaultValue="Bangui" className={field} autoComplete="off" />
        </label>
        <label className="block text-sm font-semibold lg:col-span-3">
          {t.to}
          <input name="to" placeholder={t.toPlaceholder} className={field} autoComplete="off" required />
        </label>
        <label className="block text-sm font-semibold lg:col-span-2">
          {t.depart}
          <input name="depart" type="date" className={field} required />
        </label>
        <label className={`block text-sm font-semibold lg:col-span-2 ${returnDisabled ? "opacity-40" : ""}`}>
          {t.return}
          <input name="return" type="date" className={field} disabled={returnDisabled} />
        </label>
        <div className="grid grid-cols-[5.5rem_1fr] gap-4 sm:col-span-2 lg:col-span-3">
          <label className="block text-sm font-semibold">
            {t.travellers}
            <input name="pax" type="number" min={1} max={9} defaultValue={1} className={field} />
          </label>
          <label className="block text-sm font-semibold">
            {t.cabin}
            <select name="cabin" className={field} defaultValue={t.economy}>
              <option>{t.economy}</option>
              <option>{t.business}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-sm text-nuit/70">{t.note}</p>
        <button
          type="submit"
          className="inline-flex items-center gap-2.5 rounded bg-nuit px-6 py-3.5 font-bold text-white transition-colors hover:bg-azur"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-soleil-clair" />
          {t.submit}
        </button>
      </div>
    </form>
  );
}
