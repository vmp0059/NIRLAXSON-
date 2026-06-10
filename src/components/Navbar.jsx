import { useEffect, useState } from "react";
import logo from "../assets/logo/blue_logo.jpeg";
import "./Navbar.css";

function Navbar({ currentPage, setCurrentPage }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { label: "Home Page",       page: "home"     },
    { label: "Company Profile", page: "profile"  },
    { label: "Our Products",    page: "products" },
    { label: "Contact Us",      page: "contact"  },
  ];

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>

      {/* ── Brand block: logo + name ── */}
      <div
        className="nav-brand"
        onClick={() => navigate("home")}
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
        {links.map(({ label, page }) => (
          <li key={page}>
            <a                                             
              href="#"
              className={currentPage === page ? "active" : ""}
              onClick={(e) => { e.preventDefault(); navigate(page); }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

    </nav>
  );
}

export default Navbar;