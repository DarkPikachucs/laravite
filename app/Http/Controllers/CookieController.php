<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CookieController extends Controller
{
    public function checkCookie(Request $request)
    {
        if ($request->hasCookie('email_first')) {
            // Cookie 'your_cookie_name' exists
            return response()->json(['message' => 'Cookie exists']);
        } else {
            // Cookie 'your_cookie_name' does not exist
            return response()->json(['message' => 'Cookie does not exist']);
        }
    }
}