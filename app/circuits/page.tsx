import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCompass, faHotel, faShieldHeart, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { TourGrid } from "@/components/TourGrid";
import { whatsappLink } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Séjours & circuits au départ de Bangui",
  description:
    "Idées de séjours et circuits au départ de Bangui : Maroc, Paris, Douala, Dakar, Istanbul, Kigali. Programmes ajustés à vos dates et à votre budget.",
  path: "/circuits",
  keywords: ["circuit Bangui", "séjour Centrafrique", "voyage organisé Bangui"],
});

const included = [
  {
    icon: faCompass,
    title: "Un programme qui vous ressemble",
    text: "Vous nous dites ce que vous aimez voir et le temps dont vous disposez, nous construisons l'itinéraire.",
  },
  {
    icon: faHotel,
    title: "Vols et hôtels cohérents",
    text: "Les dates, les transferts et l'hébergement sont réservés ensemble pour éviter les mauvaises surprises.",
  },
  {
    icon: faShieldHeart,
    title: "Assurance et formalités",
    text: "Nous vous orientons vers la couverture adaptée et vérifions les documents nécessaires au départ.",
  },
  {
    icon: faMapLocationDot,
    title: "Accompagnement sur place",
    text: "Guide, visites et transferts peuvent être organisés à la demande, pour les individuels comme pour les groupes.",
  },
];

export default function CircuitsPage() {
  return (
    <>
      <PageHero
        eyebrow="Séjours & circuits"
        title="Voyager, ce n'est pas seulement se déplacer."
        intro="Un city break, un séjour balnéaire, un voyage d'affaires prolongé : nous construisons le programme autour de vos envies, de votre budget et de votre rythme."
      />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle
          eyebrow="Idées d'itinéraires"
          title="Choisissez un point de départ."
          intro="Filtrez par type de séjour, puis demandez le programme détaillé. Tout est ajustable : durée, hôtels, visites et dates."
          align="center"
        />
        <div className="mt-10">
          <TourGrid />
        </div>
      </section>

      <section className="bg-brume">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle eyebrow="Sur mesure" title="Ce que nous prenons en charge." />
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {included.map((i) => (
              <li key={i.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-azur">
                  <FontAwesomeIcon icon={i.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold">{i.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-nuit/70">{i.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 rounded-2xl bg-azur p-8 text-white sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-soleil-clair">Groupe & affaires</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Business Tour Maroc
            </h2>
            <p className="mt-3 max-w-xl text-white/80">
              L&apos;Éveil des Échanges, édition spéciale pour les femmes entrepreneures de Bangui.
              Billets, hôtels, assurance et accompagnement : un seul interlocuteur pour tout le
              groupe.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={whatsappLink("Bonjour FB Travel, je souhaite des informations sur le Business Tour Maroc.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-soleil px-6 py-3.5 font-bold text-nuit transition-colors hover:bg-soleil-clair"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
              Demander le programme
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 font-bold transition-colors hover:border-soleil hover:text-soleil"
            >
              Nous contacter
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
