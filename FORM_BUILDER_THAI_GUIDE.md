# คู่มือการใช้งาน Dynamic Form Builder (ภาษาไทย)

## ภาพรวม
ระบบสร้างแบบฟอร์มออนไลน์คล้าย Google Forms ที่สามารถสร้างแบบฟอร์มได้ไม่จำกัด เก็บโครงสร้างแบบฟอร์มเป็น JSON และดูคำตอบเป็นตารางได้

## การติดตั้ง

### 1. รัน Database Migration

เปิด phpMyAdmin แล้วรัน SQL จากไฟล์:
```
database/migrations/forms_and_submissions.sql
```

หรือใช้คำสั่ง:
```bash
mysql -u username -p database_name < database/migrations/forms_and_submissions.sql
```

### 2. ติดตั้ง Package เพิ่มเติม
```bash
npm install uuid
npm run dev
```

## เส้นทางเข้าถึง (Routes)

### ส่วน Admin (ต้องล็อกอิน)
- **จัดการแบบฟอร์มทั้งหมด**: `/admin/forms`
- **สร้างแบบฟอร์มใหม่**: `/admin/forms/new`
- **แก้ไขแบบฟอร์ม**: `/admin/forms/{uuid}/edit`
- **ดูคำตอบ**: `/admin/forms/{uuid}/submissions`
- **ตั้งค่าการลงทะเบียน**: `/admin/registration-settings`

### ส่วน Public (ไม่ต้องล็อกอิน)
- **ทำแบบฟอร์ม**: `/forms/{uuid}`

## วิธีใช้งาน

### 1. สร้างแบบฟอร์มใหม่

1. ไปที่ `/admin/forms`
2. คลิก "➕ สร้างแบบฟอร์มใหม่"
3. กรอกข้อมูลพื้นฐาน:
   - ชื่อแบบฟอร์ม
   - คำอธิบาย
   - วันที่เริ่ม/สิ้นสุด (ถ้ามี)

### 2. เพิ่มฟิลด์ในแบบฟอร์ม

เลือกประเภทฟิลด์จากแผงด้านซ้าย (12 ประเภท):
- 📝 **ข้อความสั้น** - สำหรับข้อความสั้นๆ
- 📄 **ข้อความยาว** - สำหรับข้อความยาว
- 🔢 **ตัวเลข** - รับเฉพาะตัวเลข
- 📧 **อีเมล** - ตรวจสอบรูปแบบอีเมล
- 📞 **เบอร์โทร** - สำหรับเบอร์โทรศัพท์
- 📅 **วันที่** - เลือกวันที่
- 🕐 **วันที่และเวลา** - เลือกวันที่และเวลา
- 🔽 **Dropdown** - เลือกตัวเลือกเดียว (แบบเลื่อนลง)
- ⚪ **Radio** - เลือกตัวเลือกเดียว (แบบปุ่มกลม)
- ☑️ **Checkbox** - เลือกได้หลายตัวเลือก
- 🔗 **URL** - ตรวจสอบรูปแบบ URL
- 📎 **ไฟล์** - อัพโหลดไฟล์

### 3. ตั้งค่าฟิลด์

คลิกที่ฟิลด์เพื่อตั้งค่า:
- **ชื่อฟิลด์** - ชื่อที่แสดงให้ผู้ตอบเห็น
- **ข้อความตัวอย่าง** - Placeholder ในช่องกรอก
- **คำแนะนำ** - คำอธิบายเพิ่มเติม
- **จำเป็นต้องกรอก** - เปิด/ปิด การบังคับกรอก
- **ค่าต่ำสุด/สูงสุด** - สำหรับตัวเลข หรือความยาวข้อความ
- **ตัวเลือก** - สำหรับ Dropdown/Radio/Checkbox

### 4. จัดการฟิลด์

- **เรียงลำดับ** - ใช้ปุ่ม ⬆️ ⬇️
- **คัดลอก** - คลิก 📋
- **ลบ** - คลิก 🗑️

