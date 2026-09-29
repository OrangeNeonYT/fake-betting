
# TokenHouse — Virtual Sports Lounge

A fake-money sports prediction dashboard built with **Next.js, React, Tailwind CSS, Framer Motion, and Lucide**.

> **Important:** This is a virtual-token demo. It does not handle real money, deposits, withdrawals, or real-money betting.

---

# 🚀 HOW TO RUN IT

You do **not** run this by double-clicking a file.

Because this is a Next.js project, you start it with **Node.js + npm**.

## OPTION 1 — Run it on your computer

### Step 1 — Install Node.js

Go to:

**https://nodejs.org/**

Download the **LTS** version.

Install it normally.

You only need to do this once.

---

### Step 2 — Download the GitHub project

Open:

**https://github.com/OrangeNeonYT/fake-betting**

Click:

**Code → Download ZIP**

Unzip the downloaded file.

You should now have a folder called something like **fake-betting-main**.

---

### Step 3 — Open a terminal in that folder

Open Terminal / Command Prompt / PowerShell.

Then move into the project folder.

For example:

~~~bash
cd ~/Downloads/fake-betting-main
~~~

If your folder is somewhere else, use that folder's path instead.

### Easy trick

You can type:

~~~bash
cd 
~~~

and then **drag the project folder into the terminal window**.

Your computer will automatically fill in the folder path.

Press **Enter**.

---

### Step 4 — Install the project's packages

Run:

~~~bash
npm install
~~~

Wait for it to finish.

This downloads Next.js, React, Tailwind, Framer Motion, Lucide, and the other packages the project needs.

You only need to do this again when dependencies change.

---

### Step 5 — Start the website

Run:

~~~bash
npm run dev
~~~

You should see something similar to:

~~~text
Ready
Local: http://localhost:3000
~~~

---

### Step 6 — Open the website

Open your browser and go to:

**http://localhost:3000**

That's it. 🎉

You are now running the fake-betting dashboard on your computer.

---

# 🛑 HOW TO STOP IT

Go back to the terminal where the website is running.

Press:

~~~text
Ctrl + C
~~~

The local website will stop.

---

# 🔄 HOW TO START IT AGAIN LATER

Open the project folder in your terminal and run:

~~~bash
npm run dev
~~~

Then open:

**http://localhost:3000**

---

# ✏️ HOW TO CHANGE THE WEBSITE

The main dashboard is:

**components/dashboard.tsx**

The fake event data is:

**lib/mock-events.ts**

The main styling is:

**app/globals.css**

The home page is:

**app/page.tsx**

---

# 🎰 WHAT IS ALREADY BUILT?

The dashboard includes:

- Dark casino-inspired UI
- Neon green success styling
- Gold Token styling
- Sticky Token balance
- Profile level
- Event categories
- Soccer
- Basketball
- Esports
- Pop Culture
- Live event indicators
- Virtual odds
- Bet placement modal
- Starting balance of 1,000 Tokens
- Balance validation
- Open bet tracking
- Potential return calculations
- Smooth animations
- Responsive layout
- Mock events

---

# 💰 IMPORTANT: THESE ARE NOT REAL BETS

The "Tokens" are completely virtual.

There is:

- No bank account connection
- No credit card
- No deposits
- No withdrawals
- No real-money wagering

The project is intended as a game/UI prototype.

---

# 🌐 OPTIONAL: REAL EVENT DATA

The project has an optional server route for **The Odds API**:

**/api/odds**

To use it:

### 1. Create a .env.local file

Copy:

**.env.example**

and rename the copy to:

**.env.local**

### 2. Put your API key inside it

~~~env
ODDS_API_KEY=your_key_here
~~~

Do **NOT** upload your real API key to GitHub.

The .gitignore file is configured to keep .env.local out of the repository.

---

# 📁 PROJECT STRUCTURE

~~~text
fake-betting/
│
├── app/
│   ├── api/
│   │   └── odds/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── dashboard.tsx
│
├── lib/
│   ├── mock-events.ts
│   └── odds-api.ts
│
├── types/
│   └── index.ts
│
├── .env.example
├── .gitignore
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
~~~

---

# 🧰 COMMON PROBLEMS

## "npm is not recognized"

Node.js is probably not installed correctly.

Install the **LTS** version from:

**https://nodejs.org/**

Then close and reopen your terminal.

---

## "Cannot find package" or dependency errors

Run:

~~~bash
npm install
~~~

again.

Then:

~~~bash
npm run dev
~~~

---

## "Port 3000 is already in use"

Try:

~~~bash
npm run dev -- --port 3001
~~~

Then open:

**http://localhost:3001**

---

# ☁️ WANT IT ONLINE?

The easiest way to put the **Next.js version** online is a service that supports Next.js, such as Vercel.

**Neocities does NOT run the Next.js version directly.**

For Neocities, this project needs to be converted into a static:

~~~text
index.html
style.css
script.js
~~~

version first.

---

# 🔗 REPOSITORY

GitHub:

**https://github.com/OrangeNeonYT/fake-betting**
