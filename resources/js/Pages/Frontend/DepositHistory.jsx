import React from 'react';
import Layout from '../Components/Layout';
import { useDarkMode } from '../Components/DarkModeProvider';
import moment from 'moment';

const DepositHistory = ({ deposits }) => {
    const { darkMode } = useDarkMode();

    const formatDate = (dateString) => {
        return moment(dateString).format('LLL');
    };

    return (
        <Layout>
            <div className="container mx-auto">
                <div className={`p-3 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>
                    <h3 className='text-xl font-semibold'>Deposit History</h3>
                </div>

                <div 
                    >
                {deposits.map(deposit => (
                    <details key={deposit.id}
                    className={`my-2 p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}
                    >
                    <summary>{deposit.transaction_code} - {deposit.request_amount} {deposit.currency.symbol} - {deposit.status}</summary>
                    <p><strong>Type:</strong> {deposit.type}</p>
                    <p><strong>Is Approved:</strong> {deposit.is_approved ? 'Yes' : 'No'}</p>
                    <p><strong>Requested At:</strong> {formatDate(deposit.requested_at)}</p>
                    <p><strong>Status:</strong> {deposit.status}</p>
                    {deposit.is_approved === 1 && (
                        <p><strong>Approved Amount:</strong> {deposit.approved_amount} USDT</p>
                    )}
                    {deposit.status === 'Rejected' && (
                        <>
                            <p><strong>Reject Reason:</strong> {deposit.reject_reason}</p>
                            <p><strong>Rejected At:</strong> {formatDate(deposit.rejected_at)}</p>
                        </>
                    )}
                    </details>
                ))}
            </div>
                
            </div>
        </Layout>
    );
};

export default DepositHistory;
