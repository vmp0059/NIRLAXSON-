
import Hero from "../components/Hero";
// import ProductCarousel from "../components/CarouselProduct"; // sliding products
import ProductSlider from "../components/ProductSlider";
import Welcome from "../components/Welcome";
import StatsBar from "../components/StatsBar";
import ClientsSlider from "../components/ClientsSlider";

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
