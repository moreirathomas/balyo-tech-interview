const bills = [5, 10, 20, 50, 100] as const;

export type Bill = (typeof bills)[number];

export type Cash = {
  [bill in Bill]: number;
};

export type ATM = {
  available: Cash;
};
