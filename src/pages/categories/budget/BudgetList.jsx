import styles from './styles/BudgetList.module.css';
import { useTranslation } from 'react-i18next';

import { useState, useEffect } from 'react';

import { useDeleteBudget } from '@/hooks/budgets/useDeleteBudget.js';

import { dateToMonth, dateToNumericMonthYear, amountFormatter } from '@/utils/formatters';
import { groupBudgetsByYear } from '@/utils/groupers';

function BudgetList({ budgets, category_id }) {
    const { t } = useTranslation();

    const [grouped, setGrouped] = useState([]);
    const { mutate: deleteBudget } = useDeleteBudget();

    useEffect(() => {
        if(budgets)
            setGrouped(groupBudgetsByYear(budgets));
    }, [budgets]);

    if (!budgets)
        return (<p>Loading...</p>);

    if (budgets.length == 0)
        return (<p>{t('categories.page.budget.empty')}</p>);

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <div></div>
                {
                    Array.from({ length: 12 }, (_, i) =>
                        (<h3 key={i}>{new Date(2025, i, 1).toLocaleDateString("en-US", { month: "long" })}</h3>)
                    )
                }
            </div>
            {
                grouped.map(([year, budgets]) => (
                    <div key={year} className={styles.year}>
                        <h3>{year}</h3>
                        {budgets.map(budget => (
                            <div className={styles.month} key={dateToMonth(budget.month)}>
                                {budget.amount !== null
                                    ? <>
                                        <p>{amountFormatter(budget.amount)}</p>
                                        <button type="button" className="delete" onClick={() => deleteBudget({id: category_id, month: dateToNumericMonthYear(budget.month)})}><i className="fa-regular fa-circle-xmark fa-m"></i></button>
                                    </>
                                    : <><p>—</p></>
                                }
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    );
}

export default BudgetList