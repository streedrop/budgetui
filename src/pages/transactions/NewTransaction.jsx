import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TransactionForm from './TransactionForm';
import { fetchCategories } from '../categories/category.api';

function NewTransaction() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories(); // fetchCategories returns res.json()
            setCategories(data);
        };

        loadCategories();

        const form = document.querySelector('form');

        const handleSubmit = async (evt) => {
            evt.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('/api/transactions', {
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
        <div id="main">
            <h1>New transaction</h1>
            <TransactionForm categories={categories} onCancel={handleCancel}></TransactionForm>
        </div>
    );
}

export default NewTransaction