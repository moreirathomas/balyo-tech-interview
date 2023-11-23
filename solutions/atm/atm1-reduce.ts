import { ATM, Bill, bills, Cash } from "../../atm/types";

export function withdraw(atm: ATM, amount: number): Cash | null {
  const zero: Cash = {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
  };

  const [cash] = bills.toReversed().reduce(
    ([cash, amount], bill) => {
      let remainder = amount % bill;
      let count = (amount - remainder) / bill;

      if (atm.available[bill] < count) {
        const max = maxAcquirable(atm, bill, amount);
        remainder = amount - max;
        count = (amount - remainder) / bill;
      }

      cash[bill] = count;

      return [cash, remainder];
    },
    [zero, amount] as [Cash, number],
  );

  if (sum(cash) !== amount) {
    return null;
  }

  return cash;
}

export function maxAcquirable(atm: ATM, bill: Bill, amount: number): number {
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
