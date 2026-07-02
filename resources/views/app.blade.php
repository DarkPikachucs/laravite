<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Social Meta Tags Component -->
    @isset($metaData)
        <x-social-meta
            :title="$metaData['title'] ?? 'Survey'"
            :description="$metaData['description'] ?? 'Survey Application'"
            :image="$metaData['image'] ?? asset('og-image.jpg')"
            :url="$metaData['url'] ?? url()->current()"
            :type="$metaData['type'] ?? 'website'"
            :locale="($metaData['locale'] ?? 'th_TH')"
        />
    @else
        <x-social-meta
            title="Survey"
            description="Survey Application"
            image="{{ asset('og-image.jpg') }}"
            url="{{ url()->current() }}"
            type="website"
            locale="th_TH"
        />
    @endisset

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/main.jsx'])
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
