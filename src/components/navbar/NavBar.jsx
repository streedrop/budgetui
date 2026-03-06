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
    </nav>
  );
}

export default NavBar
