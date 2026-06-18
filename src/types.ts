export type Bill = 5 | 10 | 20 | 50 | 100;

export type Cash = Record<Bill, number>;

export type Atm = {
  available: Cash;
};
