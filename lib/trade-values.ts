/** Displayed community Value scores, checked 2026-11-18 against GardenTowerDefenseValues.com. Not Seeds or completed-sale prices. */
export const VALUE_SOURCE = "https://gardentowerdefensevalues.com";
export const VALUE_CHECKED = "2026-11-18";

export type TradeItemEntry = {
  name: string;
  score: number;
  approximate: boolean;
  demand: number;
  status: string;
  rarity: string;
};

export const tradeItems: readonly TradeItemEntry[] = [
  { name: "Blossom Barrage", score: 11500, approximate: true, demand: 10, status: "Rising", rarity: "Exclusive" },
  { name: "Shadestool", score: 4500, approximate: true, demand: 7, status: "Unstable", rarity: "Godly" },
  { name: "Lucky Clover", score: 4500, approximate: false, demand: 7, status: "Stable", rarity: "Godly" },
  { name: "Beehive", score: 3500, approximate: false, demand: 7, status: "Unstable", rarity: "Godly" },
  { name: "Big Mushroom", score: 2000, approximate: true, demand: 7, status: "Fluctuating", rarity: "Exclusive" },
  { name: "Seed Mech", score: 2000, approximate: false, demand: 8, status: "Dropping", rarity: "Godly" },
  { name: "Mango Cluster", score: 1800, approximate: false, demand: 6, status: "Fluctuating", rarity: "Godly" },
  { name: "Electric Beetroot", score: 1450, approximate: false, demand: 10, status: "Rising", rarity: "Exclusive" },
  { name: "Dual Blasterbud", score: 1400, approximate: true, demand: 9, status: "Rising", rarity: "Exclusive" },
  { name: "Hellroot", score: 1400, approximate: true, demand: 9, status: "Rising", rarity: "Exclusive" },
  { name: "Confusion Plant", score: 850, approximate: false, demand: 6, status: "Unstable", rarity: "Godly" },
  { name: "Venus Flytrap", score: 850, approximate: false, demand: 7, status: "Fluctuating", rarity: "Godly" },
  { name: "Rosebeam", score: 800, approximate: true, demand: 8, status: "Unstable", rarity: "Exclusive" },
  { name: "Tiki Tower", score: 750, approximate: false, demand: 6, status: "Fluctuating", rarity: "Godly" },
  { name: "x2 Seeds Gift", score: 700, approximate: false, demand: 7, status: "Stable", rarity: "Gamepass" },
  { name: "Bloodvine", score: 650, approximate: false, demand: 7, status: "Stable", rarity: "Godly" },
  { name: "x3 Game Speed Gift", score: 650, approximate: false, demand: 7, status: "Stable", rarity: "Gamepass" },
  { name: "VIP Gift", score: 600, approximate: false, demand: 7, status: "Stable", rarity: "Gamepass" },
  { name: "Carrotastrophe", score: 450, approximate: true, demand: 8, status: "Unstable", rarity: "Exclusive" },
  { name: "Golem Gift", score: 450, approximate: false, demand: 7, status: "Stable", rarity: "Gamepass" },
  { name: "Sporefang", score: 350, approximate: false, demand: 5, status: "Fluctuating", rarity: "Godly" },
  { name: "Golem", score: 300, approximate: true, demand: 6, status: "Stable", rarity: "Exclusive" },
  { name: "Juggercorn", score: 300, approximate: true, demand: 7, status: "Unstable", rarity: "Exclusive" },
  { name: "Grapes", score: 300, approximate: false, demand: 5, status: "Stable", rarity: "Exclusive" },
  { name: "Timekeeper", score: 250, approximate: true, demand: 7, status: "Unstable", rarity: "Exclusive" },
  { name: "Petalray", score: 225, approximate: false, demand: 4, status: "Stable", rarity: "Godly" },
  { name: "Rafflesia", score: 225, approximate: false, demand: 6, status: "Unstable", rarity: "Godly" },
  { name: "Lil Stump", score: 200, approximate: true, demand: 6, status: "Fluctuating", rarity: "Godly" },
  { name: "Passion Shooter", score: 200, approximate: true, demand: 6, status: "Unstable", rarity: "Godly" },
  { name: "Electroleaf", score: 200, approximate: false, demand: 4, status: "Fluctuating", rarity: "Godly" },
  { name: "Pyropetal", score: 200, approximate: false, demand: 4, status: "Stable", rarity: "Godly" },
  { name: "Doompetal", score: 175, approximate: true, demand: 6, status: "Fluctuating", rarity: "Exclusive" },
  { name: "Glass Sunflower", score: 175, approximate: false, demand: 4, status: "Stable", rarity: "Leaderboard" },
  { name: "Icebuds", score: 175, approximate: false, demand: 4, status: "Stable", rarity: "Exclusive" },
  { name: "Stun Flower", score: 175, approximate: false, demand: 4, status: "Stable", rarity: "Godly" },
  { name: "Ballistic Banana", score: 150, approximate: false, demand: 7, status: "Stable", rarity: "Godly" },
  { name: "Corn", score: 150, approximate: false, demand: 4, status: "Stable", rarity: "Exclusive" },
  { name: "Atomic Pepper", score: 100, approximate: false, demand: 4, status: "Stable", rarity: "Godly" },
  { name: "Extra Unit Storage Gift", score: 100, approximate: false, demand: 5, status: "Unstable", rarity: "Gamepass" },
  { name: "+1 Equipped Unit Gift", score: 75, approximate: false, demand: 5, status: "Unstable", rarity: "Gamepass" },
  { name: "Bubble Plant", score: 50, approximate: false, demand: 3, status: "Stable", rarity: "Godly" },
  { name: "Pesticider", score: 25, approximate: false, demand: 2, status: "Stable", rarity: "Godly" },
  { name: "Potshade", score: 10, approximate: false, demand: 5, status: "Stable", rarity: "Mythical" },
  { name: "Blueberries", score: 7, approximate: false, demand: 4, status: "Stable", rarity: "Mythical" },
  { name: "Lawnmower", score: 6, approximate: false, demand: 3, status: "Stable", rarity: "Mythical" },
  { name: "Fan Flower", score: 5, approximate: false, demand: 2, status: "Stable", rarity: "Mythical" },
  { name: "Speed Sprinkler", score: 5, approximate: false, demand: 3, status: "Unstable", rarity: "Mythical" },
  { name: "Walnut", score: 5, approximate: false, demand: 2, status: "Stable", rarity: "Mythical" },
  { name: "Laser Plant", score: 4, approximate: false, demand: 3, status: "Stable", rarity: "Mythical" },
  { name: "Sunflower", score: 4, approximate: false, demand: 2, status: "Stable", rarity: "Mythical" },
  { name: "Peas in a Pod", score: 3, approximate: false, demand: 2, status: "Stable", rarity: "Mythical" },
  { name: "Repair Worker", score: 3, approximate: false, demand: 3, status: "Stable", rarity: "Mythical" },
  { name: "Watermelon", score: 3, approximate: false, demand: 2, status: "Stable", rarity: "Mythical" },
] as const;

