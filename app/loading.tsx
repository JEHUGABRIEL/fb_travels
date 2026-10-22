import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <div className="grid min-h-[65vh] place-items-center px-5 py-24" role="status" aria-live="polite">
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-nuit text-soleil shadow-lg shadow-nuit/20">
          <FontAwesomeIcon icon={faPlaneUp} className="loader-plane h-6 w-6" />
        </span>
        <p className="mt-6 font-display text-xl font-extrabold">Préparation de votre voyage…</p>
        <p className="mt-1.5 text-sm text-nuit/60">Un instant, nous chargeons la page.</p>
        <span className="mx-auto mt-6 block h-1 w-40 overflow-hidden rounded-full bg-nuit/10">
          <span className="loader-bar block h-full w-1/3 rounded-full bg-soleil" />
        </span>
        <span className="sr-only">Chargement en cours</span>
      </div>
    </div>
  );
}
