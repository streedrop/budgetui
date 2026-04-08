import styles from './styles/Keywords.module.css';

import { useState, useEffect } from 'react';

import { fetchCategories } from '@/services/category.api';
import { fetchKeywords, insertKeyword, deleteKeyword } from '@/services/keyword.api';

import Modal from '@/components/modal/Modal.jsx';
import AddButton from '@/components/buttons/AddButton';
import DeleteButton from '@/components/buttons/DeleteButton';

function Keywords() {

    const [modalOpen, setModalOpen] = useState(false);

    const [action, setAction] = useState("");

    const [categories, setCategories] = useState([]);   // Category list
    const [keywords, setKeywords] = useState([]);   // Keyword list

    // Populate category and keyword list
    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };

        const loadKeywords = async () => {
            const data = await fetchKeywords();
            setKeywords(data);
        };

        loadCategories();
        loadKeywords();
    }, []);

    const addKeyword = async (evt) => {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        await insertKeyword(data).then((res) => {
            data.id = res.insertId;
            setKeywords([...keywords, data]);
            setModalOpen(false);
        });
    }

    const handleDelete = async (id) => {

        const res = await deleteKeyword(id);
        if (!res.ok) return;

        setKeywords(prev => prev.filter(item => !(item.id == id)));
    };

    return (
        <>
            <h1>Rules / Automations</h1>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>Add a rule</h2>
                <form className={styles.form} onSubmit={addKeyword}>
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

            <h2>Current keywords</h2>
            <AddButton className={styles.openModal} action={() => setModalOpen(true)} />
            <div className={styles.list}>
                <div className={styles.header}>
                    <h4>Condition</h4>
                    <h4>Action</h4>
                    <h4 className={styles.actions}>Actions</h4>
                </div>
                {keywords.map((keyword, index) => (

                    <div className={styles.item} key={index}>
                        {`${keyword.source == "description" ? "Description" : "Category name"}
                            ${keyword.match_type == "contains" ? "contains" : "is equal to"}
                            "${keyword.keyword}"
                        `}
                        {keyword.action == "ignore" && <p>Ignore</p>}
                        {keyword.action == "move" && <p>Move to {categories.find(category => keyword.category_id == category.id)?.name}</p>}
                        {keyword.action == "rename" && <p>Rename to "{keyword.new_string}"</p>}
                        {keyword.action == "replace" && (
                            keyword.new_string == '' ? <p>Remove "{keyword.keyword}" from name</p> : <p>Replace "{keyword.keyword}" by "{keyword.new_string}"</p>
                        )}

                        <div className={styles.actions}>
                            <DeleteButton action={() => handleDelete(keyword.id)} />
                        </div>
                        <hr />
                    </div>

                ))}
            </div>
        </>
    )
}

export default Keywords