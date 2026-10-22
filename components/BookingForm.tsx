"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { whatsappLink } from "@/lib/site";

const field =
  "mt-1.5 w-full rounded border border-nuit/20 bg-white px-3.5 py-3 text-[1rem] text-nuit placeholder:text-nuit/40 focus:border-azur";

export function BookingForm() {
  const [trip, setTrip] = useState<"Aller-retour" | "Aller simple">("Aller-retour");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      "Bonjour FB Travel, je souhaite un devis pour un billet d'avion.",
      "",
      `Trajet : ${trip}`,
      `Départ : ${d.get("from") || "Bangui"}`,
      `Destination : ${d.get("to") || "à préciser"}`,
      `Date de départ : ${d.get("depart") || "à préciser"}`,
      trip === "Aller-retour" ? `Date de retour : ${d.get("return") || "à préciser"}` : null,
      `Voyageurs : ${d.get("pax") || "1"}`,
      `Classe : ${d.get("cabin") || "Économique"}`,
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
          Demander un devis de vol
        </h2>
        <div role="radiogroup" aria-label="Type de trajet" className="flex rounded border border-nuit/20 p-1">
          {(["Aller-retour", "Aller simple"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={trip === t}
              onClick={() => setTrip(t)}
              className={`rounded px-4 py-2 text-sm font-semibold transition-colors ${
                trip === t ? "bg-nuit text-white" : "text-nuit hover:bg-brume"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <label className="block text-sm font-semibold lg:col-span-2">
          Départ
          <input name="from" defaultValue="Bangui" className={field} autoComplete="off" />
        </label>
        <label className="block text-sm font-semibold lg:col-span-3">
          Destination
          <input name="to" placeholder="Douala, Paris, Dakar…" className={field} autoComplete="off" required />
        </label>
        <label className="block text-sm font-semibold lg:col-span-2">
          Date de départ
          <input name="depart" type="date" className={field} required />
        </label>
        <label
          className={`block text-sm font-semibold lg:col-span-2 ${trip === "Aller simple" ? "opacity-40" : ""}`}
        >
          Date de retour
          <input name="return" type="date" className={field} disabled={trip === "Aller simple"} />
        </label>
        <div className="grid grid-cols-[5.5rem_1fr] gap-4 sm:col-span-2 lg:col-span-3">
          <label className="block text-sm font-semibold">
            Voyageurs
            <input name="pax" type="number" min={1} max={9} defaultValue={1} className={field} />
          </label>
          <label className="block text-sm font-semibold">
            Classe
            <select name="cabin" className={field} defaultValue="Économique">
              <option>Économique</option>
              <option>Affaires</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-sm text-nuit/70">
          Votre demande s'ouvre dans WhatsApp, prête à envoyer. L'agence vous répond avec les vols
          disponibles et le prix.
        </p>
        <button
          type="submit"
          className="inline-flex items-center gap-2.5 rounded bg-nuit px-6 py-3.5 font-bold text-white transition-colors hover:bg-azur"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-soleil-clair" />
          Envoyer ma demande
        </button>
      </div>
    </form>
  );
}
