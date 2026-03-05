import { PieChart, Pie, Tooltip } from "recharts";
import { useState, useEffect } from 'react';

function TotalByCategoryPie({ categories }) {

    const [data, setData] = useState([]);

    // Add color
    useEffect(() => {
        setData(categories
            // Add the color for the diagram
            .map((category, index) => ({
                ...category,
                fill: `hsl(${(index * 360 / categories.length) % 360}, 70%, 55%)`
            }))
        );
    }, [categories]);

    if (categories.length === 0) return <p>Nothing to display.</p>;

    return (
        <PieChart height={400} width={`100%`}>
            <Pie data={data} nameKey="name" dataKey="value" cx="50%" cy="50%" outerRadius={150}/>
            <Tooltip
                formatter={(value, name) => [` ${value.toFixed(2)} $`, name]}
            />
        </PieChart>
    );
}

export default TotalByCategoryPie