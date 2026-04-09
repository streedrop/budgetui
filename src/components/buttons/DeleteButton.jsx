import styles from './Button.module.css';

import { useTranslation } from 'react-i18next';

function DeleteButton({ action }) {
    const { t } = useTranslation();

    return (
        <button type="button" className={styles.red} onClick={action}>
            <i className="fa-regular fa-circle-xmark"></i>
            <p>{t('buttons.delete')}</p>
        </button>
    );
}

export default DeleteButton