import type { Metadata } from "next";
import "../globals.css";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/figtree/index.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import { DEFAULT_IMAGE, SITE_NAME, SITE_URL, travelAgencyJsonLd, websiteJsonLd } from "@/lib/seo";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

config.autoAddCss = false;

const meta: Record<Locale, { title: string; template: string; description: string; og: string }> = {
  fr: {
    title: "FB Travel And Services | Agence de voyage à Bangui",
    template: "%s | FB Travel And Services",
    description:
      "Agence de voyage à Bangui : billets d'avion, réservation d'hôtel, assurance voyage, assistance visa, guide touristique et location de voiture. L'expertise au service de vos besoins.",
    og: "Billets d'avion, hôtels, assurance voyage, assistance visa et location de voiture depuis Bangui.",
  },
  en: {
    title: "FB Travel And Services | Travel agency in Bangui",
    template: "%s | FB Travel And Services",
    description:
      "Travel agency in Bangui: flights, hotel bookings, travel insurance, visa assistance, guided tours and car rental. Local expertise for every trip.",
    og: "Flights, hotels, travel insurance, visa assistance and car rental from Bangui.",
  },
};

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const t = meta[locale];
  const path = locale === "fr" ? "/" : "/en";

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.title, template: t.template },
    description: t.description,
    applicationName: SITE_NAME,
    category: "travel",
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: path,
      languages: { "fr-FR": "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      alternateLocale: locale === "fr" ? "en_GB" : "fr_FR",
      siteName: SITE_NAME,
      url: path,
      title: t.title,
      description: t.og,
      images: [{ url: DEFAULT_IMAGE, alt: t.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.og,
      images: [DEFAULT_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { telephone: true, address: true, email: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;

  return (
    <html lang={locale} className="h-full">
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded focus:bg-soleil focus:px-4 focus:py-2 focus:font-bold focus:text-nuit"
        >
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <Header locale={locale} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        <WhatsAppFloat locale={locale} />
        <JsonLd data={[travelAgencyJsonLd(locale), websiteJsonLd(locale)]} />
      </body>
    </html>
  );
}
