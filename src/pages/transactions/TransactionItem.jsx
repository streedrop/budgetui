import './styles/TransactionItem.css'

import { useNavigate, Link } from 'react-router-dom';

function TransactionItem({ transaction, onDelete, editable }) {

    const navigate = useNavigate();

    const goToEdit = () => {
        navigate(`/transactions/edit/${transaction.id}`);
    }

    return (
        <div className="transactionItem" key={transaction.id}>
            <p className="description"><b>{transaction.description}</b></p>
            <p className="amount">{transaction.is_income ? '+' : '-'}{Number(transaction.amount).toFixed(2)} $</p>
            <div className="actions">
                {editable &&
                    (<button type="button" className="edit" onClick={() => goToEdit()}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>)
                }

                {onDelete &&
                    (<button type="button" className="delete" onClick={() => onDelete(transaction.id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>)
                }
            </div>
            {transaction.category_name ? (() => {
                const p = <p className={`category ${transaction.category_id ? "with-link" : ""}`}><em>{transaction.category_name}</em></p>;
                return transaction.category_id
                    ? <Link to={`/categories/${transaction.category_id}`}>{p}</Link>
                    : p;
            })() : (<div></div>)}
            <p className="date">{transaction.date.split("T")[0]}</p>
        </div>
    );
}

export default TransactionItem
