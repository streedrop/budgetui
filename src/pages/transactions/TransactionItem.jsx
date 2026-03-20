import styles from './styles/TransactionItem.module.css';

import { useNavigate, Link } from 'react-router-dom';

import { dateToMonthDay, dateToYear, amountFormatter } from '@/utils/formatters';

function TransactionItem({ transaction, onDelete, onSelect, editable }) {

    const navigate = useNavigate();

    const goToEdit = () => {
        navigate(`/transactions/${transaction.id}/edit`);
    }

    const isCurrentYear = new Date().getFullYear() == new Date(transaction.date).getFullYear();

    return (
        <div className={`${styles.item} ${transaction.ignored ? styles.ignored : ''}`} key={transaction.id}>
            <p className={styles.date}>{dateToMonthDay(transaction.date)}</p>
            <p className={styles.description}><b>{transaction.description}</b></p>
            <p className={styles.amount}>{transaction.is_income ? '+' : '-'}{amountFormatter(transaction.amount)}</p>
            <div className={styles.actions}>
                {editable &&
                    (<button type="button" className="edit" onClick={() => goToEdit()}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>)
                }

                {onSelect &&
                    (<input type="checkbox" checked={!transaction.ignored} onChange={() => onSelect(transaction.id)} />)
                }

                {onDelete &&
                    (<button type="button" className="delete" onClick={() => onDelete(transaction.id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>)
                }

            </div>
            {
                isCurrentYear ? (<div></div>) : (<p>{dateToYear(transaction.date)}</p>)
            }
            {transaction.category_name ? (() => {
                const p = <p className={`${styles.category} ${transaction.category_id ? styles['with-link'] : ""}`}><em>{transaction.category_name}</em></p>;
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
