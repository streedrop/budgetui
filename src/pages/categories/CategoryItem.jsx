import './styles/CategoryItem.css'

function CategoryItem({ id, name, description, onDelete }) {

    return (
        <div className="categoryItem" key={id}>
            <p>{name}</p>
            <p>{description}</p>
            <button type="button" className="delete" onClick={() => onDelete(id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
        </div>
    );
}

export default CategoryItem
