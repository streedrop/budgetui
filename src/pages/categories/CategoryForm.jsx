import styles from './styles/CategoryForm.module.css';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    const { id } = useParams();                         // Current transaction ID
    const isEditMode = Boolean(id);                     // ID = editing, No ID = creating
    const [data, setFormData] = useState(emptyFormData);    // Form data
    const [modalOpen, setModalOpen] = useState(false);

    const { mutate: createCategory } = useCreateCategory();
    const { mutate: editCategory } = useEditCategory();
    const { data: category = [], isLoading, error } = useCategory(id);

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

    return (
        <>
            <h1>{isEditMode ? 'Edit category' : 'New category'}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" defaultValue={data.name} />
                <label htmlFor="icon">Icon: </label>
                <Button action={() => setModalOpen(true)}>Select icon...</Button>
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <IconPicker selected={icon} setIcon={setIcon} />
                </Modal>
                <input type="hidden" id="icon" name="icon" value={icon} readOnly />
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" defaultValue={data.description} />
                <label>Type: </label>
                <div className={styles.type}>
                    <div>
                        <input type="radio" id="expense" name="is_income" value="0" defaultChecked={!data.is_income} />
                        <label htmlFor="expense">Expenses</label>
                    </div>
                    <div>
                        <input type="radio" id="income" name="is_income" value="1" defaultChecked={data.is_income} />
                        <label htmlFor="income">Income</label>
                    </div>
                </div>
                <CancelButton action={handleCancel} />
                {isEditMode ? (<SaveButton />) : (<AddButton />)}
            </form>
        </>
    );
}

export default CategoryForm