import type { Category, VirtualEvent } from "@/types";

export const categories: Category[] = [
  { id: "all", label: "All Events", icon: "◈" },
  { id: "soccer", label: "Soccer", icon: "⚽" },
  { id: "basketball", label: "Basketball", icon: "🏀" },
  { id: "esports", label: "Esports", icon: "🎮" },
  { id: "pop", label: "Pop Culture", icon: "🎬" }
];

export const mockEvents: VirtualEvent[] = [
  {
    id: "soc-001",
    category: "soccer",
    league: "International Friendly",
    homeTeam: "Bay City FC",
    awayTeam: "Metro United",
    startTime: "2026-09-29T19:00:00-07:00",
    outcomes: [
      { name: "Bay City FC", price: 1.72 },
      { name: "Metro United", price: 2.18 }
    ]
  },
  {
    id: "soc-002",
    category: "soccer",
    league: "Premier League Sim",
    homeTeam: "North London",
    awayTeam: "Red Manchester",
    startTime: "2026-09-29T16:30:00-07:00",
    live: true,
    score: "1 — 1",
    outcomes: [
      { name: "North London", price: 2.40 },
      { name: "Red Manchester", price: 2.05 }
    ]
  },
  {
    id: "bb-001",
    category: "basketball",
    league: "Pro Hoops",
    homeTeam: "Los Angeles Comets",
    awayTeam: "Seattle Stormers",
    startTime: "2026-09-29T20:30:00-07:00",
    outcomes: [
      { name: "Los Angeles Comets", price: 1.56 },
      { name: "Seattle Stormers", price: 2.55 }
    ]
  },
  {
    id: "bb-002",
    category: "basketball",
    league: "Summer Series",
    homeTeam: "Phoenix Fire",
    awayTeam: "Austin Wranglers",
    startTime: "2026-09-30T18:00:00-07:00",
    outcomes: [
      { name: "Phoenix Fire", price: 1.88 },
      { name: "Austin Wranglers", price: 1.96 }
    ]
  },
  {
    id: "es-001",
    category: "esports",
    league: "Valorant Champions Sim",
    homeTeam: "Pixel Knights",
    awayTeam: "Neon Owls",
    startTime: "2026-09-29T21:00:00-07:00",
    live: true,
    score: "10 — 8",
    outcomes: [
      { name: "Pixel Knights", price: 1.44 },
      { name: "Neon Owls", price: 2.82 }
    ]
  },
  {
    id: "pop-001",
    category: "pop",
    league: "Awards Night — Mock Market",
    homeTeam: "Action Studio",
    awayTeam: "Drama Studio",
    startTime: "2026-10-01T19:00:00-07:00",
    outcomes: [
      { name: "Action Studio", price: 2.12 },
      { name: "Drama Studio", price: 1.68 }
    ]
  }
];
