# แก้ไข: ไม่สามารถโหลดแบบฟอร์มได้ (api.js Issue)

## ปัญหา
เมื่อเข้า `/forms/{uuid}` จะเห็น error:
```
⚠️ เกิดข้อผิดพลาด
ไม่สามารถโหลดแบบฟอร์มได้
```

## สาเหตุ
**api.js** ใช้ **token-based authentication** แต่ระบบใช้ **cookie-based authentication**

### api.js - ปัญหา
```javascript
// Request interceptor
api.interceptors.request.use(
  (config) => {
    // ❌ ใช้ token ที่ไม่มีในระบบ
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  ...
)
```

### ระบบจริง
- ใช้ **cookie-based auth** (Sanctum session)
- ใช้ **CSRF token** จาก meta tag
- ไม่ได้ใช้ Bearer token

## การแก้ไข

### ใช้ axios โดยตรงแทน api.js
**ScriptFormRunner.jsx** ไม่ได้ใช้ api.js แต่ใช้ axios โดยตรง:

```javascript
import axios from "axios"  // ✅ ใช้ axios โดยตรง
// ไม่ใช้: import api from '../services/api'
```

### เพิ่มการตั้งค่า Cookie-based Auth
```javascript
const loadForm = async () => {
  try {
    // Setup axios for cookie-based auth
    axios.defaults.withCredentials = true
    axios.defaults.withXSRFToken = true
    
    // Get CSRF token from meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content
    if (csrfToken) {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    }

    // เรียก API
    const response = await axios.get(`/forms/${uuid}/fill`)
    const formData = response.data.data
    
    // ใช้งาน formData
  } catch (err) {
    // Handle error
  }
}
```

## การทำงาน

### เดิม (ใช้ api.js)
```
ScriptFormRunner → api.js → axios
    ↓
localStorage.getItem('token')  // ❌ ไม่มี token
    ↓
Request without proper auth
    ↓
401/403 Error
```

### ใหม่ (ใช้ axios โดยตรง)
```
ScriptFormRunner → axios
    ↓
Setup: withCredentials, withXSRFToken
    ↓
Get CSRF token from meta tag
    ↓
Request with cookie auth
    ↓
Success ✅
```

## การทดสอบ

### 1. ตรวจสอบ CSRF Token
```bash
# ใน browser console
document.querySelector('meta[name="csrf-token"]').content
```

ควรเห็น CSRF token value

### 2. ตรวจสอบ Cookies
```bash
# ใน browser console
document.cookie
```

ควรเห็น `XSRF-TOKEN=...`

### 3. ทดสอบ API
```bash
# เข้า URL
curl http://localhost/api/forms/{uuid}/fill \
  -H "Cookie: XSRF-TOKEN=..." \
  -H "X-XSRF-TOKEN: ..."
```

### 4. ทดสอบใน Browser
```
1. เข้า /forms/{script-based-uuid}
2. เปิด Console (F12)
3. ดู log:
   [ScriptFormRunner] Loading form: {uuid}
   [ScriptFormRunner] Loaded form: {...}
   [ScriptFormRunner] form_type: script
4. ควรเห็นแบบฟอร์ม
```

## Debugging Steps

### หากยังมี error:

#### 1. ตรวจสอบ CSRF Token
```javascript
// ใน console
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content
console.log('CSRF Token:', csrfToken)
```

#### 2. ตรวจสอบ API Response
```javascript
// เพิ่ม logging
const response = await axios.get(`/forms/${uuid}/fill`)
console.log('Response:', response.data)
```

#### 3. ตรวจสอบ Network Tab
```
F12 → Network → /forms/{uuid}/fill

Request Headers:
- X-CSRF-TOKEN: {token}
- X-XSRF-TOKEN: {token}
- Cookie: {cookies}

Response:
- Status: 200 OK
- Data: {form data}
```

#### 4. Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
```

#### 5. Rebuild Frontend
```bash
npm run build
```

## สรุป

### ไฟล์ที่แก้ไข
- ✅ `resources/js/components/Forms/ScriptFormRunner.jsx`
  - ใช้ axios โดยตรงแทน api.js
  - เพิ่ม cookie-based auth setup
  - เพิ่ม CSRF token handling

### ไม่แก้ไข
- ❌ `resources/js/services/api.js` (ยังใช้ token-based อยู่)

### การตั้งค่า Axios
```javascript
// Cookie-based auth
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

// CSRF token
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content
if (csrfToken) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}
```

### Logging
```javascript
console.log('[ScriptFormRunner] Loading form:', uuid)
console.log('[ScriptFormRunner] Loaded form:', formData)
console.log('[ScriptFormRunner] form_type:', formData.form_type)
```

## หมายเหตุ

⚠️ **api.js ยังไม่แก้ไข:**
- api.js ยังใช้ token-based auth
- หากต้องการใช้ api.js ต้องแก้ไขให้ใช้ cookie-based
- แต่ตอนนี้ ScriptFormRunner ใช้ axios โดยตรงแล้ว

✅ **ผลลัพธ์:**
- ScriptFormRunner ใช้ cookie-based auth
- ไม่ต้องพึ่ง api.js
- ไม่ต้องพึ่ง localStorage token
- ใช้ CSRF token จาก meta tag

## ขั้นตอนถัดไป

1. ✅ Rebuild frontend
   ```bash
   npm run build
   ```

2. ✅ Clear cache
   ```bash
   php artisan cache:clear
   ```

3. ✅ ทดสอบใน browser
   - เข้า /forms/{script-based-uuid}
   - เปิด console
   - ดู log messages
   - ควรเห็นแบบฟอร์ม

4. ✅ หากยังมี error
   - ตรวจสอบ CSRF token
   - ตรวจสอบ cookies
   - ดู network tab
   - อ่าน error message
