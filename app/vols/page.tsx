import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleCheck,
  faPlaneDeparture,
  faTicket,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { FlightSearch } from "@/components/FlightSearch";
import { SectionTitle } from "@/components/SectionTitle";
import { DestinationGrid } from "@/components/DestinationGrid";
import { Faq } from "@/components/Faq";
import { whatsappLink } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Vols au départ de Bangui",
  description:
    "Billets d'avion au départ de Bangui vers Douala, Paris, Dakar, Casablanca, Dubaï et au-delà. Comparez les vols et demandez un devis gratuit à FB Travel And Services.",
  path: "/vols",
  keywords: ["vol Bangui Douala", "billet avion Bangui Paris", "vol pas cher Centrafrique"],
});

const reasons = [
  {
    icon: faTicket,
    title: "Le bon tarif, pas juste le premier",
    text: "Nous comparons les options disponibles selon vos dates et votre souplesse, puis vous présentons le choix le plus cohérent.",
  },
  {
    icon: faPlaneDeparture,
    title: "Un dossier de voyage complet",
    text: "Vol, hôtel et assurance peuvent être réservés ensemble, avec des dates cohérentes pour votre visa.",
  },
  {
    icon: faHeadset,
    title: "Un suivi après l'émission",
    text: "Modification, bagages, correspondance : vous gardez le même interlocuteur jusqu'au départ.",
  },
];

const tips = [
  {
    title: "Passeport et visa",
    text: "Vérifiez la validité de votre passeport (souvent six mois après le retour) et les conditions de visa avant d'acheter.",
  },
  {
    title: "Dates souples",
    text: "Décaler le départ de quelques jours peut changer nettement le prix. Dites-nous vos marges de manœuvre.",
  },
  {
    title: "Bagages",
    text: "Le bagage en soute n'est pas toujours inclus. Nous vérifions ce qui est compris avant l'émission.",
  },
];

export default function VolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Billets d'avion"
        title="Le bon vol, au bon prix, depuis Bangui."
        intro="Aller simple, aller-retour, voyage en groupe : dites-nous où vous allez et quand, nous cherchons les options et nous occupons de la réservation."
      />

      <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">
        <FlightSearch />
      </div>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow="Pourquoi passer par l'agence"
          title="Un billet, c'est aussi un dossier."
          intro="Réserver en ligne ne dit pas tout : correspondances, bagages, conditions de modification et cohérence avec votre visa comptent autant que le prix."
          align="center"
        />
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {reasons.map((r) => (
            <li key={r.title} className="rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brume text-azur">
                <FontAwesomeIcon icon={r.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-nuit/70">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-brume">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle
            eyebrow="Destinations"
            title="Où souhaitez-vous aller ?"
            intro="Les liaisons les plus demandées par nos clients. Les tarifs affichés sont des prix de départ, à confirmer selon les dates."
          />
          <div className="mt-10">
            <DestinationGrid />
          </div>
          <p className="mt-6 text-sm text-nuit/55">
            Votre destination n&apos;est pas dans la liste ? Demandez-nous : nous cherchons aussi les
            trajets avec correspondance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle eyebrow="Conseils" title="Trois vérifications avant d'acheter." />
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {tips.map((t, i) => (
            <li key={t.title} className="border-t border-nuit/15 pt-5">
              <span className="font-display text-3xl font-extrabold text-soleil">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-xl font-bold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-nuit/70">{t.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-nuit text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Vous avez vos dates ? Nous avons les vols.
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Envoyez-nous votre trajet sur WhatsApp. Un conseiller revient vers vous avec les
              options et le tarif exact.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={whatsappLink("Bonjour FB Travel, je souhaite un devis de vol.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-soleil px-6 py-3.5 font-bold text-nuit transition-colors hover:bg-soleil-clair"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
              Demander un devis
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 font-bold transition-colors hover:border-soleil hover:text-soleil"
            >
              Contact
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle eyebrow="FAQ" title="Questions sur les vols." />
            <p className="mt-5 flex items-start gap-2 text-nuit/70">
              <FontAwesomeIcon icon={faCircleCheck} className="mt-1 h-4 w-4 shrink-0 text-azur" />
              Devis gratuit et sans engagement.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
