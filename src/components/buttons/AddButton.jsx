import styles from './Button.module.css';

function AddButton() {

    return (
        <button type="submit" className={styles.blue}>
            <i className="fa-solid fa-plus"></i>
            <p>Add</p>
        </button>
    );
}

export default AddButton