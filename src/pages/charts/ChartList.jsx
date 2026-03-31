import styles from './styles/ChartList.module.css';
import TotalByCategoryPie from './ByCategory/TotalByCategory/TotalByCategoryPie.jsx';
import TotalByCategoryBar from './ByCategory/TotalByCategory/TotalByCategoryBar.jsx';
import ExpensesVsIncomePie from './ExpensesVsIncome/ExpensesVsIncomePie.jsx';
import ExpensesVsIncomeBar from './ExpensesVsIncome/ExpensesVsIncomeBar.jsx';
import ForecastVsActual from './ByCategory/ForecastVsActual/ForecastVsActual.jsx';

function ChartList({ transactions, categories, budgets }) {

    if (transactions.length === 0 && budgets.length === 0) return <p>Nothing to display.</p>;

    return (
        <div className={styles.list}>
            <div className={styles.chart}>
                <h2>Total by category</h2>
                <TotalByCategoryPie transactions={transactions} categories={categories}></TotalByCategoryPie>
            </div>
            <div className={styles.chart}>
                <h2>Total by category</h2>
                <TotalByCategoryBar transactions={transactions} categories={categories}></TotalByCategoryBar>
            </div>
            <div className={styles.chart}>
                <h2>Expenses vs Income</h2>
                <ExpensesVsIncomePie transactions={transactions}></ExpensesVsIncomePie>
            </div>
            <div className={styles.chart}>
                <h2>Expenses vs Income</h2>
                <ExpensesVsIncomeBar transactions={transactions}></ExpensesVsIncomeBar>
            </div>
            <div className={styles.chart}>
                <h2>Forecast vs Actual</h2>
                <ForecastVsActual transactions={transactions} categories={categories} budgets={budgets}></ForecastVsActual>
            </div>
            <div className={styles.chart}>
                <h2>Total by category</h2>
                <TotalByCategoryBar transactions={transactions} categories={categories}></TotalByCategoryBar>
            </div>
        </div>
    )
}

export default ChartList