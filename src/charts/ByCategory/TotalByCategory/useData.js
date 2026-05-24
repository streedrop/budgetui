import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { colorData } from '@/utils/charts';

export function useData(transactions, categories) {
    const { t } = useTranslation();

    const [data, setData] = useState([]);

    useEffect(() => {
        // Initial data
        const data = categories
            .map((category) => ({
                name: t(category.name),
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