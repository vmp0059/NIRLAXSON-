import { useEffect, useState } from "react";
import logo from "../assets/logo/image.webp";
import "../App.css";
import "./SplashScreen.css";
export default function SplashScreen() {

const [visible,setVisible] = useState(true);

useEffect(()=>{

setTimeout(()=>{
setVisible(false);
},3800);

},[]);

if(!visible) return null;

return (

<div id="intro">

<div className="intro-content">

<img src={logo} className="logo" alt="Nirlaxson Industries"/>

{/* Not an <h1>: it appears on every page, and each page has its own. */}
<div className="company-name">
NIRLAXSON INDUSTRIES
</div>

</div>

</div>

);

}