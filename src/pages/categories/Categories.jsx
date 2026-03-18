import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useCategories } from '@/hooks/useCategories.js';
import { deleteCategory } from '@/services/category.api.js';
import { deleteTransactionsByCategory } from '@/services/transaction.api.js';

import CategoryList from './CategoryList.jsx';
import CategoryItem from './CategoryItem.jsx';

function Categories() {
  const { categories, setCategories } = useCategories();

  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  useEffect(() => {
    setIncomeCategories(categories.filter(category => category.is_income == true));
    setExpenseCategories(categories.filter(category => category.is_income == false));
  }, [categories]);

  const handleDelete = async (id) => {

    if (!confirm("Are you sure you want to delete this category and all its transactions?"))
      return;

    let res = await deleteTransactionsByCategory(id);
    if (!res.ok) return;

    res = await deleteCategory(id);
    if (!res.ok) return;

    setCategories(prev => prev.filter(category => category.id !== id));
  };

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error}</p>;

  return (
    <div id="main" className="categoriesOverview">
      <h1>Categories</h1>
      <Link to="/categories/new">Add a new category</Link>
      <div className="categoryList">
        <CategoryItem onDelete={handleDelete}></CategoryItem>
      </div>
      <CategoryList categories={incomeCategories} is_income={true} onDelete={handleDelete}></CategoryList>
      <CategoryList categories={expenseCategories} is_income={false} onDelete={handleDelete}></CategoryList>
    </div>
  );
}

export default Categories
