import styles from './Button.module.css';

import { useTranslation } from 'react-i18next';

function EditButton({ action }) {
    const { t } = useTranslation();

    return (
        <button type="button" className={styles.blue} onClick={action}>
            <i className="fa-regular fa-pen-to-square"></i>
            <p>{t('buttons.edit')}</p>
        </button>
    );
}

export default EditButton