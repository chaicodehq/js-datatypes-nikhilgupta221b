/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  if (
    !Array.isArray(transactions) ||
    transactions.length === 0 ||
    transactions === null
  ) {
    return null;
  }

  const filteredTransactions = transactions.filter((trans) => {
    const transactionCategories = ["credit", "debit"];

    if (
      trans.amount <= 0 ||
      !transactionCategories.includes(trans.type.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  if (filteredTransactions.length === 0) {
    return null;
  }

  const totalCredit = filteredTransactions.reduce((acc, trans) => {
    if (trans.type === "credit") {
      acc += trans.amount;
    }
    return acc;
  }, 0);

  const totalDebit = filteredTransactions.reduce((acc, trans) => {
    if (trans.type === "debit") {
      acc += trans.amount;
    }
    return acc;
  }, 0);

  const netBalance = totalCredit - totalDebit;

  const transactionCount = filteredTransactions.length;

  const avgTransaction = Math.round(
    (totalCredit + totalDebit) / transactionCount,
  );

  const highestTransaction = [...filteredTransactions].sort(
    (aTran, bTrans) => bTrans.amount - aTran.amount,
  )[0];

  const categoryBreakdown = filteredTransactions.reduce((acc, trans) => {
    const categ = trans.category;

    if (Object.hasOwn(acc, categ)) {
      acc[categ] += trans.amount;
    } else {
      acc[categ] = trans.amount;
    }

    return acc;
  }, {});

  const frequentCountContact = filteredTransactions.reduce((acc, trans) => {
    const to = trans.to;

    if (Object.hasOwn(acc, to)) {
      acc[to] += 1;
    } else {
      acc[to] = 1;
    }
    return acc;
  }, {});

  const frequentContact = [...Object.entries(frequentCountContact)].sort(
    (aTo, bTo) => bTo[1] - aTo[1],
  )[0][0];

  const allAbove100 = filteredTransactions.every((trans) => trans.amount > 100);

  const hasLargeTransaction = filteredTransactions.some(
    (trans) => trans.amount >= 5000,
  );

  return {
    totalCredit: totalCredit,
    totalDebit: totalDebit,
    netBalance: netBalance,
    transactionCount: transactionCount,
    avgTransaction: avgTransaction,
    highestTransaction: highestTransaction,
    categoryBreakdown: categoryBreakdown,
    frequentContact: frequentContact,
    allAbove100: allAbove100,
    hasLargeTransaction: hasLargeTransaction,
  };
}
