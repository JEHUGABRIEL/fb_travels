import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "./PageHero";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { localizedHref, type Locale } from "@/lib/i18n";

const copy = {
  fr: {
    eyebrow: "Informations légales",
    crumbs: "Fil d'Ariane",
    home: "Accueil",
    contents: "Sommaire",
    updated: "Dernière mise à jour",
  },
  en: {
    eyebrow: "Legal information",
    crumbs: "Breadcrumb",
    home: "Home",
    contents: "Contents",
    updated: "Last updated",
  },
} as const;

export function LegalPage({
  title,
  intro,
  path,
  updated,
  sections,
  children,
  locale = "fr",
}: {
  title: string;
  intro: string;
  path: string;
  updated: string;
  sections: { id: string; title: string }[];
  children: ReactNode;
  locale?: Locale;
}) {
  const t = copy[locale];
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={title} intro={intro} />

      <div className="mx-auto max-w-7xl px-5 py-12">
        <nav aria-label={t.crumbs} className="text-sm text-nuit/55">
          <Link href={localizedHref(locale, "/")} className="font-semibold text-azur hover:text-nuit">
            {t.home}
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{title}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label={t.contents} className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-azur">{t.contents}</p>
            <ol className="mt-4 space-y-2 border-l border-nuit/15 pl-4 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-nuit/70 hover:text-azur hover:underline">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-7 text-xs text-nuit/45">{t.updated} : {updated}</p>
          </nav>

          <article className="max-w-3xl space-y-10">{children}</article>
        </div>
      </div>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.home, path: "/" },
          { name: title, path },
        ], locale)}
      />
    </>
  );
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-2xl font-bold leading-tight">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-nuit/80">{children}</div>
    </section>
  );
}
