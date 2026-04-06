import { useData } from './useData';
import Chart from '../Chart';

function ForecastVsActual({ transactions, budgets, year, height }) {

    const { data } = useData(transactions, budgets, year);

    return (
        <Chart data={data} height={height}/>
    )
}

export default ForecastVsActual