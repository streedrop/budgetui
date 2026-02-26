import './NewCategory.css'

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
        <div className="newCategory">
            <h1>New category</h1>
            <form>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" />
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" />
                <button type="button" id="cancel" onClick={handleCancel}>Cancel</button>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default NewCategory