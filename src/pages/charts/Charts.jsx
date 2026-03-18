import { useState, useEffect } from 'react';

import { useBudgets } from '@/hooks/budget.hooks.js';
import { useCategories } from '@/hooks/category.hooks.js';
import { useTransactions } from '@/hooks/transaction.hooks.js';

import ChartList from './ChartList.jsx';

function Charts() {

    const { categories } = useCategories();

    const { budgets } = useBudgets();
    const [filteredBudgets, setFilteredBudgets] = useState([]);

    const { transactions } = useTransactions();
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    // Set filtered transactions and budgets to have them all initially

    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    useEffect(() => {
        setFilteredBudgets(budgets);
    }, [budgets]);

    // FILTER TRANSACTIONS AND BUDGETS FROM FORM

    const filter = (e) => {
        const form = new FormData(e.target.form);
        const month = Number(form.get("month"));
        const year = Number(form.get("year"));

        setFilteredTransactions(
            transactions.filter(transaction => {
                const date = new Date(transaction.date);
                return (month === -1 || date.getMonth() === month) && (year === -1 || date.getFullYear() === year);
            }));

        setFilteredBudgets(
            budgets.filter(budget => {
                const date = new Date(budget.month);
                return (month === -1 || date.getMonth() === month) && (year === -1 || date.getFullYear() === year);
            }));
    }

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

            <ChartList transactions={filteredTransactions} categories={categories} budgets={filteredBudgets}></ChartList>
        </div>
    );
}

export default Charts