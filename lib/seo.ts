import type { Metadata } from "next";
import { faqs, services, site } from "@/lib/site";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "FB Travel And Services";
export const DEFAULT_IMAGE = "/images/hero-travel.jpg";

const localKeywords = [
  "agence de voyage Bangui",
  "billets d'avion Bangui",
  "réservation hôtel Bangui",
  "assistance visa Bangui",
  "agence de voyage Centrafrique",
  "FB Travel And Services",
];

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords: [...localKeywords, ...keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: image, alt: `${SITE_NAME} — agence de voyage à Bangui` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}

export function travelAgencyJsonLd() {
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
      "Agence de voyage à Bangui : billets d'avion, réservation d'hôtel, assurance voyage, assistance visa, circuits et location de voiture.",
    telephone: `+${site.whatsapp}`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Parc du Cinquantenaire, Lakouanga, face au restaurant Cafrina",
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
      { "@type": "Country", name: "République centrafricaine" },
      { "@type": "Place", name: "Afrique centrale" },
    ],
    sameAs: [site.facebook],
    knowsLanguage: ["fr"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de voyage",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.long,
          areaServed: "Bangui, République centrafricaine",
        },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#site`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "fr",
    publisher: { "@id": `${SITE_URL}/#agence` },
  };
}

export function faqJsonLd() {
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

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
