
import { setupLiquidityPool } from "./LiquidityPoolSetup";
import SetupSwapPool from "../SetupSwapPool";
import { useEffect, useState } from "react";
import { getTokenApproval } from "../../hooks/useTokenContract";

const LiquidityPool = (tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2) => {
    const [tokenReserve, setTokenReserve] = useState(null);
    const [tokenQuote1, setTokenQuote1] = useState(null);
    const [tokenQuote2, setTokenQuote2] = useState(null);
    const [prevTokenAmount1, setPrevTokenAmount1] = useState("");
    const [prevTokenAmount2, setPrevTokenAmount2] = useState("");
    const { provider, uniFactoryContract,uniRouterContract, defaultAccount } = SetupSwapPool();
    


    // useEffect(() => {
    //     const ZERO_ADDRESS = "0x000000000000000000";
    //     const setup = async () => {
    //         if (tokenAddress1 && tokenAddress2) {
    //             const liquidityPoolAddress = await uniFactoryContract.getPair(tokenAddress1, tokenAddress2);
    //             if (liquidityPoolAddress && liquidityPoolAddress !== ZERO_ADDRESS) {
    //                 const templiquidityPoolContract = new ethers.Contract(liquidityPoolAddress, UniPairABI, provider);
    //                 const reservesss = await templiquidityPoolContract.getReserves();
    //                 setTokenReserve(reservesss);
    //             }

    //             if ((tokenAmount1 !== "" && !isNaN(tokenAmount1)) || (tokenAmount2 !== "" && !isNaN(tokenAmount2))) {
    //                 try{
    //                     if (!isNaN(tokenAmount1) && tokenAmount1 !== prevTokenAmount1) {
    //                         //Quote for Second Token
    //                         const tempTokenAmountETH = ethers.utils.parseEther(tokenAmount1);
    //                         let tempTokenQuote = await uniRouterContract.getAmountOut(tempTokenAmountETH, tokenReserve[0], tokenReserve[1]);
    //                         tempTokenQuote = ethers.utils.formatEther(tempTokenQuote)
    //                         tempTokenQuote = customRound(tempTokenQuote)
    //                         setTokenQuote2(tempTokenQuote);
    //                         setPrevTokenAmount1(tokenAmount1);
    
    //                     } else if (!isNaN(tokenAmount2) && tokenAmount2 !== prevTokenAmount2){
    //                         //Quote for First Token
    //                         const tempTokenAmountETH = ethers.utils.parseEther(tokenAmount2);
    //                         let tempTokenQuote = await uniRouterContract.getAmountOut(tempTokenAmountETH, tokenReserve[1], tokenReserve[0]);
    //                         tempTokenQuote = ethers.utils.formatEther(tempTokenQuote)
    //                         tempTokenQuote = customRound(tempTokenQuote)
    //                         setTokenQuote1(tempTokenQuote);
    //                         setPrevTokenAmount2(tokenAmount2);
    //                     } 
    //                 }catch(error){
    //                     console.log(error);
    //                 }
                    
    //             }else {
    //                 setTokenQuote1(""); 
    //                 setTokenQuote2(""); 
    //             }
    //         } else{
    //             setTokenReserve(null);
    //         }
    //     };
    //     setup();
    // }, [tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2]);

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

    const getToken1Approval = async () => {
        getTokenApproval(defaultAccount,tokenAddress1,provider)
    }

    const getToken2Approval = async () => {
        getTokenApproval(defaultAccount,tokenAddress2,provider)
    }

    return {tokenQuote1,tokenQuote2,getToken1Approval,getToken2Approval};
}

export default LiquidityPool;
