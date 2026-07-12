import { Link, NavLink } from "react-router-dom";

// Site header with logo and primary navigation.
function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo" aria-label="Little Lemon home">
        Little Lemon
      </Link>
      <nav aria-label="Main navigation">
        <ul className="nav-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/booking">Reservations</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
