import "./ProductSlider.css";

import product1 from "../assets/BeadMill.png";
import product2 from "../assets/ButterflyMixer.png";
import product3 from "../assets/HighSpeedDissolver.png";
import product4 from "../assets/PugMixer.png";
import product5 from "../assets/RibbonBlender.png";
import product6 from "../assets/TwinShaftMixer.png";

const products = [
  { img: product1, title: "Bead Mill" },
  { img: product2, title: "Butterfly Mixer" },
  { img: product3, title: "High Speed Dissolver" },
  { img: product4, title: "Pug Mixer" },
  { img: product5, title: "Ribbon Blender" },
  { img: product6, title: "Twin Shaft Mixer" },
];

const ProductSlider = () => {
  return (
    <section className="product-slider">
      <h2>Our Products</h2>

            <div className="slider-wrapper">
        <div className="slider">
          <div className="slider-track">
            {[...products, ...products].map((item, index) => (
              <div className="card" key={index}>
                <div className="image-box">
                  <img src={item.img} alt={item.title} />
                </div>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;