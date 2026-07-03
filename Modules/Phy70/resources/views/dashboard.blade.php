<x-phy70::layouts.master>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

    @php
        // ---- Per-issue color + icon mapping (ประเด็นการพัฒนา) --------------
        $issueMeta = [
            'ยกระดับสุขภาวะและกิจกรรมทางกายของประชาชน' => ['color' => '#6366f1', 'bg' => 'rgba(99,102,241,0.12)', 'icon' => 'activity'],
            'พัฒนาการท่องเที่ยวเชิงสุขภาพและกีฬา'        => ['color' => '#06b6d4', 'bg' => 'rgba(6,182,212,0.12)', 'icon' => 'mountain'],
            'พัฒนาคุณภาพชีวิตผู้สูงอายุและกลุ่มเปราะบาง'  => ['color' => '#10b981', 'bg' => 'rgba(16,185,129,0.12)', 'icon' => 'heart'],
            'ส่งเสริมพัฒนาการเด็กและเยาวชน'              => ['color' => '#f59e0b', 'bg' => 'rgba(245,158,11,0.12)', 'icon' => 'child'],
        ];
        $issueDefault = ['color' => '#64748b', 'bg' => 'rgba(100,116,139,0.12)', 'icon' => 'flag'];
        $issueCounts  = $projects->groupBy('province_issue')->map->count();
        $maxIssueBudget = $budgetByIssue->max() ?: 1;

        // ---- Area palette for the layer map (พื้นที่เป้าหมาย) --------------
        $areaPalette = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#3b82f6'];
        $maxAreaBudget = $budgetByArea->max() ?: 1;

        // ---- Approx lat/lng of Phetchabun districts (for the real map) -----
        $areaCoords = [
            'อำเภอเมืองเพชรบูรณ์' => [16.4189, 101.1591],
            'อำเภอหล่มสัก'        => [16.7756, 101.2419],
            'อำเภอหล่มเก่า'       => [16.8869, 101.2103],
            'อำเภอวิเชียรบุรี'     => [15.6569, 101.1072],
            'อำเภอชนแดน'         => [16.1783, 100.8103],
            'อำเภอศรีเทพ'         => [15.4675, 101.1436],
            'อำเภอบึงสามพัน'      => [15.7936, 101.0508],
        ];
        // Combine area aggregates + coords + color into a map-ready payload
        $areaMapData = [];
        foreach ($budgetByArea as $area => $budget) {
            $ci = count($areaMapData) % count($areaPalette);
            $areaMapData[] = [
                'name'    => $area,
                'budget'  => $budget,
                'acts'    => $activitiesByArea[$area] ?? 0,
                'color'   => $areaPalette[$ci],
                'lat'     => $areaCoords[$area][0] ?? 16.42,
                'lng'     => $areaCoords[$area][1] ?? 101.15,
                'pct'     => round($budget / $maxAreaBudget * 100),
            ];
        }

        // ---- Inline SVG path library --------------------------------------
        $svgIcons = [
            'activity' => '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
            'mountain' => '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
            'heart'    => '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>',
            'child'    => '<circle cx="12" cy="5" r="2.4"/><path d="M12 7.4v6m0 0-3 4.6m3-4.6 3 4.6M8 10.2h8"/>',
            'flag'     => '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
            'pin'      => '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
            'layers'   => '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
        ];
    @endphp

    <style>
        :root {
            --bg-base: #f3f5fb;
            --bg-surface: #ffffff;
            --border: #e6e9f2;
            --border-hover: #c7cde0;
            --primary: #6366f1;
            --primary-soft: rgba(99, 102, 241, 0.10);
            --secondary: #0891b2;
            --success: #059669;
            --warning: #d97706;
            --danger: #dc2626;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --text-faint: #94a3b8;
            --shadow-card: 0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.06);
            --shadow-hover: 0 4px 8px rgba(16, 24, 40, 0.06), 0 16px 40px rgba(16, 24, 40, 0.10);
            --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            background-color: var(--bg-base) !important;
            color: var(--text-main);
            font-family: 'Outfit', 'Prompt', 'IBM Plex Sans Thai', sans-serif;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        .bg-glow-1, .bg-glow-2 {
            position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
        }
        .bg-glow-1 {
            width: 620px; height: 620px; top: -280px; left: -220px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.10) 0%, transparent 70%);
        }
        .bg-glow-2 {
            width: 520px; height: 520px; bottom: -180px; right: -120px;
            background: radial-gradient(circle, rgba(8, 145, 178, 0.09) 0%, transparent 70%);
        }

        .dashboard-container {
            max-width: 1440px; margin: 0 auto; padding: 40px 24px;
            position: relative; z-index: 10;
        }

        .header {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 32px; flex-wrap: wrap; gap: 20px;
        }
        .logo-section { display: flex; align-items: center; gap: 16px; }
        .logo-icon {
            width: 48px; height: 48px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            border-radius: 14px; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.30);
        }
        .logo-title {
            font-size: 26px; font-weight: 700; letter-spacing: -0.5px; color: var(--text-main);
        }
        .logo-subtitle {
            font-size: 12px; color: var(--secondary);
            font-family: 'JetBrains Mono', monospace; letter-spacing: 2px; text-transform: uppercase;
        }

        .btn-secondary {
            background: #fff; border: 1px solid var(--border);
            color: var(--text-main); padding: 10px 18px; border-radius: 12px;
            font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer;
            display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
            transition: var(--transition-smooth); box-shadow: var(--shadow-card);
        }
        .btn-secondary:hover { border-color: var(--border-hover); box-shadow: var(--shadow-hover); }

        .mockup-badge {
            display: inline-flex; align-items: center; gap: 6px;
            background: rgba(217, 119, 6, 0.10); border: 1px solid rgba(217, 119, 6, 0.25);
            color: var(--warning); padding: 5px 12px; border-radius: 99px;
            font-size: 12px; font-weight: 500;
        }

        .glass-card {
            background: var(--bg-surface);
            border: 1px solid var(--border); border-radius: 20px; padding: 24px;
            transition: var(--transition-smooth); box-shadow: var(--shadow-card);
        }
        .glass-card:hover { border-color: var(--border-hover); box-shadow: var(--shadow-hover); }

        .page-title {
            font-size: 24px; font-weight: 700; font-family: 'Prompt', sans-serif;
            margin-bottom: 6px; color: var(--text-main);
        }
        .page-desc { color: var(--text-muted); font-size: 14px; margin-bottom: 28px; }

        /* KPI cards */
        .kpi-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 20px; margin-bottom: 28px;
        }
        .kpi-card { display: flex; flex-direction: column; gap: 10px; }
        .kpi-head { display: flex; align-items: center; gap: 10px; }
        .kpi-icon {
            width: 40px; height: 40px; border-radius: 12px;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .kpi-label { font-size: 13px; color: var(--text-muted); font-weight: 500; line-height: 1.3; }
        .kpi-value { font-size: 30px; font-weight: 700; color: var(--text-main); font-family: 'Outfit', sans-serif; }
        .kpi-unit { font-size: 13px; color: var(--text-faint); font-weight: 500; margin-left: 4px; }

        /* Charts */
        .charts-grid {
            display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 28px;
        }
        .chart-card { display: flex; flex-direction: column; }
        .chart-canvas-wrap { position: relative; height: 300px; margin-top: 12px; }
        @media (max-width: 900px) { .charts-grid { grid-template-columns: 1fr; } }

        .section-title {
            font-size: 17px; font-weight: 600; font-family: 'Prompt', sans-serif;
            display: flex; align-items: center; gap: 10px; color: var(--text-main);
        }
        .section-sub { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
        .section-block { margin-bottom: 28px; }

        /* Issue cards (ประเด็นการพัฒนา) */
        .issue-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 18px; margin-top: 18px;
        }
        .issue-card {
            position: relative; background: #fff; border: 1px solid var(--border);
            border-radius: 16px; padding: 18px 18px 16px; overflow: hidden;
            transition: var(--transition-smooth);
        }
        .issue-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }
        .issue-accent { position: absolute; top: 0; left: 0; width: 100%; height: 4px; }
        .issue-top { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
        .issue-icon {
            width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
        }
        .issue-name { font-size: 14px; font-weight: 600; line-height: 1.4; color: var(--text-main); }
        .issue-count { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .issue-budget { font-size: 22px; font-weight: 700; font-family: 'Outfit', sans-serif; }
        .issue-budget small { font-size: 12px; font-weight: 500; color: var(--text-faint); margin-left: 4px; }
        .issue-bar { height: 7px; border-radius: 99px; background: #eef1f7; overflow: hidden; margin-top: 12px; }
        .issue-bar-fill { height: 100%; border-radius: 99px; transition: width 0.6s ease; }

        /* Real map (ข้อมูลพื้นที่) */
        .area-map-wrap {
            position: relative; margin-top: 18px; height: 480px;
            border-radius: 16px; overflow: hidden; border: 1px solid var(--border);
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4);
        }
        #areaMap { width: 100%; height: 100%; background: #eaeef5; }
        .leaflet-popup-content-wrapper { border-radius: 12px; box-shadow: var(--shadow-hover); }
        .leaflet-popup-content { margin: 12px 14px; font-family: 'Outfit', 'IBM Plex Sans Thai', sans-serif; }
        .map-pop-name { font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 6px; }
        .map-pop-row { display: flex; justify-content: space-between; gap: 18px; font-size: 12.5px; color: #475569; padding: 2px 0; }
        .map-pop-row b { font-family: 'JetBrains Mono', monospace; color: #1e293b; }
        .map-legend {
            position: absolute; z-index: 500; bottom: 14px; right: 14px;
            background: rgba(255,255,255,0.95); border: 1px solid var(--border);
            border-radius: 12px; padding: 10px 12px; box-shadow: var(--shadow-card);
            font-size: 11px; color: var(--text-muted); max-width: 190px;
        }
        .map-legend-title { font-weight: 700; color: var(--text-main); margin-bottom: 6px; font-size: 12px; }
        .map-legend-item { display: flex; align-items: center; gap: 7px; padding: 2px 0; }
        .map-legend-dot { border-radius: 50%; background: #6366f1; opacity: 0.55; flex-shrink: 0; }

        /* Layer mapping list (ranked legend below the map) */
        .layer-map { display: flex; flex-direction: column; gap: 12px; margin-top: 18px; }
        .layer-row {
            position: relative; display: flex; align-items: center; gap: 16px;
            padding: 15px 20px; border-radius: 14px; background: #fff;
            border: 1px solid var(--border); overflow: hidden;
            transition: var(--transition-smooth);
        }
        .layer-row:hover { transform: translateX(5px); box-shadow: var(--shadow-hover); border-color: var(--border-hover); }
        .layer-fill { position: absolute; inset: 0 auto 0 0; opacity: 0.10; transition: width 0.6s ease; z-index: 0; }
        .layer-edge { position: absolute; inset: 0 auto 0 0; width: 4px; z-index: 1; }
        .layer-rank {
            position: relative; z-index: 2; width: 26px; height: 26px; border-radius: 8px; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
            font-size: 12px; font-weight: 700; color: #fff;
        }
        .layer-pin {
            position: relative; z-index: 2; width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
        }
        .layer-info { position: relative; z-index: 2; flex: 1; min-width: 0; }
        .layer-name { font-size: 14.5px; font-weight: 600; color: var(--text-main); }
        .layer-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .layer-stats { position: relative; z-index: 2; display: flex; align-items: center; gap: 22px; flex-shrink: 0; }
        .layer-stat { text-align: right; }
        .layer-stat-value { font-size: 16px; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: var(--text-main); }
        .layer-stat-label { font-size: 11px; color: var(--text-faint); }
        @media (max-width: 720px) {
            .layer-stats { flex-direction: column; align-items: flex-end; gap: 6px; }
        }

        /* Tables */
        .table-responsive { width: 100%; overflow-x: auto; margin-top: 16px; }
        .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; white-space: nowrap; }
        .data-table th {
            padding: 14px 16px; border-bottom: 1px solid var(--border);
            color: var(--text-muted); font-weight: 600; position: sticky; top: 0;
            background: #f8fafc; text-align: left;
        }
        .data-table td {
            padding: 13px 16px; border-bottom: 1px solid var(--border); color: var(--text-main);
            vertical-align: top;
        }
        .data-table tr:hover td { background: #f8fafc; }
        .cell-clip { max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .code-cell { font-family: 'JetBrains Mono', monospace; color: var(--secondary); font-size: 12px; }
        .num-cell { text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 600; }

        .chip {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 500;
            background: rgba(99, 102, 241, 0.12); color: #4f46e5;
        }
        .chip-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .chip-cyan { background: rgba(8, 145, 178, 0.12); color: #0e7490; }
        .chip-emerald { background: rgba(5, 150, 105, 0.12); color: #047857; }

        .rank-badge {
            display: inline-flex; align-items: center; justify-content: center;
            width: 26px; height: 26px; border-radius: 8px; font-weight: 700; font-size: 13px;
            background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff;
        }
    </style>

    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>

    <div class="dashboard-container">
        <!-- Header -->
        <header class="header">
            <div class="logo-section">
                <div class="logo-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
                    </svg>
                </div>
                <div>
                    <h1 class="logo-title">PHY70 Dashboard</h1>
                    <span class="logo-subtitle">ภาพรวมข้อมูลโครงการ จังหวัดเพชรบูรณ์ 2570</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <span class="mockup-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    ข้อมูลจำลอง (Mockup)
                </span>
                <a href="{{ route('phy70.index') }}" class="btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    กลับหน้าหลัก
                </a>
            </div>
        </header>

        <h2 class="page-title">แดชบอร์ดสรุปข้อมูลโครงการ</h2>
        <p class="page-desc">ภาพรวมเชิงวิเคราะห์ของโครงการและกิจกรรมภายใต้แผนพัฒนาจังหวัด — สรุปงบประมาณ ประเด็นการพัฒนา พื้นที่และกลุ่มเป้าหมาย</p>

        <!-- KPI cards -->
        <div class="kpi-grid">
            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(99,102,241,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <span class="kpi-label">จำนวนโครงการทั้งหมด</span>
                </div>
                <div class="kpi-value">{{ number_format($kpi['projects']) }}<span class="kpi-unit">โครงการ</span></div>
            </div>

            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(8,145,178,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e7490" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </div>
                    <span class="kpi-label">จำนวนกิจกรรมทั้งหมด</span>
                </div>
                <div class="kpi-value">{{ number_format($kpi['activities']) }}<span class="kpi-unit">กิจกรรม</span></div>
            </div>

            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(5,150,105,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#047857" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <span class="kpi-label">งบประมาณรวมทั้งหมด</span>
                </div>
                <div class="kpi-value">{{ number_format($kpi['total_budget']) }}<span class="kpi-unit">บาท</span></div>
            </div>

            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(217,119,6,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>
                    </div>
                    <span class="kpi-label">หน่วยงานดำเนินการ</span>
                </div>
                <div class="kpi-value">{{ number_format($kpi['agencies']) }}<span class="kpi-unit">หน่วยงาน</span></div>
            </div>

            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(168,85,247,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <span class="kpi-label">พื้นที่เป้าหมาย</span>
                </div>
                <div class="kpi-value">{{ number_format($kpi['target_areas']) }}<span class="kpi-unit">อำเภอ</span></div>
            </div>

            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(236,72,153,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#db2777" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
                    </div>
                    <span class="kpi-label">งบประมาณเฉลี่ย/โครงการ</span>
                </div>
                <div class="kpi-value">{{ number_format($kpi['avg_budget']) }}<span class="kpi-unit">บาท</span></div>
            </div>
        </div>

        <!-- Issue cards (ประเด็นการพัฒนา — icon + สีต่อประเด็น) -->
        <div class="glass-card section-block">
            <h3 class="section-title" style="color: var(--primary);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">{!! $svgIcons['flag'] !!}</svg>
                ประเด็นการพัฒนาของจังหวัด
            </h3>
            <p class="section-sub">งบประมาณและจำนวนโครงการแยกตามประเด็นการพัฒนา — แต่ละประเด็นมีสีและไอคอนกำกับ</p>
            <div class="issue-grid">
                @foreach($budgetByIssue as $issue => $budget)
                    @php $m = $issueMeta[$issue] ?? $issueDefault; @endphp
                    <div class="issue-card">
                        <div class="issue-accent" style="background: {{ $m['color'] }};"></div>
                        <div class="issue-top">
                            <div class="issue-icon" style="background: {{ $m['bg'] }};">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="{{ $m['color'] }}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $svgIcons[$m['icon']] !!}</svg>
                            </div>
                            <div style="min-width: 0;">
                                <div class="issue-name">{{ $issue }}</div>
                                <div class="issue-count">{{ $issueCounts[$issue] ?? 0 }} โครงการ</div>
                            </div>
                        </div>
                        <div class="issue-budget" style="color: {{ $m['color'] }};">{{ number_format($budget) }}<small>บาท</small></div>
                        <div class="issue-bar">
                            <div class="issue-bar-fill" style="width: {{ round($budget / $maxIssueBudget * 100) }}%; background: {{ $m['color'] }};"></div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <!-- Charts row: guideline + agency -->
        <div class="charts-grid">
            <div class="glass-card chart-card">
                <h3 class="section-title" style="color: var(--secondary);">สัดส่วนงบประมาณตามแนวทางการพัฒนาจังหวัด</h3>
                <div class="chart-canvas-wrap"><canvas id="chartGuideline"></canvas></div>
            </div>
            <div class="glass-card chart-card">
                <h3 class="section-title" style="color: var(--success);">งบประมาณตามหน่วยงานดำเนินการ</h3>
                <div class="chart-canvas-wrap"><canvas id="chartAgency"></canvas></div>
            </div>
        </div>

        <!-- Layer mapping (ข้อมูลพื้นที่) -->
        <div class="glass-card section-block">
            <h3 class="section-title" style="color: var(--warning);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $svgIcons['layers'] !!}</svg>
                ข้อมูลพื้นที่ — Layer Mapping
            </h3>
            <p class="section-sub">แผนที่จังหวัดเพชรบูรณ์ — ซูม/คลิกที่หมุดแต่ละอำเภอเพื่อดูงบประมาณและจำนวนกิจกรรมที่ลงพื้นที่ (ขนาดวงกลม = งบประมาณ) · <span style="color: var(--warning);">ข้อมูลปัจจุบันอยู่ระดับอำเภอ — เพิ่มข้อมูลระดับตำบลได้ในอนาคต</span></p>

            <div class="area-map-wrap">
                <div id="areaMap"></div>
                <div class="map-legend">
                    <div class="map-legend-title">ขนาดวงกลม = งบประมาณ</div>
                    <div class="map-legend-item"><span class="map-legend-dot" style="width:10px;height:10px;"></span> งบน้อย</div>
                    <div class="map-legend-item"><span class="map-legend-dot" style="width:18px;height:18px;"></span> ปานกลาง</div>
                    <div class="map-legend-item"><span class="map-legend-dot" style="width:26px;height:26px;"></span> งบสูง</div>
                </div>
            </div>

            <div class="layer-map">
                @foreach($budgetByArea as $area => $budget)
                    @php
                        $ci = $loop->index % count($areaPalette);
                        $color = $areaPalette[$ci];
                        $acts = $activitiesByArea[$area] ?? 0;
                        $pct = round($budget / $maxAreaBudget * 100);
                    @endphp
                    <div class="layer-row">
                        <div class="layer-fill" style="width: {{ $pct }}%; background: {{ $color }};"></div>
                        <div class="layer-edge" style="background: {{ $color }};"></div>
                        <div class="layer-rank" style="background: {{ $color }};">{{ $loop->iteration }}</div>
                        <div class="layer-pin" style="background: {{ $color }}1f;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="{{ $color }}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $svgIcons['pin'] !!}</svg>
                        </div>
                        <div class="layer-info">
                            <div class="layer-name">{{ $area }}</div>
                            <div class="layer-sub">สัดส่วนงบประมาณ {{ $pct }}% ของพื้นที่สูงสุด</div>
                        </div>
                        <div class="layer-stats">
                            <div class="layer-stat">
                                <div class="layer-stat-value">{{ number_format($acts) }}</div>
                                <div class="layer-stat-label">กิจกรรม</div>
                            </div>
                            <div class="layer-stat">
                                <div class="layer-stat-value" style="color: {{ $color }};">{{ number_format($budget) }}</div>
                                <div class="layer-stat-label">บาท</div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <!-- Charts row: target group + top projects -->
        <div class="charts-grid">
            <div class="glass-card chart-card">
                <h3 class="section-title" style="color: #db2777;">งบประมาณตามกลุ่มเป้าหมาย</h3>
                <div class="chart-canvas-wrap"><canvas id="chartGroup"></canvas></div>
            </div>
            <div class="glass-card chart-card">
                <h3 class="section-title" style="color: #9333ea;">5 โครงการงบประมาณสูงสุด</h3>
                <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 12px;">
                    @foreach($topProjects as $i => $p)
                        <div style="display: flex; align-items: center; gap: 14px; background: #f8fafc; border: 1px solid var(--border); padding: 12px 14px; border-radius: 12px;">
                            <span class="rank-badge">{{ $i + 1 }}</span>
                            <div style="flex: 1; min-width: 0;">
                                <div class="cell-clip" style="max-width: 100%; font-weight: 600; font-size: 13.5px;" title="{{ $p['project_name'] }}">{{ $p['project_name'] }}</div>
                                <div style="font-size: 12px; color: var(--text-muted);">{{ $p['operating_agency'] }}</div>
                            </div>
                            <div style="text-align: right; flex-shrink: 0;">
                                <div style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--text-main);">{{ number_format($p['total_budget']) }}</div>
                                <div style="font-size: 11px; color: var(--text-faint);">บาท</div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <!-- Project table -->
        <div class="glass-card section-block">
            <h3 class="section-title" style="color: var(--secondary);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                ตารางข้อมูลโครงการ (project)
            </h3>
            <div class="table-responsive" style="max-height: 520px; overflow-y: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>รหัสโครงการ</th>
                            <th>ชื่อโครงการ</th>
                            <th>ประเด็นการพัฒนาของจังหวัด</th>
                            <th>แนวทางการพัฒนาจังหวัด</th>
                            <th>หลักการและเหตุผล</th>
                            <th>วัตถุประสงค์ของโครงการ</th>
                            <th>หน่วยงานดำเนินการ</th>
                            <th>ผลผลิต</th>
                            <th>ผลลัพธ์</th>
                            <th style="text-align: right;">งบประมาณรวม (บาท)</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($projects as $p)
                            @php $im = $issueMeta[$p['province_issue']] ?? $issueDefault; @endphp
                            <tr>
                                <td class="code-cell">{{ $p['project_id'] }}</td>
                                <td style="font-weight: 600; white-space: normal; min-width: 220px;">{{ $p['project_name'] }}</td>
                                <td><span class="chip" style="background: {{ $im['bg'] }}; color: {{ $im['color'] }};"><span class="chip-dot" style="background: {{ $im['color'] }};"></span>{{ $p['province_issue'] }}</span></td>
                                <td><span class="chip chip-cyan">{{ $p['province_guideline'] }}</span></td>
                                <td class="cell-clip" title="{{ $p['rationale'] }}">{{ $p['rationale'] }}</td>
                                <td class="cell-clip" title="{{ $p['objective'] }}">{{ $p['objective'] }}</td>
                                <td class="cell-clip" title="{{ $p['operating_agency'] }}">{{ $p['operating_agency'] }}</td>
                                <td class="cell-clip" title="{{ $p['output'] }}">{{ $p['output'] }}</td>
                                <td class="cell-clip" title="{{ $p['outcome'] }}">{{ $p['outcome'] }}</td>
                                <td class="num-cell">{{ number_format($p['total_budget']) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="9" style="text-align: right; font-weight: 600; color: var(--text-muted);">รวมงบประมาณทั้งสิ้น</td>
                            <td class="num-cell" style="color: var(--success); font-size: 15px;">{{ number_format($kpi['total_budget']) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <!-- Project detail table -->
        <div class="glass-card section-block">
            <h3 class="section-title" style="color: var(--primary);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                ตารางรายละเอียดกิจกรรม (project_detail)
            </h3>
            <div class="table-responsive" style="max-height: 520px; overflow-y: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>รหัสกิจกรรม (PK)</th>
                            <th>รหัสโครงการ (FK)</th>
                            <th>แนวทางการพัฒนา</th>
                            <th>พื้นที่เป้าหมาย</th>
                            <th>กลุ่มเป้าหมาย</th>
                            <th>กิจกรรม</th>
                            <th style="text-align: right;">งบประมาณ (บาท)</th>
                            <th>ผู้รับผิดชอบ</th>
                            <th>หน่วยงานรับผิดชอบ</th>
                            <th>หน่วยงานที่เกี่ยวข้อง</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($projects as $p)
                            @foreach($p['details'] as $d)
                                <tr>
                                    <td class="code-cell">{{ $d['activity_id'] }}</td>
                                    <td class="code-cell" style="color: var(--text-muted);">{{ $p['project_id'] }}</td>
                                    <td><span class="chip chip-cyan">{{ $d['guideline'] }}</span></td>
                                    <td><span class="chip chip-emerald">{{ $d['target_area'] }}</span></td>
                                    <td>{{ $d['target_group'] }}</td>
                                    <td style="white-space: normal; min-width: 220px;">{{ $d['activity'] }}</td>
                                    <td class="num-cell">{{ number_format($d['budget']) }}</td>
                                    <td>{{ $d['responsible_person'] }}</td>
                                    <td class="cell-clip" title="{{ $d['responsible_agency'] }}">{{ $d['responsible_agency'] }}</td>
                                    <td class="cell-clip" title="{{ $d['related_agency'] }}">{{ $d['related_agency'] }}</td>
                                </tr>
                            @endforeach
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // ---- Leaflet area map (ข้อมูลพื้นที่ — แผนที่จริง) ----
        const areaData = @json($areaMapData);
        const bahtFmtMap = (v) => new Intl.NumberFormat('th-TH').format(v);

        const areaMap = L.map('areaMap', { scrollWheelZoom: true, zoomControl: true });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(areaMap);

        const maxBudget = Math.max(...areaData.map(a => a.budget), 1);
        const bounds = [];
        areaData.forEach(a => {
            // radius scales 10 → 30 px by budget share
            const r = 10 + (a.budget / maxBudget) * 20;
            const marker = L.circleMarker([a.lat, a.lng], {
                radius: r,
                color: a.color,
                weight: 2,
                fillColor: a.color,
                fillOpacity: 0.45
            }).addTo(areaMap);
            marker.bindPopup(
                '<div class="map-pop-name">' + a.name + '</div>' +
                '<div class="map-pop-row"><span>งบประมาณ</span><b>' + bahtFmtMap(a.budget) + ' บาท</b></div>' +
                '<div class="map-pop-row"><span>จำนวนกิจกรรม</span><b>' + bahtFmtMap(a.acts) + ' กิจกรรม</b></div>' +
                '<div class="map-pop-row"><span>สัดส่วนงบ</span><b>' + a.pct + '%</b></div>'
            );
            marker.bindTooltip(a.name, { direction: 'top', offset: [0, -r] });
            bounds.push([a.lat, a.lng]);
        });
        if (bounds.length) {
            areaMap.fitBounds(bounds, { padding: [50, 50] });
        } else {
            areaMap.setView([16.42, 101.15], 9);
        }
        // Ensure correct sizing after layout settles
        setTimeout(() => areaMap.invalidateSize(), 200);

        // ---- Chart.js global LIGHT theme ----
        Chart.defaults.color = '#475569';
        Chart.defaults.font.family = "'Outfit', 'IBM Plex Sans Thai', sans-serif";
        Chart.defaults.font.size = 12;

        const palette = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#3b82f6'];
        const gridColor = 'rgba(15,23,42,0.06)';
        const surfaceBorder = '#ffffff';
        const bahtFmt = (v) => new Intl.NumberFormat('th-TH').format(v);

        // Budget by guideline (doughnut)
        new Chart(document.getElementById('chartGuideline'), {
            type: 'doughnut',
            data: {
                labels: @json($budgetByGuideline->keys()),
                datasets: [{ data: @json($budgetByGuideline->values()), backgroundColor: palette, borderColor: surfaceBorder, borderWidth: 3 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '60%',
                plugins: {
                    legend: { position: 'bottom', labels: { padding: 14, usePointStyle: true, boxWidth: 8 } },
                    tooltip: { callbacks: { label: (ctx) => ' ' + ctx.label + ': ' + bahtFmt(ctx.raw) + ' บาท' } }
                }
            }
        });

        // Budget by operating agency (horizontal bar)
        new Chart(document.getElementById('chartAgency'), {
            type: 'bar',
            data: {
                labels: @json($budgetByAgency->keys()),
                datasets: [{ label: 'งบประมาณ (บาท)', data: @json($budgetByAgency->values()), backgroundColor: 'rgba(5,150,105,0.75)', borderColor: '#059669', borderWidth: 1, borderRadius: 8 }]
            },
            options: {
                indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => ' ' + bahtFmt(ctx.raw) + ' บาท' } } },
                scales: {
                    x: { grid: { color: gridColor }, ticks: { callback: (v) => bahtFmt(v) } },
                    y: { grid: { display: false }, ticks: { callback: function(v){ const l = this.getLabelForValue(v); return l.length > 22 ? l.slice(0,22)+'…' : l; } } }
                }
            }
        });

        // Budget by target group (pie)
        new Chart(document.getElementById('chartGroup'), {
            type: 'pie',
            data: {
                labels: @json($budgetByTargetGroup->keys()),
                datasets: [{ data: @json($budgetByTargetGroup->values()), backgroundColor: palette, borderColor: surfaceBorder, borderWidth: 3 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { padding: 14, usePointStyle: true, boxWidth: 8 } },
                    tooltip: { callbacks: { label: (ctx) => ' ' + ctx.label + ': ' + bahtFmt(ctx.raw) + ' บาท' } }
                }
            }
        });
    </script>
</x-phy70::layouts.master>
