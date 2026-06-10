import { useRef, useState, useEffect } from "react";
import "./CTABanner.css";
//
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
            <a href="mailto:info@nirlaxson.com" className="cp-btn-y">
              Contact Us
            </a>

            <a href="tel:+910000000000" className="cp-btn-y">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}