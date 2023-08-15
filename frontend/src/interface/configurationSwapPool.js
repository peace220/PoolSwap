import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios"; //trying to use etherscan api to get token name
import UniFactoryABI from "../abi/uniswapFactory.json";
import UniRouterABI from "../abi/uniswapRouter.json";

const uniSwapRouterAdd = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; //uniswap v2 router address
const uniSwapFactoryAdd = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"; //uniswap v2 factory address

const useConfigurationSwapPool = () => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [provider, setProvider] = useState();
  const [uniFactoryContract, setUniFactoryContract] = useState(null);
  const [uniRouterContract, setUniRouterContract] = useState(null);

  useEffect(() => {
    const setup = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          setDefaultAccount(accounts[0]);
          const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
          const tempSigner = tempProvider.getSigner();

          const tempUniRouterContract = new ethers.Contract(uniSwapRouterAdd,UniRouterABI,tempSigner);
          const tempUniFactoryContract = new ethers.Contract(uniSwapFactoryAdd,UniFactoryABI,tempSigner);

          setProvider(tempProvider);
          setUniRouterContract(tempUniRouterContract);
          setUniFactoryContract(tempUniFactoryContract);

        } catch (error) {
          console.error("Error connecting wallet:", error);
        }
      } else {
        console.error("MetaMask extension not found.");
      }
      window.ethereum.on('accountsChanged', accounts => {
        setDefaultAccount(accounts[0]);
      });
      
    };

    setup();
  }, []);

  const getTokenSymbol = async (tokenAddress1) => {
    const response = await axios.get(
      `https://api-goerli.etherscan.io/api?module=account&action=tokenlist&address=${tokenAddress1}`
    );
    if (response.data.status === "1") {
      const token = response.data.result.find(
        (t) => t.contractAddress.toLowerCase() === tokenAddress1.toLowerCase()
      );
      alert(token);
      if (token) {
      }
    }
  };


  const checkTokenContractOnGoerli = async (tokenContractAddress) => {
    try {
      const code = await provider.getCode(tokenContractAddress);
      if (code === "0x") {
        alert("Token not found");
      } else {
        alert("Token found");
      }
    } catch (error) {
      alert(error);
    }
  };
  

  return { provider, uniFactoryContract, uniRouterContract, defaultAccount, checkTokenContractOnGoerli };

};

export default useConfigurationSwapPool;