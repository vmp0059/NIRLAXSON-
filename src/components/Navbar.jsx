
import { Link } from "react-router-dom"; // import Link
import logo from "../assets/blue_logo.jpeg"; // your logo path

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Nirlaxson Logo" className="nav-logo" />

      <ul className="nav-links">
        <li>
          <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/company-profile">Company Profile</Link>
        </li>
        <li>
          <Link to="/products">Our Products</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;