import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { amountFormatter } from '@/utils/formatters';
import { useData } from './useData';

function ForecastVsActual({ transactions, categories, budgets }) {

    const { data } = useData(transactions, categories, budgets);

    if (data.length === 0) return <p>Nothing to display.</p>;

    const customColorForecast = (props) => {
        const { x, y, width, height } = props;
        return <rect x={x} y={y} width={width} height={height} fill={props.payload.fill2} />
    };

    const customColorActual = (props) => {
        const { x, y, width, height } = props;
        return <rect x={x} y={y} width={width} height={height} fill={props.payload.fill1} />
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                layout="vertical"
            >
                <YAxis type="category" dataKey="name" />
                <XAxis type="number" />
                <Bar dataKey="forecast" shape={customColorForecast} />
                <Bar dataKey="actual" shape={customColorActual} />

                <Tooltip
                    labelFormatter={() => ''}
                    formatter={(value, name) => [amountFormatter(value), name.charAt(0).toUpperCase() + name.slice(1)]}
                    itemSorter={(item) => item.name === 'forecast' ? -1 : 1}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ForecastVsActual