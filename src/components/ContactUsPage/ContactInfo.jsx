import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";
import "./ContactInfo.css";

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <h2 className="contact-info-title">Our Details</h2>
      <p className="contact-info-sub">
        Reach us directly or fill out the form and we'll get back to you within
        one business day.
      </p>

      {/* Address */}
      <a
        href="https://maps.google.com/?q=B No C-103 Balaji Complex Parnali Naka Boisar Maharashtra 401501"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-detail-link"
      >
        <div className="contact-detail-card">
          <div className="contact-icon-wrap">
            <FaMapMarkerAlt />
          </div>
          <div>
            <div className="contact-detail-label">Address</div>
            <div className="contact-detail-value">
              B No C-103, Balaji Complex,
              <br />
              Parnali Naka, Boisar,
              <br />
              Palghar – 401501,
              <br />
              Maharashtra, India
            </div>
          </div>
        </div>
      </a>

      {/* Phone */}
      <a href="tel:+919860480063" className="contact-detail-link">
        <div className="contact-detail-card">
          <div className="contact-icon-wrap">
            <FaPhoneAlt />
          </div>
          <div>
            <div className="contact-detail-label">Phone</div>
            <div className="contact-detail-value">+91 98604 80063</div>
          </div>
        </div>
      </a>

      {/* Email */}
      <a href="mailto:nirlaxson@gmail.com" className="contact-detail-link">
        <div className="contact-detail-card">
          <div className="contact-icon-wrap">
            <FaEnvelope />
          </div>
          <div>
            <div className="contact-detail-label">Email</div>
            <div className="contact-detail-value">nirlaxson@gmail.com</div>
          </div>
        </div>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919860480063"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-detail-link"
      >
        <div className="contact-detail-card">
          <div className="contact-icon-wrap">
            <FaWhatsapp />
          </div>
          <div>
            <div className="contact-detail-label">WhatsApp</div>
            <div className="contact-detail-value">Chat With Us</div>
          </div>
        </div>
      </a>

      {/* Business Hours */}
      <div className="contact-hours">
        <div className="contact-hours-title">
          <FaClock style={{ marginRight: 8, verticalAlign: "-2px" }} />
          Business Hours
        </div>
        <div className="contact-hours-row">
          <span>Monday – Friday</span>
          <span>9:00 AM – 6:00 PM</span>
        </div>
        <div className="contact-hours-row">
          <span>Saturday</span>
          <span>9:00 AM – 2:00 PM</span>
        </div>
        <div className="contact-hours-row">
          <span>Sunday</span>
          <span>Closed</span>
        </div>
      </div>
    </div>
  );
}