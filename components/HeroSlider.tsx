"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { heroSlides, trustPoints } from "@/lib/site";

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

export function HeroSlider() {
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
      setIndex((current) => (current + 1) % heroSlides.length);
    }, DELAY);
    return () => window.clearTimeout(id);
  }, [playing, index]);

  return (
    <section
      aria-label="FB Travel And Services, agence de voyage à Bangui"
      className="relative isolate overflow-hidden bg-nuit-profond"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((slide, i) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`hero-image object-cover object-center ${i === index ? "opacity-50" : "opacity-0"}`}
            style={{ transform: i === index ? "scale(1.06)" : "scale(1)" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-nuit-profond/85 via-nuit/75 to-nuit-profond/95" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-44 pt-16 text-center sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl">
          <div className="grid">
            {heroSlides.map((slide, i) => {
              const active = i === index;
              const Title = i === 0 ? "h1" : "h2";
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
                  <Title className="font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-[4.4rem]">
                    {slide.title}
                  </Title>
                  <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                    {slide.text}
                  </p>
                </div>
              );
            })}
          </div>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/75">
            {trustPoints.slice(0, 3).map((t) => (
              <li key={t} className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-soleil" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
