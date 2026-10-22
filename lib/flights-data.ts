export const flightDestinations = [
  { code: "DLA", city: "Douala", country: "Cameroun" },
  { code: "CDG", city: "Paris", country: "France" },
  { code: "DKR", city: "Dakar", country: "Sénégal" },
  { code: "CMN", city: "Casablanca", country: "Maroc" },
  { code: "KGL", city: "Kigali", country: "Rwanda" },
  { code: "IST", city: "Istanbul", country: "Turquie" },
  { code: "DXB", city: "Dubaï", country: "Émirats arabes unis" },
  { code: "ADD", city: "Addis-Abeba", country: "Éthiopie" },
  { code: "BRU", city: "Bruxelles", country: "Belgique" },
  { code: "ABJ", city: "Abidjan", country: "Côte d'Ivoire" },
  { code: "LBV", city: "Libreville", country: "Gabon" },
  { code: "NSI", city: "Yaoundé", country: "Cameroun" },
] as const;

export const cabins = [
  { value: "economy", label: "Économique" },
  { value: "business", label: "Affaires" },
  { value: "first", label: "Première" },
] as const;

export type FlightCabin = (typeof cabins)[number]["value"];

export type FlightSearchParams = {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  cabin: FlightCabin;
};

export type FlightSegment = {
  from: string;
  to: string;
  depart: string;
  arrive: string;
  airline: string;
  flightNumber: string;
};

export type FlightSlice = {
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  segments: FlightSegment[];
};

export type FlightOffer = {
  id: string;
  airline: { name: string; code: string; logo?: string };
  price: { amount: number; currency: string };
  slices: FlightSlice[];
  expiresAt?: string;
};

export type FlightSearchResult = {
  offers: FlightOffer[];
  mode: "live" | "test";
};
