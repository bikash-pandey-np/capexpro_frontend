import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Components/Layout'
import { useDarkMode } from '../Components/DarkModeProvider';
import { Circles } from 'react-loader-spinner'

const Market = ({balance, user_currency}) => {
    const { darkMode } = useDarkMode();
    const [shareData, setShareData] = useState(null);

    useEffect(() => {
        const fetchShareData = () => {
            axios.get(route('frontend.share-data')).then(response => {
                setShareData(response.data.data);
            });
        };

        fetchShareData();
        const intervalId = setInterval(fetchShareData, 5000);

        return () => clearInterval(intervalId);
    }, []);

    console.log(shareData);

    return (
        <Layout>
            <div className="container mx-auto">
                <div className={`p-3 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div>
                <h2 className="extra_small">Balance (USDT)</h2>
                <p className="large font-bold">$ {balance} </p>
                <p className="medium font-bold text-gray-400">≈ {parseFloat(balance) * user_currency.rate_per_usdt} {user_currency.symbol}</p>
            </div>
                    <a 
                    href={route('frontend.trade')} 
                    className={`medium px-4 py-1 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                        Trade
                    </a>
                </div>
                <div className={`p-3 rounded-lg mt-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} mb-12`}>
                    <h2 className="extra_small">Stock Market</h2>
                    {shareData ? (
                        <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                            <thead>
                                <tr>
                                    <th className={`px-6 py-3 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-500'} text-left text-xs font-medium uppercase tracking-wider`}>Display</th>
                                    <th className={`px-6 py-3 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-500'} text-left text-xs font-medium uppercase tracking-wider`}>Price</th>
                                    <th className={`px-6 py-3 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-500'} text-left text-xs font-medium uppercase tracking-wider`}>Action</th>
                                </tr>
                            </thead>
                            <tbody className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                {Object.keys(shareData).map((key) => (
                                    <tr key={key}>
                                        <td className="px-6 py-4 whitespace-nowrap">{shareData[key].display}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{shareData[key].price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <a className="text-yellow-600 hover:text-white"
                                            href={route('frontend.trade', {source: shareData[key].id, type: 'stock'})}
                                                
                                                >Trade</a>           
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default Market;
