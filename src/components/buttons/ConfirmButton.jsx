import styles from './Button.module.css';

function ConfirmButton({ action }) {

    return (
        <button type="button" className={styles.blue} onClick={action}>
            <i className="fa-regular fa-circle-check"></i>
            <p>Confirm</p>
        </button>
    );
}

export default ConfirmButton