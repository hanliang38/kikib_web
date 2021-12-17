import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/WebDrawable/kikiB_BI.png';

const Navbar = () => {
  return (
    <div id="navbar">
      <Link id="logo" to="/main">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Navbar;
