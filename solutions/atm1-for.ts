import { Atm, Cash } from "../src/types";

const bills = [100, 50, 20, 10, 5] as const;

export function withdraw(atm: Atm, amount: number): Cash | null {
  let left = amount;
  const withdrawn = {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
  };

  for (const bill of bills) {
    if (left < bill) {
      continue;
    }
    const rest = left % bill;
    const toDispense = (left - rest) / bill;
    const max = atm.available[bill];

    // Cannot withdraw more than available.
    const dispensed = Math.min(max, toDispense);
    withdrawn[bill] = dispensed;
    left -= dispensed * bill;
  }

  // Or check upfront by testing amount >= sum(atm.available).
  if (left !== 0) {
    return null;
  }

  return withdrawn;
}
