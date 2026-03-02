import './styles/TransactionForm.css'

function TransactionForm({ categories, onCancel }) {
    return (
        <form className="newTransaction">
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" name="description" />
            <label htmlFor="amount">Amount: </label>
            <input type="text" id="amount" name="amount" />
            <label htmlFor="category">Category:</label>
            <select id="category" name="category">
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button type="button" className="cancel" onClick={onCancel}>Cancel</button>
            <button type="submit">Add</button>
        </form>
    )
}

export default TransactionForm