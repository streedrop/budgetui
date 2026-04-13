import styles from './styles/TransactionForm.module.css';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { emptyTransaction } from '@/constants/EmptyData';

import { useCategories } from '@/hooks/categories/useCategories';
import { useCreateTransaction } from '@/hooks/transactions/useCreateTransaction.js';
import { useEditTransaction } from '@/hooks/transactions/useEditTransaction.js';
import { useTransaction } from '@/hooks/transactions/useTransaction.js';
import CancelButton from '@/components/buttons/CancelButton';
import SaveButton from '@/components/buttons/SaveButton';
import AddButton from '@/components/buttons/AddButton';

function TransactionForm({ id = null, category_id = "", closeModal }) {
    const { t } = useTranslation();

    const isEditMode = Boolean(id);                     // ID = editing, No ID = creating
    const { data: categories = [] } = useCategories();
    const [data, setFormData] = useState({...emptyTransaction, category_id: category_id});    // Form data
    const { mutate: createTransaction } = useCreateTransaction();
    const { mutate: editTransaction } = useEditTransaction();
    const { data: transaction = [], isLoading, error } = useTransaction(id);

    // Pre-fill form
    useEffect(() => {
        if (transaction && isEditMode)
            setFormData(transaction);
    }, [transaction]);

    // Add / Save button
    function handleSubmit(evt) {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        if (data.category_id === "")
            data.category_id = null;

        if (isEditMode)
            editTransaction({ id, data });
        else
            createTransaction(data);

        closeModal();
    };

    return (
        <>
            <h2>{isEditMode ? t('transactions.form.edit') : t('transactions.form.add')}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="description">{t('transactions.form.description.label')} </label>
                    <input type="text" id="description" name="description" defaultValue={data.description} placeholder={t('transactions.form.description.placeholder')} />
                </div>
                <div>
                    <label htmlFor="amount">{t('transactions.form.amount.label')} </label>
                    <input type="text" id="amount" name="amount" defaultValue={data.amount} placeholder={t('transactions.form.amount.placeholder')} />
                </div>
                <div>
                    <label htmlFor="category">{t('transactions.form.category')}</label>
                    <select id="category" name="category_id" value={data.category_id}
                        onChange={(e) =>
                            setFormData({
                                ...data,
                                category_id: e.target.value
                            })
                        }>
                        <option value="">{t('categories.uncategorized')}</option>
                        {categories.filter(c => c.id).map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="date">{t('transactions.form.date')}</label>
                    <input type="date" id="date" name="date" defaultValue={data.date ? data.date.split("T")[0] : ""} />
                </div>
                <div className={styles.actions}>
                    <CancelButton action={closeModal} />
                    {isEditMode ? (<SaveButton />) : (<AddButton />)}
                </div>

            </form>
        </>
    )
}

export default TransactionForm