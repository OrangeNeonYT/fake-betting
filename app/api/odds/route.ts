import { NextResponse } from "next/server";
import { normalizeOddsApiEvents } from "@/lib/odds-api";
import type { OddsApiEvent } from "@/types";

export async function GET() {
  const key = process.env.ODDS_API_KEY;

  if (!key) {
    return NextResponse.json(
      { error: "ODDS_API_KEY is not configured. The dashboard will continue using mock events." },
      { status: 503 }
    );
  }

  const url = new URL("https://api.the-odds-api.com/v4/sports/upcoming/odds");
  url.searchParams.set("apiKey", key);
  url.searchParams.set("regions", "us");
  url.searchParams.set("markets", "h2h");
  url.searchParams.set("oddsFormat", "decimal");

  try {
    const response = await fetch(url, { next: { revalidate: 60 } });

    if (!response.ok) {
      return NextResponse.json(
        { error: "The Odds API request failed.", status: response.status },
        { status: response.status }
      );
    }

    const events = (await response.json()) as OddsApiEvent[];
    return NextResponse.json({ events: normalizeOddsApiEvents(events) });
  } catch {
    return NextResponse.json({ error: "Unable to reach The Odds API." }, { status: 502 });
  }
}
