<?php

use Illuminate\Support\Facades\Route;
use App\CustomApps\DataReport\Controllers\DataReportController;

Route::prefix('app/data-report')->group(function () {
    Route::get('/', [DataReportController::class, 'index'])->name('index');
    Route::post('/generate', [DataReportController::class, 'generate'])->name('generate');
    Route::get('/export', [DataReportController::class, 'export'])->name('export');
    Route::get('/history', [DataReportController::class, 'history'])->name('history');
});
