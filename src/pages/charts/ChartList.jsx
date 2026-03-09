import './styles/ChartList.css';

import { useState, useEffect } from 'react';

import TotalByCategoryPie from './TotalByCategory/TotalByCategoryPie.jsx';
import TotalByCategoryBar from './TotalByCategory/TotalByCategoryBar.jsx';
import ExpensesVsIncomePie from './ExpensesVsIncome/ExpensesVsIncomePie.jsx';
import ExpensesVsIncomeBar from './ExpensesVsIncome/ExpensesVsIncomeBar.jsx';
import ForecastVsActual from './ForecastVsActual/ForecastVsActual.jsx';

function ChartList({ transactions, categories }) {

    // GROUP TRANSACTIONS BY CATEGORY

    const totalByCategory = transactions
        // Split into their corresponding category, by name
        .reduce((categories, transaction) => {
            // Manipulate data so that transactions with no category show as "Uncategorized"
            if (!transaction.category_name)
                transaction.category_name = "Uncategorized";

            // Finding a category by category name in array
            let existing = categories.find(item => item.name === transaction.category_name);

            // If category already existed in array, simply add to the category
            if (existing) {
                existing.value += Number(transaction.amount);
                return categories;
            }

            // Add the category as new
            categories.push({ name: transaction.category_name, value: Number(transaction.amount) });

            return categories;
        }, []);

    // CALCULATE INCOME AND EXPENSE SUMS
    const [incomeSum, setIncomeSum] = useState(0);
    const [expenseSum, setExpenseSum] = useState(0);

    useEffect(() => {
        const sums = transactions.reduce(((sums, transaction) => {
            if (transaction.is_income)
                sums[0] += Number(transaction.amount);
            else
                sums[1] += Number(transaction.amount);

            return sums;
        }
        ), [0, 0]);
        setIncomeSum(sums[0]);
        setExpenseSum(sums[1]);

    }, [transactions]);

    // FORECAST VS ACTUAL
    const categoriesArray = categories
        .map((category) => ({
            name: category.name,
            forecast: Number(category.goal),
            actual: 0
        }));

    const forecastVsActual = transactions
        // Split into their corresponding category, by name
        .reduce((categories, transaction) => {
            const category = categories.find(item => item.name === transaction.category_name);

            if (category)
                category.actual += Number(transaction.amount);

            return categories;
        }, categoriesArray);

    if (transactions.length === 0) return <p>Nothing to display.</p>;

    return (
        <div className="chartList">
            <div className="chart">
                <h2>Total by category</h2>
                <TotalByCategoryPie categories={totalByCategory}></TotalByCategoryPie>
            </div>
            <div className="chart">
                <h2>Total by category</h2>
                <TotalByCategoryBar categories={totalByCategory}></TotalByCategoryBar>
            </div>
            <div className="chart">
                <h2>Expenses vs Income</h2>
                <ExpensesVsIncomePie income={incomeSum} expense={expenseSum}></ExpensesVsIncomePie>
            </div>
            <div className="chart">
                <h2>Expenses vs Income</h2>
                <ExpensesVsIncomeBar income={incomeSum} expense={expenseSum}></ExpensesVsIncomeBar>
            </div>
            <div className="chart">
                <h2>Forecast vs Actual</h2>
                <ForecastVsActual categories={forecastVsActual}></ForecastVsActual>
            </div>
        </div>
    )
}

export default ChartList