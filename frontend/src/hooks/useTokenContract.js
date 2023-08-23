import { getContract } from "../hooks/useContracts";
import ERC20_ABI from "../abi/erc20.json";

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
        const userTokenAllowance = await contract.allowance(userAddress,spender);
        return userTokenAllowance
    }catch(error){
        console.log(error);
    }
}

