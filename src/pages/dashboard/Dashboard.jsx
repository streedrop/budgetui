import styles from './styles/Dashboard.module.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useTransactions } from '@/hooks/transactions/useTransactions.js';

import { transactionsFromThisMonth, transactionsFromThisYear } from '@/utils/filters';

import DataSection from './DataSection';

function Home() {
  const { t } = useTranslation();

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
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.description')}</p>
      <section className={styles.stats}>
        <DataSection transactions={transactions} type={0} />
        <DataSection transactions={yearToDate} type={1} />
        <DataSection transactions={thisMonth} type={2} />
      </section>
      <section>
        <h2>{t('dashboard.navigate.title')}</h2>
        <div className={styles.pages}>
          <Link className={styles.page} to="/transactions">
            <i className="fa-solid fa-list"></i>
            <h2>{t('dashboard.navigate.transactions.title')}</h2>
            <p>{t('dashboard.navigate.transactions.description')}</p>
          </Link>
          <Link className={styles.page} to="/categories">
            <i className="fa-regular fa-folder"></i>
            <h2>{t('dashboard.navigate.categories.title')}</h2>
            <p>{t('dashboard.navigate.categories.description')}</p>
          </Link>
          <Link className={styles.page} to="/charts">
            <i className="fa-regular fa-chart-bar"></i>
            <h2>{t('dashboard.navigate.charts.title')}</h2>
            <p>{t('dashboard.navigate.charts.description')}</p>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
