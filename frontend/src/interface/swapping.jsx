import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import UniPairABI from "../abi/uniswapPair.json";
import SetupSwapPool from "./SetupSwapPool";

const Swapping = (tokenAddress1, tokenAddress2) => {
    const { provider, uniFactoryContract,uniRouterContract } = SetupSwapPool();
    const [tokenReserve, setTokenReserve] = useState(null);
    const [liquidityPoolContract, setLiquidityPoolContract] = useState(null);

    useEffect(() => {
        const ZERO_ADDRESS = "0x";

        const setup = async () => {
            if (tokenAddress1 && tokenAddress2) {
                const liquidityPoolAddress = await uniFactoryContract.getPair(tokenAddress1, tokenAddress2);
                if (liquidityPoolAddress && liquidityPoolAddress !== ZERO_ADDRESS) {
                    const templiquidityPoolContract = new ethers.Contract(liquidityPoolAddress, UniPairABI, provider);
                    const reservesss = await templiquidityPoolContract.getReserves();
                    setTokenReserve(reservesss);
                    setLiquidityPoolContract(templiquidityPoolContract);
                }
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
