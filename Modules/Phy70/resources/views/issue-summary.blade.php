<x-phy70::layouts.master>
  <link
    href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap"
    rel="stylesheet">

  @php
  // แบบ จ.1 (เวอร์ชันโครงการ) — คอลัมน์รายปีแสดง "งบประมาณรายปี" ต่อโครงการ
  $fy = $fiscalYears ?? ['2571', '2572', '2573', '2574', '2575'];
  $totalBudget = collect($projects)->sum('total');
  // ผลรวมงบรายปีทุกโครงการ (แถวสรุปท้ายตาราง)
  $yearTotals = [];
  foreach ($fy as $y) {
    $yearTotals[$y] = collect($projects)->sum(fn ($p) => (float) ($p['yearly'][$y] ?? 0));
  }
  $money = fn ($v) => (float) $v > 0 ? number_format($v) : '—';
  @endphp

  <style>
    .jsum-page {
      --ink: #1a1a1a;
      --ink-soft: #444;
      --line: #333;
      --line-soft: #bcbcbc;
      --paper: #ffffff;
      max-width: 1180px;
      margin: 0 auto;
      padding: 32px 20px 80px;
      position: relative;
      z-index: 10;
      font-family: 'Sarabun', 'IBM Plex Sans Thai', sans-serif;
    }

    .jsum-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      max-width: 1180px;
      margin: 0 auto 18px;
      flex-wrap: wrap;
    }

    .jsum-btn {
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

    .jsum-btn:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .jsum-btn.primary {
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      border-color: transparent;
      color: #fff;
    }

    :root.light-theme .jsum-btn {
      background: rgba(0, 0, 0, 0.04);
      border-color: rgba(0, 0, 0, 0.12);
    }

    :root.light-theme .jsum-btn:hover {
      background: rgba(0, 0, 0, 0.08);
    }

    .jsum-sheet {
      background: var(--paper);
      color: var(--ink);
      border: 1px solid var(--line);
      border-radius: 4px;
      padding: 44px 40px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
      font-size: 15px;
      line-height: 1.6;
    }

    .jsum-formno {
      text-align: right;
      font-weight: 700;
      line-height: 1.4;
      margin-bottom: 12px;
    }

    .jsum-formno small {
      display: block;
      font-weight: 500;
      font-size: 13.5px;
    }

    .jsum-heading {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      margin: 4px 0 22px;
      line-height: 1.5;
    }

    .jsum-line {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 10px;
    }

    .jsum-line .lbl {
      font-weight: 700;
      white-space: nowrap;
    }

    .jsum-line .val {
      flex: 1;
      min-width: 0;
      border-bottom: 1px dotted var(--line-soft);
      font-weight: 500;
      color: var(--ink-soft);
      padding: 0 4px 2px;
      overflow-wrap: anywhere;
    }

    .jsum-table-wrap {
      width: 100%;
      overflow-x: auto;
      margin-top: 20px;
    }

    .jsum-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13.5px;
    }

    .jsum-table th,
    .jsum-table td {
      border: 1px solid var(--line);
      padding: 8px 10px;
      vertical-align: top;
      text-align: left;
    }

    .jsum-table thead th {
      background: #f0f0f0;
      text-align: center;
      font-weight: 700;
      font-size: 13.5px;
      white-space: nowrap;
    }

    .jsum-table .col-proj {
      min-width: 220px;
      font-weight: 600;
    }

    .jsum-table .col-kpi {
      min-width: 220px;
    }

    .jsum-table .yr {
      text-align: center;
      white-space: nowrap;
      font-weight: 600;
      min-width: 62px;
    }

    .jsum-table .unit {
      text-align: center;
      white-space: nowrap;
    }

    .jsum-proj-name {
      font-weight: 700;
      color: var(--ink);
    }

    .jsum-proj-meta {
      font-size: 12px;
      color: var(--ink-soft);
      font-weight: 500;
      margin-top: 4px;
      line-height: 1.5;
    }

    .jsum-proj-meta b {
      color: var(--ink);
      font-weight: 600;
    }

    .jsum-base {
      color: var(--ink-soft);
      font-weight: 500;
      white-space: nowrap;
    }

    .jsum-empty {
      color: #9a9a9a;
      font-weight: 400;
      text-align: center;
    }

    .jsum-foot td {
      background: #f7f7f7;
      font-weight: 700;
    }

    .jsum-meta {
      margin-top: 18px;
      font-size: 12.5px;
      color: #8a8a8a;
    }

    @media print {
      .global-navbar,
      .theme-toggle,
      .jsum-toolbar,
      .bg-glow-1,
      .bg-glow-2 {
        display: none !important;
      }

      body {
        background: #fff !important;
      }

      .jsum-page {
        padding: 0;
        max-width: none;
      }

      .jsum-sheet {
        border: none;
        box-shadow: none;
        padding: 0;
        color: #000;
      }

      .jsum-table-wrap {
        overflow-x: visible;
      }

      .jsum-table {
        font-size: 11.5px;
      }
    }
  </style>

  <div class="jsum-page">
    <!-- Toolbar (ซ่อนตอนพิมพ์) -->
    <div class="jsum-toolbar">
      <a href="{{ route('phy70.dashboard') }}" class="jsum-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        กลับแดชบอร์ด
      </a>
      <button type="button" class="jsum-btn primary" onclick="window.print()">
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
    <div class="jsum-sheet">
      <div class="jsum-formno">
        แบบ จ.1
        <small>(สรุปแผนงานและโครงการสำคัญ — รายโครงการ)</small>
      </div>

      <div class="jsum-heading">
        แบบฟอร์มสรุปแผนงานและโครงการสำคัญของจังหวัด (พ.ศ. 2571 – 2575)<br>จังหวัดเพชรบูรณ์
      </div>

      <div class="jsum-line">
        <span class="lbl">เป้าหมายการพัฒนาจังหวัด:</span>
        <span class="val">&nbsp;</span>
      </div>
      <div class="jsum-line">
        <span class="lbl">ประเด็นการพัฒนา:</span>
        <span class="val">{{ $issue !== '' ? $issue : '—' }}</span>
      </div>

      <div class="jsum-table-wrap">
        <table class="jsum-table">
          <thead>
            <tr>
              <th class="col-proj" rowspan="2">โครงการ</th>
              <th class="col-kpi" rowspan="2">ตัวชี้วัดที่ตอบสนอง</th>
              <th colspan="{{ count($fy) + 1 }}">งบประมาณ (บาท)</th>
            </tr>
            <tr>
              @foreach($fy as $y)
              <th class="yr">พ.ศ. {{ $y }}</th>
              @endforeach
              <th class="yr">รวม</th>
            </tr>
          </thead>
          <tbody>
            @forelse($projects as $p)
              @php $kpis = collect($p['kpis'] ?? [])->filter(fn ($n) => filled($n))->values(); @endphp
              <tr>
                <td class="col-proj">
                  <div class="jsum-proj-name">{{ $p['name'] }}</div>
                  <div class="jsum-proj-meta">
                    <div>รหัส: {{ $p['code'] }}</div>
                    <div>หน่วยงาน: {{ $p['agency'] }}</div>
                  </div>
                </td>
                <td class="col-kpi">
                  @if($kpis->isNotEmpty())
                  <ul style="margin:0; padding-left:18px;">
                    @foreach($kpis as $n)
                    <li>{{ $n }}</li>
                    @endforeach
                  </ul>
                  @else
                  <span class="jsum-empty">—</span>
                  @endif
                </td>
                @foreach($fy as $y)
                <td class="yr">{{ $money($p['yearly'][$y] ?? 0) }}</td>
                @endforeach
                <td class="yr"><b>{{ number_format($p['total']) }}</b></td>
              </tr>
            @empty
            <tr>
              <td class="jsum-empty" colspan="{{ 3 + count($fy) }}">ยังไม่มีโครงการในประเด็นการพัฒนานี้</td>
            </tr>
            @endforelse
          </tbody>
          @if($projects->isNotEmpty())
          <tfoot>
            <tr class="jsum-foot">
              <td colspan="2" style="text-align:right;">รวมงบประมาณทุกโครงการในประเด็นนี้</td>
              @foreach($fy as $y)
              <td class="yr">{{ $money($yearTotals[$y] ?? 0) }}</td>
              @endforeach
              <td class="yr">{{ number_format($totalBudget) }}</td>
            </tr>
          </tfoot>
          @endif
        </table>
      </div>

      <div class="jsum-meta">
        จำนวน {{ number_format($projects->count()) }} โครงการ · งบประมาณรวม {{ number_format($totalBudget) }} บาท ·
        คอลัมน์รายปี (พ.ศ. {{ $fy[0] ?? '' }}–{{ $fy[count($fy)-1] ?? '' }}) แสดงเฉพาะโครงการที่กรอกแบ่งงบรายปีไว้ ·
        คอลัมน์ “รวม” = งบรวมทั้งโครงการ
      </div>
    </div>
  </div>
</x-phy70::layouts.master>
