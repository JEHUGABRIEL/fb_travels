import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const copy = {
  fr: {
    title: "Nos partenaires",
    text: "Les compagnies aériennes et les hôteliers avec lesquels nous travaillons au quotidien, depuis Bangui.",
  },
  en: {
    title: "Our partners",
    text: "The airlines and hoteliers we work with every day, from Bangui.",
  },
} as const;

export function Partners({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale];
  const { partners } = getContent(locale);
  return (
    <section aria-labelledby="partenaires" className="border-y border-nuit/10 bg-brume">
      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-12 lg:grid-cols-[17rem_1fr] lg:items-center lg:gap-12">
        <div>
          <h2
            id="partenaires"
            className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-azur"
          >
            {t.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-nuit/65">
            {t.text}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
          {partners.map((name) => (
            <li
              key={name}
              className="font-serif text-xl leading-tight text-nuit/60 transition-colors hover:text-nuit sm:text-2xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
