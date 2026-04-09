import styles from './styles/Rules.module.css';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { insertRule, deleteRule } from '@/services/rule.api';
import { useCategories } from '@/hooks/categories/useCategories';
import { useRules } from '@/hooks/useRules';

import Modal from '@/components/modal/Modal.jsx';
import AddButton from '@/components/buttons/AddButton';
import DeleteButton from '@/components/buttons/DeleteButton';


function Rules() {
    const { t } = useTranslation();

    const [modalOpen, setModalOpen] = useState(false);

    const [action, setAction] = useState("");

    const { data: categories = [] } = useCategories(); // Category list
    const { rules, setRules } = useRules();   // Rule list

    const addRule = async (evt) => {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        await insertRule(data).then((res) => {
            data.id = res.insertId;
            setRules([...rules, data]);
            setModalOpen(false);
        });
    }

    const handleDelete = async (id) => {

        const res = await deleteRule(id);
        if (!res.ok) return;

        setRules(prev => prev.filter(item => !(item.id == id)));
    };

    return (
        <>
            <h1>{t('rules.title')}</h1>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
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
            </Modal>

            <h2>{t('rules.list.title')}</h2>
            <AddButton className={styles.openModal} action={() => setModalOpen(true)} />
            <div className={styles.list}>
                <div className={styles.header}>
                    <h4>{t('rules.list.header.condition')}</h4>
                    <h4>{t('rules.list.header.action')}</h4>
                    <h4 className={styles.actions}>{t('rules.list.header.actions')}</h4>
                </div>
                {rules.map((rule, index) => (

                    <div className={styles.item} key={index}>
                        {`${t(`rules.list.${rule.source}`)}
                            ${t(`rules.list.${rule.match_type}`)}
                            '${rule.keyword}'
                        `}
                        {rule.action == "ignore" && <p>{t('rules.list.ignore')}</p>}
                        {rule.action == "move" && <p>{t('rules.list.move')} {categories.find(category => rule.category_id == category.id)?.name}</p>}
                        {rule.action == "rename" && <p>{t('rules.list.rename')} '{rule.new_string}'</p>}
                        {rule.action == "replace" && (
                            rule.new_string == '' ? <p>{t('rules.list.remove', {keyword: rule.keyword})}</p> : <p>{t('rules.list.replace', {keyword: rule.keyword, new_string: rule.new_string})}</p>
                        )}

                        <div className={styles.actions}>
                            <DeleteButton action={() => handleDelete(rule.id)} />
                        </div>
                        <hr />
                    </div>

                ))}
            </div>
        </>
    )
}

export default Rules