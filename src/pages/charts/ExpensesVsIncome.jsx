import './styles/Charts.css'

import { PieChart, Pie, Tooltip } from "recharts";
import { useState, useEffect } from 'react';

function ExpensesVsIncome({ transactions }) {

    const [types, setTypes] = useState([]);

    useEffect(() => {
        setTypes(transactions
            // Split into their corresponding category, by name
            .reduce((types, transaction) => {

                if (transaction.is_income)
                    types[0].value += Number(transaction.amount);
                else
                    types[1].value += Number(transaction.amount);

                return types;
            }, [{ name: "Income", value: 0, fill: `hsl(180, 70%, 55%)` }, { name: "Expenses", value: 0, fill: `hsl(0, 70%, 55%)` }]));
    }, [transactions]);

    if (transactions.length === 0) return <p>No transactions to display.</p>;
    if (types.length === 0) return <p>Loading...</p>;

    return (
        <PieChart width={400} height={400}>
            <Pie data={types} nameKey="name" dataKey="value" cx="50%" cy="50%" outerRadius={150} />
            <Tooltip
                formatter={(value, name) => [` ${value.toFixed(2)} $`, name]}
            />
        </PieChart>
    );
}

export default ExpensesVsIncome