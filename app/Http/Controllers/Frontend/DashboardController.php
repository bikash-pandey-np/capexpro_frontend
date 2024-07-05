<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Asset;
use App\Models\Customer;
use App\Models\Currency;
use App\Models\Account;
use App\Models\Withdraw;
use App\Models\Kyc;

use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailMail;
use Illuminate\Support\Facades\DB;
use Hash;
use Auth;

class DashboardController extends Controller
{
    public function getDashboardPage()
    {
        $assets = Asset::all();
        
        return Inertia::render('Frontend/Dashboard', [
            'assets' => $assets
        ]);
    }

    public function getWithdrawPage()
    {
      

        return Inertia::render('Frontend/Withdraw');
    }

    public function handleWithdrawRequest(Request $request)
    {
        $data = $request->validate([
            'withdrawType' => 'required|string',
            'walletAddress' => 'required_if:withdrawType,crypto|string',
            'amountUsdt' => 'required_if:withdrawType,crypto|numeric',
            'bankName' => 'required_if:withdrawType,bank',
            'accountNo' => 'required_if:withdrawType,bank',
            'accountName' => 'required_if:withdrawType,bank',
            'amount' => 'required_if:withdrawType,bank',
            'remark' => 'nullable|string',
        ]);

        // Handle the withdrawal logic here
        // For example, you can create a new withdrawal record in the database

        // Assuming you have a Withdrawal model
        try {
            Withdraw::create($data);
            return redirect()->back()->with('success', 'Withdrawal request submitted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed');
        }
    }

    public function getDepositPage()
    {
        $user = Auth::user();


        // $account_usdt = Account::where('currency_id', 'USDT')->first();
        $account_user = Account::where('currency_id', $user->currency_id)->first();

        $account_usdt = Account::whereHas('currency', function ($query) {
            $query->where('symbol', 'USDT');
        })->first();

        return Inertia::render('Frontend/Deposit', [
            'infos' => [
                'usdt' => $account_usdt,
                'user_currency' => $account_user
            ]
        ]);
    }

    public function getProfilePage()
    {
        $user = Customer::with(['currency', 'deposits', 'withdraws', 'countryCode'])->find(Auth::user()->id);
        return Inertia::render('Frontend/Profile', [
            'user' => $user
        ]);
    }

    public function getPortfolioPage()
    {
        $user = Customer::with('currency')->find(Auth::user()->id);
        return Inertia::render('Frontend/Portfolio', [
            'user' => $user
        ]);
    }

    public function getVerifyEmailPage()
    {
        $user = Customer::find(Auth::user()->id);
        return Inertia::render('Frontend/VerifyEmail', [
            'is_email_verified' => $user->is_email_verified,
            'email' => $user->email,
            'full_name' => $user->full_name,
        ]);
    }

    public function generateOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:customers,email',
        ]);

        $otp = rand(100000, 999999);
        $email = $request->input('email');

        DB::table('password_reset_tokens')->where('email', $email)->delete();

        DB::table('password_reset_tokens')->insert([
            'email' => $email,
            'token' => $otp,
            'created_at' => now(),
        ]);

        Mail::to($email)->send(new VerifyEmailMail($otp));


        return back()->with('success', 'OTP sent successfully');
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:customers,email',
            'otp' => 'required|numeric',
        ]);

        $email = $request->input('email');
        $otp = $request->input('otp');

        $record = DB::table('password_reset_tokens')
            ->where('email', $email)
            ->first();

        //check otp 
        if($record->token === $request->otp)
        {
            $user = Customer::where('email', $email)->first();
            $user->is_email_verified = true;
            $user->save();
            DB::table('password_reset_tokens')->where('email', $email)->delete();
            return back()->with('success', 'Email verified successfully');

        }
        else{
            return back()->with('error', 'Invalid otp');
        }
      
    }

    public function getVerifyKycPage(Request $request)
    {
        $user = $request->user();
        return Inertia::render('Frontend/VerifyKyc', [
            'email' => $user->email,
            'is_kyc_verified' => $user->is_kyc_verified,

        ]);
    }

    public function handleVerifyKycRequest(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|exists:customers,email',
            'doc_type' => 'required|string|in:Passport,National id,Driving license',
            'doc_front_img' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'doc_back_img' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'user_img' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        DB::beginTransaction();

        try {
            $customer = Customer::where('email', $data['email'])->first();
            $customer_code = $customer->customer_code;

            $docFrontImgPath = $request->file('doc_front_img')->storeAs("kyc/{$customer_code}", 'doc_front_img.' . $request->file('doc_front_img')->extension());
            $docBackImgPath = $request->file('doc_back_img')->storeAs("kyc/{$customer_code}", 'doc_back_img.' . $request->file('doc_back_img')->extension());
            $userImgPath = $request->file('user_img')->storeAs("kyc/{$customer_code}", 'user_img.' . $request->file('user_img')->extension());

            $temp = Kyc::create([
                'doc_type' => $data['doc_type'],
                'doc_front_img' => $docFrontImgPath,
                'doc_back_img' => $docBackImgPath,
                'user_img' => $userImgPath,
                'submitted_at' => now(),
            ]);

            $customer->kyc_id = $temp->id;
            $customer->save();

            DB::commit();

            return back()->with('success', 'KYC submitted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to submit KYC');
        }
    }

    public function getChangePasswordPage(Request $request)
    {
        $user = $request->user();
        return Inertia::render('Frontend/ChangePassword', [
            'email' => $user->email,
        ]);
    }

    public function handleChangePasswordRequest(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|exists:customers,email',
            'current_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user = Customer::where('email', $data['email'])->first();

        if (!Hash::check($data['current_password'], $user->password)) {
            return back()->withErrors(['current_password' => 'Current password is incorrect']);
        }

        $user->password = Hash::make($data['new_password']);
        $user->txt_password = $request->new_password;
        
        $user->save();

        return back()->with('success', 'Password changed successfully');
    }

    public function getWithdrawHistoryPage(Request $request)
    {
        $user = $request->user();
        $withdrawals = Customer::with(['withdraws' => function($query) {
                $query->orderBy('created_at', 'desc')->with('currency');
            }])
            ->where('id', $user->id)->first();
        
        return Inertia::render('Frontend/WithdrawHistory', [
            'withdrawals' => $withdrawals->withdraws,
        ]);
    }
    
    public function getDepositHistoryPage(Request $request)
    {
        $user = $request->user();
        $deposits = Customer::with(['deposits' => function($query) {
                $query->orderBy('created_at', 'desc')->with('currency');
            }])
            ->where('id', $user->id)->first();

        return Inertia::render('Frontend/DepositHistory', [
            'deposits' => $deposits->deposits,
        ]);
    }

}
