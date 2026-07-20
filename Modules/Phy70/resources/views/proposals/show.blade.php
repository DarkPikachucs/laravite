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
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
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

    .show-container {
      max-width: 900px;
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

    .glass-card {
      background: var(--bg-surface);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border-glow);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      margin-bottom: 28px;
    }

    .section-header {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 12px;
      margin-bottom: 20px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--secondary);
      font-family: 'Prompt', sans-serif;
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    @media (max-width: 600px) {
      .info-grid {
        grid-template-columns: 1fr;
      }
    }

    .info-item {
      margin-bottom: 20px;
    }

    .info-label {
      font-size: 13px;
      color: var(--text-muted);
      font-weight: 500;
      margin-bottom: 6px;
      font-family: 'Prompt', sans-serif;
      text-transform: uppercase;
    }

    .info-val {
      font-size: 15px;
      color: var(--text-main);
      line-height: 1.6;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 10px;
      padding: 12px 16px;
      /* white-space: pre-wrap; */
    }

    :root.light-theme .info-val {
      background: rgba(0, 0, 0, 0.03);
      border-color: rgba(0, 0, 0, 0.05);
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
      text-decoration: none;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .bg-glow {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
      top: 10%;
      left: 5%;
      pointer-events: none;
      z-index: 0;
    }
  </style>

  <div class="bg-glow"></div>

  <div class="show-container">
    <header class="header">
      <h2 class="title">รายละเอียดข้อเสนอโครงการ</h2>
      <div style="display: flex; gap: 12px;">
        <a href="{{ route('phy70.proposal.canvas', $proposal->id) }}" target="_blank" class="btn-secondary"
          style="background: linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(79,70,229,0.1) 100%); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); display: flex; align-items: center; gap: 6px;">
          📄 View Project Canvas
        </a>
        {{-- <button onclick="document.getElementById('ai-prompt-modal').style.display='flex'" class="btn-secondary"
          style="background: linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(99,102,241,0.1) 100%); color: var(--secondary); border: 1px solid rgba(6,182,212,0.3);">
          ✨ Export AI Prompt
        </button> --}}
        @if($proposal->status === 'draft')
        <a href="{{ route('phy70.proposal.edit', $proposal->id) }}" class="btn-secondary"
          style="background: rgba(99, 102, 241, 0.1); border-color: var(--primary); color: var(--primary); display: flex; align-items: center; gap: 6px;">
          ✏️ แก้ไขข้อเสนอ (ร่าง)
        </a>
        @endif
        <a href="/app/phy70" class="btn-secondary">← กลับสู่แดชบอร์ด</a>
      </div>
    </header>

    <!-- Project Detail Header Card -->
    <div class="glass-card"
      style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);">
      <div class="info-label" style="color: var(--secondary);">ชื่อโครงการ</div>
      <h1
        style="font-size: 24px; font-weight: 600; font-family: 'Prompt', sans-serif; color: var(--text-main); line-height: 1.4; margin-bottom: 12px;">
        {{ $proposal->project_name }}
      </h1>
      <div style="font-size: 13.5px; color: var(--text-muted); display: flex; gap: 20px; flex-wrap: wrap;">
        <span>หน่วยงานเสนอ: <strong>{{ $proposal->organization->name }}</strong></span>
        <span>ผู้จัดส่งข้อเสนอ: <strong>{{ $proposal->user->name }}</strong></span>
        <span>ส่งวันที่: <strong style="font-family: monospace;">{{
            $proposal->created_at->timezone('Asia/Bangkok')->addYears(543)->format('d/m/Y H:i') }} น.</strong></span>
      </div>
    </div>

    <div class="glass-card">
      <div class="section-header">
        <h3 class="section-title">ส่วนที่ 1: ข้อมูลโครงการ</h3>
      </div>

      <div class="info-item">
        <div class="info-label">ประเด็นการพัฒนาของจังหวัด</div>
        <div class="info-val">{{ $proposal->province_issue ?: 'ไม่ระบุข้อมูล' }}</div>
      </div>

      <div class="info-item">
        <div class="info-label">แผนงานย่อยของประเด็น</div>
        <div class="info-val">{{ $proposal->plan ?: 'ไม่ระบุข้อมูล' }}</div>
      </div>

      <div class="info-item">
        <div class="info-label">ระยะเวลาดำเนินงาน (ปีงบประมาณ)</div>
        <div class="info-val" style="background: transparent; border: none; padding: 0;">
          @php
          $years = ['2571', '2572', '2573', '2574', '2575'];
          $operatingYear = $proposal->operating_year;
          $selectedIndex = $operatingYear ? array_search($operatingYear, $years) : -1;
          $progressWidth = $selectedIndex >= 0 ? ($selectedIndex / (count($years) - 1) * 100) : 0;
          @endphp
          @if(!$operatingYear)
          <div
            style="padding: 12px 16px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; color: var(--text-muted); font-size: 14px;">
            ไม่ระบุข้อมูล</div>
          @else
          <div
            style="position: relative; margin: 16px auto 0 auto; padding-bottom: 28px; width: 100%; max-width: 600px;">
            <!-- Background line -->
            <div
              style="position: absolute; top: 12px; left: 0; width: 100%; height: 4px; background: rgba(148, 163, 184, 0.2); z-index: 0; border-radius: 2px;">
            </div>

            <!-- Foreground (Active) line -->
            <div
              style="position: absolute; top: 12px; left: 0; height: 4px; background: var(--primary); z-index: 1; border-radius: 2px; width: {{ $progressWidth }}%;">
            </div>

            <!-- Nodes -->
            <div style="display: flex; justify-content: space-between; position: relative; z-index: 2;">
              @foreach($years as $year)
              @php
              $isActive = $operatingYear && $year <= $operatingYear; @endphp <div
                style="display: flex; flex-direction: column; align-items: center; position: relative;">
                <!-- Dot -->
                <div
                  style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: {{ $isActive ? 'var(--primary)' : 'var(--bg-base, #060913)' }}; border: 2px solid {{ $isActive ? 'var(--primary)' : 'rgba(148, 163, 184, 0.4)' }}; {{ $isActive ? 'box-shadow: 0 0 12px var(--primary-glow);' : '' }}">
                  <div
                    style="width: 10px; height: 10px; border-radius: 50%; background: #fff; opacity: {{ $isActive ? '1' : '0' }}; transition: opacity 0.2s;">
                  </div>
                </div>

                <!-- Label -->
                <span
                  style="font-size: 13px; font-weight: 600; position: absolute; top: 34px; white-space: nowrap; color: {{ $isActive ? 'var(--primary)' : 'var(--text-muted)' }};">ปี
                  {{ $year }}</span>
            </div>
            @endforeach
          </div>
        </div>
        @endif
      </div>
    </div>

    <div class="info-item">
      <div class="info-label">หลักการและเหตุผล</div>
      <div class="info-val">{{ $proposal->principles ?: 'ไม่ระบุข้อมูล' }}</div>
    </div>

    <div class="info-item">
      <div class="info-label">วัตถุประสงค์ของโครงการ</div>
      <div class="info-val">{{ $proposal->objectives ?: 'ไม่ระบุข้อมูล' }}</div>
    </div>

    <div class="info-item">
      <div class="info-label">กลุ่มเป้าหมาย</div>
      <div class="info-val">{{ $proposal->target_group ?: 'ไม่ระบุข้อมูล' }}</div>
    </div>

    @if($proposal->kpis && is_array($proposal->kpis))
    <div class="info-item">
      <div class="info-label">ตัวชี้วัดและค่าเป้าหมาย (KPIs)</div>
      <div class="info-val" style="padding: 0; background: transparent; border: none;">
        @foreach($proposal->kpis as $kpi)
        @if(isset($kpi['selected']) && $kpi['selected'])
        <div
          style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
            <span style="color: var(--primary); font-size: 14px;">🎯</span>
            <span style="font-weight: 500; font-size: 13.5px; color: var(--text-main);">{{ $kpi['name'] }}</span>
          </div>


        </div>
        @endif
        @endforeach
      </div>
    </div>
    @endif
    @php
    $totalBudget = collect($proposal->activities)->sum(function($act) { return (float)($act['budget'] ?? 0); });
    $totalYearlyBudgets = [];
    if (!empty($proposal->activities)) {
    foreach ($proposal->activities as $act) {
    if (!empty($act['yearly_budgets']) && is_array($act['yearly_budgets'])) {
    foreach ($act['yearly_budgets'] as $year => $budget) {
    if (is_numeric($budget)) {
    $totalYearlyBudgets[$year] = ($totalYearlyBudgets[$year] ?? 0) + (float)$budget;
    }
    }
    }
    }
    }
    @endphp

    <div class="info-item" style="margin-top: 24px; padding-top: 20px; border-top: 1px dashed rgba(255,255,255,0.1);">
      <div class="info-label" style="font-size: 15px; font-weight: 600; color: var(--secondary); margin-bottom: 12px;">
        งบประมาณรวมทั้งโครงการ</div>
      <div class="info-val" style="font-size: 22px; font-weight: 700; color: var(--primary); margin-bottom: 16px;">
        {{ number_format($totalBudget, 2) }} <span
          style="font-size: 14px; font-weight: 400; color: var(--text-muted);">บาท</span>
      </div>

      @if(!empty($totalYearlyBudgets))
      <div
        style="padding: 16px; background: rgba(0,0,0,0.05); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; text-align: center;">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px; font-weight: 600;">
          งบประมาณรวมแยกตามปีงบประมาณ</div>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;">
          @foreach($years as $year)
          @if($year <= $operatingYear && isset($totalYearlyBudgets[$year])) <div
            style="flex: 1; min-width: 100px; max-width: 150px; background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">ปี {{ $year }}</div>
            <div style="font-weight: 600; font-size: 15px; color: var(--primary);">
              {{ number_format($totalYearlyBudgets[$year], 2) }}
            </div>
        </div>
        @endif
        @endforeach
      </div>
    </div>
    @endif
  </div>
  @if($proposal->attachments && count($proposal->attachments) > 0)
  <div class="info-item" style="margin-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 20px;">
    <div class="info-label" style="color: var(--secondary);">ไฟล์แนบประกอบโครงการ</div>
    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
      @foreach($proposal->attachments as $attachment)
      <a href="{{ $attachment['path'] }}" target="_blank" class="info-val"
        style="display: flex; align-items: center; gap: 10px; text-decoration: none; background: rgba(99, 102, 241, 0.08);">
        <span>📄 {{ $attachment['name'] }}</span>
      </a>
      @endforeach
    </div>
  </div>
  @endif
  </div>

  @if($proposal->activities && count($proposal->activities) > 0)
  @php
  $addressData = [
  "เมืองเพชรบูรณ์" => ["ในเมือง", "ตะเบาะ", "วังชมภู", "ตาดกลอย", "บ้านโตก", "ชอนไพร", "นาป่า", "นายม", "น้ำร้อน",
  "สะเดียง", "ท่าพล", "ดงมูลเหล็ก", "บ้านโคก", "ห้วยใหญ่", "ห้วยสะแก", "ระวิง"],
  "ชนแดน" => ["ชนแดน", "ดงขุย", "ท่าข้าม", "พุทธบาท", "ลาดแค", "บ้านกล้วย", "ซับพุทรา", "ตะกุดไร", "ศาลาลาย"],
  "หล่มสัก" => ["หล่มสัก", "วัดป่า", "ตาลเดี่ยว", "หนองสว่าง", "บ้านติ้ว", "หนองไขว่", "บ้านกลาง", "ช้างตะลูด",
  "น้ำชุน", "บ้านโสก", "น้ำก้อ", "ฝายนาแซง", "บุ่งคล้า", "บุ่งน้ำเต้า", "บ้านหวาย", "ลานบ่า", "ปากช่อง"],
  "หล่มเก่า" => ["หล่มเก่า", "นาแซง", "หนองอิเฒ่า", "หินฮาว", "บ้านเนิน", "ศิลา", "ตาดกลอย", "วังบาล", "นาซำ"],
  "วิเชียรบุรี" => ["ท่าโรง", "สระประดู่", "สามแยก", "โคกปรง", "น้ำร้อน", "บ่อรัง", "พุเตย", "พุขาม", "ภูน้ำหยด",
  "ซับสมบูรณ์", "บึงกระจับ", "วังใหญ่", "ยางสาว"],
  "ศรีเทพ" => ["ศรีเทพ", "สระกรวด", "คลองกระจัง", "นาสนุ่น", "โคกสะอาด", "หนองย่างทอย", "ประดู่งาม"],
  "หนองไผ่" => ["หนองไผ่", "นาเฉลียง", "กองทูล", "บ้านโภชน์", "เพชรละคร", "บ่อไทย", "ห้วยโป่ง", "วังท่าดี", "บัววัฒนา",
  "วังโบสถ์", "ท่าแดง", "ยางงาม"],
  "บึงสามพัน" => ["ซับสมอทอด", "ซับไม้แดง", "หนองแจง", "กันจุ", "วังพิกุล", "พญาวัง", "ศรีมงคล", "สระแก้ว",
  "บึงสามพัน"],
  "น้ำหนาว" => ["น้ำหนาว", "หลักด่าน", "วอแก้ว", "โคกมน"],
  "วังโป่ง" => ["วังโป่ง", "ท้ายดง", "ซับเปิบ", "วังหิน", "วังศาล"],
  "เขาค้อ" => ["เขาค้อ", "สะเดาะพง", "หนองแม่นา", "แคมป์สน", "ทุ่งสมอ", "ริมสีม่วง", "เข็กน้อย"]
  ];
  @endphp
  <div class="glass-card">
    <div class="section-header">
      <h3 class="section-title">ส่วนที่ 2: กิจกรรมย่อยภายใต้โครงการ</h3>
    </div>
    @foreach($proposal->activities as $index => $act)
    <div
      style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
      <h4 style="font-size: 16px; font-weight: 600; color: var(--secondary); margin-bottom: 16px;">
        🎯 กิจกรรมที่ {{ $index + 1 }}: {{ $act['name'] ?? '-' }}
      </h4>

      <div class="info-item" style="margin-bottom: 12px;">
        <div class="info-label">งบประมาณรวม (บาท)</div>
        <div class="info-val" style="margin-bottom: 12px;">{{ number_format($act['budget'] ?? 0, 2) }}</div>
        @if(!empty($act['yearly_budgets']) && is_array($act['yearly_budgets']))
        <div
          style="padding: 12px; background: rgba(0,0,0,0.05); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px; font-weight: 600;">แยกตามปีงบประมาณ
          </div>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;">
            @foreach($years as $year)
            @if($year <= $operatingYear && isset($act['yearly_budgets'][$year]) &&
              is_numeric($act['yearly_budgets'][$year])) <div style="flex: 1; min-width: 80px; max-width: 120px;">
              <div style="font-size: 11px; color: var(--text-muted);">ปี {{ $year }}</div>
              <div style="font-weight: 500; font-size: 13px; color: var(--primary);">
                {{ number_format($act['yearly_budgets'][$year], 2) }}
              </div>
          </div>
          @endif
          @endforeach
        </div>
      </div>
      @endif
    </div>
    <div class="info-item" style="margin-bottom: 12px;">
      <div class="info-label">แนวทางการพัฒนาจังหวัด</div>
      <div class="info-val">{{ $act['guideline'] ?? '-' }}</div>
    </div>


    <div class="info-grid">
      <div class="info-item" style="margin-bottom: 12px;">
        <div class="info-label">พื้นที่เป้าหมาย</div>
        <div class="info-val">
          @if(isset($act['target_province']) || !empty($act['target_district']) || !empty($act['target_subdistrict']))
          จังหวัด{{ $act['target_province'] ?? $proposal->target_province ?? 'เพชรบูรณ์' }}
          @php
          $rawDistricts = !empty($act['target_district']) ? (is_array($act['target_district']) ?
          $act['target_district'] : explode(',', $act['target_district'])) : [];
          $rawSubdistricts = !empty($act['target_subdistrict']) ? (is_array($act['target_subdistrict']) ?
          $act['target_subdistrict'] : explode(',', $act['target_subdistrict'])) : [];

          $selectedDistricts = collect($rawDistricts)->flatMap(fn($d) => explode(',', $d))->map(fn($d) =>
          trim($d))->filter()->unique()->values()->all();
          $selectedSubdistricts = collect($rawSubdistricts)->flatMap(fn($d) => explode(',', $d))->map(fn($d) =>
          trim($d))->filter()->unique()->values()->all();
          @endphp
          @if(count($selectedDistricts) > 0)
          <div style="margin-top: 8px; padding-left: 10px; display: flex; flex-direction: column; gap: 4px;">
            @foreach($selectedDistricts as $dist)
            <div>
              <span style="color: var(--primary);">➔ อำเภอ{{ $dist }}</span>
              @php
              $subsInThisDist = [];
              if (isset($addressData[$dist])) {
              $subsInThisDist = array_intersect($selectedSubdistricts, $addressData[$dist]);
              }
              @endphp
              @if(count($subsInThisDist) > 0)
              <span style="color: var(--text-muted); font-size: 13px; margin-left: 6px;">
                (ตำบล: {{ implode(', ', $subsInThisDist) }})
              </span>
              @endif
            </div>
            @endforeach
          </div>
          @endif
          @else
          {{ $act['target_area'] ?? '-' }}
          @endif
        </div>
      </div>
      <div class="info-item" style="margin-bottom: 12px;">
        <div class="info-label">กลุ่มเป้าหมาย</div>
        <div class="info-val">{{ $act['target_group'] ?? '-' }}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-item" style="margin-bottom: 12px;">
        <div class="info-label">ผู้รับผิดชอบ</div>
        <div class="info-val">{{ $act['responsible_person'] ?? '-' }}</div>
      </div>
      <div class="info-item" style="margin-bottom: 12px;">
        <div class="info-label">หน่วยงานรับผิดชอบ</div>
        <div class="info-val">{{ $act['responsible_agency'] ?? '-' }}</div>
      </div>
    </div>

    <div class="info-item" style="margin-bottom: 12px;">
      <div class="info-label">หน่วยงานที่เกี่ยวข้อง</div>
      <div class="info-val">
        @if(!empty($act['co_agencies']) && is_array($act['co_agencies']))
        <ul style="margin: 0; padding-left: 20px;">
          @foreach($act['co_agencies'] as $co)
          @if(!empty($co['name']))
          <li>{{ $co['name'] }}</li>
          @endif
          @endforeach
        </ul>
        @else
        -
        @endif
      </div>
    </div>

    <div class="info-grid">
      <div class="info-item" style="margin-bottom: 12px;">
        <div class="info-label">ตัวชี้วัดโครงการที่กิจกรรมนี้ตอบสนอง</div>
        <div class="info-val">
          @if(!empty($act['project_kpis']) && is_array($act['project_kpis']))
          <ul style="margin: 0; padding-left: 20px;">
            @foreach($act['project_kpis'] as $pkpi)
            <li>{{ $pkpi }}</li>
            @endforeach
          </ul>
          @else
          {{ is_string($act['project_kpis'] ?? null) ? $act['project_kpis'] : '-' }}
          @endif
        </div>
      </div>
      <div class="info-item" style="margin-bottom: 12px;">
        <div class="info-label">ตัวชี้วัดของกิจกรรม</div>
        <div class="info-val">
          @if(!empty($act['activity_kpis']) && is_array($act['activity_kpis']))
          <table class="table" style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 14px;">
            <thead>
              <tr style="background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.1);">
                <th style="padding: 8px; text-align: left; color: var(--text-muted); font-weight: 500;">ชื่อตัวชี้วัด
                </th>
                <th style="padding: 8px; text-align: left; color: var(--text-muted); font-weight: 500; width: 25%;">
                  ค่าเป้าหมาย</th>
                <th style="padding: 8px; text-align: left; color: var(--text-muted); font-weight: 500; width: 25%;">
                  หน่วยวัด</th>
              </tr>
            </thead>
            <tbody>
              @foreach($act['activity_kpis'] as $akpi)
              @if(!empty($akpi['name']))
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 8px;">{{ $akpi['name'] }}</td>
                <td style="padding: 8px;">{{ $akpi['target'] ?? '-' }}</td>
                <td style="padding: 8px;">{{ $akpi['unit'] ?? '-' }}</td>
              </tr>
              @endif
              @endforeach
            </tbody>
          </table>
          @else
          {{ is_string($act['activity_kpis'] ?? null) ? $act['activity_kpis'] : '-' }}
          @endif
        </div>
      </div>
    </div>

  </div>
  @endforeach
  </div>
  @endif

  <div class="glass-card">
    <div class="section-header">
      <h3 class="section-title">ส่วนที่ 3: ผลผลิตและผลลัพธ์</h3>
    </div>
    <div class="info-item">
      <div class="info-label">ผลผลิต (Output)</div>
      <div class="info-val">{{ $proposal->output ?: 'ไม่ระบุข้อมูล' }}</div>
    </div>
    <div class="info-item">
      <div class="info-label">ผลลัพธ์ (Outcome)</div>
      <div class="info-val">{{ $proposal->outcome ?: 'ไม่ระบุข้อมูล' }}</div>
    </div>
  </div>

  @if(!empty($proposal->documents) && is_array($proposal->documents))
  <div class="glass-card">
    <div class="section-header">
      <h3 class="section-title">ส่วนที่ 4: เอกสารโครงการ</h3>
    </div>
    <div class="info-item">
      <div class="info-label">ไฟล์แนบ</div>
      <div class="info-val">
        <ul style="padding-left: 20px;">
          @foreach($proposal->documents as $doc)
          @php
          $isOldFormat = is_string($doc);
          $docPath = $isOldFormat ? $doc : $doc['path'];
          $docName = $isOldFormat ? basename($doc) : $doc['name'];
          @endphp
          <li><a href="{{ Storage::url(preg_replace('~^/storage/~', '', $docPath)) }}" target="_blank"
              style="color: var(--secondary); text-decoration: underline;">{{ $docName }}</a></li>
          @endforeach
        </ul>
      </div>
    </div>
  </div>
  @endif

  </div>

  <div id="ai-prompt-modal"
    style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 100; align-items: center; justify-content: center; backdrop-filter: blur(8px);">
    <div
      style="background: var(--bg-base); border: 1px solid var(--border-glow); border-radius: 20px; padding: 32px; width: 90%; max-width: 800px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h3 style="font-size: 20px; font-weight: 600; color: var(--primary); font-family: 'Prompt', sans-serif;">✨ AI
          Image Generation Prompt</h3>
        <button onclick="document.getElementById('ai-prompt-modal').style.display='none'"
          style="background: none; border: none; color: var(--text-muted); font-size: 24px; cursor: pointer;">&times;</button>
      </div>
      <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">
        คัดลอกข้อความด้านล่างนี้ไปวางในเครื่องมือ AI (เช่น Midjourney, DALL-E) เพื่อสร้างรูปภาพ Project Canvas
        ได้เลยครับ</p>
      <div style="position: relative;">
        <textarea id="prompt-text"
          style="width: 100%; height: 400px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; color: var(--text-main); font-family: monospace; font-size: 14px; resize: vertical; line-height: 1.6;"
          readonly>High-resolution professional infographic poster in a clean project canvas layout, replicating the exact structure and color scheme of image_0.png (green, blue, and orange accents on a white background).

