import styles from './styles/CategoryList.module.css'

import CategoryItem from './CategoryItem.jsx';

import { useTranslation } from 'react-i18next';

function CategoryList({ categories }) {
    const { t } = useTranslation();

    return (
        <>
            <h2>{t('categories.list.title')}</h2>
            {
                categories.length > 0 ?
                    <>
                        {categories.find(c => c.is_income == true) &&

                            <div>
                                <h3>{t('categories.list.income')}</h3>

                                {categories.filter(c => c.is_income == true).map(category => <CategoryItem key={category.id} category={category} />)}
                            </div>
                        }

                        {categories.find(c => c.is_income == false) &&

                            <div>
                                <h3>{t('categories.list.expenses')}</h3>

                                {categories.filter(c => c.is_income == false).map(category => <CategoryItem key={category.id} category={category} />)}
                            </div>
                        }

                        {categories.find(c => c.is_income == null) &&

                            <div>
                                <h3>{t('categories.uncategorized')}</h3>
                                <CategoryItem category={categories.find(c => c.is_income == null)}></CategoryItem>
                            </div>
                        }
                    </>
                    :
                    <div className={styles.empty}>
                        <i className="fa-regular fa-rectangle-xmark"></i>
                        <h3>{t('categories.list.empty.title')}</h3>
                        <p>{t('categories.list.empty.description')}</p>
                    </div>
            }
        </>
    );
}

export default CategoryList