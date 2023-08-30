import { getContract } from "../hooks/useContracts";
import ERC20_ABI from "../abi/erc20.json";
import { ethers } from "ethers";

export async function getTokenApproval(signer,tokenAddress,provider){
    const spender = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; //uniswapRouter address
    const contract = getContract(tokenAddress,ERC20_ABI,provider,signer);
    const spenderBalance =  2^256 -1;
    try{
        await contract.approve(spender, spenderBalance);
    }catch(error){
        console.log(error);
    }
    
}

export async function getTokenAllowance(userAddress,tokenAddress,provider){
    const spender = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const contract = getContract(tokenAddress,ERC20_ABI,provider)
    try{
        let userTokenAllowance = await contract.allowance(userAddress,spender);
        userTokenAllowance = ethers.utils.formatEther(userTokenAllowance);
        return userTokenAllowance
    }catch(error){
        console.log(error);
    }
}

export async function getTokenSymbol(tokenAddress,provider){
    const contract = getContract(tokenAddress,ERC20_ABI,provider)
    try{
        const tokenSymbol = await contract.symbol();
        return tokenSymbol
    }catch(error){
        console.log(error);
    }
}

export async function getTokenDecimal(tokenAddress,provider){
    const contract = getContract(tokenAddress,ERC20_ABI,provider)
    try{
        const tokenDecimal = await contract.decimals();
        return tokenDecimal
    }catch(error){
        console.log(error);
    }
}
