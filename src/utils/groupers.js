import { dateToMonth, dateToMonthYear, dateToYear } from './formatters';

export const groupTransactionsByMonth = (transactions) => {
    return transactions.reduce((acc, transaction) => {
        const monthKey = dateToMonthYear(transaction.date);

        // First item of the month = create new sum total and array of items
        if (!acc[monthKey])
            acc[monthKey] = {
                sum: 0,
                transactions: []
            };

        if (transaction.is_income == true)
            acc[monthKey].sum += Number(transaction.amount);
        else
            acc[monthKey].sum -= Number(transaction.amount);

        acc[monthKey].transactions.push(transaction);

        return acc;
    }, {});
}

export const groupBudgetsByYear = (budgets) => {
    /* grouped will be an array as such: 
        [
            ["2025", [{goal1}, {goal2}, ...]],
            ["2026", [{goal1}, {goal2}, ...]],
            ...
        ]
    */
    const grouped = Object.entries(budgets.reduce((acc, budget) => {
        const year = dateToYear(budget.month);

        // First item of the month = create new sum total and array of items
        if (!acc[year])
            acc[year] = [];

        acc[year].push(budget);

        return acc;
    }, {}));

        /* normalized will be an array as such: 
        [
            ["2025", [{goal1}, {goal2}, ..., {goal12}]],
            ["2026", [{goal1}, {goal2}, ..., {goal12}]],
            ...
        ]
    */
    const normalized = grouped.map(([year, budgets]) => {
        const months = Array.from({ length: 12 }, (_, i) => {
            const month = `${year}-${String(i + 1).padStart(2, '0')}`;
            const budget = budgets.find(budget => budget.month.startsWith(month));
            return budget ? {month: budget.month, amount: budget.amount} : { month, amount: null };
        });
        return [year, months];
    });

    // Reverse the array to get the most recent year first
    return normalized.reverse();
} 