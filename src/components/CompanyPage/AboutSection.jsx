import { useRef, useState, useEffect } from "react";
import "./AboutSection.css";
//
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.12 }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

const VALUES = [
  {
    title: "Precision Engineering",
    desc: "Exacting tolerances for demanding environments",
  },
  {
    title: "Innovation at Core",
    desc: "Evolving designs for next-generation processing",
  },
  {
    title: "Customer Partnership",
    desc: "End-to-end support from design to commissioning",
  },
  {
    title: "Quality Assurance",
    desc: "ISO-certified quality at every production stage",
  },
];

export default function AboutSection() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="about-section">
      <div className="about-container">

        <div className="about-tag">
          <div className="about-tag-line"></div>
          <span>ABOUT US</span>
        </div>

        <div
          ref={ref}
          className={`about-grid cp-fade ${inView ? "in" : ""}`}
        >
          <div className="about-content">
            <h2 className="about-title">
              Engineering excellence,
              <br />
              built to last.
            </h2>

            <p className="about-text">
              Founded in 1999, Nirlaxson Industries manufactures precision
              equipment for paint, coating, chemical and process industries.
              We combine deep domain expertise with innovative fabrication
              to deliver machinery that performs under pressure.
            </p>

            <p className="about-text">
              Our vision is to build a globally recognized Indian manufacturing
              brand where engineering excellence meets world-class standards.
            </p>
          </div>

          <div className="about-values">
            {VALUES.map((value, index) => (
              <div key={index} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}