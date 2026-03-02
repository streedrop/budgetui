import './TransactionItem.css'

function TransactionItem({ id, description, amount, category }) {
    return (
        <div className="transactionItem" key={id}>
            <p className="description">{description}</p>
            <p className="amount">{amount} $</p>
            <p className="category"><em>{category}</em></p>
        </div>
    );
}

export default TransactionItem
