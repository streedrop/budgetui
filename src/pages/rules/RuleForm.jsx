import styles from './styles/RuleForm.module.css';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCategories } from '@/hooks/categories/useCategories';
import { useCreateRule } from '@/hooks/rules/useCreateRule';

import AddButton from '@/components/buttons/AddButton';

function RuleForm({ closeModal }) {
    const { t } = useTranslation();

    const [action, setAction] = useState("");

    const { data: categories = [] } = useCategories(); // Category list
    const { mutate: createRule } = useCreateRule(); // Create rule

    const addRule = async (evt) => {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        createRule(data);
        closeModal();
    }

    return (
        <>
            <h2>{t('rules.form.title')}</h2>
            <form className={styles.form} onSubmit={addRule}>

                <label htmlFor="source">{t('rules.form.source.label')}</label>
                <select id="source" name="source">
                    <option value="description">{t('rules.form.source.description')}</option>
                    <option value="category">{t('rules.form.source.category')}</option>
                </select>
                <div />

                <label htmlFor="match_type">{t('rules.form.condition.label')}</label>
                <select id="match_type" name="match_type">
                    <option value="contains">{t('rules.form.condition.contains')}</option>
                    <option value="equals">{t('rules.form.condition.equals')}</option>
                </select>
                <input type="text" id="keyword" name="keyword" placeholder={t('rules.form.condition.placeholder')} />

                <label htmlFor="action">{t('rules.form.action.label')}</label>
                <select id="action" name="action" onChange={e => setAction(e.target.value)} value={action}>
                    <option value="" disabled>{t('rules.form.action.placeholder')}</option>
                    <optgroup label={t('rules.form.action.categorization.title')}>
                        <option value="move">{t('rules.form.action.categorization.move')}</option>
                        <option value="ignore">{t('rules.form.action.categorization.ignore')}</option>
                    </optgroup>
                    <optgroup label={t('rules.form.action.nameChange.title')}>
                        <option value="rename">{t('rules.form.action.nameChange.rename')}</option>
                        <option value="replace">{t('rules.form.action.nameChange.replace')}</option>
                    </optgroup>
                </select>

                {action == "move" && (
                    <>
                        <select id="category_id" name="category_id">
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </>
                )}
                {action == "ignore" && (
                    <div />
                )}
                {action == "rename" && (
                    <input type="text" name="new_string" id="new_string" placeholder={t('rules.form.action.nameChange.rename_placeholder')} />
                )}
                {action == "replace" && (
                    <input type="text" name="new_string" id="new_string" placeholder={t('rules.form.action.nameChange.replace_placeholder')} />
                )}
                
                <AddButton />
            </form>
        </>
    )
}

export default RuleForm