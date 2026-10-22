import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleCheck, faBed, faUsers, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { SearchWidget } from "@/components/SearchWidget";
import { SectionTitle } from "@/components/SectionTitle";
import { HotelGrid } from "@/components/HotelGrid";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n.server";
import { localizedHref } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const copy = {
  fr: {
    metaTitle: "Réservation d'hôtel à Bangui et à l'étranger",
    metaDescription:
      "Réservation d'hôtel pour vos voyages d'affaires, séjours touristiques ou missions à Bangui et à l'étranger. Confirmation avant le départ avec FB Travel And Services.",
    metaKeywords: ["hôtel Bangui", "réservation hôtel Centrafrique", "hôtel voyage d'affaires Bangui"],
    eyebrow: "Hébergement",
    title: "Un hébergement confirmé avant de partir.",
    intro:
      "Séjour touristique, déplacement professionnel ou mission : nous réservons l'hôtel qui correspond à votre budget et à votre emploi du temps.",
    inspirationEyebrow: "Inspiration",
    inspirationTitle: "Des villes, des ambiances, des budgets.",
    inspirationIntro:
      "Quelques exemples de destinations où nous réservons régulièrement. Les adresses exactes sont choisies avec vous, selon les disponibilités.",
    seeFlights: "Voir les vols",
    whyEyebrow: "Avec FB Travel",
    whyTitle: "Pourquoi réserver l'hôtel avec l'agence ?",
    benefits: [
      {
        title: "Une confirmation avant le départ",
        text: "Vous recevez la confirmation de réservation au nom du voyageur, avec les dates et l'adresse exactes.",
      },
      {
        title: "Un hôtel adapté au budget",
        text: "En ville, près de l'aéroport ou du lieu de votre rendez-vous : nous proposons des options dans votre fourchette.",
      },
      {
        title: "Groupes et délégations",
        text: "Plusieurs chambres, des arrivées échelonnées, une seule facture : nous organisons les réservations groupées.",
      },
    ],
    stepsEyebrow: "Comment ça marche",
    stepsTitle: "Trois étapes, une confirmation.",
    stepsIntro:
      "Vous pouvez réserver l'hôtel seul ou avec votre vol. Dans les deux cas, vous gardez le même interlocuteur.",
    steps: [
      { title: "Vous donnez la ville et les dates", text: "Précisez le nombre de voyageurs, de chambres et votre budget." },
      { title: "Nous proposons des options", text: "Nous vérifions la disponibilité et vous présentons les choix." },
      { title: "Nous confirmons la réservation", text: "La confirmation vous est remise avant votre départ." },
    ],
    ctaTitle: "Besoin d'une chambre pour cette semaine ?",
    ctaText:
      "Écrivez-nous avec la ville et les dates : nous vérifions les disponibilités et revenons vers vous rapidement.",
    ctaWhatsapp: "Écrire sur WhatsApp",
    ctaCall: "Nous appeler",
    note: "Les tarifs et disponibilités sont confirmés au moment de la réservation. Aucun paiement n'est demandé sur ce site.",
    whatsappMsg: "Bonjour FB Travel, je souhaite réserver un hôtel.",
  },
  en: {
    metaTitle: "Hotel booking in Bangui and abroad",
    metaDescription:
      "Hotel booking for business travel, holidays or missions in Bangui and abroad. Confirmation before departure with FB Travel And Services.",
    metaKeywords: ["hotel Bangui", "hotel booking Central African Republic", "business hotel Bangui"],
    eyebrow: "Accommodation",
    title: "Accommodation confirmed before you leave.",
    intro:
      "Leisure trip, business travel or mission: we book the hotel that fits your budget and schedule.",
    inspirationEyebrow: "Inspiration",
    inspirationTitle: "Cities, atmospheres, budgets.",
    inspirationIntro:
      "A few examples of destinations where we book regularly. The exact properties are chosen with you, subject to availability.",
    seeFlights: "See flights",
    whyEyebrow: "With FB Travel",
    whyTitle: "Why book your hotel with the agency?",
    benefits: [
      {
        title: "Confirmation before departure",
        text: "You receive the booking confirmation in the traveller's name, with the exact dates and address.",
      },
      {
        title: "A hotel that suits your budget",
        text: "In town, near the airport or near your meeting: we suggest options within your range.",
      },
      {
        title: "Groups and delegations",
        text: "Several rooms, staggered arrivals, one invoice: we arrange group bookings.",
      },
    ],
    stepsEyebrow: "How it works",
    stepsTitle: "Three steps, one confirmation.",
    stepsIntro:
      "You can book the hotel on its own or with your flight. Either way, you keep the same point of contact.",
    steps: [
      { title: "You give us the city and dates", text: "Tell us the number of travellers and rooms, and your budget." },
      { title: "We suggest options", text: "We check availability and present the choices." },
      { title: "We confirm the booking", text: "The confirmation is handed to you before departure." },
    ],
    ctaTitle: "Need a room this week?",
    ctaText:
      "Message us with the city and dates: we check availability and get back to you quickly.",
    ctaWhatsapp: "Message us on WhatsApp",
    ctaCall: "Call us",
    note: "Rates and availability are confirmed at the time of booking. No payment is requested on this website.",
    whatsappMsg: "Hello FB Travel, I would like to book a hotel.",
  },
} as const;

const benefitIcons = [faCalendarCheck, faBed, faUsers];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = copy[locale];
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/hotels",
    keywords: [...t.metaKeywords],
    locale,
  });
}

export default async function HotelsPage() {
  const locale = await getLocale();
  const t = copy[locale];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">
        <SearchWidget defaultTab="hotels" locale={locale} />
      </div>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow={t.inspirationEyebrow}
          title={t.inspirationTitle}
          intro={t.inspirationIntro}
          action={
            <Link
              href={localizedHref(locale, "/vols")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-nuit px-5 py-2.5 text-sm font-bold transition-colors hover:bg-nuit hover:text-white"
            >
              {t.seeFlights}
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-10">
          <HotelGrid locale={locale} />
        </div>
      </section>

      <section className="bg-brume">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle eyebrow={t.whyEyebrow} title={t.whyTitle} align="center" />
          <ul className="mt-12 grid gap-4 lg:grid-cols-3">
            {t.benefits.map((b, i) => (
              <li key={b.title} className="rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brume text-azur">
                  <FontAwesomeIcon icon={benefitIcons[i]} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-nuit/70">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle eyebrow={t.stepsEyebrow} title={t.stepsTitle} />
            <p className="mt-5 text-nuit/70">{t.stepsIntro}</p>
          </div>
          <ol className="lg:col-span-7">
            {t.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-nuit/20 py-7 last:border-b">
                <span className="font-display text-5xl font-extrabold leading-none text-soleil">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-1.5 max-w-lg text-nuit/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-soleil">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{t.ctaTitle}</h2>
            <p className="mt-2 max-w-xl text-nuit/75">{t.ctaText}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={whatsappLink(t.whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-nuit px-6 py-3.5 font-bold text-white transition-colors hover:bg-azur"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-soleil-clair" />
              {t.ctaWhatsapp}
            </a>
            <Link
              href={localizedHref(locale, "/contact")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-nuit px-6 py-3 font-bold transition-colors hover:bg-white/40"
            >
              {t.ctaCall}
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="flex items-start gap-3 text-sm text-nuit/60">
          <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-4 w-4 shrink-0 text-azur" />
          {t.note}
        </p>
      </section>
    </>
  );
}
