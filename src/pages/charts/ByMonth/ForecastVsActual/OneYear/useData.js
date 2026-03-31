import { useState, useEffect } from 'react';

import { dateToNumericMonthYear } from '@/utils/formatters'

export function useData(transactions, budgets, year) {
    const [data, setData] = useState([]);
    
        useEffect(() => {

            // 1) Define every month that we will need
            let months = [
                `${year}-01`,
                `${year}-02`,
                `${year}-03`,
                `${year}-04`,
                `${year}-05`,
                `${year}-06`,
                `${year}-07`,
                `${year}-08`,
                `${year}-09`,
                `${year}-10`,
                `${year}-11`,
                `${year}-12`
            ];

            // 2) Create the initial data object with colors
            let data = months.map((month) => ({
                    month: month,
                    forecast: 0,
                    actual: 0,
                    colorForecast: `#8884d8`,
                    colorActual: `#82ca9d`
                }));

            // 3) Go through budgets to set Forecast
            data = budgets
                .reduce((months, budget) => {
                    const month = months.find(item => item.month === dateToNumericMonthYear(budget.month));
    
                    if (month)
                        month.forecast += Number(budget.amount);
    
                    return months;
                }, data);
  
            // 4) Go through transactions to set Actual
            data = transactions
                .reduce((months, transaction) => {
                    const month = months.find(item => item.month === dateToNumericMonthYear(transaction.date));
    
                    if (month)
                        month.actual += Number(transaction.amount);
    
                    return months;
                }, data);

            // 5) Update data
            setData(data);
        }, [transactions, budgets]);

    return { data, setData }
}