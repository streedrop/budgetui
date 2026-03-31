import { useEffect, useState } from 'react';
import { groupTransactionsByMonth } from '@/utils/groupers';

export function useData(transactions) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!transactions)
            return;

        const grouped = groupTransactionsByMonth(transactions);
        const formatted = Object.entries(grouped).map(([key, value]) => ({ month: key, Sum: Math.abs(value.sum) }));

        setData(formatted.reverse());
    }, [transactions]);

    return { data, setData };
}