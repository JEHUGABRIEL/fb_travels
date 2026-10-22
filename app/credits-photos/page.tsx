import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { photoCredits } from "@/lib/photo-credits";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Crédits photographiques",
  description:
    "Auteurs et licences des photographies de destinations utilisées sur le site de FB Travel And Services, agence de voyage à Bangui.",
  path: "/credits-photos",
});

export default function CreditsPhotosPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations"
        title="Crédits photographiques"
        intro="Les photos de monuments et de villes utilisées sur nos cartes de destinations proviennent de Wikimedia Commons. Merci à leurs auteurs."
      />

      <div className="mx-auto max-w-4xl px-5 py-12">
        <nav aria-label="Fil d'Ariane" className="text-sm text-nuit/55">
          <Link href="/" className="font-semibold text-azur hover:text-nuit">
            Accueil
          </Link>
          <span aria-hidden="true"> / </span>
          <span>Crédits photographiques</span>
        </nav>

        <p className="mt-8 max-w-2xl leading-relaxed text-nuit/75">
          Chaque image reste la propriété de son auteur et est utilisée selon la licence indiquée.
          Les licences Creative Commons autorisent la réutilisation, y compris commerciale, à
          condition de créditer l&apos;auteur et de respecter les termes de la licence.
        </p>

        <ul className="mt-10 divide-y divide-nuit/10 border-y border-nuit/10">
          {photoCredits.map((c) => (
            <li key={c.landmark} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="font-semibold">{c.landmark}</p>
                <p className="mt-0.5 text-sm text-nuit/60">
                  Photo : {c.author} ·{" "}
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
                Source
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-nuit/55">
          Une image à retirer ou à remplacer ? Écrivez-nous depuis la page{" "}
          <Link href="/contact" className="font-semibold text-azur underline underline-offset-2">
            Contact
          </Link>
          .
        </p>
      </div>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Crédits photographiques", path: "/credits-photos" },
        ])}
      />
    </>
  );
}
