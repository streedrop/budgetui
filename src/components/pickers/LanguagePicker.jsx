import styles from './styles/LanguagePicker.module.css'

import { useTranslation } from 'react-i18next';

import { lngs } from '@/constants/Languages';

function LanguagePicker() {
    const { t, i18n } = useTranslation();

    return (
        <div className={styles.languagePicker}>
            {Object.keys(lngs).map((lng) => (
                <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                    {lngs[lng].nativeName}
                </button>
            ))}
        </div>
    );
}

export default LanguagePicker