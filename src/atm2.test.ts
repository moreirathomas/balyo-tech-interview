import { describe, expect, test } from "bun:test";
import { withdraw } from "./atm2";
import { stubCash, stubEmptyAtm, stubFullAtm } from "./testutils";
import { Atm, Bill, Cash } from "./types";

describe("Prefer requested bills", () => {
  const atm = stubFullAtm();

  test.each<[number, Bill, Cash]>([
    // Base cases
    [100, 5, stubCash({ 5: 20 })],
    [100, 10, stubCash({ 10: 10 })],
    [100, 20, stubCash({ 20: 5 })],
    [100, 50, stubCash({ 50: 2 })],
    [100, 100, stubCash({ 100: 1 })],
    // Edge case: preference > amount => closest bill
    [5, 10, stubCash({ 5: 1 })],
    // amount%preference != 0 => preference + remainder (closest bill)
    [25, 10, stubCash({ 10: 2, 5: 1 })],
  ])("withdraw %i, prefer %i bills", (amount, preference, expected) => {
    const actual = withdraw(atm, amount, preference);
    expect(actual).toEqual(expected);
  });
});

describe("ATM not full, compose with smaller bills, respect preference", () => {
  test.each<[number, Bill, Atm, Cash]>([
    // Base cases
    [100, 5, stubFullAtm({ 5: 8 }), stubCash({ 5: 8, 10: 1, 50: 1 })],
    [100, 10, stubFullAtm({ 10: 0 }), stubCash({ 100: 1 })],
    [100, 20, stubFullAtm({ 20: 4 }), stubCash({ 20: 4, 10: 2 })],
    [100, 50, stubFullAtm({ 50: 1, 10: 0 }), stubCash({ 50: 1, 20: 2, 5: 2 })],
    [100, 100, stubEmptyAtm({ 5: 999 }), stubCash({ 5: 20 })],
    // Edge case: preference > amount => closest bill
    [5, 10, stubFullAtm(), stubCash({ 5: 1 })],
    // amount%preference != 0 => preference + remainder (closest bill)
    [25, 10, stubFullAtm(), stubCash({ 10: 2, 5: 1 })],
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
    [50, 10, stubEmptyAtm({ 20: 2 })],
    [100, 10, stubEmptyAtm({ 50: 1, 20: 1 })],
  ])("withdraw %i", (amount, preference, atm) => {
    const actual = withdraw(atm, amount, preference);
    expect(actual).toEqual(null);
  });
});
