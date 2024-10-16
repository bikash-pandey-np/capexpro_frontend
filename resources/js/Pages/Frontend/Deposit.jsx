import React, { useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import Layout from '../Components/Layout'
import { useDarkMode } from '../Components/DarkModeProvider';
import deposit_img from '../../../images/deposit.png'

const Deposit = ({infos}) => {

    
    const { darkMode } = useDarkMode();
    const cardClass = darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black';
    const headerClass = darkMode ? 'bg-gray-900 br' : 'bg-gray-300 br';
    const cardStyle = {
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const [copied, setCopied] = useState({ usdt: false, user_currency: false });

    const copyToClipboard = (text, type) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                setCopied(prevState => ({ ...prevState, [type]: true }));
                setTimeout(() => setCopied(prevState => ({ ...prevState, [type]: false })), 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            console.error('Clipboard API not supported');
        }
    };

    return (
        <Layout>
            <div className="container mx-auto">
                <div className="flex justify-center my-4">
                    <img src={deposit_img} alt="Deposit" style={{ width: '45%' }} />
                </div>
                {infos.usdt && (
                <div className={`card ${cardClass} mb-4`} style={cardStyle}>
                    <div className={`card-header ${headerClass} p-4 mt-6 flex justify-between items-center`}>
                        <h2 className="text-xl font-bold">{infos.usdt.title} Details</h2>
                        <FaClipboard 
                            className={`cursor-pointer ${copied.usdt ? 'text-green-500' : ''}`} 
                            onClick={() => copyToClipboard(`${infos.usdt.wallet_addr}`, 'usdt')} 
                        />
                    </div>
                    <div className="card-body p-4">
                        <p><strong>Wallet Address:</strong> {infos.usdt.wallet_addr}</p>
                        <p><strong>Deposit Instruction:</strong> {infos.usdt.deposit_instruction}</p>
                        </div>
                    </div>
                )}
                {infos.user_currency && (
                    <div className={`card ${cardClass} mb-4 mt-12`} style={cardStyle}>
                        <div className={`card-header ${headerClass} p-4 flex justify-between items-center`}>
                            <h2 className="text-xl font-bold">{infos.user_currency.title} Details</h2>
                            <FaClipboard 
                                className={`cursor-pointer ${copied.user_currency ? 'text-green-500' : ''}`} 
                                onClick={() => copyToClipboard(`Bank Name: ${infos.user_currency.bank_name}\nAccount Number: ${infos.user_currency.acc_no}\nAccount Name: ${infos.user_currency.acc_name}`, 'user_currency')} 
                            />
                        </div>
                        <div className="card-body p-4">
                            <p><strong>Bank Name:</strong> {infos.user_currency.bank_name}</p>
                            <p><strong>Account Number:</strong> {infos.user_currency.acc_no}</p>
                            <p><strong>Account Name:</strong> {infos.user_currency.acc_name}</p>
                            <p><strong>Deposit Instruction:</strong> {infos.user_currency.deposit_instruction}</p>
                        </div>
                    </div>
                )}

            <div className="flex justify-center mt-6 mb-16">
                <span className="bg-blue-500 text-white text-md font-semibold mr-2 px-3.5 py-1.5 rounded">No deposit fee</span>
            </div>
            </div>
        </Layout>
    );
};

export default Deposit;
