<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Currency;
use Throwable;
use Log;

class CurrencyController extends Controller
{
    public function getCurrenciesPage(Request $request)
    {
        $currencies = Currency::query();
        $search = false;

        if($request->has('search') && $request->search != ''){
            $search = true;
            $currencies->where('name', 'like', '%'.$request->search.'%')
            ->orWhere('symbol', 'like', '%'.$request->search.'%');
        }

        $currencies = $currencies->latest()->get();
        return Inertia::render('Admin/Currency/Index', [
            'currencies' => $currencies,
            'search' => $search,
        ]);
    }

    public function getUpdatePage($id)
    {
        $currency = Currency::find($id);
        if(!$currency){
            return back()->with('error', 'Currency not found');
        }
        return Inertia::render('Admin/Currency/Update', [
            'currency' => $currency
        ]);
    }

    public function updateCurrency(Request $request, $id)
    {
        $request->validate([
            'rate_per_usdt' => 'required|numeric',
        ]);

        try{
            $currency = Currency::find($id);

            if(!$currency){
                return back()->with('error', 'Currency not found');
            }

            if($currency->rate_per_usdt == $request->rate_per_usdt){
                return back()->with('error', 'Currency rate is the same');
            }

            $currency->rate_per_usdt = $request->rate_per_usdt;
            $currency->save();

            return back()->with('success', 'Currency updated successfully');
        } catch (Throwable $e) {
            Log::error('CurrencyController@updateCurrency: '.$e->getMessage());
            return back()->with('error', 'Something went wrong');
        }
    }

    public function deleteCurrency(Request $request)
    {

        if(!$request->has('id') || $request->id === null)
        {
            return back()->with('error', 'Id is required !');
        }

        try{
            $currency = Currency::find($request->id);
            if($currency){
                $currency->delete();
                return back()->with('success', 'Currency deleted successfully');
            }
            else{
                return back()->with('error', 'Currency not found');
            }
        } catch (Throwable $e) {
            Log::error('CurrencyController@deleteCurrency: '.$e->getMessage());
            return back()->with('error', 'Cannot Delete Currency, It is in use');
        }

    }

    public function getCreateCurrencyPage()
    {
        return Inertia::render('Admin/Currency/Create');
    }

    public function storeCurrency(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'symbol' => 'required|string|max:255|unique:currencies',
            'rate_per_usdt' => 'required|numeric',
        ]);

        try{
            $currency = new Currency();
            $currency->name = $request->name;
            $currency->symbol = $request->symbol;
            $currency->rate_per_usdt = $request->rate_per_usdt;
            $currency->save();

            return back()->with('success', 'Currency created successfully');

        } catch (Throwable $e) {
            Log::error('CurrencyController@storeCurrency: '.$e->getMessage());
            return back()->with('error', 'Something went wrong');
        }
    }

    public function getUpdateCurrencyPage($id)
    {
        $currency = Currency::find($id);

        if(!$currency){
            return back()->with('error', 'Currency not found');
        }
        return Inertia::render('Admin/Currency/Update', [
            'currency' => $currency
        ]);
    }

    
}
