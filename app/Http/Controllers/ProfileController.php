<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Update user profile
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบข้อมูลผู้ใช้'
            ], 404);
        }

        // Validate input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'department' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
        ]);

        // Update user data
        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'อัปเดตโปรไฟล์เรียบร้อยแล้ว',
            'user' => $user,
        ]);
    }
}
