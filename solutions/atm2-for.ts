import { Atm, Bill, Cash } from "../src/types";

const bills = [100, 50, 20, 10, 5] as const;

export function withdraw(
  atm: Atm,
  amount: number,
  preference?: Bill,
): Cash | null {
  let left = amount;

  const withdrawn = {
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

  for (const bill of orderableBills) {
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

  if (left !== 0) {
    return null;
  }

  return withdrawn;
}
