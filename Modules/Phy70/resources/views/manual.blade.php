<x-phy70::layouts.master>
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap"
    rel="stylesheet">
  <style>
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
      0% {
        transform: translate(0, 0) scale(1);
      }

      50% {
        transform: translate(40px, 30px) scale(1.1);
      }

      100% {
        transform: translate(0, 0) scale(1);
      }
    }

    .manual-container {
      max-width: 1440px;
      margin: 40px auto;
      background: rgba(30, 41, 59, 0.7);
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    h1 {
      color: #38bdf8;
      font-family: 'Outfit', sans-serif;
      font-size: 2rem;
      margin-bottom: 20px;
      border-bottom: 2px solid rgba(56, 189, 248, 0.3);
      padding-bottom: 10px;
    }

    h2 {
      color: #f8fafc;
      font-size: 1.5rem;
      margin-top: 30px;
      margin-bottom: 15px;
    }

    p {
      line-height: 1.7;
      color: #cbd5e1;
      margin-bottom: 15px;
      font-size: 15px;
    }

    ul {
      margin-bottom: 20px;
      padding-left: 20px;
      color: #cbd5e1;
      font-size: 15px;
    }

    li {
      margin-bottom: 10px;
      line-height: 1.6;
    }

    .highlight {
      color: #38bdf8;
      font-weight: 500;
    }

    .card {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Light Theme Adjustments */
    :root {
      --bg-base: #060913;
      --bg-surface: rgba(15, 23, 42, 0.6);
      --bg-surface-hover: rgba(30, 41, 59, 0.7);
      --border-glow: rgba(99, 102, 241, 0.15);
      --border-glow-hover: rgba(6, 182, 212, 0.4);

      --primary: #6366f1;
      /* Indigo */
      --primary-glow: rgba(99, 102, 241, 0.35);
      --secondary: #06b6d4;
      /* Cyan */
      --secondary-glow: rgba(6, 182, 212, 0.35);
      --success: #10b981;
      /* Emerald */
      --warning: #f59e0b;
      /* Amber */
      --danger: #ef4444;
      /* Rose */

      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dark: #0f172a;

      --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  </style>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="manual-container">
    <h1>คู่มือการใช้งานระบบสารสนเทศ Phetchabun Project</h1>

    <div class="card">
      <h2>1. การลงทะเบียนเพื่อสร้างผู้ใช้ใหม่ การเข้าสู่ระบบและการจัดการผู้ใช้งาน</h2>
      <p>ระบบรองรับการเข้าสู่ระบบ</p>
      <ul>
        <li><span class="highlight">การลงทะเบียน:</span> คลิกปุ่ม "สร้าบัญชีผู้ใช้ใหม่" ด้านบนเพื่อลงทะเบียน</li>
        <li><span class="highlight">การเข้าสู่ระบบด้วยอีเมล/รหัสผ่าน:</span> กรอกอีเมลและรหัสผ่านที่คุณได้ลงทะเบียนไว้
        </li>
      </ul>
      <p><strong>การเชิญผู้ใช้งานใหม่ (Invitation):</strong></p>
      <ul>
        <li>Admin สามารถเชิญผู้ใช้งานใหม่ได้จากเมนู "จัดการผู้ใช้งาน"</li>
        <li>เมื่อกดปุ่มเชิญ ระบบจะสร้าง <span class="highlight">ลิงก์คำเชิญ (Invite Link)</span> ขึ้นมา</li>
        <li>สามารถคัดลอกลิงก์นั้นส่งให้ผู้ที่ต้องการเชิญ เมื่อผู้ถูกเชิญคลิกลิงก์
          จะสามารถตั้งรหัสผ่านใหม่และเข้าสู่ระบบได้ทันที โดยไม่ต้องลงทะเบียนซ้ำซ้อน</li>
      </ul>
    </div>

    <div class="card">
      <h2>2. การสร้างและจัดการข้อเสนอโครงการ</h2>
      <p>ผู้ใช้งาน (User / Admin) สามารถสร้างข้อเสนอโครงการได้โดยทำตามขั้นตอนต่อไปนี้:</p>
      <ul>
        <li>ไปที่หน้าหลัก (Dashboard) แล้วคลิก <span class="highlight">"+ สร้างข้อเสนอโครงการ"</span></li>
        <li>กรอกข้อมูลในส่วนที่ 1: ข้อมูลทั่วไป (ชื่อโครงการ, ประเด็นการพัฒนา, ระยะเวลาดำเนินงาน)</li>
        <li>กรอกข้อมูลในส่วนที่ 2: กิจกรรม (เพิ่มกิจกรรมย่อย, ระบุงบประมาณ, พื้นที่เป้าหมาย, และ ตัวชี้วัดของกิจกรรม)
          <br><em>*หมายเหตุ: ในช่องหน่วยงานรับผิดชอบและหน่วยงานที่เกี่ยวข้อง ท่านสามารถค้นหาจากรายชื่อองค์กรในระบบ
            หรือพิมพ์ชื่อใหม่เองได้เลย</em>
        </li>
        <li>เมื่อกรอกข้อมูลเสร็จสิ้น สามารถเลือกกด <span class="highlight">"บันทึกร่าง"</span> เพื่อกลับมาแก้ไขภายหลัง
          หรือ <span class="highlight">"ส่งข้อเสนอโครงการ"</span> เพื่อส่งให้ตรวจสอบ</li>
      </ul>
    </div>

    <div class="card">
      <h2>3. คำแนะนำเพิ่มเติม</h2>
      <ul>
        <li>ระบบมีการบันทึกอัตโนมัติในบางส่วน แต่ควรคลิกปุ่มบันทึกเสมอเมื่อแก้ไขข้อมูลสำคัญ</li>
        <li>การกด Enter ในหน้าแบบฟอร์มจะไม่ทำให้ฟอร์มบันทึกข้อมูลและส่งอัตโนมัติ (ยกเว้นเมื่ออยู่ในช่อง Textarea
          ที่สามารถกด Enter เพื่อขึ้นบรรทัดใหม่ได้)</li>
        <li>สามารถดูสรุปภาพรวมได้ที่เมนู <span class="highlight">Dashboard</span></li>
      </ul>
    </div>

    <div class="card">
      <h2>4. การติดต่อสอบถาม</h2>
      <p>หากพบปัญหาหรือมีข้อสงสัยเกี่ยวกับการใช้งานระบบ สามารถติดต่อทีมงานได้ที่:</p>
      <ul>
        <li>โทร: 087-8567-359</li>
        <li>อีเมล: <a href="mailto:supanut@pcru.ac.th">supanut@pcru.ac.th</a></li>
        <li>Facebook: <a
            href="https://www.facebook.com/PolicyAndPlanningPCRU">https://www.facebook.com/PolicyAndPlanningPCRU</a>
        </li>
      </ul>
    </div>

  </div>
</x-phy70::layouts.master>