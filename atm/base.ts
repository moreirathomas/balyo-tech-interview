import { ATM, Bill, Cash, bills } from "./atm";

/**
 * Type guard to check whether a bill number is valid
 * @param value the bill number to check
 * @returns whether the bill number is valid
 */
export function isExistingBill(value: number): value is Bill {
  return bills.includes(value as Bill);
}

/**
 * Compute the sum of the bills
 * @param bills the bills to sum
 * @returns the sum
 */
export function sumBills(bills: Cash): number {
  let sum = 0;
  const valuesInNb = Object.keys(bills).map((bill) => parseInt(bill, 10));
  const values: Bill[] = valuesInNb.filter(isExistingBill);

  if (values.length !== valuesInNb.length) {
    const invalidBill = valuesInNb.find((value) => !isExistingBill(value));
    throw new Error(`Invalid bill ${invalidBill}`);
  }

  values.forEach((value) => {
    if (value in bills) {
      sum += bills[value] * value;
    }
    sum += bills[value] * value;
  });

  return sum;
}

/**
 * Initializes an empty wallet
 * @returns the empty wallet
 */
export function getEmptyWallet(): Cash {
  return {
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
  };
}

/**
 * Compute the largest available bill under a given amount
 * @param atm the atm to check
 * @param amount the maximum amount
 * @returns the largest available bill under the given amount
 */
function getLargestBillUnderAmount(atm: ATM, amount: number) {
  const availableBills = atm.available;
  let largestBillUnderAmount: Bill | null = null;
  for (const billStr in availableBills) {
    let bill = parseInt(billStr, 10);
    if (!isExistingBill(bill)) throw new Error(`Invalid bill ${bill}`);

    const nbAvailableBillsOfThisValue = availableBills[bill];
    const isThereRemainingBillsOfThisValue =
      nbAvailableBillsOfThisValue !== undefined &&
      nbAvailableBillsOfThisValue > 0;
    const isBillUnderAmount = bill <= amount;
    const isBillLargerThanCurrentLargestBill =
      largestBillUnderAmount === null || bill > largestBillUnderAmount;
    if (
      isBillLargerThanCurrentLargestBill &&
      isThereRemainingBillsOfThisValue &&
      isBillUnderAmount
    ) {
      largestBillUnderAmount = bill;
    }
  }
  return largestBillUnderAmount;
}

/**
 * The main function of the ATM
 * @param atm the atm
 * @param amount the amount the user wants to withdraw
 * @returns the set of bills the user will receive
 */
export function withdraw(atm: ATM, amount: number): Cash | null {
  const availableBills = atm.available;

  const wallet = getEmptyWallet();

  let moneyInWallet = 0;
  while (moneyInWallet < amount) {
    const largestAvailableBill = getLargestBillUnderAmount(
      atm,
      amount - moneyInWallet,
    );
    if (largestAvailableBill === null) {
      console.error("Not enough money in ATM"); // we don't throw because it is better to serve some money than nothing

      // throw new Error("Not enough money in ATM");

      // return wallet;

      return null;
    }

    moneyInWallet += largestAvailableBill;

    // we transfer the bill from the atm to the atm
    wallet[largestAvailableBill]++;
    availableBills[largestAvailableBill]--;
  }

  return wallet;
}
