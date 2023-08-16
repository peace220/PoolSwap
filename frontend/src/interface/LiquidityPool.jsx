import { ethers } from "ethers"
import UniPairABI from "../abi/uniswapPair.json";
import SetupSwapPool from "./SetupSwapPool";
import { useEffect, useState } from "react";

const LiquidityPool = (tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2) => {
    const [tokenReserve, setTokenReserve] = useState(null);
    const [liquidityPoolContract, setLiquidityPoolContract] = useState(null);
    const [tokenQuote1, setTokenQuote1] = useState(null);
    const [tokenQuote2, setTokenQuote2] = useState(null);
    const { provider, uniFactoryContract,uniRouterContract } = SetupSwapPool();


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

                if(tokenAmount1 !="" && tokenAmount2 != ""){
                    if(tokenAmount1 !=""){
                        const tempTokenQuote2 = uniRouterContract.quote(tokenAmount1,tokenReserve[0],tokenReserve[1]);
                        setTokenQuote2(tempTokenQuote2);
                    } else{
                        const tempTokenQuote1 = uniRouterContract.quote(tokenAmount2,tokenReserve[0],tokenReserve[1]);
                        setTokenQuote1(tempTokenQuote1);
                    }
                }
                console.log(tokenAmount1);
                console.log(tokenAmount2);
                console.log(tokenQuote1);
                console.log(tokenQuote2);
            } else{
                setTokenReserve(null);
                setLiquidityPoolContract(null);
                setTokenQuote1(null);
                setTokenQuote2(null);
            }

            

        };

        setup();
    }, [tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2]);

    const getQuoteLiquidityPool = async(firstTokenAmount) =>{
        const secondTokenAmount = uniRouterContract.quote(firstTokenAmount,tokenReserve[0],tokenReserve[1]);
        return secondTokenAmount;
    }
    
    const getTokenRatio = async () => {
        console.log(tokenQuote1);
        console.log(tokenQuote2);
        return tokenReserve 
    };

    return { liquidityPoolContract ,getTokenRatio};
}

export default LiquidityPool;
