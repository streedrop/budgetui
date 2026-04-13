import styles from './styles/Category.module.css';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import icons from '@/constants/CategoryIcons';

import { useCategory } from '@/hooks/categories/useCategory.js';
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
    const { t } = useTranslation();

    const { id } = useParams();
    const isUncategorized = id === "uncategorized";

    const [budgetModal, setBudgetModal] = useState(false);

    const { data: category } = useCategory(id);
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
            (<h1>{t('categories.uncategorized')}</h1>)
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
                    <h2>{t('categories.page.budget.title')}</h2>
                    <BudgetList budgets={budgets} onDelete={handleDeleteBudget}></BudgetList>
                    <Button className={styles.set} action={() => setBudgetModal(true)}>{t('categories.page.budget.add')}</Button>
                </section>
                <Modal isOpen={budgetModal} onClose={() => setBudgetModal(false)}>
                    <BudgetForm onCancel={() => setBudgetModal(false)} onSuccess={() => { setBudgetModal(false) }} />
                </Modal>
            </>)}

            <section className={styles.transactions}>
                <h2>Transactions</h2>
                <TransactionList transactions={transactions} category_id={id} />
            </section>
        </>
    );
}

export default Category