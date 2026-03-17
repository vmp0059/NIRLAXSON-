import { useEffect, useState } from "react";
import logo from "../assets/blue_logo.jpeg";
import "./Navbar.css";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ignore very small scrolls (important)
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // scrolling DOWN → hide
        setShowNavbar(false);
      } else {
        // scrolling UP → show
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>
      <img src={logo} alt="Nirlaxson Logo" className="nav-logo" />

      <ul className="nav-links">
        <li><a href="#">Home Page</a></li>
        <li><a href="#">Company Profile</a></li>
        <li><a href="#">Our Products</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;