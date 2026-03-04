import './styles/TransactionForm.css'

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategories } from '../categories/category.api';
import { fetchTransaction, insertTransaction, updateTransaction } from './transaction.api.js';

const emptyFormData = {
    description: "",
    is_expense: 1,
    amount: "",
    category_id: ""
};

function TransactionForm() {
    const { id } = useParams();                         // Current transaction ID
    const isEditMode = Boolean(id);                     // ID = editing, No ID = creating
    const [categories, setCategories] = useState([]);   // Category list
    const [data, setFormData] = useState(emptyFormData);    // Form data

    const navigate = useNavigate();

    // Populate category list
    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };

        loadCategories();
    });

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
            <form className="transactionForm" onSubmit={handleSubmit}>
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" defaultValue={data.description} />

                <label>Type: </label>
                <div className="type">
                    <div>
                        <input type="radio" id="expense" name="is_expense" value="1" defaultChecked={data.is_expense} />
                        <label htmlFor="expense">Expense</label>
                    </div>
                    <div>
                        <input type="radio" id="income" name="is_expense" value="0" defaultChecked={!data.is_expense} />
                        <label htmlFor="income">Income</label>
                    </div>
                </div>

                <label htmlFor="amount">Amount: </label>
                <input type="text" id="amount" name="amount" defaultValue={data.amount} />

                <label htmlFor="category">Category:</label>
                <select id="category" name="category" value={data.category_id}
                    onChange={(e) =>
                        setFormData({
                            ...data,
                            category_id: Number(e.target.value)
                        })
                    }>
                    <option value="">Select category</option>
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