import styles from './styles/CategoryForm.module.css';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCategory } from '@/hooks/categories/useCategory';
import { useCreateCategory } from '@/hooks/categories/useCreateCategory';
import { useEditCategory } from '@/hooks/categories/useEditCategory';

import Modal from '@/components/modal/Modal';
import Button from '@/components/buttons/Button';
import CancelButton from '@/components/buttons/CancelButton';
import SaveButton from '@/components/buttons/SaveButton';
import AddButton from '@/components/buttons/AddButton';
import IconPicker from '@/components/IconPicker/IconPicker';

const emptyFormData = {
    name: "",
    description: "",
    is_income: 0,
    icon: 0
};

function CategoryForm() {
    const { t } = useTranslation();

    const { id } = useParams();                         // Current transaction ID
    const isEditMode = Boolean(id);                     // ID = editing, No ID = creating
    const [data, setFormData] = useState(emptyFormData);    // Form data
    const [modalOpen, setModalOpen] = useState(false);

    const { mutate: createCategory } = useCreateCategory();
    const { mutate: editCategory } = useEditCategory();
    const { data: category = null, isLoading, error } = useCategory(id);

    const [icon, setIcon] = useState(0);

    const navigate = useNavigate();

    // Pre-fill form
    useEffect(() => {
        if (category && isEditMode) {
            setFormData(category);
            setIcon(category.icon);
        }
    }, [category]);

    // Add / Save button
    async function handleSubmit(evt) {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);

        if (isEditMode)
            editCategory({ id, data });
        else
            createCategory(data);

        navigate(-1);
    };

    // Cancel button
    const handleCancel = () => {
        navigate(-1);
    }

    if(isLoading && isEditMode)
        return <p>Loading...</p>

    return (
        <>
            <h1>{isEditMode ? t('categories.form.edit') : t('categories.form.add')}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name">{t('categories.form.name')}</label>
                <input type="text" id="name" name="name" defaultValue={data.name} />
                <label htmlFor="icon">{t('categories.form.icon')}</label>
                <Button action={() => setModalOpen(true)}>Select icon...</Button>
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <IconPicker selected={icon} setIcon={setIcon} />
                </Modal>
                <input type="hidden" id="icon" name="icon" value={icon} readOnly />
                <label htmlFor="description">{t('categories.form.description')}</label>
                <input type="text" id="description" name="description" defaultValue={data.description} />
                <label>{t('categories.form.type.label')}</label>
                <div className={styles.type}>
                    <div>
                        <input type="radio" id="expense" name="is_income" value="0" checked={data.is_income == 0} onChange={() => setFormData({ ...data, is_income: 0 })} />
                        <label htmlFor="expense">{t('categories.form.type.expenses')}</label>
                    </div>
                    <div>
                        <input type="radio" id="income" name="is_income" value="1" checked={data.is_income == 1} onChange={() => setFormData({ ...data, is_income: 1 })} />
                        <label htmlFor="income">{t('categories.form.type.income')}</label>
                    </div>
                </div>
                <CancelButton action={handleCancel} />
                {isEditMode ? (<SaveButton />) : (<AddButton />)}
            </form>
        </>
    );
}

export default CategoryForm