import './styles/CategoryForm.css'

function CategoryForm({ onCancel }) {
    return (
        <form className="newCategory">
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" />
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" name="description" />
            <button type="button" className="cancel" onClick={onCancel}>Cancel</button>
            <button type="submit">Add</button>
        </form>
    );
}

export default CategoryForm