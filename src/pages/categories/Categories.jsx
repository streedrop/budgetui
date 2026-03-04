import { fetchCategories, deleteCategory } from './category.api.js';
import { deleteTransactionsByCategory } from '../transactions/transaction.api.js';

import CategoryList from './CategoryList.jsx'

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDelete = async (id) => {

    if(!confirm("Are you sure you want to delete this category and all its transactions?"))
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
    <div id="main">
      <h1>Categories</h1>
      <Link to="/categories/new">Add a new category</Link>
      <CategoryList categories={categories} onDelete={handleDelete}></CategoryList>
    </div>
  );
}

export default Categories