### 5. ตั้งค่าแบบฟอร์ม

ในโค้ด JSON Schema สามารถตั้งค่า:
```json
{
  "settings": {
    "theme_color": "#3B82F6",
    "collect_name": true,
    "collect_email": "optional",
    "collect_phone": false,
    "allow_multiple_submissions": true,
    "confirmation_message": "ขอบคุณที่ส่งแบบฟอร์ม",
    "redirect_url": null
  }
}
```

### 6. พรีวิวและเผยแพร่

1. คลิก "👁️ พรีวิว" เพื่อดูตัวอย่าง
2. คลิก "📢 เผยแพร่" เพื่อเปิดให้ทำแบบฟอร์ม
3. คัดลอก URL เพื่อแชร์: `/forms/{uuid}`

## การดูคำตอบ

### 1. เข้าหน้าดูคำตอบ
- ไปที่ `/admin/forms`
- หาแบบฟอร์มที่ต้องการ
- คลิก "📋 ดูคำตอบ"

### 2. กรองข้อมูล
- **ค้นหา** - กรอกชื่อ, อีเมล, เบอร์โทร
- **สถานะ** - กรองว่าอ่านแล้วหรือยังไม่อ่าน
- **ช่วงวันที่** - กำหนดวันที่จาก-ถึง

### 3. ดูรายละเอียด
- คลิกที่แถวข้อมูลเพื่อดูคำตอบทั้งหมด
- เพิ่มบันทึก (Admin Notes) ได้
- มาร์คว่าอ่านแล้ว

### 4. ส่งออกข้อมูล
- คลิก "📥 ส่งออก CSV"
- ไฟล์จะดาวน์โหลดเป็น Excel/CSV

## ตัวอย่างการใช้งาน

### แบบฟอร์มลงทะเบียน
```
1. เพิ่มฟิลด์:
   - ชื่อ-นามสกุล (Text, Required)
   - อีเมล (Email, Required)
   - เบอร์โทร (Tel)
   - หน่วยงาน (Select/Dropdown)
   - ตำแหน่ง (Text)
   - อาหารที่แพ้ (Checkbox - เลือกได้หลายข้อ)

2. ตั้งค่า:
   - เก็บข้อมูลผู้ตอบ: ชื่อ, อีเมล
   - อนุญาตให้ส่งซ้ำ: ไม่ได้
   - ข้อความยืนยัน: "ขอบคุณที่ลงทะเบียน"
```

### แบบฟอร์มสำรวจความพึงพอใจ
```
1. เพิ่มฟิลด์:
   - ระดับความพึงพอใจ (Radio: มากที่สุด, มาก, ปานกลาง, น้อย, น้อยที่สุด)
   - สิ่งที่ชอบ (Textarea)
   - สิ่งที่ควรปรับปรุง (Textarea)
   - แนะนำเพิ่มเติม (Text)

2. ตั้งค่า:
   - ไม่บังคับกรอกทุกข้อ
   - ไม่เก็บข้อมูลส่วนตัว
```

## API Endpoints (สำหรับ Developer)

### Public (ไม่ต้องใช้ Token)
```http
GET  /api/forms/{uuid}/fill          # โหลดแบบฟอร์ม
POST /api/forms/{uuid}/submit        # ส่งแบบฟอร์ม
```

