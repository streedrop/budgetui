import './styles/CategoryList.css'

import CategoryItem from './CategoryItem.jsx';

function CategoryList({ categories, is_income, onDelete }) {

    return (
        <div className="categoryList">
            <div className="section">
                <h2>{is_income ? 'Income' : 'Expenses'}</h2>
            </div>
            {categories.map(category => (
                <CategoryItem key={category.id} category={category} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default CategoryList