Top Banner: Replace original text with {{ $proposal->project_code ?: 'PROJECT-CODE' }} [ใส่ชื่อหัวข้อหลักภาษาอังกฤษ เช่น SMART COMMUNITY FARMING & DIGITAL ECONOMY]. Below it, add the Thai title: {{ $proposal->project_name }}, with English subtitle: [ใส่ชื่อโครงการภาษาอังกฤษ เช่น Participatory Sustainable Community Agriculture & Digital Economy Project]. Add small icons below the title representing: [Smart Farm], [Digital Platform], [Eco-Logistics], [Stronger Community].

Column 1 (Green/Blue themes):

Top Card: หลักการและเหตุผล (Rationale / Background) with new bullet points tailored to the project (e.g., {{ \Illuminate\Support\Str::limit(strip_tags($proposal->principles), 150) }}). Add a small illustrative icon of a farmer using a tablet.

Middle Card: วัตถุประสงค์ของโครงการ (Objectives) with numbered points (blue circles) and relevant new icons (e.g., {{ \Illuminate\Support\Str::limit(strip_tags($proposal->objectives), 150) }}).

Bottom: Small illustrative scene of people collaborating on modern agricultural solutions.

Column 2 (Activity-based):

Top Card: กิจกรรมหลัก (Key Activities) with numbered green circles and unique illustrative icons for each step (e.g., @if($proposal->activities)@foreach($proposal->activities as $index => $act) {{ $index + 1 }}. {{ $act['name'] }}, @endforeach @endif ). Include sub-points with matching small icons.

