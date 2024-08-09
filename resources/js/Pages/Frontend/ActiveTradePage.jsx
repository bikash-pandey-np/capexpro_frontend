import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout'
import { useDarkMode } from '../Components/DarkModeProvider';
import axios from 'axios';
import { FaHistory } from "react-icons/fa";

const ActiveTradePage = ({active_trades}) => {
    const { darkMode } = useDarkMode();
    const [activeTrades, setActiveTrades] = useState(active_trades);

    useEffect(() => {
        if (activeTrades.length > 0) {
            const interval = setInterval(() => {
                axios.post(route('frontend.update-trade-status'))
                    .then(response => {
                        setActiveTrades(response.data.active_trades);
                    })
                    .catch(error => {
                        console.error('Error updating trade status:', error);
                    });
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [activeTrades]);

    

    return (
        <Layout>
            <div className="container mx-auto">
                <div className={`p-3 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <div>
                        <p className="large font-bold">Active Trades </p>
                    </div>
                    <a href={route('frontend.trade-history')}>
                    <FaHistory />
                    </a>

                </div>
                <div className={`p-3 rounded-lg mt-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    {activeTrades.length > 0 ? (
                        activeTrades.map((trade) => (
                            <div key={trade.id} className={`p-4 mb-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
                                <p><strong>Symbol:</strong> {trade.symbol}</p>
                                <p><strong>Amount:</strong> {trade.amount} USDT</p>
                                <p><strong>Entry Price:</strong> {trade.entry_price} USDT</p>

                                <p><strong>Type:</strong> {trade.type}</p>
                                <p><strong>Identifier:</strong> {trade.identifier}</p>
                                <p><strong>Traded at:</strong>{trade.traded_datetime}</p>
                                <p><strong>PNL:</strong> <span className={trade.outcome === 'Positive' ? 'text-green-500' : 'text-red-500'}>{trade.outcome === 'Positive' ? '+' : '-'}{trade.pnl}</span></p>
                                <p><strong>Outcome:</strong> {trade.outcome ? trade.outcome : 'N/A'}</p>
                                <p><strong>Will Close At:</strong> {trade.will_close_at}</p>
                            </div>
                        ))
                    ) : (
                        <p>You don't have any active trades.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ActiveTradePage;
