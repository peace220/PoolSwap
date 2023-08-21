import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import UniPairABI from "../abi/uniswapPair.json";
import SetupSwapPool from "./SetupSwapPool";

const Swapping = (tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2) => {
    const [tokenReserve, setTokenReserve] = useState(null);
    const [liquidityPoolContract, setLiquidityPoolContract] = useState(null);
    const [tokenQuote1, setTokenQuote1] = useState(null);
    const [tokenQuote2, setTokenQuote2] = useState(null);
    const [prevTokenAmount1, setPrevTokenAmount1] = useState("");
    const [prevTokenAmount2, setPrevTokenAmount2] = useState("");
    const { provider, uniFactoryContract,uniRouterContract } = SetupSwapPool();


    useEffect(() => {
        const ZERO_ADDRESS = "0x";

        const setup = async () => {
            if (tokenAddress1 && tokenAddress2) {
                const liquidityPoolAddress = await uniFactoryContract.getPair(tokenAddress1, tokenAddress2);
                // if (liquidityPoolAddress && liquidityPoolAddress !== ZERO_ADDRESS) {
                //     const templiquidityPoolContract = new ethers.Contract(liquidityPoolAddress, UniPairABI, provider);
                //     const reservesss = await templiquidityPoolContract.getReserves();
                //     setTokenReserve(reservesss);
                //     setLiquidityPoolContract(templiquidityPoolContract);
                // }
                if (tokenAmount1 !== "" || tokenAmount2 !== "") {
                    if (tokenAmount1 !== prevTokenAmount1) {
                        const tempTokenQuote2 = await uniRouterContract.quote(tokenAmount1, tokenReserve[0], tokenReserve[1]);
                        setTokenQuote2(tempTokenQuote2);
                    } else if (tokenAmount2 !== prevTokenAmount2) {
                        const tempTokenQuote1 = await uniRouterContract.quote(tokenAmount2, tokenReserve[1], tokenReserve[0]);
                        setTokenQuote1(tempTokenQuote1);
                    }
                    
                    // Update the previous values

                    setPrevTokenAmount1(tokenAmount1);
                    setPrevTokenAmount2(tokenAmount2);
                }
            } else{
                setTokenReserve(null);
                setLiquidityPoolContract(null);
                setTokenQuote1(null);
                setTokenQuote2(null);
            }

        };

        setup();
    }, [tokenAddress1, tokenAddress2]);


    const getQuoteLiquidityPool = async(firstTokenAmount) =>{
        const secondTokenAmount = uniRouterContract.quote(firstTokenAmount,tokenReserve[0],tokenReserve[1]);
        return secondTokenAmount;
    }

    return{getQuoteLiquidityPool};
};

export default Swapping;
