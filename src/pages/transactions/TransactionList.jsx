import './styles/TransactionList.css'

import TransactionItem from './TransactionItem'

function TransactionList({ transactions, onDelete}) {
    return (
        <div className="transactionList">
            {transactions.map(transaction => (
                <TransactionItem
                    key={transaction.id}
                    id={transaction.id}
                    description={transaction.description}
                    amount={transaction.amount}
                    category={transaction.category_name}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TransactionList