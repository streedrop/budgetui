import './styles/Charts.css'

import { useState, useEffect } from 'react';
import { fetchTransactions } from '../transactions/transaction.api.js';
import TransactionsByCategory from './TransactionsByCategory.jsx';
import ExpensesVsIncome from './ExpensesVsIncome.jsx';

function Charts() {

    const [transactions, setTransactions] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        fetchTransactions()
            .then(data => {
                setTransactions(data);
                setFiltered(data);
            })
    }, []);

    const filter = (e) => {
        const form = new FormData(e.target.form);
        const month = Number(form.get("month"));
        const year = Number(form.get("year"));

        setFiltered(
            transactions.filter(transaction => {
                const date = new Date(transaction.date);
                return (month === -1 || date.getMonth() === month) &&
                    (year === -1 || date.getFullYear() === year);
            }));
    }

    if (transactions.length === 0) return <p>Loading...</p>;

    return (
        <div id="main">
            <form>
                <label htmlFor="month">Month: </label>
                <select id="month" name="month" onChange={filter}>
                    <option value="-1">All Months</option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>
                <label htmlFor="year">Year: </label>
                <select id="year" name="year" onChange={filter}>
                    <option value="-1">All Years</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                </select>
            </form>
            <div className="chartList">
                <div className="chart">
                    <h2>Transactions by category</h2>
                    <TransactionsByCategory transactions={filtered}></TransactionsByCategory>
                </div>
                <div className="chart">
                    <h2>Expenses vs Income</h2>
                    <ExpensesVsIncome transactions={filtered}></ExpensesVsIncome>
                </div>
            </div>
        </div>
    );
}

export default Charts