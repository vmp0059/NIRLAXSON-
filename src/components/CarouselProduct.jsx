import "./CarouselProduct.css";

// Example product images (put in /src/assets/)
import prod1 from "../assets/BeadMill.png";
import prod2 from "../assets/ButterflyMixer.png";
import prod3 from "../assets/HighSpeedDissolver.png";
import prod4 from "../assets/PugMixer.png";
import prod5 from "../assets/RibbonBlender.png";
import prod6 from "../assets/TwinShaftMixer.png";

const products = [prod1, prod2, prod3, prod4];

function CarouselProduct() {
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {products.map((img, idx) => (
          <div className="carousel-item" key={idx}>
            <img src={img} alt={`Product ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarouselProduct;