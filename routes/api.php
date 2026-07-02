<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\GvhController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\SwotController;
use App\Http\Controllers\RegistrationSettingController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\FormAccessController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use Faker\Guesser\Name;

Route::post('/register', [RegisterController::class, 'register']);

Route::post('/login', [AuthController::class, 'auth']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Google OAuth Routes
Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/project/budget/{year}', [ProjectController::class, 'getProjectBudget']);
Route::get('/projects', [ProjectController::class, 'getProjects']);
Route::get('/projects/{year}', [ProjectController::class, 'getProjectsYear']);
Route::get('/projects/{year}/{uuid}', [ProjectController::class, 'getProjectByUuid']);
Route::get('/budgets', [BudgetController::class, 'getBudgets']);

Route::get('/strategic-dashboard', [ProjectController::class, 'getStrategicDashboard']);
Route::get('/strategic-projects', [ProjectController::class, 'getStrategicProjects']);

Route::apiResource('gvhs', GvhController::class);
Route::get('/gvhs/score/{uuid}', [GvhController::class, 'score']);

Route::apiResource('swots', SwotController::class);
Route::post('/swots/{swot}', [SwotController::class, 'edit'])->name('swots.detail');

// Registration Settings Routes
Route::get('/registration/status', [RegistrationSettingController::class, 'status']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/registration/settings', [RegistrationSettingController::class, 'index']);
    Route::put('/registration/settings/{key}', [RegistrationSettingController::class, 'update']);
    Route::post('/registration/settings/bulk-update', [RegistrationSettingController::class, 'bulkUpdate']);
    Route::post('/registration/settings/refresh-cache', [RegistrationSettingController::class, 'refreshCache']);
});

// Forms Routes (Public)
Route::get('/forms/dashboard', [FormSubmissionController::class, 'dashboard']);
Route::get('/forms/{uuid}/fill', [FormController::class, 'fill']);
Route::post('/forms/{uuid}/submit', [FormSubmissionController::class, 'submit']);

// Debug route to test authentication
Route::middleware('auth:sanctum')->get('/test-auth', function(Request $request) {
    return response()->json([
        'success' => true,
        'user' => $request->user(),
        'token' => $request->user()->currentAccessToken()?->token,
    ]);
});

