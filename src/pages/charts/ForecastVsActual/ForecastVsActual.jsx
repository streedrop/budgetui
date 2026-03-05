import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from 'react';

function ForecastVsActual({ categories }) {

    const [data, setData] = useState([]);

    // Add color
    useEffect(() => {
        setData(categories
            // Add the color for the diagram
            .map((category, index) => ({
                ...category,
                colorForecast: `hsl(${(index * 360 / categories.length) % 360}, 70%, 30%)`,
                colorActual: `hsl(${(index * 360 / categories.length) % 360}, 70%, 55%)`
            }))
        );
    }, [categories]);

    if (data.length === 0) return <p>Nothing to display.</p>;

    const customColorForecast = (props) => {
        const { x, y, width, height } = props;
        return <rect x={x} y={y} width={width} height={height} fill={props.payload.colorForecast} />
    };

    const customColorActual = (props) => {
        const { x, y, width, height } = props;
        return <rect x={x} y={y} width={width} height={height} fill={props.payload.colorActual} />
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                layout="vertical"
            >
                <YAxis type="category" dataKey="name" />
                <XAxis type="number" />
                <Bar dataKey="forecast" shape={customColorForecast} />
                <Bar dataKey="actual" shape={customColorActual} />

                <Tooltip
                    labelFormatter={() => ''}
                    formatter={(value, name) => [` ${value.toFixed(2)} $`, name.charAt(0).toUpperCase() + name.slice(1)]}
                    itemSorter={(item) => item.name === 'forecast' ? -1 : 1}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ForecastVsActual