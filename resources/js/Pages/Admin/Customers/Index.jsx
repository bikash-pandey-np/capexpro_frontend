import React, { useState, useRef, useEffect } from 'react';
import Layout from '../Layout';
import { Link, useForm } from '@inertiajs/react';
import { FaEdit, FaLock, FaUnlock, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

const Index = ({ customers, search, currencies, accounts }) => {


    const [searchQuery, setSearchQuery] = useState('');
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        currency_id: '',
        type: 'cash',
        account: ''
    });

    const modalRef = useRef(null);


    const handleBlockClick = (customer) => {

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
            return <span className="text-red-600 flex items-center">
                <FaTimes className="mr-1" /> Not Submitted
            </span>
        }
        else{
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

    const handleDepositClick = (id) => {
        setIsDepositModalOpen(true);

        setCustomerId(id)
    }

    const handleDepositFormChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }


    const handleModalClose = (e) => {
        e.preventDefault();
        setCustomerId('');
        setIsDepositModalOpen(false);
    }

    const handleDepositSubmit = (e) => {
        e.preventDefault();
        console.log('Customer ID from submit', data);
        post(route('admin.deposit', { customer_id: customerId }));
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleModalClose(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                                        <button
                                            onClick={() => handleDepositClick(customer.id)}
                                            data-customer-id={customer.id}
                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded inline-flex items-center mr-2 text-xs'>
                                            Deposit
                                        </button>
                                    
                                        {customer.is_active ? (
                                            <>
                                            <button onClick={() => handleBlockClick(customer)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded inline-flex items-center mr-2 text-xs"
                                                >
                                                <FaLock className="mr-1" />
                                                <span>Block</span>
                                            </button>
                                            </>
                                        ) : (
                                            <>
                                            <button onClick={() => handleUnblockClick(customer)}
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded inline-flex items-center mr-2 text-xs"
                                                >
                                                <FaUnlock className="mr-1" />
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

            {/* Deposit Modal */}
            {isDepositModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div ref={modalRef} className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={(e) => handleDepositSubmit(e)} className="p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Deposit</h3>
                                <div className="mb-4">
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                    <input type="number" name="amount" id="amount" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required onChange={handleDepositFormChange} />
                                    {errors.amount && (
                                        <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="currency_id" className="block text-sm font-medium text-gray-700">Currency</label>
                                    <select name="currency_id" id="currency_id" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required onChange={handleDepositFormChange}>
                                        <option value="">Select Currency</option>
                                        {currencies && currencies.map((currency) => (
                                            <option key={currency.id} value={currency.id}>{currency.name}</option>
                                        ))}
                                    </select>
                                    {errors.currency_id && (
                                        <p className="text-red-500 text-xs mt-1">{errors.currency_id}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                                    <select name="type" id="type" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required onChange={handleDepositFormChange}>
                                        <option value="cash">Cash</option>
                                        <option value="account">Account</option>
                                    </select>
                                    {errors.type && (
                                        <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                                    )}
                                </div>
                                {data.type === 'account' && (
                                    <div className="mb-4">
                                        <label htmlFor="account" className="block text-sm font-medium text-gray-700">Account</label>
                                        <select name="account" id="account" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                         onChange={handleDepositFormChange}>
                                            <option value="">Select Account</option>
                                            {accounts && accounts.map((account) => (
                                                <option key={account.id} value={account.id}>{account.title}</option>
                                            ))}
                                        </select>
                                        {errors.account && (
                                            <p className="text-red-500 text-xs mt-1">{errors.account}</p>
                                        )}
                                    </div>
                                )}
                                <div className="mt-5 sm:mt-6">
                                    <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Index;
