<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; 
use App\Http\Controllers\Frontend\AuthController;
use App\Http\Controllers\Frontend\DashboardController;
use App\Http\Controllers\Frontend\TradeController;
use App\Http\Controllers\Frontend\WebsiteController;
use App\Http\Controllers\BinanceController;


include 'admin.php';

Route::domain('thecapex.pro')->group(function () {
Route::get('/ticker', [BinanceController::class, 'getPrice'])->name('binance_ticker');

Route::get('/', [WebsiteController::class, 'getHomepage'])->name('homepage');
Route::get('/about', [WebsiteController::class, 'getAboutPage'])->name('about_page');
Route::get('/contact', [WebsiteController::class, 'getContactPage'])->name('contact_page');




Route::get('/share-data', [DashboardController::class, 'getShareData'])
    ->name('frontend.share-data');
Route::get('/crypto-data', [DashboardController::class, 'getCryptoData'])
    ->name('frontend.crypto-data');


Route::get('/market', [DashboardController::class, 'getMarketPage'])
    ->name('frontend.market');


Route::get('/dashboard', [DashboardController::class, 'getDashboardPage'])
    ->middleware('only_cust')
    ->name('frontend.dashboard');

Route::prefix('login')->group(function () {
    Route::get('/', [AuthController::class, 'showLoginForm'])->name('app.login');
    Route::post('/', [AuthController::class, 'login']);
});
Route::prefix('register')->group(function () {
    Route::get('/', [AuthController::class, 'showRegisterForm'])->name('app.register');
    Route::post('/', [AuthController::class, 'register']);
});


Route::get('/deposit', [DashboardController::class, 'getDepositPage'])
    ->middleware('only_cust')
    ->name('frontend.deposit');

Route::get('/withdraw', [DashboardController::class, 'getWithdrawPage'])
    ->middleware('only_cust')
    ->name('frontend.withdraw');

Route::post('/withdraw', [DashboardController::class, 'handleWithdrawRequest'])
    ->middleware('only_cust');

Route::get('/profile', [DashboardController::class, 'getProfilePage'])
    ->middleware('only_cust')
    ->name('frontend.profile');

Route::get('/portfolio', [DashboardController::class, 'getPortfolioPage'])
    ->middleware('only_cust')
    ->name('frontend.portfolio');

Route::get('/verify-email', [DashboardController::class, 'getVerifyEmailPage'])
    ->middleware('only_cust')
    ->name('frontend.verify-email');

Route::post('/generate-otp', [DashboardController::class, 'generateOtp'])
    ->middleware('only_cust')
    ->name('frontend.generate-otp');

Route::post('/verify-otp', [DashboardController::class, 'verifyOtp'])
    ->middleware('only_cust')
    ->name('frontend.verify-otp');

Route::get('/verify-kyc', [DashboardController::class, 'getVerifyKycPage'])
    ->middleware('only_cust')
    ->name('frontend.verify-kyc');

Route::post('/verify-kyc', [DashboardController::class, 'handleVerifyKycRequest'])
    ->middleware('only_cust');


Route::get('/change-password', [DashboardController::class, 'getChangePasswordPage'])
    ->middleware('only_cust')
    ->name('frontend.change-password');

Route::post('/change-password', [DashboardController::class, 'handleChangePasswordRequest'])
    ->middleware('only_cust');

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('only_cust')
    ->name('frontend.logout');

Route::get('/withdraw-history', [DashboardController::class, 'getWithdrawHistoryPage'])
    ->middleware('only_cust')
    ->name('frontend.withdraw-history');

Route::get('/deposit-history', [DashboardController::class, 'getDepositHistoryPage'])
    ->middleware('only_cust')
    ->name('frontend.deposit-history');

Route::get('/trade', [DashboardController::class, 'getTradePage'])
    ->middleware('only_cust')
    ->name('frontend.trade');


Route::get('/trade/crypto/{symbol}', [DashboardController::class, 'getTradePageBySymbol'])
    ->middleware('only_cust')
    ->name('frontend.trade-by-symbol_crypto');


Route::get('/trade/shares/{symbol}', [DashboardController::class, 'getTradePageBySymbolShare'])
    ->middleware('only_cust')
    ->name('frontend.trade-by-symbol');


Route::post('/trade/crypto', [TradeController::class, 'handleTradeRequest'])
    ->middleware('only_cust')
    ->name('frontend.crypto.trade');

    Route::post('/trade/stock', [TradeController::class, 'handleTradeRequestShare'])
    ->middleware('only_cust')
    ->name('frontend.stock.trade');

    Route::get('/get-share-price/{symbol}', [TradeController::class, 'getSingleSharePrice'])
        ->middleware('only_cust')
        ->name('frontend.get-share-price');

        Route::get('/active-trade', [DashboardController::class, 'getActiveTradePage'])
            ->middleware('only_cust')
            ->name('frontend.active-trade');

            Route::post('/update-trade-status', [TradeController::class, 'updateTradeStatus'])
                ->middleware('only_cust')
                ->name('frontend.update-trade-status');

                Route::get('/trade-history', [DashboardController::class, 'getCompletedTradePage'])
                    ->middleware('only_cust')
                    ->name('frontend.trade-history');


});