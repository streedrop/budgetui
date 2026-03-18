import { PieChart, Pie, Tooltip } from "recharts";

import { amountFormatter } from '@/utils/formatters';

function ExpensesVsIncomePie({ income, expense }) {

    const data = [
        { name: "Income", value: income, fill: `hsl(180, 70%, 55%)` },
        { name: "Expenses", value: expense, fill: `hsl(0, 70%, 55%)` }
    ];

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