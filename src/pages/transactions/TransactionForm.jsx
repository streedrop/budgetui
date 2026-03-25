import styles from './styles/TransactionForm.module.css';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useCategories } from '@/hooks/useCategories.js';
import { useCreateTransaction } from '@/hooks/rq/useCreateTransaction.js';
import { useEditTransaction } from '@/hooks/rq/useEditTransaction.js';
import { useTransaction } from '@/hooks/rq/useTransaction.js';
import { fetchTransaction } from '@/services/transaction.api.js';
import CancelButton from '@/components/buttons/CancelButton';
import SaveButton from '@/components/buttons/SaveButton';
import AddButton from '@/components/buttons/AddButton';

const emptyFormData = {
    description: "",
    amount: "",
    category_id: ""
};

function TransactionForm() {
    const { id } = useParams();                         // Current transaction ID
    const isEditMode = Boolean(id);                     // ID = editing, No ID = creating
    const { categories } = useCategories();
    const [data, setFormData] = useState(emptyFormData);    // Form data
    const { mutate: createTransaction } = useCreateTransaction();
    const { mutate: editTransaction } = useEditTransaction();
    const { data: transaction = [], isLoading, error } = useTransaction(id);

    const navigate = useNavigate();

    // Pre-fill form
    useEffect(() => {
        if (transaction)
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

        navigate('/transactions');
    };

    // Cancel button
    const handleCancel = () => {
        navigate('/transactions');
    }

    return (
        <>
            <h1>{isEditMode ? 'Edit transaction' : 'New transaction'}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" defaultValue={data.description} />

                <label htmlFor="amount">Amount: </label>
                <input type="text" id="amount" name="amount" defaultValue={data.amount} />

                <label htmlFor="category">Category:</label>
                <select id="category" name="category_id" value={data.category_id}
                    onChange={(e) =>
                        setFormData({
                            ...data,
                            category_id: Number(e.target.value)
                        })
                    }>
                    <option value="">Uncategorized</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" defaultValue={data.date ? data.date.split("T")[0] : ""}></input>
                <CancelButton action={handleCancel} />
                {isEditMode ? (<SaveButton />) : (<AddButton />)}
            </form>
        </>
    )
}

export default TransactionForm