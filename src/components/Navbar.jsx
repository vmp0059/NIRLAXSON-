import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo/blue_logo.jpeg";
import "./Navbar.css";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  const links = [
    { label: "Home Page",       path: "/"         },
    { label: "Company Profile", path: "/about"    },
    { label: "Our Products",    path: "/products" },
    { label: "Contact Us",      path: "/contact"  },
  ];

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>

      {/* ── Brand block: logo + name ── */}
      <div
        className="nav-brand"
        onClick={() => {
          navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
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
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

    </nav>
  );
}

export default Navbar;