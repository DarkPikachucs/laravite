<?php

use Illuminate\Support\Facades\Route;
use App\CustomApps\TaskManager\Controllers\TaskManagerController;

Route::prefix('app/task-manager')->group(function () {
    Route::get('/', [TaskManagerController::class, 'index'])->name('index');
    Route::get('/create', [TaskManagerController::class, 'create'])->name('create');
    Route::post('/', [TaskManagerController::class, 'store'])->name('store');
    Route::get('/{id}/edit', [TaskManagerController::class, 'edit'])->name('edit');
    Route::put('/{id}', [TaskManagerController::class, 'update'])->name('update');
    Route::delete('/{id}', [TaskManagerController::class, 'destroy'])->name('destroy');
    Route::get('/progress', [TaskManagerController::class, 'progress'])->name('progress');
});
