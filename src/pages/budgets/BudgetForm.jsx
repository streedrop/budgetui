import styles from './styles/BudgetList.module.css'

import BudgetItem from './BudgetItem.jsx';

import { useTranslation } from 'react-i18next';

import Empty from '@/components/empty/Empty.jsx';

function BudgetForm() {
    const { t } = useTranslation();

    return (
        <section>
            <h2>{t('budgets.form.title')}</h2>
        </section>
    );
}

export default BudgetForm