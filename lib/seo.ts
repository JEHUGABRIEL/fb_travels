import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { localizedHref, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "FB Travel And Services";
export const DEFAULT_IMAGE = "/images/hero-travel.jpg";

const keywordsByLocale: Record<Locale, string[]> = {
  fr: [
    "agence de voyage Bangui",
    "billets d'avion Bangui",
    "réservation hôtel Bangui",
    "assistance visa Bangui",
    "agence de voyage Centrafrique",
    "FB Travel And Services",
  ],
  en: [
    "travel agency Bangui",
    "flights from Bangui",
    "hotels Bangui",
    "visa assistance Central African Republic",
    "travel agency Central African Republic",
    "FB Travel And Services",
  ],
};

const altImage: Record<Locale, string> = {
  fr: "FB Travel And Services — agence de voyage à Bangui",
  en: "FB Travel And Services — travel agency in Bangui",
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_IMAGE,
  locale = "fr",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  locale?: Locale;
}): Metadata {
  const canonical = localizedHref(locale, path);
  const url = `${SITE_URL}${canonical}`;
  const frPath = localizedHref("fr", path);
  const enPath = localizedHref("en", path);

  return {
    title,
    description,
    keywords: [...keywordsByLocale[locale], ...keywords],
    alternates: {
      canonical,
      languages: { "fr-FR": frPath, en: enPath, "x-default": frPath },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      alternateLocale: locale === "fr" ? "en_GB" : "fr_FR",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: image, alt: altImage[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}

export function travelAgencyJsonLd(locale: Locale = "fr") {
  const { services } = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#agence`,
    name: SITE_NAME,
    alternateName: "FB Travel",
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_IMAGE}`,
    logo: `${SITE_URL}/icon.svg`,
    description:
      locale === "fr"
        ? "Agence de voyage à Bangui : billets d'avion, réservation d'hôtel, assurance voyage, assistance visa, circuits et location de voiture."
        : "Travel agency in Bangui: flights, hotel bookings, travel insurance, visa assistance, tours and car rental.",
    telephone: `+${site.whatsapp}`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Parc du Cinquantenaire, Lakouanga, opposite the Cafrina restaurant",
      addressLocality: "Bangui",
      addressCountry: "CF",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.3947,
      longitude: 18.5582,
    },
    areaServed: [
      { "@type": "City", name: "Bangui" },
      { "@type": "Country", name: locale === "fr" ? "République centrafricaine" : "Central African Republic" },
      { "@type": "Place", name: locale === "fr" ? "Afrique centrale" : "Central Africa" },
    ],
    sameAs: [site.facebook],
    knowsLanguage: ["fr", "en"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "fr" ? "Services de voyage" : "Travel services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.long,
          areaServed:
            locale === "fr" ? "Bangui, République centrafricaine" : "Bangui, Central African Republic",
        },
      })),
    },
  };
}

export function websiteJsonLd(locale: Locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#site`,
    url: `${SITE_URL}${locale === "fr" ? "" : "/en"}`,
    name: SITE_NAME,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#agence` },
  };
}

export function faqJsonLd(locale: Locale = "fr") {
  const { faqs } = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[], locale: Locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${localizedHref(locale, item.path)}`,
    })),
  };
}
