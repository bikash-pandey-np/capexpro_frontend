import Layout from '../Layout';
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';

const Create = ({currencies}) => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        currency_id: '',
        account_type: 'crypto',
        wallet_address: '',
        bank_name: '',
        account_name: '',
        account_number: '',
        deposit_instruction: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.account-info.create'), {
            onSuccess: () => {
            // Clear form data
            setData({
                title: '',
                currency_id: '',
                account_type: 'crypto',
                wallet_address: '',
                bank_name: '',
                account_name: '',
                account_number: '',
                deposit_instruction: '',
            });
            },
            onError: () => {
                toast.error('Something went wrong');
            }
        });
    };

    return (
        <Layout title="Create Account Info">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:flex-grow">
                    <p>Add Account Info To Add New Deposit Account</p>
                </div>
                <Link href={route('admin.account-info')}
                    className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-center">
                    Back
                </Link>
            </div>

            <div className='mt-4'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        />
                        {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="currency" className="block text-gray-700 text-sm font-bold mb-2">Currency</label>
                        <select 
                            id="currency" 
                            name="currency" 
                            value={data.currency_id}
                            onChange={(e) => setData('currency_id', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select a currency</option>
                            {currencies.length > 0 ? (
                                currencies.map((currency) => (
                                    <option key={currency.id} value={currency.id}>{currency.name}</option>
                                ))
                            ) : (
                                <option disabled>No currencies available</option>
                            )}
                        </select>
                        {errors.currency_id && <div className="text-red-500 text-xs mt-1">{errors.currency_id}</div>}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="account_type" className="block text-gray-700 text-sm font-bold mb-2">Account Type</label>
                        <select 
                            id="account_type" 
                            name="account_type" 
                            value={data.account_type}
                            onChange={(e) => setData('account_type', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                        >
                            <option value="crypto">Crypto</option>
                            <option value="bank">Bank</option>
                        </select>
                        {errors.account_type && <div className="text-red-500 text-xs mt-1">{errors.account_type}</div>}
                    </div>

                    {data.account_type === 'crypto' ? (
                        <>
                            <div className="mb-4">
                                <label htmlFor="wallet_address" className="block text-gray-700 text-sm font-bold mb-2">Wallet Address</label>
                                <input 
                                    type="text" 
                                    id="wallet_address" 
                                    name="wallet_address" 
                                    value={data.wallet_address}
                                    onChange={(e) => setData('wallet_address', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
                                />
                                {errors.wallet_address && <div className="text-red-500 text-xs mt-1">{errors.wallet_address}</div>}
                            </div>
                        </>
                    ) : (
                        <>
                         <div className="mb-4">
                                <label htmlFor="account_name" className="block text-gray-700 text-sm font-bold mb-2">Account Name</label>
                                <input 
                                    type="text" 
                                    id="bank_name" 
                                    name="bank_name" 
                                    value={data.bank_name}
                                    onChange={(e) => setData('bank_name', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
                                />
                                {errors.bank_name && <div className="text-red-500 text-xs mt-1">{errors.bank_name}</div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="account_name" className="block text-gray-700 text-sm font-bold mb-2">Account Name</label>
                                <input 
                                    type="text" 
                                    id="account_name" 
                                    name="account_name" 
                                    value={data.account_name}
                                    onChange={(e) => setData('account_name', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
                                />
                                {errors.account_name && <div className="text-red-500 text-xs mt-1">{errors.account_name}</div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="account_number" className="block text-gray-700 text-sm font-bold mb-2">Account Number</label>
                                <input 
                                    type="text" 
                                    id="account_number" 
                                    name="account_number" 
                                    value={data.account_number}
                                    onChange={(e) => setData('account_number', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
                                />
                                {errors.account_number && <div className="text-red-500 text-xs mt-1">{errors.account_number}</div>}
                            </div>
                        </>
                    )}

                    <div className='mb-4'>
                        <label htmlFor="deposit_instruction" className="block text-gray-700 text-sm font-bold mb-2">Deposit Instruction</label>
                        <textarea 
                            id="deposit_instruction" 
                            name="deposit_instruction" 
                            value={data.deposit_instruction}
                            onChange={(e) => setData('deposit_instruction', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
                            rows="4"
                        ></textarea>
                        {errors.deposit_instruction && <div className="text-red-500 text-xs mt-1">{errors.deposit_instruction}</div>}
                    </div>

                    <div className='mb-4'>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {processing ? 'Creating...' : 'Create Account Info'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Create;
