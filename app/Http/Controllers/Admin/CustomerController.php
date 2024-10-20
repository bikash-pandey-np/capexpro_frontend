<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Currency;
use App\Models\Account;
use App\Models\Deposit;
use Throwable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

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
            'currencies' => Currency::all(), 
            'accounts' => Account::all(),
        ]);
    }

    public function deposit(Request $request, $customer_id)
    {
        Log::info('Deposit request data 1', $request->all());
        $rules = [
            'amount' => 'required|numeric|min:1',
            'currency_id' => 'required|exists:currencies,id',
            'type' => 'required|in:cash,account',
            'account' => 'required_if:type,account|nullable|exists:accounts,id',
        ];

        Log::info('Deposit request data 2');


        $validate = Validator::make($request->all(), $rules);

        if($validate->fails()){
            Log::error('Validation failed'. $validate->errors());

            return back()->withErrors($validate->errors());
        }

        Log::info('Valiation passed');

        Log::info('Deposit request data', $request->all());
        $currency = Currency::find($request->currency_id);

        $depositData = [
            'request_amount' => $request->amount,
            'currency_id' => $request->currency_id,
            'deposited_by' => $customer_id,
            'account_id' => $request->type === 'cash' ? null : $request->account,
            'type' => $request->type,
            'is_approved' => true,
            'status' => 'Approved',
            'approved_amount' => $request->amount * $currency->rate_per_usdt,
            'requested_at' => now(),
            'approved_at' => now(),
        ];

        try{
            DB::beginTransaction();

            $deposit = Deposit::create($depositData);

            $customer = Customer::find($customer_id);
            $customer->balance_usdt += $deposit->approved_amount;
            $customer->total_deposit += $deposit->approved_amount;
            $customer->save();

            DB::commit();

            return back()->with('success', 'Deposit request submitted successfully');
        }catch(Throwable $th){
            DB::rollBack();
            Log::error('Error at CustomerCOntroller@deposit : '.$th->getMessage() . ' on line ' . $th->getLine());
            return redirect()->back()->with('error', 'Something went wrong');
        }




    }
}
