import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/figtree/index.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import { DEFAULT_IMAGE, SITE_NAME, SITE_URL, travelAgencyJsonLd, websiteJsonLd } from "@/lib/seo";

config.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FB Travel And Services | Agence de voyage à Bangui",
    template: "%s | FB Travel And Services",
  },
  description:
    "Agence de voyage à Bangui : billets d'avion, réservation d'hôtel, assurance voyage, assistance visa, guide touristique et location de voiture. L'expertise au service de vos besoins.",
  applicationName: SITE_NAME,
  category: "travel",
  keywords: [
    "agence de voyage Bangui",
    "billets d'avion Bangui",
    "réservation hôtel Bangui",
    "assistance visa Centrafrique",
    "assurance voyage Bangui",
    "location de voiture Bangui",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "FB Travel And Services | Agence de voyage à Bangui",
    description:
      "Billets d'avion, hôtels, assurance voyage, assistance visa et location de voiture depuis Bangui.",
    images: [{ url: DEFAULT_IMAGE, alt: "FB Travel And Services, agence de voyage à Bangui" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FB Travel And Services | Agence de voyage à Bangui",
    description:
      "Billets d'avion, hôtels, assurance voyage, assistance visa et location de voiture depuis Bangui.",
    images: [DEFAULT_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded focus:bg-soleil focus:px-4 focus:py-2 focus:font-bold focus:text-nuit"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd data={[travelAgencyJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
