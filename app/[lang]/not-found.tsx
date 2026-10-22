import Link from "next/link";
import { getLocale } from "@/lib/i18n.server";
import { localizedHref } from "@/lib/i18n";

const copy = {
  fr: {
    title: "Cette page n'existe pas.",
    text: "Le lien est peut-être incorrect ou la page a été déplacée. Revenez à l'accueil ou contactez l'agence.",
    home: "Retour à l'accueil",
    contact: "Contacter l'agence",
  },
  en: {
    title: "This page does not exist.",
    text: "The link may be incorrect or the page has moved. Go back home or contact the agency.",
    home: "Back to home",
    contact: "Contact the agency",
  },
} as const;

export default async function NotFound() {
  const locale = await getLocale();
  const t = copy[locale];

  return (
    <section className="mx-auto max-w-3xl px-5 py-28">
      <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight">{t.title}</h1>
      <p className="mt-5 text-lg text-nuit/75">{t.text}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={localizedHref(locale, "/")}
          className="rounded bg-nuit px-6 py-3.5 font-bold text-white hover:bg-azur"
        >
          {t.home}
        </Link>
        <Link
          href={localizedHref(locale, "/contact")}
          className="rounded border-2 border-nuit px-6 py-3 font-bold hover:bg-brume"
        >
          {t.contact}
        </Link>
      </div>
    </section>
  );
}
