import { useState, useEffect, useRef } from "react";
import heroImage from "../assets/products/heroImage.jpeg";
import "./Hero.css";

import ProductImage1 from "../assets/products/HighSpeedDissolver.png";
import ProductImage2 from "../assets/products/RibbonBlender.png";
import ProductImage3 from "../assets/products/ButterflyMixer.png";
import ProductImage4 from "../assets/products/BeadMill.png";

const slides = [
  { type: "intro" },
  {
    type: "product",
    number: "01",
    tag: "Mixing & Blending",
    name: "High Speed\nDisperser",
    description:
      "Engineered for high-viscosity applications in paint and coating industries. Delivers consistent dispersion with minimal energy consumption.",
    image: ProductImage1,
    specs: [
      { label: "Speed",    value: "0–1500 RPM" },
      { label: "Power",    value: "1–75 kW"    },
      { label: "Capacity", value: "Up to 5000L" },
    ],
  },
  {
    type: "product",
    number: "02",
    tag: "Blending Equipment",
    name: "Ribbon\nBlender",
    description:
      "Ideal for uniform dry powder and granule mixing. Robust construction ensures long service life in demanding chemical plant environments.",
    image: ProductImage2,
    specs: [
      { label: "Capacity", value: "50–5000L"  },
      { label: "Power",    value: "2–55 kW"   },
      { label: "Material", value: "SS / MS"   },
    ],
  },
  {
    type: "product",
    number: "03",
    tag: "Heavy Duty Mixing",
    name: "Butterfly\nMixer",
    description:
      "Built for heavy-duty mixing of adhesives, rubber, and specialty coatings. Precision-engineered for performance.",
    image: ProductImage3,
    specs: [
      { label: "Capacity", value: "Up to 1000L" },
      { label: "Power",    value: "5–30 kW"     },
      { label: "Drive",    value: "Hydraulic"   },
    ],
  },
  {
    type: "product",
    number: "04",
    tag: "Grinding Equipment",
    name: "Bead\nMill",
    description:
      "Precision grinding for fine particle size reduction in paints, inks, and coatings. Consistent output every batch.",
    image: ProductImage4,
    specs: [
      { label: "Fineness", value: "< 1 µm"     },
      { label: "Power",    value: "2–90 kW"    },
      { label: "Flow",     value: "Continuous" },
    ],
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 7000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = (index) => {
    if (index === current) return;
    setCurrent(index);
    setAnimKey((k) => k + 1);
    startTimer();
  };

  const slide = slides[current];

  return (
    <div className="hero-wrapper">

      {/* ── SLIDE 0: Intro — untouched ── */}
      {slide.type === "intro" && (
        <div
          key={`intro-${animKey}`}
          className="hero-banner"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero-overlay">
            <h4 className="anim-tag">Founded in 2015</h4>
            <h1 className="anim-title">Nirlaxson Industries</h1>
            <p className="anim-desc">
              Delivering industrial innovation and machinery solutions for
              modern manufacturing needs.
            </p>
          </div>
        </div>
      )}

      {/* ── SLIDES 1–4: Product ── */}
      {slide.type === "product" && (
        <div key={`product-${animKey}`} className="hero-product">

          {/* Ghost number */}
          <span className="hero-ghost-number">{slide.number}</span>

          {/* Decorative background elements */}
          <div className="hero-deco-ring hero-deco-ring--1" />
          <div className="hero-deco-ring hero-deco-ring--2" />
          <div className="hero-deco-ring hero-deco-ring--3" />
          <div className="hero-deco-dots" />
          <span className="hero-deco-label">INDUSTRIAL MACHINERY</span>

          {/* Vertical accent line */}
          <div className="hero-accent-line anim-line" />

          {/* Left: Text */}
          <div className="hero-product-text">

            {/* Number badge + tag row */}
            <div className="hero-tag-row">
              <span className="hero-number-badge">{slide.number}</span>
              <span className="hero-tag-dot" />
              <span className="hero-tag anim-tag">{slide.tag}</span>
            </div>

            <h2 className="hero-product-name anim-title">
              {slide.name.split("\n").map((line, i) => (
                <span key={i} className="hero-name-line">{line}</span>
              ))}
            </h2>

            <p className="hero-product-desc anim-desc">{slide.description}</p>

            {/* ── Spec chips ── */}
            <div className="hero-specs anim-specs">
              {slide.specs.map(({ label, value }) => (
                <div key={label} className="hero-spec-chip">
                  <span className="hero-spec-label">{label}</span>
                  <span className="hero-spec-value">{value}</span>
                </div>
              ))}
            </div>

            <div className="hero-cta-row anim-btn">
              <button className="hero-product-btn">View Product</button>
              <span className="hero-slide-label">
                <strong>{slide.number}</strong> / 04
              </span>
            </div>

          </div>

          {/* Right: Image */}
          <div className="hero-product-image anim-image">
            <div className="hero-img-ring" />
            <img src={slide.image} alt={slide.name} />
          </div>

        </div>
      )}

      {/* ── Arrows ── */}
      <button
        className="hero-arrow hero-arrow-left"
        onClick={() => resetTimer((current - 1 + slides.length) % slides.length)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="hero-arrow hero-arrow-right"
        onClick={() => resetTimer((current + 1) % slides.length)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── Dots ── */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? "active" : ""}`}
            onClick={() => resetTimer(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className="hero-progress">
        <div key={`bar-${animKey}`} className="hero-progress-bar" />
      </div>

    </div>
  );
}

export default Hero;