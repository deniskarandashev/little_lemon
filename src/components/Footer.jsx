import { Link } from "react-router-dom";

// Site footer with contact details and quick links.
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <span className="logo">Little Lemon</span>
        <p>Chicago, Illinois</p>
      </div>
      <nav aria-label="Footer navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/booking">Reservations</Link>
          </li>
        </ul>
      </nav>
      <p className="copyright">
        &copy; {new Date().getFullYear()} Little Lemon. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
