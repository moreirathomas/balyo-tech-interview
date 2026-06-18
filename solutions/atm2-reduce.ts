import { Atm, Bill, Cash } from "../src/types";
import { withdraw as _withdraw, maxAcquirable, sum } from "./atm1-reduce";

export function withdraw(
  atm: Atm,
  amount: number,
  preference?: Bill,
): Cash | null {
  if (preference === undefined) {
    return _withdraw(atm, amount);
  }

  // Preferred bill is less than amount
  // This could be made impossible at the signature level
  if (amount < preference) {
    return _withdraw(atm, amount);
  }

  const zero: Cash = {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
  };

  let rest = amount % preference;
  let toDispense = (amount - rest) / preference;

  // Best case scenario
  if (rest === 0 && atm.available[preference] >= toDispense) {
    return {
      ...zero,
      [preference]: amount / preference,
    };
  }

  const dispensed = maxAcquirable(atm, preference, amount);
  rest = amount - dispensed;
  toDispense = (amount - rest) / preference;

  const atmInUse = {
    available: {
      ...atm.available,
      [preference]: atm.available[preference] - toDispense,
    },
  };

  const otherBills = _withdraw(atmInUse, rest);
  if (otherBills === null) {
    return null;
  }

  const cash = { ...otherBills, [preference]: toDispense };

  if (sum(cash) !== amount) {
    return null;
  }
  return cash;
}
