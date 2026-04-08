import styles from './styles/CategoryItem.module.css';

import icons from '@/constants/CategoryIcons'

import { useNavigate } from 'react-router-dom';

import { useDeleteCategory } from '@/hooks/categories/useDeleteCategory';
import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '@/components/buttons/EditButton';

function CategoryItem({ category }) {

    const navigate = useNavigate();

    const goToInfo = () => {
        if (category.id == null)
            return navigate(`/categories/uncategorized`);

        navigate(`/categories/${category.id}`);
    }

    const goToEdit = (evt) => {
        evt.stopPropagation();
        navigate(`/categories/${category.id}/edit`);
    }

    const { mutate: deleteCategory } = useDeleteCategory();

    const deleteFunc = (evt) => {
        evt.stopPropagation();
        
        deleteCategory(category.id);
    }

    return (
        <div className={styles.item} key={category.id} onClick={() => goToInfo()}>
            <i className={`${styles.icon} ${icons[category.icon]}`}></i>
            <p><b>{category.name}</b></p>
            <p className={styles.description}>{category.description}</p>
            <div className={styles.actions}>
                {category.id && (
                    <>
                        <EditButton action={goToEdit} />
                        <DeleteButton action={deleteFunc} />
                    </>
                )}
            </div>
            <p>{category.count} transaction{category.count == 1 ? '' : 's'}</p>
        </div>
    );
}

export default CategoryItem
