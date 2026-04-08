import styles from './styles/Dashboard.module.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTransactions } from '@/hooks/transactions/useTransactions.js';

import { transactionsFromThisMonth, transactionsFromThisYear } from '@/utils/filters';

import DataSection from './DataSection';

function Home() {
  const { data: transactions = null, isLoading, error } = useTransactions();

  const [thisMonth, setThisMonth] = useState([]);
  const [yearToDate, setYearToDate] = useState([]);

  useEffect(() => {
    if (!transactions)
      return;

    setThisMonth(transactionsFromThisMonth(transactions));
    setYearToDate(transactionsFromThisYear(transactions));

  }, [transactions]);

  if (!transactions)
    return;

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome! We missed you.</p>
      <section className={styles.stats}>
        <DataSection transactions={transactions} type={0} />
        <DataSection transactions={yearToDate} type={1} />
        <DataSection transactions={thisMonth} type={2} />
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
