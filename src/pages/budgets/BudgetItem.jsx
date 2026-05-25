import styles from './styles/BudgetItem.module.css';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { dateToMonthYear } from '@/utils/formatters.js'

function BudgetItem({ budget }) {
    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <div className={styles.item} key={budget.id}>
            <p>{budget.category_id}</p>
            <p>{dateToMonthYear(budget.month)}</p>
            <p>{budget.amount}</p>
        </div>
    );
}

export default BudgetItem