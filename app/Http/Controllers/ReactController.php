<?php

namespace App\Http\Controllers;

class ReactController extends Controller {
    public function show ($path = null) {
        if ($path) {
            return view('react', ['path' => $path]); // ส่งค่า path ไปยัง view react.blade.php
        }
        return view('react');
    }
}