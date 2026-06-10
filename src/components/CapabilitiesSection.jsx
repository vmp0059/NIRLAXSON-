import { useRef, useState, useEffect } from "react";
import { NAVY, services } from "./companyData";
import "./CapabilitiesSection.css";

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

const ICONS = [
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round"><path d="M19 11H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z"/><path d="M9 11V7a3 3 0 0 1 6 0v4"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round"><path d="M9 3v10.56A4 4 0 1 0 15 13.56V3"/><line x1="9" y1="9" x2="15" y2="9"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
];

export default function CapabilitiesSection() {
  const [ref, inView] = useInView();

  return (
    <section id="capabilities" className="cap-section">
      <div className="cap-container">

        <div className="cp-sec-tag">
          <div className="cp-bar"></div>
          <span>WHAT WE BUILD</span>
        </div>

        <h2 className="cap-heading">
          Our Capabilities
        </h2>

        <div
          ref={ref}
          className="cap-grid"
        >
          {services.map((s, i) => (
            <div
              key={i}
              className={`cap-card cp-fade ${inView ? "in" : ""}`}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="cap-card-top">
                <div className="cap-icon">
                  {ICONS[i]}
                </div>

                <span className="cp-snum">
                  {s.num}
                </span>
              </div>

              <h3 className="cap-title">
                {s.title}
              </h3>

              <p className="cap-desc">
                {s.desc}
              </p>

              <div>
                {s.tags.map((t) => (
                  <span key={t} className="cp-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}