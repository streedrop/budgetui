import CategoryItem from './CategoryItem.jsx';

import { useTranslation } from 'react-i18next';

import Empty from '@/components/empty/Empty.jsx';

function CategoryList({ categories }) {
    const { t } = useTranslation();

    if (categories.length == 0)


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
                        <Empty item="categories" />
                }
            </>
        );
}

export default CategoryList