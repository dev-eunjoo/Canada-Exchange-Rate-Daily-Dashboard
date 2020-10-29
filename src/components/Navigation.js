import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <h1> <img src="/canada.png" alt="Canada flag"/> Canada Exchange Rate - Daily Dashboard</h1>
      <button>
        <Link to='/'> Home </Link>
      </button>
      <button>
        <Link to='/about'> About </Link>
      </button>
    </nav>
  );
}

export default Navigation;
