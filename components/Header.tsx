"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faPhone, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { site, whatsappLink } from "@/lib/site";
import { localizedHref, stripLocalePrefix, type Locale } from "@/lib/i18n";

const copy = {
  fr: {
    nav: [
      { href: "/vols", label: "Vols" },
      { href: "/hotels", label: "Hôtels" },
      { href: "/circuits", label: "Séjours & circuits" },
      { href: "/services", label: "Services" },
      { href: "/offres", label: "Offres" },
      { href: "/visa", label: "Visa" },
      { href: "/contact", label: "Contact" },
    ],
    mainNav: "Navigation principale",
    mobileNav: "Navigation mobile",
    open: "Ouvrir le menu",
    close: "Fermer le menu",
    call: "Appeler",
    write: "Écrire sur WhatsApp",
    help: "Bonjour FB Travel, j'aimerais de l'aide pour organiser un voyage.",
  },
  en: {
    nav: [
      { href: "/vols", label: "Flights" },
      { href: "/hotels", label: "Hotels" },
      { href: "/circuits", label: "Tours & packages" },
      { href: "/services", label: "Services" },
      { href: "/offres", label: "Offers" },
      { href: "/visa", label: "Visa" },
      { href: "/contact", label: "Contact" },
    ],
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    open: "Open menu",
    close: "Close menu",
    call: "Call us",
    write: "Message us on WhatsApp",
    help: "Hello FB Travel, I would like help planning a trip.",
  },
} as const;

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = copy[locale];
  const cleanPath = stripLocalePrefix(pathname ?? "/");

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm shadow-nuit/5 backdrop-blur">
      <div className="hidden bg-nuit-profond text-[0.8rem] text-white/75 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-2">
          <div className="flex items-center gap-6">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-soleil" />
              {site.addressShort}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="hidden items-center gap-2 hover:text-white lg:flex">
              <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3 text-soleil" />
              {site.email}
            </a>
            <a href={`tel:${site.phones[0].tel}`} className="flex items-center gap-2 font-semibold hover:text-white">
              <FontAwesomeIcon icon={faPhone} className="h-3 w-3 text-soleil" />
              {site.phones[0].label}
            </a>
            <span className="hidden h-3 w-px bg-white/25 lg:block" aria-hidden="true" />
            <SocialLinks compact className="hidden lg:flex" />
            <LanguageSwitcher locale={locale} dark />
          </div>
        </div>
      </div>

      <div className="border-b border-nuit/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <Logo locale={locale} />

          <nav aria-label={t.mainNav} className="hidden items-center gap-0.5 xl:flex">
            {t.nav.map((l) => {
              const active = cleanPath === l.href;
              return (
                <Link
                  key={l.href}
                  href={localizedHref(locale, l.href)}
                  className={`rounded-full px-3.5 py-2 text-[0.92rem] font-semibold transition-colors hover:bg-brume ${
                    active ? "text-azur" : "text-nuit"
                  }`}
                >
                  {l.label}
                  {active && <span className="mx-1 inline-block h-1.5 w-1.5 rounded-full bg-soleil align-middle" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} className="md:hidden" />
            <a
              href={whatsappLink(t.help)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-soleil px-4 py-2.5 text-[0.9rem] font-bold text-nuit transition-colors hover:bg-soleil-clair sm:inline-flex"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${site.phones[0].tel}`}
              className="hidden items-center gap-2 rounded-full border-2 border-nuit px-4 py-2 text-[0.9rem] font-bold text-nuit transition-colors hover:bg-nuit hover:text-white lg:inline-flex xl:hidden 2xl:inline-flex"
            >
              <FontAwesomeIcon icon={faPhone} className="h-3.5 w-3.5" />
              {t.call}
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-nuit/20 xl:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? t.close : t.open}
              onClick={() => setOpen((v) => !v)}
            >
              <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label={t.mobileNav} className="border-b border-nuit/10 bg-white xl:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-2">
            {t.nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={localizedHref(locale, l.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-nuit/10 py-4 font-display text-xl font-bold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto grid max-w-7xl gap-3 px-5 py-5 sm:grid-cols-2">
            <a
              href={whatsappLink(t.help)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-soleil px-4 py-3 font-bold text-nuit"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
              {t.write}
            </a>
            <a
              href={`tel:${site.phones[0].tel}`}
              className="flex items-center justify-center gap-2 rounded-full bg-nuit px-4 py-3 font-bold text-white"
            >
              <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-soleil-clair" />
              {site.phones[0].label}
            </a>
            <p className="flex items-center gap-2 text-sm text-nuit/70 sm:col-span-2">
              <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4 text-azur" />
              {site.address}
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <SocialLinks compact />
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm font-semibold text-azur">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                {site.email}
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
