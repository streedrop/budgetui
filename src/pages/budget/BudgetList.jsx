import './styles/BudgetList.css';

import { useState, useEffect } from 'react';

import { dateToMonth, amountFormatter } from '@/utils/formatters';
import { groupBudgetsByYear } from '@/utils/groupers';

function BudgetList({ budgets, onDelete }) {

    const [grouped, setGrouped] = useState([]);

    useEffect(() => {
        setGrouped(groupBudgetsByYear(budgets));
    }, [budgets]);

    if (!budgets)
        return (<p>Loading...</p>);

    if (budgets.length == 0)
        return (<p>No budget to display.</p>);

    return (
        <div className="budgetList">
            <div className="header">
                <div></div>
                {
                    Array.from({ length: 12 }, (_, i) =>
                        (<h3 key={i}>{new Date(2025, i, 1).toLocaleDateString("en-US", { month: "long" })}</h3>)
                    )
                }
            </div>
            {
                grouped.map(([year, budgets]) => (
                    <div key={year} className="year">
                        <h3>{year}</h3>
                        {budgets.map(budget => (
                            <div className="month" key={dateToMonth(budget.month)}>
                                {budget.amount !== null
                                    ? <>
                                        <p>{amountFormatter(budget.amount)}</p>
                                        <button type="button" className="delete" onClick={() => onDelete(budget.month)}><i className="fa-regular fa-circle-xmark fa-m"></i></button>
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