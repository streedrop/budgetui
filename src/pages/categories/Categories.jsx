import { useNavigate } from 'react-router-dom';

import { useCategories } from '@/hooks/categories/useCategories';

import AddButton from '@/components/buttons/AddButton.jsx';
import CategoryList from './CategoryList.jsx';
import CategoryItem from './CategoryItem.jsx';

function Categories() {
  const { data: categories } = useCategories();

  const navigate = useNavigate();

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error}</p>;

  if (!categories || categories.length == 0)
    return (<p>No categories to display.</p>)

  return (
    <>
      <h1>Categories</h1>
      <section>
        <p>Arrange your transactions into categories to set goals, see graphs and notice what could be improved.</p>
        <AddButton action={() => navigate('/categories/new')}>Add category</AddButton>
      </section>
      <CategoryList categories={categories.filter(c => c.is_income == true)} is_income={true}></CategoryList>
      <CategoryList categories={categories.filter(c => c.is_income == false)} is_income={false}></CategoryList>
      {categories.find(c => c.is_income == null) && (
        <div>
          <h2>Uncategorized</h2>
          <CategoryItem category={categories.find(c => c.is_income == null)}></CategoryItem>
        </div>
      )}
    </>
  );
}

export default Categories
