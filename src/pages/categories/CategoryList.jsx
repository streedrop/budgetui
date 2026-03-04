import './styles/CategoryList.css'

import CategoryItem from './CategoryItem.jsx'

function CategoryList({ categories, onDelete }) {

    return (
        <div className="categoryList">
            {categories.map(category => (
                <CategoryItem key={category.id} category={category} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default CategoryList