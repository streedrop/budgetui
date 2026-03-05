import './styles/CategoryList.css'

import CategoryItem from './CategoryItem.jsx';

import { useState, useEffect } from 'react';

function CategoryList({ categories, is_income, onDelete }) {
    const [sum, setSum] = useState(0);

  useEffect(() => {
    setSum(categories.reduce(((sum, category) => { return sum + Number(category.goal) }), 0));
  }, [categories]);

    return (
        <div className="categoryList">
            <div className="section">
                <h2>{is_income ? 'Income' : 'Expenses'}</h2>
                <h2>{sum.toFixed(2)} $ / month</h2>
            </div>
            {categories.map(category => (
                <CategoryItem key={category.id} category={category} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default CategoryList