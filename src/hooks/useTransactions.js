import { useEffect, useState } from 'react';
import { fetchTransactions } from '@/services/transaction.api';

/**
 * Uses transactions from a specific category or all transactions if no id is provided.
 * @param [id] - The category id (optional)
 * @returns {Array} The fetched transactions
 * @returns {Function} Function to set the transactions if needed
 */
export function useTransactions(id) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function load() {
            if (id === "uncategorized")
                id = null;
            const data = await fetchTransactions(id);
            setTransactions(data);
        }
        load();
    }, [id]);

    return { transactions, setTransactions };
}