import { useEffect, useState } from 'react';
import { fetchCategory } from '@/services/category.api';

/**
 * Uses a specific category from a specific category or no category if the id is "uncategorized".
 * @param [id] - The category id (optional)
 * @returns {Array} The fetched category
 * @returns {Function} Function to set the category if needed
 */
export function useCategory(id) {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (id === "uncategorized") return;

        async function load() {
            const data = await fetchCategory(id);
            setCategory(data);
        }
        load();
    }, []);

    return { category, setCategory };
}