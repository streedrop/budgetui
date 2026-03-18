import './styles/TransactionItem.css';

import { useNavigate, Link } from 'react-router-dom';

import { amountFormatter } from '@/utils/formatters';

function TransactionItem({ transaction, onDelete, editable }) {

    const navigate = useNavigate();

    const goToEdit = () => {
        navigate(`/transactions/${transaction.id}/edit`);
    }

    const dateObject = new Date(transaction.date);

    const formattedDate = dateObject.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    });

    const year = dateObject.toLocaleDateString("en-US", {
        year: "numeric"
    });

    const isCurrentYear = new Date().getFullYear() == dateObject.getFullYear();

    return (
        <div className="transactionItem" key={transaction.id}>
            <p className="date">{formattedDate}</p>
            <p className="description"><b>{transaction.description}</b></p>
            <p className="amount">{transaction.is_income ? '+' : '-'}{amountFormatter(transaction.amount)}</p>
            <div className="actions">
                {editable &&
                    (<button type="button" className="edit" onClick={() => goToEdit()}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>)
                }

                {onDelete &&
                    (<button type="button" className="delete" onClick={() => onDelete(transaction.id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>)
                }
            </div>
            {
                isCurrentYear ? (<div></div>) : (<p>{year}</p>)
            }
            {transaction.category_name ? (() => {
                const p = <p className={`category ${transaction.category_id ? "with-link" : ""}`}><em>{transaction.category_name}</em></p>;
                return transaction.category_id
                    ? <Link to={`/categories/${transaction.category_id}`}>{p}</Link>
                    : p;
            })() : (<div></div>)}
            <div></div>
            <hr />
        </div>
    );
}

export default TransactionItem
