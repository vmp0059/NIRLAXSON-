import { useNavigate, Routes, Route } from "react-router-dom";

import SplashScreen   from "./components/SplashScreen";
import Navbar         from "./components/Navbar";
import Footer         from "./components/Footer";
import Home           from "./pages/Home";
import CompanyProfile from "./pages/CompanyProfile";
import Products       from "./pages/Products";
import ProductDetail  from "./pages/ProductDetail";
import ContactUs      from "./pages/ContactUs";

import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <SplashScreen />

      <div className="top-bar">
        <div>Welcome to Nirlaxson Industries</div>
        <div>
          <button
            className="cta-btn"
            onClick={() => navigate("/contact")}
          >
            Talk With Expert
          </button>
        </div>
      </div>

      <Navbar />

      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<CompanyProfile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;