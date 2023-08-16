import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SetupSwapPool from "./SetupSwapPool";
import AddLiquidity from "./addLiquidity";
import useTokenRatio from "./tokenRatio";

const App = () => {
  const {defaultAccount, checkTokenContractOnGoerli } = SetupSwapPool();
  const [tokenAddress1, setTokenAddress1] = useState("");
  const [tokenAddress2, setTokenAddress2] = useState("");
  const [reserves, setReserves] = useState([]);
  const {getTokenRatio123} = useTokenRatio();
  const {} = AddLiquidity(tokenAddress1, tokenAddress2);

  //<--button handler-->
  const checktoken = async () => {
    alert(defaultAccount);
    await checkTokenContractOnGoerli(tokenAddress1);
  };

  const handleToken1Change = (event) => {
    setTokenAddress1(event.target.value);
  };

  const handleToken2Change = (event) => {
    setTokenAddress2(event.target.value);
  };

  const tokenRatioHandler = () =>{
    
  }
  const addLiquidityHandler = async () =>{
    const tempreserve = await getTokenRatio123();

    setReserves(tempreserve);
  
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
            onChange={handleToken1Change}
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
            onChange={handleToken2Change}
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
          />
        </div>
      </div>
      <div>
        {"possible division by zero, check for this condition"}
        <h1>
          Token1 per Token2: {reserves[0] / reserves[1]} Token2 per Token1:{" "}
          {reserves[1] / reserves[0]}
        </h1>
      </div>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          onClick={addLiquidityHandler}
        >
          Add Liquidity
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
          Swap does nothing
        </button>
      </div>
      {/*<-- End Swap and Pool--> */}
    </div>
  );
};

export default App;
