import React, { useState } from 'react';
import Layout from '../Layout';
import { Link } from '@inertiajs/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';

const Index = ({ currencies, search }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const fetchSearchResults = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            Inertia.get(route('admin.currency'), {
                search: searchQuery
            });
        }
    }

    const handleDelete = (id) => {
        console.log('customer ID', id);
        if (window.confirm('Are you sure you want to delete this currency?')) {
            console.log('delete');
            Inertia.post(route('admin.currency.delete'), {
                id: id
            });
        }
    }

    return (
        <Layout title="Currencies">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:flex-grow">
                    <input type='search' 
                        value={searchQuery}
                        onChange={handleSearch}
                        onKeyDown={fetchSearchResults}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Press Enter to Search" />
                </div>
                {search && (
                    <Link href={route('admin.currency')} 
                        className="w-full md:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center">
                            Clear
                    </Link>
                )}
                <Link href={route('admin.currency.create')} className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">Create</Link>
            </div>

            <div className='mt-4'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Symbol
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rate per USDT
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currencies.length > 0 ? (
                            currencies.map((currency) => (
                                <tr key={currency.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {currency.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {currency.symbol}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {currency.rate_per_usdt}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link 
                                        href={route('admin.currency.update', currency.id)} 
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2"
                                        >
                                            <FaEdit className="mr-2" />
                                            <span>Update</span>
                                        </Link>
                                        <button 
                                        onClick={() => handleDelete(currency.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                                        >
                                            <FaTrash className="mr-2" />
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="text-sm text-gray-900">No currencies found</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Index;
