import type { CSSProperties } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { whatsappLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const copy = {
  fr: { from: "À partir de", quote: "Demander un devis" },
  en: { from: "From", quote: "Request a quote" },
} as const;

export function DestinationGrid({ limit, locale = "fr" }: { limit?: number; locale?: Locale }) {
  const t = copy[locale];
  const { destinations } = getContent(locale);
  const items = limit ? destinations.slice(0, limit) : destinations;

  return (
    <ul className="space-y-5">
      {items.map((d, i) => (
        <li
          key={d.code}
          className="sticky top-[calc(4.75rem_+_var(--stack))] z-[var(--layer)] lg:top-[calc(7.5rem_+_var(--stack))]"
          style={{ "--stack": `${i * 14}px`, "--layer": i + 1 } as CSSProperties}
        >
          <a
            href={whatsappLink(d.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-[clamp(430px,72vh,620px)] overflow-hidden rounded-3xl bg-nuit-profond text-white shadow-xl shadow-nuit/20"
          >
            <Image
              src={d.image}
              alt={d.imageAlt}
              fill
              sizes="(max-width: 1280px) 100vw, 1150px"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-nuit-profond via-nuit-profond/55 to-nuit-profond/10"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-nuit-profond/85 via-nuit-profond/20 to-transparent"
              aria-hidden="true"
            />

            <span
              className="pointer-events-none absolute right-4 top-2 font-display text-[6rem] font-black leading-none text-white/15 sm:right-8 sm:text-[9rem]"
              aria-hidden="true"
            >
              {d.code}
            </span>

            <div className="relative mt-auto flex w-full flex-col gap-5 p-6 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-soleil-clair backdrop-blur">
                  {d.region}
                </span>
                <span className="h-px flex-1 bg-white/20" aria-hidden="true" />
                <span className="text-xs font-semibold text-white/65">BGF → {d.code}</span>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                <div>
                  <h3 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
                    {d.city}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 sm:text-base">{d.country}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/50">
                    {t.from}
                  </p>
                  <p className="font-display text-xl font-extrabold text-soleil-clair sm:text-2xl">
                    {d.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4">
                <p className="text-sm text-white/65">{d.detail}</p>
                <span className="inline-flex items-center gap-2 rounded-full bg-soleil px-4 py-2 text-sm font-bold text-nuit transition-colors group-hover:bg-soleil-clair">
                  {t.quote}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
