import styles from './styles/RuleList.module.css';

import { useTranslation } from 'react-i18next';

import Empty from '@/components/empty/Empty.jsx';
import RuleItem from './RuleItem';

function RuleList({ rules }) {
    const { t } = useTranslation();

    return (
        <section>
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
                    <Empty item={'rules'} />
            }

        </section>
    )
}

export default RuleList