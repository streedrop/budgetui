import './styles/TransactionItem.css'

import { useNavigate, Link } from 'react-router-dom';

function TransactionItem({ transaction, onDelete }) {

    const navigate = useNavigate();

    const goToEdit = () => {
        navigate(`/transactions/edit/${transaction.id}`);
    }

    return (
        <div className="transactionItem" key={transaction.id}>
            <p className="description"><b>{transaction.description}</b></p>
            <p className="amount">{transaction.amount} $</p>
            <div className="actions">
                <button type="button" className="edit" onClick={() => goToEdit()}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>
                <button type="button" className="delete" onClick={() => onDelete(transaction.id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
            </div>
            {transaction.category_name ?
                <Link to={`/categories/${transaction.category_id}`}>
                    <p className="category"><em>{transaction.category_name}</em></p>
                </Link>
                :
                <div></div>
            }
            <p className="date">{transaction.date.split("T")[0]}</p>
        </div>
    );
}

export default TransactionItem
