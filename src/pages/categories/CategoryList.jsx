import CategoryItem from './CategoryItem.jsx';

import { useTranslation } from 'react-i18next';

function CategoryList({ categories, is_income }) {
    const { t } = useTranslation();

    return (
        <div>
            <h2>{is_income ? t('categories.list.income') : t('categories.list.expenses')}</h2>
            {categories.map(category => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    );
}

export default CategoryList