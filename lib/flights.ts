import { cabins } from "./flights-data";
import type {
  FlightCabin,
  FlightOffer,
  FlightSearchParams,
  FlightSearchResult,
  FlightSegment,
  FlightSlice,
} from "./flights-data";

const DUFFEL_BASE = process.env.DUFFEL_API_BASE ?? "https://api.duffel.com";

type DuffelOffer = {
  id: string;
  total_amount: string;
  total_currency: string;
  expires_at?: string;
  owner?: { name?: string; iata_code?: string; logo_symbol_url?: string };
  slices?: {
    duration?: string;
    origin?: { iata_code?: string; name?: string };
    destination?: { iata_code?: string; name?: string };
    segments?: {
      origin?: { iata_code?: string };
      destination?: { iata_code?: string };
      departing_at?: string;
      arriving_at?: string;
      duration?: string;
      marketing_carrier?: { name?: string; iata_code?: string };
      marketing_carrier_flight_number?: string;
    }[];
  }[];
};

type DuffelResponse = {
  data?: {
    id?: string;
    live_mode?: boolean;
    offers?: DuffelOffer[];
  };
};

export class FlightSearchError extends Error {
  code: string;
  status: number;

  constructor(message: string, code = "flight_search_failed", status = 502) {
    super(message);
    this.name = "FlightSearchError";
    this.code = code;
    this.status = status;
  }
}

const IATA = /^[A-Z]{3}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function parseFlightSearch(body: unknown):
  | { ok: true; value: FlightSearchParams }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Requête invalide." };
  const b = body as Record<string, unknown>;

  const origin = typeof b.origin === "string" ? b.origin.trim().toUpperCase() : "";
  const destination = typeof b.destination === "string" ? b.destination.trim().toUpperCase() : "";
  if (!IATA.test(origin) || !IATA.test(destination)) {
    return { ok: false, error: "Codes d'aéroport invalides." };
  }
  if (origin === destination) return { ok: false, error: "Le départ et la destination doivent être différents." };

  const departDate = typeof b.departDate === "string" ? b.departDate : "";
  const returnDateRaw = typeof b.returnDate === "string" ? b.returnDate : "";
  const returnDate = returnDateRaw || undefined;
  if (!ISO_DATE.test(departDate) || Number.isNaN(Date.parse(departDate))) {
    return { ok: false, error: "Date de départ invalide." };
  }
  if (returnDate && (!ISO_DATE.test(returnDate) || Number.isNaN(Date.parse(returnDate)))) {
    return { ok: false, error: "Date de retour invalide." };
  }
  const today = new Date().toISOString().slice(0, 10);
  if (departDate < today) return { ok: false, error: "La date de départ doit être aujourd'hui ou plus tard." };
  if (returnDate && returnDate < departDate) {
    return { ok: false, error: "La date de retour doit suivre la date de départ." };
  }

  const adults = Number(b.adults ?? 1);
  if (!Number.isInteger(adults) || adults < 1 || adults > 9) {
    return { ok: false, error: "Le nombre de voyageurs doit être compris entre 1 et 9." };
  }

  const cabin = cabins.some((c) => c.value === b.cabin) ? (b.cabin as FlightCabin) : "economy";

  return { ok: true, value: { origin, destination, departDate, returnDate, adults, cabin } };
}

function durationLabel(value?: string) {
  if (!value) return "";
  const match = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?/.exec(value);
  if (!match) return value;
  const [, d, h, m] = match;
  const parts = [];
  if (d) parts.push(`${d} j`);
  if (h) parts.push(`${h} h`);
  if (m) parts.push(`${m} min`);
  return parts.join(" ") || value;
}

