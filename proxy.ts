import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Le français reste à la racine (/vols), l'anglais vit sous /en (/en/flights).
 * Les routes sont rendues sous app/[lang]/... : on réécrit donc en interne.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/fr/, "") || "/";
    return NextResponse.redirect(url);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
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
