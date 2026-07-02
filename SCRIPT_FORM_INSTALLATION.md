# Script-Based Form - Installation & Usage

## การติดตั้ง

### 1. Run Migration
```bash
php artisan migrate
```

หากไม่มีตาราง forms อยู่แล้ว ให้รัน migration หลักก่อน:
```bash
php artisan migrate --path=database/migrations/2025_03_16_000002_create_forms_and_submissions_tables.php
```

จากนั้นรัน migration สำหรับ script-based forms:
```bash
php artisan migrate --path=database/migrations/2025_03_23_000001_add_form_type_and_script_content_to_forms_table.php
```

### 2. Build Frontend
```bash
npm run build
```

### 3. Clear Cache (optional)
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

## วิธีใช้งาน

### วิธีที่ 1: สร้าง Script-Based Form โดยตรง

1. ไปที่ `/admin/forms`
2. กดปุ่ม **"📝 Script Editor"**
3. กรอกชื่อแบบฟอร์ม
4. เลือก Template (หรือเขียน script เอง)
5. กด **"➕ สร้าง"**

### วิธีที่ 2: แปลงจาก Schema-Based Form

1. ไปที่ `/admin/forms`
2. กด **"✏️ แก้ไข"** บนแบบฟอร์มที่ต้องการ
3. กดปุ่ม **"📝 Script Editor"**
4. ยืนยันการเปลี่ยนโหมด
5. เขียน script
6. กด **"💾 บันทึก"**

## การเข้าถึงแบบฟอร์ม

### Admin (แก้ไข)
```
/admin/forms/{uuid}/script
```

### Public (ใช้งาน)
```
/forms/{uuid}
```

## โครงสร้าง Script

```jsx
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const MyForm = () => {
  const [formData, setFormData] = useState({...})
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/forms/${uuid}/submit`, {
        responses: formData,
        respondent_name: "...",
        respondent_email: "..."
      })
      toast.success("ส่งแบบฟอร์มสำเร็จ")
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด")
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  )
}

export default MyForm
```

## API Endpoints

### Get Form Data
```
GET /api/forms/{uuid}
```

### Get Script Content (Admin only)
```
GET /api/forms/{uuid}/script
```

### Update Script (Admin only)
```
POST /api/forms/{uuid}/script
Content-Type: application/json

{
  "script_content": "// Your React component code"
}
```

### Submit Form Data
```
POST /api/forms/{uuid}/submit
Content-Type: application/json

{
  "responses": {...},
  "respondent_name": "...",
  "respondent_email": "..."
}
```

## Troubleshooting

### ปัญหา: กดบันทึกแล้วไม่มีอะไรเกิดขึ้น

**สาเหตุ:**
- Migration ยังไม่ได้รัน
- Token หมดอายุ
- Script ไม่ถูกต้อง

**วิธีแก้:**
1. ตรวจสอบ console ใน browser (F12)
2. ตรวจสอบ Laravel logs: `storage/logs/laravel.log`
3. ลอง logout แล้ว login ใหม่

### ปัญหา: Script ไม่แสดง

**วิธีแก้:**
1. ตรวจสอบว่า form_type = 'script' ในฐานข้อมูล
2. ตรวจสอบ script_content ว่าไม่ว่าง
3. Clear cache: `php artisan cache:clear`

### ปัญหา: Submit ไม่ทำงาน

**วิธีแก้:**
1. ตรวจสอบ UUID ใน API endpoint
2. ตรวจสอบว่า form is_active = true
3. ตรวจสอบ network tab ใน browser

## ตรวจสอบในฐานข้อมูล

```sql
-- ดูแบบฟอร์มทั้งหมด
SELECT id, uuid, title, form_type, is_active, created_at 
FROM forms 
ORDER BY created_at DESC;

-- ดู script-based forms
SELECT id, uuid, title, LENGTH(script_content) as script_length
FROM forms 
WHERE form_type = 'script';

-- ตรวจสอบ form เฉพาะ
SELECT * FROM forms WHERE uuid = 'your-uuid-here';
```

## Files ที่เกี่ยวข้อง

### Backend
- `app/Http/Controllers/FormController.php` - Controller หลัก
- `app/Models/Form.php` - Model
- `routes/api.php` - API routes
- `database/migrations/2025_03_23_000001_add_form_type_and_script_content_to_forms_table.php` - Migration

### Frontend
- `resources/js/pages/admin/ScriptEditor.jsx` - หน้าแก้ไข script
- `resources/js/components/Forms/ScriptFormRunner.jsx` - หน้า render form
- `resources/js/pages/admin/FormsList.jsx` - รายการแบบฟอร์ม
- `resources/js/pages/admin/FormBuilder.jsx` - Schema builder (มี toggle)
- `resources/js/routes.jsx` - Routes

## Next Steps

หลังติดตั้งเสร็จ:
1. ✅ สร้าง script-based form ทดสอบ
2. ✅ ทดสอบ submit form
3. ✅ ตรวจสอบคำตอบใน database
4. ✅ ทดสอบแก้ไข script

## Support

หากมีปัญหา:
1. ตรวจสอบ browser console (F12)
2. ตรวจสอบ Laravel logs
3. ตรวจสอบ network requests
4. อ่าน `SCRIPT_BASED_FORM_GUIDE.md`
