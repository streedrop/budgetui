import styles from './styles/DataSection.module.css';

import { useState, useEffect } from 'react';

import { amountFormatter } from '@/utils/formatters';
import { totalExpensesAndIncome } from '@/utils/calculators';
import ExpensesVsIncomeBarOneYear from '@/charts/ByMonth/ExpensesVsIncome/OneYear/ExpensesVsIncome';
import ExpensesVsIncomeBarAllTime from '@/charts/ByMonth/ExpensesVsIncome/AllMonths/ExpensesVsIncome';

function DataSection({ transactions, type }) {

    const [data, setData] = useState({ income: 0, expenses: 0 });

    useEffect(() => {
        if (!transactions)
            return;

        setData(totalExpensesAndIncome(transactions));

    }, [transactions]);

    return (
        <div className={styles.stats}>
            <h2 className={styles.title}>
                {type == 0 && "All Time"}
                {type == 1 && "This Year"}
                {type == 2 && "This Month"}
                </h2>
            <div className={styles.statRow}>
                <div className={styles.stat}>
                    <p className={styles.label}>Transactions</p>
                    <p className={styles.data}>{transactions.length}</p>
                </div>
                {
                    type == 0 && (
                        <div className={styles.stat}>
                            <p className={styles.label}>Categories</p>
                            <p className={styles.data}>{3}</p>
                        </div>
                    )
                }
                <div className={styles.stat}>
                    <p className={styles.label}>Total revenue</p>
                    <p className={styles.data}>{amountFormatter(data.income)}</p>
                </div>
                <div className={styles.stat}>
                    <p className={styles.label}>Total expenses</p>
                    <p className={styles.data}>{amountFormatter(data.expenses)}</p>
                </div>
            </div>
            <div className={styles.chart}>
                { type == 0 && <ExpensesVsIncomeBarAllTime transactions={transactions} year={2026} height={400} /> }
                { type == 1 && <ExpensesVsIncomeBarOneYear transactions={transactions} year={2026} height={400} /> }
            </div>
        </div>
    );

}

export default DataSection