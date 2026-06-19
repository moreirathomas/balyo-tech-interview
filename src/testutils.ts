import { Atm, Cash } from "./types";

/**
 * Returns a stub `Cash` object.
 */
export function stubCash(v?: Partial<Cash>): Cash {
  return {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
    ...v,
  };
}

/**
 * Returns a stub `Atm` object with infinite cash available by default.
 * `v` overrides the default values for each `Bill` available in the ATM.
 */
export function stubFullAtm(v?: Partial<Cash>): Atm {
  return {
    available: {
      5: Infinity,
      10: Infinity,
      20: Infinity,
      50: Infinity,
      100: Infinity,
      ...v,
    },
  };
}

/**
 * Returns a stub `Atm` object with no cash available by default.
 * `v` overrides the default values for each `Bill` available in the ATM.
 */
export function stubEmptyAtm(v?: Partial<Cash>): Atm {
  return {
    available: { ...stubCash({}), ...v },
  };
}
