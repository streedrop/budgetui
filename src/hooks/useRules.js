import { useEffect, useState } from 'react';
import { fetchRules } from '@/services/rule.api';

/**
 * Uses all rules.
 * @returns {Array} The fetched rules
 * @returns {Function} Function to set the rules if needed
 */
export function useRules() {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await fetchRules();
            setRules(data);
        }
        load();
    }, []);

    return { rules, setRules };
}