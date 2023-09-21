import { test, expect, describe } from "bun:test";
import { withdraw } from "./preference";
import { ATM, Bill, Cash } from "./atm";
import { cash, emptyATM, fullATM } from "./test/stub";

describe("Prefer given bills", () => {
  const atm = fullATM();

  test.each<[number, Bill, Cash]>([
    // Base cases
    [100, 5, cash({ 5: 20 })],
    [100, 10, cash({ 10: 10 })],
    [100, 20, cash({ 20: 5 })],
    [100, 50, cash({ 50: 2 })],
    [100, 100, cash({ 100: 1 })],
    // Edge case: preference > amount => closest bill
    [5, 10, cash({ 5: 1 })],
    // amount%preference != 0 => preference + remainder (closest bill)
    [25, 10, cash({ 10: 2, 5: 1 })],
  ])("withdraw %i, prefer %i bills", (amount, preference, expected) => {
    const actual = withdraw(atm, amount, preference);
    expect(actual).toEqual(expected);
  });
});

describe("ATM not full, compose with smaller bills, respect preference", () => {
  test.each<[number, Bill, ATM, Cash]>([
    // Base cases
    [100, 5, fullATM({ 5: 8 }), cash({ 5: 8, 10: 1, 50: 1 })],
    [100, 10, fullATM({ 10: 0 }), cash({ 100: 1 })],
    [100, 20, fullATM({ 20: 4 }), cash({ 20: 4, 10: 2 })],
    [100, 50, fullATM({ 50: 1, 10: 0 }), cash({ 50: 1, 20: 2, 5: 2 })],
    [100, 100, emptyATM({ 5: 999 }), cash({ 5: 20 })],
    // Edge case: preference > amount => closest bill
    [5, 10, fullATM(), cash({ 5: 1 })],
    // amount%preference != 0 => preference + remainder (closest bill)
    [25, 10, fullATM(), cash({ 10: 2, 5: 1 })],
  ])(
    "withdraw %i, preference %i bills until not available",
    (amount, preference, atm, expected) => {
      const actual = withdraw(atm, amount, preference);
      expect(actual).toEqual(expected);
    },
  );
});

describe("Not enough cash in ATM", () => {
  test.each<[number, Bill, ATM]>([
    [50, 10, emptyATM({ 20: 2 })],
    [100, 10, emptyATM({ 50: 1, 20: 1 })],
  ])("withdraw %i", (amount, preference, atm) => {
    const actual = withdraw(atm, amount, preference);
    expect(actual).toEqual(null);
  });
});
