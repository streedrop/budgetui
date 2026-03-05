import { PieChart, Pie, Tooltip } from "recharts";

function ExpensesVsIncomePie({ income, expense }) {

    const data = [
        { name: "Income", value: income, fill: `hsl(180, 70%, 55%)` },
        { name: "Expenses", value: expense, fill: `hsl(0, 70%, 55%)` }
    ];

    return (
        <PieChart width={400} height={400}>
            <Pie data={data} nameKey="name" dataKey="value" cx="50%" cy="50%" outerRadius={150} />
            <Tooltip
                formatter={(value, name) => [` ${value.toFixed(2)} $`, name]}
            />
        </PieChart>
    );
}

export default ExpensesVsIncomePie