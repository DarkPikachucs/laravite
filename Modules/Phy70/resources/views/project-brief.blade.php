<x-phy70::layouts.master>
  <link
    href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap"
    rel="stylesheet">

  @php
  // ---- Normalise data from the proposal into แบบ จ.1-1 fields --------
  $activities = is_array($proposal->activities) ? $proposal->activities : [];

  // งบประมาณรวมทั้งโครงการ = ผลรวมงบของทุกกิจกรรม
  $totalBudget = collect($activities)->sum(fn ($a) => (float) ($a['budget'] ?? 0));

  // ตัวชี้วัดที่ถูกเลือก (สำหรับหัวฟอร์ม + ข้อ 4)
  $selectedKpis = collect(is_array($proposal->kpis) ? $proposal->kpis : [])
    ->filter(fn ($k) => is_array($k) && !empty($k['selected']) && !empty($k['name']))
    ->map(fn ($k) => $k['name'])->values();

  // พื้นที่เป้าหมาย: จังหวัด / อำเภอ / ตำบล
  $flat = function ($v) {
    return collect(is_array($v) ? $v : (filled($v) ? explode(',', (string) $v) : []))
      ->flatMap(fn ($x) => explode(',', (string) $x))
      ->map(fn ($x) => trim($x))->filter()->unique()->values();
  };
  $areaProvince = trim((string) ($proposal->target_province ?? ''));
  $areaDistricts = $flat($proposal->target_district);
  $areaSubdistricts = $flat($proposal->target_subdistrict);

  // หน่วยงานที่เกี่ยวข้อง (รวมจากทุกกิจกรรม)
  $relatedAgencies = collect($activities)
    ->flatMap(fn ($a) => collect($a['co_agencies'] ?? [])->pluck('name'))
    ->filter()->map(fn ($x) => trim($x))->unique()->values();

  $val = fn ($v) => filled($v) ? $v : '—';

  // ---- ระยะเวลาดำเนินโครงการ (ปีงบประมาณ) ----------------------------
  // operating_year = ปีสิ้นสุด (ตามฟอร์ม โครงการเริ่มปีแรกของแผนแล้วนับสะสมถึงปีนี้)
  // ถ้าครอบคลุมมากกว่า 1 ปี → แจ้งเป็นช่วง "ตั้งแต่ปี ... ถึง ..." พร้อมระบุว่า "ทุกปี"
  $fyList = $fiscalYears ?? ['2571', '2572', '2573', '2574', '2575'];
  $endYear = trim((string) ($proposal->operating_year ?? ''));
  $coveredYears = $endYear !== ''
    ? array_values(array_filter($fyList, fn ($y) => (string) $y <= $endYear))
    : [];
  if (count($coveredYears) <= 1) {
    $durationText = $endYear !== '' ? 'ปีงบประมาณ พ.ศ. ' . $endYear : '—';
  } else {
    $durationText = 'ทุกปีงบประมาณ ตั้งแต่ พ.ศ. ' . $coveredYears[0]
      . ' ถึง พ.ศ. ' . end($coveredYears)
      . ' (รวม ' . count($coveredYears) . ' ปี)';
  }
  @endphp

  <style>
    .brief-page {
      --ink: #1a1a1a;
      --ink-soft: #444;
      --line: #333;
      --line-soft: #bcbcbc;
      --paper: #ffffff;
      max-width: 900px;
      margin: 0 auto;
      padding: 32px 20px 80px;
      position: relative;
      z-index: 10;
      font-family: 'Sarabun', 'IBM Plex Sans Thai', sans-serif;
    }

    /* Toolbar (hidden on print) */
    .brief-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      max-width: 900px;
      margin: 0 auto 18px;
      flex-wrap: wrap;
    }

    .brief-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: var(--text-main);
      padding: 10px 18px;
      border-radius: 12px;
      font-family: 'IBM Plex Sans Thai', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }

    .brief-btn:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .brief-btn.primary {
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      border-color: transparent;
      color: #fff;
    }

    :root.light-theme .brief-btn {
      background: rgba(0, 0, 0, 0.04);
      border-color: rgba(0, 0, 0, 0.12);
    }

    :root.light-theme .brief-btn:hover {
      background: rgba(0, 0, 0, 0.08);
    }

    /* The white A4-like sheet */
    .brief-sheet {
      background: var(--paper);
      color: var(--ink);
      border: 1px solid var(--line);
      border-radius: 4px;
      padding: 48px 52px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
      font-size: 15px;
      line-height: 1.7;
    }

    .brief-corner {
      text-align: right;
      font-weight: 700;
      margin-bottom: 2px;
    }

    .brief-formno {
      text-align: right;
      font-weight: 700;
      line-height: 1.4;
      margin-bottom: 18px;
    }

    .brief-formno small {
      display: block;
      font-weight: 500;
      font-size: 13.5px;
    }

    .brief-heading {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      margin: 8px 0 26px;
      line-height: 1.5;
    }

    /* The "label ...... value" header lines */
    .brief-line {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 10px;
    }

    .brief-line .lbl {
      font-weight: 700;
      white-space: nowrap;
    }

    .brief-line .val {
      flex: 1;
      min-width: 0;
      border-bottom: 1px dotted var(--line-soft);
      font-weight: 500;
      color: var(--ink-soft);
      padding: 0 4px 2px;
      overflow-wrap: anywhere;
    }

    .brief-line .hint {
      font-weight: 400;
      font-size: 12.5px;
      color: #888;
      white-space: nowrap;
    }

    /* Main table */
    .brief-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 22px;
    }

    .brief-table th,
    .brief-table td {
      border: 1px solid var(--line);
      padding: 10px 14px;
      vertical-align: top;
      text-align: left;
    }

    .brief-table thead th {
      background: #f0f0f0;
      text-align: center;
      font-weight: 700;
      font-size: 15.5px;
    }

    .brief-table .col-topic {
      width: 34%;
      font-weight: 600;
    }

    .brief-table .num {
      font-weight: 700;
    }

    .brief-detail {
      color: var(--ink-soft);
      font-weight: 500;
      white-space: pre-line;
      overflow-wrap: anywhere;
    }

    .brief-sub {
      padding-left: 22px;
      font-weight: 600;
      color: var(--ink);
    }

    .brief-kv {
      margin: 2px 0 0 22px;
      color: var(--ink-soft);
      font-weight: 500;
    }

    .brief-kv b {
      color: var(--ink);
      font-weight: 600;
    }

    .brief-list {
      margin: 4px 0 0;
      padding-left: 20px;
    }

    .brief-money {
      font-weight: 700;
      color: var(--ink);
    }

    .brief-empty {
      color: #9a9a9a;
      font-weight: 400;
    }

    .brief-meta {
      margin-top: 20px;
      font-size: 12.5px;
      color: #8a8a8a;
      text-align: right;
    }

    @media (max-width: 640px) {
      .brief-sheet {
        padding: 28px 20px;
        font-size: 14px;
      }

      .brief-table .col-topic {
        width: 40%;
      }
    }

    /* Print: show only the sheet */
    @media print {
      .global-navbar,
      .theme-toggle,
      .brief-toolbar,
      .bg-glow-1,
      .bg-glow-2 {
        display: none !important;
      }

      body {
        background: #fff !important;
      }

      .brief-page {
        padding: 0;
      }

      .brief-sheet {
        border: none;
        box-shadow: none;
        padding: 0;
        color: #000;
      }
    }
  </style>

  <div class="brief-page">
    <!-- Toolbar -->
    <div class="brief-toolbar">
      <a href="{{ url()->previous() != url()->current() ? url()->previous() : route('phy70.dashboard') }}"
        class="brief-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        กลับ
      </a>
      <button type="button" class="brief-btn primary" onclick="window.print()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        พิมพ์ / บันทึก PDF
      </button>
    </div>

    <!-- The form sheet -->
    <div class="brief-sheet">
      <div class="brief-corner">๑</div>
      <div class="brief-formno">
        แบบ จ.1-1
        <small>(Project Brief รายโครงการ)</small>
      </div>

      <div class="brief-heading">
        แบบฟอร์มโครงการแบบย่อ (Project Brief)<br>ของโครงการสำคัญภายใต้งบประมาณของจังหวัด
      </div>

      <div class="brief-line">
        <span class="lbl">ประเด็นการพัฒนาจังหวัด</span>
        <span class="val">{{ $val($proposal->province_issue) }}</span>
      </div>
      <div class="brief-line">
        <span class="lbl">แนวทางการพัฒนา</span>
        <span class="val">{{ $val($proposal->development_guideline) }}</span>
      </div>
      <div class="brief-line">
        <span class="lbl">ตัวชี้วัดและค่าเป้าหมายของประเด็นการพัฒนา</span>
        <span class="val">{{ $selectedKpis->isNotEmpty() ? $selectedKpis->implode(' · ') : '—' }}</span>
      </div>
      <div class="brief-line">
        <span class="lbl">แผนงานหลัก</span>
        <span class="val">{{ $val($proposal->main_plan) }}</span>
        <span class="hint">(ตามเป้าหมายการพัฒนาจังหวัด 20 ปี)</span>
      </div>
      <div class="brief-line">
        <span class="lbl">แผนงาน</span>
        <span class="val">{{ $val($proposal->plan) }}</span>
        <span class="hint">(แผนงานย่อยตามเป้าหมายการพัฒนาจังหวัด 20 ปี)</span>
      </div>

      <table class="brief-table">
        <thead>
          <tr>
            <th class="col-topic">หัวข้อ</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="col-topic"><span class="num">1.</span> ชื่อโครงการสำคัญ</td>
            <td class="brief-detail">{{ $val($proposal->project_name) }}</td>
          </tr>
          <tr>
            <td class="col-topic"><span class="num">2.</span> หลักการและเหตุผล</td>
            <td class="brief-detail">{{ $val($proposal->principles) }}</td>
          </tr>
          <tr>
            <td class="col-topic"><span class="num">3.</span> วัตถุประสงค์ของโครงการ</td>
            <td class="brief-detail">{{ $val($proposal->objectives) }}</td>
          </tr>
          <tr>
            <td class="col-topic"><span class="num">4.</span> ตัวชี้วัดและค่าเป้าหมาย</td>
            <td class="brief-detail">
              @if($selectedKpis->isNotEmpty())
              <ul class="brief-list">
                @foreach($selectedKpis as $k)
                <li>{{ $k }}</li>
                @endforeach
              </ul>
              @else
              <span class="brief-empty">—</span>
              @endif
            </td>
          </tr>
          <tr>
            <td class="col-topic"><span class="num">5.</span> พื้นที่เป้าหมาย</td>
            <td class="brief-detail">
              @if($areaProvince || $areaDistricts->isNotEmpty() || $areaSubdistricts->isNotEmpty())
              @if($areaProvince)จังหวัด{{ $areaProvince }}@endif
              @if($areaDistricts->isNotEmpty())<div style="margin-top:4px;">อำเภอ: {{ $areaDistricts->implode(', ') }}</div>@endif
              @if($areaSubdistricts->isNotEmpty())<div>ตำบล: {{ $areaSubdistricts->implode(', ') }}</div>@endif
              @else
              <span class="brief-empty">—</span>
              @endif
            </td>
          </tr>
          <tr>
            <td class="col-topic"><span class="num">6.</span> ขอบเขตของกิจกรรมหลักโดยสังเขป</td>
            <td class="brief-detail">
              @forelse($activities as $i => $act)
              @php $co = collect($act['co_agencies'] ?? [])->pluck('name')->filter()->map(fn($x)=>trim($x)); @endphp
              <div class="brief-sub" @if($i > 0) style="margin-top:12px;" @endif>
                6.{{ $i + 1 }} กิจกรรมที่ {{ $i + 1 }}: {{ $act['name'] ?? '—' }}
              </div>
              <div class="brief-kv">งบประมาณ: <b class="brief-money">{{ number_format((float) ($act['budget'] ?? 0), 2) }}</b> บาท</div>
              <div class="brief-kv">หน่วยงานผู้รับผิดชอบ: <b>{{ $val($act['responsible_agency'] ?? null) }}</b></div>
              <div class="brief-kv">หน่วยงานที่เกี่ยวข้อง: <b>{{ $co->isNotEmpty() ? $co->implode(', ') : '—' }}</b></div>
              @empty
              <span class="brief-empty">—</span>
              @endforelse
            </td>
          </tr>
          <tr>
            <td class="col-topic"><span class="num">7.</span> หน่วยงานดำเนินการ</td>
            <td class="brief-detail">
              <div>หน่วยงานผู้รับผิดชอบหลัก: {{ $val($proposal->operating_agency) }}</div>
              @if($relatedAgencies->isNotEmpty())
              <div style="margin-top:4px;">หน่วยงานที่เกี่ยวข้อง: {{ $relatedAgencies->implode(', ') }}</div>
              @endif
            </td>
          </tr>
          <tr>
            <td class="col-topic"><span class="num">8.</span> ระยะเวลาในการดำเนินโครงการ</td>
            <td class="brief-detail">{{ $durationText }}</td>
          </tr>
          <tr>
            <td class="col-topic"><span class="num">9.</span> งบประมาณ</td>
            <td class="brief-detail">
              <span class="brief-money">{{ number_format($totalBudget, 2) }}</span> บาท
              <span style="color:#8a8a8a;">(งบประมาณของจังหวัด)</span>
            </td>
          </tr>
          <tr>
            <td class="col-topic"><span class="num">10.</span> ผลผลิต (Output)</td>
            <td class="brief-detail">{{ $val($proposal->output) }}</td>
          </tr>
          <tr>
            <td class="col-topic"><span class="num">11.</span> ผลลัพธ์จากการดำเนินโครงการ (Outcome)</td>
            <td class="brief-detail">{{ $val($proposal->outcome) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="brief-meta">
        รหัสโครงการ: {{ $proposal->project_code ?: 'PJ-' . $proposal->id }}
        @if($proposal->created_at)
        · จัดทำเมื่อ {{ $proposal->created_at->timezone('Asia/Bangkok')->addYears(543)->format('d/m/Y') }}
        @endif
      </div>
    </div>
  </div>
</x-phy70::layouts.master>
