import './styles/CategoryItem.css'

import { useNavigate } from 'react-router-dom';

function CategoryItem({ id, name, description, onDelete }) {

    const navigate = useNavigate();

    const goToEdit = (id) => {
        navigate(`/categories/edit/${id}`);
    }

    return (
        <div className="categoryItem" key={id}>
            <p>{name}</p>
            <p>{description}</p>
            <button type="button" className="edit" onClick={() => goToEdit(id)}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>
            <button type="button" className="delete" onClick={() => onDelete(id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
        </div>
    );
}

export default CategoryItem
