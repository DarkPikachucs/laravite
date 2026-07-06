<?php
$isEdit = isset($proposal);
$user = auth('phy70')->user();
$isSuperadmin = $user && $user->role === 'superadmin';
$route = $isEdit 
    ? ($isSuperadmin ? route('phy70.superadmin.proposal.update', $proposal->id) : route('phy70.proposal.update', $proposal->id))
    : route('phy70.proposal.store');
$method = $isEdit ? 'PUT' : 'POST';
$oldData = old();
if (empty($oldData) && $isEdit) {
    $oldData = $proposal->toArray();
}
?>
<x-phy70::layouts.master>
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap"
    rel="stylesheet">
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js"></script>

  <style>
    :root {
      --bg-base: #060913;
      --bg-surface: rgba(15, 23, 42, 0.6);
      --border-glow: rgba(99, 102, 241, 0.15);
      --primary: #6366f1;
      --primary-glow: rgba(99, 102, 241, 0.35);
      --secondary: #06b6d4;
      --success: #10b981;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --danger: #ef4444;
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
      font-family: 'Outfit', 'Prompt', sans-serif;
      min-height: 100vh;
    }

    .form-container {
      max-width: 950px;
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
    }

    .glass-card {
      background: var(--bg-surface);
      backdrop-filter: blur(16px);
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

    .section-title {
      font-size: 19px;
      font-weight: 600;
      color: var(--secondary);
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 24px;
    }

    .form-group {
      margin-bottom: 24px;
    }

    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--text-main);
    }

    .form-control {
      width: 100%;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 12px 16px;
      color: var(--text-main);
      font-family: inherit;
      font-size: 14px;
      outline: none;
      transition: var(--transition-smooth);
    }

    select.form-control option {
      background-color: var(--bg-base);
      color: var(--text-main);
    }

    .form-control:focus {
      border-color: var(--primary);
      background: rgba(255, 255, 255, 0.04);
      box-shadow: 0 0 0 4px var(--primary-glow);
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

    .grid-3-col {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
    }

    .btn-action {
      background: linear-gradient(135deg, var(--primary) 0%, rgba(99, 102, 241, 0.8) 100%);
      border: none;
      color: #fff;
      padding: 12px 24px;
      border-radius: 12px;
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
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
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

    .activity-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-glow);
      border-radius: 16px;
      padding: 24px;
      position: relative;
      margin-bottom: 20px;
    }

    .kpi-box {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      padding: 16px;
      margin-top: 12px;
      border: 1px solid var(--border-glow);
    }

    .kpi-row {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 12px;
    }

    .kpi-checkbox {
      width: 18px;
      height: 18px;
      accent-color: var(--primary);
    }

    .kpi-input {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      padding: 6px 10px;
      color: var(--text-main);
      width: 100px;
    }

    :root.light-theme .kpi-input {
      background: rgba(255, 255, 255, 0.6);
      border-color: rgba(0, 0, 0, 0.1);
    }

    :root.light-theme .kpi-box {
      background: rgba(0, 0, 0, 0.03);
    }

    .custom-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>

  <div class="bg-glow"></div>

  <div class="form-container" x-data="proposalForm()">
    <header class="header">
      <h2 class="title">{{ $isEdit ? 'แก้ไขข้อเสนอโครงการ' : 'จัดทำข้อเสนอโครงการ' }}</h2>
      <a href="/app/phy70" class="btn-secondary">ยกเลิก</a>
    </header>

    @if($errors->any())
    <div
      style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: var(--danger); padding: 16px 20px; border-radius: 12px; margin-bottom: 24px; font-size: 13.5px;">
      <div style="font-weight: 600; margin-bottom: 8px;">กรุณากรอกข้อมูลให้ครบถ้วน:</div>
      <ul style="padding-left: 20px;">
        @foreach($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
      </ul>
    </div>
    @endif

    <div class="glass-card">
      <form action="{{ $route }}" method="POST" id="proposal-form" enctype="multipart/form-data">
        @csrf
        @if($isEdit) @method('PUT') @endif

        <!-- ================== SECTION 1 ================== -->
        <div class="form-section">
          <h3 class="section-title">ส่วนที่ 1: ข้อมูลโครงการ</h3>

          <div class="form-group">
            <label class="form-label">ชื่อโครงการ <span style="color: var(--danger);">*</span></label>
            <input type="text" name="project_name" class="form-control" x-model="formData.project_name" required>
          </div>

          <div class="form-group">
            <label class="form-label">ประเด็นการพัฒนาของจังหวัด <span style="color: var(--danger);">*</span></label>
            <select name="province_issue" class="form-control" x-model="formData.province_issue" @change="onIssueChange"
              required>
              <option value="">-- เลือกประเด็นการพัฒนา --</option>
              <template x-for="(issue, index) in issuesData" :key="index">
                <option :value="issue.issue" x-text="issue.issue" :selected="issue.issue === formData.province_issue">
                </option>
              </template>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">หลักการและเหตุผล <span style="color: var(--danger);">*</span></label>
            <textarea name="principles" class="form-control" x-model="formData.principles" required></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">วัตถุประสงค์ของโครงการ <span style="color: var(--danger);">*</span></label>
            <textarea name="objectives" class="form-control" x-model="formData.objectives" required></textarea>
          </div>

          <!-- KPIs -->
          <div class="form-group" x-show="currentKPIs.length > 0">
            <label class="form-label">ตัวชี้วัดและค่าเป้าหมาย <span style="color: var(--danger);">*</span></label>
            <div class="kpi-box">
              <template x-for="(kpi, index) in currentKPIs" :key="index">
                <div
                  style="margin-bottom: 16px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 12px;">
                  <div class="kpi-row">
                    <input type="checkbox" :name="'kpis['+index+'][selected]'" class="kpi-checkbox"
                      x-model="kpi.selected" value="1">
                    <span style="font-size: 14px; font-weight: 500;" x-text="kpi.name"></span>
                    <input type="hidden" :name="'kpis['+index+'][name]'" :value="kpi.name">
                  </div>

                </div>
              </template>
            </div>
          </div>

          <input type="hidden" name="target_province" value="เพชรบูรณ์" x-model="formData.target_province">

          <div class="form-group">
            <label class="form-label">กลุ่มเป้าหมาย <span style="color: var(--danger);">*</span></label>
            <input type="text" name="target_group" class="form-control" x-model="formData.target_group" required>
          </div>

          <input type="hidden" name="operating_agency" x-model="formData.operating_agency">
          <input type="hidden" name="responsible_person" x-model="formData.responsible_person">
          <input type="hidden" name="position" x-model="formData.position">
          <input type="hidden" name="phone_number" x-model="formData.phone_number">
        </div>

        <!-- ================== SECTION 2 ================== -->
        <div class="form-section">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h3 class="section-title" style="margin-bottom: 0;">ส่วนที่ 2: กิจกรรมย่อย (Activities)</h3>
            <button type="button" class="btn-action" @click="addActivity()"
              style="background: linear-gradient(135deg, var(--secondary) 0%, rgba(6, 182, 212, 0.8) 100%);">➕
              เพิ่มกิจกรรม</button>
          </div>

          <template x-for="(act, index) in formData.activities" :key="index">
            <div class="activity-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
                <h4 style="color: var(--secondary); font-size: 16px;">🎯 กิจกรรมที่ <span x-text="index + 1"></span>
                </h4>
                <button type="button" @click="removeActivity(index)"
                  style="background: none; border: none; color: var(--danger); cursor: pointer;">✕ ลบ</button>
              </div>
              <div class="form-group">
                <label class="form-label">ชื่อกิจกรรม <span style="color: var(--danger);">*</span></label>
                <input type="text" :name="'activities['+index+'][name]'" class="form-control" x-model="act.name"
                  required>
              </div>
              <div class="grid-2-col">
                <div class="form-group">
                  <label class="form-label">งบประมาณ (บาท) <span style="color: var(--danger);">*</span></label>
                  <input type="number" :name="'activities['+index+'][budget]'" class="form-control" x-model="act.budget"
                    required>
                </div>
                <div class="form-group">
                  <label class="form-label">แนวทางการพัฒนาจังหวัด <span style="color: var(--danger);">*</span></label>
                  <select :name="'activities['+index+'][guideline]'" class="form-control" x-model="act.guideline"
                    required>
                    <option value="">-- เลือกแนวทาง --</option>
                    <template x-if="formData.province_issue && guidelinesData[formData.province_issue]">
                      <template x-for="g in guidelinesData[formData.province_issue]" :key="g">
                        <option :value="g" x-text="g"></option>
                      </template>
                    </template>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">พื้นที่เป้าหมาย</label>
                <button type="button" class="btn-secondary" @click="openTargetAreaModal(index)"
                  style="width: auto; padding: 5px 15px; font-size: 14px; display: inline-flex; align-items: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    style="margin-right: 5px;">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  เลือกพื้นที่เป้าหมาย
                </button>

                <div
                  style="margin-top: 10px; padding: 12px; background: rgba(0,0,0,0.02); border-radius: 8px; border: 1px solid rgba(0,0,0,0.05);"
                  x-show="act.target_district.length > 0 || act.target_subdistrict.length > 0">
                  <template x-if="act.target_district.length > 0">
                    <div style="font-size: 14px; margin-bottom: 5px;">
                      <strong style="color: var(--primary);">อำเภอ:</strong>
                      <span x-text="act.target_district.join(', ')"></span>
                    </div>
                  </template>
                  <template x-if="act.target_subdistrict.length > 0">
                    <div style="font-size: 14px;">
                      <strong style="color: var(--primary);">ตำบล:</strong>
                      <span x-text="act.target_subdistrict.join(', ')"></span>
                    </div>
                  </template>
                </div>
                <template x-if="act.target_district.length === 0 && act.target_subdistrict.length === 0">
                  <div style="margin-top: 10px; font-size: 14px; color: var(--text-muted); font-style: italic;">
                    ยังไม่ได้เลือกพื้นที่เป้าหมาย
                  </div>
                </template>
                <input type="hidden" :name="'activities['+index+'][target_district][]'" :value="act.target_district">
                <input type="hidden" :name="'activities['+index+'][target_subdistrict][]'"
                  :value="act.target_subdistrict">
              </div>

              <div class="form-group">
                <label class="form-label">กลุ่มเป้าหมาย (กิจกรรม) <span style="color: var(--danger);">*</span></label>
                <input type="text" :name="'activities['+index+'][target_group]'" class="form-control"
                  x-model="act.target_group" required>
              </div>

              <div class="form-group">
                <label class="form-label">ผู้รับผิดชอบ <span style="color: var(--danger);">*</span></label>
                <input type="text" :name="'activities['+index+'][responsible_person]'" class="form-control"
                  x-model="act.responsible_person" required>
              </div>

              <div class="grid-2-col">
                <div class="form-group">
                  <label class="form-label">หน่วยงานรับผิดชอบ <span style="color: var(--danger);">*</span></label>
                  <input type="text" :name="'activities['+index+'][responsible_agency]'" class="form-control"
                    x-model="act.responsible_agency" required>
                </div>
                <div class="form-group">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <label class="form-label" style="margin-bottom: 0;">หน่วยงานที่เกี่ยวข้อง</label>
                    <button type="button" @click="act.co_agencies.push({name: ''})"
                      style="background: none; border: none; color: var(--secondary); cursor: pointer; font-size: 13px;">+
                      เพิ่ม</button>
                  </div>
                  <template x-for="(co, cIndex) in act.co_agencies" :key="cIndex">
                    <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                      <input type="text" :name="'activities['+index+'][co_agencies]['+cIndex+'][name]'"
                        class="form-control" x-model="co.name">
                      <button type="button" @click="act.co_agencies.splice(cIndex, 1)"
                        style="background: none; border: none; color: var(--danger); cursor: pointer;"
                        x-show="act.co_agencies.length > 1">✕</button>
                    </div>
                  </template>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">ตัวชี้วัดโครงการที่กิจกรรมนี้ตอบสนอง</label>
                <div class="kpi-box" style="margin-top: 0;">
                  <template x-for="(kpi, kIndex) in currentKPIs.filter(k => k.selected)" :key="kpi.name">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                      <input type="checkbox" :name="'activities['+index+'][project_kpis]['+kIndex+']'" :value="kpi.name"
                        x-model="act.project_kpis" class="kpi-checkbox">
                      <span style="font-size: 14px;" x-text="kpi.name"></span>
                    </div>
                  </template>
                  <div x-show="currentKPIs.filter(k => k.selected).length === 0"
                    style="font-size: 13px; color: var(--text-muted);">
                    ยังไม่ได้เลือกตัวชี้วัดโครงการในส่วนที่ 1
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <label class="form-label" style="margin-bottom: 0;">ตัวชี้วัดของกิจกรรม <span
                      style="color: var(--danger);">*</span></label>
                  <button type="button" @click="act.activity_kpis.push({name: ''})"
                    style="background: none; border: none; color: var(--secondary); cursor: pointer; font-size: 13px;">+
                    เพิ่มตัวชี้วัด</button>
                </div>
                <template x-for="(akpi, akIndex) in act.activity_kpis" :key="akIndex">
                  <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                    <input type="text" :name="'activities['+index+'][activity_kpis]['+akIndex+'][name]'"
                      class="form-control" x-model="akpi.name" required>
                    <button type="button" @click="act.activity_kpis.splice(akIndex, 1)"
                      style="background: none; border: none; color: var(--danger); cursor: pointer;"
                      x-show="act.activity_kpis.length > 1">✕</button>
                  </div>
                </template>
              </div>
            </div>
          </template>

          <div x-show="formData.activities.length === 0"
            style="text-align: center; padding: 20px; color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.1); border-radius: 12px;">
            ยังไม่มีกิจกรรม กรุณากด "เพิ่มกิจกรรม"
          </div>
        </div>

        <!-- ================== SECTION 3 ================== -->
        <div class="form-section">
          <h3 class="section-title">ส่วนที่ 3: ผลผลิตและผลลัพธ์</h3>
          <div class="form-group">
            <label class="form-label">ผลผลิต (Output) <span style="color: var(--danger);">*</span></label>
            <textarea name="output" class="form-control" x-model="formData.output" required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">ผลลัพธ์ (Outcome) <span style="color: var(--danger);">*</span></label>
            <textarea name="outcome" class="form-control" x-model="formData.outcome" required></textarea>
          </div>
        </div>

        <!-- ================== SECTION 4 ================== -->
        <div class="form-section">
          <h3 class="section-title">ส่วนที่ 4: เอกสารโครงการ</h3>
          <div class="form-group" x-data="{ isDropping: false, files: [] }">
            <!-- สร้าง hint: แบบ จ.1-1, แบบฟอร์มข้อมูลพื้นฐานโครงการ -->
            <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 8px;">
              <strong>หมายเหตุ:</strong> กรุณาแนบเอกสารโครงการอย่างน้อย 2 ไฟล์ (เช่น แบบ จ.1-1,
              แบบฟอร์มข้อมูลพื้นฐานโครงการ)
            </div>
            <label class="form-label">เอกสารแนบ (อย่างน้อย 2 ไฟล์) <span style="color: var(--danger);">*</span></label>

            <style>
              .drag-drop-zone {
                border: 2px dashed rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                padding: 40px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                background: rgba(0, 0, 0, 0.2);
                margin-top: 10px;
              }

              .drag-drop-zone:hover,
              .drag-drop-zone.is-dropping {
                border-color: var(--primary);
                background: rgba(99, 102, 241, 0.1);
              }

              :root.light-theme .drag-drop-zone {
                border-color: rgba(0, 0, 0, 0.2);
                background: rgba(0, 0, 0, 0.02);
              }

              :root.light-theme .drag-drop-zone:hover,
              :root.light-theme .drag-drop-zone.is-dropping {
                border-color: var(--primary);
                background: rgba(99, 102, 241, 0.05);
              }
            </style>

            <div class="drag-drop-zone" :class="{ 'is-dropping': isDropping }" @dragover.prevent="isDropping = true"
              @dragleave.prevent="isDropping = false"
              @drop.prevent="isDropping = false; $refs.fileInput.files = $event.dataTransfer.files; files = Array.from($refs.fileInput.files)"
              @click="$refs.fileInput.click()">
              <div style="font-size: 32px; margin-bottom: 12px;">📁</div>
              <div style="font-size: 16px; font-weight: 500; color: var(--text-main); margin-bottom: 8px;">
                ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์</div>
              <div style="font-size: 13px; color: var(--text-muted);">รองรับไฟล์ PDF, Word, Excel, ZIP
                (สามารถเลือกหลายไฟล์พร้อมกันได้)</div>

              <input type="file" name="documents[]" x-ref="fileInput" multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar" style="display: none;"
                @change="files = Array.from($refs.fileInput.files)">
            </div>

            <!-- Preview selected files -->
            <div x-show="files.length > 0" style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px;"
              x-transition>
              <label class="form-label" style="color: var(--success);">ไฟล์ที่เลือกใหม่:</label>
              <template x-for="file in files" :key="file.name">
                <div
                  style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span>📄</span>
                    <span x-text="file.name" style="font-size: 14px; font-weight: 500;"></span>
                    <span x-text="'(' + (file.size / 1024 / 1024).toFixed(2) + ' MB)'"
                      style="font-size: 12px; color: var(--text-muted);"></span>
                  </div>
                </div>
              </template>
            </div>

            @error('documents')
            <div style="color: var(--danger); font-size: 13px; margin-top: 5px;">{{ $message }}</div>
            @enderror

            @if(isset($isEdit) && $isEdit && !empty($proposal->documents))
            <div style="margin-top: 24px;">
              <label class="form-label">เอกสารที่อัปโหลดไว้แล้ว:</label>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
                @foreach(is_array($proposal->documents) ? $proposal->documents : [] as $doc)
                @php
                $isOldFormat = is_string($doc);
                $docPath = $isOldFormat ? $doc : $doc['path'];
                $docName = $isOldFormat ? basename($doc) : $doc['name'];
                @endphp
                <div
                  style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                  <span>📄</span>
                  <a href="{{ Storage::url(preg_replace('~^/storage/~', '', $docPath)) }}" target="_blank"
                    style="color: var(--secondary); text-decoration: none; font-size: 14px; transition: color 0.2s;"
                    onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--secondary)'">{{ $docName
                    }}</a>
                </div>
                @endforeach
              </div>
            </div>
            @endif
          </div>
        </div>

        <div style="text-align: right; display: flex; justify-content: flex-end; gap: 12px;">
          <button type="submit" name="status" value="draft" class="btn-secondary" formnovalidate>
            💾 บันทึกร่าง
          </button>
          <button type="submit" name="status"
            value="{{ $isEdit && $proposal->status !== 'draft' ? $proposal->status : 'submitted' }}" class="btn-action">
            ✓ {{ $isEdit && $proposal->status !== 'draft' ? 'บันทึกการแก้ไข' : 'ส่งข้อเสนอโครงการ' }}
          </button>
        </div>
      </form>
    </div>
    <!-- Target Area Modal -->
    <div x-show="targetAreaModal.isOpen" class="custom-modal-backdrop" style="display: none;" x-transition.opacity>
      <div class="modal-content glass-card"
        style="width: 90%; max-width: 700px; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-height: 90vh; overflow-y: auto;"
        @click.outside="closeTargetAreaModal()">
        <h3
          style="margin-top: 0; margin-bottom: 20px; color: var(--primary); border-bottom: 1px solid #eee; padding-bottom: 10px;">
          เลือกพื้นที่เป้าหมาย</h3>

        <div class="grid-2-col" style="gap: 20px;">
          <div class="form-group">
            <label class="form-label">อำเภอ</label>
            <select x-model="targetAreaModal.temp_district" class="form-control" multiple
              @change="targetAreaModal.temp_subdistrict = []" style="height: 300px;">
              <template x-for="district in Object.keys(addressData)" :key="district">
                <option :value="district" x-text="district"></option>
              </template>
            </select>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 5px;">กด Ctrl (Windows) หรือ Command
              (Mac) ค้างไว้เพื่อเลือกหลายรายการ</div>
          </div>

          <div class="form-group">
            <label class="form-label">ตำบล</label>
            <select x-model="targetAreaModal.temp_subdistrict" class="form-control" multiple style="height: 300px;">
              <template x-if="targetAreaModal.temp_district && targetAreaModal.temp_district.length > 0">
                <template x-for="district in targetAreaModal.temp_district" :key="district">
                  <optgroup :label="district">
                    <template x-for="subdistrict in addressData[district]" :key="subdistrict">
                      <option :value="subdistrict" x-text="subdistrict"></option>
                    </template>
                  </optgroup>
                </template>
              </template>
            </select>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 5px;">กด Ctrl (Windows) หรือ Command
              (Mac) ค้างไว้เพื่อเลือกหลายรายการ</div>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 25px;">
          <button type="button" class="btn-secondary" @click="closeTargetAreaModal()">ยกเลิก</button>
          <button type="button" class="btn-action" @click="saveTargetAreaModal()">บันทึก</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('alpine:init', () => {
        const issuesData = [
            {
                "issue": "ประเด็นการพัฒนาที่ 1 การพัฒนาการท่องเที่ยวมูลค่าสูงเชิงสร้างสรรค์บนฐานอัตลักษณ์ของพื้นที่",
                "kpis": [
                  {"name": "รายได้จากการท่องเที่ยวเพิ่มขึ้น", "base_year": 2568, "base_value": "9,981.97 ล้านบาท", "target_unit": "ร้อยละ", "targets": [5, 5, 5, 5, 5]},
                  {"name": "ผลิตภาพแรงงานภาคบริการ (ท่องเที่ยว) เพิ่มขึ้น", "base_year": null, "base_value": null, "target_unit": null, "targets": [0, 0, 0, 0, 0]},
                  {"name": "จำนวนตำแหน่งงานว่าง (ความต้องการแรงงาน) ในอุตสาหกรรมการท่องเที่ยว", "base_year": 2569, "base_value": "309 อัตรา", "target_unit": "อัตรา", "targets": [0, 0, 0, 0, 0]},
                  {"name": "จำนวนของสถานประกอบการด้านการท่องเที่ยวได้รับมาตรฐานเพิ่มขึ้น", "base_year": null, "base_value": null, "target_unit": null, "targets": [0, 0, 0, 0, 0]}
                ]
            },
            {
                "issue": "ประเด็นการพัฒนาที่ 2 การพัฒนาการเกษตรมูลค่าสูงอย่างยั่งยืน",
                "kpis": [
                  {"name": "GPP จังหวัดภาคเกษตรเพิ่มขึ้น (ร้อยละ 5)", "base_year": 2567, "base_value": "32,564 ล้านบาท",  "target_unit": "ร้อยละ",  "targets": [5, 5, 5, 5, 5]},
                  {"name": "ผลิตภาพแรงงานภาคเกษตร เพิ่มขึ้น (ร้อยละ 5)", "base_year": 2567, "base_value": "155,514.70 บาท/คน/ปี",  "target_unit": "ร้อยละ",  "targets": [5, 5, 5, 5, 5]},
                  {"name": "จำนวนสินค้าเกษตรที่ได้รับมาตรฐานสินค้าเกษตรมูลค่าสูง",  "base_year": 2567, "base_value": "1,938 ราย",  "target_unit": "ราย",  "targets": [2000, 2200, 2400, 2500, 0]},
                  {"name": "รายได้เงินสดสุทธิทางการเกษตรเฉลี่ยต่อครัวเรือนเพิ่มขึ้น  (เกษตรกรที่มีรายได้ในภาคการเกษตร)", "base_year": 2568, "base_value": "91,829 บาท",  "target_unit": "บาท",  "targets": [0, 0, 0, 0, 0]},
                  {"name": "จำนวนแปลง/ฟาร์ม และผลิตภัณฑ์สินค้าเกษตรที่ได้รับการการรับรองมาตรฐานเกษตร ปลอดภัย (GAP)เพิ่มขึ้น",  "base_year": 2569, "base_value": "2,500 แปลง",  "target_unit": "แปลง",  "targets": [0, 0, 0, 0, 0]}
                ]
            },
            {
                "issue": "ประเด็นการพัฒนาที่ 3 การพัฒนาความมั่นคง คุณภาพชีวิต การศึกษา และผลิตภาพคนทุกช่วงวัย",
                "kpis": [
                  {"name": "จำนวนผู้สูงอายุมีศักยภาพมีงานทำและรายได้เหมาะสม เพิ่มขึ้น", "base_year": 2567, "base_value": "84,927 คน", "target_unit": "ร้อยละ", "targets": [0, 0, 0, 0, 0]},
                  {"name": "ร้อยละของประชาชนเข้าถึงบริการส่งเสริมสุขภาพและป้องกันโรค", "base_year": 2567, "base_value": "880,059 คน", "target_unit": "ร้อยละ", "targets": [0, 0, 0, 0, 0]},
                  {"name": "ดัชนีความก้าวหน้าของการพัฒนาคนด้านสุขภาพ รายจังหวัด", "base_year": 2567, "base_value": "0.5913 คะแนน", "target_unit": "คะแนน", "targets": [0, 0, 0, 0, 0]},
                  {"name": "อัตราการเติบโตของรายได้ของกลุ่มประชากรร้อยละ 40 ที่มีรายได้ต่ำสุด เฉลี่ยไม่ต่ำกว่าร้อยละ", "base_year": 2568, "base_value": "102,079 บาท", "target_unit": "ร้อยละ", "targets": [0, 0, 0, 0, 0]},
                  {"name": "สถิติคดีอาญาลดลง", "base_year": 2568, "base_value": "181 คดี", "target_unit": "ร้อยละ", "targets": [0, 0, 0, 0, 0]},
                  {"name": "สถิิติอุบัติเหตุจราจรลดลง", "base_year": 2568, "base_value": "11,495 ราย", "target_unit": "ร้อยละ", "targets": [0, 0, 0, 0, 0]},
                  {"name": "ผลิตภัณฑ์มวลรวมจังหวัดต่อคนเพิ่มขึ้น", "base_year": 2567, "base_value": "107,129 บาท", "target_unit": "ร้อยละ", "targets": [5, 5, 5, 5, 5]},
                  {"name": "จำนวนปีการศึกษาเฉลี่ยของประชากร", "base_year": 2567, "base_value": "9.70 ปี", "target_unit": "ปี", "targets": [10.5, 10.5, 10.5, 11.5, 11.5]},
                  {"name": "จำนวนคดียาเสพติดลดลง", "base_year": 2567, "base_value": "3,085 คดี", "target_unit": "ร้อยละ", "targets": [5, 5, 5, 5, 5]},
                  {"name": "อัตราส่วนแพทย์ต่อประชากร", "base_year": 2568, "base_value": "1:3,366", "target_unit": "สัดส่วน", "targets": ["1:2,500", "1:2,500", "1:2,300", "1:2,300", "1:2,000"]},
                  {"name": "จำนวนชุดข้อมูลดิจิทัลที่เปิดเผยต่อสาธารณชน (Open Data) เพิ่มขึ้น", "base_year": null, "base_value": "147 ชุด", "target_unit": "ชุด", "targets": [0, 0, 0, 0, 0]},
                  {"name": "ร้อยละของประชากรทุกช่วงวัย เข้าถึงการบริการด้านการศึกษา", "base_year": 2568, "base_value": "9.84 ปี", "target_unit": "ร้อยละ", "targets": [0, 0, 0, 0, 0]}
                ]
            },
            {
                "issue": "ประเด็นการพัฒนาที่ 4 การส่งเสริมการเจริญเติบโตทางเศรษฐกิจที่ยั่งยืน",
                "kpis": [
                  {"name": "การขยายตัวของวิสาหกิจเริ่มต้น", "base_year": 2568, "base_value": "828 แห่ง", "target_unit": "แห่ง", "targets": [0, 0, 0, 0, 0]},
                  {"name": "ผลิตภัณฑ์มวลรวมจังหวัด (GPP)", "base_year": 2567, "base_value": "95,455 ล้านบาท", "target_unit": "ร้อยละ", "targets": [5, 5, 5, 5, 5]},
                  {"name": "ผลิตภัณฑ์มวลรวมจังหวัด (GPP) ภาคอุตสาหกรรม", "base_year": 2567, "base_value": ".......ล้านบาท", "target_unit": "ร้อยละ", "targets": [3, 3, 3, 3, 3]},
                  {"name": "จำนวนผู้ประกอบการ/ผลิตภัณฑ์และบริการที่ได้รับการพัฒนาต่อยอดโดยใช้เทคโนโลยีและนวัตกรรมเพิ่มขึ้น", "base_year": null, "base_value": null, "target_unit": null, "targets": [0, 0, 0, 0, 0]},
                  {"name": "จำนวนสถานประกอบการที่ผ่านเกณฑ์อุตสาหกรรมสีเขียว ระดับ 2", "base_year": 2568, "base_value": "23 แห่ง", "target_unit": "ร้อยละ", "targets": [3, 3, 3, 3, 3]}
                ]
            },
            {
                "issue": "ประเด็นการพัฒนาที่ 5 การบริหารจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อมเพื่อความสมดุล",
                "kpis": [
                  {"name": "ปริมาณการปล่อยและศักยภาพการลดก๊าซเรือนกระจกระดับจังหวัด", "base_year": 2562, "base_value": "2,255,918 tCO2eq/year", "target_unit": "tCO2eq/year", "targets": [0, 0, 0, 0, 0]},
                  {"name": "จำนวนชุมชนที่ใช้นวัตกรรมท้องถิ่นที่เพิ่มประสิทธิภาพในการบริหารจัดการขยะมูลฝอยชุมชน", "base_year": null, "base_value": null, "target_unit": null, "targets": [0, 0, 0, 0, 0]},
                  {"name": "ร้อยละของตำบลที่มีแผนเผชิญเหตุสาธารณภัย", "base_year": null, "base_value": null, "target_unit": "ร้อยละ", "targets": [0, 0, 0, 0, 0]},
                  {"name": "สัดส่วนปริมาณขยะที่กำจัดได้อย่างถูกต้องต่อปริมาณขยะที่เกิดขึ้นเพิ่มขึ้น", "base_year": 2568, "base_value": "19.53", "target_unit": "ร้อยละ", "targets": [5, 5, 5, 5, 5]},
                  {"name": "ร้้อยละประชากรที่ประสบภัยพิบัติ (อัคคีภัย วาตภัย อุทกภัย ภัยแล้ง)", "base_year": 2568, "base_value": "9.42", "target_unit": "ร้อยละ", "targets": [5, 5, 5, 5, 5]}
                ]
            }
        ];

        const guidelinesData = {
            "ประเด็นการพัฒนาที่ 1 การพัฒนาการท่องเที่ยวมูลค่าสูงเชิงสร้างสรรค์บนฐานอัตลักษณ์ของพื้นที่": [
                "พัฒนาโครงสร้างพื้นฐาน สิ่งอำนวยความสะดวก และสร้างระบบนิเวศเพื่อรองรับการท่องเที่ยวคุณภาพสูง",
                "พัฒนาแหล่งท่องเที่ยวและเส้นทางท่องเที่ยวบนฐานอัตลักษณ์พื้นที่",
                "สร้างมูลค่าเพิ่มให้กับผลิตภัณฑ์และบริการที่เป็นอัตลักษณ์ของท้องถิ่นเพื่อตอบโจทย์ความต้องการของตลาดคุณภาพสูงและสังคมสูงวัย",
                "พัฒนาการท่องเที่ยวให้เป็น จุดหมายปลายทางการท่องเที่ยวเชิงสุขภาพและประสบการณ์มูลค่าสูง",
                "ยกระดับผลิตภาพแรงงานภาคบริการผ่านการสร้างมูลค่าเพิ่มจากทุนทางวัฒนธรรม",
                "การพัฒนาประสบการณ์การท่องเที่ยวมูลค่าสูง",
                "พัฒนาการบริการสุขภาพ เชื่อมโยงการแพทย์สมัยใหม่กับภูมิปัญญา สมุนไพร พืชอัตลักษณ์ ส่งเสริมแนวคิดอาหารเป็นยา ควบคู่การพัฒนาผลิตภัณฑ์อาหารมูลค่าสูง",
                "ส่งเสริมบทบาทของภาคเอกชนในการลงทุน การพัฒนาบริการและยกระดับมาตรฐาน และพัฒนาการท่องเที่ยวประสบการณ์มูลค่าสูง",
                "เชื่อมโยงเครือข่ายชุมชนท่องเที่ยวและการกระจายรายได้ให้ชุมชน ผ่านการส่งเสริมผ่านการท่องเที่ยวชุมชน",
                "ถ่ายทอดองค์ความรู้ เทคโนโลยี และการเข้าถึงตลาด ใช้ข้อมูลและเทคโนโลยีดิจิทัลในการวางแผน และเพิ่มประสิทธิภาพการบริหารจัดการการท่องเที่ยว",
                "ส่งเสริมบทบาทภาคีเครือข่ายการลงทุนและการบริหารจัดการการท่องเที่ยวแบบมีส่วนร่วม",
                "พัฒนาการตลาด แบรนด์ และการสื่อสารการท่องเที่ยวบนฐานอัตลักษณ์เพชรบูรณ์"
            ],
            "ประเด็นการพัฒนาที่ 2 การพัฒนาการเกษตรมูลค่าสูงอย่างยั่งยืน": [
                "พัฒนาโครงสร้างพื้นฐาน เพื่อสนับสนุนการพัฒนาการเกษตรมูลค่าสูง",
                "ยกระดับผลิตภาพและเพิ่มประสิทธิภาพการผลิตภาคเกษตรการเพิ่มโอกาสเข้าสู่ตลาดมูลค่าสูงและตลาดระดับพรีเมียม",
                "ยกระดับมาตรฐานสินค้าเกษตรสู่สากล ด้วยการพัฒนาระบบรับรองมาตรฐาน และระบบตรวจสอบย้อนกลับ",
                "ส่งเสริมกระบวนการผลิตที่เป็นมิตรต่อสิ่งแวดล้อม",
                "พัฒนาเกษตรอัตลักษณ์และสินค้าที่ขึ้นทะเบียนสิ่งบ่งชี้ทางภูมิศาสตร์",
                "เสริมสร้างความมั่นคงของภาคเกษตรในการรับมือกับความเสี่ยงการเปลี่ยนแปลงสภาพภูมิอากาศ",
                "สร้างมูลค่าเพิ่มให้ภาคเกษตรสู่ผลิตภัณฑ์อาหารและผลิตภัณฑ์สุขภาพมูลค่าสูง",
                "การนำงานวิจัย เทคโนโลยี และนวัตกรรมแปรรูปขั้นสูง ยกระดับคุณภาพและสร้างความแตกต่างให้กับสินค้า",
                "เชื่อมโยงภาคเกษตรกับการท่องเที่ยวเชิงเกษตร การท่องเที่ยวเชิงสุขภาพ และการบริการสุขภาพเชิงประสบการณ์"
            ],
            "ประเด็นการพัฒนาที่ 3 การพัฒนาความมั่นคง คุณภาพชีวิต การศึกษา และผลิตภาพคนทุกช่วงวัย": [
                "พัฒนาโครงสร้างพื้นฐานสนับสนุนการพัฒนาคุณภาพชีวิต",
                "การเพิ่มผลิตภาพแรงงานในทุกสาขา และการพัฒนาทุนมนุษย์ทุกช่วงวัย",
                "พัฒนาระบบสวัสดิการและบริการสาธารณะอย่างทั่วถึง",
                "พัฒนาสภาพแวดล้อมที่เอื้อต่อคนทุกช่วงวัย",
                "ส่งเสริมผู้สูงอายุให้มีศักยภาพและมีส่วนร่วมในสังคม",
                "การใช้เทคโนโลยีในการขยายการเข้าถึงบริการ และยกระดับการดูแลคุณภาพชีวิตให้คนทุกช่วงวัย",
                "พัฒนาระบบบริการสุขภาพ และเสริมสร้างระบบสาธารณสุขให้มีความพร้อม",
                "การสร้างความ สงบสุข มั่นคงในชีวิตและ ทรัพย์สิน"
            ],
            "ประเด็นการพัฒนาที่ 4 การส่งเสริมการเจริญเติบโตทางเศรษฐกิจที่ยั่งยืน": [
                "พัฒนาโครงสร้างพื้นฐานเพื่อสนับสนุนการเจริญเติบโตทางเศรษฐกิจ",
                "เชื่อมโยงภาคการเกษตร บริการสุขภาพ และอุตสาหกรรม  ต่อยอดทรัพยากรและพืชอัตลักษณ์ของพื้นที่สู่การผลิตสินค้ามูลค่าสูง ให้อยู่ในห่วงโซ่มูลค่า เพื่อสร้างผลกระทบทางเศรษฐกิจให้กับจังหวัด",
                "ส่งเสริมการวิจัยและพัฒนาเพื่อสร้างองค์ความรู้และนวัตกรรม ที่สอดคล้องกับอุตสาหกรรมในพื้นที่",
                "ส่งเสริมความร่วมมือกับภาคเอกชน เพื่อสนับสนุนการพัฒนาผลิตภัณฑ์มูลค่าสูง",
                "ส่งเสริมการผลิตที่เป็นมิตรต่อสิ่งแวดล้อม ตามแนวคิดเศรษฐกิจหมุนเวียน",
                "พัฒนาโครงข่ายการขนส่ง เพื่อสนับสนุนกิจกรรมทางเศรษฐกิจในภูมิภาค",
                "พัฒนาคลัสเตอร์อุตสาหกรรมที่สอดคล้องกับศักยภาพของพื้นที่",
                "จัดทำแนวทางการรองรับความเสี่ยงทางเศรษฐกิจจากปัจจัยทางภูมิรัฐศาสตร์",
                "การพัฒนาผู้ประกอบการชุมชน วิสาหกิจขนาดกลางและขนาดย่อม",
                "การขยายฐานตลาดสู่ห่วงโซ่เศรษฐกิจภูมิภาค ด้วยเทคโนโลยี"
            ],
            "ประเด็นการพัฒนาที่ 5 การบริหารจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อมเพื่อความสมดุล": [
                "พัฒนาโครงสร้างพื้นฐาน การพัฒนาระนิเวศเมืองอัจฉริยะ และระบบการบริหารจัดการทรัพยากรธรรมชาติอย่างเป็นระบบ",
                "การใช้ประโยชน์จากข้อมูล สำหรับการบริหารจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อม",
                "บูรณาการเทคโนโลยีเพื่อเพิ่มประสิทธิภาพในการคาดการณ์  เฝ้าระวัง ภัยทางธรรมชาติและสิ่งแวดล้อมที่สำคัญ",
                "สนับสนุนการมีส่วนร่วมในชุมชนในการบบริหารจัดการทรัพยากรธรรมชาติเชิงพื้นที่",
                "สนับสนุนการเปลี่ยนผ่านภาคการผลิตและการใช้ทรัพยากรที่เป็นมิตรต่อสิ่งแวดล้อม",
                "ส่งเสริมภาคธุรกิจให้มีการปรับกระบวนการผลิตให้สอดคล้องกับมาตรฐานด้านสิ่งแวดล้อม",
                "เร่งฟื้นฟูป่าต้นน้ำ และทรัพยากรทางธรรมชาติที่สำคัญ",
                "ส่งเสริมกลไกการตั้งรับปรับตัวภาคประชาชน ให้พร้อมรองรับปัญหาด้านสิ่งแวดล้อม",
                "เพิ่มประสิทธิภาพการใช้งานพลังงาน และสนับสนุนการเปลี่ยนผ่านสู่พลังงานสะอาด",
                "การพัฒนาแนวทางการบริหารจัดการปัญหาด้านสิ่งแวดล้อมในชุมชน"
            ]
        };

        const oldData = @json(old() ?: (isset($proposal) ? $proposal : []));

        Alpine.data('proposalForm', () => ({
            issuesData: issuesData,
            guidelinesData: guidelinesData,
            addressData: {
                "เมืองเพชรบูรณ์": ["ในเมือง", "ตะเบาะ", "บ้านโตก", "สะเดียง", "ป่าเลา", "นางั่ว", "ท่าพล", "ดงมูลเหล็ก", "บ้านโคก", "ชอนไพร", "นาป่า", "นายม", "วังชมภู", "น้ำร้อน", "ห้วยสะแก", "ห้วยใหญ่", "ระวิง"],
                "ชนแดน": ["ชนแดน", "ดงขุย", "ท่าข้าม", "พุทธบาท", "ลาดแค", "บ้านกล้วย", "ซับเปิบ", "ตะกุดไร", "ศาลาลาย"],
                "หล่มสัก": ["หล่มสัก", "วัดป่า", "ตาลเดี่ยว", "ฝายนาแซง", "หนองไขว่", "ลานบ่า", "บุ่งคล้า", "บุ่งน้ำเต้า", "น้ำชุน", "หนองสว่าง", "บ้านหวาย", "น้ำก้อ", "ปากช่อง", "น้ำหย่อน", "บ้านติ้ว", "ห้วยไร่", "น้ำตก", "บ้านกลาง", "ช้างตะลูด", "บ้านไร่", "ปากดุก", "บ้านโสก"],
                "หล่มเก่า": ["หล่มเก่า", "นาแซง", "หินฮาว", "บ้านเนิน", "ศิลา", "นาซำ", "วังบาล", "ตาดกลอย"],
                "วิเชียรบุรี": ["ท่าโรง", "สระประดู่", "สามแยก", "โคกปรง", "น้ำร้อน", "บ่อรัง", "พุเตย", "พุขาม", "ภูน้ำหยด", "ซับสมบูรณ์", "บึงกระจับ", "วังใหญ่", "ยางสาว", "น้ำอ้อม"],
                "ศรีเทพ": ["ศรีเทพ", "สระกรวด", "คลองกระจัง", "นาซุ่น", "โคกสะอาด", "หนองย่างทอย", "ประดู่งาม"],
                "หนองไผ่": ["หนองไผ่", "กองทูล", "นาเฉลียง", "บ้านโภชน์", "ท่าแดง", "เพชรละคร", "โบสถ์", "วังท่าดี", "บัววัฒนา", "หนองแจง", "ยางงาม", "ซับกะพง", "วังโค้ง"],
                "บึงสามพัน": ["ซับสมอทอด", "ซับไม้แดง", "หนองแจง", "กันจุ", "วังพิกุล", "พญาวัง", "ศรีมงคล", "สระแก้ว", "บึงสามพัน"],
                "น้ำหนาว": ["น้ำหนาว", "หลักด่าน", "วอแก้ว", "โคกมน"],
                "วังโป่ง": ["วังโป่ง", "ท้ายดง", "ซับเปิบ", "วังหิน", "วังศาล"],
                "เขาค้อ": ["เขาค้อ", "สะเดาะพง", "หนองแม่นา", "แคมป์สน", "ทุ่งสมอ", "ริมสีม่วง", "เข็กน้อย"]
            },
            currentKPIs: [],
            targetAreaModal: {
                isOpen: false,
                activityIndex: null,
                temp_district: [],
                temp_subdistrict: []
            },
            formData: {
                project_name: oldData.project_name || '',
                province_issue: oldData.province_issue || '',
                principles: oldData.principles || '',
                objectives: oldData.objectives || '',
                target_province: oldData.target_province || 'เพชรบูรณ์',
                target_district: Array.isArray(oldData.target_district) ? oldData.target_district : (oldData.target_district ? [oldData.target_district] : []),
                target_subdistrict: Array.isArray(oldData.target_subdistrict) ? oldData.target_subdistrict : (oldData.target_subdistrict ? [oldData.target_subdistrict] : []),
                target_group: oldData.target_group || '',
                operating_agency: oldData.operating_agency || '{{ auth("phy70")->check() ? (auth("phy70")->user()->organization->name ?? "") : "" }}',
                responsible_person: oldData.responsible_person || '{{ auth("phy70")->check() ? auth("phy70")->user()->name : "" }}',
                position: oldData.position || '',
                phone_number: oldData.phone_number || '{{ auth("phy70")->check() ? auth("phy70")->user()->phone_number : "" }}',
                output: oldData.output || '',
                outcome: oldData.outcome || '',
                activities: oldData.activities ? Object.values(oldData.activities) : []
            },
            
            init() {
                if (this.formData.province_issue) {
                    this.loadKPIs();
                    // Merge old KPIs if they exist
                    if (oldData.kpis) {
                        this.currentKPIs = this.currentKPIs.map(kpi => {
                            const oldKpi = oldData.kpis.find(k => k.name === kpi.name);
                            if (oldKpi) {
                                return { ...kpi, selected: true, targets: oldKpi.targets || kpi.targets };
                            }
                            return kpi;
                        });
                    }
                }
                if (this.formData.activities.length === 0) {
                    this.addActivity();
                }
            },

            onIssueChange() {
                this.loadKPIs();
            },

            loadKPIs() {
                const issue = this.issuesData.find(i => i.issue === this.formData.province_issue);
                if (issue) {
                    // Deep copy to avoid mutating original data
                    this.currentKPIs = JSON.parse(JSON.stringify(issue.kpis)).map(k => ({...k, selected: false}));
                } else {
                    this.currentKPIs = [];
                }
            },

            addActivity() {
                this.formData.activities.push({
                    name: '',
                    budget: '',
                    guideline: '',
                    target_province: 'เพชรบูรณ์',
                    target_district: [],
                    target_subdistrict: [],
                    target_group: this.formData.target_group || '',
                    project_kpis: [],
                    activity_kpis: [{name: ''}],
                    responsible_person: this.formData.operating_agency || '',
                    responsible_agency: '',
                    co_agencies: [{name: ''}]
                });
            },

            removeActivity(index) {
                this.formData.activities.splice(index, 1);
            },
            openTargetAreaModal(index) {
                this.targetAreaModal.activityIndex = index;
                const act = this.formData.activities[index];
                this.targetAreaModal.temp_district = Array.isArray(act.target_district) ? [...act.target_district] : (act.target_district ? [act.target_district] : []);
                this.targetAreaModal.temp_subdistrict = Array.isArray(act.target_subdistrict) ? [...act.target_subdistrict] : (act.target_subdistrict ? [act.target_subdistrict] : []);
                this.targetAreaModal.isOpen = true;
            },

            saveTargetAreaModal() {
                if (this.targetAreaModal.activityIndex !== null) {
                    const index = this.targetAreaModal.activityIndex;
                    this.formData.activities[index].target_district = [...this.targetAreaModal.temp_district];
                    this.formData.activities[index].target_subdistrict = [...this.targetAreaModal.temp_subdistrict];
                }
                this.closeTargetAreaModal();
            },

            closeTargetAreaModal() {
                this.targetAreaModal.isOpen = false;
                this.targetAreaModal.activityIndex = null;
            }
        }));
    });
  </script>
</x-phy70::layouts.master>