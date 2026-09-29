# TokenHouse — Virtual Sports Lounge

A GitHub-ready Next.js App Router prototype for a fake-money sports prediction dashboard.

## What it includes

- Premium dark casino-inspired UI using `#0B0E14`, `#00E676`, `#FFD700`, and dark cards.
- Sticky balance/profile header.
- Category bar for all events, soccer, basketball, esports, and pop culture.
- Mock upcoming/live events.
- Virtual odds buttons that open a wager modal.
- 1,000 starting Tokens.
- Validation that prevents staking more Tokens than the user has.
- Open bet tracking and potential return calculations.
- Optional server-side The Odds API adapter at `/api/odds`.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Optional real event feed

Copy `.env.example` to `.env.local` and add:

```env
ODDS_API_KEY=your_key_here
```

The route at `/api/odds` uses the v4 Odds API shape and requests `h2h` markets in decimal format. The UI intentionally keeps the money layer virtual.

## Suggested GitHub flow

The repository is already initialized for you. Clone it or keep editing it directly on GitHub.
