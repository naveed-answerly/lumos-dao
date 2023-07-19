<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\DaoController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AppController::class, 'home'])->name('home');
Route::prefix('dao')->name('dao')->group(function () {
    Route::get('/', [DaoController::class, 'index'])->name('');
    Route::get('create', [DaoController::class, 'create'])->name('.create');
    Route::get('search', [DaoController::class, 'search'])->name('.search');
    Route::post('store', [DaoController::class, 'store'])->name('.store');
});
Route::prefix('proposal')->name('proposal')->group(function () {
    Route::get('/', [ProposalController::class, 'index'])->name('');
    Route::get('create', [ProposalController::class, 'create'])->name('.create');
    Route::post('store', [ProposalController::class, 'store'])->name('.store');
});
Route::get('/.well-known/stellar.toml', function () {
    return view('stellar');
});

// temporary
Route::get('explore', [AppController::class, 'home'])->name('explore');


// Already
Route::get('/stakers', [AppController::class, 'stakers'])->name('stakers');
// Route::post('/contact', [AppController::class, 'contact'])->name('contact');
// Route::get('/invest', [AppController::class, 'invest'])->name('invest');
Route::post('/wallet/store', [WalletController::class, 'store'])->name('wallet.store');
Route::post('/wallet/secret', [WalletController::class, 'secret'])->name('wallet.secret');
Route::get('/wallet/disconnect', [WalletController::class, 'disconnect'])->name('wallet.disconnect');

Route::post('/wallet/invest', [WalletController::class, 'invest'])->name('wallet.invest');
Route::post('/wallet/submitXdr', [WalletController::class, 'submitXdr'])->name('wallet.submitXdr');
// Already


// Should be last route in current prefix group
Route::get('/{page}', [PageController::class, 'show'])->name('page');
