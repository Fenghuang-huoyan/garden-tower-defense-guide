import assert from 'node:assert/strict';
import { compareTrades, summarizeTrade } from '../lib/trade-values.ts';

const offer = (item, quantity) => summarizeTrade([{ item, quantity }]);
assert.equal(offer('Rafflesia', 3).score, 675);
assert.equal(offer('Blossom Barrage', 2).score, 23000);
assert.equal(offer('Blossom Barrage', 2).approximate, true);
assert.equal(compareTrades(offer('Rafflesia', 2), offer('Seed Mech', 1)).difference, 1550);
assert.equal(compareTrades(offer('Seed Mech', 1), offer('Rafflesia', 2)).difference, -1550);
assert.equal(compareTrades(offer('Rafflesia', 1), offer('Petalray', 1)).difference, 0);
for (const quantity of [0, -1, 1.5, NaN, Infinity, 10000]) {
  assert.equal(offer('Rafflesia', quantity).complete, false);
  assert.equal(compareTrades(offer('Rafflesia', quantity), offer('Seed Mech', 1)).difference, null);
}
assert.equal(compareTrades(offer('Unknown item', 1), offer('Seed Mech', 1)).difference, null);
assert.equal(compareTrades(summarizeTrade([]), offer('Seed Mech', 1)).difference, null);
assert.match(compareTrades(offer('Blossom Barrage', 1), offer('Seed Mech', 1)).message, /not an exact/);
console.log('Trade calculation checks passed: quantities, missing values, sign, ties, and approximate-value disclosure.');
