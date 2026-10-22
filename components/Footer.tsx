import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { NewsletterForm } from "./NewsletterForm";
import { services, site } from "@/lib/site";

const travelLinks = [
  { href: "/vols", label: "Billets d'avion" },
  { href: "/hotels", label: "Réservation d'hôtel" },
  { href: "/circuits", label: "Séjours & circuits" },
  { href: "/offres", label: "Offres du moment" },
  { href: "/visa", label: "Assistance visa" },
];

const agenceLinks = [
  { href: "/#agence", label: "L'agence" },
  { href: "/#destinations", label: "Destinations" },
  { href: "/#business-tour", label: "Business Tour Maroc" },
  { href: "/#faq", label: "Questions fréquentes" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-nuit-profond text-white">
      <div className="border-b border-white/10 bg-nuit">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.2em] text-soleil-clair">Newsletter</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Les bonnes offres, avant tout le monde.
            </h2>
            <p className="mt-3 max-w-lg text-white/70">
              Promotions des compagnies, dates à ne pas manquer et conseils pour préparer votre
              dossier, directement dans votre boîte.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-xs text-white/70">
            {site.tagline}. Billets d&apos;avion, hôtels, assurance, visa et location de voiture,
            depuis Bangui.
          </p>
          <div className="mt-6">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white/45">
              Suivez-nous
            </p>
            <SocialLinks className="mt-3" />
          </div>
        </div>

        <nav aria-label="Voyager" className="md:col-span-2">
          <h2 className="font-display text-base font-bold text-soleil-clair">Voyager</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {travelLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="md:col-span-2">
          <h2 className="font-display text-base font-bold text-soleil-clair">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`} className="hover:text-white hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="L'agence" className="md:col-span-2">
          <h2 className="font-display text-base font-bold text-soleil-clair">L&apos;agence</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {agenceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="font-display text-base font-bold text-soleil-clair">Nous joindre</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2.5">
              <FontAwesomeIcon icon={faLocationDot} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-soleil" />
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {site.address}
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
          <p>© 2026 FB Travel And Services, Bangui, République centrafricaine.</p>
          <nav aria-label="Informations légales" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/confidentialite" className="hover:text-white hover:underline">
              Confidentialité
            </Link>
            <Link href="/conditions" className="hover:text-white hover:underline">
              Conditions générales
            </Link>
            <Link href="/annulation" className="hover:text-white hover:underline">
              Annulation
            </Link>
            <Link href="/credits-photos" className="hover:text-white hover:underline">
              Crédits photos
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
