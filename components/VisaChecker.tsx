"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPassport, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { getContent } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-nuit/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-nuit placeholder:text-nuit/40 focus:border-azur focus:ring-2 focus:ring-azur/15";

const copy = {
  fr: {
    title: "Préparer ma demande",
    intro:
      "Trois informations suffisent pour commencer. Nous vérifions ensuite la liste exacte des pièces avec vous.",
    destination: "Pays de destination",
    destinationPlaceholder: "France, Maroc, Turquie…",
    purpose: "Motif du séjour",
    purposes: ["Tourisme", "Affaires", "Visite familiale", "Études", "Transit"],
    date: "Date de départ envisagée",
    check: "Vérifier les pièces",
    base: "Liste de base",
    visaFor: (d: string) => `Visa pour ${d || "votre destination"}`,
    purposeText: (p: string) =>
      `Motif : ${p.toLowerCase()}. Les pièces demandées varient selon le pays et votre profil : cette liste est un point de départ, pas une garantie.`,
    send: "Envoyer à l'agence",
    modify: "Modifier",
    how: "Comment ça marche",
    howTitle: "Un dossier clair, dès le premier dépôt.",
    steps: [
      "Vous indiquez la destination et le motif du séjour.",
      "Nous listons les pièces demandées par l'ambassade concernée.",
      "Nous vérifions le dossier avec vous avant le dépôt.",
    ],
    privacy: "Aucune donnée n'est enregistrée : votre demande part directement sur WhatsApp.",
    messageGreeting: "Bonjour FB Travel, je prépare une demande de visa.",
    messageDestination: "Destination",
    messagePurpose: "Motif",
    messageDate: "Date de départ",
    messageAsk: "Pouvez-vous vérifier la liste des pièces à fournir ?",
  },
  en: {
    title: "Prepare my application",
    intro:
      "Three details are enough to get started. We then check the exact document list with you.",
    destination: "Destination country",
    destinationPlaceholder: "France, Morocco, Türkiye…",
    purpose: "Purpose of stay",
    purposes: ["Tourism", "Business", "Family visit", "Study", "Transit"],
    date: "Planned departure date",
    check: "Check the documents",
    base: "Basic list",
    visaFor: (d: string) => `Visa for ${d || "your destination"}`,
    purposeText: (p: string) =>
      `Purpose: ${p.toLowerCase()}. Required documents vary by country and profile: this list is a starting point, not a guarantee.`,
    send: "Send to the agency",
    modify: "Edit",
    how: "How it works",
    howTitle: "A clear file from the very first submission.",
    steps: [
      "You tell us the destination and the purpose of your stay.",
      "We list the documents required by the relevant embassy.",
      "We review the file with you before submission.",
    ],
    privacy: "No data is stored: your request goes straight to WhatsApp.",
    messageGreeting: "Hello FB Travel, I am preparing a visa application.",
    messageDestination: "Destination",
    messagePurpose: "Purpose",
    messageDate: "Departure date",
    messageAsk: "Could you check the list of documents required?",
  },
} as const;

export function VisaChecker({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale];
  const { visaDocuments } = getContent(locale);
  const [request, setRequest] = useState<{ destination: string; purpose: string; date: string } | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setRequest({
      destination: String(d.get("destination") ?? "").trim(),
      purpose: String(d.get("purpose") ?? ""),
      date: String(d.get("date") ?? ""),
    });
  }

  const message = request
    ? [
        t.messageGreeting,
        "",
        `${t.messageDestination} : ${request.destination}`,
        `${t.messagePurpose} : ${request.purpose}`,
        request.date ? `${t.messageDate} : ${request.date}` : null,
        "",
        t.messageAsk,
      ]
        .filter((l): l is string => l !== null)
        .join("\n")
    : "";

  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl border border-nuit/10 bg-white shadow-sm lg:grid-cols-2">
      <form onSubmit={onSubmit} className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brume text-azur">
            <FontAwesomeIcon icon={faPassport} className="h-5 w-5" />
          </span>
          <h2 className="font-display text-2xl font-bold">{t.title}</h2>
        </div>
        <p className="mt-3 text-sm text-nuit/65">{t.intro}</p>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-semibold">
            {t.destination}
            <input
              name="destination"
              placeholder={t.destinationPlaceholder}
              className={fieldClass}
              required
              autoComplete="off"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              {t.purpose}
              <select name="purpose" className={fieldClass} defaultValue={t.purposes[0]}>
                {t.purposes.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold">
              {t.date}
              <input name="date" type="date" className={fieldClass} />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-nuit px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-azur"
        >
          <FontAwesomeIcon icon={faPassport} className="h-4 w-4 text-soleil-clair" />
          {t.check}
        </button>
      </form>

      <div className="border-t border-nuit/10 bg-brume p-6 sm:p-8 lg:border-l lg:border-t-0">
        {request ? (
          <>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-azur">{t.base}</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{t.visaFor(request.destination)}</h3>
            <p className="mt-2 text-sm text-nuit/65">{t.purposeText(request.purpose)}</p>
            <ul className="mt-5 space-y-2.5">
              {visaDocuments.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm text-nuit/80">
                  <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-4 w-4 shrink-0 text-azur" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-soleil px-5 py-3 text-sm font-bold text-nuit transition-colors hover:bg-soleil-clair"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
                {t.send}
              </a>
              <button
                type="button"
                onClick={() => setRequest(null)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-nuit/70 hover:text-nuit"
              >
                <FontAwesomeIcon icon={faRotateLeft} className="h-3.5 w-3.5" />
                {t.modify}
              </button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col justify-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-azur">{t.how}</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{t.howTitle}</h3>
            <ol className="mt-5 space-y-4 text-sm">
              {t.steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="font-display text-lg font-extrabold text-soleil">{i + 1}</span>
                  <span className="text-nuit/75">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-start gap-2 text-xs text-nuit/50">
              <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azur" />
              {t.privacy}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
