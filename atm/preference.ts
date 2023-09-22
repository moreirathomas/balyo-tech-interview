import { ATM, Bill, Cash } from "./atm";
import { getEmptyWallet, isExistingBill, sumBills } from "./base";
import { withdraw as widthdrawBase } from "./base";

export function withdraw(
  atm: ATM,
  amount: number,
  preference?: Bill,
): Cash | null {
  // no user preference, use base function defined before
  if (preference === undefined) {
    const wallet = widthdrawBase(atm, amount);
    if (wallet === null) {
      return getEmptyWallet();
    }

    return wallet;
  }

  const availableBills = atm.available;
  const wallet = getEmptyWallet();
  let moneyInWallet = 0;

  while (
    amount < moneyInWallet &&
    availableBills[preference] > 0 &&
    preference <= amount - moneyInWallet
  ) {
    wallet[preference]++;
    availableBills[preference]--;
    moneyInWallet += preference;
  }

  if (moneyInWallet < amount) {
    const baseWallet = widthdrawBase(atm, amount - moneyInWallet);
    if (baseWallet === null) {
      return baseWallet;
    }

    const billsInt = Object.keys(baseWallet).map((bill) => parseInt(bill, 10));
    const bills = billsInt.filter(isExistingBill);
    if (bills.length !== billsInt.length) {
      throw new Error(`Invalid bills ${bills}`);
    }

    for (const bill of bills) {
      wallet[bill] += baseWallet[bill];
      moneyInWallet += bill * baseWallet[bill];
    }
  }

  if (moneyInWallet !== amount) {
    console.log(`sumWallet ${moneyInWallet} !== amount ${amount}`);

    return null;

    // throw new Error("Not enough cash in atom");
  }

  return wallet;
}
