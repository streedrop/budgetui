import styles from './Button.module.css';

function DeleteButton({ action }) {

    return (
        <button type="button" className={styles.red} onClick={action}>
            <i className="fa-regular fa-circle-xmark"></i>
            <p>Delete</p>
        </button>
    );
}

export default DeleteButton