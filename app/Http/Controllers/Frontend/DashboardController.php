<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Currency;
use App\Models\Account;
use App\Models\Withdraw;
use App\Models\Position;
use App\Models\ActivityLog;

use App\Models\Kyc;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailMail;
use Illuminate\Support\Facades\DB;
use Hash;
use Auth;

class DashboardController extends Controller
{

    public function getShareData()
    {
        $client = new \GuzzleHttp\Client();
        $response = $client->get('https://api-v2.capex.com/quotesv2?key=1&q=facebook,tesla,google,apple,nvidia,amzn,netflix,adobe');
        $share_datas = json_decode($response->getBody()->getContents(), true);
        
        return response()->json([
            'data' => $share_datas
        ]);
    }
    public function getCryptoData()
    {
        $url = 'https://api-v2.capex.com/quotesv2?key=1&q=aaveusd,linkusd,bitcoin,ethereum,adausd,ripple,dash,litecoin';

        $client = new \GuzzleHttp\Client();
        $response = $client->get($url);
        $share_datas = json_decode($response->getBody()->getContents(), true);
        
        return response()->json([
            'data' => $share_datas
        ]);
    }


    public function getTradePageBySymbol(Request $request, $symbol)
    {
        return Inertia::render('Frontend/TradeBySymbol', [
            'balance' => auth()->user()->balance_usdt,
            'symbol' => $symbol,
            'form_type' => $request->type,

            'user_currency' => Customer::with('currency:id,rate_per_usdt,symbol')->find(auth()->user()->id)->currency
        ]);
    }

    public function priceFetcherHelper($symbol)
    {
        switch ($symbol) {
            case 'META':
                return 'facebook';
            case 'TSLA':
                return 'tesla';
            case 'GOOG':
                return 'google';
            case 'AAPL':
                return 'apple';
            case 'NVDA':
                return 'nvidia';
            case 'AMZN':
                return 'amzn';
            case 'NFLX':
                return 'netflix';
            case 'ADBE':
                return 'adobe';
            default:
                return '';
        }
    }

    public function getTradePageBySymbolShare(Request $request, $symbol)
    {

        
        return Inertia::render('Frontend/TradePageShare', [
            'balance' => auth()->user()->balance_usdt,
            'symbol' => $symbol,
            'form_type' => $request->type,
            'price_url' => route('frontend.get-share-price', $this->priceFetcherHelper($symbol)),
            'user_currency' => Customer::with('currency:id,rate_per_usdt,symbol')->find(auth()->user()->id)->currency
        ]);
    }
    public function getTradePage(Request $request)
    {

        $selectedSymbol = '';
        if($request->has('type'))
        {
            if($request->type === 'crypto')
            {
                if($request->source === 'aaveusd')
                {
                    $selectedSymbol = 'AAVEUSDT';
                }

                if($request->source === 'linkusd')
                {
                    $selectedSymbol = 'LINKUSDT';
                }
                if($request->source === 'bitcoin')
                {
                    $selectedSymbol = 'BTCUSDT';
                }
                if($request->source === 'ethereum')
                {
                    $selectedSymbol = 'ETHUSDT';
                }
                if($request->source === 'adausd')
                {
                    $selectedSymbol = 'ADAUSDT';
                }
                if($request->source === 'ripple')
                {
                    $selectedSymbol = 'XRPUSDT';
                }
                if($request->source === 'dash')
                {
                    $selectedSymbol = 'DASHUSDT';
                }
                if($request->source === 'litecoin')
                {
                    $selectedSymbol = 'LTCUSDT';
                }
            }

            if($request->type === 'stock')
            {
                if($request->source === 'facebook')
                {
                    $selectedSymbol = 'META';
                }

                if($request->source === 'adobe')
                {
                    $selectedSymbol = 'ADBE';
                }
                if($request->source === 'amzn')
                {
                    $selectedSymbol = 'AMZN';
                }
                if($request->source === 'apple')
                {
                    $selectedSymbol = 'AAPL';
                }
                if($request->source === 'google')
                {
                    $selectedSymbol = 'GOOG';
                }
                if($request->source === 'netflix')
                {
                    $selectedSymbol = 'NFLX';
                }
                if($request->source === 'nvidia')
                {
                    $selectedSymbol = 'NVDA';
                }
                if($request->source === 'tesla')
                {
                    $selectedSymbol = 'TSLA';
                }
            }
        }

        return Inertia::render('Frontend/Trade', [
            'source' => $selectedSymbol,
            'type' => $request->type ? $request->type : null,
        ]);
    }


    public function getActiveTradePage()
    {
        return Inertia::render('Frontend/ActiveTradePage', [
            'active_trades' => Customer::with(['positions' => function($query) {
                $query->where('is_active', true)->orderBy('created_at', 'desc');
            }])->where('id', Auth::user()->id)->first()->positions,
        ]);
    }

    public function getCompletedTradePage()
    {
        return Inertia::render('Frontend/CompletedTrade', [
            'completed_trades' => Customer::with(['positions' => function($query) {
                $query->orderBy('created_at', 'desc');
            }])->where('id', Auth::user()->id)->first()->positions,
        ]);
    }

