import { useRef, useState, useEffect } from "react";
import { NAVY, YELLOW, GRAY, LIGHT, timeline, whyUs } from "./companyData";
import "./JourneyAndWhySection.css";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

const WHY_ICONS = [
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>,

  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>,

  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>,

  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>,

  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,

  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="3" x2="12" y2="9" />
    <line x1="12" y1="15" x2="12" y2="21" />
    <line x1="3" y1="12" x2="9" y2="12" />
    <line x1="15" y1="12" x2="21" y2="12" />
  </svg>,
];

export default function JourneyAndWhySection() {
  const [ref, inView] = useInView();

  return (
    <section
      className="cp-section"
      style={{
        "--navy": NAVY,
        "--yellow": YELLOW,
        "--gray": GRAY,
        "--light": LIGHT,
      }}
    >
      <div
        ref={ref}
        className="cp-journey-container"
      >
        {/* Timeline */}
        <div className={`cp-fade ${inView ? "in" : ""}`}>
          <div className="cp-sec-tag">
            <div className="cp-bar" />
            <span>OUR JOURNEY</span>
          </div>

          <h2 className="cp-heading cp-heading-margin">
            25 Years of Excellence
          </h2>

          {timeline.map((item, i) => {
            const isLast = i === timeline.length - 1;

            return (
              <div
                key={i}
                className={`cp-timeline-item ${
                  isLast
                    ? "cp-timeline-last"
                    : "cp-timeline-border"
                }`}
              >
                <div
                  className={`cp-timeline-dot ${
                    isLast
                      ? "cp-timeline-dot-navy"
                      : "cp-timeline-dot-yellow"
                  }`}
                />

                <div>
                  <span className="cp-year">
                    {item.year}
                  </span>{" "}
                  <span className="cp-title">
                    {item.title}
                  </span>

                  <div className="cp-timeline-desc">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Us */}
        <div
          className={`cp-fade ${inView ? "in" : ""}`}
          style={{ transitionDelay: ".15s" }}
        >
          <div className="cp-sec-tag">
            <div className="cp-bar" />
            <span>WHY CHOOSE US</span>
          </div>

          <h2 className="cp-heading cp-heading-tight">
            Why Industries
            <br />
            Trust Nirlaxson
          </h2>

          <p className="cp-description">
            Every machine we build is engineered to perform
            under pressure, backed by two decades of domain
            expertise and supported throughout its lifecycle.
          </p>

          <div className="cp-why-grid">
            {whyUs.map((w, i) => (
              <div key={i} className="cp-chip">
                <div className="cp-icon-box">
                  {WHY_ICONS[i]}
                </div>

                <span className="cp-chip-text">
                  {w.label}
                </span>
              </div>
            ))}
          </div>

          <a href="#contact" className="cp-btn-y">
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}