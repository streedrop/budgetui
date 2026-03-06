import './styles/CategoryItem.css'

import { useNavigate } from 'react-router-dom';

function CategoryItem({ category = { id: null, name: "Uncategorized", description: "", goal: null }, onDelete }) {

    const navigate = useNavigate();

    const goToInfo = () => {
        if (category.id == null)
            return navigate(`/categories/uncategorized`);

        navigate(`/categories/${category.id}`);
    }

    const goToEdit = () => {
        navigate(`/categories/edit/${category.id}`);
    }

    return (
        <div className="categoryItem" key={category.id}>
            <p className="name"><b>{category.name}</b></p>
            <p className="description">{category.description}</p>
            <div className="actions">
                <button type="button" className="info" onClick={() => goToInfo()}><i className="fa-solid fa-info fa-xl"></i></button>
                {category.id && (
                    <>
                        <button type="button" className="edit" onClick={() => goToEdit()}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>
                        <button type="button" className="delete" onClick={() => onDelete(category.id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
                    </>
                )}
            </div>
            {category.id && (
                <p className="goal"><em>{category.goal} $</em></p>
            )}
        </div>
    );
}

export default CategoryItem
