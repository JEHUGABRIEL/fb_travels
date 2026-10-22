type City = { name: string; lon: number; lat: number; dx?: number; dy?: number; anchor?: "start" | "end" | "middle" };

const W = 1000;
const H = 560;
const LON = [-25, 45] as const;
const LAT = [-12, 55] as const;

const project = (lon: number, lat: number) => ({
  x: ((lon - LON[0]) / (LON[1] - LON[0])) * W,
  y: ((LAT[1] - lat) / (LAT[1] - LAT[0])) * H,
});

const hub: City = { name: "Bangui", lon: 18.55, lat: 4.36, dx: 20, dy: -22, anchor: "start" };

const cities: City[] = [
  { name: "Douala", lon: 9.7, lat: 4.05, dx: -14, dy: 34, anchor: "end" },
  { name: "Dakar", lon: -17.4, lat: 14.7, dx: 6, dy: 38, anchor: "start" },
  { name: "Casablanca", lon: -7.6, lat: 33.6, dx: -16, dy: 8, anchor: "end" },
  { name: "Paris", lon: 2.35, lat: 48.85, dx: -16, dy: 8, anchor: "end" },
  { name: "Kigali", lon: 30.1, lat: -1.95, dx: 14, dy: 28, anchor: "start" },
];

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(dist * 0.28, 170);
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${mx.toFixed(1)} ${(my - lift).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

export function RouteMap() {
  const origin = project(hub.lon, hub.lat);

  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Carte des liaisons au départ de Bangui vers Douala, Dakar, Casablanca, Paris et Kigali"
        className="h-auto w-full"
      >
        <defs>
          <pattern id="grille" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#1b4fa8" opacity="0.28" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grille)" />

        {cities.map((c) => (
          <path
            key={c.name}
            d={arc(origin, project(c.lon, c.lat))}
            fill="none"
            stroke="#f4a300"
            strokeWidth="3"
            strokeLinecap="round"
            className="route-arc"
          />
        ))}

        {cities.map((c) => {
          const p = project(c.lon, c.lat);
          return (
            <g key={c.name}>
              <circle cx={p.x} cy={p.y} r="8" fill="#ffffff" stroke="#0b1f4b" strokeWidth="3" />
              <text
                x={p.x + (c.dx ?? 12)}
                y={p.y + (c.dy ?? 4)}
                textAnchor={c.anchor ?? "start"}
                className="fill-nuit font-display"
                fontSize="26"
                fontWeight="700"
              >
                {c.name}
              </text>
            </g>
          );
        })}

        <g>
          <circle cx={origin.x} cy={origin.y} r="22" fill="#f4a300" opacity="0.28" />
          <circle cx={origin.x} cy={origin.y} r="12" fill="#0b1f4b" stroke="#f4a300" strokeWidth="4" />
          <text
            x={origin.x + (hub.dx ?? 12)}
            y={origin.y + (hub.dy ?? 4)}
            className="fill-nuit font-display"
            fontSize="32"
            fontWeight="800"
          >
            {hub.name}
          </text>
        </g>
      </svg>
      <figcaption className="sr-only">
        Liaisons proposées au départ de Bangui : Douala, Dakar, Casablanca, Paris et Kigali.
      </figcaption>
    </figure>
  );
}
