import { ATM, Cash } from "../atm";

export const cash = (v?: Partial<Cash>): Cash => ({
  5: 0,
  10: 0,
  20: 0,
  50: 0,
  100: 0,
  ...v,
});

export const fullATM = (v?: Partial<Cash>): ATM => ({
  available: {
    5: Infinity,
    10: Infinity,
    20: Infinity,
    50: Infinity,
    100: Infinity,
    ...v,
  },
});

export const emptyATM = (v?: Partial<Cash>): ATM => ({
  available: { ...cash({}), ...v },
});
