import './NavBar.css';

import { NavLink } from 'react-router-dom';

function NavBar({ collapsed, setCollapsed }) {

  return (
    <nav className={collapsed ? 'collapsed' : ''}>
      <div className="logo">
        <h2>Budget.</h2>
        <div onClick={() => setCollapsed(!collapsed)}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <hr />

      <div className="links">
        <NavLink to="/">
          <i className="fa-regular fa-house"></i>
          <span>Home</span>
        </NavLink>
        <NavLink to="/categories">
          <i className="fa-regular fa-folder"></i>
          <span>Categories</span>
        </NavLink>
        <NavLink to="/transactions">
          <i className="fa-solid fa-list"></i>
          <span>Transactions</span>
        </NavLink>
        <NavLink to="/charts">
          <i className="fa-regular fa-chart-bar"></i>
          <span>Charts</span>
        </NavLink>

        <hr />

        <NavLink to="/import">
          <i className="fa-regular fa-file"></i>
          <span>Import</span>
        </NavLink>
        <NavLink to="/dev">
          <i className="fa-regular fa-file-code"></i>
          <span>Dev Tools</span>
        </NavLink>
      </div>

      <hr />

      <div className="viewmode">
        <p>Current view mode: </p>
        <p className="mobile">Mobile</p>
        <p className="tablet">Tablet</p>
        <p className="laptop">Laptop</p>
        <p className="desktop">Desktop</p>
      </div>
    </nav>
  );
}

export default NavBar
