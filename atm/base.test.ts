import { test, expect, describe } from "bun:test";
import { withdraw } from "./base";
import { ATM, Cash } from "./atm";
import { fullATM, cash, emptyATM } from "./test/stub";

describe("Base case, prefer higher bills", () => {
  const atm = fullATM();

  test.each<[number, Cash]>([
    [5, cash({ 5: 1 })],
    [10, cash({ 10: 1 })],
    [20, cash({ 20: 1 })],
    [25, cash({ 20: 1, 5: 1 })],
    [30, cash({ 20: 1, 10: 1 })],
    [35, cash({ 20: 1, 10: 1, 5: 1 })],
    [40, cash({ 20: 2 })],
    [45, cash({ 20: 2, 5: 1 })],
    [50, cash({ 50: 1 })],
    [55, cash({ 50: 1, 5: 1 })],
    [60, cash({ 50: 1, 10: 1 })],
    [65, cash({ 50: 1, 10: 1, 5: 1 })],
    [70, cash({ 50: 1, 20: 1 })],
    [75, cash({ 50: 1, 20: 1, 5: 1 })],
    [80, cash({ 50: 1, 20: 1, 10: 1 })],
    [85, cash({ 50: 1, 20: 1, 10: 1, 5: 1 })],
    [90, cash({ 50: 1, 20: 2 })],
    [95, cash({ 50: 1, 20: 2, 5: 1 })],
    [100, cash({ 100: 1 })],
    [105, cash({ 100: 1, 5: 1 })],
    [110, cash({ 100: 1, 10: 1 })],
    [115, cash({ 100: 1, 10: 1, 5: 1 })],
    [120, cash({ 100: 1, 20: 1 })],
    [125, cash({ 100: 1, 20: 1, 5: 1 })],
    [130, cash({ 100: 1, 20: 1, 10: 1 })],
    [135, cash({ 100: 1, 20: 1, 10: 1, 5: 1 })],
    [140, cash({ 100: 1, 20: 2 })],
    [145, cash({ 100: 1, 20: 2, 5: 1 })],
    [150, cash({ 100: 1, 50: 1 })],
    [155, cash({ 100: 1, 50: 1, 5: 1 })],
    [160, cash({ 100: 1, 50: 1, 10: 1 })],
    [165, cash({ 100: 1, 50: 1, 10: 1, 5: 1 })],
    [170, cash({ 100: 1, 50: 1, 20: 1 })],
    [175, cash({ 100: 1, 50: 1, 20: 1, 5: 1 })],
    [180, cash({ 100: 1, 50: 1, 20: 1, 10: 1 })],
    [185, cash({ 100: 1, 50: 1, 20: 1, 10: 1, 5: 1 })],
    [190, cash({ 100: 1, 50: 1, 20: 2 })],
    [195, cash({ 100: 1, 50: 1, 20: 2, 5: 1 })],
    [200, cash({ 100: 2 })],
  ])("withdraw %i", (amount, expected) => {
    const actual = withdraw(atm, amount);
    expect(actual).toEqual(expected);
  });
});

describe("ATM not full, compose with smaller bills", () => {
  test.each<[number, ATM, Cash]>([
    [50, fullATM({ 50: 0 }), cash({ 20: 2, 10: 1 })],
    [50, fullATM({ 50: 0, 20: 0 }), cash({ 10: 5 })],
    [100, fullATM({ 100: 0 }), cash({ 50: 2 })],
    [100, fullATM({ 100: 0, 50: 0, 20: 1 }), cash({ 20: 1, 10: 8 })],
  ])("withdraw %i", (amount, atm, expected) => {
    const actual = withdraw(atm, amount);
    expect(actual).toEqual(expected);
  });
});

describe("Not enough cash in ATM", () => {
  test.each<[number, ATM]>([
    [50, emptyATM({ 20: 2 })],
    [100, emptyATM({ 50: 1, 20: 1 })],
  ])("withdraw %i", (amount, atm) => {
    const actual = withdraw(atm, amount);
    expect(actual).toEqual(null);
  });
});
