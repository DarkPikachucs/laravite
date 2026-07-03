<x-phy70::layouts.master>
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
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
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;

      --text-main: #f8fafc;
      --text-muted: #94a3b8;

      --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      padding: 40px 24px;
      z-index: 10;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    .title {
      font-size: 24px;
      font-weight: 600;
      font-family: 'Prompt', sans-serif;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .glass-card {
      background: var(--bg-surface);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-glow);
      border-radius: 20px;
      padding: 28px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      margin-bottom: 24px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      font-family: 'Prompt', sans-serif;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--secondary);
    }

    /* Form Controls */
    .form-group {
      margin-bottom: 16px;
    }

    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 6px;
      color: var(--text-muted);
      font-family: 'Prompt', sans-serif;
    }

    .form-control {
      width: 100%;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
      color: #fff;
      font-family: inherit;
      font-size: 14px;
      outline: none;
      transition: var(--transition-smooth);
    }

    .form-control:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    /* Buttons */
    .btn-action {
      background: linear-gradient(135deg, var(--primary) 0%, rgba(99, 102, 241, 0.8) 100%);
      border: none;
      color: #fff;
      padding: 10px 20px;
      border-radius: 10px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px var(--primary-glow);
      transition: var(--transition-smooth);
      text-decoration: none;
    }

    .btn-action:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-main);
      padding: 10px 20px;
      border-radius: 10px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition-smooth);
      text-decoration: none;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    /* Grid */
    .management-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }

    @media (max-width: 900px) {
      .management-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Users Table */
    .table-responsive {
      width: 100%;
      overflow-x: auto;
    }

    .custom-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      text-align: left;
    }

    .custom-table th {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
      font-weight: 500;
    }

    .custom-table td {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }

    .role-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .role-admin {
      background: rgba(6, 182, 212, 0.15);
      color: var(--secondary);
    }

    .role-user {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-muted);
    }

    .role-superadmin {
      background: rgba(99, 102, 241, 0.2);
      color: var(--primary);
      border: 1px solid rgba(99, 102, 241, 0.4);
    }

    /* Alerts & Info box */
    .alert {
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 13px;
      margin-bottom: 20px;
    }

    .alert-success {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      color: var(--success);
    }

    .alert-danger {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: var(--danger);
    }

    /* Invitation Box */
    .invitation-link-box {
      background: rgba(16, 185, 129, 0.05);
      border: 1px dashed rgba(16, 185, 129, 0.3);
      border-radius: 12px;
      padding: 16px;
      margin-top: 16px;
    }

    .invitation-url {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 8px 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: var(--success);
      word-break: break-all;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .btn-copy {
      background: var(--success);
      color: #fff;
      border: none;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-family: 'Prompt', sans-serif;
      font-size: 11px;
      font-weight: 500;
      flex-shrink: 0;
      transition: var(--transition-smooth);
    }

    .btn-copy:hover {
      opacity: 0.9;
    }

    /* Modal Overlay */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(6, 9, 19, 0.85);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: var(--transition-smooth);
    }

    .modal-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-box {
      background: #0f172a;
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 20px;
      width: 90%;
      max-width: 440px;
      padding: 28px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
      transform: scale(0.95);
      transition: var(--transition-smooth);
    }

    .modal-overlay.active .modal-box {
      transform: scale(1);
    }

    .modal-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      font-family: 'Prompt', sans-serif;
    }

    .bg-glow {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
      top: 20%;
      right: 10%;
      pointer-events: none;
      z-index: 0;
    }
  </style>

  <div class="bg-glow"></div>

  <div class="dashboard-container">
    <header class="header">
      <h2 class="title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        จัดการสมาชิกภายในหน่วยงาน
      </h2>
      <a href="/app/phy70" class="btn-secondary">← กลับแดชบอร์ด</a>
    </header>

    <!-- Messages -->
    @if(session('success'))
    <div class="alert alert-success">
      {{ session('success') }}
    </div>
    @endif

    @if($errors->any())
    <div class="alert alert-danger">
      <ul>
        @foreach($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
      </ul>
    </div>
    @endif

    <!-- Invitation Link Created Feedback -->
    @if(session('invitation_link'))
    @php
    $orgName = auth('phy70')->user()->organization->name ?? 'หน่วยงานของคุณ';
    $mailSubject = "📩 คำเชิญเข้าร่วมระบบ PHY70 จาก " . $orgName;
    $mailBody = "👋 สวัสดีครับ/ค่ะ,\n\nคุณได้รับคำเชิญเข้าร่วมระบบ PHY70 (ระบบเสนอโครงการจังหวัดเพชรบูรณ์ ปี
    2570)\nในนามของหน่วยงาน: 🏢 " . $orgName . "\n\n👉
    กรุณาคลิกลิงก์ด้านล่างเพื่อสร้างบัญชีผู้ใช้และเข้าร่วมเครือข่ายของเรา:\n" . session('invitation_link') .
    "\n\nขอบคุณครับ";
    @endphp
    <div class="invitation-link-box">
      <div
        style="font-weight: 600; color: var(--success); display: flex; align-items: center; gap: 6px; font-size: 14px;">
        <span>✓ สร้างลิงก์คำเชิญสำหรับ {{ session('invited_email') }} ในนาม 🏢 {{ $orgName }} สำเร็จ!</span>
      </div>
      <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 4px;">
        ส่งลิงก์ด้านล่างนี้ให้ผู้รับเชิญเพื่อกรอกรหัสผ่านและสร้างบัญชีภายใต้หน่วยงานของท่าน:
      </p>
      <div class="invitation-url">
        <span id="target-invite-link">{{ session('invitation_link') }}</span>
        <div style="display: flex; gap: 8px; flex-shrink: 0;">
          <button class="btn-copy" onclick="copyInvitationLink()">คัดลอกลิงก์</button>
          <a href="mailto:{{ session('invited_email') }}?subject={{ rawurlencode($mailSubject) }}&body={{ rawurlencode($mailBody) }}"
            style="background: var(--primary); color: #fff; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-family: 'Prompt', sans-serif; font-size: 11px; font-weight: 500; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;"
            onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              style="margin-right: 4px;">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            ส่งอีเมล
          </a>
        </div>
      </div>
    </div>
    @endif

    <div class="management-grid">
      <!-- Left: Users List -->
      <div class="glass-card">
        <h3 class="section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          รายชื่อผู้ใช้งานทั้งหมด
        </h3>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>ชื่อผู้ใช้</th>
                <th>อีเมล</th>
                <th>หมายเลขโทรศัพท์</th>
                <th>บทบาท</th>
                <th>เชื่อมต่อ Google</th>
                <th style="text-align: right;">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              @foreach($users as $user)
              <tr>
                <td style="font-weight: 500;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 15px;">{{ $user->name }}</span>
                  </div>
                </td>
                <td style="color: var(--text-muted);">{{ $user->email }}</td>
                <td style="color: var(--text-muted);">{{ $user->phone_number ?: 'ไม่ระบุ' }}</td>
                <td>
                  <span class="role-badge role-{{ $user->role }}">{{ $user->role }}</span>
                </td>
                <td>
                  @if($user->google_id)
                  <span
                    style="color: var(--success); font-size: 12px; display: inline-flex; align-items: center; gap: 4px;">
                    🟢 เชื่อมต่อแล้ว
                  </span>
                  @else
                  <span style="color: var(--text-muted); font-size: 12px;">ไม่ได้เชื่อมต่อ</span>
                  @endif
                </td>
                <td style="text-align: right;">
                  <button class="btn-secondary" style="padding: 6px 12px; font-size: 12px; border-radius: 8px;"
                    onclick="openResetModal('{{ $user->id }}', '{{ $user->name }}')">
                    รีเซ็ตรหัสผ่าน
                  </button>
                </td>
              </tr>
              @endforeach
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right: Invite New User & Settings -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Invite Form -->
        <div class="glass-card">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
            เชิญผู้ร่วมงานใหม่
          </h3>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
            ระบุอีเมลผู้ประสานงานในหน่วยงานของท่านเพื่อสร้าง Invitation Link ในการสมัครสมาชิก
          </p>

          <form action="{{ route('phy70.users.invite') }}" method="POST">
            @csrf
            <div class="form-group">
              <label class="form-label" for="invite_email">อีเมลเป้าหมาย</label>
              <input type="email" id="invite_email" name="email" class="form-control" placeholder="staff@agency.com"
                required>
            </div>
            <button type="submit" class="btn-action" style="width: 100%;">+ สร้างลิงก์เชิญผู้ใช้</button>
          </form>
        </div>

        <!-- Google Link Linkage -->
        <div class="glass-card"
          style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%);">
          <h3 class="section-title" style="color: var(--secondary); margin-bottom: 12px;">
            Google Login Link
          </h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px;">
            ท่านสามารถเชื่อมโยงบัญชีนี้เข้ากับระบบ Google Login ของตัวท่านเอง
            เพื่อความปลอดภัยและการเข้าถึงที่รวดเร็วขึ้น
          </p>

          @if(auth('phy70')->user()->google_id)
          <div
            style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 10px 14px; border-radius: 8px; color: var(--success); font-size: 12.5px; font-weight: 500; text-align: center;">
            ✓ บัญชีของคุณเชื่อมต่อกับ Google แล้ว
          </div>
          @else
          <a href="{{ route('phy70.google.redirect') }}?link=1" class="btn-secondary"
            style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 12.5px;">
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.47h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.73-4.88 3.73-8.52z" />
            </svg>
            เชื่อมต่อบัญชี Google ของฉัน
          </a>
          @endif
        </div>
      </div>
    </div>
  </div>

  <!-- Reset Password Modal -->
  <div class="modal-overlay" id="reset-modal" onclick="closeResetModal()">
    <div class="modal-box" onclick="event.stopPropagation()">
      <h4 class="modal-title">รีเซ็ตรหัสผ่าน</h4>
      <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
        รีเซ็ตรหัสผ่านสำหรับผู้ใช้งาน: <strong id="reset-username" style="color: #fff;">-</strong>
      </p>

      <form id="reset-password-form" method="POST" action="">
        @csrf
        <div class="form-group">
          <label class="form-label" for="new_password">รหัสผ่านใหม่</label>
          <input type="password" id="new_password" name="password" class="form-control" placeholder="••••••••" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="new_password_confirm">ยืนยันรหัสผ่านใหม่</label>
          <input type="password" id="new_password_confirm" name="password_confirmation" class="form-control"
            placeholder="••••••••" required>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
          <button type="button" class="btn-secondary" onclick="closeResetModal()">ยกเลิก</button>
          <button type="submit" class="btn-action">บันทึกรหัสผ่าน</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    function copyInvitationLink() {
            const linkText = document.getElementById('target-invite-link').innerText;
            navigator.clipboard.writeText(linkText).then(() => {
                alert('คัดลอกลิงก์เชิญไปยังคลิปบอร์ดแล้ว!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }

        function openResetModal(userId, username) {
            document.getElementById('reset-username').innerText = username;
            
            // Set action URL dynamic
            const form = document.getElementById('reset-password-form');
            form.action = `/app/phy70/users/${userId}/reset-password`;

            document.getElementById('reset-modal').classList.add('active');
        }

        function closeResetModal() {
            document.getElementById('reset-modal').classList.remove('active');
            document.getElementById('new_password').value = '';
            document.getElementById('new_password_confirm').value = '';
        }
  </script>
</x-phy70::layouts.master>