import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { ToastContainer, toast } from 'react-toastify';
import { usePage } from '@inertiajs/inertia-react';

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: 'admin@thecapex.pro',
        password: '',
    });
    const { props } = usePage();
    const { flash } = props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.login'));
    };

    return (
        <div>
            <ToastContainer />
            <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                   
                    <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                    <form onSubmit={handleSubmit}>
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
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    
                </div>
            </div>
        </div>
    );
};

export default Login;

