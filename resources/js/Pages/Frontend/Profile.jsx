import React, { useState } from 'react';
import Layout from '../Components/Layout';
import { useDarkMode } from '../Components/DarkModeProvider';
import moment from 'moment';
import { Inertia } from '@inertiajs/inertia';

const Profile = ({ user }) => {
    const { darkMode } = useDarkMode();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        Inertia.post(route('frontend.logout'));
    };

    const memberSince = moment(user.created_at).fromNow();

    return (
        <Layout>
            <div className="container mx-auto mb-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-xl font-bold mb-4">Profile Details</h2>
                    <p className="mt-2 mb-2"><strong>Customer Code:</strong> {user.customer_code}</p>
                    <p className="mt-2 mb-2"><strong>Full Name:</strong> {user.full_name}</p>
                    <p className="mt-2 mb-2"><strong>Email:</strong> {user.email}</p>
                    <p className="mt-2 mb-2"><strong>Country Code:</strong> {user.country_code.code} ({user.country_code.country_name})</p>
                    <p className="mt-2 mb-2"><strong>Contact Number:</strong> {user.contact_no}</p>
                    <p className="mt-2 mb-2"><strong>Email Verified:</strong> {user.is_email_verified ? 'Yes' : 'No'}</p>
                    <p className="mt-2 mb-2"><strong>KYC Verified:</strong> {user.is_kyc_verified ? 'Yes' : 'No'}</p>
                    <p className="mt-2 mb-2"><strong>Currency:</strong> {user.currency.symbol}</p>
                    
                    <div className={`p-4 mt-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <p><strong>Member since:</strong> {memberSince}</p>
                    </div>

                    <div className="mt-12 w-full">
                        <a href={route('frontend.change-password')} className={`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                            Change Password
                        </a>
                    </div>
                    {!user.is_kyc_verified && (
                        <div className="mt-4 w-full">
                            <a href={route('frontend.verify-kyc')} className={`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                                Verify KYC
                            </a>
                        </div>
                    )}
                    {!user.is_email_verified && (
                        <div className="mt-4 w-full">
                            <a href={route('frontend.verify-email')} className={`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                                Verify email
                            </a>
                        </div>
                    )}
                    <div className="mt-4 w-full">
                        <a href={route('frontend.deposit-history')} className={`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                            Deposit History
                        </a>
                    </div>
                    <div className="mt-4 w-full">
                        <a href={route('frontend.withdraw-history')} className={`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                            Withdraw History
                        </a>
                    </div>
                     <div className="mt-4 w-full">
                        <a href={route('frontend.trade-history')} className={`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                            Trade History
                        </a>
                    </div>
               
                    <div className="mt-4 w-full mb-12">
                        <a onClick={() => setShowLogoutModal(true)} className={`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                            Logout
                        </a>
                    </div>
                </div>
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                        <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
                        <p className="mb-4">Are you sure you want to logout?</p>
                        <div className="flex justify-end">
                            <button onClick={() => setShowLogoutModal(false)} className="mr-4 px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600">Cancel</button>
                            <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Profile;


