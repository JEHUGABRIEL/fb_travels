export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * URLs publiques anglaises lorsque le slug français n'est pas utilisable tel quel.
 * Les fichiers de route restent nommés en français sous app/[lang] : proxy.ts
 * traduit l'URL publique vers la route interne, et inversement pour les anciennes URLs.
 */
export const enRoutes: Record<string, string> = {
  "/vols": "/flights",
  "/offres": "/offers",
  "/circuits": "/tours",
  "/confidentialite": "/privacy-policy",
  "/conditions": "/terms-and-conditions",
  "/annulation": "/cancellation-policy",
  "/credits-photos": "/photo-credits",
};

/** Routes internes (français) indexées par leur URL publique anglaise. */
export const frRoutes: Record<string, string> = Object.fromEntries(
  Object.entries(enRoutes).map(([fr, en]) => [en, fr]),
);

function splitHash(path: string): [string, string] {
  const index = path.indexOf("#");
  return index === -1 ? [path, ""] : [path.slice(0, index), path.slice(index)];
}

/** Préfixe un chemin interne pour la langue demandée (le français reste à la racine). */
export function localizedHref(locale: Locale, path: string) {
  if (locale === "fr") return path;

  const [rawPath, hash] = splitHash(path);
  const pathname = rawPath || "/";
  if (pathname === "/") return `/en${hash}`;

  return `/en${enRoutes[pathname] ?? pathname}${hash}`;
}

/**
 * Retire le préfixe de langue et ramène l'URL publique anglaise à la route interne.
 * En production, usePathname() renvoie le chemin réécrit par le proxy (/en/vols),
 * mais il peut aussi renvoyer l'URL publique (/en/flights) : les deux donnent /vols.
 */
export function stripLocalePrefix(pathname: string) {
  const stripped = pathname.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
  return frRoutes[stripped] ?? stripped;
}

/** Même page dans l'autre langue, à partir du chemin courant. */
export function alternateLocaleHref(pathname: string, locale: Locale) {
  return localizedHref(locale, stripLocalePrefix(pathname));
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}
