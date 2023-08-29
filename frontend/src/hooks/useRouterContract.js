import { getContract } from "../hooks/useContracts";
import uniSwapRouter_ABI from "../abi/uniswapRouter";
import { ethers } from "ethers";
import { getTokenAllowance, getTokenApproval } from "./useTokenContract";

const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // uniswapRouterv2
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

export async function performTrade(
    tokenInAddress,
    tokenOutAddress,
    amountIn,
    userAddress,
    provider,
    tokenReserve
) {
    checkTokenAllowance(amountIn, userAddress, tokenInAddress, provider);
    let nativeToken = "";
    const network = await provider.getNetwork();
    const chainID = network.chainId;

    const slippage = slipCalcV2(amountIn, tokenReserve[0], tokenReserve[1], Fee)
    const expectedPrice = tokenReserve[0] / tokenReserve[1];
    let amountOut = expectedPrice * (1 + slippage);
    let amountOutMin = amountOut * (1 - slippageTolerance);
    amountOutMin = amountOutMin.toString();
    amountOutMin = ethers.utils.parseEther(amountOutMin);
    amountIn = ethers.utils.parseEther(amountIn);

    const contract = getContract(contractAddress, uniSwapRouter_ABI, provider, userAddress);
    const deadline = Math.floor(Date.now() / 1000) + 600; // 10 minute from the swap
    console.log(chainID);
    switch (chainID) {
        case 1: // Etheruem net
            nativeToken = "Binance";
            break;
        case 56: // Binance net
            nativeToken = "ETH"
            break;
        case 5: // goerli net
            nativeToken = "goerli"
            break;
        default:
            console.warn('Unsupported network');
            return;
    }

    const networkName = network.name;

    if (networkName == nativeToken) {
        await contract.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            [tokenInAddress, tokenOutAddress],
            userAddress,
            deadline
        )
    } else if (networkName == nativeToken) {
        await contract.swapExactETHForTokens(
            amountIn,
            amountOutMin,
            [tokenInAddress, tokenOutAddress],
            userAddress,
            deadline
        );
    } else if (networkName == nativeToken) {
        await contract.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            [tokenInAddress, tokenOutAddress],
            userAddress,
            deadline
        );
    }

    return {
        amountOut,
        amountOutMin
    }
}

export function calculateSlipageRatio(amountIn, tokenReserve, provider) {
    const amount = changeToEther(amountIn);
    const contract = getContract(contractAddress, uniSwapRouter_ABI, provider);
    const amountOutV2 = contract.getAmountOut(amount, tokenReserve[0], tokenReserve[1]);
    const slippage = slipCalcV2(amountIn, tokenReserve[0], tokenReserve[1], Fee);
    return slippage / amountOutV2;
}

function slipCalcV2(amountInBN, reserveInBN, reserveOutBN, Fee) {
    // _deciIn and _deciOut for decimal places correction of reserves
    let amountInWithFee = amountInBN * (1 - Fee);

    let numerator = amountInWithFee * amountInWithFee * reserveOutBN;
    let denominator = reserveInBN * (reserveInBN + amountInWithFee);
    let slippage = numerator / denominator;
    return slippage;
}


function changeToEther(amount) {
    return ethers.utils.parseEther(amount);
};

async function checkTokenAllowance(tokenAmount, userAddress, tokenAddress, provider) {
    const tokenAllowance = getTokenAllowance(userAddress, tokenAddress, provider)
    if (tokenAmount < tokenAllowance) {
        getTokenApproval(userAddress, tokenAddress, provider);
    } else {
        return;
    }
};