import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n.server";

const copy = {
  fr: {
    metaTitle: "Contact — agence de voyage à Bangui",
    metaDescription:
      "Contactez FB Travel And Services à Bangui, au Parc du Cinquantenaire : téléphone, WhatsApp, e-mail et itinéraire.",
    metaKeywords: ["agence voyage Bangui contact", "FB Travel Bangui adresse", "téléphone agence voyage Centrafrique"],
    eyebrow: "Contact",
    title: "Écrivez-nous, appelez-nous, passez nous voir.",
    intro: "Une question sur un vol, un visa ou un séjour ? L'agence vous répond directement.",
    formTitle: "Envoyer une demande",
    agency: "L'agence",
    directions: "Obtenir l'itinéraire",
    facebook: "Page Facebook de l'agence",
  },
  en: {
    metaTitle: "Contact — travel agency in Bangui",
    metaDescription:
      "Contact FB Travel And Services in Bangui, at Parc du Cinquantenaire: phone, WhatsApp, email and directions.",
    metaKeywords: ["travel agency Bangui contact", "FB Travel Bangui address", "travel agency phone Central African Republic"],
    eyebrow: "Contact",
    title: "Write to us, call us or come and see us.",
    intro: "A question about a flight, a visa or a trip? The agency replies to you directly.",
    formTitle: "Send a request",
    agency: "The agency",
    directions: "Get directions",
    facebook: "Agency Facebook page",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = copy[locale];
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/contact",
    keywords: [...t.metaKeywords],
    locale,
  });
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = copy[locale];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl font-bold">{t.formTitle}</h2>
          <div className="mt-8">
            <ContactForm locale={locale} />
          </div>
        </div>

        <aside className="lg:col-span-5">
          <h2 className="font-display text-3xl font-bold">{t.agency}</h2>
          <ul className="mt-8 space-y-7">
            <li className="flex gap-4">
              <FontAwesomeIcon icon={faLocationDot} className="mt-1 h-5 w-5 shrink-0 text-azur" />
              <div>
                <p className="font-semibold">{site.addresses[locale]}</p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-semibold text-azur underline underline-offset-4 hover:text-nuit"
                >
                  {t.directions}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <FontAwesomeIcon icon={faPhone} className="mt-1 h-5 w-5 shrink-0 text-azur" />
              <div className="flex flex-col gap-1 font-semibold">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-azur">
                    {p.label}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex gap-4">
              <FontAwesomeIcon icon={faEnvelope} className="mt-1 h-5 w-5 shrink-0 text-azur" />
              <a href={`mailto:${site.email}`} className="break-all font-semibold hover:text-azur">
                {site.email}
              </a>
            </li>
            <li className="flex gap-4">
              <FontAwesomeIcon icon={faFacebookF} className="mt-1 h-5 w-5 shrink-0 text-azur" />
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-azur"
              >
                {t.facebook}
              </a>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}
