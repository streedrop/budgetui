import './styles/Category.css';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useCategory } from '@/hooks/useCategory.js';
import { useTransactions } from '@/hooks/useTransactions.js';
import { useBudgets } from '@/hooks/useBudgets.js';
import { deleteTransaction } from '@/services/transaction.api.js';
import { deleteBudget } from '@/services/budget.api.js';
import { dateToNumericMonthYear } from '@/utils/formatters.js';

import Modal from '@/components/modal/Modal.jsx';
import ForecastVsActual from '@/pages/charts/ForecastVsActual/ForecastVsActual.jsx';
import BudgetList from '@/pages/budget/BudgetList.jsx';
import BudgetForm from '@/pages/budget/BudgetForm.jsx';
import TransactionList from '@/pages/transactions/TransactionList.jsx';

function Category() {
    const { id } = useParams();
    const isUncategorized = id === "uncategorized";

    const [modalOpen, setModalOpen] = useState(false);

    const { category } = useCategory(id);
    const { budgets, setBudgets } = useBudgets(id);
    const { transactions, setTransactions } = useTransactions(id);

    const handleDeleteTransaction = async (id) => {
        const res = await deleteTransaction(id);
        if (!res.ok) return;

        setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    };

    const handleDeleteBudget = async (month) => {
        const res = await deleteBudget(id, dateToNumericMonthYear(month));
        if (!res.ok) return;

        setBudgets(prev => prev.filter(budget => { return !(budget.category_id == id && budget.month == month) }));
    }

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
                            <div className="chart">
                                <ForecastVsActual transactions={transactions} categories={[category]} budgets={budgets} height={200}></ForecastVsActual>
                            </div>
                            <section id="budget">
                                <h2>Monthly budget</h2>
                                <BudgetList budgets={budgets} onDelete={handleDeleteBudget}></BudgetList>
                                <button className="setBudget" type="button" onClick={() => setModalOpen(true)}>Set budget</button>
                            </section>
                            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                                <BudgetForm onCancel={() => setModalOpen(false)} onSuccess={() => { loadBudgets(); setModalOpen(false) }}></BudgetForm>
                            </Modal>
                        </>
                    )
            }
            <section id="transactions">
                <h2>Transactions</h2>
                <div className="transactionListContainer">
                    <TransactionList transactions={transactions} onDelete={handleDeleteTransaction}></TransactionList>
                </div>
            </section>

        </div>
    );
}

export default Category