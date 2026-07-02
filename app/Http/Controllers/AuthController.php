<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\AuthUserRequest;
 use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
  /*public function login(Request $request)
  {
    if (!Auth::attempt($request->only('email', 'password'))) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials do not match our records.'],
        ]);
    }

    $user = Auth::user();
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user,
    ]);
  }*/
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            
            // Load roles for the user
            $user = Auth::user()->load('roles');
            
            // Create token for API access
            $token = $user->createToken('login-token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'currentToken' => $token,
                'user' => $user,
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    
    public function auth(AuthUserRequest $request)
    {
      if($request->validated()){
        $user = User::whereEmail($request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)){
          return response()->json(['message' => 'Invalid credentials'], 401);
        }else{
          // Load roles for the user
          $user->load('roles');
          
          return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'currentToken' => $user->createToken('token')->plainTextToken
          ]);
        }

      }
        /*$credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                'message' => 'Login successful',
                'user' => Auth::user(),
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);*/
    }
    /*

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }

    public function login(Request $request) {
      $credentials = $request->only('email', 'password');

      if (!Auth::attempt($credentials)) {
          return response()->json(['message' => 'Invalid credentials'], 401);
      }

      return response()->json(['token' => $request->user()->createToken('token')->plainTextToken]);
    }*/

    public function logout(Request $request) {
       $request->user()->currentAccessToken()->delete();
        //$request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user()->load('roles'));
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
          'message' => 'User registered successfully',
          'user' => $user,
          'currentToken' => $user->createToken('token')->plainTextToken], 201);
    }
}