import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
  action?: ReactNode;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} ${
        action ? "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" : ""
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        <p
          className={`text-[0.78rem] font-bold uppercase tracking-[0.22em] ${
            light ? "text-soleil-clair" : "text-azur"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
            light ? "text-white" : "text-nuit"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p className={`mt-4 text-[1.02rem] leading-relaxed ${light ? "text-white/70" : "text-nuit/70"}`}>
            {intro}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
