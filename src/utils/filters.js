export const transactionsFromThisMonth = (transactions) => {
    const date = new Date();

    return transactions
        .filter(t => t.date <= `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`)
        .filter(t => t.date >= `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()}`);
}