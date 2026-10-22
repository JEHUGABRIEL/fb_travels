import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n.server";
import { localizedHref } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildMetadata({
    title: locale === "fr" ? "Conditions générales" : "Terms and conditions",
    description:
      locale === "fr"
        ? "Conditions générales de vente et de service de FB Travel And Services, agence de voyage à Bangui : devis, réservation, paiement et responsabilités."
        : "Terms and conditions of FB Travel And Services, travel agency in Bangui: quotes, bookings, payment and liability.",
    path: "/conditions",
    locale,
  });
}

const sectionsFr = [
  { id: "objet", title: "Objet" },
  { id: "role", title: "Notre rôle" },
  { id: "devis", title: "Devis et prix" },
  { id: "reservation", title: "Réservation et paiement" },
  { id: "documents", title: "Documents de voyage" },
  { id: "modification", title: "Modification et annulation" },
  { id: "prestataires", title: "Changements des prestataires" },
  { id: "assurance", title: "Assurance et bagages" },
  { id: "responsabilite", title: "Responsabilité" },
  { id: "reclamations", title: "Réclamations" },
  { id: "droit", title: "Droit applicable" },
  { id: "contact", title: "Contact" },
];

const sectionsEn = [
  { id: "objet", title: "Scope" },
  { id: "role", title: "Our role" },
  { id: "devis", title: "Quotes and prices" },
  { id: "reservation", title: "Booking and payment" },
  { id: "documents", title: "Travel documents" },
  { id: "modification", title: "Changes and cancellation" },
  { id: "prestataires", title: "Supplier changes" },
  { id: "assurance", title: "Insurance and baggage" },
  { id: "responsabilite", title: "Liability" },
  { id: "reclamations", title: "Complaints" },
  { id: "droit", title: "Governing law" },
  { id: "contact", title: "Contact" },
];

