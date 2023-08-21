import { ethers } from "ethers"
import UniPairABI from "../abi/uniswapPair.json";
import SetupSwapPool from "./SetupSwapPool";
import { useEffect, useState } from "react";
import { useTokenContract } from "../hooks/useContracts";
import { Fetcher, ChainId, Trade, TokenAmount,TradeType} from "@uniswap/sdk";


const LiquidityPool = (tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2) => {
    const [tokenReserve, setTokenReserve] = useState(null);
    const [tokenQuote1, setTokenQuote1] = useState(null);
    const [tokenQuote2, setTokenQuote2] = useState(null);
    const [prevTokenAmount1, setPrevTokenAmount1] = useState("");
    const [prevTokenAmount2, setPrevTokenAmount2] = useState("");
    const { provider, uniFactoryContract,uniRouterContract, defaultAccount } = SetupSwapPool();
    


    useEffect(() => {

        const setup = async () => {
            if (tokenAddress1 && tokenAddress2) {
                try {
                    const token1 = await Fetcher.fetchTokenData(ChainId, tokenAddress1, provider);
                    const token2 = await Fetcher.fetchTokenData(ChainId, tokenAddress2, provider);
        
                    const pair = await Fetcher.fetchPairData(token1, token2, provider);
        
                    if ((tokenAmount1 !== '' && !isNaN(tokenAmount1)) || (tokenAmount2 !== '' && !isNaN(tokenAmount2))) {
                        if (!isNaN(tokenAmount1) && tokenAmount1 !== prevTokenAmount1) {
                            const trade = new Trade(
                                pair,
                                new TokenAmount(token1, ethers.utils.parseEther(tokenAmount1)),
                                TradeType.EXACT_INPUT
                            );
                            const executionPrice = trade.executionPrice.toSignificant(6);
                            setTokenQuote2(executionPrice);
                            setPrevTokenAmount1(tokenAmount1);
                        } else if (!isNaN(tokenAmount2) && tokenAmount2 !== prevTokenAmount2) {
                            const trade = new Trade(
                                pair,
                                new TokenAmount(token2, ethers.utils.parseEther(tokenAmount2)),
                                TradeType.EXACT_OUTPUT
                            );
                            const executionPrice = trade.executionPrice.toSignificant(6);
                            setTokenQuote1(executionPrice);
                            setPrevTokenAmount2(tokenAmount2);
                        }
                    } else {
                        setTokenQuote1('');
                        setTokenQuote2('');
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                setTokenReserve(null);
            }
        };

        setup();
    }, [tokenAddress1, tokenAddress2, tokenAmount1, tokenAmount2]);


    const getToken1Approval = async () => {
        const contract = useTokenContract(tokenAddress1,true);
        const response = await contract.approve(defaultAccount, )
    }

    const getToken2Approval = async () => {

    }


    //<----- Rounding Numbers ----->
    function customRound(number) {
        number = parseFloat(number);
        number = number.toFixed(6);
        return number
    }

    return {tokenQuote1,tokenQuote2};
}

export default LiquidityPool;
