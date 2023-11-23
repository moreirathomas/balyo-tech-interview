import { ATM, Bill, Cash, bills } from "../../atm/types";
import { sumAvailable, withdrawAsMuchInOrder } from "./atm1-while";

export function withdraw(
  atm: ATM,
  amount: number,
  preference?: Bill,
): Cash | null {
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

  const orderedBills = bills.toReversed();

  if (preference) {
    orderedBills.splice(orderedBills.indexOf(preference), 1);
    orderedBills.unshift(preference);
  }

  withdrawAsMuchInOrder(orderedBills)(atm, withdrawn, amount);

  return withdrawn;
}