export default async function ConditionsPage() {
  const locale = await getLocale();
  const updated = locale === "fr" ? "22 octobre 2026" : "22 October 2026";

  if (locale === "en") {
    return (
      <LegalPage
        locale={locale}
        title="Terms and conditions"
        intro="These terms govern quote requests, bookings and services provided by FB Travel And Services from Bangui."
        path="/conditions"
        updated={updated}
        sections={sectionsEn}
      >
        <LegalSection id="objet" title="1. Scope">
          <p>
            These terms apply to the services offered by FB Travel And Services: flight tickets,
            hotel bookings, travel insurance, visa assistance, tours, car rental and related
            services.
          </p>
          <p>
            Any request sent to the agency implies acceptance of these terms. The specific terms of
            a ticket, hotel or insurer prevail over these terms where they are more detailed.
          </p>
        </LegalSection>

        <LegalSection id="role" title="2. Our role">
          <p>
            FB Travel And Services acts as an intermediary between you and travel suppliers
            (airlines, hotels, insurers, rental companies, carriers). The transport or accommodation
            contract is concluded with the relevant supplier under its own conditions.
          </p>
          <p>
            We support you in choosing, booking and following up on the file, but we are not the
            carrier and do not decide schedules, fares or boarding refusals.
          </p>
        </LegalSection>

        <LegalSection id="devis" title="3. Quotes and prices">
          <p>
            Prices are shown in CFA francs (XAF) unless stated otherwise. A quote is valid for the
            dates, number of travellers and availability stated when it is issued.
          </p>
          <p>
            Air fares change constantly. The price shown on the website is a starting price or an
            indication: only the quote confirmed by the agency, and then the booking issued, sets
            the final amount. Taxes, file fees and service fees are stated before confirmation.
          </p>
        </LegalSection>

        <LegalSection id="reservation" title="4. Booking and payment">
          <p>
            A booking is confirmed after you approve the quote and make the payment agreed with the
            agency. Payment terms are provided when you enquire; no online payment is taken on this
            website.
          </p>
          <p>
            For tickets and hotels, confirmation and travel documents are provided after issuance.
            Check immediately that names, dates and times match your request: some corrections are no
            longer possible after issuance.
          </p>
        </LegalSection>

        <LegalSection id="documents" title="5. Travel documents">
          <p>
            You are responsible for holding a valid passport, visas, vaccinations and authorisations
            required by your destination and transit countries. The agency can help you prepare a
            file, but the decision to grant a visa rests exclusively with the relevant authorities.
          </p>
          <p>
            A visa refusal, non-compliant passport or missing document does not entitle you to a
            refund of the ticket or costs incurred, except under a supplier's specific conditions.
          </p>
        </LegalSection>

        <LegalSection id="modification" title="6. Changes and cancellation">
          <p>
            Any change or cancellation must be requested in writing to the agency. The supplier's
            conditions apply: some tickets cannot be changed or refunded. Service fees may be added.
          </p>
          <p>
            Details are set out in our{" "}
            <a href={localizedHref(locale, "/annulation")} className="font-semibold text-azur underline underline-offset-2">
              cancellation policy
            </a>
            . The refund amount and timeframe depend on the airline, hotel or insurer.
          </p>
        </LegalSection>

        <LegalSection id="prestataires" title="7. Supplier changes">
          <p>
            Schedules, aircraft and itineraries can change, including after issuance, for operational
            or safety reasons. Airlines must inform you and offer a solution under their conditions.
            We help you understand and assert your rights, but cannot guarantee a solution that is
            outside our control.
          </p>
        </LegalSection>

        <LegalSection id="assurance" title="8. Insurance and baggage">
          <p>
            Travel insurance is recommended and sometimes required for a visa. Cover, exclusions and
            limits are those of the contract taken out with the insurer. Baggage is subject to the
            airline's rules; keep proof of check-in and report any loss or damage immediately.
          </p>
        </LegalSection>

        <LegalSection id="responsabilite" title="9. Liability">
          <p>
            We make every effort to provide accurate information and a complete file. We cannot be
            held liable for a delay, strike, border closure, administrative decision, weather event
            or any other cause beyond our control.
          </p>
          <p>
            Information published on this website is indicative and may change. It does not replace
            the quote confirmed by the agency.
          </p>
        </LegalSection>

        <LegalSection id="reclamations" title="10. Complaints">
          <p>
            If there is a problem, contact us quickly with your file number and any useful supporting
            documents. We review the request and explain the possible steps with the relevant
            supplier.
          </p>
        </LegalSection>

        <LegalSection id="droit" title="11. Governing law">
          <p>
            These terms are governed by the law of the Central African Republic. In the event of a
            dispute, we favour an amicable solution. Failing that, the competent courts of Bangui may
            be seized.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="12. Contact">
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
      title="Conditions générales"
      intro="Ces conditions encadrent les demandes de devis, les réservations et les prestations réalisées par FB Travel And Services depuis Bangui."
      path="/conditions"
      updated={updated}
      sections={sectionsFr}
    >
      <LegalSection id="objet" title="1. Objet">
        <p>
          Les présentes conditions s&apos;appliquent aux services proposés par FB Travel And
          Services : billets d&apos;avion, réservations d&apos;hôtel, assurance voyage, assistance
          visa, circuits, location de voiture et prestations associées.
        </p>
        <p>
          Toute demande adressée à l&apos;agence implique l&apos;acceptation de ces conditions. Les
          conditions particulières d&apos;un billet, d&apos;un hôtel ou d&apos;un assureur prévalent
          sur les présentes lorsqu&apos;elles sont plus précises.
        </p>
      </LegalSection>

      <LegalSection id="role" title="2. Notre rôle">
        <p>
          FB Travel And Services agit comme intermédiaire entre vous et les prestataires de voyage
          (compagnies aériennes, hôtels, assureurs, loueurs, transporteurs). Le contrat de transport
          ou d&apos;hébergement est conclu avec le prestataire concerné, selon ses propres conditions.
        </p>
        <p>
          Nous vous accompagnons dans le choix, la réservation et le suivi du dossier, mais nous ne
          sommes pas le transporteur et ne décidons pas des horaires, des tarifs ou des refus
          d&apos;embarquement.
        </p>
      </LegalSection>

      <LegalSection id="devis" title="3. Devis et prix">
        <p>
          Les prix sont indiqués en francs CFA (FCFA), sauf mention contraire. Un devis est valable
          pour les dates, le nombre de voyageurs et les disponibilités indiqués au moment de sa
          rédaction.
        </p>
        <p>
          Les tarifs aériens évoluent en permanence. Le prix affiché sur le site est un prix de
          départ ou une indication : seul le devis confirmé par l&apos;agence, puis la réservation
          émise, fixe le montant définitif. Les taxes, frais de dossier et frais de service sont
          précisés avant validation.
        </p>
      </LegalSection>

      <LegalSection id="reservation" title="4. Réservation et paiement">
        <p>
          Une réservation est confirmée après votre accord sur le devis et le paiement convenu avec
          l&apos;agence. Les modalités de paiement sont communiquées lors de la demande ; aucun
          paiement en ligne n&apos;est effectué sur ce site.
        </p>
        <p>
          Pour les billets et les hôtels, la confirmation et les documents de voyage vous sont remis
          après émission. Vérifiez immédiatement que les noms, dates et horaires correspondent à
          votre demande : certaines corrections ne sont plus possibles après émission.
        </p>
      </LegalSection>

      <LegalSection id="documents" title="5. Documents de voyage">
        <p>
          Il vous appartient de disposer d&apos;un passeport valide, des visas, vaccinations et
          autorisations exigés par votre destination et les pays de transit. L&apos;agence peut vous
          aider à préparer un dossier, mais la décision d&apos;accorder un visa appartient
          exclusivement aux autorités concernées.
        </p>
        <p>
          Un refus de visa, un passeport non conforme ou un document manquant ne donne pas droit à un
          remboursement du billet ou des frais engagés, sauf conditions particulières du prestataire.
        </p>
      </LegalSection>

      <LegalSection id="modification" title="6. Modification et annulation">
        <p>
          Toute modification ou annulation doit être demandée par écrit à l&apos;agence. Les
          conditions du prestataire s&apos;appliquent : certains billets ne sont ni modifiables ni
          remboursables. Des frais de service peuvent s&apos;ajouter.
        </p>
        <p>
          Le détail figure dans notre{" "}
          <a href={localizedHref(locale, "/annulation")} className="font-semibold text-azur underline underline-offset-2">
            politique d&apos;annulation
          </a>
          . Le montant et le délai de remboursement dépendent de la compagnie, de l&apos;hôtel ou de
          l&apos;assureur.
        </p>
      </LegalSection>

      <LegalSection id="prestataires" title="7. Changements des prestataires">
        <p>
          Les horaires, appareils et itinéraires peuvent changer, y compris après émission, pour des
          raisons opérationnelles ou de sécurité. Les compagnies doivent vous en informer et proposer
          une solution selon leurs conditions. Nous vous aidons à comprendre et à faire valoir vos
          droits, sans pouvoir garantir une solution qui ne dépend pas de nous.
        </p>
      </LegalSection>

      <LegalSection id="assurance" title="8. Assurance et bagages">
        <p>
          Une assurance voyage est recommandée, et parfois exigée pour un visa. Les garanties,
          exclusions et plafonds sont ceux du contrat souscrit auprès de l&apos;assureur. Les bagages
          sont soumis aux règles de la compagnie ; conservez les preuves de dépôt et signalez
          immédiatement toute perte ou détérioration.
        </p>
      </LegalSection>

      <LegalSection id="responsabilite" title="9. Responsabilité">
        <p>
          Nous mettons tout en œuvre pour vous proposer des informations exactes et un dossier
          complet. Notre responsabilité ne peut être engagée pour un retard, une grève, une
          fermeture de frontière, une décision administrative, un événement météorologique ou toute
          autre cause extérieure à notre contrôle.
        </p>
        <p>
          Les informations publiées sur ce site sont fournies à titre indicatif et peuvent évoluer.
          Elles ne remplacent pas le devis confirmé par l&apos;agence.
        </p>
      </LegalSection>

      <LegalSection id="reclamations" title="10. Réclamations">
        <p>
          En cas de problème, contactez-nous rapidement avec votre numéro de dossier et les
          justificatifs utiles. Nous analysons la demande et vous indiquons les démarches possibles
          auprès du prestataire concerné.
        </p>
      </LegalSection>

      <LegalSection id="droit" title="11. Droit applicable">
        <p>
          Les présentes conditions sont soumises au droit de la République centrafricaine. En cas de
          différend, nous privilégions une solution amiable. À défaut, les juridictions compétentes
          de Bangui peuvent être saisies.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="12. Contact">
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
