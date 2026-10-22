import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { NewsletterForm } from "./NewsletterForm";
import { getContent } from "@/lib/content";
import { localizedHref, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const copy = {
  fr: {
    newsletter: "Newsletter",
    newsletterTitle: "Les bonnes offres, avant tout le monde.",
    newsletterText:
      "Promotions des compagnies, dates à ne pas manquer et conseils pour préparer votre dossier, directement dans votre boîte.",
    tagline:
      "Billets d'avion, hôtels, assurance, visa et location de voiture, depuis Bangui.",
    follow: "Suivez-nous",
    travel: "Voyager",
    travelLinks: [
      { href: "/vols", label: "Billets d'avion" },
      { href: "/hotels", label: "Réservation d'hôtel" },
      { href: "/circuits", label: "Séjours & circuits" },
      { href: "/offres", label: "Offres du moment" },
      { href: "/visa", label: "Assistance visa" },
    ],
    services: "Services",
    agency: "L'agence",
    agencyLinks: [
      { href: "/#agence", label: "L'agence" },
      { href: "/#destinations", label: "Destinations" },
      { href: "/#business-tour", label: "Business Tour Maroc" },
      { href: "/#faq", label: "Questions fréquentes" },
      { href: "/contact", label: "Contact" },
    ],
    contact: "Nous joindre",
    copyright: "© 2026 FB Travel And Services, Bangui, République centrafricaine.",
    legalNav: "Informations légales",
    legal: [
      { href: "/confidentialite", label: "Confidentialité" },
      { href: "/conditions", label: "Conditions générales" },
      { href: "/annulation", label: "Annulation" },
      { href: "/credits-photos", label: "Crédits photos" },
    ],
  },
  en: {
    newsletter: "Newsletter",
    newsletterTitle: "The best offers, before everyone else.",
    newsletterText:
      "Airline promotions, dates not to miss and advice to prepare your file, straight to your inbox.",
    tagline: "Flights, hotels, insurance, visa and car rental, from Bangui.",
    follow: "Follow us",
    travel: "Travel",
    travelLinks: [
      { href: "/vols", label: "Flight tickets" },
      { href: "/hotels", label: "Hotel booking" },
      { href: "/circuits", label: "Tours & packages" },
      { href: "/offres", label: "Current offers" },
      { href: "/visa", label: "Visa assistance" },
    ],
    services: "Services",
    agency: "The agency",
    agencyLinks: [
      { href: "/#agence", label: "The agency" },
      { href: "/#destinations", label: "Destinations" },
      { href: "/#business-tour", label: "Morocco Business Tour" },
      { href: "/#faq", label: "Frequently asked questions" },
      { href: "/contact", label: "Contact" },
    ],
    contact: "Get in touch",
    copyright: "© 2026 FB Travel And Services, Bangui, Central African Republic.",
    legalNav: "Legal information",
    legal: [
      { href: "/confidentialite", label: "Privacy" },
      { href: "/conditions", label: "Terms" },
      { href: "/annulation", label: "Cancellation" },
      { href: "/credits-photos", label: "Photo credits" },
    ],
  },
} as const;

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { services } = getContent(locale);

  return (
    <footer className="bg-nuit-profond text-white">
      <div className="border-b border-white/10 bg-nuit">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.2em] text-soleil-clair">
              {t.newsletter}
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              {t.newsletterTitle}
            </h2>
            <p className="mt-3 max-w-lg text-white/70">{t.newsletterText}</p>
          </div>
          <NewsletterForm locale={locale} />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light locale={locale} />
          <p className="mt-5 max-w-xs text-white/70">
            {site.taglines[locale]}. {t.tagline}
          </p>
          <div className="mt-6">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white/45">
              {t.follow}
            </p>
            <SocialLinks className="mt-3" />
          </div>
        </div>

        <nav aria-label={t.travel} className="md:col-span-2">
          <h2 className="font-display text-base font-bold text-soleil-clair">{t.travel}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {t.travelLinks.map((l) => (
              <li key={l.href}>
                <Link href={localizedHref(locale, l.href)} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.services} className="md:col-span-2">
          <h2 className="font-display text-base font-bold text-soleil-clair">{t.services}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={localizedHref(locale, `/services#${s.id}`)}
                  className="hover:text-white hover:underline"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.agency} className="md:col-span-2">
          <h2 className="font-display text-base font-bold text-soleil-clair">{t.agency}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {t.agencyLinks.map((l) => (
              <li key={l.href}>
                <Link href={localizedHref(locale, l.href)} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="font-display text-base font-bold text-soleil-clair">{t.contact}</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2.5">
              <FontAwesomeIcon icon={faLocationDot} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-soleil" />
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {site.addresses[locale]}
              </a>
            </li>
            <li className="flex gap-2.5">
              <FontAwesomeIcon icon={faPhone} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-soleil" />
              <span className="flex flex-col gap-1">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-white">
                    {p.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-2.5">
              <FontAwesomeIcon icon={faEnvelope} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-soleil" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.copyright}</p>
          <nav aria-label={t.legalNav} className="flex flex-wrap gap-x-5 gap-y-2">
            {t.legal.map((l) => (
              <Link key={l.href} href={localizedHref(locale, l.href)} className="hover:text-white hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
