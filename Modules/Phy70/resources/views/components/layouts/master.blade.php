<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <title>PHY Project - {{ config('app.name', 'Laravel') }}</title>

  <meta name="description" content="{{ $description ?? '' }}">
  <meta name="keywords" content="{{ $keywords ?? '' }}">
  <meta name="author" content="{{ $author ?? '' }}">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

  {{-- Vite CSS --}}
  {{-- {{ module_vite('build-phy70', 'resources/assets/sass/app.scss') }} --}}
</head>

<body>
  <!-- Theme Toggle Button -->
  <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
    <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
    <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </button>

  {{ $slot }}

  {{-- Vite JS --}}
  {{-- {{ module_vite('build-phy70', 'resources/assets/js/app.js') }} --}}

  <style>
    /* Global Light Theme Variables */
    :root.light-theme {
      --bg-base: #f0f4f8;
      --bg-surface: rgba(255, 255, 255, 0.8);
      --border-glow: rgba(99, 102, 241, 0.3);
      --border-glow-hover: rgba(6, 182, 212, 0.5);

      --primary: #4f46e5;
      --primary-glow: rgba(99, 102, 241, 0.2);
      --secondary: #0891b2;
      --text-main: #0f172a;
      --text-muted: #475569;
    }

    /* Light Theme Overrides for hardcoded colors in other components */
    :root.light-theme body {
      background-color: var(--bg-base) !important;
      color: var(--text-main);
    }

    :root.light-theme .glass-card, 
    :root.light-theme .stat-card,
    :root.light-theme .glass-header,
    :root.light-theme .selection-display-box {
      background: var(--bg-surface) !important;
      border-color: rgba(0, 0, 0, 0.1) !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
    }

    :root.light-theme .btn-secondary {
      background: rgba(0, 0, 0, 0.03) !important;
      border-color: rgba(0, 0, 0, 0.1) !important;
      color: var(--text-main) !important;
    }
    
    :root.light-theme .btn-secondary:hover {
      background: rgba(0, 0, 0, 0.08) !important;
    }

    :root.light-theme .form-control,
    :root.light-theme .status-badge {
      background: rgba(255, 255, 255, 0.6) !important;
      border-color: rgba(0, 0, 0, 0.1) !important;
      color: var(--text-main) !important;
    }
    
    :root.light-theme .form-control:focus {
      border-color: var(--primary) !important;
      box-shadow: 0 0 0 4px var(--primary-glow) !important;
    }

    :root.light-theme .tree-node,
    :root.light-theme .tree-node-header,
    :root.light-theme .tree-leaf-item {
      background: rgba(255, 255, 255, 0.5) !important;
      border-color: rgba(0, 0, 0, 0.05) !important;
      color: var(--text-main) !important;
    }
    
    :root.light-theme .modal-content,
    :root.light-theme .modal-header {
      background: #ffffff !important;
      border-color: rgba(0, 0, 0, 0.1) !important;
    }

    :root.light-theme .bg-glow {
      background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%) !important;
    }

    :root.light-theme table th {
      background: rgba(0, 0, 0, 0.03) !important;
      color: var(--text-muted) !important;
    }
    
    :root.light-theme table td,
    :root.light-theme table tr {
      border-color: rgba(0, 0, 0, 0.05) !important;
    }

    /* Floating Theme Toggle Button */
    .theme-toggle {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bg-surface);
      border: 1px solid var(--border-glow);
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      backdrop-filter: blur(12px);
    }

    .theme-toggle:hover {
      transform: scale(1.1);
      border-color: var(--primary);
    }
  </style>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const toggleBtn = document.getElementById('theme-toggle');
      const iconSun = document.getElementById('icon-sun');
      const iconMoon = document.getElementById('icon-moon');
      const root = document.documentElement;
      
      // Determine preference
      const storedTheme = localStorage.getItem('phy70-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      let isLight = false;
      
      if (storedTheme) {
        isLight = storedTheme === 'light';
      } else {
        isLight = !prefersDark;
      }
      
      function applyTheme() {
        if (isLight) {
          root.classList.add('light-theme');
          iconSun.style.display = 'block';
          iconMoon.style.display = 'none';
        } else {
          root.classList.remove('light-theme');
          iconSun.style.display = 'none';
          iconMoon.style.display = 'block';
        }
      }
      
      // Apply initial theme
      applyTheme();
      
      // Handle click
      toggleBtn.addEventListener('click', () => {
        isLight = !isLight;
        localStorage.setItem('phy70-theme', isLight ? 'light' : 'dark');
        applyTheme();
      });
      
      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('phy70-theme')) {
          isLight = !e.matches;
          applyTheme();
        }
      });
    });
  </script>
</body>

</html>