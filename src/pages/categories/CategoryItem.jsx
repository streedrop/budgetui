import styles from './styles/CategoryItem.module.css';

import { useNavigate } from 'react-router-dom';

function CategoryItem({ category = { id: null, name: "Uncategorized", description: "" }, onDelete }) {

    const navigate = useNavigate();

    const goToInfo = () => {
        if (category.id == null)
            return navigate(`/categories/uncategorized`);

        navigate(`/categories/${category.id}`);
    }

    const goToEdit = () => {
        navigate(`/categories/${category.id}/edit`);
    }

    return (
        <div className={styles.item} key={category.id} onClick={() => goToInfo()}>
            <p><b>{category.name}</b></p>
            <p>{category.description}</p>
            <div className={styles.actions}>
                {category.id && (
                    <>
                        <button type="button" className="edit" onClick={() => goToEdit()}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>
                        <button type="button" className="delete" onClick={() => onDelete(category.id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
                    </>
                )}
            </div>
        </div>
    );
}

export default CategoryItem
