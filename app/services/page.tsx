import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBoxesStacked, faShieldHeart, faBuildingNgo } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PageHero } from "@/components/PageHero";
import { ServiceIcon } from "@/components/ServiceIcon";
import { services, whatsappLink } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services de voyage à Bangui",
  description:
    "Billets d'avion, réservation d'hôtel, assurance voyage, assistance visa, guide touristique et location de voiture à Bangui.",
  path: "/services",
  keywords: ["services voyage Bangui", "assurance voyage Centrafrique", "location voiture Bangui"],
});

const extras = [
  {
    icon: faBoxesStacked,
    title: "Fournitures de bureau",
    text: "Le matériel dont votre équipe a besoin au quotidien.",
  },
  {
    icon: faShieldHeart,
    title: "Produits d'assurance",
    text: "Des protections pour vos activités, au-delà du voyage.",
  },
  {
    icon: faBuildingNgo,
    title: "Prestations pour ONG et organisations",
    text: "Déplacements, hébergements et logistique pour vos missions.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Six services pour un seul voyage."
        intro="Du billet à l'hôtel, de l'assurance au visa : vous décrivez votre projet, nous nous occupons du reste."
      />

      <div className="mx-auto max-w-7xl px-5">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`grid gap-10 border-b border-nuit/15 py-16 lg:grid-cols-12 ${i === services.length - 1 ? "border-b-0" : ""}`}
          >
            <div className="lg:col-span-5">
              <ServiceIcon name={s.icon} className="h-9 w-9 text-azur" />
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
                {s.title}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="max-w-xl text-lg leading-relaxed text-nuit/85">{s.long}</p>
              <ul className="mt-7 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCheck} className="mt-1.5 h-4 w-4 shrink-0 text-azur" />
                    <span className="max-w-xl">{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(s.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2.5 rounded bg-nuit px-6 py-3.5 font-bold text-white transition-colors hover:bg-azur"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-soleil-clair" />
                Demander ce service
              </a>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-brume">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-12">
          <h2 className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:col-span-5">
            Et au-delà du voyage.
          </h2>
          <ul className="lg:col-span-7">
            {extras.map((e) => (
              <li key={e.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-nuit/20 py-6 last:border-b">
                <FontAwesomeIcon icon={e.icon} className="mt-1 h-6 w-6 text-azur" />
                <div>
                  <h3 className="font-display text-2xl font-bold">{e.title}</h3>
                  <p className="mt-1 text-nuit/75">{e.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
