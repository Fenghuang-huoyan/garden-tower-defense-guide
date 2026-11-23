"use client";

import { useId, useMemo, useState } from "react";
import { compareTrades, summarizeTrade, tradeItems, VALUE_CHECKED, VALUE_SOURCE, type TradeLine } from "@/lib/trade-values";
import { monetizationConfig } from "@/config/monetization.config";

const number = (value: number) => value.toLocaleString("en-US");
const control = "w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-3 py-2 text-sm text-[hsl(var(--fg))]";

const QUICK_PICKS = ["Blossom Barrage", "Shadestool", "Seed Mech", "Electric Beetroot", "VIP Gift", "Rafflesia"];

function Offer({
  label,
  lines,
  onChange,
}: {
  label: string;
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
    <fieldset className="min-w-0 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/40 p-4">
      <legend className="px-2 text-base font-bold">{label}</legend>

      <div className="mb-3 space-y-2">
        <input
          type="search"
          placeholder="Filter 53 priced units (e.g. Blossom, Godly, Gift)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={control}
          aria-label={`Filter units for ${label}`}
        />
        <div className="flex flex-wrap gap-1.5">
          {QUICK_PICKS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => addItem(name)}
              className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-1 text-xs font-medium hover:border-[hsl(var(--theme))]"
            >
              + {name}
            </button>
          ))}
        </div>
      </div>

      {lines.length === 0 && <p className="py-2 text-sm text-[hsl(var(--muted))]">No items added yet. Pick above or click Add item.</p>}

      <div className="space-y-3">
        {lines.map((line, index) => {
          const meta = tradeItems.find((it) => it.name === line.item);
          const optionsList = filteredOptions.some((o) => o.name === line.item)
            ? filteredOptions
            : [...(meta ? [meta] : []), ...filteredOptions];

          return (
            <div key={index} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-2.5 space-y-2">
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
                    {item.approximate ? "+" : ""} ({item.rarity} · Demand {item.demand}/10)
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <label htmlFor={`${id}-quantity-${index}`} className="text-xs font-medium text-[hsl(var(--muted))]">
                    Qty
                  </label>
                  <input
                    id={`${id}-quantity-${index}`}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={9999}
                    step={1}
                    className="w-24 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-2.5 py-1 text-sm"
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
                    <span className="text-xs text-[hsl(var(--muted))]">
                      Demand {meta.demand}/10 · {meta.status}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="rounded-md border border-[hsl(var(--border))] px-2.5 py-1 text-xs hover:bg-red-500/10"
                  aria-label={`Remove ${label} item ${index + 1}`}
                  onClick={() => onChange(lines.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          className="rounded-lg bg-[hsl(var(--theme))] px-3.5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          disabled={lines.length >= 20}
          onClick={() => addItem((filteredOptions[0] ?? tradeItems[0]).name)}
        >
          + Add item
        </button>
        <div className="text-right text-sm">
          <p className="font-bold">
            {total.complete
              ? `Score: ${number(total.score)}${total.approximate ? "+" : ""}`
              : "Enter valid qty (1–9,999)"}
          </p>
          {!total.empty && total.complete && (
            <p className="text-xs text-[hsl(var(--muted))]">Avg Demand: {total.avgDemand}/10</p>
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
        : "bg-amber-500 text-slate-950";

  const bandLabel =
    comparison.band === "WIN"
      ? "SCORE ADVANTAGE (W)"
      : comparison.band === "LOSE"
        ? "UNDER OFFER (L)"
        : "FAIR RANGE (±10% F)";

  return (
    <section
      aria-label="Garden Tower Defense WFL Trade Calculator"
      className="my-8 rounded-2xl border-2 border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="inline-block rounded-md bg-[hsl(var(--theme))]/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[hsl(var(--theme))]">
            Interactive WFL Calculator · 53 Priced Units
          </span>
          <h2 className="mt-1 text-xl font-bold">Win / Fair / Lose Trade Value Checker</h2>
        </div>
        <button
          type="button"
          className="rounded-lg border border-[hsl(var(--border))] px-3 py-1.5 text-xs font-medium hover:bg-[hsl(var(--bg))]"
          onClick={() => {
            setYou([]);
            setThem([]);
          }}
        >
          Clear both offers
        </button>
      </div>

      <p className="mt-2 text-sm text-[hsl(var(--muted))]">
        Compares all 53 non-zero community tracker entries checked {VALUE_CHECKED} (including Exclusive, Godly, Mythical, and Gamepass gifts). Scores reflect displayed tracker points, not official Seeds or cash sales.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Offer label="Your offer" lines={you} onChange={setYou} />
        <Offer label="Their offer" lines={them} onChange={setThem} />
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/60 p-4"
      >
        {comparison.difference !== null ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md px-2.5 py-1 text-xs font-extrabold tracking-wide ${badgeStyle}`}>
                  {bandLabel}
                </span>
                <span className="text-base font-bold">
                  Difference: {comparison.difference > 0 ? "+" : ""}
                  {number(comparison.difference)} pts (
                  {comparison.percentDiff !== null && comparison.percentDiff > 0 ? "+" : ""}
                  {comparison.percentDiff}%)
                </span>
              </div>
              <p className="text-xs text-[hsl(var(--muted))]">{comparison.message}</p>
            </div>
            <div className="text-xs font-medium text-[hsl(var(--muted))]">
              Demand check: You {youTotal.avgDemand}/10 vs Them {themTotal.avgDemand}/10
            </div>
          </div>
        ) : (
          <p className="text-sm font-medium">{comparison.message}</p>
        )}
      </div>

      {/* Marketplace / Live Listings Comparison Box */}
      <div className="mt-4 rounded-xl border border-[hsl(var(--theme))]/40 bg-[hsl(var(--theme))]/5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-sm font-bold">
              {hasEldorado
                ? "Looking for Blossom Barrage, Godly Units, or Gamepass Gifts Directly?"
                : "Cross-Check Live Player Listings Before Confirming High-Tier Trades"}
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
                className="inline-flex items-center rounded-lg bg-[hsl(var(--theme))] px-4 py-2 text-xs font-bold text-white hover:opacity-90"
              >
                Check Verified Listings on Eldorado.gg →
              </a>
            ) : (
              <a
                href={monetizationConfig.traderieReferenceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center rounded-lg bg-[hsl(var(--theme))] px-3.5 py-2 text-xs font-bold text-white hover:opacity-90"
              >
                Cross-Check Traderie Listings →
              </a>
            )}
            <a
              href={VALUE_SOURCE}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-xs font-semibold hover:underline"
            >
              Source Tracker
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
