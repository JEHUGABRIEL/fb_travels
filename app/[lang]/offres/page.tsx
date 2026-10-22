import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n.server";
import { whatsappLink } from "@/lib/site";

const copy = {
  fr: {
    metaTitle: "Offres de vols et séjours à Bangui",
    metaDescription:
      "Bangui – Douala à partir de 285 700 FCFA avec ECAir, -20 % sur les billets RwandAir, devis pour Dakar et Paris.",
    metaKeywords: ["offre vol Bangui Douala", "promotion RwandAir Bangui", "billet avion pas cher Centrafrique"],
    eyebrow: "Offres",
    title: "Les offres du moment.",
    intro:
      "Des prix de départ au départ de Bangui. Dites-nous vos dates, nous confirmons la disponibilité et le tarif exact.",
    reserve: "Réserver cette offre",
    note: "Tarifs de départ, soumis à disponibilité. Le prix final est confirmé par l'agence avant toute réservation.",
  },
  en: {
    metaTitle: "Flight and trip offers in Bangui",
    metaDescription:
      "Bangui – Douala from XAF 285,700 with ECAir, -20% on RwandAir tickets, quotes for Dakar and Paris.",
    metaKeywords: ["flight offer Bangui Douala", "RwandAir promotion Bangui", "cheap flights Central African Republic"],
    eyebrow: "Offers",
    title: "This season's offers.",
    intro:
      "Starting fares from Bangui. Tell us your dates and we confirm availability and the exact price.",
    reserve: "Book this offer",
    note: "Starting fares, subject to availability. The final price is confirmed by the agency before any booking.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = copy[locale];
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/offres",
    keywords: [...t.metaKeywords],
    locale,
  });
}

export default async function OffresPage() {
  const locale = await getLocale();
  const t = copy[locale];
  const { offers } = getContent(locale);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

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
                {t.reserve}
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 flex items-start gap-3 text-sm text-nuit/60">
          <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-4 w-4 shrink-0 text-azur" />
          {t.note}
        </p>
      </section>
    </>
  );
}
