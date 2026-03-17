import { useEffect, useState } from "react";
import logo from "../assets/image.png";
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

<img src={logo} className="logo"/>

<h1 className="company-name">
NIRLAXON INDUSTRIES
</h1>

</div>

</div>

);

}