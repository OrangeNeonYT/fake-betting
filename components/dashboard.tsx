"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Coins,
  Gauge,
  Gift,
  History,
  ShieldCheck,
  Trophy,
  UserRound,
  X,
  Zap
} from "lucide-react";
import { categories, fakeEvents, mockEvents } from "@/lib/mock-events";
import type { CategoryId, VirtualBet, VirtualEvent } from "@/types";

const STARTING_TOKENS = 1000;

function formatStart(iso: string, fakeMode = false) {
  if (fakeMode) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    const diff = date.getTime() - Date.now();
    if (diff <= 0) return "NOW";
    const seconds = Math.ceil(diff / 1000);
    return seconds < 60 ? `IN ${seconds}s` : `IN ${Math.ceil(seconds / 60)}m`;
  }
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

export default function Dashboard() {
  const fakeClockStartedAt = Date.now();
  const [category, setCategory] = useState<CategoryId>("all");
  const [tokens, setTokens] = useState(STARTING_TOKENS);
  const [selected, setSelected] = useState<{ event: VirtualEvent; outcome: string; odds: number } | null>(null);
  const [stake, setStake] = useState(50);
  const [bets, setBets] = useState<VirtualBet[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fakeMode, setFakeMode] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const activeFakeEvents = useMemo(() => fakeEvents.map((event, index) => ({
    ...event,
    startTime: new Date(fakeClockStartedAt + (index % 2 === 0 ? -5000 : (index + 1) * 20000)).toISOString()
  })), []);
  const activeEvents = fakeMode ? activeFakeEvents : mockEvents;
  const filteredEvents = useMemo(
    () => category === "all" ? activeEvents : activeEvents.filter((event) => event.category === category),
    [activeEvents, category]
  );

  const level = Math.max(1, Math.floor((STARTING_TOKENS - tokens + 1000) / 500));

  function openBet(event: VirtualEvent, outcome: string, odds: number) {
    setStake(Math.min(50, tokens));
    setSelected({ event, outcome, odds });
  }

  function resolveFakeBet(betId: string, event: VirtualEvent) {
    setBets((items) => {
      const target = items.find((bet) => bet.id === betId);
      if (!target || target.status !== "open") return items;

      const winner = event.outcomes[Math.floor(Math.random() * event.outcomes.length)].name;
      const won = target.selection === winner;

      if (won) {
        setTokens((value) => value + target.potentialReturn);
      }

      setResultMessage(won
        ? `🎉 ${target.selection} won! +${target.potentialReturn.toLocaleString()} Tokens`
        : `❌ ${target.selection} lost. Better luck next time.`
      );
      window.setTimeout(() => setResultMessage(""), 3500);

      return items.map((bet) =>
        bet.id === betId ? { ...bet, status: won ? "won" : "lost" } : bet
      );
    });
  }

  function placeBet() {
    if (!selected || stake <= 0 || stake > tokens) return;

    const bet: VirtualBet = {
      id: crypto.randomUUID(),
      eventId: selected.event.id,
      selection: selected.outcome,
      odds: selected.odds,
      stake,
      potentialReturn: Number((stake * selected.odds).toFixed(2)),
      status: "open",
      placedAt: new Date().toISOString()
    };

    setTokens((value) => value - stake);
    setBets((items) => [bet, ...items]);
    setSelected(null);

    if (fakeMode) {
      const delay = Math.max(3, selected.event.resolveAfterSeconds ?? 7) * 1000;
      window.setTimeout(() => resolveFakeBet(bet.id, selected.event), delay);
    }
  }

  useEffect(() => {
    if (!fakeMode) return;
    const timer = window.setInterval(() => {
      setResultMessage((value) => value);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [fakeMode]);

  return (
    <>
    <div className="min-h-screen bg-[#0B0E14] text-[#F5F7FA]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0E14]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#FFD700]/25 bg-[#FFD700]/10">
              <Coins className="h-5 w-5 text-[#FFD700]" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-black tracking-tight">
              TOKENHOUSE
              {fakeMode && <span className="rounded-full bg-[#00E676]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#00E676]">Fake-Mode</span>}
            </div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/40">Virtual Sports Lounge</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 sm:flex sm:items-center sm:gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#FFD700]/10">
                <Trophy className="h-4 w-4 text-[#FFD700]" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">Level</div>
                <div className="font-bold">LVL {level}</div>
              </div>
            </div>
            <div className="rounded-xl border border-[#00E676]/25 bg-[#00E676]/10 px-3 py-2 shadow-[0_0_22px_rgba(0,230,118,0.17)]">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-[#00E676]" />
                <span className="font-black text-[#00E676]">{tokens.toLocaleString()} Tokens</span>
              </div>
            </div>
            <button className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:bg-white/[0.07]" aria-label="Profile">
              <UserRound className="h-5 w-5 text-white/70" />
            </button>
          </div>
        </div>
      </header>

      <main className="grid-bg mx-auto max-w-[1440px] px-4 pb-12 pt-6 md:px-6">
        <section className="mb-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#121722]/85 p-2">
          <div className="flex min-w-max gap-2">
            {categories.map((item) => {
              const active = category === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  className={`group flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-[#FFD700] text-black shadow-[0_0_24px_rgba(255,215,0,0.16)]"
                      : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <span className={active ? "" : "opacity-70 group-hover:opacity-100"}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-7 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#00E676]">
              <span className="h-2 w-2 rounded-full bg-[#00E676] shadow-[0_0_12px_#00E676]" /> LIVE VIRTUAL MARKETS
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">Choose a side. Spend Tokens.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45 md:text-base">
              Practice with fake currency only. No deposits, withdrawals, or real-money wagering.
            </p>
          </div>
          <div className="rounded-2xl border border-[#FFD700]/15 bg-[#FFD700]/5 px-4 py-3 text-sm text-white/65">
            <div className="flex items-center gap-2 font-bold text-[#FFD700]"><Gift className="h-4 w-4" /> 1,000 free Tokens to start</div>
            <div className="mt-1 text-xs text-white/35">{fakeMode ? "Fictional events resolve automatically in seconds — no waiting." : "Simulated outcomes — for entertainment and UI prototyping."}</div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[1fr_330px]">
          <section className="grid gap-4 sm:grid-cols-2">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} onSelect={openBet} />
            ))}
          </section>

          <aside className="h-fit space-y-4 xl:sticky xl:top-24">
            <div className="rounded-2xl border border-white/10 bg-[#121722] p-5 shadow-[0_0_0_1px_rgba(255,215,0,0.08),0_0_28px_rgba(255,215,0,0.09)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/35">Your Session</div>
                  <div className="mt-1 text-xl font-black">Virtual Wallet</div>
                </div>
                <Gauge className="h-5 w-5 text-[#FFD700]" />
              </div>
              <div className="rounded-xl bg-black/20 p-4">
                <div className="text-xs text-white/35">Available</div>
                <div className="mt-1 text-3xl font-black text-[#00E676]">{tokens.toLocaleString()}</div>
                <div className="mt-1 text-xs text-white/30">Tokens</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Stat label="Open Bets" value={String(bets.filter((bet) => bet.status === "open").length)} icon={<Zap className="h-4 w-4" />} />
                <Stat label="Total Staked" value={bets.reduce((sum, bet) => sum + bet.stake, 0).toLocaleString()} icon={<Coins className="h-4 w-4" />} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121722] p-5">
              <div className="mb-4 flex items-center gap-2">
                <History className="h-4 w-4 text-white/60" />
                <h2 className="font-black">Recent Bets</h2>
              </div>
              {bets.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 p-5 text-center text-xs leading-5 text-white/35">
                  No bets yet. Pick an event to start your virtual session.
                </div>
              ) : (
                <div className="space-y-3">
                  {bets.slice(0, 4).map((bet) => (
                    <div key={bet.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-bold">{bet.selection}</div>
                          <div className="mt-1 text-xs text-white/35">{bet.stake} Tokens × {bet.odds.toFixed(2)}</div>
                        </div>
                        <div className="rounded-md bg-[#00E676]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00E676]">{bet.status}</div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-white/35">Potential return</span>
                        <span className="font-bold text-[#FFD700]">{bet.potentialReturn.toLocaleString()} Tokens</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121722] p-4 text-xs text-white/35">
              <div className="flex items-center gap-2 font-bold text-white/55"><ShieldCheck className="h-4 w-4" /> Simulation only</div>
              <p className="mt-2 leading-5">This prototype uses virtual Tokens. It does not connect to payment processors or enable real-money wagering.</p>
            </div>
          </aside>
        </div>
      </main>

      <AnimatePresence>
        {resultMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/10 bg-[#171D2A] px-4 py-3 text-sm font-bold shadow-2xl"
          >
            {resultMessage}
          </motion.div>
        )}
        {selected && (
          <BetModal
            selection={selected}
            stake={stake}
            tokens={tokens}
            setStake={setStake}
            onClose={() => setSelected(null)}
            onConfirm={placeBet}
          />
        )}
      </AnimatePresence>
    </div>
    <AnimatePresence>
      {showWelcome && (
        <WelcomeScreen
          onStart={() => {
            setFakeMode(true);
            setShowWelcome(false);
          }}
        />
      )}
    </AnimatePresence>
    </>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center bg-[#0B0E14]/95 p-5 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#121722] p-7 shadow-[0_0_60px_rgba(255,215,0,0.10)] md:p-9"
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#FFD700]/25 bg-[#FFD700]/10 text-2xl text-[#FFD700]">◈</div>
        <div className="mt-5 text-center text-xs font-black uppercase tracking-[0.22em] text-[#00E676]">Welcome to TokenHouse</div>
        <h1 className="mt-3 text-center text-4xl font-black tracking-tight md:text-5xl">Ready to play?</h1>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-white/45">
          Start with 1,000 virtual Tokens and test the dashboard without waiting for real event schedules.
        </p>

        <div className="mt-7 rounded-2xl border border-[#00E676]/25 bg-[#00E676]/[0.05] p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#00E676]/10 text-lg">⚡</div>
            <div>
              <div className="font-black text-[#00E676]">FAKE-MODE</div>
              <div className="mt-1 text-xs text-white/40">Fictional teams • instant countdowns • bets settle in seconds</div>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>• No real money or payments</li>
            <li>• Events use completely fictional teams and times</li>
            <li>• Open bets automatically become Won or Lost after a few seconds</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="mt-5 w-full rounded-xl bg-[#00E676] px-4 py-4 text-base font-black text-black transition hover:brightness-110"
        >
          Enter Fake-Mode
        </button>
        <div className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-white/25">1,000 free Tokens • Simulation only</div>
      </motion.div>
    </motion.div>
  );
}

function EventCard({ event, index, onSelect }: { event: VirtualEvent; index: number; onSelect: (event: VirtualEvent, outcome: string, odds: number) => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-white/10 bg-[#121722] p-4 transition hover:border-[#FFD700]/20"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-bold uppercase tracking-wider text-white/35">{event.league}</div>
        {event.live ? (
          <div className="flex items-center gap-1.5 rounded-full bg-[#00E676]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#00E676]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00E676]" /> Live
          </div>
        ) : <span className="text-xs text-white/30">{formatStart(event.startTime, event.fakeMode)}</span>}
      </div>

      <div className="mt-5 rounded-xl bg-black/15 p-4">
        <div className="flex items-center justify-between text-center">
          <Team name={event.homeTeam} align="left" />
          <div className="px-3 text-xs font-black text-white/25">VS</div>
          <Team name={event.awayTeam} align="right" />
        </div>
        {event.live && event.score && <div className="mt-3 text-center text-sm font-black text-[#FFD700]">{event.score}</div>}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {event.outcomes.slice(0, 2).map((outcome) => (
          <motion.button
            key={outcome.name}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(event, outcome.name, outcome.price)}
            className="group rounded-xl border border-white/10 bg-[#171D2A] p-3 text-left transition hover:border-[#00E676]/40 hover:bg-[#00E676]/5"
          >
            <div className="truncate text-xs font-semibold text-white/55 group-hover:text-white">{outcome.name}</div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-lg font-black text-[#FFD700]">{outcome.price.toFixed(2)}</span>
              <ArrowUpRight className="h-4 w-4 text-white/25 transition group-hover:text-[#00E676]" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.article>
  );
}

function Team({ name, align }: { name: string; align: "left" | "right" }) {
  return (
    <div className={`min-w-0 flex-1 ${align === "right" ? "text-right" : "text-left"}`}>
      <div className="text-sm font-black leading-5 md:text-base">{name}</div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
      <div className="flex items-center gap-2 text-white/35">{icon}<span className="text-[10px] uppercase tracking-wider">{label}</span></div>
      <div className="mt-2 text-xl font-black">{value}</div>
    </div>
  );
}

function BetModal({ selection, stake, tokens, setStake, onClose, onConfirm }: {
  selection: { event: VirtualEvent; outcome: string; odds: number };
  stake: number;
  tokens: number;
  setStake: (value: number) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const potentialReturn = Number((Math.max(0, stake) * selection.odds).toFixed(2));
  const valid = Number.isFinite(stake) && stake > 0 && stake <= tokens;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#121722] p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#00E676]">Place virtual bet</div>
            <h2 className="mt-2 text-2xl font-black">{selection.outcome}</h2>
            <p className="mt-1 text-sm text-white/40">{selection.event.homeTeam} vs {selection.event.awayTeam}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-white/40 transition hover:bg-white/[0.05] hover:text-white" aria-label="Close bet dialog">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-black/20 p-4">
            <div className="text-xs text-white/35">Odds</div>
            <div className="mt-1 text-2xl font-black text-[#FFD700]">{selection.odds.toFixed(2)}</div>
          </div>
          <div className="rounded-xl bg-black/20 p-4">
            <div className="text-xs text-white/35">Balance</div>
            <div className="mt-1 text-2xl font-black text-[#00E676]">{tokens.toLocaleString()}</div>
          </div>
        </div>

        <label className="mt-5 block text-sm font-bold">Stake</label>
        <div className="relative mt-2">
          <input
            type="number"
            min={1}
            max={tokens}
            value={stake}
            onChange={(e) => setStake(Number(e.target.value))}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-20 text-xl font-black outline-none transition focus:border-[#FFD700]/50"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">TOKENS</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-white/40">Potential return</span>
          <span className="font-black text-[#FFD700]">{potentialReturn.toLocaleString()} Tokens</span>
        </div>

        <button
          onClick={onConfirm}
          disabled={!valid}
          className="mt-6 w-full rounded-xl bg-[#00E676] px-4 py-3 font-black text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Confirm Virtual Bet
        </button>
        {!valid && <p className="mt-2 text-center text-xs text-[#FF5370]">Enter a stake between 1 and your available balance.</p>}
      </motion.div>
    </motion.div>
  );
}
