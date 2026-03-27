import styles from './Dashboard.module.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTransactions } from '@/hooks/rq/useTransactions.js';
import { useCategories } from '@/hooks/useCategories.js';

import { amountFormatter } from '@/utils/formatters';
import { totalExpensesAndIncome } from '@/utils/calculators';
import { transactionsFromThisMonth } from '@/utils/filters';

function Home() {
  const { data: transactions = null, isLoading, error } = useTransactions();
  const { categories, setCategories } = useCategories();

  // CALCULATE INCOME AND EXPENSE SUMS
  const [allTime, setAllTime] = useState({ income: 0, expenses: 0 });
  const [thisMonth, setThisMonth] = useState({ income: 0, expenses: 0 });

  // For every transaction, add to income if income, add to expenses if expense
  useEffect(() => {
    if (!transactions)
      return;

    setAllTime(totalExpensesAndIncome(transactions));
    setThisMonth(totalExpensesAndIncome(transactionsFromThisMonth(transactions)));

  }, [transactions]);

  if (!transactions)
    return;

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome! We missed you.</p>
      <section className={styles.stats}>
        <div>
          <h2>All Time</h2>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <p className={styles.label}>Transactions</p>
              <p className={styles.data}>{transactions.length}</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.label}>Categories</p>
              <p className={styles.data}>{categories.length}</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.label}>Total revenue</p>
              <p className={styles.data}>{amountFormatter(allTime.income)}</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.label}>Total expenses</p>
              <p className={styles.data}>{amountFormatter(allTime.expenses)}</p>
            </div>
          </div>
        </div>

        <div>
          <h2>This Month</h2>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <p className={styles.label}>Transactions</p>
              <p className={styles.data}>{transactionsFromThisMonth(transactions).length}</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.label}>Categories</p>
              <p className={styles.data}>{categories.length}</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.label}>Total revenue</p>
              <p className={styles.data}>{amountFormatter(thisMonth.income)}</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.label}>Total expenses</p>
              <p className={styles.data}>{amountFormatter(thisMonth.expenses)}</p>
            </div>
          </div>
        </div>

      </section>
      <section>
        <h2>Budgeting App</h2>
        <div className={styles.pages}>
          <Link className={styles.page} to="/transactions">
            <i className="fa-solid fa-list"></i>
            <h2>Transactions</h2>
            <p>Add your data.</p>
          </Link>
          <Link className={styles.page} to="/categories">
            <i className="fa-regular fa-folder"></i>
            <h2>Categories</h2>
            <p>Organize your data.</p>
          </Link>
          <Link className={styles.page} to="/charts">
            <i className="fa-regular fa-chart-bar"></i>
            <h2>Charts</h2>
            <p>See your data.</p>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
