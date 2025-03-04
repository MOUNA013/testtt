<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\PartnerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;



// Connexion et déconnexion
Route::get('/connexion', [AuthController::class, 'getLogin'])->name('login.form');
Route::post('/connexion', [AuthController::class, 'postLogin'])->name('login');
Route::get('/deconnexion', function (Request $request) {
    $request->session()->flush();
    return redirect()->route('login.form');
})->name('logout');

// Page d'accueil redirigeant vers la page de connexion
Route::get('/', function () {
    return Redirect::route('login.form');
});

// Routes de paiement
Route::get('payment', [FactureController::class, 'payments'])->name('payment');
Route::get('payment/{payment}/validate', [FactureController::class, 'ValidatePayment'])->name('payment.validate');

// Routes des factures
Route::prefix('factures')->group(function () {
    Route::get('/', [FactureController::class, 'index'])->name('factures.index');
    Route::get('/generate/{paymentId}', [FactureController::class, 'generatePaymentFacture'])->name('factures.generate');

    Route::get('/print', [FactureController::class, 'print'])->name('facture.print');
    Route::get('/status', [FactureController::class, 'getStatus'])->name('factures.status');
    Route::get('/check-num', [FactureController::class, 'checkNumExistence'])->name('factures.check-num');
    
    Route::patch('/{id}/categories', [FactureController::class, 'updateCategory'])->name('factures.updateCategory');
    Route::patch('/{id}/reset', [FactureController::class, 'reset'])->name('factures.reset');
    Route::patch('/', [FactureController::class, 'update'])->name('factures.update');
    
    Route::delete('{id}', [FactureController::class, 'deleteFacture'])->name('factures.delete');
    Route::resource( 'partners', PartnerController::class);
});
