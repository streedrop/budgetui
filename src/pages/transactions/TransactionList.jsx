import styles from './styles/TransactionList.module.css';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDeleteTransaction } from '@/hooks/transactions/useDeleteTransaction.js';

import Modal from '@/components/modal/Modal.jsx';
import DeleteButton from '@/components/buttons/DeleteButton';
import Button from '@/components/buttons/Button';
import AddButton from '@/components/buttons/AddButton';
import FilterButton from '@/components/buttons/FilterButton';
import Empty from '@/components/empty/Empty';

import TransactionForm from './TransactionForm';
import TransactionItem from './TransactionItem';
import MoveOverlay from './moveOverlay/MoveOverlay';

function TransactionList({ transactions, deletable = true, onSelect = () => {}, editable = true, openFilters, category_id, preselected = [] }) {
    const { t } = useTranslation();

    const { mutate: deleteTransaction } = useDeleteTransaction();

    const [newTransactionModal, setNewTransactionModal] = useState(false);
    const [moveModal, setMoveModal] = useState(false);
    const [selected, setSelected] = useState(preselected);

    const whenSelected = (transaction) => {
        if(selected.some(t => t.id === transaction.id))
            setSelected(selected.filter(t => t.id !== transaction.id))
        else
            setSelected([...selected, transaction]);

        onSelect(transaction);
    }

    return (
        <section className={`${styles.container} ${transactions.length == 0 ? styles.empty : ''}`}>
            <div className={styles.title}>
                <h2>{t('transactions.list.title')}</h2>
                <div className={styles.actions}>
                    {editable && (
                        <>
                            <DeleteButton action={() => selected.forEach(t => deleteTransaction(t.id))} disabled={selected.length == 0}>{t('buttons.selected.delete')}</DeleteButton>
                            <Button action={() => setMoveModal(true)} disabled={selected.length == 0}>{t('buttons.selected.move')}</Button>
                            <MoveOverlay isOpen={moveModal} onClose={() => setMoveModal(false)} selected={selected} />
                        </>
                    )}
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
                            <div />
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
                                    onSelect={whenSelected}
                                    editable={editable}
                                    selected={selected}
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