import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Select from 'react-select';
import logo from '../../../../images/logo.png';

const Register = ({ countryCodes, currencies }) => {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        country_code_id: null,  // Initially set to null instead of an empty string
        contact_no: '',
        currency_id: null,      // Initially set to null instead of an empty string
    });

    const [agree, setAgree] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (agree) {
            post('/register');
        }
    };

    const currencyOptions = currencies.map(currency => ({
        value: currency.id,
        label: currency.symbol,
    }));

    const countryOptions = countryCodes.map(code => ({
        value: code.id,
        label: code.code,
    }));

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

                <div className="flex items-center space-x-2 mb-4">
                    <Select
                        value={countryOptions.find(option => option.value === data.country_code_id) || null}
                        onChange={(e) => setData('country_code_id', e.value)}
                        options={countryOptions}
                        placeholder="Country Code"
                        className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="text"
                        placeholder="Contact No"
                        value={data.contact_no}
                        onChange={(e) => setData('contact_no', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                {errors.country_code_id && <div className="text-red-500 mt-2">{errors.country_code_id}</div>}
                {errors.contact_no && <div className="text-red-500 mt-2">{errors.contact_no}</div>}

                <div className="mb-4 mt-4">
                    <Select
                        value={currencyOptions.find(option => option.value === data.currency_id) || null}
                        onChange={(e) => setData('currency_id', e.value)}
                        options={currencyOptions}
                        placeholder="Choose currency"
                        className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
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
                <span className="text-gray-600">Already have an account? </span>
                <a href={route('app.login')} className="text-blue-600 hover:underline">Login here</a>
            </div>
        </div>
    );
};

export default Register;
