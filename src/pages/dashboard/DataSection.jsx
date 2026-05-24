import styles from './styles/DataSection.module.css';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useCategories } from '@/hooks/categories/useCategories';
import { useTransactionFilters } from '@/hooks/useTransactionFilters.js';

import { amountFormatter, dateToMonthYear, capitalize } from '@/utils/formatters';
import { totalExpensesAndIncome } from '@/utils/calculators';
import { monthsThatHaveTransactions, yearsThatHaveTransactions } from '@/utils/filters';

import TotalByCategoryPie from '@/charts/ByCategory/TotalByCategory/TotalByCategoryPie';
import ExpensesVsIncomeBarOneYear from '@/charts/ByMonth/ExpensesVsIncome/OneYear/ExpensesVsIncome';
import ExpensesVsIncomeBarAllTime from '@/charts/ByMonth/ExpensesVsIncome/AllMonths/ExpensesVsIncome';

function DataSection({ transactions, type }) {
    const { t } = useTranslation();

    const { filtered, filters, setFilters } = useTransactionFilters(transactions);

    const [data, setData] = useState({ income: 0, expenses: 0 });

    const years = yearsThatHaveTransactions(transactions);
    const months = monthsThatHaveTransactions(transactions);

    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const { data: categories = [] } = useCategories();

    useEffect(() => {
        if (!transactions)
            return;

        // Return if selectedYear or selectedMonth already had values
        if (selectedYear || selectedMonth) return;
        setSelectedYear(0);
        setSelectedMonth(0);

    }, [transactions]);

    // Called when we need to apply new filters for year
    useEffect(() => {
        // Return if the data section is not meant to display years
        if (selectedYear == null || years.length == 0 || type != 1) return;

        // First day of the year
        const from = `${years[selectedYear]}-01-01`;
        // Last day of the year
        const to = `${years[selectedYear]}-12-31`;

        setFilters(prev => ({ ...prev, from: from, to: to }));
    }, [selectedYear]);

    // Called when we need to apply new filters for month
    useEffect(() => {
        // Return if selectedMonth is still null or if the data section is not meant to display months
        if (selectedMonth == null || months.length == 0 ||type != 2) return;

        // First day of the month
        const from = `${months[selectedMonth]}-01`;
        // Last day of the month
        const to = `${months[selectedMonth]}-${new Date(months[selectedMonth].slice(0, 4), Number(months[selectedMonth].slice(5, 7)), 0).getDate()}`;

        setFilters(prev => ({ ...prev, from: from, to: to }));
    }, [selectedMonth]);

    useEffect(() => {
        if(!filtered) return;
        setData(totalExpensesAndIncome(filtered));
    }, [filtered]);

    return (
        <section className={styles.stats}>
            <h2 className={styles.title}>
                                {type == 0 &&
                  t('dashboard.stats.allTime')
                }
                {type == 1 &&
                            <>
                                <i className={`fa-solid fa-chevron-left ${selectedYear == years.length - 1 ? styles.disabled : ''}`} onClick={() => selectedYear != years.length - 1 ? setSelectedYear(selectedYear + 1) : undefined } />
                                {t('dashboard.stats.year', { year: years[selectedYear] })}
                                <i className={`fa-solid fa-chevron-right ${selectedYear == 0 ? styles.disabled : ''}`} onClick={() => selectedYear != 0 ? setSelectedYear(selectedYear - 1) : undefined } />
                            </>
                }
                {type == 2 &&
                            <>
                                <i className={`fa-solid fa-chevron-left ${selectedMonth == months.length - 1 ? styles.disabled : ''}`} onClick={() => selectedMonth != months.length - 1 ? setSelectedMonth(selectedMonth + 1) : undefined } />
                                { capitalize(dateToMonthYear(months[selectedMonth])) }
                                <i className={`fa-solid fa-chevron-right ${selectedMonth == 0 ? styles.disabled : ''}`} onClick={() => selectedMonth != 0 ? setSelectedMonth(selectedMonth - 1) : undefined } />
                            </>
                }
            </h2>
            <div className={styles.statRow}>
                <div className={styles.stat}>
                    <p className={styles.label}>{t('dashboard.stats.transactions')}</p>
                    <p className={styles.data}>{filtered.length}</p>
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
            <div className={styles.chartRow}>
                {type == 0 &&
                    <>
                        <ExpensesVsIncomeBarAllTime transactions={transactions} height={400} />
                        <TotalByCategoryPie transactions={transactions} categories={categories} />
                    </>
                }
                {type == 1 &&
                    <>
                        <ExpensesVsIncomeBarOneYear transactions={filtered} year={years[selectedYear]} height={400} />
                        <TotalByCategoryPie transactions={filtered} categories={categories} />
                    </>
                }
                {type == 2 &&
                    <>
                        <TotalByCategoryPie transactions={filtered} categories={categories} />
                    </>
                }
            </div>
        </section>
    );

}

export default DataSection