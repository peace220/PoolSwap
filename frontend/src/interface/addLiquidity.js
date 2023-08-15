import { ethers } from "ethers"
import UniPairABI from "../abi/uniswapPair.json";
import configurationSwapPool from "./configurationSwapPool";
import { useEffect, useState } from "react";

const useLiquidityPool =(tokenAddress1, tokenAddress2) =>{
    const{provider, uniFactoryContract} = configurationSwapPool();
    const [liquidityPoolContract , setLiquidityPoolContract] = useState(null);

    useEffect(() => {
        const setup = async () => {
            if(tokenAddress1 && tokenAddress2 ){
                const liquidityPoolAddress = await uniFactoryContract.getPair(tokenAddress1,tokenAddress2);
                if (liquidityPoolAddress !== "0x0000000000000000000000000000000000000000") {
                    const templiquidityPoolContract = new ethers.Contract(liquidityPoolAddress,UniPairABI,provider);
                    setLiquidityPoolContract(templiquidityPoolContract);
                }
            }
        };
    
        setup();
    }, [tokenAddress1, tokenAddress2]);
    return{liquidityPoolContract};
}

export default useLiquidityPool;
