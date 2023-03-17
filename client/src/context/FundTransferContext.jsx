import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { FundTransferABI, FundTransferAddress } from "../utils/constants";

export const FundTransferContext = React.createContext();

// to get access to the ethereum object and destructure it.
const { ethereum } = window;

// Function to fetch ethereum contract
const getEthTransferContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const fundTransferContract = new ethers.Contract(FundTransferAddress, FundTransferABI, signer);
  return fundTransferContract;
};

export const FundTransferProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [formData, setFormData] = useState({Receiver:'', Amount:'', Narration:''})
  const [Counter, setCounter] = useState(localStorage.getItem('Counter'));
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // To set form data
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

  const getAllTransfers = async () => {
    try {
      if (!ethereum) return alert('No Metamask installed. Please get Metamask');
      
        const fundsTransferContract = getEthTransferContract();
        const allTransfers = await fundsTransferContract.getAllTransfers();
         
        const orderedTransfers = allTransfers.map((transfer) => ({
          Receiver: transfer.receiver,
          Sender: transfer.sender,
          timestamp: new Date(transfer.timestamp).toLocaleString(),
          Narration: transfer.narration,
          Amount: parseInt(transfer.amount._hex)/(10**18)
        }))

        console.log(orderedTransfers);

        setTransfers(orderedTransfers);
        console.log(allTransfers);
      } catch (error) {
        console.log(error);
      }
    }
  

  const isWalletConnected = async () => {

    try {
      if(!ethereum) return alert("No Metamask! Get Metamask");
      
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if(accounts.length) {
        setConnectedAccount(accounts[0]);
        // console.log(accounts)
        getAllTransfers();
      } else {
        console.log('No accounts found');
      }

    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object found.')
    }
  }

  const isAmongTransfers = async () => {
    try{
      const fundTransferContract = getEthTransferContract();
      const Counter = await fundTransferContract.getTransferCount();
      window.localStorage.setItem('Counter', Counter);


    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object found.')
    }
  }

  const connectToWallet = async () => {
    try {
      if(!ethereum) return alert("No Metamask! Get Metamask");
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setConnectedAccount (accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object found.')
    }
  }

  //Function for transferring funds 
  const sendFund = async () => {
    try {
      if(!ethereum) return alert("No metamask installed. Get Metamask");
      const { Receiver, Amount, Narration } = formData;
      const fundTransferContract = getEthTransferContract();
      const parsedAmount = ethers.utils.parseEther(Amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: connectedAccount,
          to: Receiver,
          gas: "0x55f0", //22000 GWEI
          value: parsedAmount._hex,
        }],
      });

      // To store the transaction
      const transferHash = await fundTransferContract.storedTxn(Receiver, parsedAmount, Narration);
      console.log(transferHash);
      
      setLoading(true);
      console.log(`Loading - ${transferHash.hash}`);
      await transferHash.wait();
      console.log(`Success - ${transferHash.hash}`);
      setLoading(false);
      
      const Counter = await fundTransferContract.getTransferCount();

      setCounter(Counter.toNumber());


    } catch(error) {
      console.log(error);

      throw new Error("No ethereum object found.")
    }
  }


  useEffect(() => {
    isWalletConnected();
    isAmongTransfers();
  }, [])
  return (
    <FundTransferContext.Provider value={{ connectToWallet, connectedAccount, formData, setFormData, handleChange, sendFund, transfers }}>
      {children}
    </FundTransferContext.Provider>
  );
}