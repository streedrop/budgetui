import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/transactions">Transactions</Link>
    </nav>
  );
}

export default NavBar
