export type CategoryId = "all" | "soccer" | "basketball" | "esports" | "pop";

export type Category = {
  id: CategoryId;
  label: string;
  icon: string;
};

export type Outcome = {
  name: string;
  price: number;
};

export type VirtualEvent = {
  id: string;
  category: Exclude<CategoryId, "all">;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  live?: boolean;
  score?: string;
  outcomes: Outcome[];
};

export type BetStatus = "open" | "won" | "lost";

export type VirtualBet = {
  id: string;
  eventId: string;
  selection: string;
  odds: number;
  stake: number;
  potentialReturn: number;
  status: BetStatus;
  placedAt: string;
};

export type OddsApiEvent = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers?: Array<{
    key: string;
    title: string;
    last_update: string;
    markets: Array<{
      key: string;
      outcomes: Outcome[];
    }>;
  }>;
};
