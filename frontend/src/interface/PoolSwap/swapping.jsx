import { useState, useEffect } from "react";
import SetupSwapPool from "../PoolSwap/SetupSwapPool";
import { getTokenApproval } from "../../hooks/useTokenContract";
import { setupLiquidityPool } from "./LiquidityPoolSetup";

const Swapping = () => {
    const [tokenAddress1, setTokenAddress1] = useState("");
    const [tokenAddress2, setTokenAddress2] = useState("");
    const [tokenAmount1, setTokenAmount1] = useState("");
    const [tokenAmount2, setTokenAmount2] = useState("");;
    const [tokenReserve, setTokenReserve] = useState([]);
    const [tokenQuote1, setTokenQuote1] = useState(null);
    const [tokenQuote2, setTokenQuote2] = useState(null);
    const [prevTokenAmount1, setPrevTokenAmount1] = useState("");
    const [prevTokenAmount2, setPrevTokenAmount2] = useState("");
    const { provider, uniFactoryContract, uniRouterContract, defaultAccount, checkTokenContractOnGoerli } = SetupSwapPool();


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


    return (
        <div className="mt-64 ml-64">
            <h1 className="text-4xl">Swap</h1>
            {defaultAccount && <h3> Address: {defaultAccount} </h3>}
            {/*<-- Swap and Pool--> */}

            <div className="flex flex-wrap">
                <div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8 pt-4 pb-4 flex flex-col">
                    <h1 className="text-left mb-4">Token address</h1>
                    <div className="flex flex-col">
                        <input
                            className="w-64 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
                            type="text"
                            placeholder="Token Address"
                            value={tokenAddress1}
                            onChange={handleToken1AddressChange}
                        />
                        <input
                            className="w-64 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 mt-4"
                            type="text"
                            placeholder="0.0"
                            value={tokenAmount1}
                            onChange={handleToken1AmountChange}
                        />
                    </div>
                </div>

                <div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8 pt-4 pb-4 flex flex-col">
                    <h1 className="text-left mb-4">Token address</h1>
                    <div className="flex flex-col">
                        <input
                            className="w-64 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
                            type="text"
                            placeholder="Token Address"
                            value={tokenAddress2}
                            onChange={handleToken2AddressChange}
                        />
                        <input
                            className="w-64 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 mt-4"
                            type="text"
                            placeholder="0.0"
                            value={tokenAmount2}
                            onChange={handleToken2AmountChange}
                        />
                    </div>
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
};

export default Swapping;
