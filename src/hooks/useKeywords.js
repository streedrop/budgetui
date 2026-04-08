import { useEffect, useState } from 'react';
import { fetchKeywords } from '@/services/keyword.api';

/**
 * Uses all keywords.
 * @returns {Array} The fetched keywords
 * @returns {Function} Function to set the keywords if needed
 */
export function useKeywords() {
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await fetchKeywords();
            setKeywords(data);
        }
        load();
    }, []);

    return { keywords, setKeywords };
}