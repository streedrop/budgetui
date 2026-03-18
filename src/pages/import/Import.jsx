import './styles/Import.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { insertTransaction } from '@/services/transaction.api';
import { fetchCategories } from '@/services/category.api';
import { fetchKeywords } from '@/services/keyword.api';

import Modal from '@/components/modal/Modal.jsx';
import TransactionList from '@/pages/transactions/TransactionList';

function Import() {

    const [modalOpen, setModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const handleSubmit = async (evt) => {

        evt.preventDefault();
        const formData = new FormData(evt.target);

        // Files from form
        const files = formData.getAll('files').filter(f => f.size > 0);
        const texts = await Promise.all(files.map(f => f.text()));

        // Retrieve the categories that are already saved
        const categories = await fetchCategories();
        // Retrieve the keywords to match with categories
        const keywords = await fetchKeywords();

        let entries = [];

        if (texts.length > 0)
            entries = texts.flatMap(text => prepareTransactions(text, categories, keywords));
        else
            entries = prepareTransactions(Object.fromEntries(formData).text, categories, keywords);

        // Give every item an ID for react list keys to work
        entries = entries.map((entry, index) => ({ ...entry, id: index }));

        setTransactions(entries);
        setModalOpen(true);
    }

    const prepareTransactions = (data, categories, keywords) => {

        // Split CSV per row and per column
        let formatted = data.trim().split('\n').map((item) => { return item.split(',') });

        // Remove and save first row of the CSV, as it's the header
        const columns = formatted.shift();

        // Remove any empty row of the CSV
        formatted = formatted.filter((row) => { return row.length === columns.length });

        if (formatted.length == 0) return;

        // Find indexes for fields we need
        const dateIndex = columns.findIndex((value) => { return value.toLowerCase().includes("date") });
        const descriptionIndex = columns.findIndex((value) => { return value.toLowerCase().includes("name") });
        const amountIndex = columns.findIndex((value) => { return value.toLowerCase().includes("amount") });
        const memoIndex = columns.findIndex((value) => { return value.toLowerCase().includes("memo") });

        // Format entries that will be ready for the display and the database
        const entries = formatted.map(
            (item) => {
                // Tangerine Bank has a memo containing the category
                const categoryNameFromMemo = item[memoIndex].split("Category: ")[1];

                // Retrieve the category using the memo
                let category = categories.find((category) => category.name === categoryNameFromMemo);

                // If category wasn't found by name, try to find it through set keywords
                if (!category) {
                    const keyword = keywords.find((keyword) => keyword.keyword === categoryNameFromMemo);

                    if (keyword)
                        category = categories.find((category) => category.id === keyword.category_id);
                }

                // Create a transaction and set its attributes accordingly
                let newItem = {};
                newItem.amount = Number(item[amountIndex].replace("-", ""));
                newItem.description = item[descriptionIndex];
                newItem.date = new Date(item[dateIndex]).toISOString().split("T")[0];
                if (category) {
                    newItem.category_id = category.id;
                    newItem.category_name = category.name;
                }
                else {
                    newItem.category_id = null;
                    newItem.category_name = `Uncategorized (${categoryNameFromMemo ? categoryNameFromMemo : ''})`;
                }

                return newItem;
            }
        )

        return entries;
    }

    // Deleting a transaction means it won't be inserted
    const handleDelete = (id) => {
        setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    };

    // Actually insert the transactions in the database
    const insertTransactions = async () => {
        // Remove id (it's a fake one) and category name (we already have category ID) as those are just for display
        const data = transactions.map(({ id, category_name, ...rest }) => rest);
        await Promise.all(data.map(transaction => insertTransaction(transaction)));

        setModalOpen(false);
    }

    return (
        <div id="main">
            <h1>Import transactions</h1>
            <p>Import or paste CSV from Tangerine Bank in the area below to import your transactions.</p>
            <Link to="/import/keywords">Define keywords</Link>
            <div className="import">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="files">Select file(s):</label>
                    <input type="file" id="files" name="files" accept=".csv" multiple />
                    <label htmlFor="text">Or paste below:</label>
                    <textarea id="text" name="text"></textarea>
                    <button type="submit">Import</button>
                </form>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <p>The following transactions are going to be added:</p>
                <TransactionList transactions={transactions} onDelete={handleDelete} editable={false}></TransactionList>
                <button className="cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                <button className="save" type="button" onClick={insertTransactions}>Confirm</button>
            </Modal>


        </div>
    )
}

export default Import