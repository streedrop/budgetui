import styles from './styles/Categories.module.css'

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCategories } from '@/hooks/categories/useCategories';

import AddButton from '@/components/buttons/AddButton.jsx';
import CategoryList from './CategoryList.jsx';

function Categories() {
  const { t } = useTranslation();

  const { data: categories = [] } = useCategories();

  const navigate = useNavigate();

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error}</p>;

  return (
    <>

      <section>
        <h1>{t('categories.title')}</h1>
        <p>{t('categories.description')}</p>
        <div className={styles.actions}>
          <AddButton action={() => navigate('/categories/new')}>{t('categories.add')}</AddButton>
        </div>

      </section>

      <CategoryList categories={categories} />

    </>
  );
}

export default Categories
