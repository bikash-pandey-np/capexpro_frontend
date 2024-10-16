<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function getCustomersPage(Request $request)
    {
        $customers = Customer::query();
        $search = false;

        if($request->has('search') && $request->search != ''){
            $search = true;
            $customers->where('full_name', 'like', '%'.$request->search.'%')
                ->orWhere('customer_code', 'like', '%'.$request->search.'%')
            ->orWhere('email', 'like', '%'.$request->search.'%');
        }


        $customers->with(['countryCode', 'kyc']);


        $customers = $customers->latest()->paginate(10);


        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
            'search' => $search,
        ]);
    }
}
