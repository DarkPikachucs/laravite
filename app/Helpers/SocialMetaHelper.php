<?php

if (!function_exists('socialMeta')) {
    /**
     * Generate social meta tags data array
     *
     * @param array $data
     * @return array
     */
    function socialMeta(array $data = []): array
    {
        $defaults = [
            'title' => config('app.name', 'Survey'),
            'description' => config('app.name', 'Survey'),
            'image' => null,
            'imageWidth' => 1200,
            'imageHeight' => 630,
            'url' => url()->current(),
            'type' => 'website',
            'siteName' => config('app.name', 'Survey'),
            'locale' => 'th_TH',
            'twitterCard' => 'summary_large_image',
            'twitterSite' => null,
            'twitterCreator' => null,
            'publishedTime' => null,
            'modifiedTime' => null,
            'author' => null,
            'section' => null,
            'tags' => [],
            'favicon' => asset('favicon.ico'),
            'themeColor' => '#ffffff',
            'canonical' => null,
        ];

        return array_merge($defaults, $data);
    }
}