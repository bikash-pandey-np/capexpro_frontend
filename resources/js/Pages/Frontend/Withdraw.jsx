import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Layout from '../Components/Layout'
import { useDarkMode } from '../Components/DarkModeProvider';
import deposit_img from '../../../images/deposit.png'

const Withdraw = () => {
    const { darkMode } = useDarkMode();
    const [withdrawType, setWithdrawType] = useState('crypto');
    const { data, setData, post, errors } = useForm({
        walletAddress: '',
        amountUsdt: '',
        bankName: '',
        accountNo: '',
        accountName: '',
        amount: '',
        remark: '',
        withdrawType: 'crypto'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleWithdrawTypeChange = (e) => {
        const newWithdrawType = e.target.value;
        setWithdrawType(newWithdrawType);
        setData('withdrawType', newWithdrawType);
    };

    const handleWithdraw = () => {
         post(route('frontend.withdraw'))
    };

    return (
        <Layout>
            <div className="container mx-auto">
              
                <div className="flex justify-center my-4">
                    <img src={deposit_img} alt="Deposit" style={{ width: '45%' }} />
                </div>
                <div className="flex justify-center my-4">

                    <select 
                        value={withdrawType} 
                        onChange={handleWithdrawTypeChange} 
                        className={`p-2 border rounded extra_small ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`} 
                    >
                        <option value="crypto">Crypto</option>
                        <option value="bank">Bank</option>
                    </select>
                </div>
                {withdrawType === 'crypto' ? (
                    <div className={`card ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} mb-4`} style={{ borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Wallet Address</label>
                                <input 
                                    type="text" 
                                    name="walletAddress" 
                                    value={data.walletAddress} 
                                    onChange={handleInputChange} 
                                    className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.walletAddress && <div className="text-red-500 text-sm mt-1">{errors.walletAddress}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Amount (USDT)</label>
                                <input 
                                    type="number" 
                                    name="amountUsdt" 
                                    value={data.amountUsdt} 
                                    onChange={handleInputChange} 
                                    className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.amountUsdt && <div className="text-red-500 text-sm mt-1">{errors.amountUsdt}</div>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`card ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} mb-4`} style={{ borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Bank Name</label>
                                <input 
                                    type="text" 
                                    name="bankName" 
                                    value={data.bankName} 
                                    onChange={handleInputChange} 
                                    className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.bankName && <div className="text-red-500 text-sm mt-1">{errors.bankName}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Account Number</label>
                                <input 
                                    type="text" 
                                    name="accountNo" 
                                    value={data.accountNo} 
                                    onChange={handleInputChange} 
                                    className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.accountNo && <div className="text-red-500 text-sm mt-1">{errors.accountNo}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Account Name</label>
                                <input 
                                    type="text" 
                                    name="accountName" 
                                    value={data.accountName} 
                                    onChange={handleInputChange} 
                                    className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.accountName && <div className="text-red-500 text-sm mt-1">{errors.accountName}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Amount</label>
                                <input 
                                    type="number" 
                                    name="amount" 
                                    value={data.amount} 
                                    onChange={handleInputChange} 
                                    className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Instruction (If you have any)</label>
                                <input 
                                    type="text" 
                                    name="remark" 
                                    value={data.remark} 
                                    onChange={handleInputChange} 
                                    className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.remark && <div className="text-red-500 text-sm mt-1">{errors.remark}</div>}
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-center mt-6 mb-16">
                    <button 
                        onClick={handleWithdraw} 
                        className={`${darkMode ? 'bg-gray-800' : 'bg-blue-500'} text-white text-md font-semibold px-4 py-2 rounded`}
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Withdraw;
