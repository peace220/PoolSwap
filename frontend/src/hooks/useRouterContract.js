import { getContract } from "../hooks/useContracts";
import uniSwapRouter_ABI from "../abi/uniswapRouter";

const slippageTolerance = 0.01;

export async function useAddLiquidity(
    tokenAddress1,
    tokenAddress2,
    token1Amount,
    token2Amount,
    userAddress,
    provider,
    signer,
    tokenReserve
) {
    const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    const expectedPrice = tokenReserve[0] / tokenReserve[1];
    const maxAcceptablePrice = expectedPrice * (1 + slippageTolerance);

    const amountAMin = token1Amount * maxAcceptablePrice;
    const amountBMin = token2Amount * maxAcceptablePrice;

    const contract = getContract(contractAddress, uniSwapRouter_ABI, provider, signer);

    const deadline = Math.floor(Date.now() / 1000) + 600; // 10minute from the add liquidity

    await contract.addLiquidity(
        tokenAddress1,
        tokenAddress2,
        token1Amount,
        token2Amount,
        amountAMin,
        amountBMin,
        userAddress,
        deadline
    );
}

export async function useSwapExactTokensForTokens(
    tokenIn,
    tokenOut,
    amountIn,
    amountOutMin,
    userAddress,
    provider,
    signer
) {
    const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    const contract = getContract(contractAddress, uniSwapRouter_ABI, provider, signer);

    const deadline = Math.floor(Date.now() / 1000) + 600; // 10 minute from the swap

    await contract.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        [tokenIn, tokenOut],
        userAddress,
        deadline
    );
}
