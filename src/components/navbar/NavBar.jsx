import styles from './NavBar.module.css';

import LanguagePicker from '@/components/pickers/LanguagePicker';

import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavBar({ collapsed, setCollapsed }) {
  const { t } = useTranslation();

  const navClass = ({ isActive }) => isActive ? styles.active : ''

  return (
    <nav className={collapsed ? styles.collapsed : ''}>
      <div className={styles.logo}>
        <h2>Budget.</h2>
        <div onClick={() => setCollapsed(!collapsed)}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <hr />

      <div className={styles.links}>
        <NavLink to="/" className={navClass}>
          <i className="fa-regular fa-house"></i>
          <span>{t('nav.dashboard')}</span>
        </NavLink>
        <NavLink to="/transactions" className={navClass}>
          <i className="fa-solid fa-list"></i>
          <span>{t('nav.transactions')}</span>
        </NavLink>
        <NavLink to="/categories" className={navClass}>
          <i className="fa-regular fa-folder"></i>
          <span>{t('nav.categories')}</span>
        </NavLink>
        <NavLink to="/charts" className={navClass}>
          <i className="fa-regular fa-chart-bar"></i>
          <span>{t('nav.charts')}</span>
        </NavLink>
        <NavLink to="/summary" className={navClass}>
          <i className="fa-regular fa-newspaper"></i>
          <span>{t('nav.summary')}</span>
        </NavLink>

        <hr />

        <NavLink to="/import" className={navClass}>
          <i className="fa-regular fa-file"></i>
          <span>{t('nav.import')}</span>
        </NavLink>
        <NavLink to="/rules" className={navClass}>
          <i className="fa-solid fa-list-check"></i>
          <span>{t('nav.rules')}</span>
        </NavLink>
        <NavLink to="/dev" className={navClass}>
          <i className="fa-regular fa-file-code"></i>
          <span>{t('nav.dev')}</span>
        </NavLink>
      </div>

      <hr />

      <div className={styles.viewmode}>
        <p>{t('nav.viewmode.title')}</p>
        <p className={styles.mobile}>{t('nav.viewmode.mobile')}</p>
        <p className={styles.tablet}>{t('nav.viewmode.tablet')}</p>
        <p className={styles.laptop}>{t('nav.viewmode.laptop')}</p>
        <p className={styles.desktop}>{t('nav.viewmode.desktop')}</p>
      </div>

      <div className={styles.languagePicker}>
        <LanguagePicker />
      </div>

    </nav>
  );
}

export default NavBar
