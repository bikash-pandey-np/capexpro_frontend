<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BinanceController extends Controller
{
    public function getPrice(Request $request)
    {
        $symbol = $request->input('symbol');
        $endpoint = "https://api.binance.com/api/v3/ticker/24hr?symbol={$symbol}";

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $endpoint);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        $response = curl_exec($curl);
        $err = curl_errno($curl);

        curl_close($curl);

        if ($err) {
            return response()->json([
                'error' => 'Failed to fetch data from Binance API: ' . curl_strerror($err),
            ], 500);
        } else {
            $data = json_decode($response, true);
            return response()->json($data);
        }
    }
}
