
import Hero from "../components/Hero";
// import ProductCarousel from "../components/CarouselProduct"; // sliding products
import ProductSlider from "../components/ProductSlider";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      

      <div>
      <Hero/>
      </div>
       <Welcome />

      {/* Product Carousel / Highlights
      <section className="product-highlights">
        <h2>Our Featured Products</h2>
        <ProductCarousel />
      </section> */}

      <ProductSlider />



     

      
    </>
  );
}

export default Home;