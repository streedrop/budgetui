import { useNavigate } from 'react-router-dom';

import { useCategories } from '@/hooks/useCategories.js';
import { deleteCategory } from '@/services/category.api.js';

import AddButton from '@/components/buttons/AddButton.jsx';
import CategoryList from './CategoryList.jsx';
import CategoryItem from './CategoryItem.jsx';

function Categories() {
  const { categories, setCategories } = useCategories();

  const handleDelete = async (id) => {

    if (!confirm("Are you sure you want to delete this category and all its transactions?"))
      return;

    res = await deleteCategory(id);
    if (!res.ok) return;

    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const navigate = useNavigate();

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error}</p>;

  if (categories.length == 0)
    return (<p>No categories to display.</p>)

  return (
    <>
      <h1>Categories</h1>
      <section>
        <p>Arrange your transactions into categories to set goals, see graphs and notice what could be improved.</p>
        <AddButton action={() => navigate('/categories/new')}>Add category</AddButton>
      </section>
      {categories.find(c => c.is_income == null).is_income == 0 && (
        <div>
          <CategoryItem category={categories.find(c => c.is_income == null)} onDelete={handleDelete}></CategoryItem>
        </div>
      )}
      <CategoryList categories={categories.filter(c => c.is_income == true)} is_income={true} onDelete={handleDelete}></CategoryList>
      <CategoryList categories={categories.filter(c => c.is_income == false)} is_income={false} onDelete={handleDelete}></CategoryList>
    </>
  );
}

export default Categories
