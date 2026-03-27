export const totalExpensesAndIncome = (transactions) => {
    const sums = transactions.reduce(((sums, transaction) => {
        if (transaction.is_income)
            sums[0] += Number(transaction.amount);
        else
            sums[1] += Number(transaction.amount);

        return sums;
    }
    ), [0, 0]);

    return { income: sums[0], expenses: sums[1] }
}