import styles from './Button.module.css';

function AddButton({ children = "Add", action }) {

    // Defined action
    if(action)
        return (
            <button type="button" className={styles.blue} onClick={action}>
                <i className="fa-solid fa-plus"></i>
                <p>{children}</p>
            </button>
        )

    // Submit form
    return (
        <button type="submit" className={styles.blue}>
            <i className="fa-solid fa-plus"></i>
            <p>{children}</p>
        </button>
    );
}

export default AddButton