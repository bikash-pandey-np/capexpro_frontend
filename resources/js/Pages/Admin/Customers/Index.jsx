import React, { useState } from 'react';
import Layout from '../Layout';
import { Link } from '@inertiajs/react';
import { FaEdit, FaLock, FaUnlock, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

const Index = ({ customers, search }) => {
    const [searchQuery, setSearchQuery] = useState('');

    console.log(customers);

    const handleBlockClick = (customer) => {
        console.log(customer);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, block it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('admin.customers.block'), { id: customer.id });
            }
        });

    }

    const handleUnblockClick = (customer) => {
        console.log(customer);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true, 
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, unblock it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('admin.customers.unblock'), { id: customer.id });
            }
        });
    }   
    

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const showKycStatus = (customer) => {

        if(customer.kyc_id == null){
            console.log('if', customer.id);
            return <span className="text-red-600 flex items-center">
                <FaTimes className="mr-1" /> Not Submitted
            </span>
        }
        else{
            console.log('else', customer.id);
            if(customer.is_kyc_verified){
                return (
                    <>
                <span className="text-green-600 flex items-center">
                    <FaCheck className="mr-1" /> Verified
                </span>
                <Link href={route('admin.kyc', { id: customer.id })} className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-md text-sm">View KYC</Link>
                    </>
                );
            }
            else{
                return <span className="text-red-600 flex items-center">
                    <Link href={route('admin.kyc', { id: customer.id })} className="flex items-center bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md text-sm">
                        <FaTimes className="mr-1" /> Verify KYC
                    </Link>
                </span>
            }
        }


    }
    const fetchSearchResults = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            Inertia.get(route('admin.customers'), {
                search: searchQuery
            });
        }
    }

    return (
        <Layout title="Customers">
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
                    <Link
                     href={route('admin.customers')} 
                        className="w-full md:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center">
                            Clear
                    </Link>
                )}
               
            </div>

            <div className='mt-4 overflow-x-auto'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Full Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                KYC
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {customers.data.length > 0 ? (
                            customers.data.map((customer) => (
                                <tr key={customer.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {customer.full_name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {customer.customer_code}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="block">Balance: <span className="font-bold">{customer.balance_usdt}</span></span>
                                            <span className="block">Total Deposit: <span className="font-bold">{customer.total_deposit}</span></span>
                                            <span className="block">Total Withdraw: <span className="font-bold">{customer.total_withdraw}</span></span>
                                            <span className="block">Pending Deposit: <span className="font-bold">{customer.pending_deposit}</span></span>
                                            <span className="block">Freezed: <span className="font-bold">{customer.freezed}</span></span>
                                            <span className="block">Traded Amount: <span className="font-bold">{customer.traded_amount}</span></span>
                                            <span className="block">Credit Score: <span className="font-bold">{customer.credit_score}</span></span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {customer.email}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {customer.is_email_verified ? (
                                                <span className="text-green-600 flex items-center">
                                                    <FaCheck className="mr-1" /> Verified
                                                </span>
                                            ) : (
                                                <span className="text-red-600 flex items-center">
                                                    <FaTimes className="mr-1" /> Not Verified
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {customer.country_code.country_name}
                                            ({customer.country_code.code})
                                            <p>
                                                {customer.contact_no}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {showKycStatus(customer)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {/* <Link
                                        //  href={route('admin.customers.update', customer.id)} 
                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2"
                                        >
                                            <FaEdit className="mr-2" />
                                            <span>Update</span>
                                        </Link> */}
                                       
                                            {customer.is_active ? (
                                                <>
                                                <button onClick={() => handleBlockClick(customer)}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2"
                                                    >
                                                    <FaLock className="mr-2" />
                                                    <span>Block</span>
                                                </button>
                                                </>
                                            ) : (
                                                <>
                                                <button onClick={() => handleUnblockClick(customer)}
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2"
                                                    >
                                                    <FaUnlock className="mr-2" />
                                                    <span>Unblock</span>
                                                </button>
                                                </>
                                            )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="text-sm text-gray-900">No customers found</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
                <div>
                    Showing {customers.from} to {customers.to} of {customers.total} results
                </div>
                <div className="flex">
                    {customers.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-4 py-2 border ${
                                link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-blue-500 hover:bg-blue-100'
                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Index;
