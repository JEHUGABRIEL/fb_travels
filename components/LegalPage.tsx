import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "./PageHero";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export function LegalPage({
  title,
  intro,
  path,
  updated,
  sections,
  children,
}: {
  title: string;
  intro: string;
  path: string;
  updated: string;
  sections: { id: string; title: string }[];
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Informations légales" title={title} intro={intro} />

      <div className="mx-auto max-w-7xl px-5 py-12">
        <nav aria-label="Fil d'Ariane" className="text-sm text-nuit/55">
          <Link href="/" className="font-semibold text-azur hover:text-nuit">
            Accueil
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{title}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Sommaire" className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-azur">Sommaire</p>
            <ol className="mt-4 space-y-2 border-l border-nuit/15 pl-4 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-nuit/70 hover:text-azur hover:underline">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-7 text-xs text-nuit/45">Dernière mise à jour : {updated}</p>
          </nav>

          <article className="max-w-3xl space-y-10">{children}</article>
        </div>
      </div>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: title, path },
        ])}
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
