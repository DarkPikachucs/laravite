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
            --danger: #ef4444;
            
            --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
            background-color: var(--bg-base) !important;
            color: var(--text-main);
            font-family: 'Outfit', 'Prompt', sans-serif;
            min-height: 100vh;
            padding: 40px 24px;
        }

        .form-container {
            max-width: 800px;
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

        /* Progress Steps Bar */
        .steps-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            margin-bottom: 40px;
            padding: 0 10px;
        }

        .steps-bar::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: rgba(255, 255, 255, 0.05);
            z-index: 1;
            transform: translateY(-50%);
        }

        .steps-progress {
            position: absolute;
            top: 50%;
            left: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
            z-index: 2;
            transform: translateY(-50%);
            width: 0%;
            transition: var(--transition-smooth);
        }

        .step-node {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #0f172a;
            border: 2px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
            color: var(--text-muted);
            position: relative;
            z-index: 3;
            transition: var(--transition-smooth);
        }

        .step-node.active {
            border-color: var(--secondary);
            color: #fff;
            box-shadow: 0 0 12px var(--secondary);
            background: var(--bg-base);
        }

        .step-node.completed {
            border-color: var(--success);
            background: var(--success);
            color: #fff;
        }

        .step-label {
            position: absolute;
            top: 44px;
            font-size: 12px;
            font-weight: 500;
            color: var(--text-muted);
            white-space: nowrap;
            font-family: 'Prompt', sans-serif;
            text-align: center;
        }

        .step-node.active .step-label {
            color: #fff;
        }

        /* Form Glass Card */
        .glass-card {
            background: var(--bg-surface);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--border-glow);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .form-section {
            display: none;
            animation: fadeIn 0.4s ease-in-out;
        }

        .form-section.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .section-header {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 16px;
            margin-bottom: 24px;
        }

        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--secondary);
            font-family: 'Prompt', sans-serif;
        }

        /* Form controls */
        .form-group {
            margin-bottom: 24px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
            color: #e2e8f0;
            font-family: 'Prompt', sans-serif;
        }

        .form-control {
            width: 100%;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 12px 16px;
            color: #fff;
            font-family: inherit;
            font-size: 14px;
            outline: none;
            transition: var(--transition-smooth);
        }

        .form-control:focus {
            border-color: var(--primary);
            background: rgba(255, 255, 255, 0.04);
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }

        textarea.form-control {
            resize: vertical;
            min-height: 100px;
        }

        /* Navigation Buttons */
        .actions-row {
            display: flex;
            justify-content: space-between;
            margin-top: 32px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding-top: 24px;
        }

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
            font-family: inherit;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition-smooth);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        /* Error alert */
        .alert {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
            color: var(--danger);
            padding: 16px 20px;
            border-radius: 12px;
            font-size: 13.5px;
            margin-bottom: 24px;
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
    </style>

    <div class="bg-glow"></div>

    <div class="form-container">
        <header class="header">
            <h2 class="title">จัดทำข้อเสนอโครงการ</h2>
            <a href="/app/phy70" class="btn-secondary">ยกเลิก</a>
        </header>

        <!-- Display Errors -->
        @if($errors->any())
            <div class="alert">
                <div style="font-weight: 600; margin-bottom: 8px;">กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน:</div>
                <ul style="padding-left: 20px;">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <!-- Progress Steps Bar -->
        <div class="steps-bar">
            <div class="steps-progress" id="steps-progress"></div>
            
            <div class="step-node active" id="step-node-1">
                1
                <span class="step-label" style="left: 50%; transform: translateX(-50%);">1. ยุทธศาสตร์ชาติ</span>
            </div>
            
            <div class="step-node" id="step-node-2">
                2
                <span class="step-label" style="left: 50%; transform: translateX(-50%);">2. ความสอดคล้องจังหวัด</span>
            </div>
            
            <div class="step-node" id="step-node-3">
                3
                <span class="step-label" style="left: 50%; transform: translateX(-50%);">3. รายละเอียดโครงการ</span>
            </div>
        </div>

        <!-- Form Glass Card -->
        <div class="glass-card">
            <form action="{{ route('phy70.proposal.store') }}" method="POST" id="proposal-form" enctype="multipart/form-data">
                @csrf

                <!-- ================== SECTION 1 ================== -->
                <div class="form-section active" id="section-1">
                    <div class="section-header">
                        <h3 class="section-title">ส่วนที่ 1: ความสอดคล้องเชิงยุทธศาสตร์ระดับชาติ</h3>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="national_strategy">ยุทธศาสตร์ชาติ</label>
                        <select id="national_strategy" name="national_strategy" class="form-control">
                            <option value="">-- กรุณาเลือกยุทธศาสตร์ชาติ --</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="master_plan">แผนแม่บทภายใต้ยุทธศาสตร์ชาติ</label>
                        <select id="master_plan" name="master_plan" class="form-control" disabled>
                            <option value="">-- กรุณาเลือกแผนแม่บท --</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="national_plan">แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ (ฉบับที่ 14)</label>
                        <select id="national_plan" name="national_plan" class="form-control" disabled>
                            <option value="">-- กรุณาเลือกแผนพัฒนาเศรษฐกิจฯ --</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="regional_development">เป้าหมายและแนวทางการพัฒนาภาค (ภาคเหนือ - จังหวัดเพชรบูรณ์)</label>
                        <select id="regional_development" name="regional_development" class="form-control">
                            <option value="">-- กรุณาเลือกเป้าหมายและแนวทางการพัฒนาภาคเหนือ --</option>
                            <option value="เป้าหมายเชิงยุทธศาสตร์: ยกระดับเกษตรแปรรูปและท่องเที่ยวสร้างสรรค์เชิงสุขภาพเพื่อการพึ่งพาตนเอง ของจังหวัดเพชรบูรณ์">เป้าหมายเชิงยุทธศาสตร์: ยกระดับเกษตรแปรรูปและท่องเที่ยวสร้างสรรค์เชิงสุขภาพเพื่อการพึ่งพาตนเอง ของจังหวัดเพชรบูรณ์</option>
                            <option value="แนวทางพัฒนา: ส่งเสริมสตรีทฟู้ดปลอดภัย กิจกรรมออกกำลังกายวิถีล้านนา และการท่องเที่ยวธรรมชาติยั่งยืน ของจังหวัดเพชรบูรณ์">แนวทางพัฒนา: ส่งเสริมสตรีทฟู้ดปลอดภัย กิจกรรมออกกำลังกายวิถีล้านนา และการท่องเที่ยวธรรมชาติยั่งยืน ของจังหวัดเพชรบูรณ์</option>
                        </select>
                    </div>
                </div>

                <!-- ================== SECTION 2 ================== -->
                <div class="form-section" id="section-2">
                    <div class="section-header">
                        <h3 class="section-title">ส่วนที่ 2: ความสอดคล้องระดับจังหวัด (จังหวัดเพชรบูรณ์)</h3>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="province_issue">ประเด็นการพัฒนาของจังหวัด</label>
                        <select id="province_issue" name="province_issue" class="form-control">
                            <option value="">-- กรุณาเลือกประเด็นการพัฒนาจังหวัดเพชรบูรณ์ --</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="development_guideline">แนวทางการพัฒนา</label>
                        <select id="development_guideline" name="development_guideline" class="form-control" disabled>
                            <option value="">-- กรุณาเลือกแนวทางการพัฒนา --</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="main_plan">แผนงานหลัก</label>
                        <select id="main_plan" name="main_plan" class="form-control" disabled>
                            <option value="">-- กรุณาเลือกแผนงานหลัก --</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="plan">แผนงาน</label>
                        <select id="plan" name="plan" class="form-control" disabled>
                            <option value="">-- กรุณาเลือกรายละเอียดแผนงาน --</option>
                        </select>
                    </div>
                </div>

                <!-- ================== SECTION 3 ================== -->
                <div class="form-section" id="section-3">
                    <div class="section-header">
                        <h3 class="section-title">ส่วนที่ 3: รายละเอียดรายละเอียดโครงการและผู้ประสานงาน</h3>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="project_name">ชื่อโครงการ <span style="color: var(--danger);">*</span></label>
                        <input type="text" id="project_name" name="project_name" class="form-control" placeholder="กรุณาระบุชื่อโครงการเต็ม" value="{{ old('project_name') }}">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="main_activity">กิจกรรมหลัก <span style="color: var(--danger);">*</span></label>
                        <textarea id="main_activity" name="main_activity" class="form-control" placeholder="ระบุรายละเอียดกระบวนงานหรือกิจกรรมหลักของโครงการ">{{ old('main_activity') }}</textarea>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="form-group">
                            <label class="form-label" for="operating_agency">หน่วยดำเนินการ <span style="color: var(--danger);">*</span></label>
                            <input type="text" id="operating_agency" name="operating_agency" class="form-control" placeholder="ระบุหน่วยงานผู้ปฏิบัติการ" value="{{ old('operating_agency', auth('phy70')->user()->organization->name) }}">
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="responsible_person">ผู้รับผิดชอบ <span style="color: var(--danger);">*</span></label>
                            <input type="text" id="responsible_person" name="responsible_person" class="form-control" placeholder="ชื่อ นามสกุล" value="{{ old('responsible_person', auth('phy70')->user()->name) }}">
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="form-group">
                            <label class="form-label" for="position">ตำแหน่ง <span style="color: var(--danger);">*</span></label>
                            <input type="text" id="position" name="position" class="form-control" placeholder="ระบุตำแหน่งสายงาน" value="{{ old('position') }}">
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="phone_number">หมายเลขโทรศัพท์ <span style="color: var(--danger);">*</span></label>
                            <input type="text" id="phone_number" name="phone_number" class="form-control" placeholder="เช่น 0891234567" value="{{ old('phone_number') }}">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="contact_address">สถานที่ติดต่อ <span style="color: var(--danger);">*</span></label>
                        <textarea id="contact_address" name="contact_address" class="form-control" placeholder="ระบุที่อยู่ของหน่วยงานหรือสถานที่ติดต่อเพื่อประสานงานย้อนกลับ">{{ old('contact_address') }}</textarea>
                    </div>

                    <div class="form-group" style="margin-top: 24px;">
                        <label class="form-label">แนบไฟล์ประกอบโครงการ (สามารถแนบได้ตั้งแต่ 1 ไฟล์ขึ้นไป)</label>
                        <div class="file-upload-wrapper" style="border: 2px dashed rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 24px; text-align: center; background: rgba(255, 255, 255, 0.02); transition: var(--transition-smooth); cursor: pointer;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.15)'" onclick="document.getElementById('attachments').click()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: var(--text-muted); margin-bottom: 8px; margin-left: auto; margin-right: auto;">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>
                            <div style="font-size: 14px; font-weight: 500; margin-bottom: 4px;">คลิกที่นี่ เพื่อเลือกไฟล์แนบ</div>
                            <div style="font-size: 12px; color: var(--text-muted);">รองรับไฟล์รูปภาพ, เอกสาร PDF, Word, Excel (ขนาดสูงสุด 10MB ต่อไฟล์)</div>
                            <input type="file" id="attachments" name="attachments[]" multiple style="display: none;" onchange="updateFileList(this)">
                        </div>
                        <div id="file-list" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;"></div>
                    </div>
                </div>

                <!-- Navigation Controls -->
                <div class="actions-row">
                    <button type="button" class="btn-secondary" id="btn-prev" onclick="changeStep(-1)" style="visibility: hidden;">ย้อนกลับ</button>
                    <button type="button" class="btn-action" id="btn-next" onclick="changeStep(1)">ขั้นตอนถัดไป →</button>
                    <button type="submit" class="btn-action" id="btn-submit" style="display: none;">✓ ส่งข้อเสนอโครงการ</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        let currentStep = 1;
        const totalSteps = 3;

        function updateProgressBar() {
            // Calculate progress percentage
            const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
            document.getElementById('steps-progress').style.width = percentage + '%';

            // Update Nodes status
            for (let i = 1; i <= totalSteps; i++) {
                const node = document.getElementById(`step-node-${i}`);
                if (i < currentStep) {
                    node.className = 'step-node completed';
                } else if (i === currentStep) {
                    node.className = 'step-node active';
                } else {
                    node.className = 'step-node';
                }
            }
        }

        function changeStep(direction) {
            // Simple validation on Step 3 before submitting
            if (direction === 1 && currentStep === 3) {
                return; // Action handled by submit button
            }

            // Hide current section
            document.getElementById(`section-${currentStep}`).classList.remove('active');

            // Update step count
            currentStep += direction;

            // Show new section
            document.getElementById(`section-${currentStep}`).classList.add('active');

            // Handle nav buttons visibility
            const prevBtn = document.getElementById('btn-prev');
            const nextBtn = document.getElementById('btn-next');
            const submitBtn = document.getElementById('btn-submit');

            if (currentStep === 1) {
                prevBtn.style.visibility = 'hidden';
                nextBtn.style.display = 'inline-flex';
                submitBtn.style.display = 'none';
            } else if (currentStep === totalSteps) {
                prevBtn.style.visibility = 'visible';
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-flex';
            } else {
                prevBtn.style.visibility = 'visible';
                nextBtn.style.display = 'inline-flex';
                submitBtn.style.display = 'none';
            }

            updateProgressBar();
            
            // Scroll back to top of container
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Cascading Dropdown Data for Section 1
        const nationalStrategiesData = [
            {
                name: "ยุทธศาสตร์ที่ 1 ด้านความมั่นคง",
                masterPlans: [
                    {
                        name: "แผนแม่บทประเด็น ความมั่นคง",
                        nationalPlans: [
                            "หมุดหมายที่ 8: ไทยมีพื้นที่เมืองที่ปลอดภัย น่าอยู่ และเติบโตอย่างยั่งยืน",
                            "หมุดหมายที่ 9: ไทยมีความยากจนข้ามรุ่นลดลงและคนไทยมีความคุ้มครองทางสังคมที่เพียงพอ"
                        ]
                    },
                    {
                        name: "แผนแม่บทประเด็น การป้องกันและแก้ไขปัญหาที่มีผลกระทบต่อความมั่นคง",
                        nationalPlans: [
                            "หมุดหมายที่ 8: ไทยมีพื้นที่เมืองที่ปลอดภัย น่าอยู่ และเติบโตอย่างยั่งยืน"
                        ]
                    }
                ]
            },
            {
                name: "ยุทธศาสตร์ที่ 2 ด้านการสร้างความสามารถในการแข่งขัน",
                masterPlans: [
                    {
                        name: "แผนแม่บทประเด็น การท่องเที่ยว",
                        nationalPlans: [
                            "หมุดหมายที่ 2: ไทยเป็นจุดหมายปลายทางของการท่องเที่ยวที่เน้นคุณภาพและความยั่งยืน"
                        ]
                    },
                    {
                        name: "แผนแม่บทประเด็น การเกษตร",
                        nationalPlans: [
                            "หมุดหมายที่ 1: ไทยเป็นประเทศชั้นนำด้านสินค้าเกษตรและเกษตรแปรรูปมูลค่าสูง"
                        ]
                    },
                    {
                        name: "แผนแม่บทประเด็น อุตสาหกรรมและบริการแห่งอนาคต",
                        nationalPlans: [
                            "หมุดหมายที่ 3: ไทยเป็นฐานการผลิตยานยนต์ไฟฟ้าที่สำคัญของโลก",
                            "หมุดหมายที่ 5: ไทยเป็นประตูการค้าการลงทุนและยุทธศาสตร์ทางโลจิสติกส์"
                        ]
                    }
                ]
            },
            {
                name: "ยุทธศาสตร์ที่ 3 ด้านการพัฒนาและเสริมสร้างศักยภาพทรัพยากรมนุษย์",
                masterPlans: [
                    {
                        name: "แผนแม่บทประเด็น การสร้างเสริมให้คนมีสุขภาวะที่ดี (PHY70)",
                        nationalPlans: [
                            "หมุดหมายที่ 4: ไทยเป็นศูนย์กลางทางการแพทย์และสุขภาพมูลค่าสูง (Medical & Wellness Hub)",
                            "หมุดหมายที่ 9: ไทยมีความยากจนข้ามรุ่นลดลงและคนไทยมีความคุ้มครองทางสังคมที่เพียงพอ"
                        ]
                    },
                    {
                        name: "แผนแม่บทประเด็น การเรียนรู้และการศึกษา",
                        nationalPlans: [
                            "หมุดหมายที่ 12: ไทยมีกำลังคนที่มีสมรรถนะสูงตอบโจทย์การพัฒนาแห่งอนาคต"
                        ]
                    }
                ]
            },
            {
                name: "ยุทธศาสตร์ที่ 4 ด้านการสร้างโอกาสและความเสมอภาคทางสังคม",
                masterPlans: [
                    {
                        name: "แผนแม่บทประเด็น การลดความเหลื่อมล้ำและสร้างความเป็นธรรม",
                        nationalPlans: [
                            "หมุดหมายที่ 9: ไทยมีความยากจนข้ามรุ่นลดลงและคนไทยมีความคุ้มครองทางสังคมที่เพียงพอ",
                            "หมุดหมายที่ 11: ไทยมีภาครัฐที่ทันสมัย มีประสิทธิภาพ และตอบโจทย์ประชาชน"
                        ]
                    }
                ]
            },
            {
                name: "ยุทธศาสตร์ที่ 5 ด้านการสร้างการเติบโตบนคุณภาพชีวิตที่เป็นมิตรต่อสิ่งแวดล้อม",
                masterPlans: [
                    {
                        name: "แผนแม่บทประเด็น การสร้างการเติบโตบนคุณภาพชีวิตที่เป็นมิตรกับสิ่งแวดล้อม",
                        nationalPlans: [
                            "หมุดหมายที่ 10: ไทยมีเศรษฐกิจหมุนเวียนและสังคมคาร์บอนต่ำ",
                            "หมุดหมายที่ 11: ไทยมีภูมิคุ้มกันต่อภัยธรรมชาติและการเปลี่ยนแปลงสภาพภูมิอากาศ"
                        ]
                    }
                ]
            },
            {
                name: "ยุทธศาสตร์ที่ 6 ด้านการปรับสมดุลและพัฒนาระบบการบริหารจัดการภาครัฐ",
                masterPlans: [
                    {
                        name: "แผนแม่บทประเด็น การบริการภาครัฐและการเพิ่มประสิทธิภาพภาครัฐ",
                        nationalPlans: [
                            "หมุดหมายที่ 13: ไทยมีภาครัฐที่ทันสมัย มีประสิทธิภาพ และตอบโจทย์ประชาชน"
                        ]
                    }
                ]
            }
        ];

        // DOM elements for Cascading
        const selectStrategy = document.getElementById('national_strategy');
        const selectMasterPlan = document.getElementById('master_plan');
        const selectNationalPlan = document.getElementById('national_plan');
        const selectRegionalDev = document.getElementById('regional_development');

        // Populate Strategies
        nationalStrategiesData.forEach(strat => {
            const opt = document.createElement('option');
            opt.value = strat.name;
            opt.textContent = strat.name;
            selectStrategy.appendChild(opt);
        });

        // Strategy change event
        selectStrategy.addEventListener('change', function() {
            const selectedStratName = this.value;
            selectMasterPlan.innerHTML = '<option value="">-- กรุณาเลือกแผนแม่บท --</option>';
            selectNationalPlan.innerHTML = '<option value="">-- กรุณาเลือกแผนพัฒนาเศรษฐกิจฯ --</option>';
            selectMasterPlan.disabled = true;
            selectNationalPlan.disabled = true;

            if (selectedStratName) {
                const strat = nationalStrategiesData.find(s => s.name === selectedStratName);
                if (strat && strat.masterPlans) {
                    strat.masterPlans.forEach(mp => {
                        const opt = document.createElement('option');
                        opt.value = mp.name;
                        opt.textContent = mp.name;
                        selectMasterPlan.appendChild(opt);
                    });
                    selectMasterPlan.disabled = false;
                }
            }
        });

        // Master Plan change event
        selectMasterPlan.addEventListener('change', function() {
            const selectedMPName = this.value;
            selectNationalPlan.innerHTML = '<option value="">-- กรุณาเลือกแผนพัฒนาเศรษฐกิจฯ --</option>';
            selectNationalPlan.disabled = true;

            if (selectedMPName) {
                const selectedStratName = selectStrategy.value;
                const strat = nationalStrategiesData.find(s => s.name === selectedStratName);
                if (strat) {
                    const mp = strat.masterPlans.find(m => m.name === selectedMPName);
                    if (mp && mp.nationalPlans) {
                        mp.nationalPlans.forEach(np => {
                            const opt = document.createElement('option');
                            opt.value = np;
                            opt.textContent = np;
                            selectNationalPlan.appendChild(opt);
                        });
                        selectNationalPlan.disabled = false;
                    }
                }
            }
        });

        // Cascading Dropdown Data for Section 2 (Phetchabun Province)
        const provincialData = [
            {
                issue: "ประเด็นที่ 1: การพัฒนาเมือง ท่องเที่ยวเชิงสร้างสรรค์ และบริการสุขภาพมูลค่าสูง",
                guidelines: [
                    {
                        name: "แนวทางที่ 1.1: พัฒนาศักยภาพอุตสาหกรรมท่องเที่ยวและบริการสุขภาพเชิงรุก",
                        mainPlans: [
                            {
                                name: "แผนงานหลักด้านการพัฒนาเพชรบูรณ์เป็นเมืองท่องเที่ยวและสุขภาพระดับภาค",
                                plans: [
                                    "แผนงานส่งเสริมธุรกิจสปาและการดูแลสุขภาพทางเลือกเพื่อการท่องเที่ยว",
                                    "แผนงานเทศกาลท่องเที่ยวเชิงสุขภาพและมหกรรมอาหารปลอดภัยชุมชน"
                                ]
                            }
                        ]
                    },
                    {
                        name: "แนวทางที่ 1.2: ขยายฐานการท่องเที่ยวเชิงวัฒนธรรม วิถีชีวิต และธรรมชาติเขาค้อ-ภูทับเบิก",
                        mainPlans: [
                            {
                                name: "แผนงานหลักด้านการอนุรักษ์มรดกโลกศรีเทพและการท่องเที่ยวธรรมชาติยั่งยืน",
                                plans: [
                                    "แผนงานพัฒนาไกด์ชุมชนและยกระดับโฮมสเตย์รอบแหล่งโบราณคดีศรีเทพ",
                                    "แผนงานส่งเสริมการอนุรักษ์วิถีชีวิตดั้งเดิมและวัฒนธรรมพื้นถิ่นเพชรบูรณ์"
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                issue: "ประเด็นที่ 2: ยกระดับการผลิตสินค้าเกษตรอินทรีย์ เกษตรปลอดภัย และอุตสาหกรรมแปรรูป",
                guidelines: [
                    {
                        name: "แนวทางที่ 2.1: ส่งเสริมมาตรฐานการเกษตรปลอดภัย เกษตรอินทรีย์ และ Smart Farming",
                        mainPlans: [
                            {
                                name: "แผนงานหลักด้านการปรับโครงสร้างการเกษตรสู่เกษตรมูลค่าสูงจังหวัดเพชรบูรณ์",
                                plans: [
                                    "แผนงานพัฒนาแปลงเกษตรอินทรีย์อัจฉริยะต้นแบบและการใช้โดรนเพื่อการเกษตร",
                                    "แผนงานอบรมมาตรฐาน GAP แก่กลุ่มเกษตรกรรุ่นใหม่จังหวัดเพชรบูรณ์"
                                ]
                            }
                        ]
                    },
                    {
                        name: "แนวทางที่ 2.2: เพิ่มมูลค่าสินค้าแปรรูปด้วยเทคโนโลยีและนวัตกรรมชุมชน",
                        mainPlans: [
                            {
                                name: "แผนงานหลักด้านการส่งเสริมวิสาหกรรมชุมชนและโอทอปแปรรูป",
                                plans: [
                                    "แผนงานพัฒนาบรรจุภัณฑ์และเพิ่มช่องทางการตลาดดิจิทัลสินค้า OTOP",
                                    "แผนงานแปรรูปพืชผลเกษตรล้นตลาดด้วยระบบอบแห้งพลังงานแสงอาทิตย์"
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                issue: "ประเด็นที่ 3: เสริมสร้างความปลอดภัยทางสังคม การจัดการสิ่งแวดล้อม และสังคมผู้สูงอายุอย่างมีคุณภาพ",
                guidelines: [
                    {
                        name: "แนวทางที่ 3.1: พัฒนาระบบสาธารณสุขชุมชนและความรอบรู้ด้านสุขภาพ (PHY70)",
                        mainPlans: [
                            {
                                name: "แผนงานหลักด้านการส่งเสริมและสร้างสุขภาวะภาคประชาชนคนเพชรบูรณ์ (PHY70)",
                                plans: [
                                    "แผนงานขับเคลื่อนตำบลสุขภาวะรอบรู้สุขภาพระดับพื้นที่บูรณาการร่วมกับ อปท.",
                                    "แผนงานเสริมสร้างความรอบรู้สุขภาพ ปรับเปลี่ยนพฤติกรรมลดความเสี่ยง NCDs",
                                    "แผนงานส่งเสริมกิจกรรมทางกาย การแข่งขันกีฬาชุมชน และการพัฒนาสวนสาธารณะตำบล"
                                ]
                            }
                        ]
                    },
                    {
                        name: "แนวทางที่ 3.2: จัดการปัญหาสิ่งแวดล้อมและการพัฒนาเมืองอัจฉริยะอย่างปลอดภัย",
                        mainPlans: [
                            {
                                name: "แผนงานหลักด้านการบริหารจัดการขยะมูลฝอยและมลพิษสิ่งแวดล้อมชุมชน",
                                plans: [
                                    "แผนงานคัดแยกขยะต้นทางและสร้างศูนย์แปรรูปขยะรีไซเคิลชุมชน",
                                    "แผนงานเฝ้าระวังและป้องกันฝุ่น PM2.5 ในพื้นที่เกษตรกรรมป่าไม้"
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        // DOM elements for Section 2 Cascading
        const selectIssue = document.getElementById('province_issue');
        const selectGuideline = document.getElementById('development_guideline');
        const selectMainPlan = document.getElementById('main_plan');
        const selectPlan = document.getElementById('plan');

        // Populate Issues
        provincialData.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.issue;
            opt.textContent = item.issue;
            selectIssue.appendChild(opt);
        });

        // Issue change event
        selectIssue.addEventListener('change', function() {
            const selectedIssueName = this.value;
            selectGuideline.innerHTML = '<option value="">-- กรุณาเลือกแนวทางการพัฒนา --</option>';
            selectMainPlan.innerHTML = '<option value="">-- กรุณาเลือกแผนงานหลัก --</option>';
            selectPlan.innerHTML = '<option value="">-- กรุณาเลือกรายละเอียดแผนงาน --</option>';
            selectGuideline.disabled = true;
            selectMainPlan.disabled = true;
            selectPlan.disabled = true;

            if (selectedIssueName) {
                const item = provincialData.find(p => p.issue === selectedIssueName);
                if (item && item.guidelines) {
                    item.guidelines.forEach(gl => {
                        const opt = document.createElement('option');
                        opt.value = gl.name;
                        opt.textContent = gl.name;
                        selectGuideline.appendChild(opt);
                    });
                    selectGuideline.disabled = false;
                }
            }
        });

        // Guideline change event
        selectGuideline.addEventListener('change', function() {
            const selectedGuidelineName = this.value;
            selectMainPlan.innerHTML = '<option value="">-- กรุณาเลือกแผนงานหลัก --</option>';
            selectPlan.innerHTML = '<option value="">-- กรุณาเลือกรายละเอียดแผนงาน --</option>';
            selectMainPlan.disabled = true;
            selectPlan.disabled = true;

            if (selectedGuidelineName) {
                const selectedIssueName = selectIssue.value;
                const item = provincialData.find(p => p.issue === selectedIssueName);
                if (item) {
                    const gl = item.guidelines.find(g => g.name === selectedGuidelineName);
                    if (gl && gl.mainPlans) {
                        gl.mainPlans.forEach(mp => {
                            const opt = document.createElement('option');
                            opt.value = mp.name;
                            opt.textContent = mp.name;
                            selectMainPlan.appendChild(opt);
                        });
                        selectMainPlan.disabled = false;
                    }
                }
            }
        });

        // Main Plan change event
        selectMainPlan.addEventListener('change', function() {
            const selectedMainPlanName = this.value;
            selectPlan.innerHTML = '<option value="">-- กรุณาเลือกรายละเอียดแผนงาน --</option>';
            selectPlan.disabled = true;

            if (selectedMainPlanName) {
                const selectedIssueName = selectIssue.value;
                const selectedGuidelineName = selectGuideline.value;
                const item = provincialData.find(p => p.issue === selectedIssueName);
                if (item) {
                    const gl = item.guidelines.find(g => g.name === selectedGuidelineName);
                    if (gl) {
                        const mp = gl.mainPlans.find(m => m.name === selectedMainPlanName);
                        if (mp && mp.plans) {
                            mp.plans.forEach(p => {
                                const opt = document.createElement('option');
                                opt.value = p;
                                opt.textContent = p;
                                selectPlan.appendChild(opt);
                            });
                            selectPlan.disabled = false;
                        }
                    }
                }
            }
        });

        // Initialize progress bar
        updateProgressBar();

        function updateFileList(input) {
            const list = document.getElementById('file-list');
            list.innerHTML = '';
            
            if (input.files.length > 0) {
                Array.from(input.files).forEach(file => {
                    const item = document.createElement('div');
                    item.style.display = 'flex';
                    item.style.alignItems = 'center';
                    item.style.justifyContent = 'space-between';
                    item.style.background = 'rgba(255, 255, 255, 0.04)';
                    item.style.padding = '8px 16px';
                    item.style.borderRadius = '8px';
                    item.style.fontSize = '13px';
                    item.style.border = '1px solid rgba(255, 255, 255, 0.08)';
                    
                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = file.name + ' (' + (file.size / 1024 / 1024).toFixed(2) + ' MB)';
                    nameSpan.style.color = 'var(--text-main)';
                    
                    item.appendChild(nameSpan);
                    list.appendChild(item);
                });
            }
        }
    </script>
</x-phy70::layouts.master>
