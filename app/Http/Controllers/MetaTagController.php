<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MetaTagController extends Controller
{
    /**
     * Handle meta tags for survey forms
     */
    public function form($uuid)
    {
        // Try to fetch form data from database
        $form = Form::where('uuid', $uuid)->first();
        
        // Default meta data
        $metaData = [
            'title' => 'Survey Form',
            'description' => 'Complete this survey form',
            'image' => asset('og-image.jpg'),
            'type' => 'website',
            'url' => url()->current(),
            'locale' => 'th_TH',
        ];

        // If form exists, customize the meta tags
        if ($form) {
            $metaData = [
                'title' => $form->title . ' - Survey',
                'description' => Str::limit($form->description ?? 'Complete this survey', 150),
                'image' => asset('og-image.jpg'),
                'type' => 'website',
                'url' => url()->current(),
                'locale' => 'th_TH',
            ];
        }

        return view('app', compact('metaData'));
    }

    /**
     * Handle meta tags for form by slug
     */
    public function formBySlug($slug)
    {
        $form = Form::where('slug', $slug)->first();

        $metaData = [
            'title' => 'Survey Form',
            'description' => 'Complete this survey form',
            'image' => asset('og-image.jpg'),
            'type' => 'website',
            'url' => url()->current(),
            'locale' => 'th_TH',
        ];

        if ($form) {
            $metaData = [
                'title' => $form->title . ' - Survey',
                'description' => Str::limit($form->description ?? 'Complete this survey', 150),
                'image' => asset('og-image.jpg'),
                'type' => 'website',
                'url' => url()->current(),
                'locale' => 'th_TH',
            ];
        }

        return view('app', compact('metaData'));
    }

    /**
     * Handle meta tags for home page
     */
    public function home()
    {
        $metaData = [
            'title' => 'Survey - แพลตฟอร์มสำรวจออนไลน์',
            'description' => 'สร้างแบบสำรวจออนไลน์ได้ง่ายๆ ในไม่กี่นาที',
            'image' => asset('og-image.jpg'),
            'type' => 'website',
            'url' => url('/'),
            'locale' => 'th_TH',
        ];

        return view('app', compact('metaData'));
    }
}