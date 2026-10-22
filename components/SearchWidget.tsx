"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faBed,
  faUmbrellaBeach,
  faTaxi,
  faCarSide,
  faShieldHeart,
  faMagnifyingGlass,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { whatsappLink } from "@/lib/site";

type TabId = "vols" | "hotels" | "sejours" | "transferts" | "voiture" | "assurance";

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  options?: string[];
  required?: boolean;
  col: string;
};

const tabs: { id: TabId; label: string; icon: IconDefinition }[] = [
  { id: "vols", label: "Vols", icon: faPlane },
  { id: "hotels", label: "Hôtels", icon: faBed },
  { id: "sejours", label: "Séjours", icon: faUmbrellaBeach },
  { id: "transferts", label: "Transferts", icon: faTaxi },
  { id: "voiture", label: "Voiture", icon: faCarSide },
  { id: "assurance", label: "Assurance", icon: faShieldHeart },
];

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-nuit/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-nuit placeholder:text-nuit/40 focus:border-azur focus:ring-2 focus:ring-azur/15";

const fieldsByTab: Record<TabId, Field[]> = {
  vols: [
    { name: "Départ", label: "Départ", defaultValue: "Bangui", col: "sm:col-span-3" },
    { name: "Destination", label: "Destination", placeholder: "Douala, Paris, Dakar…", required: true, col: "sm:col-span-3" },
    { name: "Date de départ", label: "Date de départ", type: "date", required: true, col: "sm:col-span-2" },
    { name: "Date de retour", label: "Date de retour", type: "date", col: "sm:col-span-2" },
    { name: "Voyageurs", label: "Voyageurs", type: "number", defaultValue: "1", col: "sm:col-span-1" },
    { name: "Classe", label: "Classe", options: ["Économique", "Affaires", "Première"], col: "sm:col-span-1" },
  ],
  hotels: [
    { name: "Ville", label: "Ville ou hôtel", placeholder: "Douala, Paris…", required: true, col: "sm:col-span-4" },
    { name: "Arrivée", label: "Arrivée", type: "date", required: true, col: "sm:col-span-2" },
    { name: "Départ", label: "Départ", type: "date", required: true, col: "sm:col-span-2" },
    { name: "Voyageurs", label: "Voyageurs", type: "number", defaultValue: "1", col: "sm:col-span-2" },
    { name: "Chambres", label: "Chambres", type: "number", defaultValue: "1", col: "sm:col-span-2" },
  ],
  sejours: [
    { name: "Destination", label: "Destination souhaitée", placeholder: "Maroc, Turquie, Europe…", required: true, col: "sm:col-span-4" },
    { name: "Période", label: "Période souhaitée", type: "month", col: "sm:col-span-2" },
    { name: "Voyageurs", label: "Voyageurs", type: "number", defaultValue: "2", col: "sm:col-span-2" },
    { name: "Budget par personne", label: "Budget par personne", options: ["À définir", "Moins de 500 000 FCFA", "500 000 – 1 000 000 FCFA", "Plus de 1 000 000 FCFA"], col: "sm:col-span-2" },
    { name: "Thème", label: "Type de séjour", options: ["Découverte", "Balnéaire", "Culture", "Affaires", "Famille"], col: "sm:col-span-2" },
  ],
  transferts: [
    { name: "Lieu de prise en charge", label: "Prise en charge", placeholder: "Aéroport de Bangui…", required: true, col: "sm:col-span-4" },
    { name: "Destination", label: "Adresse de destination", placeholder: "Hôtel, quartier…", required: true, col: "sm:col-span-4" },
    { name: "Date", label: "Date", type: "date", required: true, col: "sm:col-span-2" },
    { name: "Heure", label: "Heure", type: "time", col: "sm:col-span-2" },
    { name: "Voyageurs", label: "Voyageurs", type: "number", defaultValue: "1", col: "sm:col-span-2" },
    { name: "Bagages", label: "Bagages", options: ["Cabine seulement", "1 valise", "2 valises et plus"], col: "sm:col-span-2" },
  ],
  voiture: [
    { name: "Ville", label: "Ville de prise en charge", defaultValue: "Bangui", required: true, col: "sm:col-span-4" },
    { name: "Début", label: "Date de début", type: "date", required: true, col: "sm:col-span-2" },
    { name: "Fin", label: "Date de fin", type: "date", required: true, col: "sm:col-span-2" },
    { name: "Catégorie", label: "Type de véhicule", options: ["Citadine", "Berline", "4x4 / SUV", "Utilitaire", "Avec chauffeur"], col: "sm:col-span-4" },
    { name: "Déplacement", label: "Usage prévu", placeholder: "Ville, mission, transfert…", col: "sm:col-span-4" },
  ],
  assurance: [
    { name: "Destination", label: "Destination", required: true, col: "sm:col-span-4" },
    { name: "Départ", label: "Date de départ", type: "date", required: true, col: "sm:col-span-2" },
    { name: "Retour", label: "Date de retour", type: "date", required: true, col: "sm:col-span-2" },
    { name: "Voyageurs", label: "Voyageurs", type: "number", defaultValue: "1", col: "sm:col-span-2" },
    { name: "Couverture", label: "Couverture", options: ["Visa / ambassade", "Voyage standard", "Séjour longue durée", "Famille"], col: "sm:col-span-4" },
    { name: "Âge des voyageurs", label: "Âge des voyageurs", placeholder: "Ex. 34, 41, 8 ans", col: "sm:col-span-4" },
  ],
};

