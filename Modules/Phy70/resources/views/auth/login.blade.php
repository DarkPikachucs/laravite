<x-phy70::layouts.master>
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap"
    rel="stylesheet">

  <style>
    :root {
      --bg-base: #060913;
      --bg-surface: rgba(15, 23, 42, 0.6);
      --border-glow: rgba(99, 102, 241, 0.15);
      --border-glow-hover: rgba(6, 182, 212, 0.4);

      --primary: #6366f1;
      --primary-glow: rgba(99, 102, 241, 0.35);
      --secondary: #06b6d4;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --danger: #ef4444;

      --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    body {
      background-color: var(--bg-base) !important;
      color: var(--text-main);
      font-family: 'Outfit', 'Prompt', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .auth-container {
      width: 100%;
      max-width: 440px;
      z-index: 10;
    }

    .glass-card {
      background: var(--bg-surface);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-glow);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
      transition: var(--transition-smooth);
    }

    .glass-card:hover {
      border-color: rgba(6, 182, 212, 0.25);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .auth-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      font-family: 'Prompt', sans-serif;
    }

    .auth-subtitle {
      color: var(--text-muted);
      font-size: 14px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--text-muted);
      font-family: 'Prompt', sans-serif;
    }

    .form-control {
      width: 100%;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 12px 16px;
      color: #fff;
      font-family: inherit;
      font-size: 14px;
      transition: var(--transition-smooth);
      outline: none;
    }

    .form-control:focus {
      border-color: var(--primary);
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    }

    .btn-submit {
      width: 100%;
      background: linear-gradient(135deg, var(--primary) 0%, rgba(99, 102, 241, 0.8) 100%);
      border: none;
      color: #fff;
      padding: 14px;
      border-radius: 12px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 14px var(--primary-glow);
      transition: var(--transition-smooth);
      margin-top: 10px;
    }

    .btn-submit:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
    }

    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 24px 0;
      color: var(--text-muted);
      font-size: 12px;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .divider:not(:empty)::before {
      margin-right: .5em;
    }

    .divider:not(:empty)::after {
      margin-left: .5em;
    }

    .btn-google {
      width: 100%;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #fff;
      padding: 12px;
      border-radius: 12px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: var(--transition-smooth);
      text-decoration: none;
    }

    .btn-google:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .auth-footer {
      text-align: center;
      margin-top: 24px;
      font-size: 13.5px;
      color: var(--text-muted);
    }

    .auth-footer a {
      color: var(--secondary);
      text-decoration: none;
      font-weight: 500;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }

    /* Error alert */
    .alert {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: var(--danger);
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 13px;
      margin-bottom: 24px;
      line-height: 1.4;
    }

    .alert ul {
      padding-left: 20px;
    }

    /* Background glows */
    .bg-glow {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 0;
    }
  </style>

  <div class="bg-glow"></div>

  <div class="auth-container">
    <div class="glass-card">
      <div class="auth-header">
        <h2 class="auth-title">เข้าสู่ระบบ PHY70</h2>
        <p class="auth-subtitle">ระบบจัดส่งและติดตามข้อเสนอโครงการ</p>
      </div>

      <!-- Errors or feedback -->
      @if($errors->any())
      <div class="alert">
        <ul>
          @foreach($errors->all() as $error)
          <li>{{ $error }}</li>
          @endforeach
        </ul>
      </div>
      @endif

      @if(session('error'))
      <div class="alert">
        {{ session('error') }}
      </div>
      @endif

      @if(session('info'))
      <div class="alert"
        style="background: rgba(6, 182, 212, 0.1); border-color: rgba(6, 182, 212, 0.2); color: var(--secondary);">
        {{ session('info') }}
      </div>
      @endif

      <form action="{{ route('phy70.login') }}" method="POST">
        @csrf
        <div class="form-group">
          <label class="form-label" for="email">อีเมลหน่วยงาน / ผู้ใช้งาน</label>
          <input type="email" id="email" name="email" class="form-control" placeholder="example@email.com"
            value="{{ old('email') }}" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="password">รหัสผ่าน</label>
          <input type="password" id="password" name="password" class="form-control" placeholder="••••••••" required>
        </div>

        <button type="submit" class="btn-submit">เข้าสู่ระบบ</button>
      </form>
      {{--
      <div class="divider">หรือ</div>

      <a href="{{ route('phy70.google.redirect') }}" class="btn-google">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#EA4335"
            d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.68 1.48 7.58l3.99 3.1C6.4 7.64 8.98 5.04 12 5.04z" />
          <path fill="#4285F4"
            d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.47h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.73-4.88 3.73-8.52z" />
          <path fill="#FBBC05"
            d="M5.47 14.48c-.23-.69-.37-1.43-.37-2.2s.14-1.51.37-2.2L1.48 6.98C.53 8.88 0 11 0 13.2s.53 4.32 1.48 6.22l3.99-3.1-1-.84z" />
          <path fill="#34A853"
            d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.01.68-2.31 1.09-4.3 1.09-3.02 0-5.6-2.6-6.53-5.64L1.48 15.8C3.37 19.7 7.35 23 12 23z" />
        </svg>
        ลงชื่อเข้าใช้ด้วย Google
      </a>
      --}}
      <div class="auth-footer">
        ยังไม่มีบัญชีหน่วยงาน? <a href="{{ route('phy70.register') }}">ลงทะเบียนใหม่ที่นี่</a>
      </div>

      <div style="text-align: center; margin-top: 16px;">
        <a href="/app/phy70" style="font-size: 13px; color: var(--text-muted); text-decoration: none;">←
          กลับสู่หน้าหลัก</a>
      </div>
    </div>
  </div>
</x-phy70::layouts.master>