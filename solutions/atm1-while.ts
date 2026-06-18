import { Atm, Cash } from "../src/types";

const bills = [100, 50, 20, 10, 5] as const;

export function sum(cash: Cash): number {
  let total = 0;

  for (const bill of bills) {
    total += cash[bill] * bill;
  }

  return total;
}

export function withdraw(atm: Atm, amount: number): Cash | null {
  if (sum(atm.available) < amount) {
    return null;
  }

  let withdrawn: Cash = {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
  };

  let leftToWithdraw = amount;

  for (const bill of bills) {
    while (leftToWithdraw >= bill && atm.available[bill] > 0) {
      atm.available[bill] -= 1;
      withdrawn[bill] += 1;
      leftToWithdraw -= bill;
    }
  }

  return withdrawn;
}
