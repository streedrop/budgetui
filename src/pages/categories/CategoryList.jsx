import styles from './styles/CategoryList.module.css';

import CategoryItem from './CategoryItem.jsx';

function CategoryList({ categories, is_income, onDelete }) {

    return (
        <div className={styles.list}>
            <h2>{is_income ? 'Income' : 'Expenses'}</h2>
            {categories.map(category => (
                <CategoryItem key={category.id} category={category} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default CategoryList