export type TradeLine = { item: string; quantity: number };
export type TradeTotal = { score: number; approximate: boolean; complete: boolean; empty: boolean; avgDemand: number };
export type WflBand = "WIN" | "FAIR" | "LOSE" | null;

export function summarizeTrade(lines: TradeLine[]): TradeTotal {
  let score = 0;
  let approximate = false;
  let complete = true;
  let weightedDemand = 0;
  let totalQty = 0;
  for (const line of lines) {
    const item = tradeItems.find((entry) => entry.name === line.item);
    if (!item || !Number.isSafeInteger(line.quantity) || line.quantity < 1 || line.quantity > 9999) {
      complete = false;
      continue;
    }
    score += item.score * line.quantity;
    approximate ||= item.approximate;
    weightedDemand += item.demand * line.quantity;
    totalQty += line.quantity;
  }
  const avgDemand = totalQty > 0 ? Math.round((weightedDemand / totalQty) * 10) / 10 : 0;
  return { score, approximate, complete, empty: lines.length === 0, avgDemand };
}

export function compareTrades(you: TradeTotal, them: TradeTotal) {
  if (you.empty || them.empty) {
    return { difference: null, percentDiff: null, band: null as WflBand, message: "Add at least one item to each offer." };
  }
  if (!you.complete || !them.complete) {
    return { difference: null, percentDiff: null, band: null as WflBand, message: "A quantity or item is invalid. No complete comparison is available." };
  }
  const difference = them.score - you.score;
  const baseline = Math.max(you.score, 1);
  const percentDiff = Math.round((difference / baseline) * 1000) / 10;
  let band: WflBand = "FAIR";
  if (percentDiff > 10) band = "WIN";
  else if (percentDiff < -10) band = "LOSE";

  const message = you.approximate || them.approximate
    ? "Includes + values: this is a baseline comparison, not an exact trade value or a win/loss verdict."
    : "Comparison of the cited tracker scores only. Demand and actual offers may change the trade.";
  return { difference, percentDiff, band, message };
}
