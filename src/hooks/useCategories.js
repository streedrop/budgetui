import { useEffect, useState } from 'react';
import { fetchCategories } from '@/services/category.api';

/**
 * Uses all categories.
 * @returns {Array} The fetched categories
 * @returns {Function} Function to set the categories if needed
 */
export function useCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await fetchCategories();
            setCategories(data);
        }
        load();
    }, []);

    return { categories, setCategories };
}