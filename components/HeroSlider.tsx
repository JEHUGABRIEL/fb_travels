"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import type { HeroSlide } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const DELAY = 6000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

function getServerReducedMotion() {
  return false;
}

const aria: Record<Locale, string> = {
  fr: "FB Travel And Services, agence de voyage à Bangui",
  en: "FB Travel And Services, travel agency in Bangui",
};

export function HeroSlider({ slides, locale = "fr" }: { slides: readonly HeroSlide[]; locale?: Locale }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const playing = !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, DELAY);
    return () => window.clearTimeout(id);
  }, [playing, index, slides.length]);

  return (
    <section
      aria-label={aria[locale]}
      className="relative isolate overflow-hidden bg-nuit-profond"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((slide, i) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`hero-image object-cover object-center ${i === index ? "opacity-75" : "opacity-0"}`}
            style={{ transform: i === index ? "scale(1.06)" : "scale(1)" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-nuit-profond/65 via-nuit/50 to-nuit-profond/80" />
      </div>

      <div className="relative mx-auto flex min-h-[30rem] max-w-7xl items-center justify-center px-5 pb-40 pt-16 text-center sm:min-h-[34rem] sm:pt-20 lg:min-h-[39rem] lg:pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid">
            {slides.map((slide, i) => {
              const active = i === index;
              const Title = i === 0 ? "h1" : "h2";
              const at = slide.title.indexOf(slide.accent);
              const before = at === -1 ? slide.title : slide.title.slice(0, at);
              const after = at === -1 ? "" : slide.title.slice(at + slide.accent.length);
              return (
                <div
                  key={slide.title}
                  aria-hidden={!active}
                  className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${
                    active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  <Title className="text-balance font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[3.9rem]">
                    {before}
                    <span className="mx-1 inline-block -rotate-1 rounded-[3px] bg-soleil px-[0.2em] pb-[0.03em] align-baseline">
                      <span className="font-serif text-[1.12em] font-normal italic leading-[0.95] text-nuit">
                        {slide.accent}
                      </span>
                    </span>
                    {after}
                  </Title>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
