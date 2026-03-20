import styles from './Button.module.css';

function CancelButton({ action }) {

    return (
        <button type="button" className={styles.red} onClick={action}>
            <i className="fa-solid fa-arrow-rotate-left"></i>
            <p>Cancel</p>
        </button>
    );
}

export default CancelButton