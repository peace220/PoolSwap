import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios"; //trying to use etherscan api to get token name
import UniFactoryABI from "../abi/uniswapFactory.json";
import UniRouterABI from "../abi/uniswapRouter.json";
import UniPairABI from "../abi/uniswapPair.json";

const App = () => {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [tokenAddress1, setTokenAddress1] = useState();
  const [tokenAddress2, setTokenAddress2] = useState();
  const [uniRouter, setUniRouter] = useState(null);
  const [uniFactory, setUniFactory] = useState(null);
  const [reserves, setReserves] = useState([]);
  const [liquidityPoolContract, setLiquidityPoolContract] = useState(null);
  const testing = 0;

  const uniSwapRouterAdd = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; //uniswap v2 router address
  const uniSwapFactoryAdd = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"; //uniswap v2 factory address
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            accountChangeHandler(result[0]);
          })
          .catch((error) => {
            console.error("Error connecting wallet:", error);
          });
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        const tempRouter = new ethers.Contract(
          uniSwapRouterAdd,
          UniRouterABI,
          provider
        );
        const tempFactory = new ethers.Contract(
          uniSwapFactoryAdd,
          UniFactoryABI,
          provider
        );
        setUniRouter(tempRouter);
        setUniFactory(tempFactory);
        setProvider(tempProvider);
        console.log((Date.now() / 1000).toFixed(0));
      } else {
        console.error("MetaMask extension not found.");
      }
    };
    init();
    window.ethereum.on("accountsChanged", (accounts) => {
      setDefaultAccount(accounts[0]);
    });
  }, []);

  async function checkTokenContractOnGoerli(tokenContractAddress) {
    try {
      const code = await provider.getCode(tokenContractAddress);
      if (code === "0x") {
        alert("Token not found");
      } else {
        alert("Token found");
      }
    } catch (error) {
      alert(error);
    }
  }

  async function addLiquidity() {
    const liquidityPoolAddress = await uniFactory.getPair(
      tokenAddress1,
      tokenAddress2
    );
    alert(liquidityPoolAddress);

    if (liquidityPoolAddress !== "0x0000000000000000000000000000000000000000") {
      const tempLPcontract = new ethers.Contract(
        liquidityPoolAddress,
        UniPairABI,
        provider
      );
      setLiquidityPoolContract(tempLPcontract);
      const tokenReserve = await liquidityPoolContract.getReserves();
      setReserves(tokenReserve);
      const response = await axios.get(
        `https://api-goerli.etherscan.io/api?module=account&action=tokenlist&address=${tokenAddress1}`
      );
      if (response.data.status === "1") {
        const token = response.data.result.find(
          (t) => t.contractAddress.toLowerCase() === tokenAddress1.toLowerCase()
        );
        alert(token);
        if (token) {
          setTokenInfo(token);
        }
      }
    }
  }

  async function swapToken() {}

  async function quote() {}

  //<--button handler-->
  const checktoken = async () => {
    await checkTokenContractOnGoerli(tokenAddress1);
  };

  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
  };

  const handleToken1Change = (event) => {
    setTokenAddress1(event.target.value);
  };

  const handleToken2Change = (event) => {
    setTokenAddress2(event.target.value);
  };

  return (
    <div className="mt-64 ml-64">
      {defaultAccount && <h3> Address: {tokenInfo} </h3>}
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
        <h1>
          Token1 per Token2: {reserves[0] / reserves[1]} Token2 per Token1:{" "}
          {reserves[1] / reserves[0]}
        </h1>
      </div>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          onClick={addLiquidity}
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
