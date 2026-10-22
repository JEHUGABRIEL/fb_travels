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
import {
  sightIdeas,
  tours,
  services,
  site,
  trustPoints,
  whatsappLink,
} from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Agence de voyage à Bangui",
  description:
    "FB Travel And Services, agence de voyage à Bangui : billets d'avion, hôtels, circuits, assurance et assistance visa. Devis gratuit et réponse sur WhatsApp.",
  path: "/",
  keywords: ["voyage Bangui", "vol Centrafrique", "hôtel Bangui", "agence FB Travel"],
});

const dossierCards = [
  {
    icon: faPlaneDeparture,
    title: "Réservation de vol",
    text: "Un billet ou une réservation de vol pour compléter un dossier, sans mauvaise surprise au dépôt.",
    points: ["Pour une demande de visa", "Pour une autorisation de sortie", "Pour un déplacement professionnel"],
    message: "Bonjour FB Travel, j'ai besoin d'une réservation de vol pour un dossier.",
  },
  {
    icon: faBed,
    title: "Réservation d'hôtel",
    text: "Une confirmation d'hébergement cohérente avec vos dates et votre destination.",
    points: ["Pour une demande de visa", "Pour une autorisation de sortie", "Pour un déplacement professionnel"],
    message: "Bonjour FB Travel, j'ai besoin d'une réservation d'hôtel pour un dossier.",
  },
];

const quickServices = [
  { icon: faPassport, label: "Visa & formalités", href: "/visa" },
  { icon: faSuitcaseRolling, label: "Séjours & circuits", href: "/circuits" },
  { icon: faFileSignature, label: "Assurance voyage", href: "/services#assurance" },
  { icon: faPhone, label: "Parler à un conseiller", href: "/contact" },
];

