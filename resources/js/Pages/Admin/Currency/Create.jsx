import React from 'react';
import Layout from '../Layout';
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';
const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        symbol: '',
        rate_per_usdt: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.currency.create'), {
            onSuccess: () => {
                // Clear form data
                setData({
                    name: '',
                    symbol: '',
                    rate_per_usdt: '',
                });
            },
            onError: () => {
                toast.error('Something went wrong');
            }
        });
    };

    return (
        <Layout title="Create Currency">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:flex-grow">
                    <p>Add New Currency</p>
                </div>
                <Link href={route('admin.currency')}
                    className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-center">
                    Back
                </Link>
            </div>

            <div className='mt-4'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="symbol" className="block text-gray-700 text-sm font-bold mb-2">Symbol</label>
                        <input 
                            type="text" 
                            id="symbol" 
                            name="symbol" 
                            value={data.symbol}
                            onChange={(e) => setData('symbol', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        />
                        {errors.symbol && <div className="text-red-500 text-xs mt-1">{errors.symbol}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="rate_per_usdt" className="block text-gray-700 text-sm font-bold mb-2">Rate per USDT</label>
                        <input 
                            type="number" 
                            id="rate_per_usdt" 
                            name="rate_per_usdt" 
                            value={data.rate_per_usdt}
                            onChange={(e) => setData('rate_per_usdt', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        />
                        {errors.rate_per_usdt && <div className="text-red-500 text-xs mt-1">{errors.rate_per_usdt}</div>}
                    </div>

                    <div className='mb-4'>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {processing ? 'Creating...' : 'Create Currency'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Create;
