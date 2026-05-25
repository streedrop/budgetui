import styles from './styles/Budgets.module.css'
import { useTranslation } from 'react-i18next';

import { useBudgets } from '@/hooks/budgets/useBudgets';

import AddButton from '@/components/buttons/AddButton.jsx';
import { useNavigate } from 'react-router-dom';
import BudgetList from './BudgetList';

function Budgets() {
    const { t } = useTranslation();

    const { data: budgets = [] } = useBudgets();

    const navigate = useNavigate();

    return (
        <>
            <section>
                <h1>{t('budgets.title')}</h1>
                <p>{t('budgets.description')}</p>
                <div className={styles.actions}>
                    <AddButton action={() => navigate('/budgets/new')}>{t('budgets.add')}</AddButton>
                </div>
            </section>

            <BudgetList budgets={budgets} />
        </>
    )
}

export default Budgets