import React, { useState } from 'react';
import Layout from '../Layout';
import { Link } from '@inertiajs/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

const Index = ({ positions, search }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    console.log(positions);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    }

    const fetchSearchResults = () => {
        Inertia.get(route('admin.positions'), {
            search: searchQuery,
            status: statusFilter
        });
    }

    const handleLose = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            input: 'text',
            inputLabel: 'Enter Amount',
            inputPlaceholder: 'Enter the Amount',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, lose it!',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to enter an Amount!'
                }
                if (!/^[1-9]\d*(\.\d+)?$/.test(value)) {
                    return 'Please enter a valid positive number (no leading zeros, no "e" notation)!'
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('admin.positions.make-lose'), {
                    id: id,
                    amount: result.value
                });
            }
        })
    }

    const handleWin = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            input: 'text',
            inputLabel: 'Enter Amount',
            inputPlaceholder: 'Enter the Amount',
            showCancelButton: true,
            confirmButtonColor: '#4CAF50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Win it!',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to enter an Amount!'
                }
                if (!/^[1-9]\d*(\.\d+)?$/.test(value)) {
                    return 'Please enter a valid positive number (no leading zeros, no "e" notation)!'
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('admin.positions.make-win'), {
                    id: id,
                    amount: result.value
                });
            }
        })
    }

    return (
        <Layout title="Positions">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-2/3">
                    <input type='search' 
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Search..." />
                </div>
                <div className="w-full md:w-1/3">
                    <select
                        value={statusFilter}
                        onChange={handleStatusChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All</option>
                        <option value="Settled">Settled</option>
                        <option value="Not Settled">Unsettled</option>
                    </select>
                </div>
                <div className="w-full md:w-1/4">
                    <button
                        onClick={fetchSearchResults}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Search
                    </button>
                </div>
                {search && (
                    <Link href={route('admin.positions')} 
                        className="w-full md:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center">
                            Clear
                    </Link>
                )}
            </div>

            <div className='mt-4'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Identifier
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Symbol
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Entry Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {positions.data.length > 0 ? (
                            positions.data.map((position) => (
                                <tr key={position.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">
                                            {position.identifier}
                                            <div className="text-xs text-gray-500">
                                                {position.traded_by.full_name}
                                                <br />
                                                {position.traded_by.customer_code}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {position.symbol}
                                            <div className="text-xs text-gray-500">
                                                {position.is_crypto ? 'Crypto' : 'Forex'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {position.type}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {position.amount}
                                            <div className="text-xs text-gray-500">
                                                PNL :
                                                <span className={`font-bold ${
                                                    position.pnl > 0 ? 'text-green-600' :
                                                    position.pnl < 0 ? 'text-red-600' :
                                                    'text-black'
                                                }`}>
                                                    {position.pnl}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <span className='font-semibold'>{position.entry_price}</span> USDT
                                            <div className="text-xs text-gray-500">
                                                Traded on :<span className='font-semibold'>{position.traded_datetime}</span>
                                                <br />
                                                Duration :<span className='font-semibold'>{position.trade_duration} Minutes</span>
                                                <br />
                                                Will close on :<span className='font-semibold'>{position.will_close_at}</span>  
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {position.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {position.status === 'Not Settled' ? (
                                            <>
                                                <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-xs mr-2'
                                                onClick={(e) => handleLose(position.id)}>
                                                    Lose
                                                </button>
                                                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs'
                                                onClick={(e) => handleWin(position.id)}>
                                                    Win
                                                </button>
                                            </>
                                        ) : null}
                                        {position.status === 'Settled' ? (
                                            <>
                                                <span>Closed At Time : <span className='font-semibold'>{position.closed_at}</span></span>
                                                <br />
                                                <span>Closed At : <span className='font-semibold'>{position.trade_close_price} USDT</span></span>
                                            </>
                                        ) : null}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="text-sm text-gray-900">No positions found</div>
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
