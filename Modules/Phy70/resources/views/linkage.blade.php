<x-phy70::layouts.master>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    @php
        // สี/ไอคอน ต่อประเด็น (ให้ตรงกับ dashboard)
        $issueMeta = [
            'ยกระดับสุขภาวะและกิจกรรมทางกายของประชาชน' => ['color' => '#6366f1', 'bg' => 'rgba(99,102,241,0.12)'],
            'พัฒนาการท่องเที่ยวเชิงสุขภาพและกีฬา'        => ['color' => '#06b6d4', 'bg' => 'rgba(6,182,212,0.12)'],
            'พัฒนาคุณภาพชีวิตผู้สูงอายุและกลุ่มเปราะบาง'  => ['color' => '#10b981', 'bg' => 'rgba(16,185,129,0.12)'],
            'ส่งเสริมพัฒนาการเด็กและเยาวชน'              => ['color' => '#f59e0b', 'bg' => 'rgba(245,158,11,0.12)'],
        ];
        $issueDefault = ['color' => '#64748b', 'bg' => 'rgba(100,116,139,0.12)'];
        // ลำดับสีของประเด็นสำหรับหัวเมทริกซ์
        $issueColorList = [];
        foreach ($issueList as $is) { $issueColorList[$is] = ($issueMeta[$is] ?? $issueDefault)['color']; }
        $overlapNames = collect($overlapIssues)->pluck('issue');
    @endphp

    <style>
        :root {
            --bg-base: #f3f5fb; --bg-surface: #ffffff; --border: #e6e9f2; --border-hover: #c7cde0;
            --primary: #6366f1; --secondary: #0891b2; --success: #059669; --warning: #d97706; --danger: #dc2626;
            --text-main: #1e293b; --text-muted: #64748b; --text-faint: #94a3b8;
            --shadow-card: 0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.06);
            --shadow-hover: 0 4px 8px rgba(16,24,40,0.06), 0 16px 40px rgba(16,24,40,0.10);
            --transition-smooth: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background-color: var(--bg-base) !important; color: var(--text-main);
            font-family: 'Outfit','Prompt','IBM Plex Sans Thai',sans-serif; min-height: 100vh;
            overflow-x: hidden; position: relative;
        }
        .bg-glow-1, .bg-glow-2 { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
        .bg-glow-1 { width: 620px; height: 620px; top: -280px; left: -220px; background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%); }
        .bg-glow-2 { width: 520px; height: 520px; bottom: -180px; right: -120px; background: radial-gradient(circle, rgba(8,145,178,0.09) 0%, transparent 70%); }

        .container { max-width: 1440px; margin: 0 auto; padding: 40px 24px; position: relative; z-index: 10; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; flex-wrap: wrap; gap: 20px; }
        .logo-section { display: flex; align-items: center; gap: 16px; }
        .logo-icon {
            width: 48px; height: 48px; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            border-radius: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(99,102,241,0.30);
        }
        .logo-title { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; color: var(--text-main); }
        .logo-subtitle { font-size: 12px; color: var(--secondary); font-family: 'JetBrains Mono', monospace; letter-spacing: 2px; text-transform: uppercase; }

        .btn-secondary {
            background: #fff; border: 1px solid var(--border); color: var(--text-main); padding: 10px 18px; border-radius: 12px;
            font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
            text-decoration: none; transition: var(--transition-smooth); box-shadow: var(--shadow-card);
        }
        .btn-secondary:hover { border-color: var(--border-hover); box-shadow: var(--shadow-hover); }
        .mockup-badge {
            display: inline-flex; align-items: center; gap: 6px; background: rgba(217,119,6,0.10);
            border: 1px solid rgba(217,119,6,0.25); color: var(--warning); padding: 5px 12px; border-radius: 99px; font-size: 12px; font-weight: 500;
        }

        .glass-card { background: var(--bg-surface); border: 1px solid var(--border); border-radius: 20px; padding: 24px; transition: var(--transition-smooth); box-shadow: var(--shadow-card); }
        .glass-card:hover { border-color: var(--border-hover); box-shadow: var(--shadow-hover); }
        .page-title { font-size: 24px; font-weight: 700; font-family: 'Prompt', sans-serif; margin-bottom: 6px; color: var(--text-main); }
        .page-desc { color: var(--text-muted); font-size: 14px; margin-bottom: 28px; max-width: 900px; }

        .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 20px; margin-bottom: 28px; }
        .kpi-card { display: flex; flex-direction: column; gap: 10px; }
        .kpi-head { display: flex; align-items: center; gap: 10px; }
        .kpi-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .kpi-label { font-size: 13px; color: var(--text-muted); font-weight: 500; line-height: 1.3; }
        .kpi-value { font-size: 30px; font-weight: 700; color: var(--text-main); font-family: 'Outfit', sans-serif; }
        .kpi-unit { font-size: 13px; color: var(--text-faint); font-weight: 500; margin-left: 4px; }

        .section-title { font-size: 17px; font-weight: 600; font-family: 'Prompt', sans-serif; display: flex; align-items: center; gap: 10px; color: var(--text-main); }
        .section-sub { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
        .section-block { margin-bottom: 28px; }

        /* Overlap issue cards */
        .overlap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px; margin-top: 18px; }
        .overlap-card { position: relative; background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 20px; overflow: hidden; transition: var(--transition-smooth); }
        .overlap-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }
        .overlap-accent { position: absolute; top: 0; left: 0; width: 100%; height: 4px; }
        .overlap-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px; }
        .overlap-issue-name { font-size: 15px; font-weight: 600; line-height: 1.4; color: var(--text-main); }
        .badge-overlap {
            display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 99px;
            font-size: 11.5px; font-weight: 600; background: rgba(220,38,38,0.10); color: var(--danger); flex-shrink: 0;
        }
        .agency-block { border-top: 1px dashed var(--border); padding-top: 12px; margin-top: 12px; }
        .agency-row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .agency-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .agency-name { font-size: 13.5px; font-weight: 600; color: var(--text-main); flex: 1; min-width: 0; }
        .agency-count-chip { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px; background: #eef1f7; color: var(--text-muted); }
        .agency-count-chip.dup { background: rgba(217,119,6,0.14); color: var(--warning); }
        .proposal-item { font-size: 12.5px; color: var(--text-muted); padding: 3px 0 3px 19px; display: flex; justify-content: space-between; gap: 12px; }
        .proposal-item .pj-code { font-family: 'JetBrains Mono', monospace; color: var(--secondary); font-size: 11.5px; }

        /* Matrix table */
        .table-responsive { width: 100%; overflow-x: auto; margin-top: 16px; }
        .matrix-table { border-collapse: collapse; font-size: 13px; min-width: 640px; }
        .matrix-table th, .matrix-table td { border: 1px solid var(--border); padding: 12px 14px; text-align: center; }
        .matrix-table thead th { background: #f8fafc; font-weight: 600; color: var(--text-muted); vertical-align: bottom; }
        .matrix-table thead th.overlap-col { background: rgba(220,38,38,0.06); color: var(--danger); }
        .matrix-table tbody th { text-align: left; font-weight: 600; color: var(--text-main); background: #fff; white-space: nowrap; position: sticky; left: 0; }
        .matrix-cell-0 { color: var(--text-faint); }
        .matrix-cell-n { font-weight: 700; font-family: 'JetBrains Mono', monospace; color: #fff; }
        .matrix-chip { display: inline-flex; align-items: center; justify-content: center; min-width: 26px; height: 26px; padding: 0 7px; border-radius: 8px; }
        .col-total { background: #f8fafc; font-weight: 700; font-family: 'JetBrains Mono', monospace; }

        /* Connection pairs */
        .pair-list { display: flex; flex-direction: column; gap: 12px; margin-top: 18px; }
        .pair-row { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: 14px; background: #fff; border: 1px solid var(--border); transition: var(--transition-smooth); flex-wrap: wrap; }
        .pair-row:hover { transform: translateX(5px); box-shadow: var(--shadow-hover); border-color: var(--border-hover); }
        .pair-agency { font-size: 13.5px; font-weight: 600; color: var(--text-main); }
        .pair-link-icon { color: var(--danger); flex-shrink: 0; }
        .pair-issue-chip { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 99px; font-size: 12px; font-weight: 500; }
        .empty-note { color: var(--text-muted); font-size: 13.5px; margin-top: 14px; padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px dashed var(--border); }
    </style>

    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>

    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="logo-section">
                <div class="logo-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                </div>
                <div>
                    <h1 class="logo-title">การเชื่อมโยงประเด็น</h1>
                    <span class="logo-subtitle">Issue Linkage · จังหวัดเพชรบูรณ์ 2570</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                <span class="mockup-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    ข้อมูลจำลอง (Mockup)
                </span>
                <a href="{{ route('phy70.dashboard') }}" class="btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                    แดชบอร์ด
                </a>
                <a href="{{ route('phy70.scorecard') }}" class="btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                    ประเมินคุณภาพ
                </a>
                <a href="{{ route('phy70.index') }}" class="btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    กลับหน้าหลัก
                </a>
            </div>
        </header>

        <h2 class="page-title">การเชื่อมโยงและความทับซ้อนของประเด็นการพัฒนา</h2>
        <p class="page-desc">ตรวจสอบว่ามีหน่วยงานใดบ้างที่เสนอโครงการอยู่ใน<b>ประเด็นการพัฒนาเดียวกัน</b> — เพื่อดูความทับซ้อนข้ามหน่วยงาน (ประเด็นที่มีมากกว่า 1 หน่วยงานดำเนินการ) และการเสนอซ้ำหลายโครงการภายในหน่วยงานเดียว จะช่วยให้บูรณาการงบประมาณและลดความซ้ำซ้อนได้</p>

        <!-- KPI -->
        <div class="kpi-grid">
            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(99,102,241,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                    </div>
                    <span class="kpi-label">ประเด็นการพัฒนา</span>
                </div>
                <div class="kpi-value">{{ number_format($kpi['issues']) }}<span class="kpi-unit">ประเด็น</span></div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(8,145,178,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e7490" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>
                    </div>
                    <span class="kpi-label">หน่วยงานดำเนินการ</span>
                </div>
                <div class="kpi-value">{{ number_format($kpi['agencies']) }}<span class="kpi-unit">หน่วยงาน</span></div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(220,38,38,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </div>
                    <span class="kpi-label">ประเด็นที่ทับซ้อน (>1 หน่วยงาน)</span>
                </div>
                <div class="kpi-value" style="color: var(--danger);">{{ number_format($kpi['overlap_issues']) }}<span class="kpi-unit">ประเด็น</span></div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(217,119,6,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    </div>
                    <span class="kpi-label">คู่หน่วยงานที่เชื่อมโยงกัน</span>
                </div>
                <div class="kpi-value" style="color: var(--warning);">{{ number_format($kpi['pairs']) }}<span class="kpi-unit">คู่</span></div>
            </div>
        </div>

        <!-- Overlap issues -->
        <div class="glass-card section-block">
            <h3 class="section-title" style="color: var(--danger);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="9" r="6"/><circle cx="15" cy="15" r="6"/></svg>
                ประเด็นที่มีความทับซ้อน
            </h3>
            <p class="section-sub">ประเด็นการพัฒนาที่มีหน่วยงานดำเนินการมากกว่า 1 หน่วยงาน — ควรพิจารณาบูรณาการร่วมกัน · <span style="color: var(--warning);">แถบสีส้ม = หน่วยงานเดียวเสนอซ้ำหลายโครงการในประเด็นเดียวกัน</span></p>

            @if($overlapIssues->isEmpty())
                <div class="empty-note">ยังไม่พบประเด็นที่มีหน่วยงานทับซ้อนกัน</div>
            @else
                <div class="overlap-grid">
                    @foreach($overlapIssues as $row)
                        @php $m = $issueMeta[$row['issue']] ?? $issueDefault; @endphp
                        <div class="overlap-card">
                            <div class="overlap-accent" style="background: {{ $m['color'] }};"></div>
                            <div class="overlap-head">
                                <div class="overlap-issue-name">{{ $row['issue'] }}</div>
                                <span class="badge-overlap">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="9" r="6"/><circle cx="15" cy="15" r="6"/></svg>
                                    ทับซ้อน {{ $row['agency_count'] }} หน่วยงาน
                                </span>
                            </div>
                            <div style="font-size: 12.5px; color: var(--text-muted);">
                                {{ $row['proposal_count'] }} ข้อเสนอ · งบรวม {{ number_format($row['total_budget']) }} บาท
                            </div>

                            @foreach($row['agencies'] as $agency => $ps)
                                @php $isDup = $ps->count() > 1; @endphp
                                <div class="agency-block">
                                    <div class="agency-row">
                                        <span class="agency-dot" style="background: {{ $m['color'] }};"></span>
                                        <span class="agency-name">{{ $agency }}</span>
                                        <span class="agency-count-chip {{ $isDup ? 'dup' : '' }}">
                                            {{ $ps->count() }} โครงการ{{ $isDup ? ' · ซ้ำ' : '' }}
                                        </span>
                                    </div>
                                    @foreach($ps as $p)
                                        <div class="proposal-item">
                                            <span><span class="pj-code">{{ $p['project_id'] }}</span> · {{ $p['project_name'] }}</span>
                                            <span style="white-space: nowrap;">{{ number_format($p['budget']) }} บ.</span>
                                        </div>
                                    @endforeach
                                </div>
                            @endforeach
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        <!-- Matrix -->
        <div class="glass-card section-block">
            <h3 class="section-title" style="color: var(--primary);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
                เมทริกซ์ หน่วยงาน × ประเด็น
            </h3>
            <p class="section-sub">จำนวนข้อเสนอโครงการของแต่ละหน่วยงานในแต่ละประเด็น — คอลัมน์สีแดง = ประเด็นที่มีหน่วยงานทับซ้อน</p>
            <div class="table-responsive">
                <table class="matrix-table">
                    <thead>
                        <tr>
                            <th style="text-align: left;">หน่วยงาน \ ประเด็น</th>
                            @foreach($issueList as $is)
                                <th class="{{ $overlapNames->contains($is) ? 'overlap-col' : '' }}" style="max-width: 170px; white-space: normal;">{{ $is }}</th>
                            @endforeach
                            <th class="col-total">รวม</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($agencyList as $ag)
                            @php $rowTotal = 0; @endphp
                            <tr>
                                <th>{{ $ag }}</th>
                                @foreach($issueList as $is)
                                    @php $c = $matrix[$ag][$is] ?? 0; $rowTotal += $c; $col = $issueColorList[$is]; @endphp
                                    <td>
                                        @if($c > 0)
                                            <span class="matrix-chip matrix-cell-n" style="background: {{ $col }};">{{ $c }}</span>
                                        @else
                                            <span class="matrix-cell-0">–</span>
                                        @endif
                                    </td>
                                @endforeach
                                <td class="col-total">{{ $rowTotal }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <th style="text-align: left; background: #f8fafc;">รวมข้อเสนอต่อประเด็น</th>
                            @foreach($issueList as $is)
                                @php $colTotal = 0; foreach($agencyList as $ag){ $colTotal += ($matrix[$ag][$is] ?? 0); } @endphp
                                <td class="col-total">{{ $colTotal }}</td>
                            @endforeach
                            <td class="col-total">{{ number_format($kpi['proposals']) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <!-- Connection pairs -->
        <div class="glass-card section-block">
            <h3 class="section-title" style="color: var(--warning);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                คู่หน่วยงานที่เชื่อมโยงกัน (ผ่านประเด็นเดียวกัน)
            </h3>
            <p class="section-sub">แต่ละแถวคือคู่หน่วยงานที่ต่างเสนอโครงการอยู่ในประเด็นเดียวกัน — เป็นจุดที่ควรประสานงานร่วมกัน</p>

            @if($pairs->isEmpty())
                <div class="empty-note">ยังไม่พบคู่หน่วยงานที่ทำประเด็นเดียวกัน</div>
            @else
                <div class="pair-list">
                    @foreach($pairs as $pair)
                        @php $m = $issueMeta[$pair['issue']] ?? $issueDefault; @endphp
                        <div class="pair-row">
                            <span class="pair-agency">{{ $pair['a'] }}</span>
                            <svg class="pair-link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 0 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                            <span class="pair-agency">{{ $pair['b'] }}</span>
                            <span class="pair-issue-chip" style="background: {{ $m['bg'] }}; color: {{ $m['color'] }};">
                                <span style="width:7px;height:7px;border-radius:50%;background: {{ $m['color'] }};"></span>
                                {{ $pair['issue'] }}
                            </span>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</x-phy70::layouts.master>
