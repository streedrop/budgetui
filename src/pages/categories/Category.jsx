import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TransactionList from '../transactions/TransactionList.jsx'

import { fetchTransactionsByCategory } from "../transactions/transaction.api";
import { fetchCategory } from "./category.api";

function Category() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        const loadCategory = async () => {
            const data = await fetchCategory(id);
            setCategory(data);
        }

        const loadTransactions = async () => {
            const data = await fetchTransactionsByCategory(id);
            setTransactions(data);
        };

        loadCategory();
        loadTransactions();
    }, [id]);

    const handleDelete = async (id) => {
        const res = await deleteTransaction(id);
        if (!res.ok) return;

        setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    };

    if (!category) return <div>Loading...</div>;

    return (
        <div id="main">
            <h1>{category.name}</h1>
            <TransactionList transactions={transactions} onDelete={handleDelete}></TransactionList>
        </div>
    );
}

export default Category