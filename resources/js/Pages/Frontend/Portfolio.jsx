import React from 'react';
import Layout from '../Components/Layout';
import { useDarkMode } from '../Components/DarkModeProvider';

const Portfolio = ({ user }) => {

    const { darkMode } = useDarkMode();

    return (
        <Layout>
            <div className="container mx-auto mb-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <div className="flex justify-between mb-4 pt-4">
                        <a href={route('frontend.deposit')} className={`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                            Deposit
                        </a>
                        <a href={route('frontend.withdraw')} className={`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                            Withdraw
                        </a>
                    </div>
                 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                            <h2 className="text-xl font-bold">Available Balance</h2>
                            <p className="mt-2">{user.balance_usdt.toFixed(3)} USDT</p>
                        </div>

                        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                        <h2 className="text-xl font-bold"> 
                        ≈ {user.currency.symbol}</h2>
                        <p className="mt-2">{(user.balance_usdt / user.currency.rate_per_usdt).toFixed(2)} {user.currency.symbol}</p>
                    </div>
                        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                            <h2 className="text-xl font-bold">Total Deposit</h2>
                            <p className="mt-2">{user.total_deposit} USDT</p>
                        </div>
                        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                            <h2 className="text-xl font-bold">Total Withdraw</h2>
                            <p className="mt-2">{user.total_withdraw} USDT</p>
                        </div>
                        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                            <h2 className="text-xl font-bold">Credit Score</h2>
                            <p className="mt-2">{user.credit_score}</p>
                        </div>
                        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                            <h2 className="text-xl font-bold">Freezed Amount</h2>
                            <p className="mt-2">{user.freezed} USDT</p>
                        </div>
                        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} mb-12`}>
                            <h2 className="text-xl font-bold">Traded Amount</h2>
                            <p className="mt-2">{user.traded_amount} USDT</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Portfolio;


