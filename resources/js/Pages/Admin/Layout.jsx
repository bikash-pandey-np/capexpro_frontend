import React, {useEffect} from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ title, children }) => {
    const { url } = usePage();
    const { flash } = usePage().props;
    console.log('flash', flash);
    useEffect(() => {
        if (flash.success) {
            toast.dismiss();
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.dismiss();
            toast.error(flash.error);
        }
    }, [flash]);

    const isActive = (path) => url.startsWith(path) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800">
                <div className="flex items-center justify-center h-16 bg-gray-900">
                    <span className="text-white font-bold text-lg">Admin Panel</span>
                </div>
                <nav className="mt-5">
                    <Link
                        href={route('admin.dashboard')}
                        className={`flex items-center px-6 py-2 mt-4 ${isActive('/admin/dashboard')}`}
                    >
                        <span className="mx-3">Dashboard</span>
                    </Link>
                    <Link
                        href={route('admin.currency')}
                        className={`flex items-center px-6 py-2 mt-4 ${isActive('/admin/currency')}`}
                    >
                        <span className="mx-3">Currency</span>
                    </Link>
                    <Link
                        href={route('admin.customers')}
                        className={`flex items-center px-6 py-2 mt-4 ${isActive('/admin/customers')}`}
                    >
                        <span className="mx-3">Customers</span>
                    </Link>
                    <Link
                        href={route('admin.account-info')}
                        className={`flex items-center px-6 py-2 mt-4 ${isActive('/admin/account-info')}`}
                    >
                        <span className="mx-3">Account Info</span>
                    </Link>
                    <Link
                        href="/admin/settings"
                        className={`flex items-center px-6 py-2 mt-4 ${isActive('/admin/settings')}`}
                    >
                        <span className="mx-3">Setting</span>
                    </Link>
                    <Link
                        href={route('admin.positions')}
                        className={`flex items-center px-6 py-2 mt-4 ${isActive('/admin/positions')}`}
                    >
                        <span className="mx-3">Positions</span>
                    </Link>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Layout;
