<x-phy70::layouts.master>
    <!-- Head inclusions for Fonts & Tailwind CDN for utility helpers (integrated with custom glassmorphism stylesheet) -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --bg-base: #060913;
            --bg-surface: rgba(15, 23, 42, 0.6);
            --bg-surface-hover: rgba(30, 41, 59, 0.7);
            --border-glow: rgba(99, 102, 241, 0.15);
            --border-glow-hover: rgba(6, 182, 212, 0.4);
            
            --primary: #6366f1;       /* Indigo */
            --primary-glow: rgba(99, 102, 241, 0.35);
            --secondary: #06b6d4;     /* Cyan */
            --secondary-glow: rgba(6, 182, 212, 0.35);
            --success: #10b981;       /* Emerald */
            --warning: #f59e0b;       /* Amber */
            --danger: #ef4444;        /* Rose */
            
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --text-dark: #0f172a;
            
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
            font-family: 'Outfit', 'Prompt', 'IBM Plex Sans Thai', sans-serif;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        /* Abstract Background Glows */
        .bg-glow-1 {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
            top: -250px;
            left: -200px;
            pointer-events: none;
            z-index: 0;
            animation: floatGlow 12s infinite ease-in-out;
        }

        .bg-glow-2 {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%);
            bottom: -150px;
            right: -100px;
            pointer-events: none;
            z-index: 0;
            animation: floatGlow 15s infinite ease-in-out alternate;
        }

        @keyframes floatGlow {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(40px, 30px) scale(1.1); }
            100% { transform: translate(0, 0) scale(1); }
        }

        /* Container & Layout */
        .dashboard-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 24px;
            position: relative;
            z-index: 10;
        }

        /* Header Styles */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 36px;
            flex-wrap: wrap;
            gap: 20px;
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .logo-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px var(--primary-glow);
        }

        .logo-title {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(to right, #ffffff, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .logo-subtitle {
            font-size: 12px;
            color: var(--secondary);
            font-family: 'JetBrains Mono', monospace;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        /* User Profile Area */
        .user-menu {
            display: flex;
            align-items: center;
            gap: 16px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 6px 16px 6px 6px;
            border-radius: 99px;
        }

        .user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: #fff;
            overflow: hidden;
        }

        .user-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .user-info-text {
            display: flex;
            flex-direction: column;
        }

        .user-name {
            font-size: 13px;
            font-weight: 600;
            color: #fff;
        }

        .user-org {
            font-size: 11px;
            color: var(--text-muted);
        }

        /* Glassmorphic Cards */
        .glass-card {
            background: var(--bg-surface);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--border-glow);
            border-radius: 20px;
            padding: 24px;
            transition: var(--transition-smooth);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .glass-card:hover {
            border-color: var(--border-glow-hover);
            transform: translateY(-2px);
        }

        /* Welcome Banner */
        .welcome-banner {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);
            border: 1px solid rgba(255, 255, 255, 0.05);
            margin-bottom: 32px;
            padding: 32px;
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 24px;
        }

        .welcome-text {
            flex: 1 1 600px;
        }

        .welcome-title {
            font-size: 26px;
            font-weight: 600;
            margin-bottom: 12px;
            font-family: 'Prompt', sans-serif;
            background: linear-gradient(to right, #fff, #cbd5e1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .welcome-desc {
            color: var(--text-muted);
            font-size: 15px;
            line-height: 1.6;
        }

        .welcome-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        /* Metrics Grid */
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 24px;
            margin-bottom: 36px;
        }

        .metric-title {
            font-size: 14px;
            color: var(--text-muted);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
        }

        .metric-value-container {
            display: flex;
            align-items: baseline;
            gap: 10px;
        }

        .metric-value {
            font-size: 36px;
            font-weight: 700;
            color: #ffffff;
            font-family: 'Outfit', sans-serif;
        }

        /* Main Content Layout */
        .content-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 24px;
        }

        @media (max-width: 1024px) {
            .content-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Section styles */
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .section-title {
            font-size: 18px;
            font-weight: 600;
            font-family: 'Prompt', sans-serif;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        /* Buttons */
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
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 14px var(--primary-glow);
            transition: var(--transition-smooth);
            text-decoration: none;
        }

        .btn-action:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
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
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: var(--transition-smooth);
            text-decoration: none;
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .btn-danger-outline {
            background: transparent;
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: var(--danger);
            padding: 6px 12px;
            border-radius: 8px;
            font-family: inherit;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition-smooth);
        }

        .btn-danger-outline:hover {
            background: rgba(239, 68, 68, 0.1);
            border-color: var(--danger);
        }

        /* Proposals Table */
        .table-responsive {
            width: 100%;
            overflow-x: auto;
        }

        .proposal-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 14px;
        }

        .proposal-table th {
            padding: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            color: var(--text-muted);
            font-weight: 500;
        }

        .proposal-table td {
            padding: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            color: var(--text-main);
        }

        .proposal-table tr:hover td {
            background: rgba(255, 255, 255, 0.01);
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 99px;
            font-size: 12px;
            font-weight: 500;
        }

        .status-success {
            background: rgba(16, 185, 129, 0.15);
            color: var(--success);
        }

        .status-info {
            background: rgba(6, 182, 212, 0.15);
            color: var(--secondary);
        }

        /* Alerts */
        .alert {
            padding: 16px 20px;
            border-radius: 12px;
            margin-bottom: 24px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .alert-success {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
            color: var(--success);
        }

        .alert-info {
            background: rgba(6, 182, 212, 0.1);
            border: 1px solid rgba(6, 182, 212, 0.2);
            color: var(--secondary);
        }

        .empty-state {
            text-align: center;
            padding: 48px 24px;
            color: var(--text-muted);
        }

        .empty-icon {
            font-size: 48px;
            margin-bottom: 16px;
            color: rgba(255, 255, 255, 0.1);
        }
    </style>

    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>

    <div class="dashboard-container">
        <!-- Dashboard Header -->
        <header class="header">
            <div class="logo-section">
                <div class="logo-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div>
                    <h1 class="logo-title">PHY70 Portal</h1>
                    <span class="logo-subtitle">Health & Performance Platform</span>
                </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 16px;">
                @if($user)
                    <div class="user-menu">
                        <div class="user-avatar">
                            @if($user->avatar)
                                <img src="{{ $user->avatar }}" alt="avatar">
                            @else
                                {{ strtoupper(substr($user->name, 0, 1)) }}
                            @endif
                        </div>
                        <div class="user-info-text">
                            <span class="user-name">{{ $user->name }}</span>
                            <span class="user-org">{{ $user->organization->name }} ({{ ucfirst($user->role) }})</span>
                        </div>
                    </div>
                    
                    <form action="{{ route('phy70.logout') }}" method="POST" style="display: inline;">
                        @csrf
                        <button type="submit" class="btn-danger-outline">ออกจากระบบ</button>
                    </form>
                @else
                    <a href="{{ route('phy70.login') }}" class="btn-secondary" style="padding: 8px 18px; font-size: 13px;">เข้าสู่ระบบ</a>
                    <a href="{{ route('phy70.register') }}" class="btn-action" style="padding: 8px 18px; font-size: 13px;">ลงทะเบียนหน่วยงาน</a>
                @endif
            </div>
        </header>

        <!-- Session Messages -->
        @if(session('success'))
            <div class="alert alert-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/>
                </svg>
                <span>{{ session('success') }}</span>
            </div>
        @endif

        @if(session('info'))
            <div class="alert alert-info">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span>{{ session('info') }}</span>
            </div>
        @endif

        <!-- Welcome Banner -->
        <div class="glass-card welcome-banner">
            <div class="welcome-text">
                <h2 class="welcome-title">ระบบจัดทำและเสนอโครงการสุขภาวะทางกาย (PHY70)</h2>
                <p class="welcome-desc">
                    ยินดีต้อนรับสู่ระบบส่งข้อเสนอโครงการขับเคลื่อนเชิงยุทธศาสตร์ระดับหน่วยงาน เพื่อส่งเสริมการเคลื่อนไหวทางกายและนวัตกรรมสร้างเสริมสุขภาพระดับประเทศ
                </p>
            </div>
            <div class="welcome-actions">
                @if($user)
                    <a href="{{ route('phy70.proposal.create') }}" class="btn-action">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        ส่งข้อเสนอโครงการ
                    </a>
                    @if($user->role === 'admin')
                        <a href="{{ route('phy70.users') }}" class="btn-secondary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            จัดการผู้ใช้ในหน่วยงาน
                        </a>
                    @endif
                @else
                    <a href="{{ route('phy70.login') }}" class="btn-action">เข้าสู่ระบบเพื่อเสนอโครงการ</a>
                    <a href="{{ route('phy70.register') }}" class="btn-secondary">สร้างบัญชีผู้ใช้ใหม่</a>
                @endif
            </div>
        </div>

        <!-- Dashboard Content Grid -->
        <div class="content-grid">
            <!-- Left: Proposals List -->
            <div class="glass-card">
                <div class="section-header">
                    <h3 class="section-title">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                        </svg>
                        รายการข้อเสนอโครงการที่จัดทำแล้ว
                    </h3>
                </div>

                @if(!$user)
                    <div class="empty-state">
                        <div class="empty-icon">🔒</div>
                        <p>กรุณา <a href="{{ route('phy70.login') }}" style="color: var(--secondary); text-decoration: underline;">เข้าสู่ระบบ</a> เพื่อเข้าถึงและส่งข้อมูลโครงการของหน่วยงานของท่าน</p>
                    </div>
                @elseif($proposals->isEmpty())
                    <div class="empty-state">
                        <div class="empty-icon">📁</div>
                        <p>ยังไม่มีการส่งข้อเสนอโครงการในหน่วยงานของคุณในขณะนี้</p>
                        <a href="{{ route('phy70.proposal.create') }}" class="btn-secondary" style="margin-top: 16px; font-size: 13px;">เริ่มจัดทำข้อเสนอโครงการแรก</a>
                    </div>
                @else
                    <div class="table-responsive">
                        <table class="proposal-table">
                            <thead>
                                <tr>
                                    <th>ชื่อโครงการ</th>
                                    <th>ผู้รับผิดชอบ</th>
                                    <th>เบอร์โทร</th>
                                    <th>วันที่เสนอโครงการ</th>
                                    <th style="text-align: right;">การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($proposals as $proposal)
                                    <tr>
                                        <td style="font-weight: 600;">{{ $proposal->project_name }}</td>
                                        <td>{{ $proposal->responsible_person }}</td>
                                        <td>{{ $proposal->phone_number }}</td>
                                        <td style="color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">{{ $proposal->created_at->format('Y-m-d H:i') }}</td>
                                        <td style="text-align: right;">
                                            <a href="{{ route('phy70.proposal.show', $proposal->id) }}" class="btn-secondary" style="padding: 6px 12px; font-size: 12px; border-radius: 8px;">ดูรายละเอียด</a>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif
            </div>

            <!-- Right: Info Panel -->
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Info Strategic Summary -->
                <div class="glass-card" style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);">
                    <h3 class="section-title" style="margin-bottom: 16px; color: var(--secondary);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                        คำชี้แจงระบบยุทธศาสตร์
                    </h3>
                    <p style="font-size: 13.5px; line-height: 1.6; color: var(--text-muted); margin-bottom: 12px;">
                        การส่งโครงการจะแบ่งออกเป็น 3 ส่วนสำคัญ โดยระบบจะบังคับให้ท่านทำตามลำดับเพื่อความสอดคล้องเชิงนโยบาย:
                    </p>
                    <ul style="font-size: 13px; color: var(--text-muted); padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
                        <li><strong>ส่วนที่ 1:</strong> การเทียบเคียงเป้าหมายแผนระดับชาติ (ยุทธศาสตร์ชาติ, แผนพัฒนาฯ, ทิศทางภาค)</li>
                        <li><strong>ส่วนที่ 2:</strong> ความสอดคล้องระดับจังหวัด (แผนพัฒนาจังหวัด, แผนงานหลัก)</li>
                        <li><strong>ส่วนที่ 3:</strong> รายละเอียดตัวโครงการจริง (ชื่อโครงการ, กิจกรรม, ข้อมูลผู้ติดต่อประสานงาน)</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</x-phy70::layouts.master>
