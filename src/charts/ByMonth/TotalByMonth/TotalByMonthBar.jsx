import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { RechartsDevtools } from '@recharts/devtools';

import { amountFormatter } from '@/utils/formatters'
import { useData } from './useData';

function TotalByMonthBar({ transactions, height }) {

    const { data } = useData(transactions);

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                data={data}
                layout="horizontal"
            >
                <RechartsDevtools />
                <XAxis type="category" dataKey="month" />
                <YAxis type="number" />
                <Bar dataKey="Sum" barSize={60} fill="#8884d8"/>
                <Tooltip
                    labelFormatter={() => ''}
                    formatter={(value, name, props) => [amountFormatter(value), props.payload.month]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default TotalByMonthBar;