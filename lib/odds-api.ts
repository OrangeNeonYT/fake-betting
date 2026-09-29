import type { OddsApiEvent, VirtualEvent } from "@/types";

export function normalizeOddsApiEvents(input: OddsApiEvent[]): VirtualEvent[] {
  return input.flatMap((event) => {
    const market = event.bookmakers?.flatMap((b) => b.markets).find((m) => m.key === "h2h");
    if (!market || market.outcomes.length < 2) return [];

    const category = mapSportToCategory(event.sport_key);
    if (!category) return [];

    return [{
      id: event.id,
      category,
      league: event.sport_title,
      homeTeam: event.home_team,
      awayTeam: event.away_team,
      startTime: event.commence_time,
      outcomes: market.outcomes
    }];
  });
}

function mapSportToCategory(sportKey: string): VirtualEvent["category"] | null {
  if (sportKey.includes("soccer")) return "soccer";
  if (sportKey.includes("basketball")) return "basketball";
  if (sportKey.includes("esports")) return "esports";
  return null;
}
