# ATM kata

## Specification

Implement the function `withdraw` which returns the composition of bills (values and count) an ATM (cash withdrawal machine) will dispense for a given amount.

### Iteration 1

The function must respect the following specifications:

- The ATM has the following bills: 100, 50, 20, 10, 5.
- The ATM always tries to dispense the minimum number of bills for a given amount (it always prefers higher bills).
- The ATM has an predefined amount of bills of each value.
- The ATM must handle the case where there is not enough money to fulfill the request

We will not test the state of the ATM after a withdrawal, but the withdrawn bills must be consistent with the ATM supposed state (i.e. for a single call, a single bill cannot be dispensed twice. If the ATM has 2 bills of 5, the result cannot have 3 bills of 5).

### Iteration 2

Once the base specifications are done, we will add the following features:

- The caller may ask for a majority of a given bill.
- The ATM will try to respect the preference, dispensing as much as possible of the preferred bill.
- If the ATM does not have enough bills to match the preference, it will dispense the remaining amount following the base specifications.

## Test cases

Test cases are provided in `atm*.test.ts` files. You can run them with the following commands:

```bash
bun test ./atm1.test.ts # Iteration 1

bun test ./atm2.test.ts # Iteration 2
```

Pass `--bail` flag to stop on first failure (useful for early debugging).
