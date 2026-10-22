import { NextResponse } from "next/server";
import { FlightSearchError, parseFlightSearch, searchFlights } from "@/lib/flights";

export async function POST(request: Request) {
  if (!process.env.DUFFEL_API_TOKEN) {
    return NextResponse.json({ configured: false, offers: [] });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ configured: true, error: "Requête invalide." }, { status: 400 });
  }

  const parsed = parseFlightSearch(body);
  if (!parsed.ok) {
    return NextResponse.json({ configured: true, error: parsed.error }, { status: 400 });
  }

  try {
    const result = await searchFlights(parsed.value);
    return NextResponse.json({ configured: true, ...result });
  } catch (error) {
    const flightError =
      error instanceof FlightSearchError
        ? error
        : new FlightSearchError("La recherche de vols est momentanément indisponible.");
    if (!(error instanceof FlightSearchError)) {
      console.error("Flight search failed:", error);
    }
    return NextResponse.json(
      { configured: true, offers: [], error: flightError.message, code: flightError.code },
      { status: flightError.status },
    );
  }
}
