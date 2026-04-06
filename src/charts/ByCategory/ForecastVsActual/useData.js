import { useEffect, useState } from 'react';
import { colorData } from '@/utils/charts';

export function useData(transactions, categories, budgets) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Initial data
        const data = categories
            .filter((category) => category.id != null)
            .map((category) => ({
                name: category.name,
                id: category.id,
                forecast: 0,
                actual: 0,
            }));

        budgets.forEach(b => {
            const category = data.find(c => c.id === b.category_id);
            if (category)
                category.forecast += Number(b.amount);
        });

        transactions.forEach(t => {
            const category = data.find(c => c.id === t.category_id);
            if (category)
                category.actual += Number(t.amount);
        });

        setData(colorData(data, 2));
    }, [transactions, categories, budgets]);

    return { data, setData };
}