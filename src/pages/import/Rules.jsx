import styles from './styles/Rules.module.css';

import { useState, useEffect } from 'react';

import { insertRule, deleteRule } from '@/services/rule.api';
import { useCategories } from '@/hooks/useCategories';
import { useRules } from '@/hooks/useRules';

import Modal from '@/components/modal/Modal.jsx';
import AddButton from '@/components/buttons/AddButton';
import DeleteButton from '@/components/buttons/DeleteButton';


function Rules() {

    const [modalOpen, setModalOpen] = useState(false);

    const [action, setAction] = useState("");

    const { categories, setCategories } = useCategories(); // Category list
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
            <h1>Rules / Automations</h1>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>Add a rule</h2>
                <form className={styles.form} onSubmit={addRule}>
                    <label htmlFor="source">Source:</label>
                    <select id="source" name="source">
                        <option value="description">Transaction description</option>
                        <option value="category">Transaction category name</option>
                    </select>
                    <div />
                    <label htmlFor="match_type">Condition:</label>
                    <select id="match_type" name="match_type">
                        <option value="contains">Contains text</option>
                        <option value="equals">Must fully match</option>
                    </select>
                    <input type="text" id="keyword" name="keyword" placeholder="Keyword..." />
                    <label htmlFor="action">Action:</label>
                    <select id="action" name="action" onChange={e => setAction(e.target.value)} value={action}>
                        <option value="" disabled>Select an action...</option>
                        <optgroup label="Categorization">
                            <option value="move">Move to category</option>
                            <option value="ignore">Ignore (do not add)</option>
                        </optgroup>
                        <optgroup label="Name change">
                            <option value="rename">Rename transaction to</option>
                            <option value="replace">Replace keyword by</option>
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
                        <input type="text" name="new_string" id="new_string" placeholder="New name..." />
                    )}
                    {action == "replace" && (
                        <input type="text" name="new_string" id="new_string" placeholder="Replace By..." />
                    )}
                    <AddButton />
                </form>
            </Modal>

            <h2>Current rules</h2>
            <AddButton className={styles.openModal} action={() => setModalOpen(true)} />
            <div className={styles.list}>
                <div className={styles.header}>
                    <h4>Condition</h4>
                    <h4>Action</h4>
                    <h4 className={styles.actions}>Actions</h4>
                </div>
                {rules.map((rule, index) => (

                    <div className={styles.item} key={index}>
                        {`${rule.source == "description" ? "Description" : "Category name"}
                            ${rule.match_type == "contains" ? "contains" : "is equal to"}
                            "${rule.keyword}"
                        `}
                        {rule.action == "ignore" && <p>Ignore</p>}
                        {rule.action == "move" && <p>Move to {categories.find(category => rule.category_id == category.id)?.name}</p>}
                        {rule.action == "rename" && <p>Rename to "{rule.new_string}"</p>}
                        {rule.action == "replace" && (
                            rule.new_string == '' ? <p>Remove "{rule.keyword}" from name</p> : <p>Replace "{rule.keyword}" by "{rule.new_string}"</p>
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