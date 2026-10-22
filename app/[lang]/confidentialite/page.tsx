import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n.server";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildMetadata({
    title: locale === "fr" ? "Politique de confidentialité" : "Privacy policy",
    description:
      locale === "fr"
        ? "Comment FB Travel And Services, agence de voyage à Bangui, collecte, utilise et protège vos données personnelles."
        : "How FB Travel And Services, a travel agency in Bangui, collects, uses and protects your personal data.",
    path: "/confidentialite",
    locale,
  });
}

const sectionsFr = [
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

const sectionsEn = [
  { id: "responsable", title: "Data controller" },
  { id: "donnees", title: "Data we collect" },
  { id: "finalites", title: "Why we use it" },
  { id: "base", title: "Legal basis" },
  { id: "destinataires", title: "Who can access it" },
  { id: "transferts", title: "Transfers outside the country" },
  { id: "conservation", title: "Retention period" },
  { id: "securite", title: "Security" },
  { id: "droits", title: "Your rights" },
  { id: "cookies", title: "Cookies and third-party services" },
  { id: "modifications", title: "Changes" },
  { id: "contact", title: "Contact us" },
];

export default async function ConfidentialitePage() {
  const locale = await getLocale();
  const updated = locale === "fr" ? "22 octobre 2026" : "22 October 2026";

  if (locale === "en") {
    return (
      <LegalPage
        locale={locale}
        title="Privacy policy"
        intro="We use your information only to answer your travel requests and arrange your bookings. Here is, in plain language, what we collect and why."
        path="/confidentialite"
        updated={updated}
        sections={sectionsEn}
      >
        <LegalSection id="responsable" title="1. Data controller">
          <p>
            The data controller is <strong>FB Travel And Services</strong>, a travel agency located
            at {site.addresses[locale]}, in Bangui, Central African Republic.
          </p>
          <p>
            For any question about your data, write to{" "}
            <a className="font-semibold text-azur underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            or call {site.phones[0].label}.
          </p>
        </LegalSection>

        <LegalSection id="donnees" title="2. Data we collect">
          <p>We may receive the following information when you contact us:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>your name, phone number and email address;</li>
            <li>your travel details: destination, dates, number of travellers, cabin, budget;</li>
            <li>the content of your messages and any documents you choose to send us;</li>
            <li>
              information needed for a booking: passenger names, date of birth, nationality,
              passport number when the airline or hotel requires it.
            </li>
          </ul>
          <p>
            Forms on this website are not stored on a server: they compose a message that you send
            yourself via WhatsApp or your email app. The information therefore arrives directly in
            our working tools.
          </p>
        </LegalSection>

        <LegalSection id="finalites" title="3. Why we use it">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>to answer your request and prepare a quote;</li>
            <li>to make flight, hotel, insurance or car bookings;</li>
            <li>to help you prepare a visa application;</li>
            <li>to inform you of a flight change or an important deadline;</li>
            <li>to meet our accounting and legal obligations.</li>
          </ul>
          <p>We do not sell your data or use it for targeted advertising.</p>
        </LegalSection>

        <LegalSection id="base" title="4. Legal basis">
          <p>
            Processing is based on your request and your consent when you contact us, on the
            performance of the service you requested, and on our legal obligations for travel
            documents and accounting.
          </p>
        </LegalSection>

        <LegalSection id="destinataires" title="5. Who can access it">
          <p>
            Your information is shared only with the people and partners who need it for your trip:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>the agency advisers handling your file;</li>
            <li>the airlines, hotels, insurers, rental companies and transfer providers concerned;</li>
            <li>embassies or consulates where your visa application requires it;</li>
            <li>our technical providers, for website hosting and email.</li>
          </ul>
          <p>
            Each receives only the data needed for the relevant service. Public authorities may also
            request information where required by law.
          </p>
        </LegalSection>

        <LegalSection id="transferts" title="6. Transfers outside the country">
          <p>
            Some providers (airlines, booking platforms, email services, hosting providers) may
            process information outside the Central African Republic. We ensure it remains limited to
            what is necessary.
          </p>
        </LegalSection>

        <LegalSection id="conservation" title="7. Retention period">
          <p>
            Requests that do not proceed are kept for as long as needed for follow-up, then deleted.
            Booking files and accounting records are kept for the applicable legal period. You can
            ask us to delete your data once we no longer have an obligation to keep it.
          </p>
        </LegalSection>

        <LegalSection id="securite" title="8. Security">
          <p>
            Access to your information is limited to people who need it. We use reasonable means to
            protect it against loss, unauthorised access or disclosure. No system is infallible, so we
            invite you not to send sensitive documents through an insecure channel without talking to
            us first.
          </p>
        </LegalSection>

        <LegalSection id="droits" title="9. Your rights">
          <p>
            You can ask to access, correct or delete your data, or object to its use. Write to us at{" "}
            <a className="font-semibold text-azur underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            stating your request. We reply as soon as possible.
          </p>
          <p>
            If you receive our newsletter, you can unsubscribe at any time by replying to the message
            or writing to us.
          </p>
        </LegalSection>

        <LegalSection id="cookies" title="10. Cookies and third-party services">
          <p>
            This website does not use advertising cookies or audience measurement tools. Technical
            cookies may be set by the hosting provider to ensure the site works and remains secure.
          </p>
          <p>
            When you run a flight search, the airport codes, dates and number of travellers are sent
            to our flight search provider (Duffel) to obtain schedules and fares. No personal data is
            required at this stage. By clicking a WhatsApp or Facebook link, you leave our site and
            those services' terms apply.
          </p>
        </LegalSection>

        <LegalSection id="modifications" title="11. Changes">
          <p>
            This policy may be updated to reflect changes in our services or in the regulations. The
            last update date appears at the top of the page.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="12. Contact us">
          <p>
            FB Travel And Services — {site.addresses[locale]}. Phone: {site.phones[0].label}. Email:{" "}
            <a className="font-semibold text-azur underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </LegalSection>
      </LegalPage>
    );
  }

  return (
    <LegalPage
      locale={locale}
      title="Politique de confidentialité"
      intro="Nous utilisons vos informations uniquement pour répondre à vos demandes de voyage et organiser vos réservations. Voici, en clair, ce que nous collectons et pourquoi."
      path="/confidentialite"
      updated={updated}
      sections={sectionsFr}
    >
      <LegalSection id="responsable" title="1. Responsable du traitement">
        <p>
          Le responsable du traitement est <strong>FB Travel And Services</strong>, agence de voyage
          située {site.addresses[locale]}, à Bangui, en République centrafricaine.
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
          <li>
            les informations nécessaires à une réservation : nom des passagers, date de naissance,
            nationalité, numéro de passeport lorsque la compagnie ou l&apos;hôtel l&apos;exige.
          </li>
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
          FB Travel And Services — {site.addresses[locale]}. Téléphone : {site.phones[0].label}. E-mail :{" "}
          <a className="font-semibold text-azur underline underline-offset-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
