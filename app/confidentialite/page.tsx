import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment FB Travel And Services, agence de voyage à Bangui, collecte, utilise et protège vos données personnelles.",
  path: "/confidentialite",
});

const sections = [
  { id: "responsable", title: "Responsable du traitement" },
  { id: "donnees", title: "Données collectées" },
  { id: "finalites", title: "Pourquoi nous les utilisons" },
  { id: "base", title: "Base de notre traitement" },
  { id: "destinataires", title: "Qui peut y accéder" },
  { id: "transferts", title: "Transferts hors du pays" },
  { id: "conservation", title: "Durée de conservation" },
  { id: "securite", title: "Sécurité" },
  { id: "droits", title: "Vos droits" },
  { id: "cookies", title: "Cookies et services tiers" },
  { id: "modifications", title: "Modifications" },
  { id: "contact", title: "Nous contacter" },
];

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Nous utilisons vos informations uniquement pour répondre à vos demandes de voyage et organiser vos réservations. Voici, en clair, ce que nous collectons et pourquoi."
      path="/confidentialite"
      updated="22 octobre 2026"
      sections={sections}
    >
      <LegalSection id="responsable" title="1. Responsable du traitement">
        <p>
          Le responsable du traitement est <strong>FB Travel And Services</strong>, agence de voyage
          située {site.address}, à Bangui, en République centrafricaine.
        </p>
        <p>
          Pour toute question relative à vos données, écrivez à{" "}
          <a className="font-semibold text-azur underline underline-offset-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          ou appelez le {site.phones[0].label}.
        </p>
      </LegalSection>

      <LegalSection id="donnees" title="2. Données collectées">
        <p>Nous pouvons recevoir les informations suivantes lorsque vous nous contactez :</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>votre nom, votre numéro de téléphone et votre adresse e-mail ;</li>
          <li>les détails de votre voyage : destination, dates, nombre de voyageurs, classe, budget ;</li>
          <li>le contenu de vos messages et les pièces que vous choisissez de nous transmettre ;</li>
          <li>les informations nécessaires à une réservation : nom des passagers, date de naissance, nationalité, numéro de passeport lorsque la compagnie ou l&apos;hôtel l&apos;exige.</li>
        </ul>
        <p>
          Les formulaires de ce site ne sont pas enregistrés sur un serveur : ils composent un
          message que vous envoyez vous-même via WhatsApp ou votre messagerie. Les informations
          arrivent donc directement dans nos outils de travail.
        </p>
      </LegalSection>

      <LegalSection id="finalites" title="3. Pourquoi nous les utilisons">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>répondre à votre demande et établir un devis ;</li>
          <li>effectuer les réservations de vol, d&apos;hôtel, d&apos;assurance ou de voiture ;</li>
          <li>vous accompagner dans la préparation d&apos;un dossier de visa ;</li>
          <li>vous informer d&apos;une modification de vol ou d&apos;une échéance importante ;</li>
          <li>respecter nos obligations comptables et légales.</li>
        </ul>
        <p>Nous ne vendons pas vos données et ne les utilisons pas pour de la publicité ciblée.</p>
      </LegalSection>

      <LegalSection id="base" title="4. Base de notre traitement">
        <p>
          Le traitement repose sur votre demande et votre consentement lorsque vous nous contactez,
          sur l&apos;exécution du service que vous avez demandé, et sur nos obligations légales pour
          les documents de voyage et la comptabilité.
        </p>
      </LegalSection>

      <LegalSection id="destinataires" title="5. Qui peut y accéder">
        <p>
          Vos informations ne sont communiquées qu&apos;aux personnes et partenaires qui en ont
          besoin pour votre voyage :
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>les conseillers de l&apos;agence en charge de votre dossier ;</li>
          <li>les compagnies aériennes, hôtels, assureurs, loueurs et prestataires de transfert concernés ;</li>
          <li>les ambassades ou consulats lorsque votre dossier de visa le nécessite ;</li>
          <li>nos prestataires techniques, pour l&apos;hébergement du site et la messagerie.</li>
        </ul>
        <p>
          Chacun ne reçoit que les données nécessaires au service concerné. Les autorités publiques
          peuvent également demander des informations lorsque la loi l&apos;impose.
        </p>
      </LegalSection>

      <LegalSection id="transferts" title="6. Transferts hors du pays">
        <p>
          Certains prestataires (compagnies aériennes, plateformes de réservation, messagerie,
          hébergeur) peuvent traiter des informations en dehors de la République centrafricaine.
          Nous veillons à ce qu&apos;elles restent limitées à ce qui est nécessaire.
        </p>
      </LegalSection>

      <LegalSection id="conservation" title="7. Durée de conservation">
        <p>
          Les demandes non abouties sont conservées le temps nécessaire au suivi, puis supprimées.
          Les dossiers de réservation et les justificatifs comptables sont conservés pendant la durée
          légale applicable. Vous pouvez demander la suppression de vos données lorsque nous
          n&apos;avons plus d&apos;obligation de les garder.
        </p>
      </LegalSection>

      <LegalSection id="securite" title="8. Sécurité">
        <p>
          L&apos;accès à vos informations est limité aux personnes qui en ont besoin. Nous utilisons
          des moyens raisonnables pour les protéger contre la perte, l&apos;accès non autorisé ou la
          divulgation. Aucun système n&apos;étant infaillible, nous vous invitons à ne pas envoyer de
          documents sensibles par un canal non sécurisé sans nous en parler au préalable.
        </p>
      </LegalSection>

      <LegalSection id="droits" title="9. Vos droits">
        <p>
          Vous pouvez demander à consulter, corriger ou supprimer vos données, ou vous opposer à
          leur utilisation. Écrivez-nous à{" "}
          <a className="font-semibold text-azur underline underline-offset-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          en précisant votre demande. Nous vous répondons dans les meilleurs délais.
        </p>
        <p>
          Si vous recevez notre newsletter, vous pouvez vous désinscrire à tout moment en répondant
          au message ou en nous écrivant.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="10. Cookies et services tiers">
        <p>
          Ce site n&apos;utilise pas de cookies publicitaires ni d&apos;outil de mesure
          d&apos;audience. Des cookies techniques peuvent être déposés par l&apos;hébergeur pour
          assurer le fonctionnement et la sécurité du site.
        </p>
        <p>
          Lorsque vous lancez une recherche de vols, les codes d&apos;aéroport, les dates et le
          nombre de voyageurs sont transmis à notre prestataire de recherche aérienne (Duffel) afin
          d&apos;obtenir les horaires et les tarifs. Aucune donnée nominative n&apos;est nécessaire à
          cette étape. En cliquant sur un lien WhatsApp ou Facebook, vous quittez notre site et les
          conditions de ces services s&apos;appliquent.
        </p>
      </LegalSection>

      <LegalSection id="modifications" title="11. Modifications">
        <p>
          Cette politique peut être mise à jour pour refléter une évolution de nos services ou de la
          réglementation. La date de dernière modification figure en haut de page.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="12. Nous contacter">
        <p>
          FB Travel And Services — {site.address}. Téléphone : {site.phones[0].label}. E-mail :{" "}
          <a className="font-semibold text-azur underline underline-offset-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
