# Script-Based Form Builder Guide

## Overview
ระบบแบบฟอร์มรองรับการสร้าง 2 รูปแบบ:
1. **Schema-Based Form** - สร้างผ่าน UI (Drag & Drop)
2. **Script-Based Form** - สร้างผ่าน React Component (Text Editor)

## Installation

### Step 1: Run Migration
```bash
php artisan migrate
```

หรือ copy SQL ไปรันใน phpMyAdmin:
```sql
-- Add form_type and script_content columns to forms table
ALTER TABLE forms 
ADD COLUMN form_type VARCHAR(255) DEFAULT 'schema' AFTER schema,
ADD COLUMN script_content LONGTEXT NULL AFTER form_type,
ADD INDEX form_type_index (form_type);
```

### Step 2: Build Frontend
```bash
npm run build
```

## Usage Guide

### Creating a Script-Based Form

#### Method 1: Create from Scratch
1. ไปที่ `/admin/forms/new`
2. กรอกชื่อแบบฟอร์มและคำอธิบาย
3. กด "สร้าง"
4. เมื่อสร้างเสร็จแล้ว กดปุ่ม "📝 Script Editor"
5. เลือก Template หรือ เขียน script เอง
6. กด "บันทึก"

#### Method 2: Convert Existing Form
1. ไปที่ `/admin/forms`
2. เลือกแบบฟอร์มที่ต้องการ
3. กด "✏️ แก้ไข"
4. กดปุ่ม "📝 Script Editor"
5. ยืนยันการเปลี่ยนโหมด
6. เขียน script ใหม่

### Script Editor Features

#### Templates
ระบบมี template ให้เลือก 3 แบบ:
- **📝 แบบฟอร์มอย่างง่าย** - Simple form with basic fields
- **📑 แบบฟอร์มหลายหน้า** - Multi-step form with progress
- **✅ แบบฟอร์มพร้อม Validation** - Form with client-side validation

#### Editor
- Syntax highlighting (dark theme)
- Real-time editing
- Preview mode
- Save to database

### Form Types Comparison

| Feature | Schema-Based | Script-Based |
|---------|-------------|--------------|
| Creation Method | UI Builder | Text Editor |
| Flexibility | Medium | High |
| Custom Logic | Limited | Unlimited |
| Validation | Auto-generated | Custom |
| External API | ❌ | ✅ |
| Real-time Calc | ❌ | ✅ |
| Conditional Fields | ❌ | ✅ |
| Deployment | No build needed | No build needed |
| Edit | Easy | Requires coding |

### When to Use Each Type

#### Use Schema-Based When:
- Standard form requirements
- Admin needs to edit easily
- Quick deployment needed
- No custom logic required

#### Use Script-Based When:
- Complex form logic
- Real-time calculations
- External API integration
- Conditional field display
- High customization needed

## Script Templates

### Template 1: Simple Form

```jsx
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const SimpleForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await axios.post(`/api/forms/${uuid}/submit`, {
        responses: formData,
        respondent_name: formData.name,
        respondent_email: formData.email,
        respondent_phone: formData.phone
      })
      toast.success("ส่งแบบฟอร์มสำเร็จ")
      setFormData({ name: "", email: "", phone: "" })
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6">แบบฟอร์มลงทะเบียน</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg"
            >
              {loading ? "กำลังบันทึก..." : "ส่งแบบฟอร์ม"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SimpleForm
```

### Template 2: Multi-Step Form

```jsx
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    message: ""
  })

  const steps = [
    { title: "ข้อมูลส่วนตัว", icon: "👤" },
    { title: "ข้อมูลการทำงาน", icon: "💼" },
    { title: "ข้อความ", icon: "💡" }
  ]

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await axios.post(`/api/forms/${uuid}/submit`, {
        responses: formData,
        respondent_name: formData.name,
        respondent_email: formData.email
      })
      toast.success("ส่งแบบฟอร์มสำเร็จ")
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.icon}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">👤 ข้อมูลส่วนตัว</h2>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">💼 ข้อมูลการทำงาน</h2>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  หน่วยงาน
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">เลือกหน่วยงาน</option>
                  <option value="คณะครุศาสตร์">คณะครุศาสตร์</option>
                  <option value="คณะมนุษยศาสตร์">คณะมนุษยศาสตร์</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">💡 ข้อความ</h2>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  ข้อความเพิ่มเติม
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              ← ย้อนกลับ
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                ต่อไป →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {loading ? "กำลังบันทึก..." : "ส่งแบบฟอร์ม"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default MultiStepForm
```

