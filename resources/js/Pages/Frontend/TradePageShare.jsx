import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Layout from '../Components/Layout';
import { useDarkMode } from '../Components/DarkModeProvider';
import axios from 'axios';

const TradePageShare = ({ symbol, balance, user_currency, price_url, form_type }) => {
    const { darkMode } = useDarkMode();
    const { data, setData, post, errors } = useForm({
        tradeType: form_type || 'long',
        amount: '',
        duration: '3',
        symbol : '',
    });
    const [tickerData, setTickerData] = useState(null);

    const priceFetcherHelper = () => {
        switch (symbol) {
            case 'META':
                return 'facebook';
            case 'TSLA':
                return 'tesla';
            case 'GOOG':
                return 'google';
            case 'AAPL':
                return 'apple';
            case 'NVDA':
                return 'nvidia'
            case 'AMZN':
                return 'amzn'
            case 'NFLX':
                return 'netflix'
            case 'ADBE':
                return 'adobe';
            default:
                return '';
        }
    }

    useEffect(() => {

        setData('symbol', priceFetcherHelper())


        const fetchTickerData = async () => {
            try {
                const response = await axios.get(price_url);
                setTickerData(response.data.data)
            } catch (error) {
                console.error('Error fetching ticker data:', error);
            }
        };

        fetchTickerData();
        const intervalId = setInterval(fetchTickerData, 3000);

        return () => clearInterval(intervalId);
    }, [symbol]);


    const handleTypeChange = (e) => {
        setData('tradeType', e.target.value);
    };

    const handleAmountChange = (e) => {
        setData('amount', e.target.value);
    };

    const handleDurationChange = (e) => {
        setData('duration', e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //set entry_price 
        post(route('frontend.stock.trade', { data }), {
            onSuccess: () => {
                setData('amount', '');

            }
        });
    };
    return (
        <Layout>
            <div className="container mx-auto">
                <div className={`p-3 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <div>
                        <h2 className="">{symbol}</h2>
                        <h2 className='font-semibold' style={{ fontSize: '25pt' }}>
                            {tickerData ? <span id="entry_price">{parseFloat(tickerData.price).toFixed(4)}</span> : 'NA'}
                        </h2>
                        <p className="medium font-bold text-gray-400">≈ {tickerData ? (parseFloat(tickerData.price).toFixed(4) * parseFloat(user_currency.rate_per_usdt)).toFixed(4) : 'NA'} {user_currency.symbol}</p>
                    </div>
                </div>
                <div className={`p-3 rounded-lg mt-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="tradeType">Type</label>
                            <select
                                id="tradeType"
                                value={data.tradeType}
                                onChange={handleTypeChange}
                                className={`w-full p-2 border rounded extra_small ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`} 
                                >
                                <option value="long">Long</option>
                                <option value="short">Short</option>
                            </select>
                            {errors.tradeType && <div className="text-red-500 text-sm mt-1">{errors.tradeType}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="amount">Amount (USDT)  &nbsp; &nbsp; &nbsp; Available ({balance} USDT)</label>
                            <input
                                type="number"
                                id="amount"
                                value={data.amount}
                                onChange={handleAmountChange}
                                className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="duration">Duration</label>
                            <select
                                id="duration"
                                value={data.duration}
                                onChange={handleDurationChange}
                                className={`w-full p-2 border rounded extra_small ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`} 
                            >
                                <option value="3">3 minutes</option>
                                <option value="5">5 minutes</option>
                                <option value="15">15 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="60">60 minutes</option>
                            </select>
                            {errors.duration && <div className="text-red-500 text-sm mt-1">{errors.duration}</div>}
                        </div>
                        <div className="flex justify-center mt-8 mb-12">
                            <button
                                type="submit"
                                className={`py-2 px-4 rounded w-1/2 text-center ${data.tradeType === 'long' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                            >
                                {data.tradeType === 'long' ? 'Long' : 'Short'}
                            </button>
                        </div>
                    </form>
                   
                </div>
            </div>
        </Layout>
    );
};

export default TradePageShare;
