import { describe, expect, test } from "bun:test";
import { withdraw } from "./atm1";
import { stubCash, stubEmptyAtm, stubFullAtm } from "./testutils";
import { Atm, Cash } from "./types";

describe("Base case, prefer higher bills", () => {
  const atm = stubFullAtm();

  test.each<[number, Cash]>([
    [5, stubCash({ 5: 1 })],
    [10, stubCash({ 10: 1 })],
    [20, stubCash({ 20: 1 })],
    [25, stubCash({ 20: 1, 5: 1 })],
    [30, stubCash({ 20: 1, 10: 1 })],
    [35, stubCash({ 20: 1, 10: 1, 5: 1 })],
    [40, stubCash({ 20: 2 })],
    [45, stubCash({ 20: 2, 5: 1 })],
    [50, stubCash({ 50: 1 })],
    [55, stubCash({ 50: 1, 5: 1 })],
    [60, stubCash({ 50: 1, 10: 1 })],
    [65, stubCash({ 50: 1, 10: 1, 5: 1 })],
    [70, stubCash({ 50: 1, 20: 1 })],
    [75, stubCash({ 50: 1, 20: 1, 5: 1 })],
    [80, stubCash({ 50: 1, 20: 1, 10: 1 })],
    [85, stubCash({ 50: 1, 20: 1, 10: 1, 5: 1 })],
    [90, stubCash({ 50: 1, 20: 2 })],
    [95, stubCash({ 50: 1, 20: 2, 5: 1 })],
    [100, stubCash({ 100: 1 })],
    [105, stubCash({ 100: 1, 5: 1 })],
    [110, stubCash({ 100: 1, 10: 1 })],
    [115, stubCash({ 100: 1, 10: 1, 5: 1 })],
    [120, stubCash({ 100: 1, 20: 1 })],
    [125, stubCash({ 100: 1, 20: 1, 5: 1 })],
    [130, stubCash({ 100: 1, 20: 1, 10: 1 })],
    [135, stubCash({ 100: 1, 20: 1, 10: 1, 5: 1 })],
    [140, stubCash({ 100: 1, 20: 2 })],
    [145, stubCash({ 100: 1, 20: 2, 5: 1 })],
    [150, stubCash({ 100: 1, 50: 1 })],
    [155, stubCash({ 100: 1, 50: 1, 5: 1 })],
    [160, stubCash({ 100: 1, 50: 1, 10: 1 })],
    [165, stubCash({ 100: 1, 50: 1, 10: 1, 5: 1 })],
    [170, stubCash({ 100: 1, 50: 1, 20: 1 })],
    [175, stubCash({ 100: 1, 50: 1, 20: 1, 5: 1 })],
    [180, stubCash({ 100: 1, 50: 1, 20: 1, 10: 1 })],
    [185, stubCash({ 100: 1, 50: 1, 20: 1, 10: 1, 5: 1 })],
    [190, stubCash({ 100: 1, 50: 1, 20: 2 })],
    [195, stubCash({ 100: 1, 50: 1, 20: 2, 5: 1 })],
    [200, stubCash({ 100: 2 })],
  ])("withdraw %i", (amount, expected) => {
    const actual = withdraw(atm, amount);
    expect(actual).toEqual(expected);
  });
});

describe("ATM not full, compose with smaller bills", () => {
  test.each<[number, Atm, Cash]>([
    [50, stubFullAtm({ 50: 0 }), stubCash({ 20: 2, 10: 1 })],
    [50, stubFullAtm({ 50: 0, 20: 0 }), stubCash({ 10: 5 })],
    [100, stubFullAtm({ 100: 0 }), stubCash({ 50: 2 })],
    [100, stubFullAtm({ 100: 0, 50: 0, 20: 1 }), stubCash({ 20: 1, 10: 8 })],
  ])("withdraw %i", (amount, atm, expected) => {
    const actual = withdraw(atm, amount);
    expect(actual).toEqual(expected);
  });
});

describe("Not enough cash in ATM", () => {
  test.each<[number, Atm]>([
    [50, stubEmptyAtm({ 20: 2 })],
    [100, stubEmptyAtm({ 50: 1, 20: 1 })],
  ])("withdraw %i", (amount, atm) => {
    const actual = withdraw(atm, amount);
    expect(actual).toEqual(null);
  });
});
