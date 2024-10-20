<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AccountInfoController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\KycController;
use App\Http\Controllers\Admin\CurrencyController;
use App\Http\Controllers\Admin\PositionController;

Route::domain('admin.thecapex.pro')->group(function () {
    Route::get('/login', [AuthController::class, 'getLoginPage'])
        ->name('admin.login');

    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('admin_only')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'getDashboardPage'])
            ->name('admin.dashboard');

        Route::post('/deposit/{customer_id}', [CustomerController::class, 'deposit'])
            ->name('admin.deposit');

        Route::prefix('account-info')->group(function () {
            Route::get('/', [AccountInfoController::class, 'getAccountInfoPage'])
                ->name('admin.account-info');

            Route::get('/create', [AccountInfoController::class, 'getCreateAccountInfoPage'])
                ->name('admin.account-info.create');

            Route::post('/create', [AccountInfoController::class, 'storeAccountInfo']);

            Route::get('/update/{id}', [AccountInfoController::class, 'getUpdateAccountInfoPage'])
                ->name('admin.account-info.update');

            Route::post('/delete', [AccountInfoController::class, 'deleteAccountInfo'])
                ->name('admin.account-info.delete');

            Route::post('/update/{id}', [AccountInfoController::class, 'updateAccountInfo']);
        });

        Route::prefix('currency')->group(function () {
            Route::get('/', [CurrencyController::class, 'getCurrenciesPage'])
                ->name('admin.currency');

            Route::get('/create', [CurrencyController::class, 'getCreateCurrencyPage'])
                ->name('admin.currency.create');

            Route::get('/update/{id}', [CurrencyController::class, 'getUpdatePage'])
                ->name('admin.currency.update');

            Route::post('/update/{id}', [CurrencyController::class, 'updateCurrency']);

            Route::post('/create', [CurrencyController::class, 'storeCurrency']);

            Route::post('/delete', [CurrencyController::class, 'deleteCurrency'])
                ->name('admin.currency.delete');
        });

        Route::get('/customers', [CustomerController::class, 'getCustomersPage'])
            ->name('admin.customers');

        Route::prefix('customers')->group(function () {
            Route::post('/block', [KycController::class, 'blockCustomer'])
                ->name('admin.customers.block');

            Route::post('/unblock', [KycController::class, 'unblockCustomer'])
                ->name('admin.customers.unblock');
        });

        Route::prefix('kyc')->group(function () {
            Route::get('/', [KycController::class, 'getKycPage'])
                ->name('admin.kyc');

            Route::post('/verify', [KycController::class, 'verifyKyc'])
                ->name('admin.kyc.verify');
        });

        Route::prefix('positions')->group(function () {
            Route::get('/', [PositionController::class, 'index'])
                ->name('admin.positions');

            Route::post('/make-win', [PositionController::class, 'makeWin'])
                ->name('admin.positions.make-win');

            Route::post('/make-lose', [PositionController::class, 'makeLose'])
                ->name('admin.positions.make-lose');
        });
    });
});
