import styles from './styles/ChartList.module.css';
import TotalByCategoryPie from '@/charts/ByCategory/TotalByCategory/TotalByCategoryPie';
import TotalByCategoryBar from '@/charts/ByCategory/TotalByCategory/TotalByCategoryBar';
import ForecastVsActual from '@/charts/ByCategory/ForecastVsActual/ForecastVsActual';

import ExpensesVsIncomeMonths from '@/charts/ByMonth/ExpensesVsIncome/AllMonths/ExpensesVsIncome';
import ExpensesVsIncomeYear from '@/charts/ByMonth/ExpensesVsIncome/OneYear/ExpensesVsIncome';
import ForecastVsActualMonths from '@/charts/ByMonth/ForecastVsActual/AllMonths/ForecastVsActual';
import ForecastVsActualYear from '@/charts/ByMonth/ForecastVsActual/OneYear/ForecastVsActual';
import TotalByMonthBar from '@/charts/ByMonth/TotalByMonth/TotalByMonthBar';
import TotalByMonthLine from '@/charts/ByMonth/TotalByMonth/TotalByMonthLine';

import ExpensesVsIncomePie from '@/charts/ExpensesVsIncome/ExpensesVsIncomePie';
import ExpensesVsIncomeBar from '@/charts/ExpensesVsIncome/ExpensesVsIncomeBar';

function ChartList({ transactions, categories, budgets }) {

    if (transactions.length === 0 && budgets.length === 0) return <p>Nothing to display.</p>;

    return (
        <>
            <section>
                <h2>1. ByCategory</h2>
                <h3>1.1. TotalByCategory</h3>
                <div className={styles.list}>
                    <div className={styles.chart}>
                        <h4>1.1.1. TotalByCategoryPie</h4>
                        <TotalByCategoryPie transactions={transactions} categories={categories} />
                    </div>
                    <div className={styles.chart}>
                        <h4>1.1.2. TotalByCategoryBar</h4>
                        <TotalByCategoryBar transactions={transactions} categories={categories} />
                    </div>
                </div>
                <h3>1.2. ForecastVsActual</h3>
                <div className={styles.list}>
                    <div className={styles.chart}>
                        <h4>1.2.1. ForecastVsActual</h4>
                        <ForecastVsActual transactions={transactions} categories={categories} budgets={budgets} />
                    </div>
                </div>
            </section>
            <section>
                <h2>2. ByMonth</h2>
                <h3>2.1. ExpensesVsIncome</h3>
                <div className={styles.list}>
                    <div className={styles.chart}>
                        <h4>2.1.1. AllMonths</h4>
                        <ExpensesVsIncomeMonths transactions={transactions} height={400} />
                    </div>
                    <div className={styles.chart}>
                        <h4>2.1.2. OneYear</h4>
                        <ExpensesVsIncomeYear transactions={transactions} height={400} year={2026} />
                    </div>
                </div>
                <h3>2.2. ForecastVsActual</h3>
                <div className={styles.list}>
                    <div className={styles.chart}>
                        <h4>2.2.1. AllMonths</h4>
                        <ForecastVsActualMonths transactions={transactions} budgets={budgets} height={400} />
                    </div>
                    <div className={styles.chart}>
                        <h4>2.2.2. OneYear</h4>
                        <ForecastVsActualYear transactions={transactions} budgets={budgets} height={400} year={2026} />
                    </div>
                </div>
                <h3>2.3. TotalByMonth</h3>
                <div className={styles.list}>
                    <div className={styles.chart}>
                        <h4>2.3.1. TotalByMonthBar</h4>
                        <TotalByMonthBar transactions={transactions} height={400} />
                    </div>
                    <div className={styles.chart}>
                        <h4>2.3.2. TotalByMonthLine</h4>
                        <TotalByMonthLine transactions={transactions} height={400} />
                    </div>
                </div>
            </section>
            <section>
                <h2>3. ExpensesVsIncome</h2>
                <div className={styles.list}>
                    <div className={styles.chart}>
                        <h4>3.1. ExpensesVsIncomePie</h4>
                        <ExpensesVsIncomePie transactions={transactions} />
                    </div>
                    <div className={styles.chart}>
                        <h4>3.2. ExpensesVsIncomeBar</h4>
                        <ExpensesVsIncomeBar transactions={transactions} />
                    </div>
                </div>
            </section>

        </>
    )
}

export default ChartList