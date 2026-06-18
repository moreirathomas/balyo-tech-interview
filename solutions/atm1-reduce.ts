import { Atm, Bill, Cash } from "../src/types";

const bills = [100, 50, 20, 10, 5] as const;

export function withdraw(atm: Atm, amount: number): Cash | null {
  const zero: Cash = {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
  };

  const [cash] = bills.reduce(
    ([cash, amount], bill) => {
      let rest = amount % bill;
      let toDispense = (amount - rest) / bill;

      if (atm.available[bill] < toDispense) {
        const max = maxAcquirable(atm, bill, amount);
        rest = amount - max;
        toDispense = (amount - rest) / bill;
      }

      cash[bill] = toDispense;

      return [cash, rest];
    },
    [zero, amount] as [Cash, number],
  );

  if (sum(cash) !== amount) {
    return null;
  }

  return cash;
}

export function maxAcquirable(atm: Atm, bill: Bill, amount: number): number {
  const remainder = amount % bill;
  return Math.min(atm.available[bill] * bill, amount - remainder);
}

export function sum(cash: Cash): number {
  let amount = 0;
  for (const bill of bills) {
    amount += bill * cash[bill];
  }
  return amount;
}
