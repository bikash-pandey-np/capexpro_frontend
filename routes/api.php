<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [ApiController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/customers', [ApiController::class, 'listCustomers']);

    Route::get('/customer-by-email', [ApiController::class, 'getCustomerByEmail']);

    Route::get('/update-customer-by-email', [ApiController::class, 'updateCustomerByEmail']);

    Route::get('/get-balance-info', [ApiController::class, 'getCustomerBalanceByEmail']);


    Route::get('/get-accounts', [ApiController::class, 'getAllAccounts']);

    Route::get('/get-account-detail-by-id', [ApiController::class, 'getAccountDetailById']);

    Route::get('/update-account-detail-by-id', [ApiController::class, 'updateAccountDetailById']);

    Route::get('/create-new-account', [ApiController::class, 'addAccountDetail']);

    Route::get('/delete-account', [ApiController::class, 'deleteAccountById']);

    Route::get('/get-all-currencies', [ApiController::class, 'getAllCurrencies']);

    Route::get('/get-all-deposits', [ApiController::class, 'getAllDeposits']);

    Route::get('/get-all-withdraws', [ApiController::class, 'getAllWithdraws']);

    Route::get('/get-withdraws-by-email', [ApiController::class, 'getWithdrawsByEmail']);

    Route::get('/approve-withdraw-by-transaction-id', [ApiController::class, 'approveWithdraw']);

    Route::get('/reject-withdraw-by-transaction-id', [ApiController::class, 'rejectWithdraw']);

});