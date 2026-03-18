import { useEffect, useState } from 'react';
import { fetchCategory, fetchCategories } from '@/services/category.api';

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