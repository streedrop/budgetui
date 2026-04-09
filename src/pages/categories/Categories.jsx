import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCategories } from '@/hooks/categories/useCategories';

import AddButton from '@/components/buttons/AddButton.jsx';
import CategoryList from './CategoryList.jsx';
import CategoryItem from './CategoryItem.jsx';

function Categories() {
  const { t } = useTranslation();

  const { data: categories } = useCategories();

  const navigate = useNavigate();

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error}</p>;

  if (!categories || categories.length == 0)
    return (
      <div>
        <h2>{t('categories.list.empty.title')}</h2>
        <p>{t('categories.list.empty.description')}</p>
      </div>
    )

    console.log(categories)

  return (
    <>
      <h1>{t('categories.title')}</h1>
      <section>
        <p>{t('categories.description')}</p>
        <AddButton action={() => navigate('/categories/new')}>{t('categories.add')}</AddButton>
      </section>
      <CategoryList categories={categories.filter(c => c.is_income == true)} is_income={true}></CategoryList>
      <CategoryList categories={categories.filter(c => c.is_income == false)} is_income={false}></CategoryList>
      {categories.find(c => c.is_income == null) && (
        <div>
          <h2>{t('categories.uncategorized')}</h2>
          <CategoryItem category={categories.find(c => c.is_income == null)}></CategoryItem>
        </div>
      )}
    </>
  );
}

export default Categories
