import { useEffect, useState } from "react";
import "./ProductSlider.css";


import product1 from "../assets/BeadMill.png";
import product2 from "../assets/ButterflyMixer.png";
import product3 from "../assets/HighSpeedDissolver.png";
import product4 from "../assets/PugMixer.png";
import product5 from "../assets/RibbonBlender.png";
import product6 from "../assets/TwinShaftMixer.png";


const ProductSlider = () => {
  return (
    <section className="product-slider">
      <h2>Our Products</h2>

      <div className="slider-track">
        <div className="slide">
          <img src={product1} alt="product1" />
        </div>
        <div className="slide">
          <img src={product2} alt="product2" />
        </div>
        <div className="slide">
          <img src={product3} alt="product3" />
        </div>
        <div className="slide">
          <img src={product4} alt="product4" />
        </div>

        {/* duplicate for smooth infinite sliding */}
        <div className="slide">
          <img src={product5} alt="product1" />
        </div>
        <div className="slide">
          <img src={product6} alt="product2" />
        </div>
        <div className="slide">
          <img src={product3} alt="product3" />
        </div>
        <div className="slide">
          <img src={product4} alt="product4" />
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;