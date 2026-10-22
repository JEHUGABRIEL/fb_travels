import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCompass, faHotel, faShieldHeart, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { TourGrid } from "@/components/TourGrid";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n.server";
import { localizedHref } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const copy = {
  fr: {
    metaTitle: "Séjours & circuits au départ de Bangui",
    metaDescription:
      "Idées de séjours et circuits au départ de Bangui : Maroc, Paris, Douala, Dakar, Istanbul, Kigali. Programmes ajustés à vos dates et à votre budget.",
    metaKeywords: ["circuit Bangui", "séjour Centrafrique", "voyage organisé Bangui"],
    eyebrow: "Séjours & circuits",
    title: "Voyager, ce n'est pas seulement se déplacer.",
    intro:
      "Un city break, un séjour balnéaire, un voyage d'affaires prolongé : nous construisons le programme autour de vos envies, de votre budget et de votre rythme.",
    ideasEyebrow: "Idées d'itinéraires",
    ideasTitle: "Choisissez un point de départ.",
    ideasIntro:
      "Filtrez par type de séjour, puis demandez le programme détaillé. Tout est ajustable : durée, hôtels, visites et dates.",
    customEyebrow: "Sur mesure",
    customTitle: "Ce que nous prenons en charge.",
    included: [
      {
        title: "Un programme qui vous ressemble",
        text: "Vous nous dites ce que vous aimez voir et le temps dont vous disposez, nous construisons l'itinéraire.",
      },
      {
        title: "Vols et hôtels cohérents",
        text: "Les dates, les transferts et l'hébergement sont réservés ensemble pour éviter les mauvaises surprises.",
      },
      {
        title: "Assurance et formalités",
        text: "Nous vous orientons vers la couverture adaptée et vérifions les documents nécessaires au départ.",
      },
      {
        title: "Accompagnement sur place",
        text: "Guide, visites et transferts peuvent être organisés à la demande, pour les individus comme pour les groupes.",
      },
    ],
    groupTag: "Groupe & affaires",
    businessTitle: "Business Tour Maroc",
    businessText:
      "L'Éveil des Échanges, édition spéciale pour les femmes entrepreneures de Bangui. Billets, hôtels, assurance et accompagnement : un seul interlocuteur pour tout le groupe.",
    businessCta: "Demander le programme",
    contact: "Nous contacter",
    businessMsg: "Bonjour FB Travel, je souhaite des informations sur le Business Tour Maroc.",
  },
  en: {
    metaTitle: "Tours & packages from Bangui",
    metaDescription:
      "Trip and tour ideas from Bangui: Morocco, Paris, Douala, Dakar, Istanbul, Kigali. Programmes tailored to your dates and budget.",
    metaKeywords: ["Bangui tour", "Central African Republic holiday", "organised trip Bangui"],
    eyebrow: "Tours & packages",
    title: "Travel is about more than getting there.",
    intro:
      "A city break, a beach stay, an extended business trip: we build the programme around your interests, budget and pace.",
    ideasEyebrow: "Itinerary ideas",
    ideasTitle: "Choose a starting point.",
    ideasIntro:
      "Filter by type of trip, then ask for the detailed programme. Everything can be adjusted: duration, hotels, visits and dates.",
    customEyebrow: "Tailor-made",
    customTitle: "What we take care of.",
    included: [
      {
        title: "A programme that reflects you",
        text: "Tell us what you would like to see and how much time you have, and we build the itinerary.",
      },
      {
        title: "Flights and hotels that match",
        text: "Dates, transfers and accommodation are booked together to avoid unpleasant surprises.",
      },
      {
        title: "Insurance and formalities",
        text: "We guide you to the right cover and check the documents you need before departure.",
      },
      {
        title: "Local support",
        text: "Guides, visits and transfers can be arranged on request, for individuals and groups alike.",
      },
    ],
    groupTag: "Groups & business",
    businessTitle: "Morocco Business Tour",
    businessText:
      "L'Éveil des Échanges, a special edition for women entrepreneurs from Bangui. Tickets, hotels, insurance and support: one point of contact for the whole group.",
    businessCta: "Request the programme",
    contact: "Contact us",
    businessMsg: "Hello FB Travel, I would like information about the Morocco Business Tour.",
  },
} as const;

const includedIcons = [faCompass, faHotel, faShieldHeart, faMapLocationDot];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = copy[locale];
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/circuits",
    keywords: [...t.metaKeywords],
    locale,
  });
}

export default async function CircuitsPage() {
  const locale = await getLocale();
  const t = copy[locale];
  const { tours, tourCategories } = getContent(locale);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle eyebrow={t.ideasEyebrow} title={t.ideasTitle} intro={t.ideasIntro} align="center" />
        <div className="mt-10">
          <TourGrid tours={tours} categories={tourCategories} locale={locale} />
        </div>
      </section>

      <section className="bg-brume">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle eyebrow={t.customEyebrow} title={t.customTitle} />
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {t.included.map((item, i) => (
              <li key={item.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-azur">
                  <FontAwesomeIcon icon={includedIcons[i]} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-nuit/70">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 rounded-2xl bg-azur p-8 text-white sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-soleil-clair">{t.groupTag}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">{t.businessTitle}</h2>
            <p className="mt-3 max-w-xl text-white/80">{t.businessText}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={whatsappLink(t.businessMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-soleil px-6 py-3.5 font-bold text-nuit transition-colors hover:bg-soleil-clair"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
              {t.businessCta}
            </a>
            <Link
              href={localizedHref(locale, "/contact")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 font-bold transition-colors hover:border-soleil hover:text-soleil"
            >
              {t.contact}
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
