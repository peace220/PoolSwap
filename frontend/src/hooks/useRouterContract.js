import { getContract } from "../hooks/useContracts";
import uniSwapRouter_ABI from "../abi/uniswapRouter";
import{ ethers }from "ethers";


const slippageTolerance = 0.01;
const Fee = 0.005;
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
function slipCalcV2(amountInBN, reserveInBN, reserveOutBN, Fee) {
    // _deciIn and _deciOut for decimal places correction of reserves
    let amountInWithFee = amountInBN * (1 - Fee);

    let numerator = amountInWithFee * amountInWithFee * reserveOutBN;
    let denominator = reserveInBN * (reserveInBN + amountInWithFee);
    let slippage = numerator / denominator;
    return slippage;
}

export async function performTrade(
    tokenIn,
    tokenOut,
    amountIn,
    userAddress,
    provider,
    tokenReserve
) {
    const slippage = slipCalcV2(amountIn,tokenReserve[0],tokenReserve[1],Fee)
    const expectedPrice = tokenReserve[0] / tokenReserve[1];
    let amountOut = expectedPrice * (1 + slippage)
    let amountOutMin =amountOut * (1 - slippageTolerance)
    amountOut = amountOut.toString();
    amountOut = ethers.utils.parseEther(amountOut);
    amountOutMin = amountOutMin.toString();
    amountOutMin = ethers.utils.parseEther(amountOutMin);
    amountIn = ethers.utils.parseEther(amountIn);
    const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const contract = getContract(contractAddress, uniSwapRouter_ABI, provider, userAddress);


    const deadline = Math.floor(Date.now() / 1000) + 600; // 10 minute from the swap
    await contract.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        [tokenIn, tokenOut],
        userAddress,
        deadline
    );
}

