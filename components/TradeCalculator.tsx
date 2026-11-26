"use client";

import { useId, useMemo, useState } from "react";
import { compareTrades, summarizeTrade, tradeItems, VALUE_CHECKED, VALUE_SOURCE, type TradeLine } from "@/lib/trade-values";
import { monetizationConfig } from "@/config/monetization.config";

const number = (value: number) => value.toLocaleString("en-US");
const control =
  "w-full min-h-[42px] rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-3 py-2 text-sm font-medium text-[hsl(var(--fg))] transition focus:border-[hsl(var(--theme))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--theme))]/25";

const QUICK_PICKS = ["Blossom Barrage", "Shadestool", "Seed Mech", "Electric Beetroot", "VIP Gift", "Rafflesia"];

function rarityPillClass(rarity: string) {
  const r = rarity.toLowerCase();
  if (r.includes("exclusive")) return "bg-rose-600/15 text-rose-700 dark:text-rose-300 border-rose-500/30";
  if (r.includes("godly")) return "bg-purple-600/15 text-purple-700 dark:text-purple-300 border-purple-500/30";
  if (r.includes("mythic")) return "bg-indigo-600/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30";
  if (r.includes("gamepass")) return "bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
  return "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30";
}

function Offer({
  label,
  accentClass,
  lines,
  onChange,
}: {
  label: string;
  accentClass: string;
  lines: TradeLine[];
  onChange: (lines: TradeLine[]) => void;
}) {
  const id = useId();
  const [query, setQuery] = useState("");
  const total = summarizeTrade(lines);

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tradeItems;
    return tradeItems.filter(
      (it) => it.name.toLowerCase().includes(q) || it.rarity.toLowerCase().includes(q)
    );
  }, [query]);

  const addItem = (itemName: string) => {
    if (lines.length >= 20) return;
    const existingIdx = lines.findIndex((l) => l.item === itemName);
    if (existingIdx >= 0) {
      onChange(
        lines.map((entry, idx) =>
          idx === existingIdx ? { ...entry, quantity: (Number(entry.quantity) || 0) + 1 } : entry
        )
      );
    } else {
      onChange([...lines, { item: itemName, quantity: 1 }]);
    }
  };

  return (
    <fieldset className={`min-w-0 rounded-2xl border border-[hsl(var(--border))] border-t-4 ${accentClass} bg-[hsl(var(--bg))]/45 p-4 sm:p-5`}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <legend className="px-1 text-base font-extrabold tracking-tight">{label}</legend>
        <span className="rounded-full bg-[hsl(var(--card))] px-3 py-1 text-xs font-bold tabular-nums shadow-2xs border border-[hsl(var(--border))]">
          {total.complete ? `${number(total.score)}${total.approximate ? "+" : ""} pts` : "Invalid qty"}
        </span>
      </div>

      <div className="mb-3.5 space-y-2">
        <div className="relative">
          <input
            type="search"
            placeholder="Search 53 units or rarity (e.g. Blossom, Godly, Gift)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={control}
            aria-label={`Filter units for ${label}`}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_PICKS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => addItem(name)}
              className="min-h-[30px] rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2.5 py-1 text-xs font-semibold transition hover:border-[hsl(var(--theme))] hover:bg-[hsl(var(--theme))]/10"
            >
              + {name}
            </button>
          ))}
        </div>
      </div>

      {lines.length === 0 && (
        <p className="rounded-lg border border-dashed border-[hsl(var(--border))] py-5 text-center text-sm text-[hsl(var(--muted))]">
          No units in {label.toLowerCase()}. Tap a quick chip above or click + Add unit.
        </p>
      )}

      <div className="space-y-2.5">
        {lines.map((line, index) => {
          const meta = tradeItems.find((it) => it.name === line.item);
          const optionsList = filteredOptions.some((o) => o.name === line.item)
            ? filteredOptions
            : [...(meta ? [meta] : []), ...filteredOptions];
          const lineScore = meta && !Number.isNaN(line.quantity) ? meta.score * Math.max(0, line.quantity) : 0;

          return (
            <div key={index} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-2xs space-y-2.5">
              <label htmlFor={`${id}-item-${index}`} className="sr-only">
                {label} Item {index + 1}
              </label>
              <select
                id={`${id}-item-${index}`}
                className={control}
                value={line.item}
                onChange={(event) =>
                  onChange(lines.map((entry, i) => (i === index ? { ...entry, item: event.target.value } : entry)))
                }
              >
                {optionsList.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name} — {number(item.score)}
                    {item.approximate ? "+" : ""} pts ({item.rarity} · Demand {item.demand}/10)
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  <label htmlFor={`${id}-quantity-${index}`} className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted))]">
                    Qty
                  </label>
                  <input
                    id={`${id}-quantity-${index}`}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={9999}
                    step={1}
                    className="min-h-[36px] w-20 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-2.5 py-1 text-sm font-bold tabular-nums"
                    value={Number.isNaN(line.quantity) ? "" : line.quantity}
                    onChange={(event) =>
                      onChange(
                        lines.map((entry, i) =>
                          i === index ? { ...entry, quantity: event.target.value === "" ? NaN : Number(event.target.value) } : entry
                        )
                      )
                    }
                  />
                  {meta && (
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-bold ${rarityPillClass(meta.rarity)}`}>
                      {meta.rarity}
                    </span>
                  )}
                  {meta && (
                    <span className="text-xs font-medium text-[hsl(var(--muted))] tabular-nums">
                      Demand {meta.demand}/10 · {meta.status}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tabular-nums text-[hsl(var(--fg))]">
                    = {number(lineScore)}{meta?.approximate ? "+" : ""}
                  </span>
                  <button
                    type="button"
                    className="inline-flex min-h-[34px] items-center gap-1 rounded-lg border border-[hsl(var(--border))] px-2.5 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-500/40 hover:bg-rose-500/10 dark:text-rose-400"
                    aria-label={`Remove ${label} item ${index + 1}`}
                    onClick={() => onChange(lines.filter((_, i) => i !== index))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[hsl(var(--border))]/70 pt-3.5">
        <button
          type="button"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[hsl(var(--theme))] px-4 py-2 text-sm font-bold text-white shadow-xs transition hover:brightness-105 disabled:opacity-50"
          disabled={lines.length >= 20}
          onClick={() => addItem((filteredOptions[0] ?? tradeItems[0]).name)}
        >
          <span>+ Add unit</span>
        </button>
        <div className="text-right text-sm tabular-nums">
          <p className="text-base font-extrabold">
            {total.complete
              ? `Total: ${number(total.score)}${total.approximate ? "+" : ""} pts`
              : "Enter valid qty (1–9,999)"}
          </p>
          {!total.empty && total.complete && (
            <p className="text-xs font-medium text-[hsl(var(--muted))]">Avg Demand: {total.avgDemand}/10</p>
          )}
        </div>
      </div>
    </fieldset>
  );
}

export function TradeCalculator() {
  const [you, setYou] = useState<TradeLine[]>([{ item: "Seed Mech", quantity: 1 }]);
  const [them, setThem] = useState<TradeLine[]>([
    { item: "Hellroot", quantity: 1 },
    { item: "VIP Gift", quantity: 1 },
  ]);

  const youTotal = summarizeTrade(you);
  const themTotal = summarizeTrade(them);
  const comparison = compareTrades(youTotal, themTotal);
  const eldoradoUrl = monetizationConfig.eldoradoAffiliateUrl.trim();
  const hasEldorado = eldoradoUrl.length > 0;

  const badgeStyle =
    comparison.band === "WIN"
      ? "bg-emerald-600 text-white"
      : comparison.band === "LOSE"
        ? "bg-rose-600 text-white"
        : "bg-amber-400 text-slate-950";

  const bandLabel =
    comparison.band === "WIN"
      ? "WIN · SCORE ADVANTAGE"
      : comparison.band === "LOSE"
        ? "LOSE · OVERPAYING"
        : "FAIR TRADE (±10%)";

  const combinedScore = Math.max(1, (youTotal.score || 0) + (themTotal.score || 0));
  const youSharePct = Math.max(8, Math.min(92, Math.round(((youTotal.score || 0) / combinedScore) * 100)));

  return (
    <section
      aria-label="Garden Tower Defense WFL Trade Calculator"
      className="my-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-md sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--theme))]/30 bg-[hsl(var(--theme))]/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[hsl(var(--theme))]">
            <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
            Interactive WFL Calculator · 53 Priced Units
          </span>
          <h2 className="!mt-2 text-2xl font-extrabold">Win / Fair / Lose Trade Value Checker</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-3.5 py-1.5 text-xs font-bold transition hover:border-[hsl(var(--theme))]"
            onClick={() => {
              const prevYou = you;
              setYou(them);
              setThem(prevYou);
            }}
          >
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
            Swap Sides
          </button>
          <button
            type="button"
            className="inline-flex min-h-[38px] items-center rounded-xl border border-[hsl(var(--border))] px-3.5 py-1.5 text-xs font-semibold text-[hsl(var(--muted))] transition hover:bg-rose-500/10 hover:text-rose-600"
            onClick={() => {
              setYou([]);
              setThem([]);
            }}
          >
            Reset Both
          </button>
        </div>
      </div>

      <p className="mt-2 max-w-3xl text-sm text-[hsl(var(--muted))]">
        Compares all 53 non-zero community tracker entries checked {VALUE_CHECKED} (including Exclusive, Godly, Mythical, and Gamepass gifts). Scores reflect displayed tracker points, not official Seeds or cash sales.
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Offer label="Your Offer (Giving)" accentClass="border-t-emerald-500" lines={you} onChange={setYou} />
        <Offer label="Their Offer (Receiving)" accentClass="border-t-sky-500" lines={them} onChange={setThem} />
      </div>

      {/* Verdict & Visual Balance Meter */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-5 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/70 p-4 sm:p-5"
      >
        {comparison.difference !== null ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`rounded-full px-3 py-1 text-xs font-extrabold tracking-wide shadow-2xs ${badgeStyle}`}>
                    {bandLabel}
                  </span>
                  <span className="text-base font-extrabold tabular-nums">
                    Net Difference: {comparison.difference > 0 ? "+" : ""}
                    {number(comparison.difference)} pts (
                    {comparison.percentDiff !== null && comparison.percentDiff > 0 ? "+" : ""}
                    {comparison.percentDiff}%)
                  </span>
                </div>
                <p className="text-xs font-medium text-[hsl(var(--muted))]">{comparison.message}</p>
              </div>
              <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5 text-xs font-bold tabular-nums">
                Demand: You {youTotal.avgDemand}/10 vs. Them {themTotal.avgDemand}/10
              </div>
            </div>

            <div aria-hidden="true" className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--muted))] tabular-nums">
                <span>You: {number(youTotal.score)} pts ({youSharePct}%)</span>
                <span>Them: {number(themTotal.score)} pts ({100 - youSharePct}%)</span>
              </div>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[hsl(var(--border))]">
                <div className="bg-emerald-500 transition-all duration-200" style={{ width: `${youSharePct}%` }} />
                <div className="bg-sky-500 transition-all duration-200" style={{ width: `${100 - youSharePct}%` }} />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm font-semibold">{comparison.message}</p>
        )}
      </div>

      {/* Marketplace / Live Listings Comparison Box */}
      <div className="mt-4 rounded-2xl border border-[hsl(var(--theme))]/35 bg-[hsl(var(--theme))]/8 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="flex items-center gap-1.5 text-sm font-extrabold">
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--theme))] shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <span>
                {hasEldorado
                  ? "Looking for Blossom Barrage, Godly Units, or Gamepass Gifts Directly?"
                  : "Cross-Check Live Player Listings Before Confirming High-Tier Trades"}
              </span>
            </p>
            <p className="text-xs text-[hsl(var(--muted))]">
              {hasEldorado
                ? monetizationConfig.disclosure
                : "Static value snapshots shift after Saturday 13:00 UTC updates. Compare live community listings alongside tracker scores."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {hasEldorado ? (
              <a
                href={eldoradoUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-[hsl(var(--theme))] px-4 py-2 text-xs font-extrabold text-white shadow-xs transition hover:brightness-105"
              >
                <span>Check Verified Listings on Eldorado.gg</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <a
                href={monetizationConfig.traderieReferenceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-[hsl(var(--theme))] px-4 py-2 text-xs font-extrabold text-white shadow-xs transition hover:brightness-105"
              >
                <span>Cross-Check Traderie Listings</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={VALUE_SOURCE}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex min-h-[42px] items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3.5 py-2 text-xs font-bold transition hover:border-[hsl(var(--theme))]"
            >
              Source Tracker
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
