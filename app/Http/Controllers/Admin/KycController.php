<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Kyc;
use Illuminate\Support\Facades\Validator;
class KycController extends Controller
{
    public function getKycPage(Request $request)
    {

        $detail = Customer::with('kyc')->where('id', $request->id)->first();

        return Inertia::render('Admin/Kyc/Index', [
            'detail' => $detail
        ]);
    }

    public function verifyKyc(Request $request)
    {

        $customer = Customer::find($request->id);


        $customer->is_kyc_verified = true;

        $customer->kyc_verified_at = now();

        $customer->save();

        return back()->with('success', 'Kyc verified successfully');
    }

    public function blockCustomer(Request $request)
    {
        $customer = Customer::find($request->id);

        $customer->is_active = false;

        $customer->save();

        return back()->with('success', 'Customer blocked successfully');
        
    }

    public function unblockCustomer(Request $request)
    {
        $customer = Customer::find($request->id);

        $customer->is_active = true;

        $customer->save();

        return back()->with('success', 'Customer unblocked successfully');
        
    }
}
