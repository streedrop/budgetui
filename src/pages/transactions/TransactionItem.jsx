import './TransactionItem.css'

function TransactionItem({ id, description, amount }) {
    return (
        <div className="transactionItem" key={id}>
            <p>{description}</p>
            <p>{amount} $</p>
        </div>
    );
}

export default TransactionItem
