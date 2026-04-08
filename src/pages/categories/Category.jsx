import styles from './styles/Category.module.css';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import icons from '@/constants/CategoryIcons';

import { useCategory } from '@/hooks/useCategory.js';
import { useTransactions } from '@/hooks/transactions/useTransactions.js';
import { useBudgets } from '@/hooks/useBudgets.js';
import { deleteBudget } from '@/services/budget.api.js';
import { dateToNumericMonthYear } from '@/utils/formatters.js';

import Modal from '@/components/modal/Modal.jsx';
import Button from '@/components/buttons/Button';
import BudgetList from '@/pages/budget/BudgetList.jsx';
import BudgetForm from '@/pages/budget/BudgetForm.jsx';
import TransactionList from '@/pages/transactions/TransactionList.jsx';

function Category() {
    const { id } = useParams();
    const isUncategorized = id === "uncategorized";

    const [modalOpen, setModalOpen] = useState(false);

    const { category } = useCategory(id);
    const { budgets, setBudgets } = useBudgets(id);
    const { data: transactions = [], isLoading, error } = useTransactions(id);

    const handleDeleteBudget = async (month) => {
        const res = await deleteBudget(id, dateToNumericMonthYear(month));
        if (!res.ok) return;

        setBudgets(prev => prev.filter(budget => { return !(budget.category_id == id && budget.month == month) }));
    }

    if ((isUncategorized && !transactions) || (!isUncategorized && !category)) return <div>Loading...</div>;

    return (
        <> {isUncategorized ?
            (<h1>Uncategorized</h1>)
            :
            (<>
                <header className={styles.title}>
                    <i className={`${styles.icon} ${icons[category.icon]}`}></i>
                    <h1>{category.name}</h1>
                </header>

                {category.description && (
                    <p><em>{category.description}</em></p>
                )}
                <section className={`${styles.hidden} ${styles.chart}`}>
                </section>
                <section className={styles.budget}>
                    <h2>Monthly budget</h2>
                    <BudgetList budgets={budgets} onDelete={handleDeleteBudget}></BudgetList>
                    <Button className={styles.set} action={() => setModalOpen(true)}>Set budget</Button>
                </section>
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <BudgetForm onCancel={() => setModalOpen(false)} onSuccess={() => { setModalOpen(false) }}></BudgetForm>
                </Modal>
            </>)}

            <section className={styles.transactions}>
                <h2>Transactions</h2>
                <TransactionList transactions={transactions} category_id={id}></TransactionList>
            </section>
        </>
    );
}

export default Category