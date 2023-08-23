import { getContract } from "../hooks/useContracts";
import {uniSwapRouter_ABI} from "../abi/uniswapRouter";


export async function useAddLiquidity(tokenAddress1, tokenAddress2, token1Amount, token2Amount, userAddress, provider, signer){
    const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const contract = getContract(contractAddress,uniSwapRouter_ABI,provider,signer)
    await contract.addLiquidity(tokenAddress1,tokenAddress2,token1Amount,token2Amount,)
}