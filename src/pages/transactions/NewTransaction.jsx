import { insertTransaction } from './transaction.api';
import TransactionForm from './TransactionForm';

function NewTransaction() {

    async function handleSubmit(evt) {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        await insertTransaction(data);
    };

    return (
        <div id="main">
            <h1>New transaction</h1>
            <TransactionForm isEditMode={false} initialData={null} onSubmit={handleSubmit}></TransactionForm>
        </div>
    );
}

export default NewTransaction