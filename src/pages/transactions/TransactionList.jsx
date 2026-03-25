import styles from './styles/TransactionList.module.css';

import { useNavigate } from 'react-router-dom';

/*import { amountFormatter } from '@/utils/formatters';
import { groupTransactionsByMonth } from '@/utils/groupers';*/
import { useDeleteTransaction } from '@/hooks/rq/useDeleteTransaction.js';

import AddButton from '@/components/buttons/AddButton';
import FilterButton from '@/components/buttons/FilterButton';
import TransactionItem from './TransactionItem';

function TransactionList({ transactions, onDelete, onSelect, editable = true, openFilters }) {
    // group transactions by month for display
    /*const groupedByMonth = groupTransactionsByMonth(transactions);*/
    const { mutate } = useDeleteTransaction();

    const navigate = useNavigate();

    return (
        <div className={styles.list}>
            <div className={styles.title}>
                <h2>Transaction List</h2>
                <div className={styles.actions}>
                    {openFilters && (
                        <FilterButton action={() => { openFilters(true) }} />
                    )}
                    {editable && (
                        <AddButton action={() => navigate('/transactions/new')} />
                    )}
                </div>
            </div>
            {
                transactions.length > 0 ?
                    (
                        <>
                            <div className={styles.header}>
                                <h4 className={styles.date}>Date</h4>
                                <h4 className={styles.transaction}>Transaction</h4>
                                <h4 className={styles.category}>Category</h4>
                                <h4 className={styles.amount}>Amount</h4>
                                <h4 className={styles.actions}>Actions</h4>
                            </div>
                            {
                                transactions.map(transaction => (
                                    <TransactionItem
                                        key={transaction.id}
                                        transaction={transaction}
                                        onDelete={onDelete}
                                        onSelect={onSelect}
                                        editable={editable}
                                    />
                                ))}
                        </>
                    )
                    :
                    <div className={styles.noTransactions}>
                        <i className="fa-regular fa-rectangle-xmark"></i>
                        <h3>No transactions to display</h3>
                        <p>Try clearing your filters or adding more transactions.</p>
                    </div>
            }
        </div>
    );

    // Ordered by month:
    /*return (
        <div className={styles.list}>
            {Object.entries(groupedByMonth).map(([month, { sum, transactions }]) => (
                <div key={month}>
                    <div className={styles.month}>
                        <h2>{month}</h2>
                        <h2>{amountFormatter(sum)}</h2>
                    </div>
                    <div className={styles.header}>
                        <h4 className={styles.date}>Date</h4>
                        <h4 className={styles.transaction}>Transaction</h4>
                        <h4 className={styles.amount}>Amount</h4>
                        <h4 className={styles.actions}>Actions</h4>
                    </div>
                    {
                        transactions.map(transaction => (
                            <TransactionItem
                                key={transaction.id}
                                transaction={transaction}
                                onDelete={onDelete}
                                onSelect={onSelect}
                                editable={editable}
                            />
                        ))
                    }
                </div>
            ))}
        </div>
    );*/
}

export default TransactionList