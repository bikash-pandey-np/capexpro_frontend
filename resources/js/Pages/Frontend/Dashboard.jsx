import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Components/Layout'
import { useDarkMode } from '../Components/DarkModeProvider';
import { Circles } from 'react-loader-spinner'

const Dashboard = ({balance, user_currency, user_remark, username}) => {

    const { darkMode } = useDarkMode();
    const [shareData, setShareData] = useState(null);


    function sortByPrice(data) {
        const sortedData = Object.entries(data)
        .sort(([, a], [, b]) => parseFloat(b.price) - parseFloat(a.price))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return sortedData;
    }
    useEffect(() => {
        const fetchShareData = () => {
            axios.get(route('frontend.crypto-data')).then(response => {
                setShareData(sortByPrice(response.data.data));
            });

        };

        fetchShareData();
        const intervalId = setInterval(fetchShareData, 5000);

        return () => clearInterval(intervalId);
    }, []);
    console.log(shareData);

    const modifyName = (name) => {
        const mappings = {
            'AAVE': 'AAVEUSDT',
            'Chainlink': 'LINKUSDT',
            'Bitcoin': 'BTCUSDT',
            'Ripple': 'XRPUSDT',
            'Ethereum' : 'ETHUSDT',
            'Cardano' : 'ADAUSDT',
            'DASH (USD)' : 'DASHUSDT',
            'LITECOIN (USD)' : 'LTCUSDT'
        };
        return mappings[name] || name;
    }

    return (
        <Layout>
            <div className="container mx-auto">
                {user_remark && <p className="text-center text-sm font-semibold mb-2">Dear {username}, <br />{user_remark}</p>}
                <div className={`p-3 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <div>
                        <h2 className="extra_small">Balance (USDT)</h2>
                        <p className="large font-bold">$ {parseFloat(balance).toFixed(3)} </p>
                        <p className="medium font-bold text-gray-400">≈ {(parseFloat(balance) / user_currency.rate_per_usdt).toFixed(3)} {user_currency.symbol}</p>
                    </div>
                    <a 
                    href={route('frontend.deposit')} 
                    className={`medium px-4 py-1 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                        Add Funds
                    </a>
                </div>
                <div className={`p-3 rounded-lg mt-4 mb-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <h2 className="extra_small">Featured CryptoCurrencies</h2>
                    {shareData ? (
                        <div className="overflow-x-auto">
                            <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                <thead>
                                    <tr>
                                        <th className={`px-6 py-3 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-500'} text-left text-xs font-medium uppercase tracking-wider`}>Crypto</th>
                                        <th className={`px-6 py-3 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-500'} text-left text-xs font-medium uppercase tracking-wider`}>Price</th>
                                        <th className={`px-6 py-3 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-500'} text-left text-xs font-medium uppercase tracking-wider`}>Action</th>
                                    </tr>
                                </thead>
                                <tbody className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                    {Object.keys(shareData).map((key) => (
                                        <tr key={key}>
                                            <td className="px-6 py-4 whitespace-nowrap extra_small">{modifyName(shareData[key].display)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap extra_small">{shareData[key].price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap extra_small">
                                                <a className="text-yellow-600 hover:text-white"
                                                href={route('frontend.trade', {source: shareData[key].id, type: 'crypto'})}
                                                    
                                                    >Trade</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex justify-center py-4">
                        <Circles
                        height="50"
                        width="50"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        />
                        </div>
                    )}
                
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
