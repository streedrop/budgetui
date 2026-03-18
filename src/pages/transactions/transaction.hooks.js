import { useEffect, useState } from "react";
import { fetchTransactions, fetchTransactionsByCategory } from "./transaction.api";

export function useTransactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await fetchTransactions();
            setTransactions(data);
        }
        load();
    }, []);

    return { transactions, setTransactions };
}

export function useTransactionsByCategory(id) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function load() {
            if (id === "uncategorized")
                id = null;
            const data = await fetchTransactionsByCategory(id);
            setTransactions(data);
        }
        load();
    }, []);

    return { transactions, setTransactions };
}