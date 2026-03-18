import { useEffect, useState } from "react";
import { fetchBudgets } from "./budget.api";

export function useBudgets() {
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await fetchBudgets();
            setBudgets(data);
        }
        load();
    }, []);

    return { budgets, setBudgets };
}

export function useBudgetsByCategory(id) {
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await fetchBudgets(id);
            setBudgets(data);
        }
        load();
    }, []);

    return { budgets, setBudgets };
}