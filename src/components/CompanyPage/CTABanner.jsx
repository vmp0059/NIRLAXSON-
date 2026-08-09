import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CTABanner.css";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

export default function CTABanner() {
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  return (
    <section id="contact" className="cta-section">
      <div
        ref={ref}
        className={`cta-banner cp-fade ${inView ? "in" : ""}`}
      >
        <div className="cta-circle"></div>

        <div className="cta-content">
          <h2 className="cta-title">
            Have a project in mind?
            <br />
            <span>Let's build together.</span>
          </h2>

          <p className="cta-text">
            Complete plant setups, custom reactors, or precision fabrication —
            our team is ready.
          </p>

          <div className="cta-buttons">
            {/* Was mailto:info@nirlaxson.com — wrong domain, matched to no
                real inbox. "Contact Us" is used identically elsewhere in
                the app (Navbar, Footer) to mean the /contact page, so this
                now behaves the same way instead of opening a mail client. */}
            <button className="cp-btn-y" onClick={() => navigate("/contact")}>
              Contact Us
            </button>

            {/* Was tel:+910000000000 — placeholder fake number, corrected
                to the real number used everywhere else in the app. */}
            <a href="tel:+919860480063" className="cp-btn-y">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}