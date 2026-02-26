import './NewTransaction.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function NewTransaction() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data));

        const form = document.querySelector('form');

        const handleSubmit = async (evt) => {
            evt.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('http://localhost:3000/api/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Success:', result);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        form.addEventListener('submit', handleSubmit);

        // Cleanup: remove listener when component unmounts
        return () => {
            form.removeEventListener('submit', handleSubmit);
        };
    }, []);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/transactions');
    }

    return (
        <div className="newTransaction">
            <h1>New transaction</h1>
            <form>
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" />
                <label htmlFor="amount">Amount: </label>
                <input type="text" id="amount" name="amount" />
                <label htmlFor="category">Category:</label>
                <select id="category" name="category">
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button type="button" id="cancel" onClick={handleCancel}>Cancel</button>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default NewTransaction