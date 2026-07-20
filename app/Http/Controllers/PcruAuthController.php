<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PcruAuthController extends Controller
{
    /**
     * Redirect the user to the Keycloak authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToKeycloak()
    {
        // Store the full path to redirect back after login
        $fromPath = request()->get('from_path', '/dashboard');
        $from = request()->get('from', 'form');
        session([
            'oauth_from_path' => $fromPath,
            'oauth_from' => $from,
            'oauth_keycloak_mode' => 'login',
        ]);

        return Socialite::driver('keycloak')->redirect();
    }

    /**
     * Redirect to Keycloak only to verify login and read profile data.
     * This flow does not create users, login locally, or issue Sanctum tokens.
     */
    public function redirectToKeycloakCheckLogin()
    {
        $fromPath = request()->get('from_path', '/dashboard');
        $from = request()->get('from', 'popup');
        session([
            'oauth_from_path' => $fromPath,
            'oauth_from' => $from,
            'oauth_keycloak_mode' => 'check_login',
        ]);

        return Socialite::driver('keycloak')->redirect();
    }

    /**
     * Obtain the user information from Keycloak.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleKeycloakCallback()
    {
        try {
            $keycloakUser = Socialite::driver('keycloak')->user();
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'การเข้าสู่ระบบผ่านระบบของมหาวิทยาลัยล้มเหลว (Keycloak)');
        }
        //dd($keycloakUser);

        if (session('oauth_keycloak_mode') === 'check_login') {
            $ssoUser = $this->mapKeycloakUser($keycloakUser);
            $redirectUrl = session('oauth_from_path', '/dashboard');
            $from = session('oauth_from', 'popup');
            session()->forget('oauth_keycloak_mode');

            return view('auth.callback', [
                'token' => null,
                'user' => $ssoUser,
                'user_id' => $ssoUser['id'],
                'is_new_user' => false,
                'is_internal' => $ssoUser['is_internal'],
                'redirect_url' => $redirectUrl,
                'from' => $from,
                'provider' => 'keycloak'
            ]);
        }

        // หา user หรือสร้างใหม่
        $user = User::where('email', $keycloakUser->nickname.'@pcru.ac.th')->first();

        // เช็คว่าใช่อีเมลภายในหรือไม่
        $isInternal = str_ends_with($keycloakUser->nickname.'@pcru.ac.th', '@pcru.ac.th');

        $isNewUser = false;
        if (!$user) {
            $isNewUser = true;
            $user = User::create([
                'name' => $this->decodeThaiName($keycloakUser->name ?? $keycloakUser->nickname ?? $keycloakUser->email),
                'email' => $keycloakUser->nickname.'@pcru.ac.th',
                'user_type' => $isInternal ? 'internal' : 'external',
                'password' => bcrypt(str()->random(24)),
                'keycloak_id' => $keycloakUser->id,
            ]);
            $user->assignRole('user');
        }
        
        Auth::login($user);
        session()->regenerate();
        $user->load('roles');

        // สร้าง Sanctum token สำหรับ API
        $token = $user->createToken('keycloak-token')->plainTextToken;

        $redirectUrl = session('oauth_from_path', '/dashboard');
        $from = session('oauth_from', 'form');

        // ส่งข้อมูลกลับไปที่ Frontend (ในรูปแบบ Event / query string / view)
        // เพื่อให้ Frontend (React) รับ token ไปใช้งาน
        return view('auth.callback', [
            'token' => $token,
            'user' => $user,
            'user_id' => $user->id,
            'is_new_user' => $isNewUser,
            'is_internal' => $isInternal,
            'redirect_url' => $redirectUrl,
            'from' => $from,
            'provider' => 'keycloak'
        ]);
    }

    private function decodeThaiName($name)
    {
        if (empty($name)) return $name;
        
        // If it already has Thai characters, assume it's correct
        if (preg_match('/[ก-๙]/u', $name)) {
            return $name;
        }

        // Sometimes Keycloak returns TIS-620 bytes interpreted as ISO-8859-1 inside UTF-8 JSON
        $rawBytes = @iconv('UTF-8', 'ISO-8859-1//IGNORE', $name);
        if ($rawBytes) {
            // Use CP874 as it is Windows Thai encoding (similar to TIS-620)
            $converted = @iconv('CP874', 'UTF-8//IGNORE', $rawBytes);
            if ($converted && preg_match('/[ก-๙]/u', $converted)) {
                return $converted;
            }
        }

        // Direct conversion fallback
        $directConverted = @iconv('CP874', 'UTF-8//IGNORE', $name);
        if ($directConverted && preg_match('/[ก-๙]/u', $directConverted)) {
            return $directConverted;
        }

        return $name;
    }

    private function mapKeycloakUser($keycloakUser): array
    {
        $nickname = $this->decodeThaiName($keycloakUser->nickname ?? null);
        $name = $this->decodeThaiName($keycloakUser->name ?? null);
        
        $email = $keycloakUser->email ?? ($nickname ? $nickname . '@pcru.ac.th' : null);
        $isInternal = $email ? str_ends_with($email, '@pcru.ac.th') : false;

        return [
            'id' => $keycloakUser->id ?? $email,
            'keycloak_id' => $keycloakUser->id ?? null,
            'name' => $name ?? $nickname ?? $email,
            'nickname' => $nickname,
            'email' => $email,
            'avatar' => $keycloakUser->avatar ?? null,
            'user_type' => $isInternal ? 'internal' : 'external',
            'is_internal' => $isInternal,
            'provider' => 'keycloak',
        ];
    }
}