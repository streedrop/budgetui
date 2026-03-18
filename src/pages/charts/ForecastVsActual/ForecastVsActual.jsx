import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

import { amountFormatter } from '@/utils/formatters';

function ForecastVsActual({ transactions, categories, budgets }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        // Initial data with colors
        let data = categories
            .map((category, index) => ({
                name: category.name,
                id: category.id,
                forecast: 0,
                actual: 0,
                colorForecast: `hsl(${(index * 360 / categories.length) % 360}, 70%, 30%)`,
                colorActual: `hsl(${(index * 360 / categories.length) % 360}, 70%, 55%)`
            }));

        // Set Forecast
        data = budgets
            // Split into their corresponding category, using id
            .reduce((categories, budget) => {
                const category = categories.find(item => item.id === budget.category_id);

                if (category)
                    category.forecast += Number(budget.amount);

                return categories;
            }, data);

        // Set Actual
        data = transactions
            // Split into their corresponding category, using id
            .reduce((categories, transaction) => {
                const category = categories.find(item => item.id === transaction.category_id);

                if (category)
                    category.actual += Number(transaction.amount);

                return categories;
            }, data);

        setData(data);
    }, [transactions, categories, budgets]);

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
                    formatter={(value, name) => [amountFormatter(value), name.charAt(0).toUpperCase() + name.slice(1)]}
                    itemSorter={(item) => item.name === 'forecast' ? -1 : 1}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ForecastVsActual