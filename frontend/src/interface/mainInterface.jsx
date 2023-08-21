import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SetupSwapPool from "./SetupSwapPool";
import LiquidityPool from "./LiquidityPool";
import Swapping from "./swapping";
import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'


const App = () => {
  const [tokenAddress1, setTokenAddress1] = useState("");
  const [tokenAddress2, setTokenAddress2] = useState("");
  const [tokenAmount1, setTokenAmount1] = useState("");
  const [tokenAmount2, setTokenAmount2] = useState("");
  const [reserves, setReserves] = useState([]);

  const {defaultAccount, checkTokenContractOnGoerli } = SetupSwapPool();
  const {getTokenRatio, tokenQuote1, tokenQuote2,getToken1Approval} = LiquidityPool(tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2);


  //<--button handler-->
  const checktoken = async () => {
    await checkTokenContractOnGoerli(tokenAddress1);
  };

  const handleToken1AddressChange = (event) => {
    setTokenAddress1(event.target.value);
  };

  const handleToken2AddressChange = (event) => {
    setTokenAddress2(event.target.value);
  };

  const handleToken1AmountChange = (event) => {
    setTokenAmount1(event.target.value);
  };

  const handleToken2AmountChange = (event) => {
    setTokenAmount2(event.target.value);
  };

  const tokenRatioHandler = () =>{
    
  }
  const getTokenRatioHandler = async () =>{
    const tempreserve = await getToken1Approval();
  }

  return (
    <div className="mt-64 ml-64">
      {defaultAccount && <h3> Address: {defaultAccount} </h3>}
      {/*<-- Swap and Pool--> */}

      <div className="flex flex-warp">
        <div
          className={
            "dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8"
          }
        >
          <h1>Token address</h1>
          <input
            className="w-64 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="Token Address"
            value={tokenAddress1}
            onChange={handleToken1AddressChange}
          />
          <div className="mt-4 mb-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
              onClick={checktoken}
            >
              Find Token
            </button>
          </div>
          <input
            className="w-64 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="0.0"
            value={tokenAmount1}
            onChange={handleToken1AmountChange}
          />
        </div>
        <div
          className={
            "dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8"
          }
        >
          <h1>Token address</h1>
          <input
            className="w-64 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="Token Address"
            value={tokenAddress2}
            onChange={handleToken2AddressChange}
          />
          <div className="mt-4 mb-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
              onClick={checktoken}
            >
              Find Token
            </button>
          </div>
          <input
            className="w-64 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="0.0"
            value={tokenAmount2}
            onChange={handleToken2AmountChange}
          />
        </div>
      </div>
      <div>
        <h1>
          Token1 per Token2: {reserves[0] / reserves[1]} Token2 per Token1:{" "}
          {reserves[1] / reserves[0]}
        </h1>
      </div>
      <div>
      <h1>
          Token Quote 1: {tokenQuote1} Token Quote 2:{ tokenQuote2}
        </h1>
      </div>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          onClick={getTokenRatioHandler}
        >
          Add Liquidity
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
          Swap does nothing
        </button>
      </div>
      {/*<-- End Swap and Pool--> */}
      <div className="Uniswap">
        <SwapWidget/>
      </div>
      {/*<--- SwapWidget cant get goerli token??? --->*/}
    </div>
  );
};

export default App;
