import { useData } from './useData';
import Chart from '../Chart';

function ExpensesVsIncomeBar({ transactions, height }) {

    const { data } = useData(transactions);

    if (transactions.length === 0) return <p>Nothing to display.</p>;

    return (
        <Chart data={data} height={height}/>
    );
}

export default ExpensesVsIncomeBar