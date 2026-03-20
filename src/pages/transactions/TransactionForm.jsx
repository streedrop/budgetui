import styles from './styles/TransactionForm.module.css';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useCategories } from '@/hooks/useCategories.js';
import { fetchTransaction, insertTransaction, updateTransaction } from '@/services/transaction.api.js';

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

    const navigate = useNavigate();

    // Fetch the transaction & pre-fill form
    useEffect(() => {
        if (!isEditMode) return;

        async function loadTransaction() {
            const data = await fetchTransaction(id);
            setFormData(data);
        }

        loadTransaction();
    }, [id]);

    // Add / Save button
    async function handleSubmit(evt) {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        if(data.category_id === "")
            data.category_id = null;

        if (isEditMode)
            await updateTransaction(id, data);
        else
            await insertTransaction(data);

        navigate('/transactions');
    };

    // Cancel button
    const handleCancel = () => {
        navigate('/transactions');
    }

    return (
        <div id="main">
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
                <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                <button className="save" type="submit">{isEditMode ? 'Save' : 'Add'}</button>
            </form>
        </div>
    )
}

export default TransactionForm