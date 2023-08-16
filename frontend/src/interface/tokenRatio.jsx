import { ethers } from "ethers";
import UniPairABI from "../abi/uniswapPair.json";
import useConfigurationSwapPool from "./configurationSwapPool";
import useLiquidityPool from "./addLiquidity";

const TokenRatio = () => {
    const{liquidityPoolContract} = useLiquidityPool();
    const { provider, uniFactoryContract } = useConfigurationSwapPool();



    const getTokenRatio123 = async () => {
        alert(liquidityPoolContract);
        console.log("asd");
        const reserve = await liquidityPoolContract.getReserves();
        return reserve;
    };

    return { getTokenRatio123 };
};

export default TokenRatio;
