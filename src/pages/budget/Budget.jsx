import { useTranslation } from 'react-i18next';

function Budget() {
    const { t } = useTranslation();

    return (
        <section>
            <h1>{t('budget.title')}</h1>
            <p>{t('budget.description')}</p>
        </section>
    )
}

export default Budget