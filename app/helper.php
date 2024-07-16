<?php

use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

function getCurrentPrice($trade)
{
    if ($trade->is_crypto) {
        $price = json_decode(file_get_contents(route('binance_ticker', ['symbol' => $trade->symbol])))->price;
        return $price;
    } else {
        $client = new Client();
        $response = $client->get('https://api-v2.capex.com/quotesv2?key=1&q=' . $trade->symbol);
        $share_datas = json_decode($response->getBody()->getContents(), true);
        $price = $share_datas[$trade->symbol]['price'];
        return $price;
    }
}

function settleTrade($trade, $current_price)
{
    // Determine trade outcome and calculate PNL
    if ($trade->type === 'long') {
        $trade->outcome = ($current_price > $trade->entry_price) ? 'positive' : 'negative';
        $trade->pnl = ($trade->outcome === 'positive') ? ($trade->amount * 0.8) : $trade->amount;
    } elseif ($trade->type === 'short') {
        $trade->outcome = ($current_price > $trade->entry_price) ? 'negative' : 'positive';
        $trade->pnl = ($trade->outcome === 'positive') ? ($trade->amount * 0.8) : $trade->amount;
    }

    DB::table('positions')->where('id', $trade->id)->update([
        'trade_close_price' => $current_price,
        'status' => 'Settled',
        'closed_at' => now(),
        'is_active' => false,
        'outcome' => $trade->outcome,
        'pnl' => $trade->pnl,
    ]);

    if ($trade->outcome === 'positive') {
        $customer = DB::table('customers')->where('id', $trade->traded_by)->first();
        DB::table('customers')->where('id', $customer->id)->update([
            'balance_usdt' => $customer->balance_usdt + $trade->amount + $trade->pnl,
        ]);
    }
}

function updateOngoingTrade($trade, $current_price)
{
    // Update ongoing trade status
    if ($trade->type === 'long') {
        $trade->outcome = ($current_price > $trade->entry_price) ? 'positive' : 'negative';
        $trade->pnl = ($trade->outcome === 'positive') ? ($trade->amount * 0.8) : $trade->amount;
    } elseif ($trade->type === 'short') {
        $trade->outcome = ($current_price > $trade->entry_price) ? 'negative' : 'positive';
        $trade->pnl = ($trade->outcome === 'positive') ? ($trade->amount * 0.8) : $trade->amount;
    }

    // Update trade status
    DB::table('positions')->where('id', $trade->id)->update([
        'outcome' => $trade->outcome,
        'pnl' => $trade->pnl,
    ]);
}


if (!function_exists('fetchPublicIP')) {
    function fetchPublicIP()
    {
        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'http://ifconfig.me/ip');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $ip = curl_exec($ch);
            curl_close($ch);
            $final_ip = trim($ip);
        } catch (\Exception $e) {
            $final_ip = $_SERVER['REMOTE_ADDR'];
        }
        

        
        $city = 'NA';
        if ($final_ip) {
            try {

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, 'https://ipinfo.io/' . $final_ip . '?dataset=whois');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $ip = curl_exec($ch);
            curl_close($ch);
            $ipData = json_decode($ip, true);
            $city = $ipData['city'] . ' | ' . $ipData['country'] ?? 'NA';
        } catch (\Exception $e) {
            $city = 'NA';
        }
        }


        return [
            'ip' => $final_ip . ' | ' . $city,
            'user_agent' => $_SERVER['HTTP_USER_AGENT']
        ];
    }
}
