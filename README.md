# balyo-tech-interview

Welcome to the Balyo Tech Interview repository!

## Installation

To install [Bun](https://bun.com) runtime, please follow the instructions on the
official website.

Alternatively, you can use `npx` to run Bun without installing it globally:

```bash
npx bun <command>
```

Following instructions assume you have Bun installed globally, adjust the
commands accordingly if you are using `npx`.

To install dependencies:

```bash
bun install
```

To run the tests for a specific exercise, use the following command:

```bash
bun test atm/atm1.test.ts # Exercise 1

bun test atm/atm2.test.ts # Exercise 2
```

Pass `--bail` flag to stop on first failure (useful for early debugging).

## Exercise 1

You must implement the function `withdraw` (found in
[`src/atm1.ts`](./src/atm1.ts)).

It should return the composition of bills (values and count) an ATM (cash
withdrawal machine) will dispense for a given amount.

The function must respect the following specifications:

- The ATM has the following bills: 100, 50, 20, 10, 5.
- The ATM always tries to dispense the minimum number of bills total (it always
  prefers higher bills).
- The ATM has an predefined amount of bills of each value.
- The ATM may not have the right amount of bills to fulfill the request, in
  which case it **should not** leave the user with a partial amount.

<details>

<summary>Hints</summary>

- You don't need to update the internal state of the ATM, as we won't look at it
  after a withdrawal.
- **But**, you need to ensure you don't dispense more of a given bill than the
  ATM has available for that bill (e.g. if the ATM has only 2 bills of 5, the
  result cannot have 3 bills of 5).

</details>

## Exercise 2

You must add new features to the `withdraw` function (found in
[`src/atm2.ts`](./src/atm2.ts)):

- The caller may ask for a preferred bill.
- The ATM will try to respect the preference, dispensing as much as possible of
  the preferred bill.
- If the ATM does not have enough bills to match the preference, it will dispense
  the remaining amount following the base specifications of exercise 1.
