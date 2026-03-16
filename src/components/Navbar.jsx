import logo from "../assets/blue_logo.jpeg"; // adjust path to your logo file
 
function Navbar() {
  return (
    <nav className="navbar">
 
      <img src={logo} alt="Nirlaxson Logo" className="nav-logo" />
 
      <ul className="nav-links">
        <li><a href="#">Home Page</a></li>
        <li><a href="#">Company Profile</a></li>
        <li><a href="#">Our Products</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
 
    </nav>
  );
}
 
export default Navbar;