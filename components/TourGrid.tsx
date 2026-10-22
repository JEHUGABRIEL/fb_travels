"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleCheck, faRotate } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { tourCategories, tours, whatsappLink } from "@/lib/site";

type Tour = (typeof tours)[number];

function TourCard({ tour }: { tour: Tour }) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-flipped");
          observer.disconnect();
        }
      },
      { threshold: 0.55 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li ref={ref} className="flip-card h-[430px]">
      <div className="flip-inner">
        {/* Recto : la photo du monument */}
        <div className="flip-face bg-nuit-profond">
          <Image
            src={tour.image}
            alt={tour.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-nuit-profond via-nuit-profond/45 to-nuit-profond/10"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-5">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-soleil-clair backdrop-blur">
              {tour.category}
            </span>
            <span className="text-xs font-semibold text-white/75">{tour.country}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/60">
              {tour.city}
            </p>
            <h3 className="mt-1.5 font-display text-3xl font-extrabold leading-tight text-white">
              {tour.title}
            </h3>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-soleil-clair">
              <FontAwesomeIcon icon={faRotate} className="h-3.5 w-3.5" />
              Voir le programme
            </p>
          </div>
        </div>

        {/* Verso : le programme */}
        <div className="flip-face flip-back bg-nuit text-white">
          <div className="flex h-full flex-col p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-white/20 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-soleil-clair">
                {tour.category}
              </span>
              <span className="text-xs font-semibold text-white/60">{tour.city}</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight">{tour.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{tour.text}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {tour.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5 shrink-0 text-soleil" />
                  {h}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(
                `Bonjour FB Travel, je souhaite des informations sur le programme « ${tour.title} ».`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-soleil-clair hover:text-white"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
              Demander ce programme
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

export function TourGrid() {
  const [category, setCategory] = useState<string>("Tous");
  const filtered = category === "Tous" ? tours : tours.filter((t) => t.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par type de séjour">
        {tourCategories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              category === c
                ? "border-nuit bg-nuit text-white"
                : "border-nuit/15 bg-white text-nuit/70 hover:border-azur hover:text-azur"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((t) => (
          <TourCard key={t.id} tour={t} />
        ))}
      </ul>

      <p className="mt-6 text-sm text-nuit/55">
        Survolez une carte pour découvrir le programme (sur mobile, elle se retourne au défilement).
        Ces itinéraires sont des exemples : dates, durée, hôtels et activités sont ajustés avec vous
        avant toute réservation.
      </p>
    </div>
  );
}
