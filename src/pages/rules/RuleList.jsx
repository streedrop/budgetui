import styles from './styles/RuleList.module.css';

import { useTranslation } from 'react-i18next';

import RuleItem from './RuleItem';

function RuleList({ rules }) {
    const { t } = useTranslation();

    return (
        <>
            <h2>{t('rules.list.title')}</h2>
            {
                rules.length > 0 ?
                    <div className={styles.list}>
                        <div className={styles.header}>
                            <h4>{t('rules.list.header.condition')}</h4>
                            <h4>{t('rules.list.header.action')}</h4>
                            <h4 className={styles.actions}>{t('rules.list.header.actions')}</h4>
                        </div>

                        {rules.map(rule => <RuleItem rule={rule} key={rule.id} />)}

                    </div>
                    :
                    <div className={styles.empty}>
                        <i className="fa-regular fa-rectangle-xmark"></i>
                        <h3>{t('rules.list.empty.title')}</h3>
                        <p>{t('rules.list.empty.description')}</p>
                    </div>
            }

        </>
    )
}

export default RuleList