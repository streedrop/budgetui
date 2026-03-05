import './styles/ChartList.css';

import { useState, useEffect } from 'react';

import TransactionsByCategory from './TotalByCategory/TransactionsByCategoryPie.jsx';
import ExpensesVsIncomePie from './ExpensesVsIncome/ExpensesVsIncomePie.jsx';
import ExpensesVsIncomeBar from './ExpensesVsIncome/ExpensesVsIncomeBar.jsx';

function ChartList({ transactions }) {

    // GROUP TRANSACTIONS BY CATEGORY

    const categories = transactions
        // Split into their corresponding category, by name
        .reduce((categories, transaction) => {
            const existing = categories.find(item => item.name === transaction.category_name);

            if (existing)
                existing.value += Number(transaction.amount);
            else
                categories.push({ name: transaction.category_name, value: Number(transaction.amount) });

            return categories;
        }, [transactions]);

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

    if (transactions.length === 0) return <p>Nothing to display.</p>;

    return (
        <div className="chartList">
            <div className="chart">
                <h2>Transactions by category</h2>
                <TransactionsByCategory categories={categories}></TransactionsByCategory>
            </div>
            <div className="chart">
                <h2>Expenses vs Income</h2>
                <ExpensesVsIncomePie income={incomeSum} expense={expenseSum}></ExpensesVsIncomePie>
            </div>
            <div className="chart">
                <h2>Expenses vs Income</h2>
                <ExpensesVsIncomeBar income={incomeSum} expense={expenseSum}></ExpensesVsIncomeBar>
            </div>
        </div>
    )
}

export default ChartList