import './CategoryItem.css'

function CategoryItem({ id, name, description }) {
    return (
        <div className="categoryItem" key={id}>
            <p>{name}</p>
            <p>{description}</p>

        </div>
    );
}

export default CategoryItem
