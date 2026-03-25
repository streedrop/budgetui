import styles from './Filter.module.css'

import { useState, useEffect } from 'react';

import emptyFilters from '@/constants/EmptyFilters'
import { dateToMonthYear } from '@/utils/formatters';

import { useTransactions } from '@/hooks/rq/useTransactions.js';
import Button from '@/components/buttons/Button';

function Filter({ filters, setFilters, date = true, amount = true }) {
    const { data: transactions = [], isLoading, error } = useTransactions();
    const [dateRange, setDateRange] = useState("0");
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const years = [...new Set(transactions.map(t => t.date.slice(0, 4)))];
    const months = [...new Set(transactions.map(t => t.date.slice(0, 7)))];

    // The amount of filters shown
    const nbFilters = [date, amount].filter(Boolean).length;

    // First initialisation for selectedYear and selectedMonth
    useEffect(() => {
        // Return if selectedYear or selectedMonth already had values
        if (selectedYear || selectedMonth) return;
        setSelectedYear(years[0]);
        setSelectedMonth(months[0]);
    }, [transactions]);

    // Called when we need to apply new filters for year
    useEffect(() => {
        // Return if selectedYear is still null or if dateRange is not set to 'Yearly'
        if (!selectedYear || dateRange != '1') return;
        // First day of the year
        const from = `${selectedYear}-01-01`;
        // Last day of the year
        const to = `${selectedYear}-12-31`;

        setFilters(prev => ({ ...prev, after: from, before: to }));
    }, [selectedYear, dateRange]);

    // Called when we need to apply new filters for month
    useEffect(() => {
        // Return if selectedMonth is still null or if dateRange is not set to 'Monthly'
        if (!selectedMonth || dateRange != '2')
            return;
        // First day of the month
        const from = `${selectedMonth}-01`;
        // Last day of the month
        const to = `${selectedMonth}-${new Date(selectedMonth.slice(0, 4), Number(selectedMonth.slice(5, 7)), 0).getDate()}`;

        setFilters(prev => ({ ...prev, after: from, before: to }));
    }, [selectedMonth, dateRange]);

    // Return nothing if there are no filters to display
    if (nbFilters == 0)
        return;

    const resetFilters = () => {
        setFilters(emptyFilters);
        setDateRange('0');
    }

    return (
        <div className={styles.filters}>
            <h3 className={styles.title}>Filters</h3>
            <form className={`${styles.form}`}>
                {date && (
                    <div className={`${styles.filter} ${styles.date}`}>
                        <h4>Date range</h4>
                        <div className={styles.rangeSelector}>
                            <input type="radio" id="yearly" name="dateRange" value="1" checked={dateRange === '1'} onChange={evt => setDateRange(evt.target.value)} />
                            <label htmlFor="yearly">Yearly</label>
                            <input type="radio" id="monthly" name="dateRange" value="2" checked={dateRange === '2'} onChange={evt => setDateRange(evt.target.value)} />
                            <label htmlFor="monthly">Monthly</label>
                            <input type="radio" id="custom" name="dateRange" value="3" checked={dateRange === '3'} onChange={evt => setDateRange(evt.target.value)} />
                            <label htmlFor="custom">Custom</label>
                        </div>
                        <div className={`${styles.periodSelector} ${dateRange != "1" ? styles.hidden : ''}`}>
                            <label htmlFor="year">Select year: </label>
                            <select name="year" id="year" onChange={evt => setSelectedYear(evt.target.value)}>
                                {
                                    years.map(year =>
                                        <option key={year} value={year}>{year}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className={`${styles.periodSelector} ${dateRange != "2" ? styles.hidden : ''}`}>
                            <label htmlFor="month">Select month: </label>
                            <select name="month" id="month" onChange={evt => setSelectedMonth(evt.target.value)}>
                                {
                                    months.map(month =>
                                        <option key={month} value={month}>{dateToMonthYear(month)}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className={`${styles.subForm} ${dateRange != "3" ? styles.hidden : ''}`}>
                            <div>
                                <label htmlFor="after">From: </label>
                                <input id="after" type="date" value={filters.after} onChange={evt => setFilters(prev => ({ ...prev, after: evt.target.value }))} />
                            </div>
                            <div>
                                <label htmlFor="before">To: </label>
                                <input id="before" type="date" value={filters.before} onChange={evt => setFilters(prev => ({ ...prev, before: evt.target.value }))} />
                            </div>
                        </div>
                    </div>
                )}
                {amount && (
                    <div className={`${styles.filter} ${styles.amount}`}>
                        <h4>Amount</h4>
                        <div className={styles.subForm}>
                            <div>
                                <label htmlFor="minAmount">From: </label>
                                <span>
                                    <input id="minAmount" type="number" step="any" min="0" value={filters.minAmount} onChange={evt => setFilters(prev => ({ ...prev, minAmount: evt.target.value }))} />
                                    $</span>
                            </div>
                            <div>
                                <label htmlFor="maxAmount">To: </label>
                                <span><input id="maxAmount" type="number" step="any" min="0" value={filters.maxAmount} onChange={evt => setFilters(prev => ({ ...prev, maxAmount: evt.target.value }))} />
                                    $</span>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`${styles.filter}`}>
                    <Button action={resetFilters}>Reset</Button>
                </div>
            </form>
        </div>
    );
}

export default Filter