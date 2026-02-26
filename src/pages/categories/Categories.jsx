import { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem.jsx'
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Categories</h1>
      <Link to="/categories/new">Add a new category</Link>
      {categories.map(category => (
        <CategoryItem key={category.id} name={category.name} description={category.description} />
      ))}
    </div>
  );
}

export default Categories
