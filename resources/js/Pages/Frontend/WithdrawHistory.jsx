import React from 'react';
import Layout from '../Components/Layout';
import { useDarkMode } from '../Components/DarkModeProvider';
import moment from 'moment';

const WithdrawHistory = ({ withdrawals }) => {
    console.log(withdrawals);
    const { darkMode } = useDarkMode();

    const formatDate = (dateString) => {
        return moment(dateString).format('LLL');
    };

    return (
        <Layout>
            <div className="container mx-auto">
                <div className={`p-3 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>
                    <h3 className='text-xl font-semibold'>Withdraw History</h3>
                </div>

                <div className='mb-16'>
                {withdrawals.map(withdrawal => (
                    <details key={withdrawal.id}
                    className={`my-2 p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}
                    >
                    <summary>{withdrawal.transaction_code} - {withdrawal.request_amount} {withdrawal.currency.symbol} - {withdrawal.status}</summary>
                    <p><strong>Type:</strong> {withdrawal.type}</p>
                    <p><strong>Requested At:</strong> {formatDate(withdrawal.requested_at)}</p>
                    <p><strong>Status:</strong> {withdrawal.status}</p>
                    {withdrawal.wallet_addr && (
                        <p><strong>Wallet Address:</strong> {withdrawal.wallet_addr}</p>
                    )}
                    {withdrawal.bank_info && (
                        <>
                            <p><strong>Bank Name :</strong> {JSON.parse(withdrawal.bank_info).bankName}</p>
                            <p><strong>Account No :</strong> {JSON.parse(withdrawal.bank_info).accountNo}</p>
                            <p><strong>Account Holder :</strong> {JSON.parse(withdrawal.bank_info).accountName}</p>
                        </>
                    )}

                    {withdrawal.is_approved === 1 && (
                        <p><strong>Approved Amount:</strong> {withdrawal.approved_amount} {withdrawal.currency.symbol}</p>
                    )}
                    {withdrawal.status === 'Rejected' && (
                        <>
                            <p><strong>Reject Reason:</strong> {withdrawal.reject_reason}</p>
                            <p><strong>Rejected At:</strong> {formatDate(withdrawal.rejected_at)}</p>
                        </>
                    )}
                    </details>
                ))}
            </div>
                
            </div>
        </Layout>
    );
};

export default WithdrawHistory;
