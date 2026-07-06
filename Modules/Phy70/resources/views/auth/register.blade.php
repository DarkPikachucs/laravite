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
    }

    .auth-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 65px);
      /* Minus navbar height */
      padding: 24px;
    }

    .auth-container {
      width: 100%;
      max-width: 480px;
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
      margin-bottom: 28px;
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
      margin-bottom: 18px;
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
      margin-bottom: 20px;
      line-height: 1.4;
    }

    .alert ul {
      padding-left: 20px;
    }

    .alert-info {
      background: rgba(6, 182, 212, 0.1);
      border: 1px solid rgba(6, 182, 212, 0.2);
      color: var(--secondary);
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

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-main);
      padding: 12px 24px;
      border-radius: 12px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: var(--transition-smooth);
      text-decoration: none;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }
  </style>

  <div class="bg-glow"></div>

  <div class="auth-wrapper">
    <div class="auth-container">
      <div class="glass-card">
        <div class="auth-header">
          <h2 class="auth-title">ลงทะเบียนหน่วยงานใหม่</h2>
          <p class="auth-subtitle">สร้างองค์กรและบัญชีผู้ดูแลระบบ (Admin) หลัก</p>
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

        @if(session('info'))
        <div class="alert alert-info">
          {{ session('info') }}
        </div>
        @endif

        <form action="{{ route('phy70.register') }}" method="POST">
          @csrf

          <!-- Organization Name -->
          <div class="form-group">
            <label class="form-label" for="organization_name">ชื่อหน่วยงาน / องค์กร</label>
            <input type="text" id="organization_name" name="organization_name" list="organizations_list"
              class="form-control" placeholder="ระบุชื่อหน่วยงานของท่าน" value="{{ old('organization_name') }}" required
              autocomplete="off">
            <datalist id="organizations_list">
              @foreach($organizations as $org)
              <option value="{{ $org->name }}"></option>
              @endforeach
            </datalist>
          </div>

          <!-- Admin Name -->
          <div class="form-group">
            <label class="form-label" for="name">ชื่อ-นามสกุล ผู้ประสานงานหลัก</label>
            <input type="text" id="name" name="name" class="form-control" placeholder="ชื่อ นามสกุล"
              value="{{ old('name', session('google_name')) }}" required>
          </div>

          <!-- Admin Email -->
          <div class="form-group">
            <label class="form-label" for="email">อีเมลเข้าใช้งาน</label>
            <input type="email" id="email" name="email" class="form-control" placeholder="example@email.com"
              value="{{ old('email', session('google_email')) }}" required>
          </div>

          <!-- Phone Number -->
          <div class="form-group">
            <label class="form-label" for="phone_number">หมายเลขโทรศัพท์ติดต่อ <span
                style="color: var(--danger);">*</span></label>
            <input type="text" id="phone_number" name="phone_number" class="form-control"
              placeholder="ระบุเบอร์โทรศัพท์มือถือ" value="{{ old('phone_number') }}" required>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label class="form-label" for="password">กำหนดรหัสผ่าน (ขั้นต่ำ 6 ตัวอักษร)</label>
            <input type="password" id="password" name="password" class="form-control" placeholder="••••••••" required>
          </div>

          <!-- Password Confirmation -->
          <div class="form-group">
            <label class="form-label" for="password_confirmation">ยืนยันรหัสผ่านอีกครั้ง</label>
            <input type="password" id="password_confirmation" name="password_confirmation" class="form-control"
              placeholder="••••••••" required>
          </div>

          <button type="submit" class="btn-submit">ยืนยันและสร้างบัญชี</button>
        </form>

        <div class="auth-footer">
          มีบัญชีหน่วยงานอยู่แล้ว? <a href="{{ route('phy70.login') }}">เข้าสู่ระบบที่นี่</a>
        </div>

        <div style="text-align: center; margin-top: 16px;">
          <a href="/app/phy70" style="font-size: 13px; color: var(--text-muted); text-decoration: none;">←
            กลับสู่หน้าหลัก</a>
        </div>
      </div>
    </div>
</x-phy70::layouts.master>