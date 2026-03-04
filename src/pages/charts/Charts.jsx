import './styles/Charts.css'

import { useState, useEffect } from 'react';
import { fetchTransactions } from '../transactions/transaction.api.js';
import TransactionsByCategory from './TransactionsByCategory.jsx';
import ExpensesVsIncome from './ExpensesVsIncome.jsx';

function Charts() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions()
            .then(data => {
                setTransactions(data)
            })
    }, []);

    if (transactions.length === 0) return <p>Loading...</p>;

    return (
        <div id="main">
            <div className="chartList">
                <div className="chart">
                    <h2>Transactions by category</h2>
                    <TransactionsByCategory transactions={transactions}></TransactionsByCategory>
                </div>
                <div className="chart">
                    <h2>Expenses vs Income</h2>
                    <ExpensesVsIncome transactions={transactions}></ExpensesVsIncome>
                </div>
            </div>
        </div>
    );
}

export default Charts