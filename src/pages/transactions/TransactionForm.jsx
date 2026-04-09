import styles from './styles/TransactionForm.module.css';

import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCategories } from '@/hooks/categories/useCategories';
import { useCreateTransaction } from '@/hooks/transactions/useCreateTransaction.js';
import { useEditTransaction } from '@/hooks/transactions/useEditTransaction.js';
import { useTransaction } from '@/hooks/transactions/useTransaction.js';
import CancelButton from '@/components/buttons/CancelButton';
import SaveButton from '@/components/buttons/SaveButton';
import AddButton from '@/components/buttons/AddButton';

const emptyFormData = {
    description: "",
    amount: "",
    category_id: ""
};

function TransactionForm() {
    const { t } = useTranslation();

    const { id } = useParams();               // Current transaction ID
    const [searchParams] = useSearchParams();
    const isEditMode = Boolean(id);                     // ID = editing, No ID = creating
    const { data: categories = [] } = useCategories();
    const [data, setFormData] = useState(emptyFormData);    // Form data
    const { mutate: createTransaction } = useCreateTransaction();
    const { mutate: editTransaction } = useEditTransaction();
    const { data: transaction = [], isLoading, error } = useTransaction(id);

    const navigate = useNavigate();

    // Pre-fill form
    useEffect(() => {
        const category = searchParams.get("category");

        if (category)
            emptyFormData.category_id = category;

        setFormData(emptyFormData);
    }, [searchParams]);

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

        navigate(-1);
    };

    // Cancel button
    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <h1>{isEditMode ? t('transactions.form.edit') : t('transactions.form.add')}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="description">{t('transactions.form.description')} </label>
                <input type="text" id="description" name="description" defaultValue={data.description} />

                <label htmlFor="amount">{t('transactions.form.amount')} </label>
                <input type="text" id="amount" name="amount" defaultValue={data.amount} />

                <label htmlFor="category">{t('transactions.form.category')}</label>
                <select id="category" name="category_id" value={data.category_id}
                    onChange={(e) =>
                        setFormData({
                            ...data,
                            category_id: e.target.value
                        })
                    }>
                    <option value="">{t('categories.uncategorized')}</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="date">{t('transactions.form.date')}</label>
                <input type="date" id="date" name="date" defaultValue={data.date ? data.date.split("T")[0] : ""}></input>
                <CancelButton action={handleCancel} />
                {isEditMode ? (<SaveButton />) : (<AddButton />)}
            </form>
        </>
    )
}

export default TransactionForm