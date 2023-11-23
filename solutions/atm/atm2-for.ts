import { ATM, Bill, Cash, bills } from "../../atm/types";

export function withdraw(
  atm: ATM,
  amount: number,
  preference?: Bill,
): Cash | null {
  let mutAmount = amount;

  const withdrawn = {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
  };

  const orderedBills = bills.toReversed();

  if (preference) {
    orderedBills.splice(orderedBills.indexOf(preference), 1);
    orderedBills.unshift(preference);
  }

  for (const bill of orderedBills) {
    if (mutAmount < bill) {
      continue;
    }
    const remainder = mutAmount % bill;
    const required = (mutAmount - remainder) / bill;
    // Leftover `remainder` will be "accumulated" over the loop into
    // what is not subtracted from `mutAmount`.
    const max = atm.available[bill];

    // Cannot withdraw more than available.
    const picked = Math.min(max, required);
    withdrawn[bill] = picked;
    mutAmount -= picked * bill;
  }

  if (mutAmount !== 0) {
    return null;
  }

  return withdrawn;
}
