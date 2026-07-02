# แก้ไข: "This is not a script-based form" Error

## ปัญหา
เมื่อเข้าหน้า Script Editor ของ form ที่เป็น **Schema-based** จะเกิด error:
```
⚠️ เกิดข้อผิดพลาด
This is not a script-based form
```

## สาเหตุ
ScriptEditor.jsx ไม่ได้ตรวจสอบ `form_type` ก่อนแสดงหน้า
และไม่ได้แสดง UI ที่ชัดเจนว่า form นี้เป็น type อะไร

## การแก้ไขที่ทำ

### 1. ตรวจสอบ form_type ใน loadForm()
```javascript
if (formData.form_type !== 'script') {
  console.warn('[ScriptEditor] This is not a script-based form')
  
  // แสดง error แบบชัดเจน
  toast.error("นี่ไม่ใช่ Script-based form\nกรุณาเปลี่ยนเป็น Script Editor หรือสร้าง form ใหม่")
  
  // โหลด script ว่างเพื่อให้เริ่มเขียนใหม่ได้
  setScriptContent("")
}
```

### 2. เพิ่ม Warning Banner
แสดง banner สีเหลืองเมื่อ form_type !== 'script':

```jsx
{form && form.form_type !== 'script' && (
  <div className="bg-yellow-50 border-l-4 border-yellow-400">
    <h3>⚠️ นี่ไม่ใช่ Script-based Form</h3>
    <p>แบบฟอร์มนี้ใช้ Schema Builder ไม่ใช่ Script Editor</p>
    
    {/* ปุ่มเลือก */}
    <button onClick={() => navigate(`/admin/forms/${uuid}/edit`)}>
      ✏️ ไปหน้า Schema Editor
    </button>
    
    <button onClick={handleConvertToScript}>
      🔄 เปลี่ยนเป็น Script-based Form
    </button>
  </div>
)}
```

### 3. เพิ่มฟังก์ชันแปลง form_type
```javascript
const handleConvertToScript = async () => {
  if (confirm('ต้องการเปลี่ยนเป็น Script-based form หรือไม่?')) {
    await axios.post(`/forms/${uuid}/script`, {
      script_content: templates.simple
    })
    toast.success("เปลี่ยนเป็น Script-based form แล้ว")
    // Reload form data
  }
}
```

## ผลลัพธ์

### เมื่อเข้าหน้า Script Editor

#### กรณีที่ 1: Form เป็น Script-based ✅
```
- โหลด script content
- แสดง editor ปกติ
- สามารถแก้ไขและบันทึกได้
```

#### กรณีที่ 2: Form เป็น Schema-based ⚠️
```
- แสดง banner สีเหลืองเตือน
- แสดง 2 ตัวเลือก:
  1. ✏️ ไปหน้า Schema Editor (กลับไปที่ form builder ปกติ)
  2. 🔄 เปลี่ยนเป็น Script-based Form (แปลง form_type)
```

## วิธีใช้งาน

### หากเห็น error "This is not a script-based form"

#### วิธีที่ 1: กลับไปใช้ Schema Editor
1. กดปุ่ม **"✏️ ไปหน้า Schema Editor"**
2. ใช้ form builder ปกติในการแก้ไข

#### วิธีที่ 2: แปลงเป็น Script-based Form
1. กดปุ่ม **"🔄 เปลี่ยนเป็น Script-based Form"**
2. ยืนยันการแปลง
3. ระบบจะโหลด template อย่างง่าย
4. เริ่มเขียน script ได้เลย

#### วิธีที่ 3: สร้าง Script-based Form ใหม่
1. กด **"← กลับ"**
2. กด **"📝 Script Editor"** ที่หน้า FormsList
3. สร้าง form ใหม่

## การตรวจสอบ form_type

### ใน Database
```sql
SELECT uuid, title, form_type 
FROM forms 
WHERE uuid = 'your-uuid';
```

### ใน Browser Console
```javascript
// หลังโหลด form
console.log(form.form_type) // 'script' หรือ 'schema'
```

### ใน Network Tab
```
GET /api/forms/{uuid}

Response:
{
  "form_type": "schema",  // หรือ "script"
  ...
}
```

## สรุป

| สถานการณ์ | การแก้ไข |
|-----------|---------|
| เห็น error "This is not a script-based form" | เลือก 1 ใน 3 วิธีด้านบน |
| ต้องการแก้ไข schema-based form | ใช้ Schema Builder |
| ต้องการเขียน script เอง | สร้าง script-based form ใหม่ |
| ต้องการแปลง form | กดปุ่ม "เปลี่ยนเป็น Script-based Form" |

## หมายเหตุ

⚠️ **การแปลงจาก Schema เป็น Script:**
- Schema จะยังคงอยู่ใน database
- แต่จะไม่ถูกใช้ (ใช้ script_content แทน)
- สามารถเปลี่ยนกลับไปใช้ Schema ได้

✅ **แนะนำ:**
- สร้าง script-based form ใหม่ตั้งแต่ต้น
- อย่าแปลง schema-based form ยกเว้นจำเป็น

## Files ที่แก้ไข

- `resources/js/pages/admin/ScriptEditor.jsx`
  - เพิ่ม warning banner
  - เพิ่ม handleConvertToScript function
  - ปรับปรุง loadForm logic

## การทดสอบ

1. เข้า `/admin/forms/{uuid}/script` ของ schema-based form
2. ควรเห็น banner สีเหลืองเตือน
3. ทดสอบกดปุ่มทั้ง 2 ปุ่ม
4. ควรทำงานตามที่ต้องการ
