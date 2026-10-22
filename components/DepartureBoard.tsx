import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { offers } from "@/lib/site";

function Tiles({ text, row, className = "" }: { text: string; row: number; className?: string }) {
  const chars = Array.from(text.toUpperCase());
  return (
    <span className={className} aria-hidden="true">
      {chars.map((c, i) =>
        c === " " ? (
          <span key={i} className="tile-gap" />
        ) : (
          <span
            key={i}
            className="tile"
            style={{ animationDelay: `${300 + row * 260 + i * 38}ms` }}
          >
            {c}
          </span>
        ),
      )}
    </span>
  );
}

export function DepartureBoard() {
  return (
    <section
      aria-label="Offres au départ de Bangui"
      className="board rounded-sm bg-nuit-profond p-5 shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:p-7"
    >
      <div className="flex items-center justify-between border-b border-white/15 pb-4">
        <h2 className="flex items-center gap-3 font-display text-xl font-bold text-white">
          <FontAwesomeIcon icon={faPlaneDeparture} className="h-5 w-5 text-soleil" />
          Départs de Bangui
        </h2>
        <span className="text-sm text-white/60">Offres du moment</span>
      </div>

      <ul className="divide-y divide-white/10">
        {offers.map((o, row) => (
          <li key={o.id} className="py-4">
            <div className="flex items-end justify-between gap-3">
              <span className="font-display text-[1.65rem] font-bold sm:text-3xl">
                <span className="sr-only">{o.destination}</span>
                <Tiles text={o.destination} row={row} />
              </span>
              <span className="font-display text-xl font-bold sm:text-2xl">
                <span className="sr-only">{o.boardPrice}</span>
                <Tiles text={o.boardPrice} row={row} />
              </span>
            </div>
            <p className="mt-2 text-sm text-white/70">
              {o.airline} · {o.detail}
            </p>
          </li>
        ))}
      </ul>

      <p className="border-t border-white/15 pt-4 text-[0.82rem] text-white/60">
        Tarifs de départ. Dates et disponibilités à confirmer auprès de l'agence.
      </p>
    </section>
  );
}
