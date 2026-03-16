import Home from "./pages/Home";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {

return (

<>

<SplashScreen/>

<div className="top-bar">

<div>Welcome to Nirlaxson Industries</div>

<div>
<a href="#" className="cta-btn">
Talk With Expert
</a>
</div>

</div>

<Navbar/>

<div className="main-content">

<h2>Main Website Content</h2>
<p>Your website starts here.</p>

</div>

</>

);

}

export default App;