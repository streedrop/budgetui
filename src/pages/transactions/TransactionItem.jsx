import styles from './styles/TransactionItem.module.css';

import { useNavigate, Link } from 'react-router-dom';

import { dateToMonthDay, dateToYear, amountFormatter } from '@/utils/formatters';

import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '@/components/buttons/EditButton';

function TransactionItem({ transaction, onDelete, onSelect, editable }) {

    const navigate = useNavigate();

    const goToEdit = () => {
        navigate(`/transactions/${transaction.id}/edit`);
    }

    const isCurrentYear = new Date().getFullYear() == new Date(transaction.date).getFullYear();

    return (
        <>
            <div className={`${styles.item} ${transaction.ignored ? styles.ignored : ''}`} key={transaction.id}>
                <p className={`${isCurrentYear && styles['no-year']}`}>{dateToMonthDay(transaction.date)}</p>
                <p className={styles.description}>{transaction.description}</p>

                {transaction.category_name ? (() => {
                    const p = <p className={`${transaction.category_id ? styles['with-link'] : styles.category}`}>{transaction.category_name}</p>;
                    return transaction.category_id
                        ? <Link className={styles.category} to={`/categories/${transaction.category_id}`}>{p}</Link>
                        : p;
                })() : (<div></div>)}

                <p className={styles.amount}>{transaction.is_income ? '+' : '-'}{amountFormatter(transaction.amount)}</p>
                <div className={styles.actions}>
                    {editable &&
                        (<EditButton action={goToEdit} />)
                    }

                    {onSelect &&
                        (<input type="checkbox" checked={!transaction.ignored} onChange={() => onSelect(transaction.id)} />)
                    }

                    {onDelete &&
                        (<DeleteButton action={() => onDelete(transaction.id)} />)
                    }

                </div>
                {
                    isCurrentYear ? (<div></div>) : (<p>{dateToYear(transaction.date)}</p>)
                }
            </div>
            <hr />
        </>
    );
}

export default TransactionItem
