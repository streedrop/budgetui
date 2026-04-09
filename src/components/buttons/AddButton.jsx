import styles from './Button.module.css';

import { useTranslation } from 'react-i18next';

function AddButton({ children, action, className = "" }) {
    const { t } = useTranslation();

    const label = children ?? t('buttons.add');
    // Defined action
    if(action)
        return (
            <button type="button" className={`${className} ${styles.blue}`} onClick={action}>
                <i className="fa-solid fa-plus"></i>
                <p>{label}</p>
            </button>
        )

    // Submit form
    return (
        <button type="submit" className={`${className} ${styles.blue}`}>
            <i className="fa-solid fa-plus"></i>
            <p>{label}</p>
        </button>
    );
}

export default AddButton