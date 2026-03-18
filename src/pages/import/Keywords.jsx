import './styles/Keywords.css';

import { useState, useEffect } from 'react';

import { fetchCategories } from '@/services/category.api';
import { fetchKeywords, insertKeyword, deleteKeyword } from '@/services/keyword.api';

function Keywords() {

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

    const handleDelete = async (id) => {

        const res = await deleteKeyword(id);
        if (!res.ok) return;

        setKeywords(prev => prev.filter(keyword => keyword.id !== id));
    };

    return (
        <div id="main">
            <h1>Keywords</h1>
            <p>Keywords allow you to define links between imports and your categories.
                It is useful for cases where your bank assign your transactions to
                categories which are too specific, or have a different name than what
                you want.</p>
            <form className="keywords" onSubmit={addKeyword}>
                <label htmlFor="keyword">Keyword:</label>
                <input type="text" id="keyword" name="keyword" />
                <label htmlFor="category_id">Category:</label>
                <select id="category_id" name="category_id">
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Add</button>
            </form>

            <h2>Current keywords</h2>
            <div className="keywordList">
                {keywords.map(keyword => (

                    <div className="keyword" key={keyword.id}>
                        <p>{keyword.keyword}</p>
                        <p>{categories.find(category => keyword.category_id == category.id)?.name}</p>
                        <button type="button" className="delete" onClick={() => handleDelete(keyword.id)}><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Keywords