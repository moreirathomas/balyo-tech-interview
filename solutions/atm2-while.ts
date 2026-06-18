import { Atm, Bill, Cash } from "../src/types";
import { sum } from "./atm1-while";

const bills = [100, 50, 20, 10, 5] as const;

export function withdraw(
  atm: Atm,
  amount: number,
  preference?: Bill,
): Cash | null {
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

  const orderableBills = bills.slice();

  if (preference) {
    orderableBills.splice(orderableBills.indexOf(preference), 1);
    orderableBills.unshift(preference);
  }

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
