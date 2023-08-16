import { ethers } from "ethers";
import UniFactoryABI from "../abi/uniswapFactory.json";
import UniRouterABI from "../abi/uniswapRouter.json";

const uniSwapRouterAdd = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const uniSwapFactoryAdd = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

export const setupSwapPool2 = async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const uniRouterContract = new ethers.Contract(uniSwapRouterAdd, UniRouterABI, signer);
        const uniFactoryContract = new ethers.Contract(uniSwapFactoryAdd, UniFactoryABI, signer);

        return { provider, uniFactoryContract, uniRouterContract, defaultAccount: accounts[0] };
    } else {
        throw new Error("MetaMask extension not found.");
    }
};
