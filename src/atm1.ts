import { Atm } from "./types";

// TODO: Change the function signature. Returning `unknown` is not very helpful.
export function withdraw(atm: Atm, amount: number): unknown {
  // TODO: Implement the body of this function.
  // We're currently returning zero bill for whatever amount is requested,
  // which is obviously not what the user expects.
  return {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
  };
}
