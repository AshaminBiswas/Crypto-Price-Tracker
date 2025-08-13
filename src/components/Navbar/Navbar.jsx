import React, { useContext } from "react";
import "./Navbar.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };
  return (
    <div className="navbar">
      <Link to={`/`} className="logo">
        <p>
          CP <span>Tracker</span>
        </p>
      </Link>
      <ul>
        <Link to={`/`}>Home</Link>
        <Link to={`/feature`}>Feature</Link>
        <Link to={`/blog`}>Blog</Link>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
        </select>
        <button>Sign UP</button>
      </div>
    </div>
  );
};

export default Navbar;
