import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleCheck,
  faPlaneDeparture,
  faBed,
  faPhone,
  faPassport,
  faFileSignature,
  faSuitcaseRolling,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { HeroSlider } from "@/components/HeroSlider";
import { SearchWidget } from "@/components/SearchWidget";
import { SectionTitle } from "@/components/SectionTitle";
import { DestinationGrid } from "@/components/DestinationGrid";
import { HotelGrid } from "@/components/HotelGrid";
import { RouteMap } from "@/components/RouteMap";
import { Faq } from "@/components/Faq";
import { Testimonials } from "@/components/Testimonials";
import { Partners } from "@/components/Partners";
import { ServiceIcon } from "@/components/ServiceIcon";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { getLocale } from "@/lib/i18n.server";
import { getContent } from "@/lib/content";
import { localizedHref, type Locale } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";

const copy = {
  fr: {
    metaTitle: "Agence de voyage à Bangui",
    metaDescription:
      "FB Travel And Services, agence de voyage à Bangui : billets d'avion, hôtels, circuits, assurance et assistance visa. Devis gratuit et réponse sur WhatsApp.",
    metaKeywords: ["voyage Bangui", "vol Centrafrique", "hôtel Bangui", "agence FB Travel"],
    liveFlights: "Besoin d'horaires et de tarifs en direct ?",
    liveFlightsLink: "Rechercher un vol en direct",
    quickAria: "Services rapides",
    quick: [
      { label: "Visa & formalités", href: "/visa" },
      { label: "Séjours & circuits", href: "/circuits" },
      { label: "Assurance voyage", href: "/services#assurance" },
      { label: "Parler à un conseiller", href: "/contact" },
    ],
    dossierEyebrow: "Dossiers & formalités",
    dossierTitle: "Une réservation pour votre dossier d'ambassade.",
    dossierIntro:
      "Vol et hôtel peuvent être réservés pour compléter un dossier de visa, une autorisation de sortie ou un déplacement professionnel. Dites-nous ce dont vous avez besoin, nous préparons les confirmations.",
    dossierCards: [
      {
        title: "Réservation de vol",
        text: "Un billet ou une réservation de vol pour compléter un dossier, sans mauvaise surprise au dépôt.",
        points: ["Pour une demande de visa", "Pour une autorisation de sortie", "Pour un déplacement professionnel"],
        message: "Bonjour FB Travel, j'ai besoin d'une réservation de vol pour un dossier.",
      },
      {
        title: "Réservation d'hôtel",
        text: "Une confirmation d'hébergement cohérente avec vos dates et votre destination.",
        points: ["Pour une demande de visa", "Pour une autorisation de sortie", "Pour un déplacement professionnel"],
        message: "Bonjour FB Travel, j'ai besoin d'une réservation d'hôtel pour un dossier.",
      },
    ],
    makeRequest: "Faire ma demande",
    destEyebrow: "Depuis Bangui",
    destTitle: "Explorez le monde, sans quitter votre ville.",
    destIntro:
      "Douala, Paris, Dakar, Casablanca, Dubaï : les liaisons que nos clients demandent le plus. Votre destination n'y figure pas ? Demandez-nous, nous cherchons le meilleur trajet.",
    allDest: "Toutes les destinations",
    destNote: "Tarifs de départ, à confirmer selon les dates et la disponibilité. Les demandes de devis sont gratuites.",
    hotelsEyebrow: "Où dormir",
    hotelsTitle: "Un hébergement confirmé avant de partir.",
    hotelsIntro:
      "Séjour touristique, déplacement professionnel ou mission : nous réservons l'hôtel qui correspond à votre budget et à votre emploi du temps.",
    seeHotels: "Voir les hôtels",
    sightsEyebrow: "À voir, à vivre",
    sightsTitle: "Des idées pour votre temps libre.",
    sightsIntro:
      "Un city break, une visite guidée ou une journée hors de la ville : dites-nous ce qui vous ferait plaisir, nous construisons le programme autour de vos dates.",
    seeTours: "Voir les circuits",
    toursEyebrow: "Séjours & circuits",
    toursTitle: "Des itinéraires pensés pour vous.",
    toursIntro:
      "Chaque programme est un point de départ : nous l'ajustons à vos dates, à votre budget et au rythme que vous souhaitez.",
    allTours: "Tous les circuits",
    seeProgramme: "Voir le programme",
    servicesEyebrow: "Nos services",
    servicesTitle: "Tout ce qu'il faut pour partir, au même endroit.",
    servicesIntro:
      "Billets, hôtels, visa, assurance, guide et voiture : un seul interlocuteur, du premier conseil jusqu'à votre retour.",
    learnMore: "En savoir plus",
    agencyEyebrow: "L'agence",
    agencyTitle: "Une agence locale, pas un centre d'appels.",
    agencyIntro:
      "FB Travel And Services est installée au Parc du Cinquantenaire, à Lakouanga. Vous parlez à des conseillers qui connaissent Bangui, les ambassades et les compagnies qui desservent la ville.",
    visit: "Venir à l'agence",
    write: "Écrire",
    findUs: "Nous trouver à Bangui",
    directions: "Ouvrir l'itinéraire",
    routes: "Nos liaisons depuis Bangui",
    businessTag: "Voyage d'affaires",
    businessTitle: "Business Tour Maroc",
    businessSub: "L'Éveil des Échanges, édition spéciale pour les femmes entrepreneures de Bangui.",
    businessHeading: "Faire voyager une équipe, une délégation ou un groupe.",
    businessText:
      "Billets collectifs, hôtels, assurance, transferts et accompagnement sur place : nous organisons chaque étape et vous gardez un seul interlocuteur. La prochaine édition se prépare, renseignez-vous auprès de l'agence.",
    businessCta: "Demander le programme",
    businessMsg: "Bonjour FB Travel, je souhaite des informations sur le Business Tour Maroc.",
    faqEyebrow: "FAQ",
    faqTitle: "Vos questions avant de réserver.",
    faqText: "Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp, nous répondons directement.",
    ctaEyebrow: "Prêts à partir ?",
    ctaTitle: "Parlons de votre prochain départ.",
  },
  en: {
    metaTitle: "Travel agency in Bangui",
    metaDescription:
      "FB Travel And Services, travel agency in Bangui: flights, hotels, tours, insurance and visa assistance. Free quotes and replies on WhatsApp.",
    metaKeywords: ["travel Bangui", "flights Central African Republic", "hotels Bangui", "FB Travel agency"],
    liveFlights: "Need live schedules and fares?",
    liveFlightsLink: "Search live flights",
    quickAria: "Quick services",
    quick: [
      { label: "Visa & formalities", href: "/visa" },
      { label: "Tours & packages", href: "/circuits" },
      { label: "Travel insurance", href: "/services#assurance" },
      { label: "Talk to an adviser", href: "/contact" },
    ],
    dossierEyebrow: "Files & formalities",
    dossierTitle: "A booking for your embassy application.",
    dossierIntro:
      "Flights and hotels can be booked to complete a visa application, an exit permit or a business trip. Tell us what you need and we prepare the confirmations.",
    dossierCards: [
      {
        title: "Flight booking",
        text: "A ticket or flight reservation to complete a file, with no unpleasant surprises at submission.",
        points: ["For a visa application", "For an exit permit", "For a business trip"],
        message: "Hello FB Travel, I need a flight reservation for an application.",
      },
      {
        title: "Hotel booking",
        text: "An accommodation confirmation that matches your dates and destination.",
        points: ["For a visa application", "For an exit permit", "For a business trip"],
        message: "Hello FB Travel, I need a hotel booking for an application.",
      },
    ],
    makeRequest: "Make my request",
    destEyebrow: "From Bangui",
    destTitle: "Explore the world, without leaving your city.",
    destIntro:
      "Douala, Paris, Dakar, Casablanca, Dubai: the routes our clients ask for most. Your destination is not listed? Ask us and we will find the best route.",
    allDest: "All destinations",
    destNote: "Starting fares, to be confirmed according to dates and availability. Quotes are free.",
    hotelsEyebrow: "Where to stay",
    hotelsTitle: "Accommodation confirmed before you leave.",
    hotelsIntro:
      "Leisure trip, business travel or mission: we book the hotel that fits your budget and schedule.",
    seeHotels: "See hotels",
    sightsEyebrow: "See & do",
    sightsTitle: "Ideas for your free time.",
    sightsIntro:
      "A city break, a guided visit or a day out of town: tell us what you would enjoy and we build the programme around your dates.",
    seeTours: "See tours",
    toursEyebrow: "Tours & packages",
    toursTitle: "Itineraries designed for you.",
    toursIntro:
      "Every programme is a starting point: we tailor it to your dates, budget and preferred pace.",
    allTours: "All tours",
    seeProgramme: "See the programme",
    servicesEyebrow: "Our services",
    servicesTitle: "Everything you need to travel, in one place.",
    servicesIntro:
      "Flights, hotels, visa, insurance, guides and cars: one point of contact, from first advice to your return.",
    learnMore: "Learn more",
    agencyEyebrow: "The agency",
    agencyTitle: "A local agency, not a call centre.",
    agencyIntro:
      "FB Travel And Services is based at Parc du Cinquantenaire, in Lakouanga. You speak to advisers who know Bangui, the embassies and the airlines serving the city.",
    visit: "Visit the agency",
    write: "Message us",
    findUs: "Find us in Bangui",
    directions: "Open directions",
    routes: "Our routes from Bangui",
    businessTag: "Business travel",
    businessTitle: "Morocco Business Tour",
    businessSub: "L'Éveil des Échanges, a special edition for women entrepreneurs from Bangui.",
    businessHeading: "Take a team, a delegation or a group abroad.",
    businessText:
      "Group tickets, hotels, insurance, transfers and local support: we organise every step and you keep a single point of contact. The next edition is being prepared — ask the agency for details.",
    businessCta: "Request the programme",
    businessMsg: "Hello FB Travel, I would like information about the Morocco Business Tour.",
    faqEyebrow: "FAQ",
    faqTitle: "Your questions before booking.",
    faqText: "Can't find your answer? Message us on WhatsApp, we reply directly.",
    ctaEyebrow: "Ready to go?",
    ctaTitle: "Let's talk about your next trip.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = copy[locale];
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/",
    keywords: [...t.metaKeywords],
    locale,
  });
}

