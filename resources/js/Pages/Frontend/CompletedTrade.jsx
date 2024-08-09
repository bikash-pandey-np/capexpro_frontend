import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout'
import { useDarkMode } from '../Components/DarkModeProvider';
import axios from 'axios';

const ActiveTradePage = ({completed_trades}) => {
    const { darkMode } = useDarkMode();

    return (
        <Layout>
            <div className="container mx-auto">
                <div className={`p-3 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <div>
                        <p className="large font-bold">Trade Transactions</p>
                     
                    </div>
                    <a href={route('frontend.active-trade')}>
                    Active Trades
                    </a>
                </div>
                <div className={`p-3 rounded-lg mt-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    {completed_trades.length > 0 ? (
                        completed_trades.map((trade) => (
                            <div key={trade.id} className={`p-4 mb-4 rounded-lg shadow-md ${trade.type === 'long' ? (darkMode ? 'bg-green-800 text-white' : 'bg-green-100 text-black') : (darkMode ? 'bg-red-800 text-white' : 'bg-red-100 text-black')}`}>
                                <p><strong>Symbol:</strong> {trade.symbol}</p>
                                <p><strong>Amount:</strong> {trade.amount} USDT</p>
                                <p><strong>Entry Price:</strong> {trade.entry_price} USDT</p>
                                <p><strong>Closed Price:</strong> {trade.trade_close_price} USDT</p>

                                <p><strong>Type:</strong> {trade.type}</p>
                                <p><strong>Identifier:</strong> {trade.identifier}</p>
                                <p><strong>Traded at:</strong>{trade.traded_datetime}</p>
                                <p><strong>PNL:</strong> <span className={trade.outcome === 'Positive' ? 'text-green-500' : 'text-red-500'}>{trade.outcome === 'Positive' ? '+' : '-'}{trade.pnl}</span></p>
                                <p><strong>Trade Closed At:</strong> {trade.closed_at}</p>
                                <p><strong>Status:</strong> {trade.status}</p>

                            </div>
                        ))
                    ) : (
                        <p>You don't have any Transactions.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ActiveTradePage;
