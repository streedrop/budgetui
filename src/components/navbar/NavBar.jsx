import styles from './NavBar.module.css';

import { NavLink } from 'react-router-dom';

function NavBar({ collapsed, setCollapsed }) {

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
          <span>Home</span>
        </NavLink>
        <NavLink to="/categories" className={navClass}>
          <i className="fa-regular fa-folder"></i>
          <span>Categories</span>
        </NavLink>
        <NavLink to="/transactions" className={navClass}>
          <i className="fa-solid fa-list"></i>
          <span>Transactions</span>
        </NavLink>
        <NavLink to="/charts" className={navClass}>
          <i className="fa-regular fa-chart-bar"></i>
          <span>Charts</span>
        </NavLink>

        <hr />

        <NavLink to="/import" className={navClass}>
          <i className="fa-regular fa-file"></i>
          <span>Import</span>
        </NavLink>
        <NavLink to="/dev" className={navClass}>
          <i className="fa-regular fa-file-code"></i>
          <span>Dev Tools</span>
        </NavLink>
      </div>

      <hr />

      <div className={styles.viewmode}>
        <p>Current view mode: </p>
        <p className={styles.mobile}>Mobile</p>
        <p className={styles.tablet}>Tablet</p>
        <p className={styles.laptop}>Laptop</p>
        <p className={styles.desktop}>Desktop</p>
      </div>
    </nav>
  );
}

export default NavBar