export default async function Home() {
  const locale: Locale = await getLocale();
  const t = copy[locale];
  const content = getContent(locale);

  const dossierIcons = [faPlaneDeparture, faBed];

  return (
    <>
      <HeroSlider slides={content.heroSlides} locale={locale} />

      <div className="relative z-10 mx-auto -mt-36 max-w-6xl px-5">
        <SearchWidget locale={locale} />
        <p className="mt-3 text-center text-sm text-nuit/60">
          {t.liveFlights}{" "}
          <Link
            href={localizedHref(locale, "/vols")}
            className="font-semibold text-azur underline underline-offset-4 hover:text-nuit"
          >
            {t.liveFlightsLink}
          </Link>
        </p>
      </div>

      <section aria-label={t.quickAria} className="mx-auto max-w-7xl px-5 pt-14">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.quick.map((q, i) => {
            const icons = [faPassport, faSuitcaseRolling, faFileSignature, faPhone];
            return (
              <li key={q.href}>
                <Link
                  href={localizedHref(locale, q.href)}
                  className="flex items-center gap-3 rounded-xl border border-nuit/10 bg-white px-4 py-4 text-sm font-semibold transition-colors hover:border-azur/40 hover:bg-brume"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brume text-azur">
                    <FontAwesomeIcon icon={icons[i]} className="h-4 w-4" />
                  </span>
                  {q.label}
                  <FontAwesomeIcon icon={faArrowRight} className="ml-auto h-3.5 w-3.5 text-nuit/30" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow={t.dossierEyebrow}
          title={t.dossierTitle}
          intro={t.dossierIntro}
          align="center"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {t.dossierCards.map((c, i) => (
            <article key={c.title} className="rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brume text-azur">
                <FontAwesomeIcon icon={dossierIcons[i]} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold">{c.title}</h3>
              <p className="mt-2 text-nuit/70">{c.text}</p>
              <ul className="mt-6 space-y-2.5">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-nuit/80">
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-4 w-4 shrink-0 text-soleil" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(c.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-bold text-azur hover:text-nuit"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
                {t.makeRequest}
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="destinations" className="bg-brume">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle
            eyebrow={t.destEyebrow}
            title={t.destTitle}
            intro={t.destIntro}
            action={
              <Link
                href={localizedHref(locale, "/vols")}
                className="inline-flex items-center gap-2 rounded-full border-2 border-nuit px-5 py-2.5 text-sm font-bold transition-colors hover:bg-nuit hover:text-white"
              >
                {t.allDest}
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="mt-10">
            <DestinationGrid limit={8} locale={locale} />
          </div>
          <p className="mt-6 text-sm text-nuit/55">{t.destNote}</p>
        </div>
      </section>

      <section id="hotels" className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow={t.hotelsEyebrow}
          title={t.hotelsTitle}
          intro={t.hotelsIntro}
          action={
            <Link
              href={localizedHref(locale, "/hotels")}
              className="inline-flex items-center gap-2 rounded-full bg-nuit px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-azur"
            >
              {t.seeHotels}
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-10">
          <HotelGrid locale={locale} />
        </div>
      </section>

      <section className="bg-nuit text-white">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle
            light
            eyebrow={t.sightsEyebrow}
            title={t.sightsTitle}
            intro={t.sightsIntro}
            action={
              <Link
                href={localizedHref(locale, "/circuits")}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-5 py-2.5 text-sm font-bold transition-colors hover:border-soleil hover:text-soleil"
              >
                {t.seeTours}
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.sightIdeas.map((s) => (
              <li key={s.city} className="group relative overflow-hidden rounded-2xl">
                <div className="relative h-64">
                  <Image
                    src={s.image}
                    alt={`${s.city}, ${s.country}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nuit-profond via-nuit-profond/25 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-soleil-clair">{s.tag}</p>
                  <h3 className="mt-1 font-display text-2xl font-extrabold">
                    {s.city} <span className="text-sm font-semibold text-white/60">· {s.country}</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow={t.toursEyebrow}
          title={t.toursTitle}
          intro={t.toursIntro}
          action={
            <Link
              href={localizedHref(locale, "/circuits")}
              className="inline-flex items-center gap-2 rounded-full bg-nuit px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-azur"
            >
              {t.allTours}
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {content.tours.slice(0, 3).map((tour) => (
            <li key={tour.id} className="flex flex-col rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-brume px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-azur">
                  {tour.category}
                </span>
                <span className="text-xs font-semibold text-nuit/50">{tour.country}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold leading-tight">{tour.title}</h3>
              <p className="mt-2 text-sm text-nuit/70">{tour.text}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-nuit/75">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5 text-soleil" />
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                href={localizedHref(locale, "/circuits")}
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-azur hover:text-nuit"
              >
                {t.seeProgramme}
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-brume">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle
            eyebrow={t.servicesEyebrow}
            title={t.servicesTitle}
            intro={t.servicesIntro}
            align="center"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((s) => (
              <li key={s.id}>
                <Link
                  href={localizedHref(locale, `/services#${s.id}`)}
                  className="group flex h-full flex-col rounded-2xl border border-nuit/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-nuit/5"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brume text-azur transition-colors group-hover:bg-azur group-hover:text-white">
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-nuit/70">{s.short}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-azur">
                    {t.learnMore}
                    <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="agence" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionTitle eyebrow={t.agencyEyebrow} title={t.agencyTitle} intro={t.agencyIntro} />
            <ul className="mt-7 space-y-3">
              {content.trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="mt-1 h-4 w-4 shrink-0 text-azur" />
                  <span className="text-nuit/80">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localizedHref(locale, "/contact")}
                className="inline-flex items-center gap-2 rounded-full bg-nuit px-6 py-3 font-bold text-white transition-colors hover:bg-azur"
              >
                {t.visit}
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
              <a
                href={whatsappLink(
                  locale === "fr"
                    ? "Bonjour FB Travel, j'aimerais un conseil pour mon voyage."
                    : "Hello FB Travel, I would like some advice for my trip.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-nuit px-6 py-3 font-bold transition-colors hover:bg-brume"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4 text-azur" />
                {t.write}
              </a>
            </div>
            <div className="mt-8 rounded-xl border border-nuit/10 bg-brume p-5">
              <p className="text-sm font-bold">{t.findUs}</p>
              <p className="mt-1 text-sm text-nuit/70">{site.addresses[locale]}</p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-azur hover:text-nuit"
              >
                {t.directions}
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-nuit/10 bg-brume p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-lg font-bold">{t.routes}</p>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-nuit/60">BGF</span>
              </div>
              <RouteMap locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section id="business-tour" className="bg-brume">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
          <div className="relative flex min-h-[24rem] flex-col justify-end overflow-hidden bg-azur p-8 text-white sm:p-12">
            <div className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full bg-soleil" aria-hidden="true" />
            <p className="relative text-sm font-bold uppercase tracking-[0.18em] text-soleil-clair">{t.businessTag}</p>
            <h2 className="relative mt-2 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
              {t.businessTitle}
            </h2>
            <p className="relative mt-5 max-w-sm text-white/85">{t.businessSub}</p>
          </div>
          <div className="flex flex-col justify-center bg-white px-5 py-14 sm:px-12">
            <h3 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{t.businessHeading}</h3>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-nuit/80">{t.businessText}</p>
            <div className="mt-8">
              <a
                href={whatsappLink(t.businessMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-nuit px-6 py-3.5 font-bold text-white transition-colors hover:bg-azur"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-soleil-clair" />
                {t.businessCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Testimonials testimonials={content.testimonials} locale={locale} />
      <Partners locale={locale} />

      <section id="faq" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle eyebrow={t.faqEyebrow} title={t.faqTitle} />
            <p className="mt-5 text-nuit/70">{t.faqText}</p>
          </div>
          <div className="lg:col-span-8">
            <Faq locale={locale} />
          </div>
        </div>
      </section>

      <section className="bg-soleil">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-nuit/60">{t.ctaEyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
              {t.ctaTitle}
            </h2>
          </div>
          <div className="space-y-3">
            {site.phones.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="flex items-center gap-4 border-b-2 border-nuit/30 pb-3 font-display text-2xl font-bold transition-colors hover:border-nuit sm:text-3xl"
              >
                <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd(locale)} />
    </>
  );
}
