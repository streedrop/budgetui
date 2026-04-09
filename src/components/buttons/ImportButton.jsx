import styles from './Button.module.css';

import { useTranslation } from 'react-i18next';

function ImportButton({ children, action }) {
    const { t } = useTranslation();

    const label = children ?? t('buttons.import');

    return (
        <button type="button" className={styles.white} onClick={action}>
            <i className="fa-regular fa-file"></i>
            <p>{label}</p>
        </button>
    );
}

export default ImportButton