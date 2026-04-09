import styles from './styles/RuleItem.module.css';

import { useTranslation } from 'react-i18next';

import { useCategories } from '@/hooks/categories/useCategories';
import { useDeleteRule } from '@/hooks/rules/useDeleteRule';

import DeleteButton from '@/components/buttons/DeleteButton';

function RuleItem({ rule }) {
    const { t } = useTranslation();

    const { data: categories = [] } = useCategories(); // Category list

    const { mutate: deleteRule } = useDeleteRule(); // Delete rule

    return (
        <>
            <div className={styles.item}>
                {`${t(`rules.list.${rule.source}`)}
                            ${t(`rules.list.${rule.match_type}`)}
                            '${rule.keyword}'
                        `}
                {rule.action == "ignore" && <p>{t('rules.list.ignore')}</p>}
                {rule.action == "move" && <p>{t('rules.list.move')} {categories.find(category => rule.category_id == category.id)?.name}</p>}
                {rule.action == "rename" && <p>{t('rules.list.rename')} '{rule.new_string}'</p>}
                {rule.action == "replace" && (
                    rule.new_string == '' ? <p>{t('rules.list.remove', { keyword: rule.keyword })}</p> : <p>{t('rules.list.replace', { keyword: rule.keyword, new_string: rule.new_string })}</p>
                )}

                <div className={styles.actions}>
                    <DeleteButton action={() => deleteRule(rule.id)} />
                </div>
                <hr />
            </div>
        </>
    )
}

export default RuleItem