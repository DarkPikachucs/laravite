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
      padding: 40px 24px;
    }

    .form-container {
      max-width: 850px;
      margin: 0 auto;
      position: relative;
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
    }

    /* Form Glass Card */
    .glass-card {
      background: var(--bg-surface);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-glow);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      margin-bottom: 32px;
    }

    .form-section {
      margin-bottom: 40px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding-bottom: 32px;
    }

    .form-section:last-of-type {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    .section-header {
      margin-bottom: 24px;
    }

    .section-title {
      font-size: 19px;
      font-weight: 600;
      color: var(--secondary);
      font-family: 'Prompt', sans-serif;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Form controls */
    .form-group {
      margin-bottom: 24px;
    }

    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #e2e8f0;
      font-family: 'Prompt', sans-serif;
    }

    .form-control {
      width: 100%;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 12px 16px;
      color: #fff;
      font-family: inherit;
      font-size: 14px;
      outline: none;
      transition: var(--transition-smooth);
    }

    select.form-control option {
      background-color: #0f172a;
      color: #f8fafc;
    }

    .form-control:disabled {
      background: rgba(255, 255, 255, 0.01) !important;
      color: rgba(255, 255, 255, 0.3) !important;
      border-color: rgba(255, 255, 255, 0.03) !important;
      cursor: not-allowed;
    }

    .form-control:focus {
      border-color: var(--primary);
      background: rgba(255, 255, 255, 0.04);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    }

    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }

    .grid-2-col {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 24px;
    }

    @media (max-width: 768px) {
      .grid-2-col {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }

    .grid-3-col {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
    }

    @media (max-width: 768px) {
      .grid-3-col {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }

    .btn-action {
      background: linear-gradient(135deg, var(--primary) 0%, rgba(99, 102, 241, 0.8) 100%);
      border: none;
      color: #fff;
      padding: 12px 24px;
      border-radius: 12px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 14px var(--primary-glow);
      transition: var(--transition-smooth);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-action:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
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
      transition: var(--transition-smooth);
      text-decoration: none;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    /* Error alert */
    .alert {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: var(--danger);
      padding: 16px 20px;
      border-radius: 12px;
      margin-bottom: 24px;
      font-size: 13.5px;
    }

    .bg-glow {
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 0;
    }

    /* Selection display styles */
    .selection-display-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px dashed rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 20px;
      transition: var(--transition-smooth);
    }

    .selection-display-box.selected {
      background: rgba(6, 182, 212, 0.04);
      border: 1px dashed rgba(6, 182, 212, 0.3);
    }

    .display-field {
      margin-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      padding-bottom: 12px;
    }

    .display-field:last-child {
      margin-bottom: 0;
      border-bottom: none;
      padding-bottom: 0;
    }

    .display-label {
      font-size: 12.5px;
      color: var(--secondary);
      font-weight: 600;
      margin-bottom: 6px;
      font-family: 'Prompt', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .display-value {
      font-size: 14.5px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .selection-display-box.selected .display-value {
      color: #fff;
    }

    /* Modal styles */
    .custom-modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(6, 9, 19, 0.85);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .custom-modal.active {
      display: flex;
    }

    .modal-content {
      background: #0b0f19;
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 24px;
      width: 100%;
      max-width: 750px;
      max-height: 85vh;
      overflow-y: auto;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
      animation: modalSlide 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
    }

    @keyframes modalSlide {
      from { transform: translateY(15px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      background: #0b0f19;
      z-index: 10;
    }

    .modal-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--secondary);
      font-family: 'Prompt', sans-serif;
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 28px;
      cursor: pointer;
      transition: var(--transition-smooth);
      line-height: 1;
    }

    .modal-close:hover {
      color: #fff;
    }

    .modal-body {
      padding: 24px;
      overflow-y: auto;
      flex-grow: 1;
    }

    /* Selection Tree Styles */
    .selection-tree {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .tree-node {
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.01);
      overflow: hidden;
      transition: var(--transition-smooth);
    }

    .tree-node-header {
      padding: 14px 18px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.02);
      transition: var(--transition-smooth);
      font-family: 'Prompt', sans-serif;
      user-select: none;
    }

    .tree-node-header:hover {
      background: rgba(99, 102, 241, 0.1);
      color: #fff;
    }

    .tree-node-header .arrow {
      font-size: 10px;
      transition: transform 0.3s ease;
      color: var(--text-muted);
    }

    .tree-node.open > .tree-node-header .arrow {
      transform: rotate(180deg);
      color: var(--secondary);
    }

    .tree-node-body {
      display: none;
      padding: 12px 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(0, 0, 0, 0.15);
    }

    .tree-node.open > .tree-node-body {
      display: block;
    }

    .tree-leaf-item {
      padding: 12px 16px;
      cursor: pointer;
      border-radius: 8px;
      font-size: 13.5px;
      margin-bottom: 8px;
      transition: var(--transition-smooth);
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      line-height: 1.5;
    }

    .tree-leaf-item:last-child {
      margin-bottom: 0;
    }

    .tree-leaf-item:hover {
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%);
      border-color: var(--secondary);
      color: #fff;
    }
  </style>

  <div class="bg-glow"></div>

  <div class="form-container">
    <header class="header">
      <h2 class="title">จัดทำข้อเสนอโครงการจังหวัดเพชรบูรณ์ ปีงบประมาณ 2570</h2>
      <a href="/app/phy70" class="btn-secondary">ยกเลิก</a>
    </header>

    <!-- Display Errors -->
    @if($errors->any())
    <div class="alert">
      <div style="font-weight: 600; margin-bottom: 8px;">กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน:</div>
      <ul style="padding-left: 20px;">
        @foreach($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
      </ul>
    </div>
    @endif

    <div class="glass-card">
      <form action="{{ route('phy70.proposal.store') }}" method="POST" id="proposal-form" enctype="multipart/form-data">
        @csrf

        <!-- ================== SECTION 1 ================== -->
        <div class="form-section" id="section-2">
          <div class="section-header">
            <h3 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6Z"/>
              </svg>
              ส่วนที่ 1: ความสอดคล้องระดับจังหวัด (จังหวัดเพชรบูรณ์)
            </h3>
          </div>

          <!-- Hidden inputs for validation & database submission -->
          <input type="hidden" id="province_issue" name="province_issue" value="{{ old('province_issue') }}" required>
          <input type="hidden" id="development_guideline" name="development_guideline" value="{{ old('development_guideline') }}" required>
          <input type="hidden" id="main_plan" name="main_plan" value="{{ old('main_plan') }}" required>
          <input type="hidden" id="plan" name="plan" value="{{ old('plan') }}" required>

          <div class="form-group">
            <label class="form-label">ข้อมูลเป้าหมายและแผนความสอดคล้องระดับจังหวัดที่เลือก <span style="color: var(--danger);">*</span></label>
            
            <div class="selection-display-box" id="provincial-display-box">
              <div class="display-field">
                <div class="display-label">ประเด็นการพัฒนาจังหวัด</div>
                <div class="display-value" id="disp_province_issue">— ยังไม่ได้เลือก —</div>
              </div>
              <div class="display-field">
                <div class="display-label">แนวทางการพัฒนา</div>
                <div class="display-value" id="disp_development_guideline">— ยังไม่ได้เลือก —</div>
              </div>
              <div class="display-field">
                <div class="display-label">แผนงานหลัก</div>
                <div class="display-value" id="disp_main_plan">— ยังไม่ได้เลือก —</div>
              </div>
              <div class="display-field">
                <div class="display-label">แผนงาน</div>
                <div class="display-value" id="disp_plan">— ยังไม่ได้เลือก —</div>
              </div>
            </div>

            <button type="button" class="btn-action" onclick="openModal('provincial-modal')">
              🔍 คลิกเพื่อเลือกความสอดคล้องระดับจังหวัด
            </button>
          </div>
        </div>

        <!-- ================== SECTION 2 ================== -->
        <div class="form-section" id="section-3">
          <div class="section-header">
            <h3 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
              ส่วนที่ 2: รายละเอียดข้อเสนอโครงการและผู้ประสานงาน
            </h3>
          </div>

          <!-- Target Area (พื้นที่เป้าหมาย) -->
          <div class="form-group">
            <label class="form-label">พื้นที่เป้าหมายการดำเนินโครงการ <span style="color: var(--danger);">*</span></label>
            <div class="grid-3-col">
              <div>
                <label class="form-label" for="target_province" style="font-size: 12px; color: var(--text-muted);">จังหวัด</label>
                <select id="target_province" name="target_province" class="form-control" required>
                  <option value="เพชรบูรณ์" selected>เพชรบูรณ์</option>
                </select>
              </div>
              <div>
                <label class="form-label" for="target_district" style="font-size: 12px; color: var(--text-muted);">อำเภอ</label>
                <select id="target_district" name="target_district" class="form-control">
                  <option value="">-- เลือกอำเภอ --</option>
                </select>
              </div>
              <div>
                <label class="form-label" for="target_subdistrict" style="font-size: 12px; color: var(--text-muted);">ตำบล</label>
                <select id="target_subdistrict" name="target_subdistrict" class="form-control" disabled>
                  <option value="">-- เลือกตำบล --</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="project_name">ชื่อโครงการ <span style="color: var(--danger);">*</span></label>
            <input type="text" id="project_name" name="project_name" class="form-control"
              placeholder="กรุณาระบุชื่อโครงการเต็ม" value="{{ old('project_name') }}" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="main_activity">กิจกรรมหลัก <span style="color: var(--danger);">*</span></label>
            <textarea id="main_activity" name="main_activity" class="form-control"
              placeholder="ระบุรายละเอียดกระบวนงานหรือกิจกรรมหลักของโครงการ" required>{{ old('main_activity') }}</textarea>
          </div>

          <div class="grid-2-col">
            <div class="form-group">
              <label class="form-label" for="operating_agency">หน่วยดำเนินการ <span style="color: var(--danger);">*</span></label>
              <input type="text" id="operating_agency" name="operating_agency" class="form-control"
                value="{{ old('operating_agency', auth('phy70')->user()->organization->name) }}" readonly
                style="background: rgba(255, 255, 255, 0.04); color: rgba(255, 255, 255, 0.6); border-color: rgba(255, 255, 255, 0.05); cursor: not-allowed; width: 100%;" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="responsible_person">ผู้รับผิดชอบ <span style="color: var(--danger);">*</span></label>
              <input type="text" id="responsible_person" name="responsible_person" class="form-control"
                placeholder="ชื่อ นามสกุล" value="{{ old('responsible_person', auth('phy70')->user()->name) }}" required>
            </div>
          </div>

          <div class="grid-2-col">
            <div class="form-group">
              <label class="form-label" for="position">ตำแหน่ง <span style="color: var(--danger);">*</span></label>
              <input type="text" id="position" name="position" class="form-control" placeholder="ระบุตำแหน่งสายงาน"
                value="{{ old('position') }}" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="phone_number">หมายเลขโทรศัพท์ <span style="color: var(--danger);">*</span></label>
              <input type="text" id="phone_number" name="phone_number" class="form-control"
                placeholder="เช่น 0891234567" value="{{ old('phone_number', auth('phy70')->user()->phone_number) }}" required>
            </div>
          </div>

          <div class="form-group" style="margin-top: 24px;">
            <label class="form-label">แนบไฟล์ประกอบโครงการ (สามารถแนบได้ตั้งแต่ 1 ไฟล์ขึ้นไป)</label>
            <div class="file-upload-wrapper"
              style="border: 2px dashed rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 24px; text-align: center; background: rgba(255, 255, 255, 0.02); transition: var(--transition-smooth); cursor: pointer;"
              onmouseover="this.style.borderColor='var(--primary)'"
              onmouseout="this.style.borderColor='rgba(255,255,255,0.15)'"
              onclick="document.getElementById('attachments').click()">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
                style="color: var(--text-muted); margin-bottom: 8px; margin-left: auto; margin-right: auto;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              <div style="font-size: 14px; font-weight: 500; margin-bottom: 4px;">คลิกที่นี่ เพื่อเลือกไฟล์แนบ</div>
              <div style="font-size: 12px; color: var(--text-muted);">รองรับไฟล์รูปภาพ, เอกสาร PDF, Word, Excel (ขนาดสูงสุด 10MB ต่อไฟล์)</div>
              <input type="file" id="attachments" name="attachments[]" multiple style="display: none;"
                onchange="updateFileList(this)">
            </div>
            <div id="file-list" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;"></div>
          </div>
        </div>

        <!-- ================== SECTION 3 ================== -->
        <div class="form-section" id="section-4" style="margin-top: 40px;">
          <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h3 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              ส่วนที่ 3: กิจกรรมย่อยภายใต้โครงการ
            </h3>
            <button type="button" class="btn-action" onclick="addActivity()" style="background: linear-gradient(135deg, var(--secondary) 0%, rgba(6, 182, 212, 0.8) 100%); box-shadow: 0 4px 14px rgba(6, 182, 212, 0.35);">
              ➕ เพิ่มกิจกรรม
            </button>
          </div>

          <div id="activities-container" style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 20px;">
            <!-- Dynamic activities will be appended here -->
          </div>
          
          <div id="no-activities-message" style="text-align: center; padding: 32px; background: rgba(255, 255, 255, 0.01); border: 1px dashed rgba(255,255,255,0.08); border-radius: 16px; color: var(--text-muted); font-size: 14px;">
            ยังไม่มีการเพิ่มกิจกรรมย่อย (กรุณากดปุ่ม "เพิ่มกิจกรรม" ด้านบนหากมีกิจกรรมย่อยภายใต้โครงการ)
          </div>
        </div>

        <!-- Submit Button Row -->
        <div style="text-align: right; margin-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 24px;">
          <button type="submit" class="btn-action" style="font-size: 15px; padding: 14px 28px;">
            ✓ ส่งข้อเสนอโครงการ
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ================== MODALS ================== -->
  
  <!-- Provincial Modal -->
  <div id="provincial-modal" class="custom-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">เลือกความสอดคล้องระดับจังหวัด</h4>
        <button type="button" class="modal-close" onclick="closeModal('provincial-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5;">
          คลิกเลือก <b>ประเด็นการพัฒนา</b> ➔ <b>แนวทางพัฒนา</b> ➔ <b>แผนงานหลัก</b> และ <b>แผนงานย่อย</b> ที่สอดคล้องกับโครงการของคุณ:
        </p>
        <div id="provincial-tree-container" class="selection-tree"></div>
      </div>
    </div>
  </div>

  <script>
    // Cascading Dropdown Data
    const provincialData = [
        {
            issue: "ประเด็นที่ 1: การพัฒนาเมือง ท่องเที่ยวเชิงสร้างสรรค์ และบริการสุขภาพมูลค่าสูง",
            guidelines: [
                {
                    name: "แนวทางที่ 1.1: พัฒนาศักยภาพอุตสาหกรรมท่องเที่ยวและบริการสุขภาพเชิงรุก",
                    mainPlans: [
                        {
                            name: "แผนงานหลักด้านการพัฒนาเพชรบูรณ์เป็นเมืองท่องเที่ยวและสุขภาพระดับภาค",
                            plans: [
                                "แผนงานส่งเสริมธุรกิจสปาและการดูแลสุขภาพทางเลือกเพื่อการท่องเที่ยว",
                                "แผนงานเทศกาลท่องเที่ยวเชิงสุขภาพและมหกรรมอาหารปลอดภัยชุมชน"
                            ]
                        }
                    ]
                },
                {
                    name: "แนวทางที่ 1.2: ขยายฐานการท่องเที่ยวเชิงวัฒนธรรม วิถีชีวิต และธรรมชาติเขาค้อ-ภูทับเบิก",
                    mainPlans: [
                        {
                            name: "แผนงานหลักด้านการอนุรักษ์มรดกโลกศรีเทพและการท่องเที่ยวธรรมชาติยั่งยืน",
                            plans: [
                                "แผนงานพัฒนาไกด์ชุมชนและยกระดับโฮมสเตย์รอบแหล่งโบราณคดีศรีเทพ",
                                "แผนงานส่งเสริมการอนุรักษ์วิถีชีวิตดั้งเดิมและวัฒนธรรมพื้นถิ่นเพชรบูรณ์"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            issue: "ประเด็นที่ 2: ยกระดับการผลิตสินค้าเกษตรอินทรีย์ เกษตรปลอดภัย และอุตสาหกรรมแปรรูป",
            guidelines: [
                {
                    name: "แนวทางที่ 2.1: ส่งเสริมมาตรฐานการเกษตรปลอดภัย เกษตรอินทรีย์ และ Smart Farming",
                    mainPlans: [
                        {
                            name: "แผนงานหลักด้านการปรับโครงสร้างการเกษตรสู่เกษตรมูลค่าสูงจังหวัดเพชรบูรณ์",
                            plans: [
                                "แผนงานพัฒนาแปลงเกษตรอินทรีย์อัจฉริยะต้นแบบและการใช้โดรนเพื่อการเกษตร",
                                "แผนงานอบรมมาตรฐาน GAP แก่กลุ่มเกษตรกรรุ่นใหม่จังหวัดเพชรบูรณ์"
                            ]
                        }
                    ]
                },
                {
                    name: "แนวทางที่ 2.2: เพิ่มมูลค่าสินค้าแปรรูปด้วยเทคโนโลยีและนวัตกรรมชุมชน",
                    mainPlans: [
                        {
                            name: "แผนงานหลักด้านการส่งเสริมวิสาหกรรมชุมชนและโอทอปแปรรูป",
                            plans: [
                                "แผนงานพัฒนาบรรจุภัณฑ์และเพิ่มช่องทางการตลาดดิจิทัลสินค้า OTOP",
                                "แผนงานแปรรูปพืชผลเกษตรล้นตลาดด้วยระบบอบแห้งพลังงานแสงอาทิตย์"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            issue: "ประเด็นที่ 3: เสริมสร้างความปลอดภัยทางสังคม การจัดการสิ่งแวดล้อม และสังคมผู้สูงอายุอย่างมีคุณภาพ",
            guidelines: [
                {
                    name: "แนวทางที่ 3.1: พัฒนาระบบสาธารณสุขชุมชนและความรอบรู้ด้านสุขภาพ (PHY70)",
                    mainPlans: [
                        {
                            name: "แผนงานหลักด้านการส่งเสริมและสร้างสุขภาวะภาคประชาชนคนเพชรบูรณ์ (PHY70)",
                            plans: [
                                "แผนงานขับเคลื่อนตำบลสุขภาวะรอบรู้สุขภาพระดับพื้นที่บูรณาการร่วมกับ อปท.",
                                "แผนงานเสริมสร้างความรอบรู้สุขภาพ ปรับเปลี่ยนพฤติกรรมลดความเสี่ยง NCDs",
                                "แผนงานส่งเสริมกิจกรรมทางกาย การแข่งขันกีฬาชุมชน และการพัฒนาสวนสาธารณะตำบล"
                            ]
                        }
                    ]
                },
                {
                    name: "แนวทางที่ 3.2: จัดการปัญหาสิ่งแวดล้อมและการพัฒนาเมืองอัจฉริยะอย่างปลอดภัย",
                    mainPlans: [
                        {
                            name: "แผนงานหลักด้านการบริหารจัดการขยะมูลฝอยและมลพิษสิ่งแวดล้อมชุมชน",
                            plans: [
                                "แผนงานคัดแยกขยะต้นทางและสร้างศูนย์แปรรูปขยะรีไซเคิลชุมชน",
                                "แผนงานเฝ้าระวังและป้องกันฝุ่น PM2.5 ในพื้นที่เกษตรกรรมป่าไม้"
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    // --- Modal Control Functions ---
    function openModal(id) {
        document.getElementById(id).classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(id) {
        document.getElementById(id).classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close on click outside modal content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('custom-modal')) {
            closeModal(e.target.id);
        }
    });

    // --- Selection and Rendering Functions ---
    function selectNationalPath(strat, mp, np) {
        document.getElementById('national_strategy').value = strat;
        document.getElementById('master_plan').value = mp;
        document.getElementById('national_plan').value = np;

        document.getElementById('disp_national_strategy').textContent = strat;
        document.getElementById('disp_master_plan').textContent = mp;
        document.getElementById('disp_national_plan').textContent = np;

        const box = document.getElementById('national-display-box');
        box.classList.add('selected');
        
        // Remove error border if highlighted
        box.style.borderColor = '';
    }

    function selectProvincialPath(issue, gl, mp, plan) {
        document.getElementById('province_issue').value = issue;
        document.getElementById('development_guideline').value = gl;
        document.getElementById('main_plan').value = mp;
        document.getElementById('plan').value = plan;

        document.getElementById('disp_province_issue').textContent = issue;
        document.getElementById('disp_development_guideline').textContent = gl;
        document.getElementById('disp_main_plan').textContent = mp;
        document.getElementById('disp_plan').textContent = plan;

        const box = document.getElementById('provincial-display-box');
        box.classList.add('selected');
        
        // Remove error border if highlighted
        box.style.borderColor = '';
    }

    function renderProvincialTree() {
        const container = document.getElementById('provincial-tree-container');
        container.innerHTML = '';

        provincialData.forEach((item) => {
            const issueNode = document.createElement('div');
            issueNode.className = 'tree-node';
            
            const header = document.createElement('div');
            header.className = 'tree-node-header';
            header.innerHTML = `<span>📂 ${item.issue}</span> <span class="arrow">▼</span>`;
            
            const body = document.createElement('div');
            body.className = 'tree-node-body';

            item.guidelines.forEach((gl) => {
                const glNode = document.createElement('div');
                glNode.className = 'tree-node';
                glNode.style.marginTop = '8px';

                const glHeader = document.createElement('div');
                glHeader.className = 'tree-node-header';
                glHeader.style.background = 'rgba(255, 255, 255, 0.01)';
                glHeader.innerHTML = `<span>📑 ${gl.name}</span> <span class="arrow">▼</span>`;

                const glBody = document.createElement('div');
                glBody.className = 'tree-node-body';

                gl.mainPlans.forEach((mp) => {
                    const mpNode = document.createElement('div');
                    mpNode.className = 'tree-node';
                    mpNode.style.marginTop = '8px';

                    const mpHeader = document.createElement('div');
                    mpHeader.className = 'tree-node-header';
                    mpHeader.style.background = 'rgba(255, 255, 255, 0.005)';
                    mpHeader.innerHTML = `<span>📋 ${mp.name}</span> <span class="arrow">▼</span>`;

                    const mpBody = document.createElement('div');
                    mpBody.className = 'tree-node-body';

                    mp.plans.forEach(plan => {
                        const leaf = document.createElement('div');
                        leaf.className = 'tree-leaf-item';
                        leaf.innerHTML = `🎯 ${plan}`;
                        leaf.addEventListener('click', () => {
                            selectProvincialPath(item.issue, gl.name, mp.name, plan);
                            closeModal('provincial-modal');
                        });
                        mpBody.appendChild(leaf);
                    });

                    mpHeader.addEventListener('click', (e) => {
                        e.stopPropagation();
                        mpNode.classList.toggle('open');
                    });

                    mpNode.appendChild(mpHeader);
                    mpNode.appendChild(mpBody);
                    glBody.appendChild(mpNode);
                });

                glHeader.addEventListener('click', (e) => {
                    e.stopPropagation();
                    glNode.classList.toggle('open');
                });

                glNode.appendChild(glHeader);
                glNode.appendChild(glBody);
                body.appendChild(glNode);
            });

            header.addEventListener('click', () => {
                issueNode.classList.toggle('open');
            });

            issueNode.appendChild(header);
            issueNode.appendChild(body);
            container.appendChild(issueNode);
        });
    }

    // --- Page Load Initialization ---
    renderProvincialTree();

    // Restore old inputs if validation failed
    const oldInput = {
        province_issue: @json(old('province_issue')),
        development_guideline: @json(old('development_guideline')),
        main_plan: @json(old('main_plan')),
        plan: @json(old('plan')),
    };
    
    if (oldInput.province_issue && oldInput.development_guideline && oldInput.main_plan && oldInput.plan) {
        selectProvincialPath(oldInput.province_issue, oldInput.development_guideline, oldInput.main_plan, oldInput.plan);
    }

    // --- Target Area Cascading Selection Logic ---
    const targetAreaData = {
        "เพชรบูรณ์": {
            "เมืองเพชรบูรณ์": ["ในเมือง", "สะเดียง", "นางั่ว", "ท่าพล", "ป่าเลา", "ชอนไพร", "ตะเบาะ", "นาป่า", "นายม", "ดงมูลเหล็ก", "บ้านโคก", "โคกสะอาด", "ห้วยสะแก", "วังชมภู", "บ้านโตก", "ห้วยใหญ่", "ระวิง"],
            "หล่มสัก": ["หล่มสัก", "วัดป่า", "ตาลเดี่ยว", "ฝายนาแซง", "หนองสว่าง", "น้ำเฮี้ย", "สักหลง", "ท่าอิบุญ", "บ้านโสก", "บ้านติ้ว", "ห้วยไร่", "ลานบ่า", "ปากช่อง", "บ้านกลาง", "ช้างตะลูด", "บ้านไร่", "ปากดุก", "หนองไข่น้ำ", "น้ำก้อ", "น้ำชุน", "บุ่งน้ำเต้า", "บุ่งคล้า"],
            "หล่มเก่า": ["หล่มเก่า", "นาซำ", "หินฮาว", "บ้านเนิน", "วังบาล", "นามะเขือ", "ตาดกลอย", "เหล่าหญ้า", "นาเกาะ"],
            "ชนแดน": ["ชนแดน", "บ้านกล้วย", "ดงขุย", "ท่าข้าม", "พุทธบาท", "ซับพุทรา", "มะขามโพรง", "ซับเปิบ", "ศาลาลาย"],
            "หนองไผ่": ["หนองไผ่", "นาเฉลียง", "ยางงาม", "ห้วยโป่ง", "ท่าแดง", "เพชรละคร", "บ่อไทย", "วังท่าดี", "วังพิกุล", "ซับมะกรูด", "ซับสมบูรณ์"],
            "วิเชียรบุรี": ["ท่าโรง", "สระประดู่", "สามแยก", "โคกปรง", "ซับสมบูรณ์", "บ่อรัง", "พุเตย", "พุขาม", "ซับน้อย", "ยางสาว", "มะเกลือ", "น้ำร้อน", "วังพิกุล", "ซับตระเคียน", "ซับจัดสรร"],
            "ศรีเทพ": ["ศรีเทพ", "สระกรวด", "คลองกระจัง", "หนองย่างทอย", "เจ็ดพัง", "โคกสะอาด"],
            "บึงสามพัน": ["ซับสมอทอด", "ซับไม้แดง", "บึงสามพัน", "กันจุ", "ศรีมงคล", "หนองแจง", "วังพิกุล", "ซับสมบูรณ์", "พญาวัง"],
            "เขาค้อ": ["เขาค้อ", "แคมป์สน", "ทุ่งสมอ", "สะเดาะพง", "เข็กน้อย"],
            "วังโป่ง": ["วังโป่ง", "ท้ายดง", "ซับเปิบ", "วังหิน", "วังศาล"],
            "น้ำหนาว": ["น้ำหนาว", "โคกมน", "หลักด่าน", "วังสะพุง"]
        }
    };

    const provSelect = document.getElementById('target_province');
    const distSelect = document.getElementById('target_district');
    const subdistSelect = document.getElementById('target_subdistrict');

    function populateDistricts(province) {
        distSelect.innerHTML = '<option value="">-- เลือกอำเภอ --</option>';
        subdistSelect.innerHTML = '<option value="">-- เลือกตำบล --</option>';
        subdistSelect.disabled = true;

        if (province && targetAreaData[province]) {
            const districts = Object.keys(targetAreaData[province]);
            districts.forEach(dist => {
                const opt = document.createElement('option');
                opt.value = dist;
                opt.textContent = dist;
                distSelect.appendChild(opt);
            });
            distSelect.disabled = false;
        } else {
            distSelect.disabled = true;
        }
    }

    function populateSubdistricts(province, district) {
        subdistSelect.innerHTML = '<option value="">-- เลือกตำบล --</option>';

        if (province && district && targetAreaData[province][district]) {
            const subdistricts = targetAreaData[province][district];
            subdistricts.forEach(sd => {
                const opt = document.createElement('option');
                opt.value = sd;
                opt.textContent = sd;
                subdistSelect.appendChild(opt);
            });
            subdistSelect.disabled = false;
        } else {
            subdistSelect.disabled = true;
        }
    }

    provSelect.addEventListener('change', function() {
        populateDistricts(this.value);
    });

    distSelect.addEventListener('change', function() {
        populateSubdistricts(provSelect.value, this.value);
    });

    // Initialize districts
    populateDistricts(provSelect.value);

    // Restore old target area inputs if validation failed
    const oldProvince = @json(old('target_province', 'เพชรบูรณ์'));
    const oldDistrict = @json(old('target_district'));
    const oldSubdistrict = @json(old('target_subdistrict'));

    if (oldProvince) {
        provSelect.value = oldProvince;
        populateDistricts(oldProvince);
        
        if (oldDistrict) {
            distSelect.value = oldDistrict;
            populateSubdistricts(oldProvince, oldDistrict);
            
            if (oldSubdistrict) {
                subdistSelect.value = oldSubdistrict;
            }
        }
    }

    // --- Submit Form Validation Handler ---
    const form = document.getElementById('proposal-form');
    form.addEventListener('submit', function(event) {
        const requiredFields = form.querySelectorAll('[required]');
        let allValid = true;
        let firstInvalidField = null;

        requiredFields.forEach(field => {
            if (field.disabled) return;

            // Handle hidden inputs mapped to display boxes
            if (field.type === 'hidden') {
                const displayBoxId = 'provincial-display-box';
                const displayBox = document.getElementById(displayBoxId);
                
                if (!field.value || field.value.trim() === '') {
                    allValid = false;
                    displayBox.style.border = '1px dashed var(--danger)';
                    displayBox.style.background = 'rgba(239, 68, 68, 0.05)';
                    if (!firstInvalidField) {
                        firstInvalidField = displayBox;
                    }
                }
                return;
            }

            if (!field.value || field.value.trim() === '') {
                allValid = false;
                field.style.borderColor = 'var(--danger)';
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
                
                const clearError = function() {
                    if (field.value && field.value.trim() !== '') {
                        field.style.borderColor = '';
                    }
                };
                field.addEventListener('input', clearError);
                field.addEventListener('change', clearError);
            }
        });

        if (!allValid) {
            event.preventDefault();
            alert('กรุณากรอกข้อมูลและระบุแผนสอดคล้องที่จำเป็น (*) ให้ครบถ้วน');
            
            if (firstInvalidField) {
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (typeof firstInvalidField.focus === 'function') {
                    firstInvalidField.focus();
                }
            }
        }
    });

    // File Preview Handler
    function updateFileList(input) {
        const list = document.getElementById('file-list');
        list.innerHTML = '';
        
        if (input.files.length > 0) {
            Array.from(input.files).forEach(file => {
                const item = document.createElement('div');
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.justifyContent = 'space-between';
                item.style.background = 'rgba(255, 255, 255, 0.04)';
                item.style.padding = '8px 16px';
                item.style.borderRadius = '8px';
                item.style.fontSize = '13px';
                item.style.border = '1px solid rgba(255, 255, 255, 0.08)';
                
                const nameSpan = document.createElement('span');
                nameSpan.textContent = file.name + ' (' + (file.size / 1024 / 1024).toFixed(2) + ' MB)';
                nameSpan.style.color = 'var(--text-main)';
                
                item.appendChild(nameSpan);
                list.appendChild(item);
            });
        }
    }

    // --- Section 4: Activities Dynamic Insertion Logic ---
    let activityCount = 0;

    const provincialGuidelines = [
        "แนวทางที่ 1.1: พัฒนาศักยภาพอุตสาหกรรมท่องเที่ยวและบริการสุขภาพเชิงรุก",
        "แนวทางที่ 1.2: ขยายฐานการท่องเที่ยวเชิงวัฒนธรรม วิถีชีวิต และธรรมชาติเขาค้อ-ภูทับเบิก",
        "แนวทางที่ 2.1: ส่งเสริมมาตรฐานการเกษตรปลอดภัย เกษตรอินทรีย์ และ Smart Farming",
        "แนวทางที่ 2.2: เพิ่มมูลค่าสินค้าแปรรูปด้วยเทคโนโลยีและนวัตกรรมชุมชน",
        "แนวทางที่ 3.1: พัฒนาระบบสาธารณสุขชุมชนและความรอบรู้ด้านสุขภาพ (PHY70)",
        "แนวทางที่ 3.2: จัดการปัญหาสิ่งแวดล้อมและการพัฒนาเมืองอัจฉริยะอย่างปลอดภัย"
    ];

    function addActivity(data = null) {
        const container = document.getElementById('activities-container');
        const noMsg = document.getElementById('no-activities-message');
        noMsg.style.display = 'none';

        const index = activityCount++;
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.id = `activity-card-${index}`;
        card.style.background = 'rgba(255, 255, 255, 0.02)';
        card.style.border = '1px solid rgba(255, 255, 255, 0.06)';
        card.style.borderRadius = '16px';
        card.style.padding = '24px';
        card.style.position = 'relative';

        const titleVal = data ? data.name : '';
        const budgetVal = data ? data.budget : '';
        const respVal = data ? data.responsible_person : '';
        const opVal = data ? data.operating_agency : '';
        const invVal = data ? data.involved_agencies : '';
        const guideVal = data ? data.guideline : '';

        let guidelineOptions = '<option value="">-- กรุณาเลือกแนวทางการพัฒนาจังหวัด --</option>';
        provincialGuidelines.forEach(g => {
            const selected = guideVal === g ? 'selected' : '';
            guidelineOptions += `<option value="${g}" ${selected}>${g}</option>`;
        });

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px;">
                <h4 style="font-size: 15px; font-weight: 600; color: var(--secondary); font-family: 'Prompt', sans-serif;">
                    🎯 กิจกรรมที่ <span class="activity-number"></span>
                </h4>
                <button type="button" onclick="removeActivity(${index})" style="background: none; border: none; color: var(--danger); font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                    ✕ ลบกิจกรรม
                </button>
            </div>

            <div class="form-group">
                <label class="form-label">ชื่อกิจกรรม <span style="color: var(--danger);">*</span></label>
                <input type="text" name="activities[${index}][name]" class="form-control" placeholder="ระบุชื่อกิจกรรมย่อย" value="${titleVal}" required>
            </div>

            <div class="grid-2-col">
                <div class="form-group">
                    <label class="form-label">งบประมาณ (บาท) <span style="color: var(--danger);">*</span></label>
                    <input type="number" name="activities[${index}][budget]" class="form-control" placeholder="เช่น 50000" min="0" value="${budgetVal}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">ผู้รับผิดชอบ <span style="color: var(--danger);">*</span></label>
                    <input type="text" name="activities[${index}][responsible_person]" class="form-control" placeholder="ระบุผู้รับผิดชอบ" value="${respVal}" required>
                </div>
            </div>

            <div class="grid-2-col">
                <div class="form-group">
                    <label class="form-label">หน่วยงานรับผิดชอบ <span style="color: var(--danger);">*</span></label>
                    <input type="text" name="activities[${index}][operating_agency]" class="form-control" placeholder="ระบุหน่วยงานรับผิดชอบหลัก" value="${opVal}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">หน่วยงานที่เกี่ยวข้อง <span style="color: var(--danger);">*</span></label>
                    <input type="text" name="activities[${index}][involved_agencies]" class="form-control" placeholder="ระบุหน่วยงานร่วมดำเนินการ/สนับสนุน" value="${invVal}" required>
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">แนวทางการพัฒนาจังหวัดที่สอดคล้อง <span style="color: var(--danger);">*</span></label>
                <select name="activities[${index}][guideline]" class="form-control" required>
                    ${guidelineOptions}
                </select>
            </div>
        `;

        container.appendChild(card);
        updateActivityNumbers();
    }

    function removeActivity(index) {
        const card = document.getElementById(`activity-card-${index}`);
        if (card) {
            card.remove();
            updateActivityNumbers();
        }
    }

    function updateActivityNumbers() {
        const container = document.getElementById('activities-container');
        const cards = container.getElementsByClassName('activity-card');
        const noMsg = document.getElementById('no-activities-message');

        if (cards.length === 0) {
            noMsg.style.display = 'block';
        } else {
            noMsg.style.display = 'none';
        }

        Array.from(cards).forEach((card, idx) => {
            const numSpan = card.querySelector('.activity-number');
            if (numSpan) {
                numSpan.textContent = idx + 1;
            }
        });
    }

    // Restore old activities if they exist from validation redirect
    const oldActivities = @json(old('activities'));
    if (oldActivities && Array.isArray(oldActivities) && oldActivities.length > 0) {
        oldActivities.forEach(act => {
            addActivity(act);
        });
    } else {
        // Add one default activity card on fresh load
        addActivity();
    }
  </script>
</x-phy70::layouts.master>