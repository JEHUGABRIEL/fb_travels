import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact — agence de voyage à Bangui",
  description:
    "Contactez FB Travel And Services à Bangui, au Parc du Cinquantenaire : téléphone, WhatsApp, e-mail et itinéraire.",
  path: "/contact",
  keywords: ["agence voyage Bangui contact", "FB Travel Bangui adresse", "téléphone agence voyage Centrafrique"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Écrivez-nous, appelez-nous, passez nous voir."
        intro="Une question sur un vol, un visa ou un séjour ? L'agence vous répond directement."
      />

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl font-bold">Envoyer une demande</h2>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        <aside className="lg:col-span-5">
          <h2 className="font-display text-3xl font-bold">L'agence</h2>
          <ul className="mt-8 space-y-7">
            <li className="flex gap-4">
              <FontAwesomeIcon icon={faLocationDot} className="mt-1 h-5 w-5 shrink-0 text-azur" />
              <div>
                <p className="font-semibold">{site.address}</p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-semibold text-azur underline underline-offset-4 hover:text-nuit"
                >
                  Obtenir l'itinéraire
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
                Page Facebook de l'agence
              </a>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}
