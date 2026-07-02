# แก้ไข: Public Form แสดง Error "This is not a script-based form"

## ปัญหา
เมื่อผู้ใช้เข้า `/forms/{uuid}` สำหรับ **schema-based form** จะเห็น error:
```
⚠️ เกิดข้อผิดพลาด
This is not a script-based form
```

## สาเหตุ
**ScriptFormRunner.jsx** โหลดทุก form ที่ `/forms/{uuid}` โดยไม่ตรวจสอบ `form_type` ก่อน
- ถ้าเป็น **script-based** → แสดงผลถูกต้อง
- ถ้าเป็น **schema-based** → แสดง error

## วิธีแก้

### 1. ตรวจสอบ form_type
```javascript
if (formData.form_type === 'script') {
  // โหลด script และ render
  await loadScriptForm(formData)
} else {
  // Redirect ไป schema renderer
  window.location.href = `/forms-schema/${uuid}`
}
```

### 2. Redirect ไป AdminFormRenderer
เมื่อพบว่าเป็น schema-based form ให้ redirect ไป `/forms-schema/{uuid}`

### 3. ปรับปรุง Error Messages
```javascript
if (err.response?.status === 404) {
  setError("ไม่พบแบบฟอร์มนี้")
} else if (err.response?.status === 403) {
  setError("แบบฟอร์มนี้ไม่พร้อมใช้งาน")
} else {
  setError(err.response?.data?.message || "ไม่สามารถโหลดแบบฟอร์มได้")
}
```

## โครงสร้าง Routes

### Public Form Routes
```
/forms/{uuid}
  ↓
ScriptFormRunner.jsx
  ↓
ตรวจสอบ form_type
  ├─ script → Render script component
  └─ schema → Redirect to /forms-schema/{uuid}

/forms-schema/{uuid}
  ↓
AdminFormRenderer.jsx (Schema-based form renderer)
  ↓
Render schema-based form
```

## การทำงาน

### Script-based Form
```
User → /forms/{uuid}
       ↓
ScriptFormRunner checks form_type = 'script'
       ↓
Load script_content from DB
       ↓
Evaluate and render React component
       ↓
User sees custom script form
```

### Schema-based Form
```
User → /forms/{uuid}
       ↓
ScriptFormRunner checks form_type = 'schema'
       ↓
Redirect to /forms-schema/{uuid}
       ↓
AdminFormRenderer loads schema
       ↓
Render form from schema JSON
       ↓
User sees schema-based form
```

## การทดสอบ

### ทดสอบ Script-based Form
```bash
# เข้า URL
https://your-domain.com/forms/{script-based-uuid}

# ควรเห็น
- แบบฟอร์มที่สร้างจาก script
- สามารถกรอกและ submit ได้
```

### ทดสอบ Schema-based Form
```bash
# เข้า URL
https://your-domain.com/forms/{schema-based-uuid}

# ควรเห็น
- Redirect ไป /forms-schema/{uuid}
- แบบฟอร์มที่สร้างจาก schema builder
- สามารถกรอกและ submit ได้
```

## ไฟล์ที่แก้ไข

### ScriptFormRunner.jsx
**เดิม:**
```javascript
if (formData.form_type === 'script') {
  await loadScriptForm(formData)
} else {
  setError('This is not a script-based form') // ❌ แสดง error
}
```

**ใหม่:**
```javascript
if (formData.form_type === 'script') {
  await loadScriptForm(formData)
} else {
  // ✅ Redirect ไป schema renderer
  window.location.href = `/forms-schema/${uuid}`
  return
}
```

## ประโยชน์

### 1. ผู้ใช้ไม่เห็น Error
- Schema-based form → redirect อัตโนมัติ
- Script-based form → render ปกติ

### 2. URL เดียวกัน ทำงานได้ทั้ง 2 แบบ
```
/forms/{uuid} → ทำงานได้ทั้ง script และ schema
```

### 3. Backward Compatibility
- Form เก่าที่เป็น schema ยังทำงานได้
- Form ใหม่ที่เป็น script ก็ทำงานได้

## สรุป

| Form Type | URL | Component | ผลลัพธ์ |
|-----------|-----|-----------|---------|
| Script-based | /forms/{uuid} | ScriptFormRunner | ✅ Render script |
| Schema-based | /forms/{uuid} | ScriptFormRunner → Redirect | ✅ Render schema |
| Schema-based | /forms-schema/{uuid} | AdminFormRenderer | ✅ Render schema |

## หมายเหตุ

⚠️ **ห้ามใช้ `/forms-schema/{uuid}` สำหรับ script-based form**
- จะไม่ทำงาน เพราะ AdminFormRenderer ไม่รองรับ script

✅ **ใช้ `/forms/{uuid}` สำหรับทุก form**
- ระบบจะ redirect อัตโนมัติตาม form_type

## การตรวจสอบ

### ใน Database
```sql
-- ตรวจสอบ form_type
SELECT uuid, title, form_type 
FROM forms;
```

### ใน Browser Console
```javascript
// ตรวจสอบ redirect
console.log(window.location.href)
```

### ใน Network Tab
```
Request 1: GET /forms/{uuid}
           ↓
Response: 302 Found (redirect)
Location: /forms-schema/{uuid}

Request 2: GET /forms-schema/{uuid}
           ↓
Response: 200 OK
```

## ขั้นตอนถัดไป

1. ✅ Rebuild frontend
   ```bash
   npm run build
   ```

2. ✅ ทดสอบกับ script-based form
   ```
   /forms/{script-uuid}
   ```

3. ✅ ทดสอบกับ schema-based form
   ```
   /forms/{schema-uuid}
   ```

4. ✅ ตรวจสอบ redirect ทำงานถูกต้อง

## สรุป

✅ แก้ไขแล้ว:
- ScriptFormRunner ตรวจสอบ form_type
- Redirect ไป AdminFormRenderer สำหรับ schema-based
- แสดง error ที่ชัดเจนสำหรับกรณีอื่นๆ

✅ ผู้ใช้จะเห็น:
- Script-based form → ทำงานปกติ
- Schema-based form → redirect อัตโนมัติ
- ไม่เห็น error "This is not a script-based form" อีกต่อไป
