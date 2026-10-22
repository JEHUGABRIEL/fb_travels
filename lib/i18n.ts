export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Préfixe un chemin interne pour la langue demandée (le français reste à la racine). */
export function localizedHref(locale: Locale, path: string) {
  if (locale === "fr") return path;
  if (path === "/") return "/en";
  return `/en${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Retire le préfixe de langue interne.
 * En production, usePathname() renvoie le chemin réécrit par le proxy (/fr/vols),
 * pas seulement l'URL publique (/vols).
 */
export function stripLocalePrefix(pathname: string) {
  return pathname.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
}

/** Même page dans l'autre langue, à partir du chemin courant. */
export function alternateLocaleHref(pathname: string, locale: Locale) {
  return localizedHref(locale, stripLocalePrefix(pathname));
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}
