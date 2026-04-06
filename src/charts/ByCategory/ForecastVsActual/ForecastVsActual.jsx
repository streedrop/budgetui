import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { amountFormatter } from '@/utils/formatters';
import { getCustomBar } from '@/utils/charts';

import { useData } from './useData';

function ForecastVsActual({ transactions, categories, budgets }) {

    const { data } = useData(transactions, categories, budgets);

    if (data.length === 0) return <p>Nothing to display.</p>;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                layout="vertical"
            >
                <YAxis type="category" dataKey="name" />
                <XAxis type="number" />
                <Bar dataKey="forecast" shape={getCustomBar("fill2")} />
                <Bar dataKey="actual" shape={getCustomBar("fill1")} />

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