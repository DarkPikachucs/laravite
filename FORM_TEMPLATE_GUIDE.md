# Form Template Guide

## Overview
เพิ่มระบบ Template สำหรับแบบฟอร์ม Schema-based โดยรองรับการเลือก Template เริ่มต้นระหว่าง:
1. **Default** - แบบฟอร์มทั่วไป (ใช้ DynamicFormRenderer ปกติ)
2. **Survey** - แบบสอบถาม (ใช้ SurveyFormRenderer)

## การทำงาน

### 1. FormBuilder - การเลือก Template
เมื่อสร้างหรือแก้ไขแบบฟอร์ม Schema-based จะมี dropdown ให้เลือก Template:

```
โหมด: [📋 Schema Builder] [📝 Script Editor]
Template: [Default (ทั่วไป) ▼] [Survey (แบบสอบถาม)]
          ✓ ใช้ SurveyFormRenderer
```

### 2. การเก็บข้อมูล
Template ถูกเก็บในฟิลด์ `template` ของตาราง `forms`:
- `default` - แบบฟอร์มทั่วไป
- `survey` - แบบสอบถาม SDG

### 3. การ Render
เมื่อผู้ใช้เข้าถึงแบบฟอร์มผ่าน `/forms-schema/:uuid`:
1. `DynamicFormRenderer` โหลดข้อมูลแบบฟอร์ม
2. ตรวจสอบค่า `form.template`
3. ถ้า `template === 'survey'` → render ด้วย `SurveyFormRenderer`
4. ถ้า `template === 'default'` → render ด้วย form ปกติ

## ไฟล์ที่แก้ไข

### 1. `resources/js/pages/admin/FormBuilder.jsx`
- เพิ่ม state `template` (default: `'default'`)
- เพิ่ม dropdown เลือก template ใน UI
- เพิ่มฟิลด์ `template` ใน payload ที่ส่งไป API
- โหลดค่า `template` จาก API เมื่อแก้ไขแบบฟอร์ม

**Code Changes:**
```javascript
const [template, setTemplate] = useState('default')

// In loadForm()
setTemplate(form.template || 'default')

// In payload
const payload = {
  // ...
  template: template,
  // ...
}

// In UI
{formType === 'schema' && (
  <div className="flex items-center gap-2 mt-2">
    <span className="text-sm text-gray-600">Template:</span>
    <select value={template} onChange={(e) => setTemplate(e.target.value)}>
      <option value="default">Default (ทั่วไป)</option>
      <option value="survey">Survey (แบบสอบถาม)</option>
    </select>
    {template === 'survey' && (
      <span className="text-xs text-green-600">✓ ใช้ SurveyFormRenderer</span>
    )}
  </div>
)}
```

### 2. `resources/js/components/Forms/DynamicFormRenderer.jsx`
- Import `SurveyFormRenderer`
- ตรวจสอบ `form.template` ใน `loadForm()`
- Render `SurveyFormRenderer` ถ้า template เป็น 'survey'

**Code Changes:**
```javascript
import SurveyFormRenderer from "../../pages/forms/SurveyFormRenderer"

const loadForm = async () => {
  const response = await axios.get(`/forms/${uuid}/fill`)
  const formData = response.data.data
  
  setForm(formData)

  // ถ้าเป็น template survey ให้ใช้ SurveyFormRenderer
  if (formData.template === 'survey') {
    return
  }

  // Initialize form data for default template...
}

// In render
const settings = form.schema.settings || {}

// Render Survey template
if (form.template === 'survey') {
  return <SurveyFormRenderer form={form} uuid={uuid} />
}

return (
  // Default form rendering...
)
```

### 3. `resources/js/pages/forms/SurveyFormRenderer.jsx`
- รองรับ props `form` และ `uuid`
- ใช้ `form.schema` ถ้ามี ไม่อย่างนั้นใช้ `SURVEY_SCHEMA`
- ส่งข้อมูลไปยัง backend API แทน localStorage

**Code Changes:**
```javascript
const SurveyFormRenderer = ({ form, uuid }) => {
  // Use provided schema or default SURVEY_SCHEMA
  const schema = form?.schema || SURVEY_SCHEMA
  const formUuid = form?.uuid || uuid
  
  // ... state and logic

  const handleSubmit = async () => {
    try {
      const axios = (await import('axios')).default
      
      const payload = {
        responses: answers,
        respondent_name: answers.name || answers.gender || '',
        respondent_email: answers.email || '',
        respondent_phone: answers.phone || ''
      }
      
      await axios.post(`/api/forms/${formUuid}/submit`, payload)
      
      setSaved(true)
      // ... reset form
    } catch (error) {
      alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึก")
    }
  }
}
```

## การใช้งาน

### สำหรับผู้ดูแลระบบ (Admin)
1. ไปที่ `/admin/forms/new`
2. เลือกโหมด "📋 Schema Builder"
3. เลือก Template ที่ต้องการ:
   - **Default** - สำหรับแบบฟอร์มทั่วไป
   - **Survey** - สำหรับแบบสอบถาม SDG
4. เพิ่มฟิลด์และตั้งค่าแบบฟอร์ม
5. บันทึกแบบฟอร์ม

### สำหรับผู้ใช้งาน (User)
- เข้าถึงแบบฟอร์มผ่านลิงก์ `/forms/:uuid`
- ระบบจะ render ตาม template ที่เลือกไว้โดยอัตโนมัติ

## Database Schema
เพิ่มฟิลด์ `template` ในตาราง `forms`:
```sql
ALTER TABLE forms ADD COLUMN template VARCHAR(50) DEFAULT 'default';
```

## API Changes
Backend ต้องรองรับฟิลด์ `template` ใน:
- `POST /forms` - สร้างแบบฟอร์มใหม่
- `PUT /forms/:uuid` - อัปเดตแบบฟอร์ม
- `GET /forms/:uuid` - ดึงข้อมูลแบบฟอร์ม (return `template` ใน response)
- `GET /forms/:uuid/fill` - ดึงข้อมูลสำหรับกรอกแบบฟอร์ม (return `template` ใน response)

## ตัวอย่าง Schema สำหรับ Survey Template

```json
{
  "sections": [
    {
      "id": "part1",
      "num": 1,
      "title": "ข้อมูลเกี่ยวกับคุณลักษณะทั่วไป",
      "fields": [
        {
          "id": "gender",
          "label": "1. เพศ",
          "type": "radio+text",
          "required": true,
          "options": [
            {"value": "ชาย", "label": "ชาย"},
            {"value": "หญิง", "label": "หญิง"},
            {"value": "อื่นๆ", "label": "อื่น ๆ"}
          ]
        }
      ]
    }
  ]
}
```

## หมายเหตุ
- Template มีผลเฉพาะกับ Schema-based forms เท่านั้น
- Script-based forms ไม่รองรับ template
- SurveyFormRenderer ใช้ design เป็นพิเศษที่เหมาะสมกับแบบสอบถาม SDG
- การส่งข้อมูลของ Survey template จะใช้ backend API เช่นเดียวกับ default template

## Testing Checklist
- [ ] สร้างแบบฟอร์มใหม่ด้วย Default template
- [ ] สร้างแบบฟอร์มใหม่ด้วย Survey template
- [ ] แก้ไขแบบฟอร์มและเปลี่ยน template
- [ ] ทดสอบกรอกแบบฟอร์ม Default template
- [ ] ทดสอบกรอกแบบฟอร์ม Survey template
- [ ] ตรวจสอบการบันทึกข้อมูลลง database
- [ ] ตรวจสอบการแสดงผลในหน้า admin
