import { ATM, Bill, Cash, bills } from "../../atm/types";

export function sumAvailable(atm: ATM): number {
  let total = 0;

  for (const bill of bills) {
    total += atm.available[bill] * bill;
  }

  return total;
}

export function withdraw(atm: ATM, amount: number): Cash | null {
  if (sumAvailable(atm) < amount) {
    return null;
  }

  let withdrawn: Cash = {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
  };

  withdrawAsMuchInOrder(bills.toReversed())(atm, withdrawn, amount);

  return withdrawn;
}

export function withdrawAsMuchInOrder(bills: Bill[]) {
  return function (atm: ATM, withdrawn: Cash, amount: number): void {
    let mutAmount = amount;
    for (const bill of bills) {
      while (mutAmount >= bill && atm.available[bill] > 0) {
        atm.available[bill] -= 1;
        withdrawn[bill] += 1;
        mutAmount -= bill;
      }
    }
  };
}
