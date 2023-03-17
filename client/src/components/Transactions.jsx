import React, { useContext } from 'react';
import { FundTransferContext } from '../context/FundTransferContext';


const TransactionCard = ({ Receiver, Sender, timestamp, Narration, Amount}) => {
    return (
        <div className='flex flex-1 bg-purple-700 flex-col p-4 rounded-md hover:shadow-2xl m-5 2xl:min-w-[450px] sm:min-w-[450px] 2xl:max-w=[270px]'>
            <div className='flex flex-col items-center w=full t mt-3'>
                <div className='w-full p-3 justify-center'>
                    <a href={`https://goerli.etherscan.io/address/${Sender}`}>
                       <p className='text-white text-base'>From: {Sender}</p> 
                    </a>
                    <a href={`https://goerli.etherscan.io/address/${Receiver}`}>
                       <p className='text-white text-base'>To: {Receiver}</p> 
                    </a>
                    <p className='text-white'>Amount: {Amount} ETH</p>
                    <p className='text-white text-base'>Narration: {Narration}</p>
                </div>

            </div>


        </div>
    )

}

const Transactions = () => {
    const { connectedAccount, transfers } = useContext(FundTransferContext);

    return (
        <div className='w-full justify-center item-center'>
            <div className='flex flex-col md:p-10 py-8 px-3'>
                {connectedAccount ? (
                    <h3 className='font-bold text-centre my-2'>List of Fund Transfers</h3>
                ) : (
                    <h3 className='font-bold text-centre my-2'>Please connect an account to continue</h3>
                )}

                <div className='flex flex-wrap justify-center items-center mt=5'>
                    {transfers.reverse().map((transfer, index) => (
                        <TransactionCard
                            key={index}
                            {...transfer}
                            
                        />
                    ))}
                </div>

            </div>

        </div>

    );
}

export default Transactions;