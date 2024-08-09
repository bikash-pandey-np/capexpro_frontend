<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\Customer;
use App\Models\Position;
use App\Models\ActivityLog;

use Illuminate\Support\Facades\DB;

class TradeController extends Controller
{
    public function getSingleSharePrice($symbol)
    {
        $client = new \GuzzleHttp\Client();
        $response = $client->get('https://api-v2.capex.com/quotesv2?key=1&q=' . $symbol);
        $shareDatas = json_decode($response->getBody()->getContents(), true);

        $shareDatas = $shareDatas[$symbol];
        return response()->json([
            'data' => $shareDatas
        ]);
    }

    public function handleTradeRequest(Request $request)
    {
        $data = $request->validate([
            'amount' => 'required|numeric|min:500|gt:0',
            'tradeType' => 'required|in:long,short',
            'symbol' => 'required|string',
            'duration' => 'required|in:3,5,15,30,60',
        ], [
            'amount.required' => 'Enter Trade Amount',
            'amount.numeric' => 'The amount must be a number.',
            'amount.min' => 'The minimum trade amount is 500.',
            'amount.gt' => 'The trade amount must be greater than 0.',
            'tradeType.required' => 'The trade type field is required.',
            'tradeType.in' => 'The selected trade type is invalid.',
            'symbol.required' => 'The symbol field is required.',
            'symbol.string' => 'The symbol must be a string.',
            'duration.required' => 'Select trade duration time',
            'duration.in' => 'The selected duration is invalid.',
        ]);

        // Check if user has balance
        $user = Customer::find(Auth::user()->id);
        if ($user->balance_usdt < $request->amount) {
            return back()->with('error', 'Insufficient Balance');
        }
        //check if user email is verified

        if(! $user->is_email_verified)
        {
            return back()->with('error', 'Verify email before placing trade');
        }

        //is kyc verified
        if(! $user->is_kyc_verified)
        {
            return back()->with('error', 'Verify KYC before placing trade');
        }

        // Assuming you have a Trade model
        try {
            $rawData = [
                'amount' => $request->amount,
                'type' => $request->tradeType,
                'symbol' => $request->symbol,
                'entry_price' => json_decode(file_get_contents(route('binance_ticker', ['symbol' => $request->symbol])))->price,
                'traded_by' => Auth::user()->id,
                'traded_datetime' => now(),
                'trade_duration' => $request->duration,
                'will_close_at' => now()->addMinutes($request->duration),
            ];

            DB::transaction(function () use ($rawData, $user, $request) {
                $temp = Position::create($rawData);

                $output = fetchPublicIP();
                $output['activity'] = 'Trade taken';
                ActivityLog::create($output);

                $user->balance_usdt = $user->balance_usdt - $request->amount;
                $user->traded_amount += $request->amount;
                $user->save();
            });

            return redirect()->route('frontend.active-trade')->with('success', 'Trade Placed Successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Cannot Place Trade ! Contact Admin');
        }
    }

    public function handleTradeRequestShare(Request $request)
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->get('https://api-v2.capex.com/quotesv2?key=1&q=' . $request->symbol);
        $shareDatas = json_decode($response->getBody()->getContents(), true);

        $price = $shareDatas[$request->symbol]['price'];
        $data = $request->validate([
            'amount' => 'required|numeric|min:500|gt:0',
            'tradeType' => 'required|in:long,short',
            'symbol' => 'required|string',
            'duration' => 'required|in:3,5,15,30,60',
        ], [
            'amount.required' => 'Enter Trade Amount',
            'amount.numeric' => 'The amount must be a number.',
            'amount.min' => 'The minimum trade amount is 500.',
            'amount.gt' => 'The trade amount must be greater than 0.',
            'tradeType.required' => 'The trade type field is required.',
            'tradeType.in' => 'The selected trade type is invalid.',
            'symbol.required' => 'The symbol field is required.',
            'symbol.string' => 'The symbol must be a string.',
            'duration.required' => 'Select trade duration time',
            'duration.in' => 'The selected duration is invalid.',
        ]);

        // Check if user has balance
        $user = Customer::find(Auth::user()->id);
        if ($user->balance_usdt < $request->amount) {
            return back()->with('error', 'Insufficient Balance');
        }

           //check if user email is verified

        if(! $user->is_email_verified)
        {
            return back()->with('error', 'Verify email before placing trade');
        }

        //is kyc verified
        if(! $user->is_kyc_verified)
        {
            return back()->with('error', 'Verify KYC before placing trade');
        }


        // Assuming you have a Trade model
        try {
            $rawData = [
                'amount' => $request->amount,
                'type' => $request->tradeType,
                'symbol' => $request->symbol,
                'is_crypto' => false,
                'entry_price' => $price,
                'traded_by' => Auth::user()->id,
                'traded_datetime' => now(),
                'trade_duration' => $request->duration,
                'will_close_at' => now()->addMinutes($request->duration),
            ];

            DB::transaction(function () use ($rawData, $user, $request) {
                $temp = Position::create($rawData);
                $output = fetchPublicIP();
                $output['activity'] = 'Trade taken';
                ActivityLog::create($output);

                $user->balance_usdt = $user->balance_usdt - $request->amount;
                $user->traded_amount += $request->amount;

                $user->save();
            });

            return redirect()->route('frontend.active-trade')->with('success', 'Trade Placed Successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Cannot Place Trade ! Contact Admin');
        }
    }

    public function updateTradeStatus(Request $request)
    {
        // Retrieve the authenticated user's active trades with positions
        $customer = Customer::with(['positions' => function ($query) {
            $query->where('is_active', true)->orderByDesc('created_at');
        }])
        ->findOrFail(Auth::id());

        $activeTrades = $customer->positions;

        return response()->json([
            'active_trades' => $activeTrades
        ]);
    }

  
 
}
