<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        // Store the current form UUID in session to redirect back after login
        $formUuid = request()->get('form_uuid');
        if ($formUuid) {
            session(['form_uuid' => $formUuid]);
        }

        // Store the full path to redirect back after login (e.g., /forms-schema/58bd4b53-da5d-4e11-8053-b1bf9efcab5c)
        $fromPath = request()->get('from_path', '/login');
        session(['oauth_from_path' => $fromPath]);

        // Store the redirect source (form or login page)
        $from = request()->get('from', 'form');
        session(['oauth_from' => $from]);

        // Check if user wants to select account (for popup login)
        $prompt = request()->get('prompt', 'select_account');

        return Socialite::driver('google')
            ->stateless()
            ->with(['prompt' => $prompt])
            ->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            $email = $googleUser->getEmail();

            \Log::info('Google OAuth callback', [
                'email' => $email,
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
            ]);

            // Check if user exists
            $existingUser = User::where('email', $email)->first();
            $isNewUser = !$existingUser;

            \Log::info('User check', [
                'existingUser' => $existingUser ? 'yes' : 'no',
                'isNewUser' => $isNewUser,
            ]);

            // Determine user type based on email domain
            $isInternal = str_ends_with($email, '@pcru.ac.th');
            $userType = $isInternal ? 'internal' : 'external';

            $user = User::updateOrCreate(
                [
                    'email' => $email,
                ],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'user_type' => $userType,
                    'is_internal' => $isInternal,
                    'password' => bcrypt(bin2hex(random_bytes(32))), // Random password for Google users
                    'email_verified_at' => now(),
                ]
            );

            \Log::info('User created/updated', [
                'user_id' => $user->id,
                'email' => $user->email,
            ]);

            // Create Sanctum token for API access
            $token = $user->createToken('google-auth-token')->plainTextToken;

            // Get the form UUID from session (stored before login)
            $formUuid = session('form_uuid');

            \Log::info('Session data', [
                'formUuid' => $formUuid,
            ]);

            // Build redirect URL - use JavaScript redirect for cross-domain compatibility
            if ($isNewUser) {
                // New user: redirect to profile setup
                $redirectUrl = "/profile/setup";
                $redirectUrl .= "?google_token={$token}";
                $redirectUrl .= "&user_id={$user->id}";
                $redirectUrl .= "&is_internal=" . ($isInternal ? 'true' : 'false');
                $redirectUrl .= "&is_new_user=true";

                \Log::info('Redirecting new user to profile setup', [
                    'redirectUrl' => $redirectUrl,
                ]);

                // Return view with JavaScript redirect for cross-domain support
                return response()->view('auth.google-redirect', [
                    'redirectUrl' => $redirectUrl,
                ]);
            }

            // Existing user: Perform login before redirect
            \Log::info('Logging in existing user before redirect', [
                'user_id' => $user->id,
                'email' => $user->email,
            ]);

            // Perform session-based login
            Auth::login($user);
            session()->regenerate();

            // Load roles for the user
            $user->load('roles');

            \Log::info('User logged in successfully', [
                'user_id' => $user->id,
                'auth_check' => Auth::check(),
                'auth_id' => Auth::id(),
            ]);

            // Get the original path to redirect back (e.g., /forms-schema/uuid)
            $fromPath = session('oauth_from_path', '/dashboard');
            
            // Determine redirect destination
            // If user came from a specific form page, redirect back there
            // Otherwise, redirect to dashboard
            $redirectUrl = $fromPath;
            
            // Add token and user info to URL
            $separator = strpos($redirectUrl, '?') !== false ? '&' : '?';
            $redirectUrl .= "{$separator}google_token={$token}";
            $redirectUrl .= "&user_id={$user->id}";
            $redirectUrl .= "&is_internal=" . ($isInternal ? 'true' : 'false');
            $redirectUrl .= "&is_new_user=false";

            \Log::info('Redirecting logged-in user', [
                'fromPath' => $fromPath,
                'redirectUrl' => $redirectUrl,
            ]);

            // Return view with JavaScript redirect for cross-domain support
            return response()->view('auth.google-redirect', [
                'redirectUrl' => $redirectUrl,
            ]);
        } catch (\Exception $e) {
            \Log::error('Google OAuth error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // For redirect: redirect to frontend with error
            $frontendUrl = config('app.frontend_url', '/');
            return redirect("{$frontendUrl}?google_error=1");
        }
    }
}