function normalizeOffer(offer: DuffelOffer): FlightOffer | null {
  if (!offer?.id || !offer.total_amount || !offer.slices?.length) return null;
  const amount = Number(offer.total_amount);
  if (!Number.isFinite(amount)) return null;

  const slices: FlightSlice[] = [];
  for (const slice of offer.slices) {
    const segments = (slice.segments ?? [])
      .filter((s) => s.origin?.iata_code && s.destination?.iata_code)
      .map<FlightSegment>((s) => ({
        from: s.origin?.iata_code ?? "",
        to: s.destination?.iata_code ?? "",
        depart: s.departing_at ?? "",
        arrive: s.arriving_at ?? "",
        airline: s.marketing_carrier?.name ?? offer.owner?.name ?? "",
        flightNumber: `${s.marketing_carrier?.iata_code ?? ""} ${s.marketing_carrier_flight_number ?? ""}`.trim(),
      }));
    if (!segments.length) return null;
    slices.push({
      origin: slice.origin?.iata_code ?? segments[0].from,
      destination: slice.destination?.iata_code ?? segments[segments.length - 1].to,
      departure: segments[0].depart,
      arrival: segments[segments.length - 1].arrive,
      duration: durationLabel(slice.duration),
      stops: Math.max(0, segments.length - 1),
      segments,
    });
  }

  return {
    id: offer.id,
    airline: {
      name: offer.owner?.name ?? slices[0]?.segments[0]?.airline ?? "Compagnie aérienne",
      code: offer.owner?.iata_code ?? "",
      logo: offer.owner?.logo_symbol_url,
    },
    price: { amount, currency: offer.total_currency ?? "XAF" },
    slices,
    expiresAt: offer.expires_at,
  };
}

async function duffelFetch(path: string, init: RequestInit): Promise<DuffelResponse> {
  const response = await fetch(`${DUFFEL_BASE}${path}`, {
    ...init,
    signal: AbortSignal.timeout(30_000),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Duffel-Version": "v2",
      Authorization: `Bearer ${process.env.DUFFEL_API_TOKEN}`,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(`Duffel ${response.status}: ${detail.slice(0, 500)}`);
    if (response.status === 401 || response.status === 403) {
      throw new FlightSearchError(
        "La recherche de vols n'est pas autorisée pour le moment.",
        "duffel_auth",
        502,
      );
    }
    if (response.status === 429) {
      throw new FlightSearchError(
        "Trop de recherches en peu de temps. Réessayez dans quelques instants.",
        "duffel_rate_limit",
        429,
      );
    }
    throw new FlightSearchError("La recherche de vols est momentanément indisponible.", "duffel_error", 502);
  }

  return (await response.json()) as DuffelResponse;
}

export async function searchFlights(params: FlightSearchParams): Promise<FlightSearchResult> {
  const token = process.env.DUFFEL_API_TOKEN;
  if (!token) {
    throw new FlightSearchError("La recherche en direct n'est pas configurée.", "not_configured", 503);
  }

  const slices = [
    {
      origin: params.origin,
      destination: params.destination,
      departure_date: params.departDate,
    },
  ];
  if (params.returnDate) {
    slices.push({
      origin: params.destination,
      destination: params.origin,
      departure_date: params.returnDate,
    });
  }

  const created = await duffelFetch("/air/offer_requests?return_offers=true&supplier_timeout=20000", {
    method: "POST",
    body: JSON.stringify({
      data: {
        cabin_class: params.cabin,
        slices,
        passengers: Array.from({ length: params.adults }, () => ({ type: "adult" })),
      },
    }),
  });

  let offers = created.data?.offers;
  if (!offers?.length && created.data?.id) {
    const fetched = await duffelFetch(`/air/offer_requests/${created.data.id}?view=offers`, { method: "GET" });
    offers = fetched.data?.offers;
  }

  const now = Date.now();
  const normalized = (offers ?? [])
    .map(normalizeOffer)
    .filter((o): o is FlightOffer => Boolean(o))
    .filter((o) => !o.expiresAt || Date.parse(o.expiresAt) > now)
    .sort((a, b) => a.price.amount - b.price.amount)
    .slice(0, 12);

  return {
    offers: normalized,
    mode: created.data?.live_mode ? "live" : "test",
  };
}
