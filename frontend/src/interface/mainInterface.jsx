import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from'./connection/Header';
import LiquidityPool from "./PoolSwap/LiquidityPool";
import Swapping from "./PoolSwap/swapping";
import RemoveLiquidity from "./PoolSwap/RemoveLiquidity";
import '@uniswap/widgets/fonts.css'


const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/liquidity-pool" element={<LiquidityPool />} />
          <Route path="/remove-liquidity" element={<RemoveLiquidity />} />
          <Route path="/token-swap" element={<Swapping />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
