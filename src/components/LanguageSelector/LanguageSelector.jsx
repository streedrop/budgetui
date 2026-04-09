import styles from './LanguageSelector.module.css'

import { useTranslation } from 'react-i18next';

import { lngs } from '@/constants/Languages';

function LanguageSelector() {
    const { t, i18n } = useTranslation();

    return (
        <div className={styles.languageSelector}>
            {Object.keys(lngs).map((lng) => (
                <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                    {lngs[lng].nativeName}
                </button>
            ))}
        </div>
    );
}

export default LanguageSelector