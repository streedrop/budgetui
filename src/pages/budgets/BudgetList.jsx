import styles from './styles/BudgetList.module.css'

import BudgetItem from './BudgetItem.jsx';

import { useTranslation } from 'react-i18next';

import Empty from '@/components/empty/Empty.jsx';

function BudgetList({ budgets }) {
    const { t } = useTranslation();

    return (
        <section>
            <h2>{t('budgets.list.title')}</h2>
            {
                budgets.length > 0 ?
                    <>
                        <div className={styles.list}>
                            {budgets.map(budget => <BudgetItem key={budget.id} budget={budget} />)}
                        </div>
                    </>
                    :
                    <Empty item="budgets" />
            }
        </section>
    );
}

export default BudgetList