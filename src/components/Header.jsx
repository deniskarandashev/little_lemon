import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

// Site header with logo and primary navigation.
function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // "Menu" scrolls to the specials section on the home page (there is no
  // separate menu route in the project scope). From other routes we navigate
  // home first, then scroll once the section has rendered.
  const handleMenu = (event) => {
    event.preventDefault();
    const scroll = () =>
      document
        .getElementById("specials")
        ?.scrollIntoView({ behavior: "smooth" });

    if (pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 50);
    } else {
      scroll();
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo" aria-label="Little Lemon home">
        <img className="logo-icon" src="/images/logo.svg" alt="" />
        Little Lemon
      </Link>
      <nav aria-label="Main navigation">
        <ul className="nav-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <a href="/#specials" onClick={handleMenu}>
              Menu
            </a>
          </li>
          <li>
            <NavLink to="/booking">Reserve a table</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
