import styles from './styles/Keywords.module.css';

import { useState, useEffect } from 'react';

import { fetchCategories } from '@/services/category.api';
import { fetchKeywords, insertKeyword, deleteKeyword } from '@/services/keyword.api';

function Keywords() {

    const [action, setAction] = useState("move");

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
        })
    }

    const handleDelete = async (source, keyword) => {

        const res = await deleteKeyword(source, keyword);
        if (!res.ok) return;

        setKeywords(prev => prev.filter(item => !(item.source == source && item.keyword == keyword)));
    };

    return (
        <>
            <h1>Keywords</h1>
            <p>Keywords allow you to define links between imports and your categories.
                It is useful for cases where your bank assign your transactions to
                categories which are too specific, or have a different name than what
                you want.</p>
            <form className={styles.form} onSubmit={addKeyword}>
                <label htmlFor="source">Source:</label>
                <select id="source" name="source">
                    <option value="description">Transaction description</option>
                    <option value="category">Transaction category name</option>
                </select>
                <label htmlFor="keyword">Keyword:</label>
                <input type="text" id="keyword" name="keyword" />
                <label htmlFor="action">Action:</label>
                <select id="action" name="action" onChange={e => setAction(e.target.value)}>
                    <option value="move">Move to category</option>
                    <option value="ignore">Ignore (do not add)</option>
                </select>
                {
                    action == "move" && (
                        <>
                            <label htmlFor="category_id">Category:</label>
                            <select id="category_id" name="category_id">
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )
                }

                <button type="submit">Add</button>
            </form>

            <h2>Current keywords</h2>
            <div className={styles.list}>
                <div className={styles.header}>
                    <h4>Search in</h4>
                    <h4>Keyword</h4>
                    <h4>Action</h4>
                    <h4 className={styles.actions}>Actions</h4>
                </div>
                {keywords.map((keyword, index) => (

                    <div className={styles.item} key={index}>
                        {
                            keyword.source == "description" ? (<p>Transaction description</p>) : (<p>Transaction category name</p>)
                        }
                        <p>"{keyword.keyword}"</p>
                        {
                            keyword.action == "ignore" ? (<p>Ignore</p>) :
                                (<p>Move to {categories.find(category => keyword.category_id == category.id)?.name}</p>)
                        }
                        <div className={styles.actions}>
                            <button type="button" className="delete" onClick={() => handleDelete(keyword.source, keyword.keyword)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
                        </div>
                        <hr />
                    </div>

                ))}
            </div>
        </>
    )
}

export default Keywords