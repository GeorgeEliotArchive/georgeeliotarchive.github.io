import React from "react";

import geLogo from "../../../assets/logo2.jpg";
import lg from "./Logo.module.css";
import { Link } from "react-router-dom";


const logo = (props) => (
  <div className={lg.Logo} style={{ height: props.height }}>
    
    <Link to="/">
    <img src={geLogo} alt="George Eliot" />
    </Link>
   
    
    
  </div>
);

export default logo;
