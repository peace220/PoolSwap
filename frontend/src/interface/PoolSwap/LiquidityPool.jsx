import { ethers } from "ethers";
import UniPairABI from "../../abi/uniswapPair.json";
import SetupSwapPool from "../SetupSwapPool";
import { useEffect, useState } from "react";
import { getTokenApproval } from "../../hooks/useTokenContract";

const LiquidityPool = () => {
  const [tokenAddress1, setTokenAddress1] = useState("");
  const [tokenAddress2, setTokenAddress2] = useState("");
  const [tokenAmount1, setTokenAmount1] = useState("");
  const [tokenAmount2, setTokenAmount2] = useState("");
  const [reserves, setReserves] = useState([]);
  const [tokenReserve, setTokenReserve] = useState(null);
  const [tokenQuote1, setTokenQuote1] = useState(null);
  const [tokenQuote2, setTokenQuote2] = useState(null);
  const [prevTokenAmount1, setPrevTokenAmount1] = useState("");
  const [prevTokenAmount2, setPrevTokenAmount2] = useState("");
  const { provider, uniFactoryContract, uniRouterContract, defaultAccount, checkTokenContractOnGoerli } = SetupSwapPool();

  // useEffect(() => {
  //   setupLiquidityPool(
  //     tokenAddress1,
  //     tokenAddress2,
  //     tokenAmount1,
  //     tokenAmount2,
  //     provider,
  //     uniFactoryContract,
  //     uniRouterContract,
  //     tokenReserve,
  //     prevTokenAmount1,
  //     prevTokenAmount2
  //   );
  // }, [tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2]);
  useEffect(() => {
    const ZERO_ADDRESS = "0x000000000000000000";
    const setup = async () => {
      if (tokenAddress1 && tokenAddress2) {
        const liquidityPoolAddress = await uniFactoryContract.getPair(tokenAddress1, tokenAddress2);
        if (liquidityPoolAddress && liquidityPoolAddress !== ZERO_ADDRESS) {
          const templiquidityPoolContract = new ethers.Contract(liquidityPoolAddress, UniPairABI, provider);
          const reservesss = await templiquidityPoolContract.getReserves();
          setTokenReserve(reservesss);
        }

        if ((tokenAmount1 !== "" && !isNaN(tokenAmount1)) || (tokenAmount2 !== "" && !isNaN(tokenAmount2))) {
          try {
            if (!isNaN(tokenAmount1) && tokenAmount1 !== prevTokenAmount1) {
              //Quote for Second Token
              const tempTokenAmountETH = ethers.utils.parseEther(tokenAmount1);
              let tempTokenQuote = await uniRouterContract.getAmountOut(tempTokenAmountETH, tokenReserve[0], tokenReserve[1]);
              tempTokenQuote = ethers.utils.formatEther(tempTokenQuote)
              tempTokenQuote = customRound(tempTokenQuote)
              setTokenQuote2(tempTokenQuote);
              setPrevTokenAmount1(tokenAmount1);

            } else if (!isNaN(tokenAmount2) && tokenAmount2 !== prevTokenAmount2) {
              //Quote for First Token
              const tempTokenAmountETH = ethers.utils.parseEther(tokenAmount2);
              let tempTokenQuote = await uniRouterContract.getAmountOut(tempTokenAmountETH, tokenReserve[1], tokenReserve[0]);
              tempTokenQuote = ethers.utils.formatEther(tempTokenQuote)
              tempTokenQuote = customRound(tempTokenQuote)
              setTokenQuote1(tempTokenQuote);
              setPrevTokenAmount2(tokenAmount2);
            }
          } catch (error) {
            console.log(error);
          }

        } else {
          setTokenQuote1("");
          setTokenQuote2("");
        }
      } else {
        setTokenReserve(null);
      }
    };
    setup();
  }, [tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2]);

  function customRound(number) {
    number = parseFloat(number);
    number = number.toSignificant(6);
    return number;
  }

  const getToken1Approval = async () => {
    getTokenApproval(defaultAccount, tokenAddress1, provider)
  }

  const getToken2Approval = async () => {
    getTokenApproval(defaultAccount, tokenAddress2, provider)
  }

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

  const tokenRatioHandler = () => {

  }
  const getTokenRatioHandler = async () => {
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
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          onClick={getTokenRatioHandler}
        >
          Get Ratio
        </button>
        <h1>
          Token1 per Token2: {reserves[0] / reserves[1]} Token2 per Token1:{" "}
          {reserves[1] / reserves[0]}
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
          onClick={getToken1Approval}
        >
          Approve TokenA
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          onClick={getToken2Approval}>
          Approve TokenB
        </button>
      </div>
    </div>
  );
}

export default LiquidityPool;
