import styles from './Button.module.css';

function EditButton({ action }) {

    return (
        <button type="button" className={styles.blue} onClick={action}>
            <i className="fa-regular fa-pen-to-square"></i>
            <p>Edit</p>
        </button>
    );
}

export default EditButton