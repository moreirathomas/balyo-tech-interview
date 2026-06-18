import { describe, expect, test } from "bun:test";
import { withdraw } from "./atm2";
import { cash, emptyAtm, fullAtm } from "./testutils";
import { Atm, Bill, Cash } from "./types";

describe("Prefer requested bills", () => {
  const atm = fullAtm();

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
  test.each<[number, Bill, Atm, Cash]>([
    // Base cases
    [100, 5, fullAtm({ 5: 8 }), cash({ 5: 8, 10: 1, 50: 1 })],
    [100, 10, fullAtm({ 10: 0 }), cash({ 100: 1 })],
    [100, 20, fullAtm({ 20: 4 }), cash({ 20: 4, 10: 2 })],
    [100, 50, fullAtm({ 50: 1, 10: 0 }), cash({ 50: 1, 20: 2, 5: 2 })],
    [100, 100, emptyAtm({ 5: 999 }), cash({ 5: 20 })],
    // Edge case: preference > amount => closest bill
    [5, 10, fullAtm(), cash({ 5: 1 })],
    // amount%preference != 0 => preference + remainder (closest bill)
    [25, 10, fullAtm(), cash({ 10: 2, 5: 1 })],
  ])(
    "withdraw %i, preference %i bills until not available",
    (amount, preference, atm, expected) => {
      const actual = withdraw(atm, amount, preference);
      expect(actual).toEqual(expected);
    },
  );
});

describe("Not enough cash in ATM", () => {
  test.each<[number, Bill, Atm]>([
    [50, 10, emptyAtm({ 20: 2 })],
    [100, 10, emptyAtm({ 50: 1, 20: 1 })],
  ])("withdraw %i", (amount, preference, atm) => {
    const actual = withdraw(atm, amount, preference);
    expect(actual).toEqual(null);
  });
});
