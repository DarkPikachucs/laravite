# แก้ไข: Script error - Unexpected token '<'

## ปัญหา
เมื่อโหลด script-based form จะเกิด error:
```
⚠️ เกิดข้อผิดพลาด
Script error: Unexpected token '<'
```

## สาเหตุ
Error นี้เกิดจาก:
1. **Script content เป็น HTML** แทนที่จะเป็น JavaScript
2. **API response กลับ error page** (HTML) แทนที่จะเป็น script
3. **Blank หรือ empty script content**
4. **Code ซ้ำใน ScriptFormRunner**

## การแก้ไขที่ทำ

### 1. เพิ่มการตรวจสอบ Script Content
```javascript
const loadScriptForm = async (formData) => {
  const scriptContent = formData.script_content

  // ตรวจสอบความยาว
  console.log('Script content length:', scriptContent?.length)
  
  // ตรวจสอบ preview
  console.log('Script preview:', scriptContent?.substring(0, 100))

  // ตรวจสอบ empty
  if (!scriptContent || scriptContent.trim() === '') {
    throw new Error('Script content is empty')
  }

  // ตรวจสอบ HTML (ควรเป็น JavaScript)
  if (scriptContent.trim().startsWith('<!DOCTYPE') || 
      scriptContent.trim().startsWith('<html')) {
    throw new Error('Invalid script content: Received HTML instead of JavaScript')
  }

  // ตรวจสอบ export default
  if (!scriptContent.includes('export default')) {
    console.warn('Script missing "export default"')
  }
}
```

### 2. เพิ่ม Logging ใน evaluateScript
```javascript
const evaluateScript = async (scriptContent, formUuid) => {
  try {
    console.log('[ScriptFormRunner] Evaluating script...')
    console.log('[ScriptFormRunner] Transformed script length:', transformedScript.length)
    
    // ... evaluate ...
    
    console.log('[ScriptFormRunner] Script evaluated successfully')
    return component
  } catch (err) {
    console.error("[ScriptFormRunner] Script evaluation error:", err)
    console.error("[ScriptFormRunner] Error message:", err.message)
    console.error("[ScriptFormRunner] Error stack:", err.stack)
    throw new Error(`Script error: ${err.message}`)
  }
}
```

### 3. ลบ Code ซ้ำ
ลบ code ที่ซ้ำออกจาก evaluateScript function

### 4. ปรับปรุง Error Handling
```javascript
const loadForm = async () => {
  try {
    const response = await axios.get(`/forms/${uuid}/fill`)
    const formData = response.data.data

    if (formData.form_type === 'script') {
      await loadScriptForm(formData)
    } else {
      window.location.href = `/forms-schema/${uuid}`
      return
    }
  } catch (err) {
    console.error("[ScriptFormRunner] Error loading form:", err)
    console.error("[ScriptFormRunner] Error response:", err.response)
    
    // แสดง error ที่ชัดเจน
    if (err.response?.status === 404) {
      setError("ไม่พบแบบฟอร์มนี้")
    } else if (err.response?.status === 403) {
      setError("แบบฟอร์มนี้ไม่พร้อมใช้งาน")
    } else {
      setError(err.response?.data?.message || "ไม่สามารถโหลดแบบฟอร์มได้")
    }
  }
}
```

## การ Debug

### เปิด Browser Console (F12)
จะเห็น log แบบนี้:

#### กรณีสำเร็จ
```
[ScriptFormRunner] Loaded form: {...}
[ScriptFormRunner] form_type: script
[ScriptFormRunner] script_content exists: true
[ScriptFormRunner] Loading script form...
[ScriptFormRunner] Script content length: 1234
[ScriptFormRunner] Script content preview: // แบบฟอร์มอย่างง่าย...
[ScriptFormRunner] Evaluating script...
[ScriptFormRunner] Transformed script length: 1456
[ScriptFormRunner] Script evaluated successfully
```

