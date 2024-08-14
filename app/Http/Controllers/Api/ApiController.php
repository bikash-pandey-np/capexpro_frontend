<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Customer;
use App\Models\Account;
use App\Models\Currency;
use App\Models\Deposit;
use App\Models\Withdraw;


use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{

    /**
     * login
     */
    public function login(Request $request)
    {
        // Define validation rules
        $rules = [
            'email' => 'required|email|exists:users,email',
            'password' => 'required'
        ];

        // Validate the request
        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 400);
        }

        // Get user by email
        $user = User::where('email', $request->email)->first();

        // Check if user exists and password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Create a token for the user (this example assumes the user model uses Laravel's default token system)
        $token = $user->createToken('Personal Access Token')->plainTextToken;

        // Respond with success and token
        return response()->json([
            'message' => 'Login successful',
            'token' => $token
        ], 200);
    }

    /**
     * list cust
     */

    public function listCustomers()
    {
        $customers = Customer::latest()->get();

        return response()->json([
            'customers' => $customers
        ], 200);
    }

    /**
     * get cust by email 
     */
    /**
     * Get customer by email
     */
    public function getCustomerByEmail(Request $request)
    {
        $rules = [
            'email' => 'required|email|exists:customers,email',
        ];

        // Validate the request
        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 400);
        }


        $customer = Customer::where('email', $request->email)->first();

        if (!$customer) {
            return response()->json([
                'message' => 'Customer not found'
            ], 404);
        }

        return response()->json([
            'customer' => $customer
        ], 200);
    }

    /**
     * fun to update customer 
     */

    public function updateCustomerByEmail(Request $request)
    {

        
        $rules = [
            'email' => 'required|email|exists:customers,email',
            'user_remark' => 'string',
            'contact_no' => 'string',
            'is_email_verified' => 'boolean',
            'is_kyc_verified' => 'boolean',
            'balance_usdt' => 'numeric',
            'total_deposit' => 'numeric',
            'pending_deposit' => 'numeric',
            'total_withdraw' => 'numeric',
            'credit_score' => 'numeric',
            'freezed' => 'boolean',
            'traded_amount' => 'numeric',
        ];

        // Validate the request
        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 400);
        }

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer) {
            return response()->json([
                'message' => 'Customer not found'
            ], 404);
        }

        $customer->update($request->all());

        return response()->json([
            'message' => 'Customer updated successfully'
        ], 200);
    }

    /**
     * get balance 
     * 
     */

    public function getCustomerBalanceByEmail(Request $request)
    {
        $rules = [
            'email' => 'required|email|exists:customers,email',

        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 400);
        }

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer) {
            return response()->json([
                'message' => 'Customer not found'
            ], 404);
        }

        return response()->json([
            'balance_usdt' => $customer->balance_usdt,
            'total_deposit' => $customer->total_deposit,
            'pending_deposit' => $customer->pending_deposit,
            'total_withdraw' => $customer->total_withdraw,
            'credit_score' => $customer->credit_score,
            'traded_amount' => $customer->traded_amount,
        ], 200);
    }

    /**
     * Get all accounts
     * 
     */
    public function getAllAccounts()
    {
        $accounts = Account::all();

        if (empty($accounts)) {
            return response()->json([
                'message' => 'No accounts found'
            ], 404);
        }

        return response()->json([
            'accounts' => $accounts
        ], 200);
    }

    /**
     * Get account detail by id
     * 
     */
    public function getAccountDetailById(Request $request)
    {
        $rules = [
            'id' => 'required|integer|exists:accounts,id',
            
        ];
      

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 400);
        }
      

        $account = Account::find($request->id);

        if (!$account) {
            return response()->json([
                'message' => 'Account not found'
            ], 404);
        }

        return response()->json([
            'account' => $account
        ], 200);
    }

    /**
     * Update account details by id
     * 
     */
    public function updateAccountDetailById(Request $request)
    {
        $rules = [
            'id' => 'required|integer|exists:accounts,id',
            'title' => 'sometimes|string',
            'currency_id' => 'sometimes|integer|exists:currencies,id',
            'deposit_instruction' => 'sometimes|string',
            'wallet_addr' => 'sometimes|string',
            'bank_name' => 'sometimes|string',
            'acc_no' => 'sometimes|string',
            'acc_name' => 'sometimes|string',
        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 400);
        }

        $account = Account::find($request->id);

        if (!$account) {
            return response()->json([
                'message' => 'Account not found'
            ], 404);
        }

        $account->update($request->all());

        return response()->json([
            'message' => 'Account updated successfully',
            'account' => $account
        ], 200);
    }

    /**
     * Add new account details
     * 
     */
    public function addAccountDetail(Request $request)
    {
        $rules = [
            'title' => 'required|string',
            'currency_id' => 'required|integer|exists:currencies,id',
            'deposit_instruction' => 'required|string',
            'wallet_addr' => 'sometimes|string',
            'bank_name' => 'sometimes|string',
            'acc_no' => 'sometimes|string',
            'acc_name' => 'sometimes|string',
        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 400);
        }

        $account = Account::create($request->all());

        return response()->json([
            'message' => 'Account added successfully',
            'account' => $account
        ], 201);
    }

    /**
     * Delete account by ID
     * 
     */
    public function deleteAccountById(Request $request)
    {
        $account = Account::find($request->id);

        if (!$account) {
            return response()->json([
                'message' => 'Account not found'
            ], 404);
        }

        $account->delete();

        return response()->json([
            'message' => 'Account deleted successfully'
        ], 200);
    }


    /**
     * Get all currencies
     * 
     */
    public function getAllCurrencies()
    {
        $currencies = Currency::all();

        if (empty($currencies)) {
            return response()->json([
                'message' => 'No currencies found'
            ], 404);
        }

        return response()->json([
            'currencies' => $currencies
        ], 200);
    }

    /**
     * Get all deposits
     * 
     */
    public function getAllDeposits()
    {
        $deposits = Deposit::all();

        if (empty($deposits)) {
            return response()->json([
                'message' => 'No deposits found'
            ], 404);
        }

        return response()->json([
            'deposits' => $deposits
        ], 200);
    }

    /**
     * Get all withdraws
     * 
     */
    public function getAllWithdraws()
    {
        $withdraws = Withdraw::all();

        if (empty($withdraws)) {
            return response()->json([
                'message' => 'No withdraws found'
            ], 404);
        }

        return response()->json([
            'withdraws' => $withdraws
        ], 200);
    }

    /**
     * Get all withdrawals for a customer by email
     * 
     * @param string $email
     * @return \Illuminate\Http\JsonResponse
     */
    public function getWithdrawsByEmail(Request $request)
    {

        $rules = [
            'email' => 'required|email|exists:customers,email',

        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 400);
        }

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer) {
            return response()->json([
                'message' => 'Customer not found'
            ], 404);
        }

        $withdraws = Withdraw::where('requested_by', $customer->id)->get();

        if ($withdraws->isEmpty()) {
            return response()->json([
                'message' => 'No withdrawals found for this customer'
            ], 404);
        }

        return response()->json([
            'withdraws' => $withdraws
        ], 200);
    }

  
    public function approveWithdraw(Request $request)
    {
        $rules = [
            'transaction_code' => 'required|exists:withdraws,transaction_code',
            'user_remark' => 'required|string',
        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 400);
        }

        $withdraw = Withdraw::where('transaction_code', $request->transaction_code)->first();

        if (!$withdraw) {
            return response()->json([
                'message' => 'Withdraw not found'
            ], 404);
        }

        $withdraw->update([
            'is_approved' => true,
            'status' => 'Approved',
            'approved_at' => now(),
            'user_remark' => $request->user_remark,
        ]);

        return response()->json([
            'message' => 'Withdraw approved successfully'
        ], 200);
    }

    public function rejectWithdraw(Request $request)
    {
        $rules = [
            'transaction_code' => 'required|exists:withdraws,transaction_code',
            'reject_reason' => 'required|string',
        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 400);
        }

        $withdraw = Withdraw::where('transaction_code', $request->transaction_code)->first();

        if (!$withdraw) {
            return response()->json([
                'message' => 'Withdraw not found'
            ], 404);
        }

        $withdraw->update([
            'is_approved' => false,
            'status' => 'Rejected',
            'rejected_at' => now(),
            'reject_reason' => $request->reject_reason,
        ]);

        return response()->json([
            'message' => 'Withdraw Rejected successfully'
        ], 200);
    }
}
