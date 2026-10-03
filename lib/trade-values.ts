/** Displayed community Value scores, checked 2026-10-03. Not Seeds or completed-sale prices. */
export const VALUE_SOURCE = "https://gardentowerdefensevalues.com";
export const VALUE_CHECKED = "2026-10-03";
export const tradeItems = [
  { name: "Blossom Barrage", score: 11500, approximate: true },
  { name: "Shadestool", score: 4500, approximate: true },
  { name: "Seed Mech", score: 2000, approximate: false },
  { name: "Mango Cluster", score: 1800, approximate: false },
  { name: "Hellroot", score: 1400, approximate: true },
  { name: "Rosebeam", score: 800, approximate: true },
  { name: "Tiki Tower", score: 750, approximate: false },
  { name: "Carrotastrophe", score: 450, approximate: true },
  { name: "Sporefang", score: 350, approximate: false },
  { name: "Juggercorn", score: 300, approximate: true },
  { name: "Timekeeper", score: 250, approximate: true },
  { name: "Rafflesia", score: 225, approximate: false },
  { name: "Petalray", score: 225, approximate: false },
  { name: "Electroleaf", score: 200, approximate: false },
  { name: "Lil Stump", score: 200, approximate: true },
  { name: "Passion Shooter", score: 200, approximate: true },
  { name: "Doompetal", score: 175, approximate: true },
  { name: "Pesticider", score: 25, approximate: false },
  { name: "Potshade", score: 10, approximate: false },
  { name: "Blueberries", score: 7, approximate: false },
] as const;

export type TradeLine = { item: string; quantity: number };
export type TradeTotal = { score: number; approximate: boolean; complete: boolean; empty: boolean };

export function summarizeTrade(lines: TradeLine[]): TradeTotal {
  let score = 0;
  let approximate = false;
  let complete = true;
  for (const line of lines) {
    const item = tradeItems.find((entry) => entry.name === line.item);
    if (!item || !Number.isSafeInteger(line.quantity) || line.quantity < 1 || line.quantity > 9999) {
      complete = false;
      continue;
    }
    score += item.score * line.quantity;
    approximate ||= item.approximate;
  }
  return { score, approximate, complete, empty: lines.length === 0 };
}

export function compareTrades(you: TradeTotal, them: TradeTotal) {
  if (you.empty || them.empty) return { difference: null, message: "Add at least one item to each offer." };
  if (!you.complete || !them.complete) return { difference: null, message: "A quantity or item is invalid. No complete comparison is available." };
  const difference = them.score - you.score;
  const message = you.approximate || them.approximate
    ? "Includes + values: this is a baseline comparison, not an exact trade value or a win/loss verdict."
    : "Comparison of the cited tracker scores only. Demand and actual offers may change the trade.";
  return { difference, message };
}
