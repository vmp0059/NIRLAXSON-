import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo/blue-logo.png";
import "./Navbar.css";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll while the mobile menu is open, and close on Escape.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Always keep the navbar visible while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) setShowNavbar(true);
  }, [menuOpen]);

  const links = [
    { label: "Home Page",       path: "/"         },
    { label: "Company Profile", path: "/about"    },
    { label: "Our Products",    path: "/products" },
    { label: "Contact Us",      path: "/contact"  },
  ];

  const closeMenu = () => setMenuOpen(false);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  };

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"} ${menuOpen ? "menu-open" : ""}`}>
      <div className="navbar-row">
        {/* ── Brand block: logo + name ── */}
        <div
          className="nav-brand"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
            closeMenu();
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="Nirlaxson Logo"
            className="nav-logo"
          />
          <div className="nav-brand-text">
            <span className="nav-brand-name">NIRLAXSON</span>
            <span className="nav-brand-sub">INDUSTRIES</span>
          </div>
        </div>

        <ul className="nav-links">
          {links.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Mobile hamburger toggle ── */}
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </div>

      {/* ── Mobile menu panel ── */}
      <div
        id="mobile-nav-menu"
        className={`mobile-nav-panel ${menuOpen ? "open" : ""}`}
      >
        <ul className="mobile-nav-links">
          {links.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Backdrop ── */}
      {menuOpen && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
}

export default Navbar;
