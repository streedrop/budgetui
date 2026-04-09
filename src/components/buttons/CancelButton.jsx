import styles from './Button.module.css';

import { useTranslation } from 'react-i18next';

function CancelButton({ action }) {
    const { t } = useTranslation();

    return (
        <button type="button" className={styles.red} onClick={action}>
            <i className="fa-solid fa-arrow-rotate-left"></i>
            <p>{t('buttons.cancel')}</p>
        </button>
    );
}

export default CancelButton