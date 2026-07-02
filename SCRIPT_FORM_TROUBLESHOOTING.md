# Troubleshooting: เปลี่ยน Form Type ไม่ทำงาน

## ปัญหา
เมื่อกดปุ่ม "📝 Script Editor" ใน FormBuilder แล้วกดบันทึก form_type ไม่เปลี่ยนจาก 'schema' เป็น 'script'

## การแก้ไขที่ทำแล้ว

### 1. FormController.php
- ✅ เปลี่ยน validation ให้ยอมรับการเปลี่ยน type โดยไม่ต้องมี script_content ทันที
- ✅ ตรวจสอบ script_content เฉพาะเมื่อมีการส่งค่ามาเท่านั้น

### 2. FormBuilder.jsx
- ✅ เพิ่ม logging เพื่อดูค่าที่ส่งไป
- ✅ เพิ่ม redirect ไป script editor หลังเปลี่ยน type สำเร็จ

## วิธีทดสอบ

### ขั้นตอนที่ 1: เปิด Browser Console
1. ไปที่ `/admin/forms/{uuid}/edit`
2. กด F12 เพื่อเปิด Console
3. ไปที่ Tab "Console"

### ขั้นตอนที่ 2: เปลี่ยน Form Type
1. กดปุ่ม "📝 Script Editor"
2. ยืนยันการเปลี่ยน
3. กดปุ่ม "💾 บันทึก"

### ขั้นตอนที่ 3: ตรวจสอบ Console
ควรมี log แบบนี้:
```
[FormBuilder Save] formType: script
[FormBuilder Save] Sending payload: {form_type: "script", ...}
[FormBuilder Save] PUT request to: /forms/{uuid}
[FormBuilder Save] Response: {success: true, data: {...}}
```

### ขั้นตอนที่ 4: ตรวจสอบใน Database
```sql
-- ตรวจสอบ form_type
SELECT uuid, title, form_type, LENGTH(script_content) as script_len 
FROM forms 
WHERE uuid = 'your-form-uuid';
```

ควรมี `form_type = 'script'`

## หากยังไม่ทำงาน

### ตรวจสอบ 1: API Response
1. เปิด Network Tab (F12 → Network)
2. กดบันทึก
3. ดู request PUT `/forms/{uuid}`
4. ตรวจสอบ Response

### ตรวจสอบ 2: Laravel Logs
```bash
tail -f storage/logs/laravel.log
```

### ตรวจสอบ 3: Manual Update
ลอง update ผ่าน SQL โดยตรง:
```sql
UPDATE forms 
SET form_type = 'script' 
WHERE uuid = 'your-uuid-here';
```

แล้วลองเข้า `/admin/forms/{uuid}/script`

## ตัวอย่าง Log ที่ถูกต้อง

### Console Log:
```
[FormBuilder Save] formType: script
[FormBuilder Save] Sending payload: {
  "title": "Test Form",
  "form_type": "script",
  "schema": "{\"fields\":[]}",
  ...
}
[FormBuilder Save] Response: {
  "success": true,
  "data": {
    "form_type": "script",
    ...
  }
}
```

### Network Request:
```
PUT /api/forms/{uuid}
Status: 200 OK

Request Payload:
{
  "form_type": "script",
  "title": "...",
  ...
}

Response:
{
  "success": true,
  "data": {
    "form_type": "script",
    ...
  }
}
```

## การแก้ไขเพิ่มเติม (หากจำเป็น)

### Clear Cache
```bash
php artisan cache:clear
php artisan route:clear
php artisan config:clear
```

### Rebuild Frontend
```bash
npm run build
```

### Check Migration
```bash
php artisan migrate:status
```

ต้องมี migration:
- ✅ 2025_03_23_000001_add_form_type_and_script_content_to_forms_table.php

## หมายเหตุ

- เมื่อเปลี่ยนเป็น script type แล้ว schema จะยังคงอยู่ (ไม่ถูกลบ)
- สามารถเปลี่ยนกลับไป schema type ได้ตลอดเวลา
- Script content จะเริ่มว่างเปล่า จนกว่าจะเขียนใน script editor