### Authenticated (ต้องใช้ Sanctum Token)
```http
# จัดการแบบฟอร์ม
GET    /api/forms                    # ดูแบบฟอร์มทั้งหมด
POST   /api/forms                    # สร้างแบบฟอร์ม
GET    /api/forms/{uuid}             # ดูแบบฟอร์ม
PUT    /api/forms/{uuid}             # แก้ไขแบบฟอร์ม
DELETE /api/forms/{uuid}             # ลบแบบฟอร์ม
POST   /api/forms/{uuid}/duplicate   # คัดลอกแบบฟอร์ม
POST   /api/forms/{uuid}/publish     # เผยแพร่แบบฟอร์ม
GET    /api/forms/{uuid}/stats       # สถิติแบบฟอร์ม

# จัดการคำตอบ
GET    /api/forms/{uuid}/submissions          # ดูคำตอบทั้งหมด
GET    /api/forms/{uuid}/submissions/{id}     # ดูคำตอบรายละเอียด
PUT    /api/forms/{uuid}/submissions/{id}     # แก้ไขบันทึก
POST   /api/forms/{uuid}/submissions/{id}/notes # เพิ่มบันทึก
DELETE /api/forms/{uuid}/submissions/{id}     # ลบคำตอบ
GET    /api/forms/{uuid}/submissions/export   # ส่งออก CSV
GET    /api/forms/{uuid}/submissions/stats    # สถิติคำตอบ
```

## โครงสร้าง JSON Schema

```json
{
  "fields": [
    {
      "id": "field-unique-id",
      "type": "text",
      "label": "ชื่อฟิลด์",
      "placeholder": "ข้อความตัวอย่าง",
      "required": true,
      "help_text": "คำแนะนำ",
      "min": null,
      "max": null,
      "options": [],
      "validation_message": ""
    }
  ],
  "settings": {
    "show_progress_bar": true,
    "require_login": false,
    "allow_multiple_submissions": true,
    "show_confirmation": true,
    "confirmation_message": "ขอบคุณที่ส่งแบบฟอร์ม",
    "collect_email": "optional",
    "collect_phone": false,
    "collect_name": "optional",
    "theme_color": "#3B82F6",
    "redirect_url": null
  }
}
```

## การแก้ปัญหา

### แบบฟอร์มไม่บันทึก
- ตรวจสอบว่า JSON Schema ถูกต้อง (ใช้ jsonlint.com)
- ตรวจสอบว่าเพิ่มฟิลด์อย่างน้อย 1 ฟิลด์

### คำตอบไม่แสดง
- รีเฟรชหน้าเว็บ
- ตรวจสอบว่าล็อกอินแล้ว
- เคลียร์ Cache

### Export CSV ไม่ได้
- ตรวจสอบว่ามีคำตอบในระบบ
- ตรวจสอบสิทธิ์การเข้าถึง

## ฟิลด์ที่รองรับ

| ประเภท | คำอธิบาย | Validation |
|--------|----------|-----------|
| Text | ข้อความสั้น | min/max length |
| Textarea | ข้อความยาว | min/max length |
| Number | ตัวเลข | min/max value |
| Email | อีเมล | Email format |
| Tel | เบอร์โทร | - |
| Date | วันที่ | - |
| Datetime | วันที่และเวลา | - |
| Select | Dropdown | options |
| Radio | ตัวเลือกเดียว | options |
| Checkbox | หลายตัวเลือก | options |
| URL | ลิงก์เว็บไซต์ | URL format |
| File | อัพโหลดไฟล์ | - |

## เคล็ดลับการใช้งาน

1. **ตั้งชื่อฟิลด์ให้ชัดเจน** - ผู้ตอบจะได้เข้าใจง่าย
2. **ใช้ Help Text** - ช่วยให้ผู้ตอบกรอกข้อมูลถูกต้อง
3. **ทดสอบก่อนเผยแพร่** - กด Preview เพื่อทดสอบ
4. **เก็บข้อมูลเท่าที่จำเป็น** - อย่าถามเยอะเกินไป
5. **ตั้งค่า Confirmation Message** - ให้ผู้ตอบรู้ว่าส่งสำเร็จ

## การสนับสนุน

หากมีปัญหา:
1. ตรวจสอบคู่มือนี้
2. ดู Error Message จาก API
3. ตรวจสอบ Laravel Log: `storage/logs/laravel.log`
4. ตรวจสอบ Browser Console (F12)

---

**พัฒนาโดย**: Dynamic Form Builder System  
**เวอร์ชัน**: 1.0  
**อัปเดตล่าสุด**: 2025-03-16
