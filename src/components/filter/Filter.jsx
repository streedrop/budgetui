import styles from './Filter.module.css'

import emptyFilters from '@/constants/EmptyFilters'

import Button from '@/components/buttons/Button';

function Filter({ filters, setFilters, date = true, amount = true }) {

    // The amount of filters shown
    const nb = [date, amount].filter(Boolean).length;

    if (nb == 0)
        return;

    return (
        <div className={styles.filters}>
            <h3 className={styles.title}>Filters</h3>
            <form className={`${styles.form} ${styles[`cols-${nb}`]}`}>
                {date && (
                    <div className={`${styles.filter} ${styles.date}`}>
                        <h4>Date range</h4>
                        <div className={styles.subForm}>
                            <div>
                                <input type="radio" id="yearly" name="dateType" value="1" />
                                <label for="yearly">Yearly</label>
                                <input type="radio" id="monthly" name="dateType" value="2" />
                                <label for="monthly">Monthly</label>
                                <input type="radio" id="custom" name="dateType" value="3" />
                                <label for="custom">Custom</label>
                            </div>
                            <div>
                                <label htmlFor="after">From: </label>
                                <input id="after" type="date" value={filters.after} onChange={evt => setFilters(prev => ({ ...prev, after: evt.target.value }))} />
                            </div>
                            <div>
                                <label htmlFor="before">To: </label>
                                <input id="before" type="date" value={filters.before} onChange={evt => setFilters(prev => ({ ...prev, before: evt.target.value }))} />
                            </div>
                        </div>
                    </div>
                )}
                {amount && (
                    <div className={`${styles.filter} ${styles.amount}`}>
                        <h4>Amount</h4>
                        <div className={styles.subForm}>
                            <div>
                                <label htmlFor="minAmount">From: </label>
                                <span>
                                    <input id="minAmount" type="number" step="any" min="0" value={filters.minAmount} onChange={evt => setFilters(prev => ({ ...prev, minAmount: evt.target.value }))} />
                                    $</span>
                            </div>
                            <div>
                                <label htmlFor="maxAmount">To: </label>
                                <span><input id="maxAmount" type="number" step="any" min="0" value={filters.maxAmount} onChange={evt => setFilters(prev => ({ ...prev, maxAmount: evt.target.value }))} />
                                    $</span>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`${styles.filter}`}>
                    <Button action={() => setFilters(emptyFilters)}>Reset</Button>
                </div>
            </form>
        </div>

    );
}

export default Filter