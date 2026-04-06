import { useEffect, useState } from 'react';

import { dateToNumericMonthYear } from '@/utils/formatters';
import { allMonthsFromYear } from '@/utils/dateString';

export function useData(transactions, year) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // 1) Define every month that we will need
        const months = allMonthsFromYear(year);

        // 2) Create the initial data object with colors
        let data = months.map((month) => ({
            month: month,
            income: 0,
            expenses: 0,
            colorIncome: `hsl(180, 70%, 55%)`,
            colorExpenses: `hsl(0, 70%, 55%)`
        }));

        // 4) Go through transactions to set Income/expenses
        data = transactions.reduce(((months, transaction) => {
            const month = months.find(item => item.month === dateToNumericMonthYear(transaction.date));

            if (month) {
                if (transaction.is_income)
                    month.income += Number(transaction.amount);
                else
                    month.expenses += Number(transaction.amount);
            }

            return months;

        }
        ), data);

        // 5) Update data
        setData(data);

    }, [transactions]);

    return { data, setData };
}