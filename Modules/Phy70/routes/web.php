<?php

use Illuminate\Support\Facades\Route;
use Modules\Phy70\Http\Controllers\Phy70Controller;
use Modules\Phy70\Http\Controllers\Phy70AuthController;

Route::prefix('app/phy70')->group(function () {
    Route::get('/', [Phy70Controller::class, 'index'])->name('phy70.index');
    
    // Authentication
    Route::get('/login', [Phy70AuthController::class, 'showLogin'])->name('phy70.login');
    Route::post('/login', [Phy70AuthController::class, 'login']);
    Route::post('/logout', [Phy70AuthController::class, 'logout'])->name('phy70.logout');
    Route::get('/register', [Phy70AuthController::class, 'showRegister'])->name('phy70.register');
    Route::post('/register', [Phy70AuthController::class, 'register']);
    
    // User management (Org Admin)
    Route::get('/users', [Phy70AuthController::class, 'manageUsers'])->name('phy70.users');
    Route::post('/users/invite', [Phy70AuthController::class, 'inviteUser'])->name('phy70.users.invite');
    Route::post('/users/{id}/reset-password', [Phy70AuthController::class, 'resetPassword'])->name('phy70.users.reset-password');
    
    // Accept invitation
    Route::get('/invite/{token}', [Phy70AuthController::class, 'showInviteAccept'])->name('phy70.invite.accept');
    Route::post('/invite/{token}', [Phy70AuthController::class, 'acceptInvite']);
    
    // Google Login
    Route::get('/auth/google', [Phy70AuthController::class, 'redirectToGoogle'])->name('phy70.google.redirect');
    Route::get('/auth/google/callback', [Phy70AuthController::class, 'handleGoogleCallback'])->name('phy70.google.callback');
    
    // Proposals
    Route::get('/proposal/create', [Phy70Controller::class, 'createProposal'])->name('phy70.proposal.create');
    Route::post('/proposal', [Phy70Controller::class, 'storeProposal'])->name('phy70.proposal.store');
    Route::get('/proposal/{id}', [Phy70Controller::class, 'showProposal'])->name('phy70.proposal.show');
    
    // Test Route
    Route::get('/test-session', function () {
        return response()->json([
            'cookie' => config('session.cookie'),
            'domain' => config('session.domain'),
            'secure' => config('session.secure'),
            'session_id' => request()->session()->getId(),
            'has_session' => request()->hasSession(),
        ]);
    });
});

// Original resource routes for the module
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('phy70s', Phy70Controller::class)->names('phy70');
});
