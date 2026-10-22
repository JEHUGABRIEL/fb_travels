import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="FB Travel And Services, accueil">
      <span
        className="relative grid h-11 w-11 place-items-center rounded-full bg-azur text-white ring-2 ring-soleil"
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={faPlaneUp} className="h-5 w-5 -rotate-12 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-nuit"}`}
        >
          FB Travel
        </span>
        <span
          className={`mt-1 block text-[0.8rem] font-semibold ${light ? "text-soleil-clair" : "text-azur"}`}
        >
          And Services
        </span>
      </span>
    </Link>
  );
}
