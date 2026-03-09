import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/charts">Charts</Link>
      <Link to="/import">Import</Link>
      <p>Current view mode: </p>
      <p className="mobile">Mobile</p>
      <p className="tablet">Tablet</p>
      <p className="laptop">Laptop</p>
      <p className="desktop">Desktop</p>
    </nav>
  );
}

export default NavBar
