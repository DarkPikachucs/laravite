<?php

use Illuminate\Support\Facades\Route;
use App\CustomApps\Plan14\Controllers\Plan14Controller;

Route::prefix('app/plan14')->group(function () {
    Route::get('/', [Plan14Controller::class, 'index'])->name('index');

    Route::get('/api/data', [Plan14Controller::class, 'getData'])->name('api.get');
    Route::post('/api/data', [Plan14Controller::class, 'saveData'])->name('api.save');
    Route::post('/api/sync', [Plan14Controller::class, 'sync'])->name('api.sync');
    Route::get('/api/heartbeat', [Plan14Controller::class, 'heartbeat'])->name('api.heartbeat');
});
