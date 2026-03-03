import './styles/TransactionItem.css'

import { useNavigate } from 'react-router-dom';

function TransactionItem({ id, description, amount, category, onDelete }) {

    const navigate = useNavigate();

    const goToEdit = (id) => {
        navigate(`/transactions/edit/${id}`);
    }

    return (
        <div className="transactionItem" key={id}>
            <p className="description">{description}</p>
            <p className="amount">{amount} $</p>
            <button type="button" className="edit" onClick={() => goToEdit(id)}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>
            <button type="button" className="delete" onClick={() => onDelete(id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
            <p className="category"><em>{category}</em></p>

        </div>
    );
}

export default TransactionItem
