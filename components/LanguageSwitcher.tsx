"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLocaleHref, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({
  locale,
  className = "",
  dark = false,
}: {
  locale: Locale;
  className?: string;
  dark?: boolean;
}) {
  const pathname = usePathname() ?? "/";

  return (
    <div
      className={`inline-flex items-center rounded-full border p-0.5 text-[0.72rem] font-bold ${
        dark ? "border-white/25" : "border-nuit/15"
      } ${className}`}
      aria-label={locale === "fr" ? "Choisir la langue" : "Choose language"}
    >
      {(["fr", "en"] as const).map((code) => {
        const active = locale === code;
        return (
          <Link
            key={code}
            href={alternateLocaleHref(pathname, code)}
            hrefLang={code}
            lang={code}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
              active
                ? dark
                  ? "bg-soleil text-nuit"
                  : "bg-nuit text-white"
                : dark
                  ? "text-white/65 hover:text-white"
                  : "text-nuit/55 hover:text-nuit"
            }`}
          >
            {code}
          </Link>
        );
      })}
    </div>
  );
}
