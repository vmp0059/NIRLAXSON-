import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";

import { products } from "../assets/products/data";
import { getProductSlug } from "../utils/product";

// 5 real products from data.js shown in the footer's "Our Products" column.
// Chosen to match the previous placeholder labels as closely as possible by
// actual product identity — "Bead Mill Machine", "Lab Stirrer", and
// "Ball Mill Machine" map directly. "Industrial Disperser" and "Mixer
// Machine" had NO matching product anywhere in data.js, so they're replaced
// with two other real, working products rather than left as fake links.
const FOOTER_PRODUCT_NAMES = [
  "High Speed Disperser (Motorised Lifting)",
  "Pug Mixer",
  "Bead Mill",
  "Lab Stirrer Mixer",
  "Industrial Ball Mill Machine",
];

const footerProducts = FOOTER_PRODUCT_NAMES
  .map((name) => products.find((p) => p.name === name))
  .filter(Boolean);

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT - CONTACT */}
        <div className="footer-col">
          <h3>Contact Details</h3>

          <p>
            <FaMapMarkerAlt className="icon" />
            B No C - 103, Balaji Complex, Parnali Naka,<br />
            Boisar, Palghar - 401501, Maharashtra, India
          </p>

          <p>
            <FaPhoneAlt className="icon" />
            +91 9860480063
          </p>

          <p>
            <FaEnvelope className="icon" />
            nirlaxson@gmail.com
          </p>

          {/* SOCIAL ICONS — no real profiles exist yet (legacy site's own
              footer uses javascript:void(0) for these too, confirmed in
              includes/copyright.php). Kept as visual placeholders but
              prevented from scrolling the page to top on click. */}
          <div className="socials">
            <a href="#" onClick={(e) => e.preventDefault()}><FaFacebookF /></a>
            <a href="#" onClick={(e) => e.preventDefault()}><FaLinkedinIn /></a>
            <a href="#" onClick={(e) => e.preventDefault()}><FaInstagram /></a>
            <a href="#" onClick={(e) => e.preventDefault()}><FaYoutube /></a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>

            <li>
              <Link to="/about">Company Profile</Link>
            </li>

            <li>
              <Link to="/products">Our Products</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            <li>
              {/* No sitemap page exists in this project or the legacy site.
                  Not creating a fake route — kept visually identical,
                  non-navigating. */}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Site Map
              </a>
            </li>
          </ul>
        </div>

        {/* PRODUCTS */}
        <div className="footer-col">
          <h3>Our Products</h3>
          <ul>
            {footerProducts.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${getProductSlug(product)}`}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* MAP */}
        <div className="footer-col map">
          <h3>Head Office</h3>

          <iframe
            title="location"
            src="https://maps.google.com/maps?q=boisar%20maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>

      </div>

      {/* INQUIRY BAR — previously had no onClick at all */}
      <div className="inquiry-bar">
        <button onClick={() => navigate("/contact")}>
          Send Inquiry
        </button>

        <button onClick={() => { window.location.href = "sms:+919860480063"; }}>
          Send SMS
        </button>

        <button onClick={() => { window.location.href = "tel:+919860480063"; }}>
          Call Me Free
        </button>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        © 2026 Nirlaxson Industries. All Rights Reserved
      </div>

    </footer>
  );
}

export default Footer;