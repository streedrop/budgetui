import styles from './styles/Rules.module.css';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRules } from '@/hooks/rules/useRules';

import AddButton from '@/components/buttons/AddButton';

import Modal from '@/components/modal/Modal.jsx';
import RuleForm from './RuleForm';
import RuleList from './RuleList';

function Rules() {
    const { t } = useTranslation();

    const [modalOpen, setModalOpen] = useState(false);

    const { data: rules = [] } = useRules(); // Rule list

    return (
        <>
            <h1>{t('rules.title')}</h1>
            <p>{t('rules.description')}</p>
            <AddButton className={styles.openModal} action={() => setModalOpen(true)}>{t('rules.add')}</AddButton>
            
            <RuleList rules={rules} />

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <RuleForm closeModal={() => setModalOpen(false)} />
            </Modal>
        </>
    )
}

export default Rules