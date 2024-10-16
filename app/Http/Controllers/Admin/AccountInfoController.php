<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Account;
use App\Models\Currency;
use Throwable;
use Log;

class AccountInfoController extends Controller
{
    public function getAccountInfoPage(Request $request)
    {
        $accounts = Account::query();
        $search = false;

        if($request->has('search') && $request->search != ''){
            $search = true;
            $accounts->where('title', 'like', '%'.$request->search.'%')
            ->orWhere('wallet_addr', 'like', '%'.$request->search.'%')
            ->orWhere('bank_name', 'like', '%'.$request->search.'%')
            ->orWhere('acc_no', 'like', '%'.$request->search.'%')
            ->orWhere('acc_name', 'like', '%'.$request->search.'%');
        }

        $accounts = $accounts->with('currency')->get();
        return Inertia::render('Admin/AccountInfo/Index', [
            'accounts' => $accounts,
            'search' => $search,
        ]);
    }

    public function deleteAccountInfo(Request $request)
    {
        if(!$request->has('id') || $request->id === null)
        {

            return back()->with('error', 'Id is required !');
        }
        else{

            try{
                $account = Account::find($request->id);
                if($account)
                {
                    $account->delete();
                    return back()->with('success', 'Account info deleted successfully');
                }
                else{
                    return back()->with('error', 'Account info not found');
                }
            }
            catch (Throwable $e) {
                Log::error('AccountInfoController@deleteAccountInfo: '.$e->getMessage());
                return back()->with('error', 'Something went wrong');
            }
        }

    }

    public function getCreateAccountInfoPage()
    {
        $currencies = Currency::whereDoesntHave('accounts')->get();
        return Inertia::render('Admin/AccountInfo/Create', [
            'currencies' => $currencies
        ]);
    }

    public function storeAccountInfo(Request $request)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'currency_id' => 'required|exists:currencies,id',
            'account_type' => 'required|in:crypto,bank',
            'deposit_instruction' => 'required|max:255',

            'wallet_address' => 'required_if:account_type,crypto|max:255',
            'account_name' => 'required_if:account_type,bank|max:255',
            'account_number' => 'required_if:account_type,bank|max:255',
            'bank_name' => 'required_if:account_type,bank|max:255',
        ]);


        try{
            $account = new Account();
            $account->title = $request->title;
            $account->currency_id = $request->currency_id;
            $account->deposit_instruction = $request->deposit_instruction;
            $account->wallet_addr = $request->wallet_address;
            $account->bank_name = $request->bank_name;
            $account->acc_no = $request->account_number;
            $account->acc_name = $request->account_name;
            $account->save();

            return back()->with('success', 'Account info created successfully');

        } catch (Throwable $e) {

            Log::error('AccountInfoController@storeAccountInfo: '.$e->getMessage());
            return back()->with('error', 'Something went wrong');
        }
    }

    public function getUpdateAccountInfoPage($id)
    {
        $account = Account::with('currency')->find($id);

        if(!$account){
            return back()->with('error', 'Account not found');
        }
        return Inertia::render('Admin/AccountInfo/Update', [
            'account' => $account
        ]);
    }

    public function updateAccountInfo(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'currency_id' => 'required|exists:currencies,id',
            'account_type' => 'required|in:crypto,bank',
            'deposit_instruction' => 'required|max:255',
            'wallet_address' => 'required_if:account_type,crypto|max:255',
            'account_name' => 'required_if:account_type,bank|max:255',
            'account_number' => 'required_if:account_type,bank|max:255',
            'bank_name' => 'required_if:account_type,bank|max:255',
        ]);

        try {
            $account = Account::findOrFail($id);
            $account->title = $request->title;
            $account->currency_id = $request->currency_id;
            $account->deposit_instruction = $request->deposit_instruction;
            $account->wallet_addr = $request->wallet_address;
            $account->bank_name = $request->bank_name;
            $account->acc_no = $request->account_number;
            $account->acc_name = $request->account_name;
            $account->save();

            return back()->with('success', 'Account info updated successfully');
        } catch (Throwable $e) {
            Log::error('AccountInfoController@updateAccountInfo: '.$e->getMessage());
            return back()->with('error', 'Something went wrong');
        }
    }
}
