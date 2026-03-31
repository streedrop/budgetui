import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

import { amountFormatter } from '@/utils/formatters';
import { useData } from './useData';

function TotalByMonthLine({ transactions, height }) {

    const { data } = useData(transactions);

    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip labelFormatter={() => ''} formatter={(value, name) => [amountFormatter(value), name]} />
                <Legend />
                <Line type="monotone" dataKey="Sum" stroke="#8884d8" isAnimationActive={true} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default TotalByMonthLine;