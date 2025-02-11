<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FactureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/connexion', [AuthController::class, 'getLogin'])->name('login');
Route::post('/Login', [AuthController::class, 'postLogin']);

Route::get('/Logout', function (Request $request) {
    $request->session()->flush();
    return redirect('/');
});

Route::get('/', function () {
    return Redirect::route('login');
});

Route::get('payment', [FactureController::class, 'payments'])->name('payment');
Route::get('payment/{payment}/validate', [FactureController::class, 'ValidatePayment'])->name('payment.validate');

Route::prefix('factures')->group(function () {
    Route::get('/', [FactureController::class, 'index'])->name('factures.index');
    Route::get('/generate/{paymentId}', [FactureController::class, 'generatePaymentFacture'])->name('factures.generate');

    Route::get('/print', [FactureController::class, 'print'])->name('facture.print');
    Route::get('/status', [FactureController::class, 'getStatus']);
    Route::get('/check-num', [FactureController::class, 'checkNumExistence']);
    Route::patch('/{id}/categories', [FactureController::class, 'updateCategory']);
    Route::patch('/{id}/reset', [FactureController::class, 'reset'])->name('factures.reset');
    // Route::patch('/{id}/update', [FactureController::class, 'updateIntern']);
    Route::patch('/', [FactureController::class, 'update'])->name('factures.update');
    Route::delete('{id}', [FactureController::class, 'deleteFacture'])->name('factures.delete');
});
