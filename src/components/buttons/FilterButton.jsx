import styles from './Button.module.css';

import { useTranslation } from 'react-i18next';

function FilterButton({ action }) {
    const { t } = useTranslation();

    return (
        <button type="button" className={styles.white} onClick={action}>
            <i className="fa-solid fa-filter"></i>
            <p>{t('buttons.filter')}</p>
        </button>
    );
}

export default FilterButton