import { ethers } from "ethers";
import UniPairABI from "../abi/uniswapPair.json";
import { useEffect, useState } from "react";
import { setupSwapPool2 } from "./setupSwapPool2";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const AddLiquidity = (tokenAddress1, tokenAddress2) => {
    const [provider, setProvider] = useState(null);
    const [uniFactoryContract, setUniFactoryContract] = useState(null);
    const [liquidityPoolContract, setLiquidityPoolContract] = useState(null);

    useEffect(() => {
        const setupLiquidity = async () => {
            if (!tokenAddress1 || !tokenAddress2) return;

            try {
                // object destructuring, renaming provider to swapProvider locally and also uniFactoryContract
                // because your provider is used for state above, i am not sure what
                const { provider: swapProvider, uniFactoryContract: swapFactoryContract } = await setupSwapPool2();
                
                setProvider(swapProvider);
                setUniFactoryContract(swapFactoryContract);
                
                const poolAddress = await swapFactoryContract.getPair(tokenAddress1, tokenAddress2);
                
                if (poolAddress && poolAddress !== ZERO_ADDRESS) {
                    const liquidityContract = new ethers.Contract(poolAddress, UniPairABI, swapProvider);
                    setLiquidityPoolContract(liquidityContract);
                }
            } catch (error) {
                console.error("Error setting up liquidity:", error);
            }
        };

        setupLiquidity();
    }, [tokenAddress1, tokenAddress2]);

    return { liquidityPoolContract };
}

export default AddLiquidity;
