import styles from './MoveOverlay.module.css';

import { useTranslation } from 'react-i18next';

import { useCategories } from '@/hooks/categories/useCategories';
import { useEditTransaction } from '@/hooks/transactions/useEditTransaction.js';
import Button from '@/components/buttons/Button';

function MoveOverlay({ isOpen, onClose, selected }) {
    const { t } = useTranslation();

    const { data: categories = [] } = useCategories();
    const { mutate: editTransaction } = useEditTransaction();

    // Add / Save button
    function handleSubmit(evt) {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        selected.forEach(t => editTransaction({ id: t.id, data: { ...t, date: t.date.split("T")[0], category_id: data.category_id } }));

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h3>{t('transactions.list.move.title')}</h3>
                    <div>
                        <label htmlFor="category">{t('transactions.list.move.label')}</label>
                        <select id="category" name="category_id">
                            {categories.filter(c => c.id).map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit">{t('transactions.list.move.submit')}</Button>
                </form>
            </div>
        </div>
    );
}

export default MoveOverlay