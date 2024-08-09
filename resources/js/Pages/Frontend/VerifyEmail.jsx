import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Layout from '../Components/Layout';
import { useDarkMode } from '../Components/DarkModeProvider';

const VerifyEmail = ({ email, full_name, is_email_verified }) => {
    const { darkMode } = useDarkMode();
    const [otpSent, setOtpSent] = useState(false);
    const { data, setData, post } = useForm({
        email: email,
        otp: ''
    });

    const handleVerifyClick = () => {
        setOtpSent(true);
        post(route('frontend.generate-otp'), { email: data.email });
        
        // Here you can add the logic to send OTP to the user's email
    };

    const handleSubmitOtp = (e) => {
        e.preventDefault();
        post(route('frontend.verify-otp'), data)
        // Here you can add the logic to verify the OTP
    };

    return (
        <Layout>
            <div className="container mx-auto mb-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} pb-8`}>
                    {is_email_verified ? (
                        <p className='mt-8'>Your email has been verified Successfully.</p>
                    ) : (
                        <>
                            <p className='mt-8'>Dear {full_name},</p>
                            <p className='mt-2'>You are about to verify your email.</p>
                            <p className='mt-2'>Verification Code will be sent to your registered email.</p>

                            <input 
                                type="email" 
                                value={email} 
                                readOnly 
                                className={`block w-full mt-4 p-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`} 
                            />
                            {!otpSent && (
                                <button 
                                    onClick={handleVerifyClick}
                                    className={`block w-full mt-4 p-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                                >
                                    Send OTP
                                </button>
                            )}
                            {otpSent && (
                                <form onSubmit={handleSubmitOtp} className="mt-4">
                                    <input 
                                        type="text" 
                                        placeholder="Enter OTP" 
                                        value={data.otp} 
                                        onChange={(e) => setData('otp', e.target.value)}
                                        className={`block w-full mt-4 p-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`} 
                                    />
                                    <button 
                                        type="submit"
                                        className={`block w-full mt-4 p-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                                    >
                                        Submit OTP
                                    </button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default VerifyEmail;
