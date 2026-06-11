
import Hero from "../components/HomePage/Hero";
// import ProductCarousel from "../components/CarouselProduct"; // sliding products
import ProductSlider from "../components/HomePage/ProductSlider";
import Welcome from "../components/Welcome";
import StatsBar from "../components/HomePage/StatsBar";
import ClientsSlider from "../components/HomePage/ClientsSlider";

function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Welcome />
      <ProductSlider />
      <ClientsSlider />
    </>
  );
}

export default Home;