export default function Home() {
  return (
    <>
      {/* Hero + moteur de recherche */}
      <HeroSlider />

      <div className="relative z-10 mx-auto -mt-36 max-w-6xl px-5">
        <SearchWidget />
        <p className="mt-3 text-center text-sm text-nuit/60">
          Besoin d&apos;horaires et de tarifs en direct ?{" "}
          <Link href="/vols" className="font-semibold text-azur underline underline-offset-4 hover:text-nuit">
            Rechercher un vol en direct
          </Link>
        </p>
      </div>

      <section aria-label="Services rapides" className="mx-auto max-w-7xl px-5 pt-14">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickServices.map((q) => (
            <li key={q.label}>
              <Link
                href={q.href}
                className="flex items-center gap-3 rounded-xl border border-nuit/10 bg-white px-4 py-4 text-sm font-semibold transition-colors hover:border-azur/40 hover:bg-brume"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brume text-azur">
                  <FontAwesomeIcon icon={q.icon} className="h-4 w-4" />
                </span>
                {q.label}
                <FontAwesomeIcon icon={faArrowRight} className="ml-auto h-3.5 w-3.5 text-nuit/30" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Réservations pour dossier */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow="Dossiers & formalités"
          title="Une réservation pour votre dossier d'ambassade."
          intro="Vol et hôtel peuvent être réservés pour compléter un dossier de visa, une autorisation de sortie ou un déplacement professionnel. Dites-nous ce dont vous avez besoin, nous préparons les confirmations."
          align="center"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {dossierCards.map((c) => (
            <article key={c.title} className="rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brume text-azur">
                <FontAwesomeIcon icon={c.icon} className="h-5 w-5" />
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
                Faire ma demande
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="bg-brume">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle
            eyebrow="Depuis Bangui"
            title="Explorez le monde, sans quitter votre ville."
            intro="Douala, Paris, Dakar, Casablanca, Dubaï : les liaisons que nos clients demandent le plus. Votre destination n'y figure pas ? Demandez-nous, nous cherchons le meilleur trajet."
            action={
              <Link
                href="/vols"
                className="inline-flex items-center gap-2 rounded-full border-2 border-nuit px-5 py-2.5 text-sm font-bold transition-colors hover:bg-nuit hover:text-white"
              >
                Toutes les destinations
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="mt-10">
            <DestinationGrid limit={8} />
          </div>
          <p className="mt-6 text-sm text-nuit/55">
            Tarifs de départ, à confirmer selon les dates et la disponibilité. Les demandes de devis
            sont gratuites.
          </p>
        </div>
      </section>

      {/* Hôtels */}
      <section id="hotels" className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow="Où dormir"
          title="Un hébergement confirmé avant de partir."
          intro="Séjour touristique, déplacement professionnel ou mission : nous réservons l'hôtel qui correspond à votre budget et à votre emploi du temps."
          action={
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 rounded-full bg-nuit px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-azur"
            >
              Voir les hôtels
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-10">
          <HotelGrid />
        </div>
      </section>

      {/* À voir, à vivre */}
      <section className="bg-nuit text-white">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle
            light
            eyebrow="À voir, à vivre"
            title="Des idées pour votre temps libre."
            intro="Un city break, une visite guidée ou une journée hors de la ville : dites-nous ce qui vous ferait plaisir, nous construisons le programme autour de vos dates."
            action={
              <Link
                href="/circuits"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-5 py-2.5 text-sm font-bold transition-colors hover:border-soleil hover:text-soleil"
              >
                Voir les circuits
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sightIdeas.map((s) => (
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

      {/* Circuits */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow="Séjours & circuits"
          title="Des itinéraires pensés pour vous."
          intro="Chaque programme est un point de départ : nous l'ajustons à vos dates, à votre budget et au rythme que vous souhaitez."
          action={
            <Link
              href="/circuits"
              className="inline-flex items-center gap-2 rounded-full bg-nuit px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-azur"
            >
              Tous les circuits
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {tours.slice(0, 3).map((t) => (
            <li key={t.id} className="flex flex-col rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-brume px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-azur">
                  {t.category}
                </span>
                <span className="text-xs font-semibold text-nuit/50">{t.country}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold leading-tight">{t.title}</h3>
              <p className="mt-2 text-sm text-nuit/70">{t.text}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-nuit/75">
                {t.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5 text-soleil" />
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                href="/circuits"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-azur hover:text-nuit"
              >
                Voir le programme
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="bg-brume">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle
            eyebrow="Nos services"
            title="Tout ce qu'il faut pour partir, au même endroit."
            intro="Billets, hôtels, visa, assurance, guide et voiture : un seul interlocuteur, du premier conseil jusqu'à votre retour."
            align="center"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services#${s.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-nuit/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-nuit/5"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brume text-azur transition-colors group-hover:bg-azur group-hover:text-white">
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-nuit/70">{s.short}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-azur">
                    En savoir plus
                    <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Agence */}
      <section id="agence" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow="L'agence"
              title="Une agence locale, pas un centre d'appels."
              intro="FB Travel And Services est installée au Parc du Cinquantenaire, à Lakouanga. Vous parlez à des conseillers qui connaissent Bangui, les ambassades et les compagnies qui desservent la ville."
            />
            <ul className="mt-7 space-y-3">
              {trustPoints.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="mt-1 h-4 w-4 shrink-0 text-azur" />
                  <span className="text-nuit/80">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-nuit px-6 py-3 font-bold text-white transition-colors hover:bg-azur"
              >
                Venir à l&apos;agence
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
              <a
                href={whatsappLink("Bonjour FB Travel, j'aimerais un conseil pour mon voyage.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-nuit px-6 py-3 font-bold transition-colors hover:bg-brume"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4 text-azur" />
                Écrire
              </a>
            </div>
            <div className="mt-8 rounded-xl border border-nuit/10 bg-brume p-5">
              <p className="text-sm font-bold">Nous trouver à Bangui</p>
              <p className="mt-1 text-sm text-nuit/70">{site.address}</p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-azur hover:text-nuit"
              >
                Ouvrir l&apos;itinéraire
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-nuit/10 bg-brume p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-lg font-bold">Nos liaisons depuis Bangui</p>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-nuit/60">BGF</span>
              </div>
              <RouteMap />
            </div>
          </div>
        </div>
      </section>

      {/* Business Tour */}
      <section id="business-tour" className="bg-brume">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
          <div className="relative flex min-h-[24rem] flex-col justify-end overflow-hidden bg-azur p-8 text-white sm:p-12">
            <div className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full bg-soleil" aria-hidden="true" />
            <p className="relative text-sm font-bold uppercase tracking-[0.18em] text-soleil-clair">Voyage d&apos;affaires</p>
            <h2 className="relative mt-2 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
              Business Tour Maroc
            </h2>
            <p className="relative mt-5 max-w-sm text-white/85">
              L&apos;Éveil des Échanges, édition spéciale pour les femmes entrepreneures de Bangui.
            </p>
          </div>
          <div className="flex flex-col justify-center bg-white px-5 py-14 sm:px-12">
            <h3 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Faire voyager une équipe, une délégation ou un groupe.
            </h3>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-nuit/80">
              Billets collectifs, hôtels, assurance, transferts et accompagnement sur place : nous
              organisons chaque étape et vous gardez un seul interlocuteur. La prochaine édition se
              prépare, renseignez-vous auprès de l&apos;agence.
            </p>
            <div className="mt-8">
              <a
                href={whatsappLink("Bonjour FB Travel, je souhaite des informations sur le Business Tour Maroc.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-nuit px-6 py-3.5 font-bold text-white transition-colors hover:bg-azur"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-soleil-clair" />
                Demander le programme
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages & partenaires */}
      <Testimonials />
      <Partners />

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle eyebrow="FAQ" title="Vos questions avant de réserver." />
            <p className="mt-5 text-nuit/70">
              Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp, nous répondons
              directement.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>

      {/* Appel final */}
      <section className="bg-soleil">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-nuit/60">Prêts à partir ?</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
              Parlons de votre prochain départ.
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

      <JsonLd data={faqJsonLd()} />
    </>
  );
}
