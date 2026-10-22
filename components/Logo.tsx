import Link from "next/link";
import Image from "next/image";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="FB Travel And Services, accueil">
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-[#fdf8ea] ring-1 transition-transform group-hover:scale-105 ${
          light ? "ring-white/25" : "ring-nuit/10"
        }`}
        aria-hidden="true"
      >
        <Image
          src="/images/logo-fb-travel.svg"
          alt=""
          width={48}
          height={48}
          unoptimized
          className="h-11 w-11 object-contain"
        />
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
