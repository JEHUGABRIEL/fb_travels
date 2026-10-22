import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export function Faq({ locale = "fr" }: { locale?: Locale }) {
  const { faqs } = getContent(locale);
  return (
    <div className="divide-y divide-nuit/15 border-y border-nuit/15">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-display text-xl font-bold hover:text-azur">
            {f.q}
            <FontAwesomeIcon
              icon={faChevronDown}
              className="faq-chevron h-4 w-4 shrink-0 text-azur transition-transform"
            />
          </summary>
          <p className="max-w-2xl pb-6 text-[1.05rem] leading-relaxed text-nuit/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
