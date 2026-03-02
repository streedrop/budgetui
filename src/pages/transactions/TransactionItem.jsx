import './styles/TransactionItem.css'

function TransactionItem({ id, description, amount, category, onDelete }) {
    return (
        <div className="transactionItem" key={id}>
            <p className="description">{description}</p>
            <p className="amount">{amount} $</p>
            <button type="button" className="delete" onClick={() => onDelete(id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
            <p className="category"><em>{category}</em></p>

        </div>
    );
}

export default TransactionItem
