import { getContract } from "../hooks/useContracts";
import ERC20_ABI from "../abi/erc20.json";

export async function getTokenApproval(spender,tokenAddress,provider){
    const contract = getContract(tokenAddress,ERC20_ABI,provider,spender);
    const spenderBalance = getBalance(spender,tokenAddress,provider);
    try{
        await contract.approve(spender, spenderBalance);
    }catch(error){
        console.log(error);
    }
    
}

async function getBalance(spender,tokenAddress,provider){
    const contract = getContract(tokenAddress,ERC20_ABI,provider)
    const spenderBalance = await contract.balanceOf(spender)
    return spenderBalance
}
