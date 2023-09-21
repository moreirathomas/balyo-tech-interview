import { ATM, Bill, Cash } from "./atm";

export function withdraw(
  atm: ATM,
  amount: number,
  preference?: Bill,
): Cash | Error {
  return {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
  };
}