### Template 3: Form with Validation

```jsx
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const FormWithValidation = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: ""
  })

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = "กรุณากรอกชื่อ"
    
    if (!formData.email.trim()) {
      newErrors.email = "กรุณากรอกอีเมล"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "กรุณากรอกเบอร์โทร"
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "เบอร์โทรต้องมี 10 หลัก"
    }
    
    if (formData.age && (formData.age < 18 || formData.age > 100)) {
      newErrors.age = "อายุต้องอยู่ระหว่าง 18-100"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) {
      toast.error("กรุณากรอกข้อมูลให้ถูกต้อง")
      return
    }
    
    setLoading(true)
    
    try {
      await axios.post(`/api/forms/${uuid}/submit`, {
        responses: formData,
        respondent_name: formData.name,
        respondent_email: formData.email,
        respondent_phone: formData.phone
      })
      toast.success("ส่งแบบฟอร์มสำเร็จ")
      setFormData({ name: "", email: "", phone: "", age: "" })
      setErrors({})
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6">แบบฟอร์มพร้อม Validation</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                ชื่อ-นามสกุล *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                อีเมล *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                เบอร์โทรศัพท์ *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0812345678"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg"
            >
              {loading ? "กำลังบันทึก..." : "ส่งแบบฟอร์ม"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormWithValidation
```

## API Reference

### Submit Form Data

```javascript
POST /api/forms/{uuid}/submit

Body:
{
  "responses": {
    "field_name": "value",
    ...
  },
  "respondent_name": "John Doe",
  "respondent_email": "john@example.com",
  "respondent_phone": "0812345678"
}
```

### Get Form Data

```javascript
GET /api/forms/{uuid}/fill

Response:
{
  "success": true,
  "data": {
    "uuid": "...",
    "title": "...",
    "description": "...",
    "form_type": "script|schema",
    "script_content": "...", // For script-based forms
    "schema": {...} // For schema-based forms
  }
}
```

## Best Practices

### 1. Script Structure
- Always export default React component
- Use `useState` for state management
- Use `axios` for API calls
- Use `toast` for notifications

### 2. Form Submission
```javascript
await axios.post(`/api/forms/${uuid}/submit`, {
  responses: formData,
  respondent_name: name,
  respondent_email: email,
  respondent_phone: phone
})
```

### 3. Validation
- Validate on client-side for UX
- Always validate on server-side for security
- Show clear error messages

### 4. Error Handling
```javascript
try {
  // API call
} catch (error) {
  toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด")
}
```

### 5. Loading States
```javascript
const [loading, setLoading] = useState(false)

// Before API call
setLoading(true)

// In finally block
setLoading(false)

// In button
<button disabled={loading}>
  {loading ? "กำลังบันทึก..." : "ส่งแบบฟอร์ม"}
</button>
```

## Troubleshooting

### Issue: Script not saving
**Solution**: Check that script has valid JSX syntax and exports a default component

### Issue: Form not rendering
**Solution**: Check browser console for errors, ensure script is valid React component

### Issue: Submit not working
**Solution**: Verify API endpoint and form UUID are correct

## Security Considerations

1. **Script Validation**: Scripts are stored as-is, validate before deployment
2. **XSS Prevention**: Sanitize user inputs
3. **CSRF Protection**: Laravel's built-in CSRF protection
4. **Authentication**: Admin endpoints require Sanctum authentication
5. **Input Validation**: Always validate on server-side

## Future Enhancements

Potential improvements:
- [ ] Code editor with syntax highlighting (Monaco Editor)
- [ ] Script versioning
- [ ] Script templates library
- [ ] Script validation/linting
- [ ] Preview in real-time
- [ ] Script testing sandbox
- [ ] Import/export scripts
- [ ] Script sharing between forms

## Support

For issues or questions:
1. Check this documentation
2. Review browser console for errors
3. Check Laravel logs: `storage/logs/laravel.log`
4. Verify API endpoint responses
