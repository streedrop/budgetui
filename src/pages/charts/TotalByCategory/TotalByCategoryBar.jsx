import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useState, useEffect } from 'react';

function TotalByCategoryBar({ categories }) {

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
                formatter={(value, name, props) => [` ${value.toFixed(2)} $`, props.payload.name]}
            />
        </BarChart>
    );
}

export default TotalByCategoryBar