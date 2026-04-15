import styles from './styles/CategoryList.module.css'

import CategoryItem from './CategoryItem.jsx';

import { useTranslation } from 'react-i18next';

import Empty from '@/components/empty/Empty.jsx';

function CategoryList({ categories }) {
    const { t } = useTranslation();

    return (
        <section>
            <h2>{t('categories.list.title')}</h2>
            {
                categories.length > 0 ?
                    <>
                        <div className={styles.list}>
                            {categories.find(c => c.is_income == true) &&
                                <>
                                    <h3 className={styles.header}>{t('categories.list.income')}</h3>
                                    {categories.filter(c => c.is_income == true).map(category => <CategoryItem key={category.id} category={category} />)}
                                </>
                            }

                            {categories.find(c => c.is_income == false) &&
                                <>
                                    <h3 className={styles.header}>{t('categories.list.expenses')}</h3>
                                    {categories.filter(c => c.is_income == false).map(category => <CategoryItem key={category.id} category={category} />)}
                                </>
                            }

                            {categories.find(c => c.is_income == null) &&
                                <>
                                    <h3 className={styles.header}>{t('categories.uncategorized')}</h3>
                                    <CategoryItem category={categories.find(c => c.is_income == null)} />
                                </>
                            }
                        </div>
                    </>
                    :
                    <Empty item="categories" />
            }
        </section>
    );
}

export default CategoryList