const buttonLabel: Record<TabId, string> = {
  vols: "Rechercher un vol",
  hotels: "Trouver un hôtel",
  sejours: "Demander un séjour",
  transferts: "Réserver un transfert",
  voiture: "Demander un véhicule",
  assurance: "Demander un devis",
};

export function SearchWidget({ defaultTab = "vols" }: { defaultTab?: TabId }) {
  const [tab, setTab] = useState<TabId>(defaultTab);
  const [trip, setTrip] = useState<"Aller-retour" | "Aller simple">("Aller-retour");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields = fieldsByTab[tab];
    const lines = [`Bonjour FB Travel, je souhaite une demande de ${tabs.find((t) => t.id === tab)?.label.toLowerCase()}.`, ""];

    if (tab === "vols") lines.push(`Trajet : ${trip}`);
    for (const f of fields) {
      if (tab === "vols" && trip === "Aller simple" && f.name === "Date de retour") continue;
      const value = String(data.get(f.name) ?? "").trim();
      if (value) lines.push(`${f.label} : ${value}`);
    }
    lines.push("", "Merci de me confirmer la disponibilité et le tarif.");
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const fields = fieldsByTab[tab];

  return (
    <section
      aria-label="Rechercher un voyage"
      className="rounded-2xl bg-white p-4 shadow-2xl shadow-nuit/25 ring-1 ring-nuit/5 sm:p-6"
    >
      <div role="tablist" aria-label="Type de voyage" className="-mx-1 flex gap-1 overflow-x-auto pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`panneau-${t.id}`}
            id={`onglet-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === t.id ? "bg-nuit text-white" : "text-nuit/70 hover:bg-brume hover:text-nuit"
            }`}
          >
            <FontAwesomeIcon icon={t.icon} className={`h-4 w-4 ${tab === t.id ? "text-soleil-clair" : "text-azur"}`} />
            {t.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        role="tabpanel"
        id={`panneau-${tab}`}
        aria-labelledby={`onglet-${tab}`}
        key={tab}
        className="border-t border-nuit/10 pt-4"
      >
        {tab === "vols" && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {(["Aller-retour", "Aller simple"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={trip === t}
                onClick={() => setTrip(t)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  trip === t ? "border-azur bg-azur text-white" : "border-nuit/20 text-nuit/70 hover:border-azur hover:text-azur"
                }`}
              >
                {t}
              </button>
            ))}
            <span className="ml-auto hidden items-center gap-2 text-xs font-medium text-nuit/55 sm:flex">
              <FontAwesomeIcon icon={faArrowRightArrowLeft} className="h-3 w-3" />
              Au départ de Bangui
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-12">
          {fields.map((f) => {
            const disabled = tab === "vols" && trip === "Aller simple" && f.name === "Date de retour";
            return (
              <label key={f.name} className={`block text-[0.8rem] font-semibold text-nuit/80 ${f.col} ${disabled ? "opacity-40" : ""}`}>
                {f.label}
                {f.options ? (
                  <select name={f.name} className={fieldClass} disabled={disabled} defaultValue={f.options[0]}>
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={f.name}
                    type={f.type ?? "text"}
                    placeholder={f.placeholder}
                    defaultValue={f.defaultValue}
                    required={f.required && !disabled}
                    disabled={disabled}
                    min={f.type === "number" ? 1 : undefined}
                    autoComplete="off"
                    className={fieldClass}
                  />
                )}
              </label>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-md text-xs leading-relaxed text-nuit/60">
            Votre demande s&apos;ouvre dans WhatsApp, prête à envoyer. Un conseiller vous répond avec
            les disponibilités et le tarif.
          </p>
          <button
            type="submit"
            className="inline-flex items-center gap-2.5 rounded-full bg-soleil px-6 py-3 text-sm font-bold text-nuit transition-colors hover:bg-soleil-clair"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4" />
            {buttonLabel[tab]}
          </button>
        </div>
      </form>
    </section>
  );
}
