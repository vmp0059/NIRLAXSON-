import { useState, useEffect, useRef } from "react";
import "./ProductSlider.css";

import product1 from "../assets/products/BeadMill.png";
import product2 from "../assets/products/ButterflyMixer.png";
import product3 from "../assets/products/HighSpeedDissolver.png";
import product4 from "../assets/products/PugMixer.png";
import product5 from "../assets/products/RibbonBlender.png";
import product6 from "../assets/products/TwinShaftMixer.png";

const products = [
  { img: product1, title: "Bead Mill",            tag: "Grinding Equipment"  },
  { img: product2, title: "Butterfly Mixer",       tag: "Heavy Duty Mixing"   },
  { img: product3, title: "High Speed Dissolver",  tag: "Mixing & Blending"   },
  { img: product4, title: "Pug Mixer",             tag: "Industrial Mixing"   },
  { img: product5, title: "Ribbon Blender",        tag: "Blending Equipment"  },
  { img: product6, title: "Twin Shaft Mixer",      tag: "Dual Shaft Mixing"   },
];

// Returns class name based on distance from center
function getCardClass(index, center, total) {
  const diff = ((index - center) % total + total) % total;
  const normalized = diff > total / 2 ? diff - total : diff;
  if (normalized === 0)  return "center";
  if (normalized === 1)  return "right-1";
  if (normalized === -1) return "left-1";
  if (normalized === 2)  return "right-2";
  if (normalized === -2) return "left-2";
  return "hidden";
}

function ProductSlider() {
  const [center, setCenter] = useState(0);
  const autoRef = useRef(null);

  const total = products.length;

  const go = (dir) => {
    setCenter((c) => (c + dir + total) % total);
    resetAuto();
  };

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCenter((c) => (c + 1) % total);
    }, 4000);
  };

  useEffect(() => {
    resetAuto();
    return () => clearInterval(autoRef.current);
  }, []);

  return (
    <section className="product-slider">

      {/* Header */}
      <span className="product-slider-eyebrow">What We Make</span>
      <h2>Our Products</h2>
      <p className="product-slider-sub">
        Industrial machinery engineered for precision and performance
      </p>

      {/* Carousel */}
      <div className="ps-viewport">

        {products.map((product, i) => {
          const cardClass = getCardClass(i, center, total);
          return (
            <div
              key={i}
              className={`ps-card ${cardClass}`}
              onClick={() => { if (cardClass !== "center") { setCenter(i); resetAuto(); } }}
            >
              {/* Featured badge — only shown on center */}
              <span className="ps-featured-badge">Featured</span>

              {/* Product image */}
              <div className="ps-image-wrap">
                <img src={product.img} alt={product.title} />
              </div>

              {/* Name + tag */}
              <div className="ps-card-footer">
                <div className="ps-card-name">{product.title}</div>
                <div className="ps-card-tag">{product.tag}</div>
              </div>
            </div>
          );
        })}

        {/* Arrows */}
        <button className="ps-arrow ps-arrow-left" onClick={() => go(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="ps-arrow ps-arrow-right" onClick={() => go(1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="ps-dots">
        {products.map((_, i) => (
          <button
            key={i}
            className={`ps-dot ${i === center ? "active" : ""}`}
            onClick={() => { setCenter(i); resetAuto(); }}
            aria-label={`Product ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}

export default ProductSlider;