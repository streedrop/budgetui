import styles from './Button.module.css';

function FilterButton({ action }) {

    return (
        <button type="button" className={styles.white} onClick={action}>
            <i className="fa-solid fa-filter"></i>
            <p>Filter...</p>
        </button>
    );
}

export default FilterButton