Bottom Card: ทรัพยากรที่ต้องใช้ (Resources) with numbered green circles and icons representing technical experts, smart tech, budget, and infrastructure.

Column 3 (Outcome and Risk focus):

Top Card: ผลกระทบด้านต่างๆ (Impact Areas) with customized points and icons for Environment, Social, Economy, and Education impacts.

Middle Card: ความเสี่ยงและแนวทางจัดการความเสี่ยง (Risks & Mitigation) with red-orange text title and numbered orange points, each with relevant risk icons and mitigation icons (e.g., tech resistance, data security, high costs).

Bottom: Create two sub-cards with green titles: ผลลัพธ์ที่คาดหวัง (Expected Outputs / Outcomes) (e.g., {{ \Illuminate\Support\Str::limit(strip_tags($proposal->output), 100) }} and {{ \Illuminate\Support\Str::limit(strip_tags($proposal->outcome), 100) }}) and ตัวชี้วัดความสำเร็จ (Key Indicators), matching the table structure of image_0.png with project-specific data points (@if(!empty($proposal->kpis)) @foreach($proposal->kpis as $kpi) @if(isset($kpi['selected']) && $kpi['selected']) {{ $kpi['name'] }}, @endif @endforeach @endif).

Footer: Replicate the landscape scene with a stylized modern community and farm featuring solar panels and eco-friendly delivery vehicles. Include a new Thai tagline: [สร้างสรรค์อนาคตที่ยั่งยืนทีละก้าวทางดิจิทัล เพื่อชุมชนที่เข้มแข็งกว่า].

Style: Clean digital vector illustration, professional, organized, like a printed poster.</textarea>
        <button
          onclick="navigator.clipboard.writeText(document.getElementById('prompt-text').value); alert('คัดลอก Prompt เรียบร้อยแล้ว!');"
          class="btn-secondary"
          style="position: absolute; top: 16px; right: 24px; background: rgba(99,102,241,0.2); border-color: var(--primary); padding: 8px 16px; font-size: 13px;">
          📋 คัดลอก
        </button>
      </div>
    </div>
  </div>

</x-phy70::layouts.master>