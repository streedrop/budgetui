import styles from './Empty.module.css';

import { useTranslation } from 'react-i18next';

function Empty({ item }) {
    const { t } = useTranslation();

    return (
        <div className={styles.empty}>
            <i className="fa-regular fa-rectangle-xmark"></i>
            <h3>{t(`${item}.list.empty.title`)}</h3>
            <p>{t(`${item}.list.empty.description`)}</p>
        </div>
    )
}

export default Empty