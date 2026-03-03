import TransactionForm from './TransactionForm';

import { fetchTransaction, updateTransaction } from './transaction.api.js';

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


function EditTransaction() {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        async function loadTransaction() {
            const data = await fetchTransaction(id);
            setFormData(data);
        }

        loadTransaction();
    }, [id]);


    async function handleSubmit(evt) {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        await updateTransaction(id, data);
    };

    if (!formData)
        return <div>Loading...</div>;

    return (
        <div id="main">
            <h1>Edit transaction</h1>
            <TransactionForm isEditMode={true} initialData={formData} onSubmit={handleSubmit}></TransactionForm>
        </div>
    )
}

export default EditTransaction