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
        <span>ส่งวันที่: <strong style="font-family: monospace;">{{ $proposal->created_at->format('Y-m-d H:i')
            }}</strong></span>
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

            <div style="display: flex; align-items: center; gap: 12px;">
              @if(isset($kpi['targets']) && is_array($kpi['targets']) && isset($kpi['targets'][0]))
              <div style="font-size: 13px;">
                <span style="color: var(--text-muted);">ค่าเป้าหมาย:</span>
                <span
                  style="font-weight: 600; color: {{ $kpi['targets'][0] ? 'var(--text-main)' : 'rgba(255,255,255,0.2)' }};">
                  {{ $kpi['targets'][0] ?: '-' }}
                </span>
              </div>
              @endif

              @if(isset($kpi['target_unit']) && $kpi['target_unit'])
              <div
                style="font-size: 12px; color: var(--text-muted); background: rgba(255,255,255,0.04); padding: 2px 6px; border-radius: 4px;">
                {{ $kpi['target_unit'] }}
              </div>
              @endif
            </div>
          </div>
          @endif
          @endforeach
        </div>
      </div>
      @endif



      @if($proposal->attachments && count($proposal->attachments) > 0)
      <div class="info-item"
        style="margin-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 20px;">
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

        <div class="info-grid">
          <div class="info-item" style="margin-bottom: 12px;">
            <div class="info-label">งบประมาณ (บาท)</div>
            <div class="info-val">{{ number_format($act['budget'] ?? 0, 2) }}</div>
          </div>
          <div class="info-item" style="margin-bottom: 12px;">
            <div class="info-label">แนวทางการพัฒนาจังหวัด</div>
            <div class="info-val">{{ $act['guideline'] ?? '-' }}</div>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-item" style="margin-bottom: 12px;">
            <div class="info-label">พื้นที่เป้าหมาย</div>
            <div class="info-val">
              @if(isset($act['target_province']))
              จังหวัด{{ $act['target_province'] }}
              @if(!empty($act['target_district'])) ➔ อำเภอ{{ is_array($act['target_district']) ? implode(', ',
              $act['target_district']) : $act['target_district'] }} @endif
              @if(!empty($act['target_subdistrict'])) ➔ ตำบล{{ is_array($act['target_subdistrict']) ? implode(', ',
              $act['target_subdistrict']) : $act['target_subdistrict'] }} @endif
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
              <ul style="margin: 0; padding-left: 20px;">
                @foreach($act['activity_kpis'] as $akpi)
                @if(!empty($akpi['name']))
                <li>{{ $akpi['name'] }}</li>
                @endif
                @endforeach
              </ul>
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
</x-phy70::layouts.master>