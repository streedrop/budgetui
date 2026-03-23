import styles from './styles/TransactionList.module.css';

import { useNavigate } from 'react-router-dom';

/*import { amountFormatter } from '@/utils/formatters';*/
import { groupTransactionsByMonth } from '@/utils/groupers';

import AddButton from '@/components/buttons/AddButton';
import TransactionItem from './TransactionItem';

function TransactionList({ transactions, onDelete, onSelect, editable = true }) {
    // group transactions by month for display
    /*const groupedByMonth = groupTransactionsByMonth(transactions);*/

    const navigate = useNavigate();

    if (transactions.length == 0) return <div>No transactions to display.</div>;

    return (
        <div className={styles.list}>
            <div className={styles.title}>
                <h2>Transaction List</h2>
                {editable && (
                    <AddButton action={() => navigate('/transactions/new')} />
                )}
            </div>
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
                ))
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