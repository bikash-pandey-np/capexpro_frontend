import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import logo from '../../../../images/logo.png'

const Register = ({countryCodes, currencies}) => {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        country_code_id: '',
        contact_no: '',
        currency_id: '',
    });

    const [agree, setAgree] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (agree) {
            post('/register');
        }
    };

    return (
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-center mb-4 mt-8">
                    <img src={logo} alt="Logo" className="h-8" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Register an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.full_name && <div className="text-red-500 mt-2">{errors.full_name}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.email && <div className="text-red-500 mt-2">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.password && <div className="text-red-500 mt-2">{errors.password}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.password_confirmation && <div className="text-red-500 mt-2">{errors.password_confirmation}</div>}
                    </div>
                    <div className="mb-4 flex">
                        <div className="w-2/5 pr-2">
                            <select
                                value={data.country_code_id}
                                onChange={(e) => setData('country_code_id', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="">Code</option>
                                {countryCodes.map((code) => (
                                    <option key={code.id} value={code.id}>{code.code}</option>
                                ))}
                            </select>
                            {errors.country_code_id && <div className="text-red-500 mt-2">{errors.country_code_id}</div>}
                        </div>
                        <div className="w-3/5 pl-2">
                            <input
                                type="text"
                                placeholder="Contact No"
                                value={data.contact_no}
                                onChange={(e) => setData('contact_no', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.contact_no && <div className="text-red-500 mt-2">{errors.contact_no}</div>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <select
                            value={data.currency_id}
                            onChange={(e) => setData('currency_id', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">Currency</option>

                            {currencies.map((currency) => (
                                <option key={currency.id} value={currency.id}>{currency.name}</option>
                            ))}
                        </select>
                        {errors.currency_id && <div className="text-red-500 mt-2">{errors.currency_id}</div>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="mr-2"
                        />
                        <span>I agree to the terms and conditions</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing || !agree}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            Register
                        </button>
                    </div>
                </form>


            <div className="mt-8 text-center">
            <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
            <a href={route('app.login')} className="text-blue-600 dark:text-blue-400 hover:underline">Login here</a>
        </div>
            </div>
    );
};

export default Register;
