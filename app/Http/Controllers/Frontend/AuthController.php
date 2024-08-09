<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Inertia\Inertia;
use App\Models\CountryCode;
use App\Models\Currency;
use App\Models\ActivityLog;

use Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function showRegisterForm()
    {
        return Inertia::render('Frontend/Auth/Register', [
        'countryCodes' => CountryCode::all(),
        'currencies' => Currency::all(),
        ]);
    }

    public function showLoginForm()
    {
        return Inertia::render('Frontend/Auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            // Authentication passed
            $output = fetchPublicIP();
            $output['activity'] = 'Login';
            ActivityLog::create($output);
            return redirect()->route('frontend.dashboard');
        }

        // Authentication failed
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers',
            'password' => 'required|string|min:8|confirmed',
            'country_code_id' => 'required|exists:country_codes,id',
            'contact_no' => 'required|string|max:20',
            'currency_id' => 'required|exists:currencies,id',
        ]);

        $customer = Customer::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'txt_password' => $request->password,
            'country_code_id' => $request->country_code_id,
            'contact_no' => $request->contact_no,
            'currency_id' => $request->currency_id,
            'credit_score' => 100,
        ]);

        $credentials = [
            'email' => $customer->email,
            'password' => $customer->txt_password
        ];

        if(Auth::attempt($credentials))
        {
            return redirect()->route('frontend.dashboard');
        }

        return redirect()->route('app.login');

    }

    public function logout(Request $request)
    {
        $output = fetchPublicIP();
        $output['activity'] = 'Logout';
        ActivityLog::create($output);
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('app.login')
            ->with('success', 'Logout Successful');
    }
}