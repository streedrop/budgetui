import { PieChart, Pie, Tooltip } from 'recharts';

import { amountFormatter } from '@/utils/formatters';
import { useData } from './useData';

function ExpensesVsIncomePie({ transactions }) {

    const { data } = useData(transactions);

    return (
        <PieChart height={400} width={`100%`}>
            <Pie data={data} nameKey="name" dataKey="value" cx="50%" cy="50%" outerRadius={150} />
            <Tooltip
                formatter={(value, name) => [amountFormatter(value), name]}
            />
        </PieChart>
    );
}

export default ExpensesVsIncomePie