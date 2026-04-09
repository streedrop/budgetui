import styles from './styles/TransactionList.module.css';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AddButton from '@/components/buttons/AddButton';
import FilterButton from '@/components/buttons/FilterButton';
import TransactionItem from './TransactionItem';

function TransactionList({ transactions, deletable = true, onSelect, editable = true, openFilters, category_id }) {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const goToAdd = () => {
        if (category_id)
            navigate(`/transactions/new?category=${category_id}`);
        else
            navigate('/transactions/new');
    }

    return (
        <div className={styles.list}>
            <div className={styles.title}>
                <h2>{t('transactions.list.title')}</h2>
                <div className={styles.actions}>
                    {openFilters && (
                        <FilterButton action={openFilters} />
                    )}
                    {editable && (
                        <AddButton action={goToAdd} />
                    )}
                </div>
            </div>
            {
                transactions.length > 0 ?
                    <>
                        <div className={styles.header}>
                            <h4 className={styles.date}>{t('transactions.list.header.date')}</h4>
                            <h4 className={styles.transaction}>{t('transactions.list.header.description')}</h4>
                            <h4 className={styles.category}>{t('transactions.list.header.category')}</h4>
                            <h4 className={styles.amount}>{t('transactions.list.header.amount')}</h4>
                            <h4 className={styles.actions}>{t('transactions.list.header.actions')}</h4>
                        </div>
                        {
                            transactions.map(transaction => (
                                <TransactionItem
                                    key={transaction.id}
                                    transaction={transaction}
                                    deletable={deletable}
                                    onSelect={onSelect}
                                    editable={editable}
                                />
                            ))}
                    </>
                    :
                    <div className={styles.empty}>
                        <i className="fa-regular fa-rectangle-xmark"></i>
                        <h3>{t('transactions.list.empty.title')}</h3>
                        <p>{t('transactions.list.empty.description')}</p>
                    </div>
            }
        </div>
    );
}

export default TransactionList