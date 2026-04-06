import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

import { amountFormatter } from '@/utils/formatters';
import { getCustomBar, capitalize } from '@/utils/charts';

function Chart({ data, height }) {

    if (data.length === 0) return <p>Nothing to display.</p>;

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                data={data}
                layout="horizontal"
            >
                <XAxis type="category" dataKey="month" />
                <YAxis type="number" />
                <Bar dataKey="forecast" maxBarSize={60} shape={getCustomBar("colorForecast")} />
                <Bar dataKey="actual" maxBarSize={60} shape={getCustomBar("colorActual")} />

                <Tooltip
                    labelFormatter={() => ''}
                    formatter={(value, name) => [amountFormatter(value), capitalize(name)]}
                    itemSorter={(item) => item.name === 'forecast' ? -1 : 1}
                />
            </BarChart>
            <RechartsDevtools/>
        </ResponsiveContainer>
    );
}

export default Chart