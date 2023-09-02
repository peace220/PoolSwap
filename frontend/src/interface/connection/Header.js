import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1>My App Header</h1>
      <Link to="/liquidity-pool">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">Add Liquidity</button>
      </Link>
      <Link to="/remove-liquidity">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">Remove Liquidity</button>
      </Link>
      <Link to="/token-swap">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">Swap</button>
      </Link>
    </div>
  );
};

export default Header;
