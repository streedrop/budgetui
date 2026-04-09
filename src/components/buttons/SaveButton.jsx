import styles from './Button.module.css';

import { useTranslation } from 'react-i18next';

function SaveButton() {
    const { t } = useTranslation();

    return (
        <button type="submit" className={styles.blue}>
            <i className="fa-regular fa-circle-down"></i>
            <p>{t('buttons.save')}</p>
        </button>
    );
}

export default SaveButton