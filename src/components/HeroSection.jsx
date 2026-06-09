import { useState, useEffect, useRef } from "react";
import { NAVY, NAVY2, YELLOW, WHITE, stats } from "./companyData";

import "./HeroSection.css";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

function Counter({ target }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();

  const num = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!inView) return;

    let n = 0;
    const step = Math.ceil(num / 50);

    const t = setInterval(() => {
      n += step;

      if (n >= num) {
        setCount(num);
        clearInterval(t);
      } else {
        setCount(n);
      }
    }, 28);

    return () => clearInterval(t);
  }, [inView, num]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-circle"></div>

      <div className="hero-container">
        {/* Left */}
        <div>
          <div className="hero-badge">
            <div className="hero-badge-dot"></div>
            <span className="hero-badge-text">COMPANY PROFILE</span>
          </div>

          <h1 className="hero-title">
            About <span>Nirlaxson</span> Industries
          </h1>

          <p className="hero-description">
            25+ years manufacturing Paint, Coating, Process & Chemical Plant
            Equipment, Reactors and Fabrication solutions — trusted across India
            and 12+ countries.
          </p>

          <div className="hero-buttons">
            <a href="#capabilities" className="cp-btn-y">
              Our Capabilities
            </a>
            <a href="#contact" className="cp-btn-o">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="hero-stats">
          {stats.map((s, i) => (
            <div key={i} className="hero-stat-card">
              <div
                className="hero-stat-value"
                style={{ color: YELLOW }}
              >
                <Counter target={s.value} />
              </div>

              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}