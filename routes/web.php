<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReactController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\MetaTagController;
use App\CustomApps\CustomAppController;

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout']);

// Google OAuth Routes
Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function () {
        $user = auth()->user();

        return response()->json([
          'user' => $user,
          'currentToken' => session('_token') ?? null
        ], 200);
    });
});

Route::get('/clear-cache', function() {
    //php artisan clear
    Artisan::call('route:clear');
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('view:clear');
    Artisan::call('optimize:clear');
    

    //php artisan route:cache
    Artisan::call('route:cache');
    Artisan::call('config:cache');
    Artisan::call('view:cache');
    Artisan::call('optimize');

    // Check if SQLite extension is loaded
    if (extension_loaded('pdo_sqlite')) {
        echo 'PDO_SQLITE is enabled.';
    } else {
        echo 'PDO_SQLITE is NOT enabled.';
    }

    if (extension_loaded('sqlite3')) {
        echo 'SQLite3 is enabled.';
    } else {
        echo 'SQLite3 is NOT enabled.';
    }

    try {
    $db = new PDO('sqlite::memory:');
    echo "Connection successful!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

    dd("clear");
});

// Survey Form Routes with Meta Tags
Route::get('/forms/{uuid}', [MetaTagController::class, 'form']);
Route::get('/f/{slug}', [MetaTagController::class, 'formBySlug']);

// Profile Setup Route (for new users)
Route::get('/profile/setup', function() {
    return view('app');
})->name('profile.setup');

// Home Route
Route::get('/', [MetaTagController::class, 'home']);

// Custom App Module Routes
Route::get('/custom-apps', [CustomAppController::class, 'index']);
Route::get('/app/{appName}', [CustomAppController::class, 'app'])->where('appName', '^(?!phy70$)[^/]+$');

//phpinfo();
Route::get('/phpinfo', function() {
    phpinfo();
});

// React SPA Routes
Route::get('/{any}', [ReactController::class, 'index'])->where('any', '^((?!api|sanctum|app).)*$');

// Catch all other routes for React SPA
Route::get('/{any}', function () {
    return view('app');
})->where('any',  '^((?!api|sanctum|app).)*$');