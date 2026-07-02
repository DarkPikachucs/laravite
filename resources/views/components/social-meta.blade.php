@props([
    'title' => 'Survey',
    'description' => 'Survey Application',
    'image' => null,
    'imageWidth' => 1200,
    'imageHeight' => 630,
    'url' => url()->current(),
    'type' => 'website',
    'siteName' => 'Survey',
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
])

@php
    // Set default image if not provided
    if (!$image) {
        $image = asset('og-image.jpg'); // Default OG image
    }
    
    // Set canonical URL
    if (!$canonical) {
        $canonical = $url;
    }
@endphp

    <!-- Primary Meta Tags -->
    <title>{{ $title }}</title>
    <meta name="title" content="{{ $title }}">
    <meta name="description" content="{{ $description }}">
    <meta name="author" content="{{ $author ?? 'Survey' }}">
    @if($tags)
    <meta name="keywords" content="{{ is_array($tags) ? implode(', ', $tags) : $tags }}">
    @endif

    <!-- Canonical URL -->
    <link rel="canonical" href="{{ $canonical }}">

    <!-- Favicon -->
    <link rel="icon" href="{{ $favicon }}" type="image/x-icon">
    <meta name="theme-color" content="{{ $themeColor }}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="{{ $type }}">
    <meta property="og:url" content="{{ $url }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image" content="{{ $image }}">
    <meta property="og:image:width" content="{{ $imageWidth }}">
    <meta property="og:image:height" content="{{ $imageHeight }}">
    <meta property="og:site_name" content="{{ $siteName }}">
    <meta property="og:locale" content="{{ $locale }}">
    @if($publishedTime)
    <meta property="article:published_time" content="{{ $publishedTime }}">
    @endif
    @if($modifiedTime)
    <meta property="article:modified_time" content="{{ $modifiedTime }}">
    @endif
    @if($author)
    <meta property="article:author" content="{{ $author }}">
    @endif
    @if($section)
    <meta property="article:section" content="{{ $section }}">
    @endif
    @if($tags)
    @foreach($tags as $tag)
    <meta property="article:tag" content="{{ $tag }}">
    @endforeach
    @endif

    <!-- Twitter Card -->
    <meta name="twitter:card" content="{{ $twitterCard }}">
    <meta name="twitter:url" content="{{ $url }}">
    <meta name="twitter:title" content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">
    <meta name="twitter:image" content="{{ $image }}">
    @if($twitterSite)
    <meta name="twitter:site" content="{{ $twitterSite }}">
    @endif
    @if($twitterCreator)
    <meta name="twitter:creator" content="{{ $twitterCreator }}">
    @endif

    <!-- LinkedIn -->
    <meta property="og:url" content="{{ $url }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image" content="{{ $image }}">

    <!-- Line (uses Open Graph) -->
    <meta property="og:url" content="{{ $url }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image" content="{{ $image }}">

    <!-- WhatsApp (uses Open Graph) -->
    <meta property="og:url" content="{{ $url }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image" content="{{ $image }}">

    <!-- Telegram (uses Open Graph) -->
    <meta property="og:url" content="{{ $url }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image" content="{{ $image }}">

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "{{ $type === 'website' ? 'WebSite' : 'Article' }}",
        "name": "{{ $title }}",
        "description": "{{ $description }}",
        "url": "{{ $url }}",
        "image": "{{ $image }}",
        "author": {
            "@type": "Organization",
            "name": "{{ $author ?? 'Survey' }}"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Survey",
            "logo": {
                "@type": "ImageObject",
                "url": "{{ asset('logo.png') }}"
            }
        },
        @if($publishedTime)
        "datePublished": "{{ $publishedTime }}",
        @endif
        @if($modifiedTime)
        "dateModified": "{{ $modifiedTime }}",
        @endif
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "{{ $canonical }}"
        }
    }
    </script>
