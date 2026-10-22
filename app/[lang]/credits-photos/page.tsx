import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { photoCredits } from "@/lib/photo-credits";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n.server";
import { localizedHref, type Locale } from "@/lib/i18n";

const copy = {
  fr: {
    eyebrow: "Informations",
    title: "Crédits photographiques",
    intro:
      "Les photos de monuments et de villes utilisées sur nos cartes de destinations proviennent de Wikimedia Commons. Merci à leurs auteurs.",
    crumbs: "Fil d'Ariane",
    home: "Accueil",
    introText:
      "Chaque image reste la propriété de son auteur et est utilisée selon la licence indiquée. Les licences Creative Commons autorisent la réutilisation, y compris commerciale, à condition de créditer l'auteur et de respecter les termes de la licence.",
    photo: "Photo",
    source: "Source",
    remove: "Une image à retirer ou à remplacer ? Écrivez-nous depuis la page",
    contact: "Contact",
  },
  en: {
    eyebrow: "Information",
    title: "Photo credits",
    intro:
      "The landmark and city photographs used on our destination cards come from Wikimedia Commons. Our thanks to their authors.",
    crumbs: "Breadcrumb",
    home: "Home",
    introText:
      "Each image remains the property of its author and is used under the stated licence. Creative Commons licences allow reuse, including commercially, provided the author is credited and the licence terms are respected.",
    photo: "Photo",
    source: "Source",
    remove: "Would you like an image removed or replaced? Write to us from the",
    contact: "Contact",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = copy[locale];
  return buildMetadata({
    title: t.title,
    description:
      locale === "fr"
        ? "Auteurs et licences des photographies de destinations utilisées sur le site de FB Travel And Services, agence de voyage à Bangui."
        : "Authors and licences of the destination photographs used on the FB Travel And Services website, travel agency in Bangui.",
    path: "/credits-photos",
    locale,
  });
}

export default async function CreditsPhotosPage() {
  const locale: Locale = await getLocale();
  const t = copy[locale];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <div className="mx-auto max-w-4xl px-5 py-12">
        <nav aria-label={t.crumbs} className="text-sm text-nuit/55">
          <Link href={localizedHref(locale, "/")} className="font-semibold text-azur hover:text-nuit">
            {t.home}
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{t.title}</span>
        </nav>

        <p className="mt-8 max-w-2xl leading-relaxed text-nuit/75">{t.introText}</p>

        <ul className="mt-10 divide-y divide-nuit/10 border-y border-nuit/10">
          {photoCredits.map((c) => (
            <li key={c.landmark} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="font-semibold">{c.landmark}</p>
                <p className="mt-0.5 text-sm text-nuit/60">
                  {t.photo} : {c.author} ·{" "}
                  {c.licenseUrl ? (
                    <a
                      href={c.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer license"
                      className="underline underline-offset-2 hover:text-azur"
                    >
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}
                </p>
              </div>
              <a
                href={c.page}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-azur hover:text-nuit"
              >
                {t.source}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-nuit/55">
          {t.remove}{" "}
          <Link
            href={localizedHref(locale, "/contact")}
            className="font-semibold text-azur underline underline-offset-2"
          >
            {t.contact}
          </Link>
          .
        </p>
      </div>

      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.home, path: "/" },
            { name: t.title, path: "/credits-photos" },
          ],
          locale,
        )}
      />
    </>
  );
}
