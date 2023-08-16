import { ethers } from "ethers"
import UniPairABI from "../abi/uniswapPair.json";
import configurationSwapPool from "./configurationSwapPool";
import { useEffect, useState } from "react";

const AddLiquidity = (tokenAddress1, tokenAddress2) => {
    const { provider, uniFactoryContract } = configurationSwapPool();
    const [liquidityPoolContract, setLiquidityPoolContract] = useState(null);

    useEffect(() => {
        const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

        const setup = async () => {
            if (tokenAddress1 && tokenAddress2) {
                let liquidityPoolAddress;
                
                try {
                    liquidityPoolAddress = await uniFactoryContract.getPair(tokenAddress1, tokenAddress2);
                } catch (error) {
                    console.error("Error fetching liquidity pool address:", error);
                    return;  // Exit early if this fails
                }
                
                if (liquidityPoolAddress && liquidityPoolAddress !== ZERO_ADDRESS) {
                    try {
                        const templiquidityPoolContract = new ethers.Contract(liquidityPoolAddress, UniPairABI, provider);
                        setLiquidityPoolContract(templiquidityPoolContract);
                    } catch (error) {
                        console.error("Error creating liquidity pool contract instance:", error);
                    }
                }
            }
        };

        setup();
    }, [tokenAddress1, tokenAddress2]);

    return { liquidityPoolContract };
}

export default AddLiquidity;
