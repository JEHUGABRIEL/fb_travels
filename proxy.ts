import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { enRoutes, frRoutes } from "./lib/i18n";

/**
 * Le français reste à la racine (/vols), l'anglais vit sous /en (/en/flights).
 * Les routes sont rendues sous app/[lang]/... avec des dossiers français :
 * on réécrit donc en interne, et on redirige les anciennes URLs anglaises.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/fr/, "") || "/";
    return NextResponse.redirect(url);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const route = pathname.slice(3) || "/";

    // Ancienne URL anglaise bâtie sur le slug français (/en/conditions) :
    // redirection permanente vers le slug anglais (/en/terms-and-conditions).
    const englishRoute = enRoutes[route];
    if (englishRoute) {
      const url = request.nextUrl.clone();
      url.pathname = `/en${englishRoute}`;
      return NextResponse.redirect(url, 308);
    }

    // URL publique anglaise : réécriture vers le fichier de route interne.
    const internalRoute = frRoutes[route];
    if (internalRoute) {
      const url = request.nextUrl.clone();
      url.pathname = `/en${internalRoute}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|icon.svg|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
