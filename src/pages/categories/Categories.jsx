import { fetchCategories, deleteCategory } from './category.api.js';

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
    const res = await deleteCategory(id);
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
