import { getContract } from "../hooks/useContracts";
import {uniSwapRouter_ABI} from "../abi/uniswapRouter";


export async function useAddLiquidity(tokenAddress1, tokenAddress2, token1Amount, token2Amount, userAddress, provider, signer, tokenReserve){
    const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const slippageTolerance = 0.01;
    const expectedPrice = tokenReserve[0]/tokenReserve[1];
    const maxAcceptablePrice = expectedPrice * (1 + slippageTolerance);
    const amountAMin = token1Amount * maxAcceptablePrice;s
    const amountBMin = token2Amount * maxAcceptablePrice;
    const contract = getContract(contractAddress,uniSwapRouter_ABI,provider,signer)
    const deadline = Math.floor(Date.now() / 1000) + 600;
    await contract.addLiquidity(
        tokenAddress1,
        tokenAddress2,
        token1Amount,
        token2Amount,
        amountAMin,
        amountBMin,
        to,
        deadline
    );
}

export async function useSwapExactTokensforTokens (){
    const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const contract = getContract(contractAddress,uniSwapRouter_ABI,provider,signer)
    await contract.useSwapExactTokensforTokens()
}