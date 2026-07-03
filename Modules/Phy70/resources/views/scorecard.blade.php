<x-phy70::layouts.master>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    @php
        $gradeMeta = [
            'A' => ['color' => '#059669', 'bg' => 'rgba(5,150,105,0.12)',  'label' => 'ดีเยี่ยม'],
            'B' => ['color' => '#6366f1', 'bg' => 'rgba(99,102,241,0.12)', 'label' => 'ดี'],
            'C' => ['color' => '#d97706', 'bg' => 'rgba(217,119,6,0.12)',  'label' => 'พอใช้ / ควรปรับปรุง'],
            'D' => ['color' => '#dc2626', 'bg' => 'rgba(220,38,38,0.12)',  'label' => 'ต้องปรับปรุง'],
        ];
        $totalWeight = collect($criteria)->sum('weight');
    @endphp

    <style>
        :root {
            --bg-base: #f3f5fb; --bg-surface: #ffffff; --border: #e6e9f2; --border-hover: #c7cde0;
            --primary: #6366f1; --primary-soft: rgba(99,102,241,0.10); --secondary: #0891b2;
            --success: #059669; --warning: #d97706; --danger: #dc2626;
            --text-main: #1e293b; --text-muted: #64748b; --text-faint: #94a3b8;
            --shadow-card: 0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.06);
            --shadow-hover: 0 4px 8px rgba(16,24,40,0.06), 0 16px 40px rgba(16,24,40,0.10);
            --transition-smooth: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: var(--bg-base) !important; color: var(--text-main); font-family: 'Outfit','Prompt','IBM Plex Sans Thai',sans-serif; min-height: 100vh; overflow-x: hidden; position: relative; }
        .bg-glow-1, .bg-glow-2 { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
        .bg-glow-1 { width: 620px; height: 620px; top: -280px; left: -220px; background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%); }
        .bg-glow-2 { width: 520px; height: 520px; bottom: -180px; right: -120px; background: radial-gradient(circle, rgba(8,145,178,0.09) 0%, transparent 70%); }

        .container { max-width: 1440px; margin: 0 auto; padding: 40px 24px; position: relative; z-index: 10; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; flex-wrap: wrap; gap: 20px; }
        .logo-section { display: flex; align-items: center; gap: 16px; }
        .logo-icon { width: 48px; height: 48px; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); border-radius: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(99,102,241,0.30); }
        .logo-title { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; color: var(--text-main); }
        .logo-subtitle { font-size: 12px; color: var(--secondary); font-family: 'JetBrains Mono', monospace; letter-spacing: 2px; text-transform: uppercase; }

        .btn-secondary { background: #fff; border: 1px solid var(--border); color: var(--text-main); padding: 10px 18px; border-radius: 12px; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: var(--transition-smooth); box-shadow: var(--shadow-card); }
        .btn-secondary:hover { border-color: var(--border-hover); box-shadow: var(--shadow-hover); }
        .mockup-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(217,119,6,0.10); border: 1px solid rgba(217,119,6,0.25); color: var(--warning); padding: 5px 12px; border-radius: 99px; font-size: 12px; font-weight: 500; }

        .glass-card { background: var(--bg-surface); border: 1px solid var(--border); border-radius: 20px; padding: 24px; transition: var(--transition-smooth); box-shadow: var(--shadow-card); }
        .glass-card:hover { border-color: var(--border-hover); box-shadow: var(--shadow-hover); }
        .page-title { font-size: 24px; font-weight: 700; font-family: 'Prompt', sans-serif; margin-bottom: 6px; color: var(--text-main); }
        .page-desc { color: var(--text-muted); font-size: 14px; margin-bottom: 28px; max-width: 920px; }

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

        /* Criteria weights */
        .crit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 18px; }
        .crit-item { border: 1px solid var(--border); border-radius: 14px; padding: 14px 16px; position: relative; overflow: hidden; }
        .crit-accent { position: absolute; top: 0; left: 0; width: 4px; height: 100%; }
        .crit-name { font-size: 13.5px; font-weight: 600; color: var(--text-main); padding-left: 8px; }
        .crit-weight { font-size: 22px; font-weight: 700; font-family: 'Outfit', sans-serif; padding-left: 8px; margin-top: 4px; }
        .crit-weight small { font-size: 12px; color: var(--text-faint); font-weight: 500; }

        /* Grade distribution */
        .grade-dist { display: flex; gap: 14px; margin-top: 18px; flex-wrap: wrap; }
        .grade-pill { flex: 1; min-width: 130px; border-radius: 14px; padding: 16px; display: flex; align-items: center; gap: 14px; border: 1px solid var(--border); }
        .grade-letter { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 800; font-family: 'Outfit', sans-serif; flex-shrink: 0; }
        .grade-count { font-size: 24px; font-weight: 700; font-family: 'Outfit', sans-serif; color: var(--text-main); }
        .grade-desc { font-size: 12px; color: var(--text-muted); }

        /* Scorecard rows */
        .score-list { display: flex; flex-direction: column; gap: 16px; margin-top: 18px; }
        .score-card { border: 1px solid var(--border); border-radius: 16px; padding: 18px 20px; background: #fff; transition: var(--transition-smooth); position: relative; overflow: hidden; }
        .score-card:hover { box-shadow: var(--shadow-hover); border-color: var(--border-hover); }
        .score-edge { position: absolute; top: 0; left: 0; width: 5px; height: 100%; }
        .score-top { display: flex; align-items: flex-start; gap: 16px; }
        .score-rank { width: 30px; height: 30px; border-radius: 9px; background: #f1f5f9; color: var(--text-muted); font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .score-info { flex: 1; min-width: 0; }
        .score-name { font-size: 15px; font-weight: 600; color: var(--text-main); line-height: 1.4; }
        .score-meta { font-size: 12.5px; color: var(--text-muted); margin-top: 3px; display: flex; flex-wrap: wrap; gap: 6px 14px; }
        .score-code { font-family: 'JetBrains Mono', monospace; color: var(--secondary); font-size: 12px; }
        .score-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
        .score-total { text-align: right; }
        .score-total-value { font-size: 28px; font-weight: 800; font-family: 'Outfit', sans-serif; line-height: 1; }
        .score-total-label { font-size: 11px; color: var(--text-faint); }
        .grade-badge { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 800; font-family: 'Outfit', sans-serif; flex-shrink: 0; }

        .flag-chip { display: inline-flex; align-items: center; gap: 5px; padding: 2px 9px; border-radius: 99px; font-size: 11px; font-weight: 600; }
        .flag-overlap { background: rgba(220,38,38,0.10); color: var(--danger); }
        .flag-dup { background: rgba(217,119,6,0.12); color: var(--warning); }

        /* Criterion bars */
        .crit-bars { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 10px 24px; margin-top: 16px; padding-top: 14px; border-top: 1px dashed var(--border); }
        .crit-bar-row { display: flex; align-items: center; gap: 10px; }
        .crit-bar-label { font-size: 12px; color: var(--text-muted); width: 120px; flex-shrink: 0; }
        .crit-bar-track { flex: 1; height: 8px; border-radius: 99px; background: #eef1f7; overflow: hidden; }
        .crit-bar-fill { height: 100%; border-radius: 99px; transition: width 0.6s ease; }
        .crit-bar-val { font-size: 12px; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: var(--text-main); width: 26px; text-align: right; flex-shrink: 0; }

        @media (max-width: 640px) { .score-top { flex-wrap: wrap; } }
    </style>

    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>

    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="logo-section">
                <div class="logo-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                </div>
                <div>
                    <h1 class="logo-title">ประเมินคุณภาพข้อเสนอ</h1>
                    <span class="logo-subtitle">Proposal Quality Scorecard · เพชรบูรณ์ 2570</span>
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
                <a href="{{ route('phy70.linkage') }}" class="btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    การเชื่อมโยง
                </a>
                <a href="{{ route('phy70.index') }}" class="btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    กลับหน้าหลัก
                </a>
            </div>
        </header>

        <h2 class="page-title">เกณฑ์ประเมินคุณภาพข้อเสนอโครงการ</h2>
        <p class="page-desc">ระบบให้คะแนนแต่ละข้อเสนอโครงการอัตโนมัติจาก <b>5 เกณฑ์ถ่วงน้ำหนัก</b> (เต็ม 100 คะแนน) แล้วจัดเกรด A–D และเรียงลำดับความสำคัญ เพื่อช่วยผู้บริหารตัดสินใจอนุมัติอย่างเป็นระบบ โปร่งใส และลดความซ้ำซ้อน</p>

        <!-- KPI -->
        <div class="kpi-grid">
            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(99,102,241,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <span class="kpi-label">ข้อเสนอที่ประเมิน</span>
                </div>
                <div class="kpi-value">{{ number_format($kpi['count']) }}<span class="kpi-unit">ข้อเสนอ</span></div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(8,145,178,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e7490" stroke-width="2"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21 8 14 2 9.4h7.6z"/></svg>
                    </div>
                    <span class="kpi-label">คะแนนเฉลี่ย</span>
                </div>
                <div class="kpi-value">{{ number_format($kpi['avg']) }}<span class="kpi-unit">/ 100</span></div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(5,150,105,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#047857" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <span class="kpi-label">ข้อเสนอเกรด A</span>
                </div>
                <div class="kpi-value" style="color: var(--success);">{{ number_format($kpi['gradeA']) }}<span class="kpi-unit">ข้อเสนอ</span></div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-head">
                    <div class="kpi-icon" style="background: rgba(220,38,38,0.12);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </div>
                    <span class="kpi-label">ต้องปรับปรุง (เกรด C–D)</span>
                </div>
                <div class="kpi-value" style="color: var(--danger);">{{ number_format($kpi['needImprove']) }}<span class="kpi-unit">ข้อเสนอ</span></div>
            </div>
        </div>

        <!-- Criteria weights -->
        <div class="glass-card section-block">
            <h3 class="section-title" style="color: var(--primary);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                เกณฑ์การประเมินและน้ำหนักคะแนน
            </h3>
            <p class="section-sub">คะแนนรวม = ผลรวมของทุกเกณฑ์ตามน้ำหนัก (รวม {{ $totalWeight }}%) · เกรด A ≥ 85, B ≥ 75, C ≥ 65, D &lt; 65</p>
            <div class="crit-grid">
                @foreach($criteria as $c)
                    <div class="crit-item">
                        <div class="crit-accent" style="background: {{ $c['color'] }};"></div>
                        <div class="crit-name">{{ $c['name'] }}</div>
                        <div class="crit-weight" style="color: {{ $c['color'] }};">{{ $c['weight'] }}<small>% น้ำหนัก</small></div>
                    </div>
                @endforeach
            </div>
        </div>

        <!-- Grade distribution -->
        <div class="glass-card section-block">
            <h3 class="section-title" style="color: var(--secondary);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                การกระจายเกรดคุณภาพ
            </h3>
            <div class="grade-dist">
                @foreach(['A','B','C','D'] as $g)
                    @php $gm = $gradeMeta[$g]; @endphp
                    <div class="grade-pill">
                        <div class="grade-letter" style="background: {{ $gm['bg'] }}; color: {{ $gm['color'] }};">{{ $g }}</div>
                        <div>
                            <div class="grade-count">{{ $gradeDist[$g] }} <span style="font-size: 13px; color: var(--text-faint); font-weight: 500;">ข้อเสนอ</span></div>
                            <div class="grade-desc">{{ $gm['label'] }}</div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <!-- Scorecard list -->
        <div class="glass-card section-block">
            <h3 class="section-title" style="color: var(--warning);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>
                ผลประเมินรายข้อเสนอ (เรียงตามคะแนน)
            </h3>
            <p class="section-sub">แต่ละข้อเสนอแสดงคะแนนรวม เกรด และคะแนนย่อยรายเกณฑ์ · ป้ายสีแดง/ส้ม = จุดที่ควรพิจารณา (ทับซ้อน/เสนอซ้ำ)</p>

            <div class="score-list">
                @foreach($rows as $i => $r)
                    @php $gm = $gradeMeta[$r['grade']]; @endphp
                    <div class="score-card">
                        <div class="score-edge" style="background: {{ $gm['color'] }};"></div>
                        <div class="score-top">
                            <div class="score-rank">{{ $i + 1 }}</div>
                            <div class="score-info">
                                <div class="score-name">{{ $r['project_name'] }}</div>
                                <div class="score-meta">
                                    <span class="score-code">{{ $r['project_id'] }}</span>
                                    <span>{{ $r['agency'] }}</span>
                                    <span>งบ {{ number_format($r['budget']) }} บาท</span>
                                    @if($r['flags']['overlap'])
                                        <span class="flag-chip flag-overlap">ประเด็นทับซ้อน</span>
                                    @endif
                                    @if($r['flags']['dup'])
                                        <span class="flag-chip flag-dup">เสนอซ้ำในหน่วยงาน</span>
                                    @endif
                                </div>
                            </div>
                            <div class="score-right">
                                <div class="score-total">
                                    <div class="score-total-value" style="color: {{ $gm['color'] }};">{{ $r['total'] }}</div>
                                    <div class="score-total-label">/ 100 คะแนน</div>
                                </div>
                                <div class="grade-badge" style="background: {{ $gm['bg'] }}; color: {{ $gm['color'] }};">{{ $r['grade'] }}</div>
                            </div>
                        </div>
                        <div class="crit-bars">
                            @foreach($criteria as $c)
                                @php $v = $r['scores'][$c['key']]; @endphp
                                <div class="crit-bar-row">
                                    <span class="crit-bar-label">{{ $c['name'] }}</span>
                                    <span class="crit-bar-track"><span class="crit-bar-fill" style="width: {{ $v }}%; background: {{ $c['color'] }};"></span></span>
                                    <span class="crit-bar-val">{{ $v }}</span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</x-phy70::layouts.master>
