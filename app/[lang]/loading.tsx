import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { getLocale } from "@/lib/i18n.server";

const copy = {
  fr: {
    status: "Préparation de votre voyage…",
    sub: "Un instant, nous chargeons la page.",
    loading: "Chargement en cours",
  },
  en: {
    status: "Preparing your trip…",
    sub: "One moment, we are loading the page.",
    loading: "Loading",
  },
} as const;

export default async function Loading() {
  const locale = await getLocale();
  const t = copy[locale];

  return (
    <div className="grid min-h-[65vh] place-items-center px-5 py-24" role="status" aria-live="polite">
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-nuit text-soleil shadow-lg shadow-nuit/20">
          <FontAwesomeIcon icon={faPlaneUp} className="loader-plane h-6 w-6" />
        </span>
        <p className="mt-6 font-display text-xl font-extrabold">{t.status}</p>
        <p className="mt-1.5 text-sm text-nuit/60">{t.sub}</p>
        <span className="mx-auto mt-6 block h-1 w-40 overflow-hidden rounded-full bg-nuit/10">
          <span className="loader-bar block h-full w-1/3 rounded-full bg-soleil" />
        </span>
        <span className="sr-only">{t.loading}</span>
      </div>
    </div>
  );
}
