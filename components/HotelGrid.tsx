import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { hotelIdeas, whatsappLink } from "@/lib/site";

export function HotelGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {hotelIdeas.map((h) => (
        <li key={h.city} className="group overflow-hidden rounded-2xl border border-nuit/10 bg-white shadow-sm">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={h.image}
              alt={`${h.city}, ${h.country}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-nuit">
              {h.tag}
            </span>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nuit-profond/90 to-transparent p-4 pt-12">
              <h3 className="font-display text-xl font-extrabold text-white">{h.city}</h3>
              <p className="text-xs text-white/70">{h.country}</p>
            </div>
          </div>
          <div className="p-5">
            <p className="font-semibold">{h.headline}</p>
            <p className="mt-1.5 text-sm text-nuit/70">{h.text}</p>
            <a
              href={whatsappLink(`Bonjour FB Travel, je souhaite un hôtel à ${h.city}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-azur hover:text-nuit"
            >
              Demander un devis
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
