import './styles/CategoryForm.css'

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategory, insertCategory, updateCategory } from './category.api';

const emptyFormData = {
    name: "",
    description: "",
    is_income: 0
};

function CategoryForm() {
    const { id } = useParams();                         // Current transaction ID
    const isEditMode = Boolean(id);                     // ID = editing, No ID = creating
    const [data, setFormData] = useState(emptyFormData);    // Form data

    const navigate = useNavigate();

    // Fetch the category & pre-fill form
    useEffect(() => {
        if (!isEditMode) return;

        async function loadCategory() {
            const data = await fetchCategory(id);
            setFormData(data);
        }

        loadCategory();
    }, [id]);

    // Add / Save button
    async function handleSubmit(evt) {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        if (isEditMode)
            await updateCategory(id, data);
        else
            await insertCategory(data);

        navigate('/categories');
    };

    // Cancel button
    const handleCancel = () => {
        navigate('/categories');
    }

    return (
        <div id="main">
            <h1>{isEditMode ? 'Edit category' : 'New category'}</h1>
            <form className="categoryForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" defaultValue={data.name} />
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" defaultValue={data.description} />
                <label>Type: </label>
                <div className="type">
                    <div>
                        <input type="radio" id="expense" name="is_income" value="0" defaultChecked={!data.is_income} />
                        <label htmlFor="expense">Expenses</label>
                    </div>
                    <div>
                        <input type="radio" id="income" name="is_income" value="1" defaultChecked={data.is_income} />
                        <label htmlFor="income">Income</label>
                    </div>
                </div>
                <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="save">{isEditMode ? 'Save' : 'Add'}</button>
            </form>
        </div>
    );
}

export default CategoryForm