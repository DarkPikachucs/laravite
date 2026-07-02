<?php

use Illuminate\Support\Facades\Route;
use Modules\Phy70\Http\Controllers\Phy70Controller;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('phy70s', Phy70Controller::class)->names('phy70');
});
