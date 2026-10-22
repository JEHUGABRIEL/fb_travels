import Link from "next/link";
import Image from "next/image";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="FB Travel And Services, accueil">
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
      <span className="flex flex-col">
        <span
          className={`font-serif text-[1.45rem] leading-[0.9] tracking-[-0.01em] sm:text-[1.6rem] ${
            light ? "text-white" : "text-nuit"
          }`}
        >
          FB <span className="italic">Travel</span>
        </span>
        <span
          className={`mt-2 flex items-center gap-1.5 text-[0.58rem] font-bold uppercase leading-none tracking-[0.26em] ${
            light ? "text-soleil-clair" : "text-azur"
          }`}
        >
          <span
            className={`h-px w-3.5 ${light ? "bg-soleil-clair/70" : "bg-soleil"}`}
            aria-hidden="true"
          />
          And Services
        </span>
      </span>
    </Link>
  );
}
