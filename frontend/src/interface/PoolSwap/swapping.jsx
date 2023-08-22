import { useState, useEffect } from "react";
import SetupSwapPool from "../SetupSwapPool";

const Swapping = (tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2) => {
    const [tokenReserve, setTokenReserve] = useState(null);
    const [prevTokenAmount1, setPrevTokenAmount1] = useState("");
    const [prevTokenAmount2, setPrevTokenAmount2] = useState("");
    const { provider, uniFactoryContract, uniRouterContract } = SetupSwapPool();


    useEffect(() => {
        setupLiquidityPool(
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
        );
    }, [tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2]);



    return { getQuoteLiquidityPool };
};

export default Swapping;
