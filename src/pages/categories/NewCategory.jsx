import CategoryForm from './CategoryForm.jsx'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function NewCategory() {
    useEffect(() => {
        const form = document.querySelector('form');

        const handleSubmit = async (evt) => {
            evt.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('/api/categories', {
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
        navigate('/categories');
    }

    return (
        <div id="main">
            <h1>New category</h1>
            <CategoryForm onCancel={handleCancel}></CategoryForm>
        </div>
    );
}

export default NewCategory