import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n.server";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildMetadata({
    title: locale === "fr" ? "Politique d'annulation" : "Cancellation policy",
    description:
      locale === "fr"
        ? "Conditions d'annulation et de remboursement des billets d'avion, hôtels, circuits et assurances réservés avec FB Travel And Services à Bangui."
        : "Cancellation and refund conditions for flights, hotels, tours and insurance booked with FB Travel And Services in Bangui.",
    path: "/annulation",
    locale,
  });
}

const sectionsFr = [
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

const sectionsEn = [
  { id: "principe", title: "General principle" },
  { id: "billets", title: "Flight tickets" },
  { id: "hotels", title: "Hotels" },
  { id: "circuits", title: "Tours and packages" },
  { id: "assurance", title: "Travel insurance" },
  { id: "visa", title: "Visa assistance" },
  { id: "demande", title: "How to request" },
  { id: "non-presentation", title: "No-show" },
  { id: "force-majeure", title: "Force majeure" },
  { id: "remboursements", title: "Refunds" },
  { id: "contact", title: "Contact" },
];

export default async function AnnulationPage() {
  const locale = await getLocale();
  const updated = locale === "fr" ? "22 octobre 2026" : "22 October 2026";

  if (locale === "en") {
    return (
      <LegalPage
        locale={locale}
        title="Cancellation policy"
        intro="Every booking follows the supplier's conditions. Here is how we handle requests to change, cancel and obtain a refund."
        path="/annulation"
        updated={updated}
        sections={sectionsEn}
      >
        <LegalSection id="principe" title="1. General principle">
          <p>
            Cancellation conditions are set by the airline, hotel, insurer or tour operator. They are
            stated in the quote or booking documents provided before confirmation.
          </p>
          <p>
            Some fares can neither be changed nor refunded. Others allow a change or partial refund,
            with fees. We explain these conditions to you before purchase.
          </p>
        </LegalSection>

        <LegalSection id="billets" title="2. Flight tickets">
          <p>
            Promotional or discounted tickets are generally non-refundable. Flexible tickets may be
            changed or refunded depending on the fare rule, sometimes with a penalty and the fare
            difference.
          </p>
          <p>
            A cancellation must be reported before departure. Refundable taxes may be recovered even
            when the ticket is not, depending on the airline.
          </p>
        </LegalSection>

        <LegalSection id="hotels" title="3. Hotels">
          <p>
            The free cancellation period depends on the hotel and the rate chosen. A late cancellation
            or an unused night may be charged. Non-refundable bookings are clearly marked as such.
          </p>
        </LegalSection>

        <LegalSection id="circuits" title="4. Tours and packages">
          <p>
            For organised trips, the operator's conditions apply. Fees may increase as the departure
            date approaches. Services already booked (flights, hotels, activities) may remain payable.
          </p>
        </LegalSection>

        <LegalSection id="assurance" title="5. Travel insurance">
          <p>
            Insurance follows the insurer's contract. Once cover is issued, the premium is generally
            due. Claims and reimbursements are handled according to the cover and supporting documents
            set out in the contract.
          </p>
        </LegalSection>

        <LegalSection id="visa" title="6. Visa assistance">
          <p>
            Assistance fees correspond to the work of preparing and checking the file. They are not
            refundable once the file has been prepared or submitted. Embassy fees are set and
            collected by the relevant authority.
          </p>
        </LegalSection>

        <LegalSection id="demande" title="7. How to request">
          <p>Contact us as soon as possible with:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>the lead passenger's name and the file reference;</li>
            <li>the flight(s), hotel(s) or service(s) concerned;</li>
            <li>the reason for cancellation, if you wish to give it;</li>
            <li>your contact details for follow-up.</li>
          </ul>
          <p>
            We confirm receipt, check the applicable conditions and tell you the amount that may be
            retained before starting the process.
          </p>
        </LegalSection>

        <LegalSection id="non-presentation" title="8. No-show">
          <p>
            A passenger who does not show up for boarding, or who does not arrive at the booked hotel,
            without prior cancellation is considered a no-show. Depending on the supplier, the ticket
            or the night may be lost without refund.
          </p>
        </LegalSection>

        <LegalSection id="force-majeure" title="9. Force majeure">
          <p>
            In the event of an exceptional circumstance beyond our control (border closure, natural
            disaster, strike, administrative decision), suppliers may offer a postponement, credit or
            refund according to their rules. We help you obtain these solutions.
          </p>
        </LegalSection>

        <LegalSection id="remboursements" title="10. Refunds">
          <p>
            A refund is only possible after the supplier agrees. Timeframes vary by airline or hotel
            and may exceed several weeks. The refund is made using the method agreed with the agency,
            taking into account costs already incurred and service fees.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="11. Contact">
          <p>
            For a cancellation, write to{" "}
            <a className="font-semibold text-azur underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            or call {site.phones[0].label}. You can also visit the agency: {site.addresses[locale]}.
          </p>
        </LegalSection>
      </LegalPage>
    );
  }

  return (
    <LegalPage
      locale={locale}
      title="Politique d'annulation"
      intro="Chaque réservation suit les conditions du prestataire. Voici comment nous traitons les demandes de modification, d'annulation et de remboursement."
      path="/annulation"
      updated={updated}
      sections={sectionsFr}
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
          annulation tardive ou une nuit non utilisée peut être facturée. Les réservations non
          remboursables sont signalées comme telles.
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
          ou appelez le {site.phones[0].label}. Vous pouvez aussi passer à l&apos;agence : {site.addresses[locale]}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
