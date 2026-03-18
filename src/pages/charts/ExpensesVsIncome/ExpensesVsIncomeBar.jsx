import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

import { amountFormatter } from '@/utils/formatters';

function ExpensesVsIncomeBar({ income, expense }) {

    const data = [
        { name: "Income", value: income, fill: `hsl(180, 70%, 55%)` },
        { name: "Expenses", value: expense, fill: `hsl(0, 70%, 55%)` }
    ];

    if (income === 0 && expense === 0) return <p>Nothing to display.</p>;

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