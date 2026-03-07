import './styles/Import.css'

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { insertTransaction } from '../transactions/transaction.api'
import { fetchCategories } from '../categories/category.api'
import { fetchKeywords } from './keyword.api'
import TransactionList from '../transactions/TransactionList';

import Modal from '../../components/modal/Modal.jsx'

function Import() {

    const [modalOpen, setModalOpen] = useState(false);
    const [transactionsToDisplay, setTransactionsToDisplay] = useState([]);

    const prepareTransactions = async (evt) => {
        evt.preventDefault();

        const formData = new FormData(evt.target);

        // Split CSV per row
        const data = Object.fromEntries(formData).import.trim().split('\n');

        // Split CSV per column
        let formatted = data.map((item) => { return item.split(',') });

        // Remove and save first row of the CSV, as it's the header
        const columns = formatted.shift();

        // Remove any empty row of the CSV
        formatted = formatted.filter((row) => { return row.length === columns.length });

        if (formatted.length == 0) return;

        // Retrieve the categories that are already saved
        const categories = await fetchCategories();
        // Retrieve the keywords to match with categories
        const keywords = await fetchKeywords();

        // Find indexes for fields we need
        const dateIndex = columns.findIndex((value) => { return value.toLowerCase().includes("date") });
        const descriptionIndex = columns.findIndex((value) => { return value.toLowerCase().includes("name") });
        const amountIndex = columns.findIndex((value) => { return value.toLowerCase().includes("amount") });
        const memoIndex = columns.findIndex((value) => { return value.toLowerCase().includes("memo") });

        // Format entries that will be ready for the display and the database
        const entries = formatted.map(
            (item, index) => {
                // Tangerine Bank has a memo containing the category
                const categoryNameFromMemo = item[memoIndex].split("Category: ")[1];

                // Retrieve the category using the memo
                let category = categories.find((category) =>  category.name === categoryNameFromMemo );
                
                // If category wasn't found by name, try to find it through set keywords
                if(!category)
                {
                    const keyword = keywords.find((keyword) => keyword.keyword === categoryNameFromMemo);

                    if(keyword)
                        category = categories.find((category) =>  category.id === keyword.category_id );
                }

                // Create a transaction and set its attributes accordingly
                let newItem = {};
                newItem.id = index;
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

        setTransactionsToDisplay(entries);
        setModalOpen(true);
    }

    // Deleting a transaction means it won't be inserted
    const handleDelete = (id) => {
        setTransactionsToDisplay(prev => prev.filter(transaction => transaction.id !== id));
    };

    // Actually insert the transactions in the database
    const insertTransactions = async () => {
        // Remove id (it's a fake one) and category name (we already have category ID) as those are just for display
        const transactionsToInsert = transactionsToDisplay.map(({ id, category_name, ...rest }) => rest);
        await Promise.all(transactionsToInsert.map(transaction => insertTransaction(transaction)));

        setModalOpen(false);
    }

    return (
        <div id="main">
            <h1>Import transactions</h1>
            <p>Paste CSV from Tangerine Bank in the area below to import your transactions.</p>
            <Link to="/import/keywords">Define keywords</Link>
            <div className="import">
                <form onSubmit={prepareTransactions}>
                    <textarea id="import" name="import"></textarea>
                    <button type="submit">Import</button>
                </form>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <p>The following transactions are going to be added:</p>
                <TransactionList transactions={transactionsToDisplay} onDelete={handleDelete} editable={false}></TransactionList>
                <button className="cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                <button className="save" type="button" onClick={insertTransactions}>Confirm</button>
            </Modal>


        </div>
    )
}

export default Import