import type { ReactNode } from "react";

export function PageHero({
  title,
  intro,
  eyebrow,
  children,
}: {
  title: string;
  intro: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-nuit-profond text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #f4a300 0, transparent 32%), radial-gradient(circle at 85% 10%, #1b4fa8 0, transparent 40%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full bg-soleil/10"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20">
        {eyebrow && (
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-soleil-clair">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>
        {children}
      </div>
    </section>
  );
}
