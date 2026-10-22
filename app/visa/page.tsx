import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleCheck, faFileShield } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { VisaChecker } from "@/components/VisaChecker";
import { Faq } from "@/components/Faq";
import { visaSteps, whatsappLink } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Assistance visa à Bangui",
  description:
    "Assistance visa à Bangui : liste des pièces, vérification du dossier, réservations de vol et d'hôtel pour votre demande. FB Travel And Services vous accompagne.",
  path: "/visa",
  keywords: ["visa Bangui", "dossier visa Centrafrique", "assistance visa France Bangui"],
});

const support = [
  "Liste des pièces à fournir selon la destination",
  "Vérification du dossier avant dépôt",
  "Réservations de vol et d'hôtel quand l'ambassade les demande",
  "Attestation d'assurance voyage pour le dossier",
  "Conseils sur les délais et la prise de rendez-vous",
  "Réponse aux questions après le dépôt",
];

export default function VisaPage() {
  return (
    <>
      <PageHero
        eyebrow="Visa & formalités"
        title="Un visa se prépare. Nous le préparons avec vous."
        intro="Un dossier incomplet fait perdre des semaines. Nous vous aidons à déposer un dossier clair, avec les bonnes pièces, dès le premier passage."
      />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <VisaChecker />
      </section>

      <section className="bg-nuit text-white">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle
            light
            eyebrow="Notre accompagnement"
            title="Quatre étapes, jusqu'à la décision."
            intro="Chaque destination a ses règles. Nous adaptons la préparation à l'ambassade concernée et restons disponibles entre chaque étape."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visaSteps.map((s, i) => (
              <li key={s.title} className="border-t border-white/20 pt-5">
                <span className="font-display text-4xl font-extrabold text-soleil">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow="Ce que nous faisons"
              title="Un dossier vérifié pièce par pièce."
              intro="Nous ne décidons pas à la place de l'ambassade, mais nous faisons en sorte que votre dossier soit complet et cohérent."
            />
            <div className="mt-7 rounded-xl border border-nuit/10 bg-brume p-5">
              <p className="flex items-start gap-3 text-sm text-nuit/75">
                <FontAwesomeIcon icon={faFileShield} className="mt-0.5 h-5 w-5 shrink-0 text-azur" />
                Les exigences varient selon la nationalité, la destination et le motif du voyage.
                Vérifiez toujours la liste officielle avant de déposer.
              </p>
            </div>
          </div>
          <ul className="lg:col-span-7">
            {support.map((s) => (
              <li key={s} className="flex items-start gap-3 border-t border-nuit/15 py-4 last:border-b">
                <FontAwesomeIcon icon={faCircleCheck} className="mt-1 h-4 w-4 shrink-0 text-azur" />
                <span className="text-nuit/85">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-soleil">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Votre dossier part bientôt ?
            </h2>
            <p className="mt-2 max-w-xl text-nuit/75">
              Appelez-nous ou écrivez sur WhatsApp avec votre destination et votre date de dépôt :
              nous vous dirons ce qui manque.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={whatsappLink("Bonjour FB Travel, j'ai besoin d'aide pour une demande de visa.")}
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
              Prendre rendez-vous
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle eyebrow="FAQ" title="Questions sur le visa." />
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
