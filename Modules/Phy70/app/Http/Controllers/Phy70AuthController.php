<?php

namespace Modules\Phy70\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Modules\Phy70\Models\Phy70Organization;
use Modules\Phy70\Models\Phy70User;
use Modules\Phy70\Models\Phy70Invitation;

class Phy70AuthController extends Controller
{
    private function guard()
    {
        return Auth::guard('phy70');
    }

    public function showLogin()
    {
        if ($this->guard()->check()) {
            return redirect('/app/phy70');
        }
        return view('phy70::auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($this->guard()->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect('/app/phy70')->with('success', 'เข้าสู่ระบบสำเร็จ');
        }

        return back()->withErrors([
            'email' => 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        $this->guard()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/app/phy70')->with('success', 'ออกจากระบบเรียบร้อย');
    }

    public function showRegister()
    {
        if ($this->guard()->check()) {
            return redirect('/app/phy70');
        }
        return view('phy70::auth.register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'organization_name' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:sqlite_phy70.phy70_users,email',
            'password' => 'required|string|min:6|confirmed',
        ], [
            'email.unique' => 'อีเมลนี้ถูกใช้งานในระบบแล้ว',
            'password.confirmed' => 'รหัสผ่านยืนยันไม่ตรงกัน',
        ]);

        // Create organization
        $organization = Phy70Organization::create([
            'name' => $request->organization_name,
        ]);

        // Create first user as admin
        $user = Phy70User::create([
            'organization_id' => $organization->id,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        $this->guard()->login($user);

        return redirect('/app/phy70')->with('success', 'ลงทะเบียนและเข้าสู่ระบบสำเร็จ');
    }

    public function manageUsers()
    {
        $currentUser = $this->guard()->user();
        if (!$currentUser || $currentUser->role !== 'admin') {
            abort(403, 'เฉพาะผู้ดูแลระบบของหน่วยงานเท่านั้นที่เข้าถึงหน้านี้ได้');
        }

        $users = Phy70User::where('organization_id', $currentUser->organization_id)->get();
        $invitations = Phy70Invitation::where('organization_id', $currentUser->organization_id)
            ->where('used', false)
            ->get();

        return view('phy70::auth.users', compact('users', 'invitations'));
    }

    public function inviteUser(Request $request)
    {
        $currentUser = $this->guard()->user();
        if (!$currentUser || $currentUser->role !== 'admin') {
            abort(403);
        }

        $request->validate([
            'email' => 'required|email|unique:sqlite_phy70.phy70_users,email',
        ], [
            'email.unique' => 'อีเมลนี้เป็นสมาชิกในระบบอยู่แล้ว',
        ]);

        // Check if pending invitation exists
        Phy70Invitation::where('organization_id', $currentUser->organization_id)
            ->where('email', $request->email)
            ->delete();

        $token = Str::random(40);

        Phy70Invitation::create([
            'organization_id' => $currentUser->organization_id,
            'email' => $request->email,
            'token' => $token,
            'used' => false,
        ]);

        $invitationLink = url("/app/phy70/invite/{$token}");

        return back()->with([
            'success' => 'สร้างลิงก์เชิญสำเร็จแล้ว',
            'invitation_link' => $invitationLink,
            'invited_email' => $request->email
        ]);
    }

    public function showInviteAccept($token)
    {
        $invitation = Phy70Invitation::where('token', $token)->where('used', false)->first();
        if (!$invitation) {
            return redirect('/app/phy70/login')->with('error', 'ลิงก์เชิญไม่ถูกต้องหรือถูกใช้งานไปแล้ว');
        }

        $organization = Phy70Organization::find($invitation->organization_id);

        return view('phy70::auth.accept-invite', compact('invitation', 'organization'));
    }

    public function acceptInvite(Request $request, $token)
    {
        $invitation = Phy70Invitation::where('token', $token)->where('used', false)->first();
        if (!$invitation) {
            return redirect('/app/phy70/login')->with('error', 'ลิงก์เชิญหมดอายุหรือไม่ถูกต้อง');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Create User
        $user = Phy70User::create([
            'organization_id' => $invitation->organization_id,
            'name' => $request->name,
            'email' => $invitation->email,
            'password' => Hash::make($request->password),
            'role' => 'user', // Invited user defaults to normal user
        ]);

        // Mark invitation as used
        $invitation->update(['used' => true]);

        $this->guard()->login($user);

        return redirect('/app/phy70')->with('success', 'เปิดใช้งานบัญชีสำเร็จและเข้าสู่ระบบแล้ว');
    }

    public function resetPassword(Request $request, $id)
    {
        $currentUser = $this->guard()->user();
        if (!$currentUser || $currentUser->role !== 'admin') {
            abort(403);
        }

        $targetUser = Phy70User::where('organization_id', $currentUser->organization_id)->findOrFail($id);

        $request->validate([
            'password' => 'required|string|min:6|confirmed',
        ]);

        $targetUser->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', "รีเซ็ตรหัสผ่านของ {$targetUser->name} สำเร็จแล้ว");
    }

    // Google OAuth Integration
    public function redirectToGoogle(Request $request)
    {
        // Store that this Google OAuth call is for Phy70
        session(['phy70_oauth' => true]);
        
        // Handle redirect target if linking
        if ($request->has('link')) {
            session(['phy70_link_user_id' => $this->guard()->id()]);
        }

        return Socialite::driver('google')
            ->stateless()
            ->redirectUrl(url('/app/phy70/auth/google/callback'))
            ->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->redirectUrl(url('/app/phy70/auth/google/callback'))
                ->user();
                
            $email = $googleUser->getEmail();

            // Case 1: Linking Google to currently logged-in user
            $linkUserId = session()->pull('phy70_link_user_id');
            if ($linkUserId) {
                $user = Phy70User::find($linkUserId);
                if ($user) {
                    $user->update([
                        'google_id' => $googleUser->getId(),
                        'avatar' => $googleUser->getAvatar(),
                    ]);
                    return redirect('/app/phy70/admin/users')->with('success', 'เชื่อมต่อบัญชี Google สำเร็จแล้ว');
                }
            }

            // Case 2: Try logging in
            $user = Phy70User::where('email', $email)->first();

            if ($user) {
                // Update Google credentials if not set
                if (!$user->google_id) {
                    $user->update([
                        'google_id' => $googleUser->getId(),
                        'avatar' => $googleUser->getAvatar(),
                    ]);
                }
                $this->guard()->login($user);
                return redirect('/app/phy70')->with('success', 'เข้าสู่ระบบผ่าน Google สำเร็จ');
            }

            // Case 3: Email not registered, redirect to registration with prefilled google data
            return redirect('/app/phy70/register')->with([
                'google_email' => $email,
                'google_name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'google_avatar' => $googleUser->getAvatar(),
                'info' => 'ไม่พบอีเมลในระบบ กรุณากรอกชื่อหน่วยงานเพื่อลงทะเบียนบัญชีใหม่'
            ]);

        } catch (\Exception $e) {
            \Log::error('Phy70 Google OAuth error: ' . $e->getMessage());
            return redirect('/app/phy70/login')->with('error', 'การเข้าสู่ระบบผ่าน Google เกิดข้อผิดพลาด');
        }
    }
}
