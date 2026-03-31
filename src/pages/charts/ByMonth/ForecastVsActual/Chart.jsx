import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

import { amountFormatter } from '@/utils/formatters';

function Chart({ data, height }) {

    if (data.length === 0) return <p>Nothing to display.</p>;

    const customColorForecast = (props) => {
        const { x, y, width, height } = props;
        return <rect x={x} y={y} width={width} height={height} fill={props.payload.colorForecast} />
    };

    const customColorActual = (props) => {
        const { x, y, width, height } = props;
        return <rect x={x} y={y} width={width} height={height} fill={props.payload.colorActual} />
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                data={data}
                layout="horizontal"
            >
                <XAxis type="category" dataKey="month" />
                <YAxis type="number" />
                <Bar dataKey="forecast" maxBarSize={60} shape={customColorForecast} />
                <Bar dataKey="actual" maxBarSize={60} shape={customColorActual} />

                <Tooltip
                    labelFormatter={() => ''}
                    formatter={(value, name) => [amountFormatter(value), name.charAt(0).toUpperCase() + name.slice(1)]}
                    itemSorter={(item) => item.name === 'forecast' ? -1 : 1}
                />
            </BarChart>
            <RechartsDevtools/>
        </ResponsiveContainer>
    );
}

export default Chart