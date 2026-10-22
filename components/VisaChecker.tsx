"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPassport, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { visaDocuments, whatsappLink } from "@/lib/site";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-nuit/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-nuit placeholder:text-nuit/40 focus:border-azur focus:ring-2 focus:ring-azur/15";

export function VisaChecker() {
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
        "Bonjour FB Travel, je prépare une demande de visa.",
        "",
        `Destination : ${request.destination}`,
        `Motif : ${request.purpose}`,
        request.date ? `Date de départ : ${request.date}` : null,
        "",
        "Pouvez-vous vérifier la liste des pièces à fournir ?",
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
          <h2 className="font-display text-2xl font-bold">Préparer ma demande</h2>
        </div>
        <p className="mt-3 text-sm text-nuit/65">
          Trois informations suffisent pour commencer. Nous vérifions ensuite la liste exacte des
          pièces avec vous.
        </p>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-semibold">
            Pays de destination
            <input
              name="destination"
              placeholder="France, Maroc, Turquie…"
              className={fieldClass}
              required
              autoComplete="off"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Motif du séjour
              <select name="purpose" className={fieldClass} defaultValue="Tourisme">
                {["Tourisme", "Affaires", "Visite familiale", "Études", "Transit"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold">
              Date de départ envisagée
              <input name="date" type="date" className={fieldClass} />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-nuit px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-azur"
        >
          <FontAwesomeIcon icon={faPassport} className="h-4 w-4 text-soleil-clair" />
          Vérifier les pièces
        </button>
      </form>

      <div className="border-t border-nuit/10 bg-brume p-6 sm:p-8 lg:border-l lg:border-t-0">
        {request ? (
          <>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-azur">Liste de base</p>
            <h3 className="mt-2 font-display text-2xl font-bold">
              Visa pour {request.destination || "votre destination"}
            </h3>
            <p className="mt-2 text-sm text-nuit/65">
              Motif : {request.purpose.toLowerCase()}. Les pièces demandées varient selon le pays et
              votre profil : cette liste est un point de départ, pas une garantie.
            </p>
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
                Envoyer à l&apos;agence
              </a>
              <button
                type="button"
                onClick={() => setRequest(null)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-nuit/70 hover:text-nuit"
              >
                <FontAwesomeIcon icon={faRotateLeft} className="h-3.5 w-3.5" />
                Modifier
              </button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col justify-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-azur">Comment ça marche</p>
            <h3 className="mt-2 font-display text-2xl font-bold">Un dossier clair, dès le premier dépôt.</h3>
            <ol className="mt-5 space-y-4 text-sm">
              {[
                "Vous indiquez la destination et le motif du séjour.",
                "Nous listons les pièces demandées par l'ambassade concernée.",
                "Nous vérifions le dossier avec vous avant le dépôt.",
              ].map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="font-display text-lg font-extrabold text-soleil">{i + 1}</span>
                  <span className="text-nuit/75">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-start gap-2 text-xs text-nuit/50">
              <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azur" />
              Aucune donnée n&apos;est enregistrée : votre demande part directement sur WhatsApp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
