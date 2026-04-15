import { useEffect, useState } from 'react';
import { colorData } from '@/utils/charts';

export function useData(transactions, categories) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Initial data
        const data = categories
            .filter((category) => category.id != null)
            .map((category) => ({
                name: category.name,
                id: category.id,
                value: 0,
            }));

        // Increment amount by transaction
        transactions.forEach(t => {
            const category = data.find(c => c.id === t.category_id);
            if (category)
                category.value += Number(t.amount);
        });

        // Remove every category where the amount is 0 and add colors

        setData(colorData(data.filter(c => c.value > 0)));
    }, [transactions, categories]);

    return { data, setData };
}