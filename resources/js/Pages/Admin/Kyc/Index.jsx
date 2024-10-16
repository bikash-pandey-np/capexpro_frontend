import { Link } from '@inertiajs/inertia-react';
import Layout from '../Layout';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

const Index = ({ detail }) => {

    const handleVerify = () => {
        console.log('cliced');

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, verify it!'
        }).then((result) => {   
            if (result.isConfirmed) {
                console.log('verified');
                Inertia.post(route('admin.kyc.verify'), { id: detail.id });
            }
        });
    }
    console.log(detail);
    return (
        <Layout title="KYC Details">
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-6 mb-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Kyc For: {detail.full_name}</h3>
                    <h3 className="text-md mb-1">Email: {detail.email}</h3>
                    <h3 className="text-md">Document Type: {detail.kyc.doc_type}</h3>
                </div>
                <div>

                    {detail.is_kyc_verified ? <span className="text-green-500">Verified</span> : <Link
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300"
                    //  href={detail.kyc.doc_front_img} 
                    onClick={handleVerify}
                     >Verify</Link>}
                </div>
            </div>

            <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-4 py-2 bg-gray-100">
                            <h3 className="text-lg font-semibold">Document Front</h3>
                        </div>
                        <div className="p-4">
                            <img src={detail.kyc.doc_front_img} alt="Document Front" className="w-full h-auto" />
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-4 py-2 bg-gray-100">
                            <h3 className="text-lg font-semibold">Document Back</h3>
                        </div>
                        <div className="p-4">
                            <img src={detail.kyc.doc_back_img} alt="Document Back" className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3>User</h3>
                <img src={detail.kyc.user_img} alt="User" />
            </div>

        </Layout>
    );
}

export default Index;
