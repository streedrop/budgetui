import './styles/TransactionForm.css'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../categories/category.api';

const emptyFormData = {
    description: "",
    amount: "",
    category_id: ""
};

function TransactionForm({ isEditMode, initialData, onSubmit }) {

    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(emptyFormData);

    useEffect(() => {
        if (initialData)
            setData(initialData);
    }, [initialData]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories(); // fetchCategories returns res.json()
            setCategories(data);
        };

        loadCategories();
    });

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/transactions');
    }

    return (
        <form className="newTransaction" onSubmit={onSubmit}>
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" name="description" defaultValue={data.description} />
            <label htmlFor="amount">Amount: </label>
            <input type="text" id="amount" name="amount" defaultValue={data.amount} />
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" value={data.category_id}
                onChange={(e) =>
                    setData({
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
            <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
            <button className="save" type="submit">{isEditMode ? 'Save' : 'Add'}</button>
        </form>
    )
}

export default TransactionForm