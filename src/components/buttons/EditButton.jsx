import styles from './Button.module.css';

import { useTranslation } from 'react-i18next';

function EditButton({ children, action }) {
    const { t } = useTranslation();

    const label = children ?? t('buttons.edit');

    return (
        <button type="button" className={styles.blue} onClick={action}>
            <i className="fa-regular fa-pen-to-square"></i>
            <p>{label}</p>
        </button>
    );
}

export default EditButton