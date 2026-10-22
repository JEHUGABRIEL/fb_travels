import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { offers, whatsappLink } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Offres de vols et séjours à Bangui",
  description:
    "Bangui – Douala à partir de 285 700 FCFA avec ECAir, -20 % sur les billets RwandAir, devis pour Dakar et Paris.",
  path: "/offres",
  keywords: ["offre vol Bangui Douala", "promotion RwandAir Bangui", "billet avion pas cher Centrafrique"],
});

export default function OffresPage() {
  return (
    <>
      <PageHero
        eyebrow="Offres"
        title="Les offres du moment."
        intro="Des prix de départ au départ de Bangui. Dites-nous vos dates, nous confirmons la disponibilité et le tarif exact."
      />

      <section className="mx-auto max-w-7xl px-5 py-20">
        <ul className="grid gap-5 lg:grid-cols-2">
          {offers.map((o) => (
            <li key={o.id} className="flex flex-col rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-brume px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-azur">
                    {o.airline}
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-extrabold leading-none tracking-tight sm:text-4xl">
                    {o.destination}
                  </h2>
                </div>
                <p className="shrink-0 rounded-xl bg-nuit px-4 py-3 font-display text-xl font-extrabold text-white sm:text-2xl">
                  {o.price}
                </p>
              </div>
              <p className="mt-4 text-lg font-semibold">{o.detail}</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-nuit/65">{o.note}</p>
              <a
                href={whatsappLink(o.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2.5 pt-6 font-bold text-azur hover:text-nuit"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
                Réserver cette offre
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 flex items-start gap-3 text-sm text-nuit/60">
          <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-4 w-4 shrink-0 text-azur" />
          Tarifs de départ, soumis à disponibilité. Le prix final est confirmé par l&apos;agence avant
          toute réservation.
        </p>
      </section>
    </>
  );
}
