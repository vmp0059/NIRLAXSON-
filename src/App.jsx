import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <SplashScreen />

      <div className="top-bar">
        <div>Welcome to Nirlaxson Industries</div>
        <div>
          <a href="#" className="cta-btn">
            Talk With Expert
          </a>
        </div>
      </div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;