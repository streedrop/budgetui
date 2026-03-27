import styles from './styles/BudgetForm.module.css';

import { useParams } from 'react-router-dom';

import { upsertBudget, deleteBudget } from '@/services/budget.api';
import { incrementMonth } from '@/utils/dateString';
import CancelButton from '../../components/buttons/CancelButton';
import SaveButton from '../../components/buttons/SaveButton';

function BudgetForm({ onCancel, onSuccess }) {
    const { id } = useParams(); // Current category ID

    async function handleSubmit(evt) {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        let month = data.from;
        const toDate = data.to;

        // If the budget amount is 0, delete the entries
        const isDelete = Number(data.budget) == 0;

        while (month <= toDate) {
            isDelete ? await deleteBudget(id, month) : await upsertBudget(id, month, { amount: data.budget });
            month = incrementMonth(month);
        }

        onSuccess();
    }

    return (
        <>
            <h2 className={styles.title}>Manage budget</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.dateRange}>
                    <p>Month range:</p>
                    <div >
                        <label htmlFor="from">From: </label>
                        <input type="month" id="from" name="from" />
                    </div>
                    <div>
                        <label htmlFor="to">To: </label>
                        <input
                            type="month"
                            id="to"
                            name="to"
                            min="2020-01"
                            max={`${new Date().getFullYear()}-12`}
                        />
                    </div>
                </div>
                <label className={styles.budget} htmlFor="budget">Monthly Budget: </label>
                <span className='amount-input'><input type="number" id="budget" name="budget" />$</span>
                <CancelButton action={onCancel} />
                <SaveButton />
            </form>
        </>
    );
}

export default BudgetForm