// Forms Routes (Authenticated)
Route::middleware('auth:sanctum')->group(function () {
    // Profile Routes
    Route::match(['put', 'post'],'/user/profile', [ProfileController::class, 'update']);
    
    Route::get('/forms', [FormController::class, 'index']);
    Route::post('/forms', [FormController::class, 'store']);
    Route::get('/forms/{uuid}', [FormController::class, 'show']);
    
    // Support both PUT and POST (for method spoofing)
    Route::match(['put', 'post'], '/forms/{uuid}', [FormController::class, 'update']);
    
    Route::delete('/forms/{uuid}', [FormController::class, 'destroy']);
    Route::post('/forms/{uuid}/duplicate', [FormController::class, 'duplicate']);
    Route::post('/forms/{uuid}/publish', [FormController::class, 'publish']);
    Route::get('/forms/{uuid}/stats', [FormController::class, 'stats']);

    // Script-based Form Routes
    Route::get('/forms/{uuid}/script', [FormController::class, 'script']);
    Route::post('/forms/{uuid}/script', [FormController::class, 'updateScript']);

    // User search for collaborator selection
    Route::get('/users/search', [FormController::class, 'searchUsers']);

    // Form Submissions (Protected - require access)
    Route::get('/forms/{uuid}/submissions/stats', [FormSubmissionController::class, 'stats']);
    Route::get('/forms/{uuid}/submissions/export', [FormSubmissionController::class, 'export']);
    Route::get('/forms/{uuid}/submissions', [FormSubmissionController::class, 'index']);
    Route::get('/forms/{uuid}/submissions/{submissionId}', [FormSubmissionController::class, 'show']);
    Route::put('/forms/{uuid}/submissions/{submissionId}', [FormSubmissionController::class, 'updateNotes']);
    Route::post('/forms/{uuid}/submissions/{submissionId}/notes', [FormSubmissionController::class, 'addNote']);
    Route::delete('/forms/{uuid}/submissions/{submissionId}', [FormSubmissionController::class, 'destroy']);

    // Form Access Management
    Route::get('/forms/{uuid}/access/check', [FormAccessController::class, 'checkAccess']);
    Route::post('/forms/{uuid}/access/request', [FormAccessController::class, 'requestAccess']);
    Route::post('/forms/{uuid}/access/grant', [FormAccessController::class, 'grantAccess']); // Grant access directly
    Route::get('/forms/{uuid}/access/requests', [FormAccessController::class, 'getAllRequests']);
    Route::get('/forms/{uuid}/access/requests/pending', [FormAccessController::class, 'getPendingRequests']);
    Route::post('/forms/{uuid}/access/requests/batch', [FormAccessController::class, 'batchProcess']); // Batch approve/reject
    Route::post('/forms/{uuid}/access/requests/{requestId}/approve', [FormAccessController::class, 'approveRequest']);
    Route::post('/forms/{uuid}/access/requests/{requestId}/reject', [FormAccessController::class, 'rejectRequest']);
    Route::delete('/forms/{uuid}/access/users/{userId}', [FormAccessController::class, 'revokeAccess']);
    Route::get('/forms/{uuid}/access/users', [FormAccessController::class, 'getUsersWithAccess']);
    Route::put('/forms/{uuid}/access/users/{userId}/permission', [FormAccessController::class, 'updatePermission']); // Update permission level
    Route::get('/forms/{uuid}/access/audit-log', [FormAccessController::class, 'getAuditLog']); // View audit trail
    
    // User's Access Requests
    Route::get('/forms/access-requests/my-requests', [FormAccessController::class, 'myRequests']);

    // Admin Routes - User, Role, Permission Management
    Route::middleware('role:admin|manager')->prefix('admin')->group(function () {
        // User Management
        Route::prefix('users')->group(function () {
            Route::get('/', [UserController::class, 'index']);
            Route::post('/', [UserController::class, 'store']);
            Route::get('/{user}', [UserController::class, 'show']);
            Route::match(['put', 'post'],'/{user}', [UserController::class, 'update']);
            Route::delete('/{user}', [UserController::class, 'destroy']);
            Route::post('/{user}/roles', [UserController::class, 'assignRoles']);
            Route::delete('/{user}/roles', [UserController::class, 'removeRole']);
            Route::get('/{user}/permissions', [UserController::class, 'permissions']);
        });

        // Role Management
        Route::prefix('roles')->group(function () {
            Route::get('/', [RoleController::class, 'index']);
            Route::post('/', [RoleController::class, 'store']);
            Route::get('/{role}', [RoleController::class, 'show']);
            Route::put('/{role}', [RoleController::class, 'update']);
            Route::delete('/{role}', [RoleController::class, 'destroy']);
            Route::get('/{role}/users', [RoleController::class, 'users']);
            Route::get('/{role}/permissions', [RoleController::class, 'permissions']);
            Route::post('/{role}/permissions', [RoleController::class, 'assignPermissions']);
            Route::delete('/{role}/permissions', [RoleController::class, 'removePermission']);
        });

        // Permission Management
        Route::prefix('permissions')->group(function () {
            Route::get('/', [PermissionController::class, 'index']);
            Route::post('/', [PermissionController::class, 'store']);
            Route::get('/{permission}', [PermissionController::class, 'show']);
            Route::put('/{permission}', [PermissionController::class, 'update']);
            Route::delete('/{permission}', [PermissionController::class, 'destroy']);
            Route::get('/grouped', [PermissionController::class, 'grouped']);
            Route::post('/sync-with-roles', [PermissionController::class, 'syncWithRoles']);
        });
    });
});