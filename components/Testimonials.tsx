"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { testimonials } from "@/lib/site";

const AUTOPLAY = 7000;
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

/** 3 commentaires sur desktop, 2 sur tablette, 1 sur mobile. */
function usePerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const tablet = window.matchMedia("(min-width: 640px)");
    const update = () => setPerView(desktop.matches ? 3 : tablet.matches ? 2 : 1);
    update();
    desktop.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  return perView;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  const perView = usePerView();
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const pages = useMemo(() => {
    const groups: (typeof testimonials)[number][][] = [];
    for (let i = 0; i < testimonials.length; i += perView) {
      groups.push(testimonials.slice(i, i + perView));
    }
    return groups;
  }, [perView]);

  // Le nombre de pages change avec le viewport : on borne l'index à l'affichage.
  const pageCount = pages.length;
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));

  useEffect(() => {
    if (reducedMotion || paused || pageCount < 2) return;
    const id = window.setTimeout(() => {
      setPage((p) => (Math.min(p, pageCount - 1) + 1) % pageCount);
    }, AUTOPLAY);
    return () => window.clearTimeout(id);
  }, [paused, reducedMotion, page, pageCount]);

  const go = (direction: -1 | 1) =>
    setPage((p) => (Math.min(p, pageCount - 1) + direction + pageCount) % pageCount);

  return (
    <section aria-labelledby="temoignages" className="mx-auto max-w-7xl px-5 py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-azur">
            Témoignages
          </p>
          <h2
            id="temoignages"
            className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl"
          >
            Ils sont partis <span className="font-serif italic text-azur">avec nous</span>.
          </h2>
          <p className="mt-4 text-nuit/70">
            Des départs de Bangui, des dossiers bouclés et des retours sans mauvaise surprise.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Témoignages précédents"
            className="grid h-11 w-11 place-items-center rounded-full border border-nuit/20 text-nuit transition-colors hover:border-nuit hover:bg-nuit hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Témoignages suivants"
            className="grid h-11 w-11 place-items-center rounded-full border border-nuit/20 text-nuit transition-colors hover:border-nuit hover:bg-nuit hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        role="group"
        aria-roledescription="carrousel"
        aria-label="Témoignages de voyageurs"
        className="mt-10 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages.map((group, groupIndex) => (
            <div
              key={group[0]?.name ?? groupIndex}
              aria-hidden={groupIndex !== currentPage}
              className="grid w-full shrink-0 auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {group.map((t) => (
                <figure
                  key={t.name}
                  className="flex h-full flex-col rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span aria-hidden="true" className="font-serif text-4xl leading-none text-soleil">
                      “
                    </span>
                    <span className="flex gap-0.5 text-soleil" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="h-3 w-3" />
                      ))}
                    </span>
                    <span className="sr-only">Note : 5 étoiles sur 5</span>
                  </div>
                  <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-nuit/80">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-nuit/10 pt-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brume font-display text-sm font-bold text-azur">
                      {initials(t.name)}
                    </span>
                    <span>
                      <span className="block font-display font-bold leading-tight">{t.name}</span>
                      <span className="block text-xs text-nuit/55">{t.detail}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex justify-center gap-2">
        {pages.map((group, i) => (
          <button
            key={group[0]?.name ?? i}
            type="button"
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1} des témoignages`}
            aria-current={i === currentPage}
            className={`h-2 rounded-full transition-all ${
              i === currentPage ? "w-7 bg-azur" : "w-2 bg-nuit/20 hover:bg-nuit/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
