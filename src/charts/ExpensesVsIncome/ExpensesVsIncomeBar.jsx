import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

import { amountFormatter } from '@/utils/formatters';
import { useData } from './useData';

function ExpensesVsIncomeBar({ transactions }) {

    const { data } = useData(transactions);

    if (transactions.length === 0) return <p>Nothing to display.</p>;

    return (
        <BarChart
            height={400}
            width={`100%`}
            data={data}
            layout="vertical"
        >
            <YAxis type="category" dataKey="name" />
            <XAxis type="number" dataKey="value" />
            <Bar dataKey="value" />
            <Tooltip
                labelFormatter={() => ''}
                formatter={(value, name, props) => [amountFormatter(value), props.payload.name]}
            />
        </BarChart>
    );
}

export default ExpensesVsIncomeBar