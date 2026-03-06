import './styles/Category.css'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TransactionList from '../transactions/TransactionList.jsx'

import { deleteTransaction, fetchTransactionsByCategory } from "../transactions/transaction.api";
import { fetchCategory } from "./category.api";
import ForecastVsActual from "../charts/ForecastVsActual/ForecastVsActual.jsx";

function Category() {
    const { id } = useParams();
    const isUncategorized = id === "uncategorized";
    const [category, setCategory] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        const loadCategory = async () => {
            const data = await fetchCategory(id);
            setCategory(data);
        }

        const loadTransactions = async () => {
            const data = isUncategorized ? await fetchTransactionsByCategory(null) : await fetchTransactionsByCategory(id);
            setTransactions(data);
        };

        if (!isUncategorized)
            loadCategory();

        loadTransactions();

    }, [id]);

    // CHART DATA

    useEffect(() => {
        if (!category) return;

        const categoriesArray = [{ name: category.name, forecast: Number(category.goal), actual: 0 }];

        setChartData(transactions
            .reduce((categories, transaction) => {
                categories[0].actual += Number(transaction.amount);
                return categories;
            }, categoriesArray));


    }, [category, transactions]);

    const handleDelete = async (id) => {
        const res = await deleteTransaction(id);
        if (!res.ok) return;

        setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    };

    if ((isUncategorized && !transactions) || (!isUncategorized && !category)) return <div>Loading...</div>;

    return (
        <div id="main" className="categoryPage">
            {
            isUncategorized ?
                (<h1>Uncategorized</h1>)
                :
                (
                    <>
                        <h1>{category.name}</h1>
                        {category.description && (
                            <p><em>{category.description}</em></p>
                        )}
                        <p><em>{category.is_income ? 'Monthly prediction: ' : 'Monthly limit: '}{category.goal} $ / month</em></p>
                        <div className="chart">
                            <ForecastVsActual categories={chartData} height={200}></ForecastVsActual>
                        </div>
                    </>
                )
            }
            <div className="transactionListContainer">
                <TransactionList transactions={transactions} onDelete={handleDelete}></TransactionList>
            </div>

        </div>
    );
}

export default Category