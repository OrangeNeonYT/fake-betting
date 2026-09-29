# TokenHouse — Virtual Sports Lounge

A reusable Next.js App Router starter for a **virtual-token sports prediction dashboard**.

> This project is a simulation/UI prototype. It does not process real-money bets, deposits, or withdrawals.

## Features

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- Dark premium casino-inspired UI
- Virtual Token balance starting at 1,000
- Soccer, basketball, esports, and pop-culture categories
- Mock event feed
- Optional The Odds API adapter
- Bet placement modal and stake validation
- Open / Won / Lost virtual bet states
- **Fake-Mode welcome screen** with fictional events
- Fake-Mode countdowns and automatic bet resolution in seconds

## Run locally

### 1. Install Node.js

Install the current Node.js LTS release from:

https://nodejs.org/

### 2. Clone the repository

```bash
git clone https://github.com/OrangeNeonYT/fake-betting.git
cd fake-betting
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Fake-Mode

The app opens with a welcome screen. Click **Enter Fake-Mode** to use fictional teams and short countdowns.

Fake-Mode is designed for demos and testing:

- Events are fictional.
- Event times are short and update in the browser.
- Bets automatically resolve after a few seconds.
- Winning bets return their simulated payout.
- Losing bets stay lost.
- No real money is involved.

## Optional event API

The project includes a server route at:

```text
/api/odds
```

To enable it, copy `.env.example` to `.env.local` and add:

```env
ODDS_API_KEY=your_key_here
```

Never commit your real API key to GitHub.

The UI can still be used with mock events without an API key.

## Project structure

```text
fake-betting/
├── app/
│   ├── api/odds/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── dashboard.tsx
├── lib/
│   ├── mock-events.ts
│   └── odds-api.ts
├── types/
│   └── index.ts
├── .env.example
├── .gitignore
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Static / Neocities version

Neocities cannot run the Next.js server directly.

A separate static HTML/CSS/JavaScript export can be made from the same design for hosts such as Neocities.

## License

Use and modify this starter for your own projects. Check any third-party service terms before connecting external APIs.
