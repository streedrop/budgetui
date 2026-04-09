import styles from './styles/Import.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { insertTransaction } from '@/services/transaction.api';
import { useCategories } from '@/hooks/categories/useCategories';
import { useRules } from '@/hooks/rules/useRules';

import { prepareTransactions } from './helpers';

import Modal from '@/components/modal/Modal.jsx';

import Button from '@/components/buttons/Button';
import CancelButton from '@/components/buttons/CancelButton';
import ConfirmButton from '@/components/buttons/ConfirmButton';
import TransactionList from '@/pages/transactions/TransactionList';


function Import() {
    const { t } = useTranslation();

    const [modalOpen, setModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const { data: categories = [] } = useCategories();
    const { data: rules = [] } = useRules();

    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);

        // Files from form
        const files = formData.getAll('files').filter(f => f.size > 0);
        const texts = await Promise.all(files.map(f => f.text()));

        // Prepare all the transactions, and give every item an ID for react list keys to work
        const entries = texts.flatMap(text => prepareTransactions(text), categories, rules)
            .map((entry, index) => ({ ...entry, id: index }));

        setTransactions(entries);

        setModalOpen(true);
    }

    // Remove a transaction from the list entirely
    const handleDelete = (id) => {
        setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    };

    // Dim down a transaction so it won't be added
    const handleSelect = (id) => {
        // Toggle the new ignored val
        setTransactions(prev => prev.map(item => item.id === id ? { ...item, ignored: !item.ignored } : item));
    };

    // Actually insert the transactions in the database
    const insertTransactions = async () => {
        // Remove id (it's a fake one) and category name (we already have category ID) as those are just for display
        const data = transactions.filter((item) => item.ignored == false).map(({ id, category_name, ignored, ...rest }) => rest);
        await Promise.all(data.map(transaction => insertTransaction(transaction)));

        setModalOpen(false);
    }

    return (
        <>
            <h1>{t('import.title')}</h1>
            <p>{t('import.description')}</p>
            <Button className={styles.rules} action={() => navigate('/import/rules')}>{t('import.openRules')}</Button>
            <div>
                <form className={styles.import} onSubmit={handleSubmit}>
                    <label htmlFor="files">{t('import.file')}</label>
                    <input type="file" id="files" name="files" accept=".csv" multiple />
                    <Button type="submit">{t('import.import')}</Button>
                </form>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>{t('import.confirm.title')}</h2>
                <p>{t('import.confirm.description')}</p>
                <TransactionList transactions={transactions} deletable={false} onSelect={handleSelect} editable={false}></TransactionList>
                <div className={styles.buttons}>
                    <CancelButton action={() => setModalOpen(false)} />
                    <ConfirmButton action={insertTransactions} />
                </div>
            </Modal>


        </>
    )
}

export default Import