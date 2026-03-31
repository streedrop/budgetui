import { useData } from './useData';
import Chart from '../Chart';

function ForecastVsActual({ transactions, budgets, height }) {

    const { data } = useData(transactions, budgets);

    return (
        <Chart data={data} height={height}/>
    )
}

export default ForecastVsActual