import { PieChart, Pie, Tooltip, Legend } from 'recharts';

import { amountFormatter } from '@/utils/formatters';
import { useData } from './useData';

function TotalByCategoryPie({ transactions, categories }) {

    const { data } = useData(transactions, categories);

    if (data.length === 0) return <p>Nothing to display.</p>;
    return (
        <PieChart height={400} width={`100%`}>
            <Pie data={data} nameKey="name" dataKey="value" cx="50%" cy="50%" outerRadius={150}/>
            <Tooltip
                formatter={(value, name) => [amountFormatter(value), name]}
            />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
    );
}

export default TotalByCategoryPie