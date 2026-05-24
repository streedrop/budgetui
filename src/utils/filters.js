export const transactionsFromThisMonth = (transactions) => {
    const date = new Date();

    return transactions
        .filter(t => t.date <= `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`)
        .filter(t => t.date >= `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()}`);
}

export const transactionsFromThisYear = (transactions) => {
    const date = new Date();

    return transactions
        .filter(t => t.date <= `${date.getFullYear() + 1}-01-01`)
        .filter(t => t.date >= `${date.getFullYear()}-01-01`);
}

export const monthsThatHaveTransactions = (transactions) => {
    return [...new Set(transactions.map(t => t.date.slice(0, 7)))];
}

export const yearsThatHaveTransactions = (transactions) => {
    return [...new Set(transactions.map(t => t.date.slice(0, 4)))];
}