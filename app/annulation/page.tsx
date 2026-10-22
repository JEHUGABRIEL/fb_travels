import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Politique d'annulation",
  description:
    "Conditions d'annulation et de remboursement des billets d'avion, hôtels, circuits et assurances réservés avec FB Travel And Services à Bangui.",
  path: "/annulation",
});

const sections = [
  { id: "principe", title: "Principe" },
  { id: "billets", title: "Billets d'avion" },
  { id: "hotels", title: "Hôtels" },
  { id: "circuits", title: "Circuits et séjours" },
  { id: "assurance", title: "Assurance voyage" },
  { id: "visa", title: "Assistance visa" },
  { id: "demande", title: "Comment demander" },
  { id: "non-presentation", title: "Non-présentation" },
  { id: "force-majeure", title: "Force majeure" },
  { id: "remboursements", title: "Remboursements" },
  { id: "contact", title: "Contact" },
];

export default function AnnulationPage() {
  return (
    <LegalPage
      title="Politique d'annulation"
      intro="Chaque réservation suit les conditions du prestataire. Voici comment nous traitons les demandes de modification, d'annulation et de remboursement."
      path="/annulation"
      updated="22 octobre 2026"
      sections={sections}
    >
      <LegalSection id="principe" title="1. Principe">
        <p>
          Les conditions d&apos;annulation sont fixées par la compagnie aérienne, l&apos;hôtel,
          l&apos;assureur ou l&apos;organisateur du séjour. Elles sont précisées dans le devis ou les
          documents de réservation remis avant validation.
        </p>
        <p>
          Certains tarifs ne sont ni modifiables ni remboursables. D&apos;autres autorisent une
          modification ou un remboursement partiel, avec des frais. Nous vous indiquons ces
          conditions avant l&apos;achat.
        </p>
      </LegalSection>

      <LegalSection id="billets" title="2. Billets d'avion">
        <p>
          Les billets promotionnels ou à tarif réduit sont généralement non remboursables. Les
          billets flexibles peuvent être modifiés ou remboursés selon la règle tarifaire, avec
          parfois une pénalité et la différence de prix.
        </p>
        <p>
          Une annulation doit être signalée avant le départ. Les taxes remboursables peuvent
          l&apos;être même lorsque le billet ne l&apos;est pas, selon la compagnie.
        </p>
      </LegalSection>

      <LegalSection id="hotels" title="3. Hôtels">
        <p>
          Le délai d&apos;annulation sans frais dépend de l&apos;hôtel et du tarif choisi. Une
          annulation tardive ou une nuit non utilisée peut être facturée. Les réservations
          non remboursables sont signalées comme telles.
        </p>
      </LegalSection>

      <LegalSection id="circuits" title="4. Circuits et séjours">
        <p>
          Pour les voyages organisés, les conditions de l&apos;organisateur s&apos;appliquent. Les
          frais peuvent augmenter à mesure que la date de départ approche. Les prestations déjà
          réservées (vols, hôtels, activités) peuvent rester dues.
        </p>
      </LegalSection>

      <LegalSection id="assurance" title="5. Assurance voyage">
        <p>
          L&apos;assurance suit le contrat de l&apos;assureur. Une fois la couverture émise, la prime
          est généralement due. Les demandes de remboursement ou de prise en charge se font selon les
          garanties et les justificatifs prévus au contrat.
        </p>
      </LegalSection>

      <LegalSection id="visa" title="6. Assistance visa">
        <p>
          Les honoraires d&apos;assistance correspondent au travail de préparation et de vérification
          du dossier. Ils ne sont pas remboursables une fois le dossier constitué ou déposé. Les
          frais d&apos;ambassade sont fixés et perçus par l&apos;autorité concernée.
        </p>
      </LegalSection>

      <LegalSection id="demande" title="7. Comment demander">
        <p>Contactez-nous dès que possible avec :</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>le nom du passager principal et la référence du dossier ;</li>
          <li>le ou les vols, hôtels ou services concernés ;</li>
          <li>le motif de l&apos;annulation, si vous souhaitez le préciser ;</li>
          <li>vos coordonnées pour la suite.</li>
        </ul>
        <p>
          Nous confirmons la réception, vérifions les conditions applicables et vous indiquons le
          montant éventuellement retenu avant de lancer la démarche.
        </p>
      </LegalSection>

      <LegalSection id="non-presentation" title="8. Non-présentation">
        <p>
          Un passager qui ne se présente pas à l&apos;embarquement ou qui n&apos;arrive pas à
          l&apos;hôtel prévu, sans annulation préalable, est considéré comme « no-show ». Selon le
          prestataire, le billet ou la nuit peut être perdu sans remboursement.
        </p>
      </LegalSection>

      <LegalSection id="force-majeure" title="9. Force majeure">
        <p>
          En cas d&apos;événement exceptionnel indépendant de notre volonté (fermeture de frontière,
          catastrophe naturelle, grève, décision administrative), les prestataires peuvent proposer
          un report, un avoir ou un remboursement selon leurs règles. Nous vous aidons à faire valoir
          ces solutions.
        </p>
      </LegalSection>

      <LegalSection id="remboursements" title="10. Remboursements">
        <p>
          Un remboursement n&apos;est possible qu&apos;après accord du prestataire. Les délais
          varient selon la compagnie ou l&apos;hôtel et peuvent dépasser plusieurs semaines. Le
          remboursement est effectué selon le moyen convenu avec l&apos;agence, en tenant compte des
          frais déjà engagés et des frais de service.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="11. Contact">
        <p>
          Pour une annulation, écrivez à{" "}
          <a className="font-semibold text-azur underline underline-offset-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          ou appelez le {site.phones[0].label}. Vous pouvez aussi passer à l&apos;agence :{" "}
          {site.address}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
