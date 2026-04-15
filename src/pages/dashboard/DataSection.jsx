import styles from './styles/DataSection.module.css';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useCategories } from '@/hooks/categories/useCategories'

import { amountFormatter } from '@/utils/formatters';
import { totalExpensesAndIncome } from '@/utils/calculators';
import ExpensesVsIncomeBarOneYear from '@/charts/ByMonth/ExpensesVsIncome/OneYear/ExpensesVsIncome';
import ExpensesVsIncomeBarAllTime from '@/charts/ByMonth/ExpensesVsIncome/AllMonths/ExpensesVsIncome';

function DataSection({ transactions, type }) {
    const { t } = useTranslation();

    const [data, setData] = useState({ income: 0, expenses: 0 });

    const { data: categories = [] } = useCategories();

    useEffect(() => {
        if (!transactions)
            return;

        setData(totalExpensesAndIncome(transactions));

    }, [transactions]);

    return (
        <section className={styles.stats}>
            <h2 className={styles.title}>
                {type == 0 && t('dashboard.stats.allTime')}
                {type == 1 && t('dashboard.stats.thisYear')}
                {type == 2 && t('dashboard.stats.thisMonth')}
            </h2>
            <div className={styles.statRow}>
                <div className={styles.stat}>
                    <p className={styles.label}>{t('dashboard.stats.transactions')}</p>
                    <p className={styles.data}>{transactions.length}</p>
                </div>
                {
                    type == 0 && (
                        <div className={styles.stat}>
                            <p className={styles.label}>{t('dashboard.stats.categories')}</p>
                            <p className={styles.data}>{categories.length}</p>
                        </div>
                    )
                }
                <div className={styles.stat}>
                    <p className={styles.label}>{t('dashboard.stats.income')}</p>
                    <p className={styles.data}>{amountFormatter(data.income)}</p>
                </div>
                <div className={styles.stat}>
                    <p className={styles.label}>{t('dashboard.stats.expenses')}</p>
                    <p className={styles.data}>{amountFormatter(data.expenses)}</p>
                </div>
            </div>
            {type == 0 && <ExpensesVsIncomeBarAllTime transactions={transactions} year={2026} height={400} />}
            {type == 1 && <ExpensesVsIncomeBarOneYear transactions={transactions} year={2026} height={400} />}
        </section>
    );

}

export default DataSection