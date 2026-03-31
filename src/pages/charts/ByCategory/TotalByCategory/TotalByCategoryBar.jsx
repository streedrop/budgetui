import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

import { amountFormatter } from '@/utils/formatters';
import { useData } from './useData';

function TotalByCategoryBar({ transactions, categories }) {

    const { data } = useData(transactions, categories);

    if (categories.length === 0) return <p>Nothing to display.</p>;

    return (
        <BarChart
            width={`100%`}
            height={400}
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

export default TotalByCategoryBar