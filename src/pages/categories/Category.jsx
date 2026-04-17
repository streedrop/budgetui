import styles from './styles/Category.module.css';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import icons from '@/constants/CategoryIcons';

import { useCategory } from '@/hooks/categories/useCategory.js';
import { useTransactions } from '@/hooks/transactions/useTransactions.js';
import { useBudgets } from '@/hooks/budgets/useBudgets.js';

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
    const { data: budgets } = useBudgets(id);
    const { data: transactions = [], isLoading, error } = useTransactions(id);

    if ((isUncategorized && !transactions) || (!isUncategorized && !category)) return <div>Loading...</div>;

    return (
        <> {isUncategorized ?
            (<section><h1>{t('categories.uncategorized')}</h1></section>)
            :
            (<>
                <section>
                    <div className={styles.title}>
                        <i className={`${styles.icon} ${icons[category.icon]}`}></i>
                        <h1>{category.name}</h1>
                    </div>

                    {category.description && (
                        <p>{category.description}</p>
                    )}
                </section>

                <section className={`${styles.hidden} ${styles.chart}`}>
                </section>
                <section className={styles.budget}>
                    <h2>{t('categories.page.budget.title')}</h2>
                    <BudgetList budgets={budgets} category_id={id} />
                    <Button className={styles.set} action={() => setBudgetModal(true)}>{t('categories.page.budget.add')}</Button>
                </section>
                <Modal isOpen={budgetModal} onClose={() => setBudgetModal(false)}>
                    <BudgetForm onCancel={() => setBudgetModal(false)} onSuccess={() => { setBudgetModal(false) }} />
                </Modal>
            </>)}

            <TransactionList transactions={transactions} category_id={id} />
        </>
    );
}

export default Category