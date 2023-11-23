import { ATM, Bill, Cash } from "../../atm/types";
import { withdraw as _withdraw, maxAcquirable, sum } from "./atm1-reduce";

export function withdraw(
  atm: ATM,
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

  let remainder = amount % preference;
  let count = (amount - remainder) / preference;

  // Best case scenario
  if (remainder === 0 && atm.available[preference] >= count) {
    return {
      ...zero,
      [preference]: amount / preference,
    };
  }

  const max = maxAcquirable(atm, preference, amount);
  remainder = amount - max;
  count = (amount - remainder) / preference;

  const atmInUse = {
    available: {
      ...atm.available,
      [preference]: atm.available[preference] - count,
    },
  };

  const otherBills = _withdraw(atmInUse, remainder);
  if (otherBills === null) {
    return null;
  }

  const cash = { ...otherBills, [preference]: count };

  if (sum(cash) !== amount) {
    return null;
  }
  return cash;
}
