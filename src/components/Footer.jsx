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

function Footer({ setCurrentPage }) {
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

          {/* SOCIAL ICONS */}
          <div className="socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setCurrentPage("home");
              }}>
                Home Page
              </a>
            </li>

            <li>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setCurrentPage("profile");
              }}>
                Company Profile
              </a>
            </li>

            <li>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setCurrentPage("products");
              }}>
                Our Products
              </a>
            </li>

            <li>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setCurrentPage("contact");
              }}>
                Contact Us
              </a>
            </li>

            <li>
              <a href="#">
                Site Map
              </a>
            </li>
          </ul>
        </div>

        {/* PRODUCTS */}
        <div className="footer-col">
          <h3>Our Products</h3>
          <ul>
            <li><a href="#">Industrial Disperser</a></li>
            <li><a href="#">Mixer Machine</a></li>
            <li><a href="#">Bead Mill Machine</a></li>
            <li><a href="#">Lab Stirrer</a></li>
            <li><a href="#">Ball Mill Machine</a></li>
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

      {/* INQUIRY BAR */}
      <div className="inquiry-bar">
        <button>Send Inquiry</button>
        <button>Send SMS</button>
        <button>Call Me Free</button>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        © 2026 Nirlaxson Industries. All Rights Reserved
      </div>

    </footer>
  );
}

export default Footer;