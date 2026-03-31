import { useEffect, useState } from 'react';

export function useData(transactions) {
    const [data, setData] = useState([]);

    useEffect(() => {

        const sums = transactions.reduce(((sums, transaction) => {
            if (transaction.is_income)
                sums[0] += Number(transaction.amount);
            else
                sums[1] += Number(transaction.amount);

            return sums;
        }
        ), [0, 0]);

        setData(
            [
                { name: "Income", value: sums[0], fill: `hsl(180, 70%, 55%)` },
                { name: "Expenses", value: sums[1], fill: `hsl(0, 70%, 55%)` }
            ]
        );

    }, [transactions]);

    return { data, setData };
}