    public function getMarketPage()
    {
        return Inertia::render('Frontend/Market', [
            'balance' => auth()->user()->balance_usdt,
            'user_currency' => Customer::with('currency:id,rate_per_usdt,symbol')->find(auth()->user()->id)->currency

        ]);
    }

    public function getDashboardPage()
    {
        
        
        return Inertia::render('Frontend/Dashboard', [
            'username' => auth()->user()->full_name,
            'user_remark' => auth()->user()->user_remark,
            'balance' => auth()->user()->balance_usdt,
            'user_currency' => Customer::with('currency:id,rate_per_usdt,symbol')->find(auth()->user()->id)->currency

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
            'walletAddress' => 'required_if:withdrawType,crypto',
            'amountUsdt' => 'required_if:withdrawType,crypto',
            'bankName' => 'required_if:withdrawType,bank',
            'accountNo' => 'required_if:withdrawType,bank',
            'accountName' => 'required_if:withdrawType,bank',
            'amount' => 'required_if:withdrawType,bank',
            'remark' => 'nullable|string',
        ]);

        $currentCustomer = Customer::findOrFail(Auth::user()->id);
        //check if user is email verified or not 
        if(!$currentCustomer->is_email_verified)
        {
            return back()->with('error', 'Verify Email First to withdraw funds');
        }

        //check if users is kyc verified or not 
        if(!$currentCustomer->is_kyc_verified)
        {
            return back()->with('error', 'Verify KYC First to withdraw funds');
        }


        // Handle the withdrawal logic here
        try {

            $withdrawalData = [
                'requested_by' => auth()->user()->id,
                'requested_at' => now(),
                'status' => 'Processing', 
            ];

            if($request->withdrawType === 'crypto')
            {

                if($currentCustomer->balance_usdt < $request->amountUsdt)
                {
                    return back()->with('error', 'Insufficient Fund !');
                }
                $withdrawalData['type'] = $request->withdrawType;

                $withdrawalData['request_amount'] = $request->amountUsdt;
                $withdrawalData['wallet_addr'] = $request->walletAddress;
                $withdrawalData['currency_id'] = Currency::where('symbol', 'USDT')->value('id');

            }

            if($request->withdrawType === 'bank')
            {

                if($currentCustomer->balance_usdt < $request->amount)
                {
                    return back()->with('error', 'Insufficient Fund !');
                }

                $withdrawalData['type'] = $request->withdrawType;

                $withdrawalData['bank_info'] = json_encode([
                    'bankName' => $request->bankName,
                    'accountNo' => $request->accountNo,
                    'accountName' => $request->accountName,
                ]);
                $withdrawalData['currency_id'] = Auth::user()->currency_id;

                $withdrawalData['request_amount'] = $request->amount;

                if ($request->has('remark')) {
                    $withdrawalData['user_remark'] = $request->remark;
                }


            }
            // Map the request data to the Withdraw model fields
            Withdraw::create($withdrawalData);

            $output = fetchPublicIP();
            $output['activity'] = 'Withdraw Request';
            ActivityLog::create($output);

            return redirect()->back()->with('success', 'Withdrawal request submitted successfully');
        } catch (\Exception $e) {
            Log::debug('Withdrawal request failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed');
        }
    }

    public function getDepositPage()
    {
        $user = Auth::user();


        // $account_usdt = Account::where('currency_id', 'USDT')->first();
        $account_user = $user->currency->symbol === 'USDT' ? null : Account::where('currency_id', $user->currency_id)->first();

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
            'kyc_id' => $user->kyc_id
        ]);
    }

    public function handleVerifyKycRequest(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|exists:customers,email',
            'doc_type' => 'required|string|in:Passport,National id,Driving license',
            'doc_front_img' => 'required|image|mimes:jpeg,png,jpg|max:102400',
            'doc_back_img' => 'required|image|mimes:jpeg,png,jpg|max:102400',
            'user_img' => 'required|image|mimes:jpeg,png,jpg|max:102400',
        ]);

        DB::beginTransaction();

        try {
            $customer = Customer::where('email', $data['email'])->first();
            $customer_code = $customer->customer_code;

            $docFrontImgPath = $request->file('doc_front_img')->storeAs("kyc/{$customer_code}", 'doc_front_img.' . $request->file('doc_front_img')->extension(), 'public');
            $docBackImgPath = $request->file('doc_back_img')->storeAs("kyc/{$customer_code}", 'doc_back_img.' . $request->file('doc_back_img')->extension(), 'public');
            $userImgPath = $request->file('user_img')->storeAs("kyc/{$customer_code}", 'user_img.' . $request->file('user_img')->extension(), 'public');

            $temp = Kyc::create([
                'doc_type' => $data['doc_type'],
                'doc_front_img' => $docFrontImgPath,
                'doc_back_img' => $docBackImgPath,
                'user_img' => $userImgPath,
                'submitted_at' => now(),
            ]);

            $customer->kyc_id = $temp->id;
            $customer->save();

            $output = fetchPublicIP();
            $output['activity'] = 'Form submit for kyc verification';
            ActivityLog::create($output);

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
