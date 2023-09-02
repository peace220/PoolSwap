import SetupSwapPool from "./SetupSwapPool";
import { useEffect, useState } from "react";
import { getTokenApproval , getTokenAllowance} from "../../hooks/useTokenContract";
import { setupLiquidityPool } from "./LiquidityPoolSetup";
import { useAddLiquidity } from "../../hooks/useRouterContract";

const LiquidityPool = () => {
  const [tokenAddress1, setTokenAddress1] = useState("");
  const [tokenAddress2, setTokenAddress2] = useState("");
  const [tokenAmount1, setTokenAmount1] = useState("");
  const [tokenAmount2, setTokenAmount2] = useState("");
  const [tokenReserve, setTokenReserve] = useState([]);
  const [tokenAllowance1, setTokenAllowance1] = useState("");
  const [tokenAllowance2, setTokenAllowance2] = useState("");
  const [tokenQuote1, setTokenQuote1] = useState(null);
  const [tokenQuote2, setTokenQuote2] = useState(null);
  const [prevTokenAmount1, setPrevTokenAmount1] = useState("");
  const [prevTokenAmount2, setPrevTokenAmount2] = useState("");
  const { provider, uniFactoryContract, uniRouterContract, defaultAccount } = SetupSwapPool();

  useEffect(() => {
    setupLiquidityPool({
      tokenAddress1,
      tokenAddress2,
      tokenAmount1,
      tokenAmount2,
      provider,
      uniFactoryContract,
      uniRouterContract,
      tokenReserve,
      prevTokenAmount1,
      prevTokenAmount2,
      setTokenReserve,
      setTokenQuote1,
      setTokenQuote2,
      setPrevTokenAmount1,
      setPrevTokenAmount2
    });

    
  }, [tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2]);

  const getToken1Allowance = async()=>{
    const temptokenAllowance = await getTokenAllowance(defaultAccount,tokenAddress1,provider);
    setTokenAllowance1(temptokenAllowance);
  }
  const getToken2Allowance = async()=>{
    const temptokenAllowance = await getTokenAllowance(defaultAccount,tokenAddress2,provider);
    setTokenAllowance2(temptokenAllowance);
  }

  async function AddLiquidity (){
    useAddLiquidity(tokenAddress1,tokenAddress2,tokenAmount1,defaultAccount,provider,tokenReserve)
  }

  {/*<---- Interface Handler ----> */}
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

  return (
    <div className="mt-16 ml-64">
      <h1 className ="text-4xl">Remove Liquidity</h1>
      {defaultAccount && <h3> Address: {defaultAccount} </h3>}
      <h2>TokenA Allowance: {tokenAllowance1}     TokenB Allowance: {tokenAllowance2}</h2>
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
          Token1 per Token2: {tokenReserve[0] / tokenReserve[1]} Token2 per Token1:{" "}
          {tokenReserve[1] / tokenReserve[0]}
        </h1>
      </div>
      <div>
        <h1>
          Token Quote 1: {tokenQuote1} Token Quote 2:{tokenQuote2}
        </h1>
      </div>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          onClick={getToken1Allowance}
        >
          Get TokenA Allowance
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          onClick={getToken2Allowance}>
          Get TokenB Allowance
        </button>
      </div>
      <div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          onClick={AddLiquidity}>
          RemoveLiquidity
        </button>
      </div>
    </div>
  );
}

export default LiquidityPool;
