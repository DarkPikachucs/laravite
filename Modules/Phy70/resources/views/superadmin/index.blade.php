<x-phy70::layouts.master>
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap"
    rel="stylesheet">

  <style>
    :root {
      --bg-base: #060913;
      --bg-surface: rgba(15, 23, 42, 0.6);
      --border-glow: rgba(99, 102, 241, 0.15);

      --primary: #6366f1;
      --secondary: #06b6d4;
      --success: #10b981;
      --danger: #ef4444;

      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }

    body {
      background-color: var(--bg-base) !important;
      color: var(--text-main);
      font-family: 'Outfit', 'Prompt', sans-serif;
      min-height: 100vh;
    }

    .dashboard-container {
      max-width: 1400px;
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

    .glass-card {
      background: var(--bg-surface);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border-glow);
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 24px;
    }

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

    .btn-action {
      background: var(--primary);
      color: #fff;
      border: none;
      padding: 6px 12px;
      border-radius: 8px;
      font-family: inherit;
      font-size: 12px;
      cursor: pointer;
    }

    .btn-danger {
      background: rgba(239, 68, 68, 0.1);
      color: var(--danger);
      border: 1px solid rgba(239, 68, 68, 0.3);
      padding: 6px 12px;
      border-radius: 8px;
      font-family: inherit;
      font-size: 12px;
      cursor: pointer;
    }

    .form-control {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 13px;
    }

    .tabs {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }

    .tab {
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      cursor: pointer;
      transition: 0.3s;
    }

    .tab.active {
      background: var(--primary);
      color: white;
      font-weight: 600;
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }
  </style>

  <div class="dashboard-container">
    <header class="header">
      <h2 style="font-size: 24px; display: flex; align-items: center; gap: 12px;">
        <span style="background: var(--primary); padding: 8px; border-radius: 12px;">👑</span>
        Superadmin Dashboard
      </h2>
      <div style="display: flex; gap: 16px; align-items: center;">
        <a href="{{ route('phy70.superadmin.document_builder') }}" class="btn-action" style="text-decoration: none; padding: 10px 16px; font-size: 14px;">📄 สร้างเอกสาร / แบบฟอร์ม จ.1</a>
        <a href="/app/phy70" style="color: var(--secondary); text-decoration: none;">← กลับแดชบอร์ดหลัก</a>
      </div>
    </header>

    @if(session('success'))
    <div
      style="background: rgba(16,185,129,0.1); color: var(--success); padding: 12px; border-radius: 8px; margin-bottom: 20px;">
      {{ session('success') }}
    </div>
    @endif
    @if($errors->any())
    <div
      style="background: rgba(239,68,68,0.1); color: var(--danger); padding: 12px; border-radius: 8px; margin-bottom: 20px;">
      {{ $errors->first() }}
    </div>
    @endif

    <div class="tabs">
      <div class="tab active" onclick="switchTab('orgs')">หน่วยงาน ({{ $organizations->count() }})</div>
      <div class="tab" onclick="switchTab('users')">ผู้ใช้งาน ({{ $users->count() }})</div>
      <div class="tab" onclick="switchTab('proposals')">โครงการ ({{ $proposals->count() }})</div>
    </div>

    <!-- Orgs Tab -->
    <div id="orgs" class="tab-content active glass-card">
      <h3 style="margin-bottom: 16px; color: var(--secondary);">จัดการหน่วยงาน</h3>
      <table class="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ชื่อหน่วยงาน</th>
            <th>จำนวนผู้ใช้</th>
            <th>จำนวนโครงการ</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          @foreach($organizations as $org)
          <tr>
            <td>{{ $org->id }}</td>
            <td>
              <form action="{{ route('phy70.superadmin.org.update', $org->id) }}" method="POST"
                style="display:flex; gap:8px;">
                @csrf
                <input type="text" name="name" value="{{ $org->name }}" class="form-control" style="width: 200px;">
                <button type="submit" class="btn-action">บันทึก</button>
              </form>
            </td>
            <td>{{ $org->users_count }}</td>
            <td>{{ $org->proposals_count }}</td>
            <td>
              <form action="{{ route('phy70.superadmin.org.delete', $org->id) }}" method="POST"
                onsubmit="return confirm('ยืนยันการลบหน่วยงานนี้? ข้อมูลที่เกี่ยวข้องจะถูกลบทั้งหมด');">
                @csrf @method('DELETE')
                <button type="submit" class="btn-danger">ลบ</button>
              </form>
            </td>
          </tr>
          @endforeach
        </tbody>
      </table>
    </div>

    <!-- Users Tab -->
    <div id="users" class="tab-content glass-card">
      <h3 style="margin-bottom: 16px; color: var(--secondary);">จัดการผู้ใช้งาน</h3>
      <table class="custom-table">
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>อีเมล</th>
            <th>หน่วยงาน</th>
            <th>สิทธิ์</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          @foreach($users as $u)
          <tr>
            <td>{{ $u->name }}</td>
            <td>{{ $u->email }}</td>
            <td>{{ $u->organization->name ?? '-' }}</td>
            <td>
              <form action="{{ route('phy70.superadmin.user.role', $u->id) }}" method="POST"
                style="display:flex; gap:8px;">
                @csrf
                <select name="role" class="form-control">
                  <option value="user" {{ $u->role == 'user' ? 'selected' : '' }}>User</option>
                  <option value="admin" {{ $u->role == 'admin' ? 'selected' : '' }}>Admin</option>
                  <option value="superadmin" {{ $u->role == 'superadmin' ? 'selected' : '' }}>Superadmin</option>
                </select>
                <button type="submit" class="btn-action">อัปเดต</button>
              </form>
            </td>
            <td>
              <div style="display:flex; gap:8px;">
                <form id="reset_pwd_form_{{ $u->id }}" action="{{ route('phy70.users.reset-password', $u->id) }}" method="POST" style="display:none;">
                    @csrf
                    <input type="hidden" name="password" value="">
                    <input type="hidden" name="password_confirmation" value="">
                </form>
                <button type="button" class="btn-action" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.4);" onclick="resetUserPassword({{ $u->id }})">รีเซ็ตรหัส</button>
                
                <form action="{{ route('phy70.superadmin.user.delete', $u->id) }}" method="POST"
                  onsubmit="return confirm('ยืนยันการลบบัญชีนี้?');">
                  @csrf @method('DELETE')
                  <button type="submit" class="btn-danger">ลบ</button>
                </form>
              </div>
            </td>
          </tr>
          @endforeach
        </tbody>
      </table>
    </div>

    <!-- Proposals Tab -->
    <div id="proposals" class="tab-content glass-card">
      <h3 style="margin-bottom: 16px; color: var(--secondary);">จัดการโครงการ</h3>
      <table class="custom-table">
        <thead>
          <tr>
            <th>ชื่อโครงการ</th>
            <th>หน่วยงาน</th>
            <th>ผู้เสนอ</th>
            <th>สถานะ</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          @foreach($proposals as $p)
          <tr>
            <td>{{ $p->project_name }}</td>
            <td>{{ $p->organization->name ?? '-' }}</td>
            <td>{{ $p->user->name ?? '-' }}</td>
            <td>
              <form action="{{ route('phy70.superadmin.proposal.status', $p->id) }}" method="POST"
                style="display:flex; gap:8px;">
                @csrf
                <select name="status" class="form-control">
                  <option value="draft" {{ $p->status == 'draft' ? 'selected' : '' }}>แบบร่าง</option>
                  <option value="submitted" {{ $p->status == 'submitted' ? 'selected' : '' }}>ส่งแล้ว</option>
                  <option value="approved" {{ $p->status == 'approved' ? 'selected' : '' }}>อนุมัติ</option>
                  <option value="rejected" {{ $p->status == 'rejected' ? 'selected' : '' }}>ปฏิเสธ</option>
                </select>
                <button type="submit" class="btn-action">อัปเดต</button>
              </form>
            </td>
            <td style="display: flex; gap: 8px;">
              <a href="{{ route('phy70.proposal.show', $p->id) }}" class="btn-action"
                style="text-decoration: none; padding: 6px 10px;">เปิดดู</a>
              <a href="{{ route('phy70.superadmin.proposal.edit', $p->id) }}" class="btn-secondary"
                style="text-decoration: none; padding: 6px 10px; color: var(--secondary); border-color: rgba(6, 182, 212, 0.4);">แก้ไข</a>
              <form action="{{ route('phy70.superadmin.proposal.delete', $p->id) }}" method="POST"
                onsubmit="return confirm('ยืนยันการลบโครงการนี้?');">
                @csrf @method('DELETE')
                <button type="submit" class="btn-danger" style="padding: 6px 10px;">ลบ</button>
              </form>
            </td>
          </tr>
          @endforeach
        </tbody>
      </table>
    </div>

  </div>

  <script>
    function switchTab(tabId) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      event.target.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    }

    function resetUserPassword(userId) {
        let pwd = prompt('กรอกรหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร):');
        if (pwd && pwd.length >= 6) {
            document.getElementById('reset_pwd_form_' + userId).querySelector('[name=password]').value = pwd;
            document.getElementById('reset_pwd_form_' + userId).querySelector('[name=password_confirmation]').value = pwd;
            document.getElementById('reset_pwd_form_' + userId).submit();
        } else if (pwd !== null) {
            alert('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
        }
    }
  </script>
</x-phy70::layouts.master>