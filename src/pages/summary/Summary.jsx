import { useTranslation } from 'react-i18next';

function Summary() {
    const { t } = useTranslation();

    return (
        <section>
            <h1>{t('summary.title')}</h1>
            <p>{t('summary.description')}</p>
        </section>
    )
}

export default Summary