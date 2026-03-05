import { fetchCategories, deleteCategory } from './category.api.js';
import { deleteTransactionsByCategory } from '../transactions/transaction.api.js';

import CategoryList from './CategoryList.jsx'

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  const [sum, setSum] = useState(0);

  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setIncomeCategories(categories.filter(category => category.is_income == true));
    setExpenseCategories(categories.filter(category => category.is_income == false));
    setSum(categories.reduce(((sum, category) => {
      if (category.is_income)
        return sum + Number(category.goal)
      else
        return sum - Number(category.goal)
    }), 0));
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="main" className="categoriesOverview">
      <h1>Categories</h1>
      <Link to="/categories/new">Add a new category</Link>
      <h2>Income - Expenses: {sum} $ / month</h2>
      <CategoryList categories={incomeCategories} is_income={true} onDelete={handleDelete}></CategoryList>
      <CategoryList categories={expenseCategories} is_income={false} onDelete={handleDelete}></CategoryList>
    </div>
  );
}

export default Categories
