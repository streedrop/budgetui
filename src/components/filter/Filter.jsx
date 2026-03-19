import './Filter.css'

function Filter({ filters, setFilters, date = true, amount = true }) {

    // The amount of filters shown
    const nb = [date, amount].filter(Boolean).length;

    if(nb == 0)
        return;

    return (
        <div className="filters">
            <h3>Filters</h3>
            <form className={`cols-${nb}`}>
                {date && (
                    <fieldset id="date">
                        <legend>Date range</legend>
                        <label htmlFor="after">From: </label>
                        <input id="after" type="date" value={filters.after} onChange={evt => setFilters(prev => ({ ...prev, after: evt.target.value }))} />
                        <label htmlFor="before">To: </label>
                        <input id="before" type="date" value={filters.before} onChange={evt => setFilters(prev => ({ ...prev, before: evt.target.value }))} />
                    </fieldset>
                )}
                {amount && (
                    <fieldset id="amount">
                        <legend>Amount</legend>
                        <label htmlFor="minAmount">From: </label>
                        <div>
                            <input id="minAmount" type="number" step="any" min="0" value={filters.minAmount} onChange={evt => setFilters(prev => ({ ...prev, minAmount: evt.target.value }))} />
                            <span>$</span>
                        </div>
                        <label htmlFor="maxAmount">To: </label>
                        <div>
                            <input id="maxAmount" type="number" step="any" min="0" value={filters.maxAmount} onChange={evt => setFilters(prev => ({ ...prev, maxAmount: evt.target.value }))} />
                            <span>$</span>
                        </div>
                    </fieldset>
                )}
            </form>
        </div>

    );
}

export default Filter