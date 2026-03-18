import { useState } from "react";

import SplashScreen   from "./components/SplashScreen";
import Navbar         from "./components/Navbar";
import Footer         from "./components/Footer";
import Home           from "./pages/Home";
import CompanyProfile from "./pages/CompanyProfile";
import Products       from "./pages/Products";
import ContactUs      from "./pages/ContactUs";

import "./App.css";

function App() {

  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":     return <Home           setCurrentPage={setCurrentPage} />;
      case "profile":  return <CompanyProfile setCurrentPage={setCurrentPage} />;
      case "products": return <Products       setCurrentPage={setCurrentPage} />;
      case "contact":  return <ContactUs      setCurrentPage={setCurrentPage} />;
      default:         return <Home           setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <SplashScreen />

      <div className="top-bar">
        <div>Welcome to Nirlaxson Industries</div>
        <div>
          {/* Use a <button> instead of <a href="#"> for semantic correctness */}
          <button
            className="cta-btn"
            onClick={() => setCurrentPage("contact")}
          >
            Talk With Expert
          </button>
        </div>
      </div>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="page-wrapper">
        {renderPage()}
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;