import styles from './Button.module.css';

import { useTranslation } from 'react-i18next';

function DeleteButton({ action, disabled = false, children }) {
    const { t } = useTranslation();

    const label = children ?? t('buttons.delete');

    return (
        <button type="button" disabled={disabled} className={styles.red} onClick={action}>
            <i className="fa-regular fa-circle-xmark"></i>
            <p>{label}</p>
        </button>
    );
}

export default DeleteButton