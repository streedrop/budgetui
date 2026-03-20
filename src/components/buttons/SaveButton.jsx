import styles from './Button.module.css';

function SaveButton() {

    return (
        <button type="submit" className={styles.blue}>
            <i className="fa-regular fa-circle-down"></i>
            <p>Save</p>
        </button>
    );
}

export default SaveButton