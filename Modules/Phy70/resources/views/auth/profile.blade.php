<x-phy70::layouts.master>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
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
      --success: #10b981;

      --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    body {
      background-color: var(--bg-base) !important;
      color: var(--text-main);
      font-family: 'Outfit', 'Prompt', sans-serif;
      min-height: 100vh;
    }

    .profile-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 0 24px;
      position: relative;
      z-index: 10;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .title {
      font-size: 28px;
      font-weight: 600;
      font-family: 'Prompt', sans-serif;
      letter-spacing: -0.5px;
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
      color: var(--text-main);
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

    .form-control:disabled {
      background: rgba(255, 255, 255, 0.01);
      color: var(--text-muted);
      cursor: not-allowed;
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

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-main);
      padding: 10px 18px;
      border-radius: 99px;
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      transition: var(--transition-smooth);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .alert {
      padding: 12px 16px;
      border-radius: 12px;
      margin-bottom: 24px;
      font-size: 13px;
      line-height: 1.4;
    }

    .alert-success {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success);
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    .alert-error {
      background: rgba(239, 68, 68, 0.1);
      color: var(--danger);
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .section-title {
      margin: 32px 0 16px;
      font-size: 16px;
      font-weight: 600;
      color: var(--secondary);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 8px;
    }

    .bg-glow {
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 0;
    }
  </style>

  <div class="bg-glow"></div>

  <div class="profile-container">
    <div class="header">
      <h2 class="title">ข้อมูลส่วนตัว</h2>
      <a href="/app/phy70" class="btn-secondary">กลับหน้าหลัก</a>
    </div>

    @if(session('success'))
      <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if(session('error'))
      <div class="alert alert-error">{{ session('error') }}</div>
    @endif

    @if($errors->any())
      <div class="alert alert-error">
        <ul style="padding-left: 20px; margin: 0;">
          @foreach($errors->all() as $error)
            <li>{{ $error }}</li>
          @endforeach
        </ul>
      </div>
    @endif

    <div class="glass-card">
      <form action="{{ route('phy70.profile.update') }}" method="POST">
        @csrf
        
        <div class="form-group">
          <label class="form-label">อีเมลเข้าใช้งาน (ไม่สามารถเปลี่ยนได้)</label>
          <input type="text" class="form-control" value="{{ $user->email }}" disabled>
        </div>

        <div class="form-group">
          <label class="form-label" for="name">ชื่อ-นามสกุล</label>
          <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $user->name) }}" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="phone_number">เบอร์โทรศัพท์ติดต่อ</label>
          <input type="text" id="phone_number" name="phone_number" class="form-control" value="{{ old('phone_number', $user->phone_number) }}">
        </div>

        <h3 class="section-title">เปลี่ยนรหัสผ่าน (เว้นว่างไว้หากไม่ต้องการเปลี่ยน)</h3>

        <div class="form-group">
          <label class="form-label" for="current_password">รหัสผ่านปัจจุบัน</label>
          <input type="password" id="current_password" name="current_password" class="form-control" placeholder="••••••••">
        </div>

        <div class="form-group">
          <label class="form-label" for="password">รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)</label>
          <input type="password" id="password" name="password" class="form-control" placeholder="••••••••">
        </div>

        <div class="form-group">
          <label class="form-label" for="password_confirmation">ยืนยันรหัสผ่านใหม่</label>
          <input type="password" id="password_confirmation" name="password_confirmation" class="form-control" placeholder="••••••••">
        </div>

        <button type="submit" class="btn-submit">บันทึกข้อมูล</button>
      </form>
    </div>
  </div>
</x-phy70::layouts.master>
