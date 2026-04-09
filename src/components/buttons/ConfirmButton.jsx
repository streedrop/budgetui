import styles from './Button.module.css';

import { useTranslation } from 'react-i18next';

function ConfirmButton({ action }) {
    const { t } = useTranslation();

    return (
        <button type="button" className={styles.blue} onClick={action}>
            <i className="fa-regular fa-circle-check"></i>
            <p>{t('buttons.confirm')}</p>
        </button>
    );
}

export default ConfirmButton