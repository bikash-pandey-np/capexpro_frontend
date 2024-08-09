import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Layout from '../Components/Layout';
import { useDarkMode } from '../Components/DarkModeProvider';

const VerifyKyc = ({ email, is_kyc_verified, kyc_id }) => {

    const { darkMode } = useDarkMode();
    const { data, setData, post, errors } = useForm({
        email: email,
        doc_type: '',
        doc_front_img: null,
        doc_back_img: null,
        user_img: null,
    });

    const [docFrontImgPreview, setDocFrontImgPreview] = useState(null);
    const [docBackImgPreview, setDocBackImgPreview] = useState(null);
    const [userImgPreview, setUserImgPreview] = useState(null);

    const handleFileChange = (e, field, setPreview) => {
        const file = e.target.files[0];
        setData(field, file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('frontend.verify-kyc'), data);
    };

    return (
        <Layout>
            <div className="container mx-auto mb-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} pb-8`}>
                    <h3 className="text-xl font-bold my-4">Verify Kyc</h3>
                    {kyc_id ? (
                        <>
                            <div className="text-green-500">Your KYC has been submitted.</div>
                            {is_kyc_verified ? (
                                <>
                                    <p>and Verified Successfully</p>
                                </>
                            ) : (
                                <>
                                    <p>Please Wait till Admin verifies your KYC.</p>
                                </>
                            )}
                        </>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Document Type</label>
                                <select
                                    value={data.doc_type}
                                    onChange={(e) => setData('doc_type', e.target.value)}
                                    className={`block w-full p-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
                                >
                                    <option value="">Select Document Type</option>
                                    <option value="Passport">Passport</option>
                                    <option value="National id">National id</option>
                                    <option value="Driving license">Driving license</option>
                                </select>
                                {errors.doc_type && <div className="text-red-500 mt-2">{errors.doc_type}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Document Front Image</label>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={(e) => handleFileChange(e, 'doc_front_img', setDocFrontImgPreview)}
                                    className={`block w-full p-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
                                />
                                {docFrontImgPreview && <img src={docFrontImgPreview} alt="Document Front Preview" className="mt-2" />}
                                {errors.doc_front_img && <div className="text-red-500 mt-2">{errors.doc_front_img}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Document Back Image</label>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={(e) => handleFileChange(e, 'doc_back_img', setDocBackImgPreview)}
                                    className={`block w-full p-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
                                />
                                {docBackImgPreview && <img src={docBackImgPreview} alt="Document Back Preview" className="mt-2" />}
                                {errors.doc_back_img && <div className="text-red-500 mt-2">{errors.doc_back_img}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">User Image</label>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={(e) => handleFileChange(e, 'user_img', setUserImgPreview)}
                                    className={`block w-full p-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
                                />
                                {userImgPreview && <img src={userImgPreview} alt="User Preview" className="mt-2" />}
                                {errors.user_img && <div className="text-red-500 mt-2">{errors.user_img}</div>}
                            </div>
                            <button
                                type="submit"
                                className={`block w-full mt-4 p-2 rounded shadow focus:outline-none ${darkMode ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default VerifyKyc;
