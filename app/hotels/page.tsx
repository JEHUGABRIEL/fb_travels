import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleCheck, faBed, faUsers, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { SearchWidget } from "@/components/SearchWidget";
import { SectionTitle } from "@/components/SectionTitle";
import { HotelGrid } from "@/components/HotelGrid";
import { whatsappLink } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Réservation d'hôtel à Bangui et à l'étranger",
  description:
    "Réservation d'hôtel pour vos voyages d'affaires, séjours touristiques ou missions à Bangui et à l'étranger. Confirmation avant le départ avec FB Travel And Services.",
  path: "/hotels",
  keywords: ["hôtel Bangui", "réservation hôtel Centrafrique", "hôtel voyage d'affaires Bangui"],
});

const benefits = [
  {
    icon: faCalendarCheck,
    title: "Une confirmation avant le départ",
    text: "Vous recevez la confirmation de réservation au nom du voyageur, avec les dates et l'adresse exactes.",
  },
  {
    icon: faBed,
    title: "Un hôtel adapté au budget",
    text: "En ville, près de l'aéroport ou du lieu de votre rendez-vous : nous proposons des options dans votre fourchette.",
  },
  {
    icon: faUsers,
    title: "Groupes et délégations",
    text: "Plusieurs chambres, des arrivées échelonnées, une seule facture : nous organisons les réservations groupées.",
  },
];

const steps = [
  { title: "Vous donnez la ville et les dates", text: "Précisez le nombre de voyageurs, de chambres et votre budget." },
  { title: "Nous proposons des options", text: "Nous vérifions la disponibilité et vous présentons les choix." },
  { title: "Nous confirmons la réservation", text: "La confirmation vous est remise avant votre départ." },
];

export default function HotelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Hébergement"
        title="Un hébergement confirmé avant de partir."
        intro="Séjour touristique, déplacement professionnel ou mission : nous réservons l'hôtel qui correspond à votre budget et à votre emploi du temps."
      />

      <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">
        <SearchWidget defaultTab="hotels" />
      </div>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow="Inspiration"
          title="Des villes, des ambiances, des budgets."
          intro="Quelques exemples de destinations où nous réservons régulièrement. Les adresses exactes sont choisies avec vous, selon les disponibilités."
          action={
            <Link
              href="/vols"
              className="inline-flex items-center gap-2 rounded-full border-2 border-nuit px-5 py-2.5 text-sm font-bold transition-colors hover:bg-nuit hover:text-white"
            >
              Voir les vols
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-10">
          <HotelGrid />
        </div>
      </section>

      <section className="bg-brume">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle
            eyebrow="Avec FB Travel"
            title="Pourquoi réserver l'hôtel avec l'agence ?"
            align="center"
          />
          <ul className="mt-12 grid gap-4 lg:grid-cols-3">
            {benefits.map((b) => (
              <li key={b.title} className="rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brume text-azur">
                  <FontAwesomeIcon icon={b.icon} className="h-5 w-5" />
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
            <SectionTitle eyebrow="Comment ça marche" title="Trois étapes, une confirmation." />
            <p className="mt-5 text-nuit/70">
              Vous pouvez réserver l&apos;hôtel seul ou avec votre vol. Dans les deux cas, vous
              gardez le même interlocuteur.
            </p>
          </div>
          <ol className="lg:col-span-7">
            {steps.map((s, i) => (
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
            <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Besoin d&apos;une chambre pour cette semaine ?
            </h2>
            <p className="mt-2 max-w-xl text-nuit/75">
              Écrivez-nous avec la ville et les dates : nous vérifions les disponibilités et
              revenons vers vous rapidement.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={whatsappLink("Bonjour FB Travel, je souhaite réserver un hôtel.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-nuit px-6 py-3.5 font-bold text-white transition-colors hover:bg-azur"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-soleil-clair" />
              Écrire sur WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-nuit px-6 py-3 font-bold transition-colors hover:bg-white/40"
            >
              Nous appeler
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="flex items-start gap-3 text-sm text-nuit/60">
          <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-4 w-4 shrink-0 text-azur" />
          Les tarifs et disponibilités sont confirmés au moment de la réservation. Aucun paiement
          n&apos;est demandé sur ce site.
        </p>
      </section>
    </>
  );
}
