import CategoryItem from './CategoryItem.jsx';

function CategoryList({ categories, is_income }) {

    return (
        <div>
            <h2>{is_income ? 'Income' : 'Expenses'}</h2>
            {categories.map(category => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    );
}

export default CategoryList