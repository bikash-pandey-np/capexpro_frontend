import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Layout from '../Components/Layout';
import { useDarkMode } from '../Components/DarkModeProvider';

const ChangePassword = ({ email }) => {
    const { darkMode } = useDarkMode();
    const { data, setData, post, processing, errors } = useForm({
        email: email,
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/change-password', {
            onSuccess: () => {
                setData({
                    email: email,
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: ''
                });
            }
        });
    };

    return (
        <Layout>
            <div className="container mx-auto">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-lg font-bold mb-4">Change Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="current_password">Current Password</label>
                            <input
                                type="password"
                                id="current_password"
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                                value={data.current_password}
                                onChange={e => setData('current_password', e.target.value)}
                            />
                            {errors.current_password && <div className="text-red-500 text-sm mt-1">{errors.current_password}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="new_password">New Password</label>
                            <input
                                type="password"
                                id="new_password"
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                                value={data.new_password}
                                onChange={e => setData('new_password', e.target.value)}
                            />
                            {errors.new_password && <div className="text-red-500 text-sm mt-1">{errors.new_password}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="confirm_password">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password"
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                                value={data.new_password_confirmation}
                                onChange={e => setData('new_password_confirmation', e.target.value)}
                            />
                            {errors.new_password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.new_password_confirmation}</div>}
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-2 rounded ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                            disabled={processing}
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ChangePassword;
