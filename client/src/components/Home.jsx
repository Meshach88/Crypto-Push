import React, { useContext } from 'react';
import { FundTransferContext } from '../context/FundTransferContext';
import Loader from './Loader';

const Home = () => {
    const { connectToWallet, connectedAccount, formData, sendFund, handleChange, loading } = useContext(FundTransferContext);
    
    
    const handleSend = (e) => {
        const { Receiver, Amount, Narration } = formData;
    
        e.preventDefault();   //This prevents the page from reloading after submitting the form

        alert('Sending Funds');

        sendFund();
    }

    
    return (
        <div className='flex w-full justify-around items-center p-5'>
            <div>
                <h1 className='text-5xl text-white text-gradient font-semibold py-2'>
                    Transfer crypto with ease
                </h1>
                <p className='text-2xl text-black font-light font'>Enjoy seamless transactions with Crypto Push</p>
                {!connectedAccount && (
                    <button type='button' onClick={connectToWallet} className='text-white font-semibold flex flex-row justify center items-center my-5 bg-purple-700 p-4 rounded-full cursor-pointer hover:bg-purple-400'>
                    Connect Wallet
                    </button>
                )}
                
            </div>

            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <label className='font-semibold p-1'>Receiver's Address: </label><input type='text' name='Receiver' placeholder="Receiver's Address" onChange={handleChange}></input><br />
                <label className='font-semibold p-1'> Amount in Ethereum: </label><input type='number' name='Amount' placeholder="Amount(ETH)" onChange={handleChange}></input><br />
                <label className='font-semibold p-1'>Narration: </label><input type='text' name='Narration' placeholder="Narration" onChange={handleChange}></input><br />
                
            </div>
            <div>
                {loading
                ?<Loader />
                : (<button type='button' onClick={handleSend} className='text-white font-semibold flex flex-row justify center items-center my-5 bg-purple-700 p-4 rounded-full cursor-pointer hover:bg-purple-400'>
                    Send Funds
                </button>
                )}              
            </div>
        
        </div>

        
    );
}

export default Home;