#### กรณี Error - Empty Script
```
[ScriptFormRunner] Loading script form...
[ScriptFormRunner] Script content length: 0
Error: Script content is empty
```

#### กรณี Error - HTML instead of JS
```
[ScriptFormRunner] Loading script form...
[ScriptFormRunner] Script content preview: <!DOCTYPE html>...
Error: Invalid script content: Received HTML instead of JavaScript
```

#### กรณี Error - Syntax Error
```
[ScriptFormRunner] Evaluating script...
[ScriptFormRunner] Script evaluation error: SyntaxError: Unexpected token '<'
[ScriptFormRunner] Error message: Unexpected token '<'
[ScriptFormRunner] Error stack: SyntaxError: ...
```

## การทดสอบ

### 1. ตรวจสอบ Script Content ใน Database
```sql
SELECT uuid, title, form_type, LENGTH(script_content) as len
FROM forms
WHERE form_type = 'script';
```

ควรมี `script_content` ไม่ว่าง

### 2. ตรวจสอบ API Response
```bash
curl http://localhost/api/forms/{uuid}/fill | json_pp
```

ควรเห็น:
```json
{
  "form_type": "script",
  "script_content": "import { useState } from 'react'..."
}
```

### 3. ทดสอบใน Browser
```
1. เข้า /forms/{script-based-uuid}
2. เปิด Console (F12)
3. ดู log messages
4. ไม่ควรเห็น "Unexpected token '<'"
```

## สาเหตุที่เป็นไปได้ของ Error

### 1. Script Content เป็น HTML
**สาเหตุ:** API กลับ error page (HTML) แทน script

**แก้:** ตรวจสอบ API endpoint และ authentication

### 2. Script Content ว่างเปล่า
**สาเหตุ:** ไม่ได้บันทึก script content

**แก้:** เข้า Script Editor และบันทึก script

### 3. Script Syntax Error
**สาเหตุ:** JavaScript code ไม่ถูกต้อง

**แก้:** ตรวจสอบ script content ใน database

### 4. Missing `export default`
**สาเหตุ:** ไม่มี export default component

**แก้:** เพิ่ม `export default ComponentName` ใน script

## ตัวอย่าง Script ที่ถูกต้อง

```javascript
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const SimpleForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await axios.post(`/api/forms/${__formUuid}/submit`, {
        responses: formData,
        respondent_name: formData.name
      })
      toast.success("ส่งแบบฟอร์มสำเร็จ")
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <h1>แบบฟอร์ม</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="ชื่อ"
          />
          <button type="submit" disabled={loading}>
            {loading ? "กำลังบันทึก..." : "ส่งแบบฟอร์ม"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SimpleForm  // ✅ ต้องมี export default
```

## สรุป

### ก่อนแก้ไข
- ❌ ไม่มีการตรวจสอบ script content
- ❌ ไม่มีการ logging
- ❌ Code ซ้ำ
- ❌ Error handling ไม่ชัดเจน

### หลังแก้ไข
- ✅ ตรวจสอบ script content (empty, HTML)
- ✅ Logging ทุกขั้นตอน
- ✅ ลบ code ซ้ำออก
- ✅ Error handling ชัดเจน
- ✅ แสดง error message ที่เข้าใจง่าย

## ขั้นตอนถัดไป

1. ✅ Rebuild frontend
   ```bash
   npm run build
   ```

2. ✅ Clear cache
   ```bash
   php artisan cache:clear
   ```

3. ✅ ตรวจสอบ script content ใน database
   ```sql
   SELECT uuid, LENGTH(script_content) FROM forms WHERE form_type='script';
   ```

4. ✅ ทดสอบใน browser
   - เปิด console
   - ดู log messages
   - ไม่เห็น error "Unexpected token '<'"

5. ✅ หากยังมี error
   - ดู console log
   - ตรวจสอบ script content
   - ตรวจสอบ API response
