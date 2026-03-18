import './styles/TransactionList.css';

import { amountFormatter } from '@/utils/formatters';
import { groupTransactionsByMonth } from '@/utils/groupers';

import TransactionItem from './TransactionItem';

function TransactionList({ transactions, onDelete, editable = true }) {
    // group transactions by month for display
    const groupedByMonth = groupTransactionsByMonth(transactions);

    if (transactions.length == 0) return <div>No transactions to display.</div>;

    return (
        <div className="transactionList">
            <div className="header">
                <p className="date">Date</p>
                <p className="transaction">Transaction</p>
                <p className="amount">Amount</p>
                <p className="actions">Actions</p>
            </div>
            {Object.entries(groupedByMonth).map(([month, { sum, transactions }]) => (
                <div key={month}>
                    <div className="month">
                        <h2>{month}</h2>
                        <h2>{amountFormatter(sum)}</h2>
                    </div>

                    {
                        transactions.map(transaction => (
                            <TransactionItem
                                key={transaction.id}
                                transaction={transaction}
                                onDelete={onDelete}
                                editable={editable}
                            />
                        ))
                    }
                </div>
            ))}
        </div>
    );
}

export default TransactionList