<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <title>Phetchabun Project - {{ config('app.name', 'Laravel') }}</title>

  <meta name="description" content="{{ $description ?? '' }}">
  <meta name="keywords" content="{{ $keywords ?? '' }}">
  <meta name="author" content="{{ $author ?? '' }}">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

  <!-- Alpine.js -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js"></script>

  {{-- Vite CSS --}}
  {{-- {{ module_vite('build-phy70', 'resources/assets/sass/app.scss') }} --}}
  <style>
    /* Alpine x-cloak for hiding elements until Alpine initializes */
    [x-cloak] {
      display: none !important;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-base) !important;
      color: var(--text-main);
      font-family: 'Outfit', 'Prompt', 'IBM Plex Sans Thai', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    .logo-subtitle {
      font-size: 12px;
      color: var(--secondary);
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    /* User Profile Area */
    .user-menu {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 6px 16px 6px 6px;
      border-radius: 99px;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #fff;
      overflow: hidden;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info-text {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
    }

    .user-org {
      font-size: 11px;
      color: var(--text-muted);
    }

    /* Global Navbar Styles */
    .global-navbar {
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      position: sticky;
      top: 0;
      z-index: 1000;
      width: 100%;
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mobile-header {
      display: flex;
      align-items: center;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: #f8fafc;
      cursor: pointer;
      padding: 4px;
    }

    .nav-menus {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
    }

    .nav-left {
      display: flex;
      gap: 24px;
      align-items: center;
      margin-left: 32px;
    }

    .nav-right {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    @media (max-width: 768px) {
      .nav-container {
        flex-direction: column;
        padding: 12px 20px;
        align-items: flex-start;
      }

      .mobile-header {
        justify-content: space-between;
        width: 100%;
      }

      .mobile-menu-btn {
        display: block;
      }

      .nav-menus {
        display: none;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        margin-top: 16px;
        gap: 16px;
      }

      .nav-menus.open {
        display: flex;
      }

      .nav-left {
        margin-left: 0;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        gap: 16px;
      }

      .nav-right {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        gap: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 16px;
      }

      .user-menu {
        width: 100%;
        box-sizing: border-box;
      }

      .btn-logout {
        width: 100%;
        text-align: left;
      }
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #06b6d4;
      /* var(--secondary) */
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.2s;
    }

    .nav-link:hover {
      color: #6366f1;
      /* var(--primary) */
    }

    /* User Menu Styles */
    .user-menu {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 4px 16px 4px 4px;
      border-radius: 99px;
      transition: all 0.2s;
    }

    .user-menu:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #fff;
      font-size: 14px;
      overflow: hidden;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info-text {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
      line-height: 1.2;
    }

    .user-org {
      font-size: 11px;
      color: var(--text-muted);
    }

    .btn-logout {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: var(--danger);
      padding: 8px 16px;
      border-radius: 99px;
      font-size: 13px;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-logout:hover {
      background: rgba(239, 68, 68, 0.2);
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary) 0%, rgba(99, 102, 241, 0.8) 100%);
      border: none;
      color: #fff;
      padding: 8px 18px;
      border-radius: 99px;
      font-size: 13px;
      font-weight: 500;
      font-family: inherit;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-primary:hover {
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    }

    /* Light Theme - Navbar Overrides */
    :root.light-theme .global-navbar {
      background: rgba(255, 255, 255, 0.9) !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
    }

    :root.light-theme .user-menu {
      background: rgba(0, 0, 0, 0.03);
      border-color: rgba(0, 0, 0, 0.05);
    }

    :root.light-theme .user-menu:hover {
      background: rgba(0, 0, 0, 0.06);
    }

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

    :root.light-theme .mobile-menu-btn {
      color: var(--text-main) !important;
    }

    :root.light-theme .form-control {
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
</head>

<body>
  <!-- Global Top Navbar -->
  <nav class="global-navbar" x-data="{ mobileMenuOpen: false }"
    style="position: {{ request()->routeIs('phy70.dashboard') ? 'relative' : 'sticky' }}; top: 0; z-index: 1000; width: 100%;">
    <div class="nav-container">
      <div class="mobile-header">
        <a href="/app/phy70" class="nav-link brand-link" style="font-size: 16px;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span style="font-weight: 500;">หน้าหลัก</span>
        </a>
        <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle menu">
          <svg x-show="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg x-show="mobileMenuOpen" style="display: none;" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="nav-menus" :class="mobileMenuOpen ? 'open' : ''">
        <div class="nav-left">
          <a href="/app/phy70/dashboard" class="nav-link" style="font-weight: 500;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </a>
          <a href="{{ route('phy70.manual') }}" class="nav-link" style="font-weight: 500; color: #a855f7;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            คู่มือการใช้งาน
          </a>
        </div>

        <div class="nav-right">
          @auth('phy70')
          <a href="{{ route('phy70.profile') }}" class="user-menu" style="text-decoration: none;">
            <div class="user-avatar">
              @if(auth('phy70')->user()->avatar)
              <img src="{{ auth('phy70')->user()->avatar }}" alt="avatar">
              @else
              {{ strtoupper(substr(auth('phy70')->user()->name, 0, 1)) }}
              @endif
            </div>
            <div class="user-info-text">
              <span class="user-name">{{ auth('phy70')->user()->name }}</span>
              <span class="user-org">{{ auth('phy70')->user()->organization->name ?? '' }} ({{
                ucfirst(auth('phy70')->user()->role) }})</span>
            </div>
          </a>
          <form action="{{ route('phy70.logout') }}" method="POST" style="margin: 0;">
            @csrf
            <button type="submit" class="btn-logout">ออกจากระบบ</button>
          </form>
          @else
          <a href="{{ route('phy70.login') }}" class="btn-secondary"
            style="padding: 8px 18px; font-size: 13px;">เข้าสู่ระบบ</a>
          <a href="{{ route('phy70.register') }}" class="btn-primary"
            style="padding: 8px 18px; font-size: 13px;">สร้างบัญชีผู้ใช้ใหม่</a>
          @endauth
        </div>
      </div>
    </div>
  </nav>
  <!-- Theme Toggle Button -->
  <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
    <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
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
    <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </button>

  {{ $slot }}

  {{-- Vite JS --}}
  {{-- {{ module_vite('build-phy70', 'resources/assets/js/app.js') }} --}}


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