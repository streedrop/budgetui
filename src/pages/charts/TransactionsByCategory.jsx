import './styles/Charts.css'

import { PieChart, Pie, Tooltip } from "recharts";
import { useState, useEffect } from 'react';

function TransactionsByCategory({ transactions }) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const categories = transactions
            // Split into their corresponding category, by name
            .reduce((categories, transaction) => {
                const existing = categories.find(item => item.name === transaction.category_name);

                if (existing)
                    existing.value += Number(transaction.amount);
                else
                    categories.push({ name: transaction.category_name, value: Number(transaction.amount) });

                return categories;
            }, []);

        setCategories(categories
            // Add the color for the diagram
            .map((category, index) => ({
                ...category,
                fill: `hsl(${(index * 360 / categories.length) % 360}, 70%, 55%)`
            }))
        );
    }, []);

    if (categories.length === 0) return <p>Loading...</p>;

    return (
        <PieChart width={400} height={400}>
            <Pie data={categories} nameKey="name" dataKey="value" cx="50%" cy="50%" outerRadius={150} isAnimationActive={false} />
            <Tooltip
                formatter={(value, name) => [` ${value.toFixed(2)} $`, name]}
            />
        </PieChart>
    );
}

export default TransactionsByCategory