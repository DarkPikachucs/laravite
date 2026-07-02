<x-phy70::layouts.master>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    
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
            
            --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
            background-color: var(--bg-base) !important;
            color: var(--text-main);
            font-family: 'Outfit', 'Prompt', sans-serif;
            min-height: 100vh;
            padding: 40px 24px;
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
            -webkit-backdrop-filter: blur(16px);
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
            color: #fff;
            line-height: 1.6;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 10px;
            padding: 12px 16px;
            white-space: pre-wrap;
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
            <a href="/app/phy70" class="btn-secondary">← กลับสู่แดชบอร์ด</a>
        </header>

        <!-- Project Detail Header Card -->
        <div class="glass-card" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);">
            <div class="info-label" style="color: var(--secondary);">ชื่อโครงการ</div>
            <h1 style="font-size: 24px; font-weight: 600; font-family: 'Prompt', sans-serif; color: #fff; line-height: 1.4; margin-bottom: 12px;">
                {{ $proposal->project_name }}
            </h1>
            <div style="font-size: 13.5px; color: var(--text-muted); display: flex; gap: 20px; flex-wrap: wrap;">
                <span>หน่วยงานเสนอ: <strong>{{ $proposal->organization->name }}</strong></span>
                <span>ผู้จัดส่งข้อเสนอ: <strong>{{ $proposal->user->name }}</strong></span>
                <span>ส่งวันที่: <strong style="font-family: 'JetBrains Mono', monospace;">{{ $proposal->created_at->format('Y-m-d H:i') }}</strong></span>
            </div>
        </div>

        <!-- SECTION 1 -->
        <div class="glass-card">
            <div class="section-header">
                <h3 class="section-title">ส่วนที่ 1: ความสอดคล้องยุทธศาสตร์ระดับชาติ</h3>
            </div>

            <div class="info-item">
                <div class="info-label">ยุทธศาสตร์ชาติ</div>
                <div class="info-val">{{ $proposal->national_strategy ?: 'ไม่ระบุข้อมูล' }}</div>
            </div>

            <div class="info-item">
                <div class="info-label">แผนแม่บทภายใต้ยุทธศาสตร์ชาติ</div>
                <div class="info-val">{{ $proposal->master_plan ?: 'ไม่ระบุข้อมูล' }}</div>
            </div>

            <div class="info-item">
                <div class="info-label">แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ</div>
                <div class="info-val">{{ $proposal->national_plan ?: 'ไม่ระบุข้อมูล' }}</div>
            </div>

            <div class="info-item">
                <div class="info-label">เป้าหมายและแนวทางการพัฒนาภาค</div>
                <div class="info-val">{{ $proposal->regional_development ?: 'ไม่ระบุข้อมูล' }}</div>
            </div>
        </div>

        <!-- SECTION 2 -->
        <div class="glass-card">
            <div class="section-header">
                <h3 class="section-title">ส่วนที่ 2: ความสอดคล้องระดับจังหวัด</h3>
            </div>

            <div class="info-item">
                <div class="info-label">ประเด็นการพัฒนาของจังหวัด</div>
                <div class="info-val">{{ $proposal->province_issue ?: 'ไม่ระบุข้อมูล' }}</div>
            </div>

            <div class="info-item">
                <div class="info-label">แนวทางการพัฒนา</div>
                <div class="info-val">{{ $proposal->development_guideline ?: 'ไม่ระบุข้อมูล' }}</div>
            </div>

            <div class="info-item">
                <div class="info-label">แผนงานหลัก</div>
                <div class="info-val">{{ $proposal->main_plan ?: 'ไม่ระบุข้อมูล' }}</div>
            </div>

            <div class="info-item">
                <div class="info-label">แผนงาน</div>
                <div class="info-val">{{ $proposal->plan ?: 'ไม่ระบุข้อมูล' }}</div>
            </div>
        </div>

        <!-- SECTION 3 -->
        <div class="glass-card">
            <div class="section-header">
                <h3 class="section-title">ส่วนที่ 3: รายละเอียดรายละเอียดโครงการและข้อมูลการติดต่อ</h3>
            </div>

            <div class="info-item">
                <div class="info-label">กิจกรรมหลัก</div>
                <div class="info-val">{{ $proposal->main_activity }}</div>
            </div>

            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">หน่วยดำเนินการ</div>
                    <div class="info-val">{{ $proposal->operating_agency }}</div>
                </div>

                <div class="info-item">
                    <div class="info-label">ผู้รับผิดชอบโครงการ</div>
                    <div class="info-val">{{ $proposal->responsible_person }}</div>
                </div>
            </div>

            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">ตำแหน่ง</div>
                    <div class="info-val">{{ $proposal->position }}</div>
                </div>

                <div class="info-item">
                    <div class="info-label">หมายเลขโทรศัพท์</div>
                    <div class="info-val">{{ $proposal->phone_number }}</div>
                </div>
            </div>

            <div class="info-item">
                <div class="info-label">สถานที่ติดต่อประสานงาน</div>
                <div class="info-val">{{ $proposal->contact_address }}</div>
            </div>

            @if($proposal->attachments && count($proposal->attachments) > 0)
                <div class="info-item" style="margin-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 20px;">
                    <div class="info-label" style="color: var(--secondary);">ไฟล์แนบประกอบโครงการ</div>
                    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                        @foreach($proposal->attachments as $attachment)
                            <a href="{{ $attachment['path'] }}" target="_blank" class="info-val" style="display: flex; align-items: center; gap: 10px; text-decoration: none; transition: var(--transition-smooth); background: rgba(99, 102, 241, 0.08); border-color: rgba(99, 102, 241, 0.2); cursor: pointer;" onmouseover="this.style.background='rgba(99, 102, 241, 0.15)'" onmouseout="this.style.background='rgba(99, 102, 241, 0.08)'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: var(--secondary);">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>{{ $attachment['name'] }}</span>
                            </a>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>
    </div>
</x-phy70::layouts.master>
