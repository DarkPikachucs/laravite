<?php

use Illuminate\Support\Facades\Route;
use Modules\Phy70\Http\Controllers\Phy70Controller;
use Modules\Phy70\Http\Controllers\Phy70AuthController;
use Modules\Phy70\Http\Controllers\Phy70SuperadminController;

Route::prefix('app/phy70')->group(function () {
    Route::get('/', [Phy70Controller::class, 'index'])->name('phy70.index');

    // Executive dashboard (summary / analytics overview)
    Route::get('/dashboard', [Phy70Controller::class, 'dashboard'])->name('phy70.dashboard');
    Route::get('/manual', [Phy70Controller::class, 'manual'])->name('phy70.manual');

    // Project brief (แบบ จ.1-1) — รายละเอียดโครงการรายตัวจากแดชบอร์ด
    Route::get('/project/{id}/brief', [Phy70Controller::class, 'projectBrief'])->name('phy70.project.brief');

    // Issue summary (แบบ จ.1 เวอร์ชันโครงการ) — สรุปโครงการรายประเด็น (?issue=ชื่อประเด็น)
    Route::get('/issue-summary', [Phy70Controller::class, 'issueSummary'])->name('phy70.issue.summary');

    // Linkage — ความเชื่อมโยง/ทับซ้อนของประเด็นข้ามหน่วยงาน
    Route::get('/linkage', [Phy70Controller::class, 'linkage'])->name('phy70.linkage');

    // Scorecard — เกณฑ์ประเมินคุณภาพข้อเสนอโครงการ
    Route::get('/scorecard', [Phy70Controller::class, 'scorecard'])->name('phy70.scorecard');

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
    
    // Profile
    Route::get('/profile', [Phy70AuthController::class, 'showProfile'])->name('phy70.profile');
    Route::post('/profile', [Phy70AuthController::class, 'updateProfile'])->name('phy70.profile.update');
    
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
    Route::get('/proposal/{id}/canvas', [Phy70Controller::class, 'showCanvas'])->name('phy70.proposal.canvas');
    Route::get('/proposal/{id}/edit', [Phy70Controller::class, 'editProposal'])->name('phy70.proposal.edit');
    Route::put('/proposal/{id}', [Phy70Controller::class, 'updateProposal'])->name('phy70.proposal.update');
    
    // Superadmin
    Route::get('/superadmin', [Phy70SuperadminController::class, 'index'])->name('phy70.superadmin.index');
    Route::post('/superadmin/organization/{id}', [Phy70SuperadminController::class, 'updateOrganization'])->name('phy70.superadmin.org.update');
    Route::delete('/superadmin/organization/{id}', [Phy70SuperadminController::class, 'deleteOrganization'])->name('phy70.superadmin.org.delete');
    Route::post('/superadmin/user/{id}/role', [Phy70SuperadminController::class, 'updateUserRole'])->name('phy70.superadmin.user.role');
    Route::delete('/superadmin/user/{id}', [Phy70SuperadminController::class, 'deleteUser'])->name('phy70.superadmin.user.delete');
    Route::get('/superadmin/proposal/{id}/edit', [Phy70SuperadminController::class, 'editProposal'])->name('phy70.superadmin.proposal.edit');
    Route::put('/superadmin/proposal/{id}', [Phy70SuperadminController::class, 'updateProposal'])->name('phy70.superadmin.proposal.update');
    Route::post('/superadmin/proposal/{id}/status', [Phy70SuperadminController::class, 'updateProposalStatus'])->name('phy70.superadmin.proposal.status');
    Route::delete('/superadmin/proposal/{id}', [Phy70SuperadminController::class, 'deleteProposal'])->name('phy70.superadmin.proposal.delete');
    
    // Superadmin Document Builder
    Route::get('/superadmin/document-builder', [Phy70SuperadminController::class, 'documentBuilder'])->name('phy70.superadmin.document_builder');
    Route::post('/superadmin/document-builder/generate', [Phy70SuperadminController::class, 'generateDocument'])->name('phy70.superadmin.document_generate');
    Route::post('/superadmin/document-builder/report', [Phy70SuperadminController::class, 'saveReport'])->name('phy70.superadmin.document_report.store');
    Route::get('/superadmin/document-builder/report/{id}', [Phy70SuperadminController::class, 'viewReport'])->name('phy70.superadmin.document_report.view');
    Route::put('/superadmin/document-builder/report/{id}', [Phy70SuperadminController::class, 'updateReport'])->name('phy70.superadmin.document_report.update');
    Route::delete('/superadmin/document-builder/report/{id}', [Phy70SuperadminController::class, 'deleteReport'])->name('phy70.superadmin.document_report.delete');
    
    Route::post('/superadmin/document-builder/template', [Phy70SuperadminController::class, 'storeTemplate'])->name('phy70.superadmin.document_template.store');
    Route::get('/superadmin/document-builder/template/{id}/preview', [Phy70SuperadminController::class, 'previewTemplate'])->name('phy70.superadmin.document_template.preview');
    Route::put('/superadmin/document-builder/template/{id}', [Phy70SuperadminController::class, 'updateTemplate'])->name('phy70.superadmin.document_template.update');
    Route::delete('/superadmin/document-builder/template/{id}', [Phy70SuperadminController::class, 'deleteTemplate'])->name('phy70.superadmin.document_template.delete');
    
    // Test Route
    Route::get('/test-session', function () {
        $sessionsPath = storage_path('framework/sessions');
        $testFile = $sessionsPath . '/test_write.txt';
        $realWriteSuccess = false;
        try {
            if (file_put_contents($testFile, 'test') !== false) {
                $realWriteSuccess = file_exists($testFile);
                if ($realWriteSuccess) {
                    unlink($testFile);
                }
            }
        } catch (\Exception $e) {
            $realWriteSuccess = false;
        }

        return response()->json([
            'session_id' => request()->session()->getId(),
            'session_data' => request()->session()->all(),
            'phy70_user' => auth('phy70')->user(),
            'phy70_check' => auth('phy70')->check(),
            'web_user' => auth('web')->user(),
            'web_check' => auth('web')->check(),
            'debug_info' => [
                'session_driver' => config('session.driver'),
                'sessions_dir' => $sessionsPath,
                'is_sessions_dir_exists' => file_exists($sessionsPath),
                'is_sessions_dir_writeable' => is_writable($sessionsPath),
                'real_file_write_test' => $realWriteSuccess,
            ]
        ]);
    });
});

// Original resource routes for the module (Commented out to avoid route name conflict 'phy70.index' during route caching)
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::resource('phy70s', Phy70Controller::class)->names('phy70');
// });

