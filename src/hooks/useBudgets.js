import { useEffect, useState } from 'react';
import { fetchBudgets } from '@/services/budget.api';

/**
 * Uses budgets for a specific category or all budgets if no id is provided.
 * @param [id] - The category id (optional)
 * @returns {Array} The fetched budgets
 * @returns {Function} Function to set the budgets if needed
 */
export function useBudgets(id) {
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await fetchBudgets(id);
            setBudgets(data);
        }
        load();
    }, [id]);

    return { budgets, setBudgets };
}