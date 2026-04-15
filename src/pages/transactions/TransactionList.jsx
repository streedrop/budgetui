import styles from './styles/TransactionList.module.css';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '@/components/modal/Modal.jsx';
import AddButton from '@/components/buttons/AddButton';
import FilterButton from '@/components/buttons/FilterButton';
import Empty from '@/components/empty/Empty';

import TransactionForm from './TransactionForm';
import TransactionItem from './TransactionItem';

function TransactionList({ transactions, deletable = true, onSelect, editable = true, openFilters, category_id }) {
    const { t } = useTranslation();

    const [newTransactionModal, setNewTransactionModal] = useState(false);

    return (
        <section className={`${styles.container} ${transactions.length == 0 ? styles.empty : ''}`}>
            <div className={styles.title}>
                <h2>{t('transactions.list.title')}</h2>
                <div className={styles.actions}>
                    {openFilters && (
                        <FilterButton action={openFilters} />
                    )}
                    {editable && (
                        <AddButton action={() => setNewTransactionModal(true)} />
                    )}
                </div>
            </div>
            {
                transactions.length > 0 ?
                    <div className={styles.list}>
                        <div className={styles.header}>
                            <h4 className={styles.date}>{t('transactions.list.header.date')}</h4>
                            <h4 className={styles.transaction}>{t('transactions.list.header.description')}</h4>
                            <h4 className={styles.category}>{t('transactions.list.header.category')}</h4>
                            <h4 className={styles.amount}>{t('transactions.list.header.amount')}</h4>
                            <h4 className={styles.actions}>{t('transactions.list.header.actions')}</h4>
                        </div>
                        {
                            transactions.map(transaction => (
                                <TransactionItem
                                    key={transaction.id}
                                    transaction={transaction}
                                    deletable={deletable}
                                    onSelect={onSelect}
                                    editable={editable}
                                />
                            ))}
                    </div>
                    :
                    <Empty item="transactions" />
            }
            <Modal isOpen={newTransactionModal} onClose={() => setNewTransactionModal(false)}>
                <TransactionForm closeModal={() => setNewTransactionModal(false)} category_id={category_id} />
            </Modal>
        </section>
    );
}

export default TransactionList