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
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n.server";
import { localizedHref } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const copy = {
  fr: {
    metaTitle: "Vols au départ de Bangui",
    metaDescription:
      "Billets d'avion au départ de Bangui vers Douala, Paris, Dakar, Casablanca, Dubaï et au-delà. Comparez les vols et demandez un devis gratuit à FB Travel And Services.",
    metaKeywords: ["vol Bangui Douala", "billet avion Bangui Paris", "vol pas cher Centrafrique"],
    eyebrow: "Billets d'avion",
    title: "Le bon vol, au bon prix, depuis Bangui.",
    intro:
      "Aller simple, aller-retour, voyage en groupe : dites-nous où vous allez et quand, nous cherchons les options et nous occupons de la réservation.",
    whyEyebrow: "Pourquoi passer par l'agence",
    whyTitle: "Un billet, c'est aussi un dossier.",
    whyIntro:
      "Réserver en ligne ne dit pas tout : correspondances, bagages, conditions de modification et cohérence avec votre visa comptent autant que le prix.",
    reasons: [
      {
        title: "Le bon tarif, pas juste le premier",
        text: "Nous comparons les options disponibles selon vos dates et votre souplesse, puis vous présentons le choix le plus cohérent.",
      },
      {
        title: "Un dossier de voyage complet",
        text: "Vol, hôtel et assurance peuvent être réservés ensemble, avec des dates cohérentes pour votre visa.",
      },
      {
        title: "Un suivi après l'émission",
        text: "Modification, bagages, correspondance : vous gardez le même interlocuteur jusqu'au départ.",
      },
    ],
    destEyebrow: "Destinations",
    destTitle: "Où souhaitez-vous aller ?",
    destIntro:
      "Les liaisons les plus demandées par nos clients. Les tarifs affichés sont des prix de départ, à confirmer selon les dates.",
    destNote:
      "Votre destination n'est pas dans la liste ? Demandez-nous : nous cherchons aussi les trajets avec correspondance.",
    tipsEyebrow: "Conseils",
    tipsTitle: "Trois vérifications avant d'acheter.",
    tips: [
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
    ],
    ctaTitle: "Vous avez vos dates ? Nous avons les vols.",
    ctaText:
      "Envoyez-nous votre trajet sur WhatsApp. Un conseiller revient vers vous avec les options et le tarif exact.",
    quote: "Demander un devis",
    contact: "Contact",
    quoteMsg: "Bonjour FB Travel, je souhaite un devis de vol.",
    faqTitle: "Questions sur les vols.",
    freeQuote: "Devis gratuit et sans engagement.",
  },
  en: {
    metaTitle: "Flights from Bangui",
    metaDescription:
      "Flight tickets from Bangui to Douala, Paris, Dakar, Casablanca, Dubai and beyond. Compare flights and request a free quote from FB Travel And Services.",
    metaKeywords: ["Bangui Douala flight", "Bangui Paris flight ticket", "cheap flights Central African Republic"],
    eyebrow: "Flight tickets",
    title: "The right flight at the right price, from Bangui.",
    intro:
      "One way, return or group travel: tell us where you are going and when, and we will look up the options and handle the booking.",
    whyEyebrow: "Why book through the agency",
    whyTitle: "A ticket is also a file.",
    whyIntro:
      "Booking online does not tell the whole story: connections, baggage, change conditions and consistency with your visa matter as much as the price.",
    reasons: [
      {
        title: "The right fare, not just the first",
        text: "We compare the options available for your dates and flexibility, then present the most consistent choice.",
      },
      {
        title: "A complete travel file",
        text: "Flight, hotel and insurance can be booked together, with dates that work for your visa.",
      },
      {
        title: "Support after ticketing",
        text: "Changes, baggage, connections: you keep the same point of contact until departure.",
      },
    ],
    destEyebrow: "Destinations",
    destTitle: "Where would you like to go?",
    destIntro:
      "The routes our clients ask for most. The fares shown are starting prices, to be confirmed according to dates.",
    destNote:
      "Your destination is not on the list? Ask us: we also look for routes with connections.",
    tipsEyebrow: "Advice",
    tipsTitle: "Three checks before you buy.",
    tips: [
      {
        title: "Passport and visa",
        text: "Check your passport validity (often six months after return) and the visa requirements before you buy.",
      },
      {
        title: "Flexible dates",
        text: "Shifting your departure by a few days can change the price significantly. Tell us how flexible you are.",
      },
      {
        title: "Baggage",
        text: "Checked baggage is not always included. We check what is covered before ticketing.",
      },
    ],
    ctaTitle: "Have your dates? We have the flights.",
    ctaText:
      "Send us your route on WhatsApp. An adviser will reply with the options and the exact fare.",
    quote: "Request a quote",
    contact: "Contact",
    quoteMsg: "Hello FB Travel, I would like a flight quote.",
    faqTitle: "Flight questions.",
    freeQuote: "Free quote with no obligation.",
  },
} as const;

const reasonIcons = [faTicket, faPlaneDeparture, faHeadset];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = copy[locale];
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/vols",
    keywords: [...t.metaKeywords],
    locale,
  });
}

export default async function VolsPage() {
  const locale = await getLocale();
  const t = copy[locale];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">
        <FlightSearch locale={locale} />
      </div>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle eyebrow={t.whyEyebrow} title={t.whyTitle} intro={t.whyIntro} align="center" />
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {t.reasons.map((r, i) => (
            <li key={r.title} className="rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brume text-azur">
                <FontAwesomeIcon icon={reasonIcons[i]} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-nuit/70">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-brume">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle eyebrow={t.destEyebrow} title={t.destTitle} intro={t.destIntro} />
          <div className="mt-10">
            <DestinationGrid locale={locale} />
          </div>
          <p className="mt-6 text-sm text-nuit/55">{t.destNote}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle eyebrow={t.tipsEyebrow} title={t.tipsTitle} />
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {t.tips.map((tip, i) => (
            <li key={tip.title} className="border-t border-nuit/15 pt-5">
              <span className="font-display text-3xl font-extrabold text-soleil">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-nuit/70">{tip.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-nuit text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{t.ctaTitle}</h2>
            <p className="mt-3 max-w-xl text-white/70">{t.ctaText}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={whatsappLink(t.quoteMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-soleil px-6 py-3.5 font-bold text-nuit transition-colors hover:bg-soleil-clair"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
              {t.quote}
            </a>
            <Link
              href={localizedHref(locale, "/contact")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 font-bold transition-colors hover:border-soleil hover:text-soleil"
            >
              {t.contact}
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle eyebrow="FAQ" title={t.faqTitle} />
            <p className="mt-5 flex items-start gap-2 text-nuit/70">
              <FontAwesomeIcon icon={faCircleCheck} className="mt-1 h-4 w-4 shrink-0 text-azur" />
              {t.freeQuote}
            </p>
          </div>
          <div className="lg:col-span-8">
            <Faq locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
