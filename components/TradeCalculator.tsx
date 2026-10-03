"use client";

import { useId, useState } from "react";
import { compareTrades, summarizeTrade, tradeItems, VALUE_CHECKED, VALUE_SOURCE, type TradeLine } from "@/lib/trade-values";

const number = (value: number) => value.toLocaleString("en-US");
const control = "w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-3 py-2 text-[hsl(var(--fg))]";

function Offer({ label, lines, onChange }: { label: string; lines: TradeLine[]; onChange: (lines: TradeLine[]) => void }) {
  const id = useId();
  const total = summarizeTrade(lines);
  return (
    <fieldset className="min-w-0 rounded-xl border border-[hsl(var(--border))] p-4">
      <legend className="px-2 text-lg font-semibold">{label}</legend>
      {lines.length === 0 && <p className="text-sm">No items added yet.</p>}
      <div className="space-y-4">
        {lines.map((line, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={`${id}-item-${index}`} className="block text-sm">Item {index + 1}</label>
            <select id={`${id}-item-${index}`} className={control} value={line.item} onChange={(event) => onChange(lines.map((entry, i) => i === index ? { ...entry, item: event.target.value } : entry))}>
              {tradeItems.map((item) => <option key={item.name} value={item.name}>{item.name} — {number(item.score)}{item.approximate ? "+" : ""}</option>)}
            </select>
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <label htmlFor={`${id}-quantity-${index}`} className="block text-sm">Quantity</label>
                <input id={`${id}-quantity-${index}`} type="number" inputMode="numeric" min={1} max={9999} step={1} className={control} value={Number.isNaN(line.quantity) ? "" : line.quantity} onChange={(event) => onChange(lines.map((entry, i) => i === index ? { ...entry, quantity: event.target.value === "" ? NaN : Number(event.target.value) } : entry))} />
              </div>
              <button type="button" className="rounded-lg border border-[hsl(var(--border))] px-3 py-2" aria-label={`Remove ${label} item ${index + 1}`} onClick={() => onChange(lines.filter((_, i) => i !== index))}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="mt-4 rounded-lg bg-[hsl(var(--theme))] px-4 py-2 text-white disabled:opacity-50" disabled={lines.length >= 20} onClick={() => onChange([...lines, { item: tradeItems[0].name, quantity: 1 }])}>Add item to {label.toLowerCase()}</button>
      <p className="mt-4 font-semibold">{total.complete ? `Tracker score: ${number(total.score)}${total.approximate ? "+ (baseline)" : ""}` : "Enter whole quantities from 1 to 9,999."}</p>
    </fieldset>
  );
}

export function TradeCalculator() {
  const [you, setYou] = useState<TradeLine[]>([]);
  const [them, setThem] = useState<TradeLine[]>([]);
  const comparison = compareTrades(summarizeTrade(you), summarizeTrade(them));
  return (
    <section aria-label="Garden Tower Defense trade comparison" className="my-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 sm:p-6">
      <h2 className="text-xl font-bold">Compare your offer</h2>
      <p className="mt-2 text-sm">Uses 20 community tracker entries checked {VALUE_CHECKED}. These are Value scores, not a verified Seeds exchange rate or completed-sale prices. Values can be stale even when a tracker page is accessible.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Offer label="Your offer" lines={you} onChange={setYou} />
        <Offer label="Their offer" lines={them} onChange={setThem} />
      </div>
      <div role="status" aria-live="polite" aria-atomic="true" className="mt-4 rounded-lg border border-[hsl(var(--border))] p-4">
        {comparison.difference !== null && <p className="font-semibold">Their score minus yours: {comparison.difference > 0 ? "+" : ""}{number(comparison.difference)}{you.some((line) => tradeItems.find((item) => item.name === line.item)?.approximate) || them.some((line) => tradeItems.find((item) => item.name === line.item)?.approximate) ? " (baseline)" : ""}</p>}
        <p className="text-sm">{comparison.message}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <a href={VALUE_SOURCE} rel="noopener noreferrer nofollow" className="underline">Check the source tracker</a>
        <button type="button" className="underline" onClick={() => { setYou([]); setThem([]); }}>Clear both offers</button>
      </div>
    </section>
  );
}
