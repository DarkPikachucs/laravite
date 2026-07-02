# แก้ไขปัญหา 403 Forbidden ใน Script Editor

## สาเหตุ
403 Forbidden เกิดจาก:
1. **CSRF Token ไม่ถูกต้อง** - Laravel ต้องการ CSRF token
2. **Sanctum Token หมดอายุ** - Token ใน localStorage หมดอายุ
3. **Authentication Header ไม่ถูกต้อง** - ไม่ได้ส่ง Bearer token

## การแก้ไขที่ทำแล้ว

### 1. เพิ่ม CSRF Token Handling
```javascript
// Setup CSRF token on mount
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
if (csrfToken) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}
```

### 2. เพิ่ม Token Validation
```javascript
const token = localStorage.getItem('currentToken')
if (!token) {
  toast.error("ไม่พบข้อมูลการเข้าสู่ระบบ กรุณาล็อกอินใหม่")
  setTimeout(() => window.location.href = '/login', 2000)
  return
}
```

### 3. เพิ่ม Error Handling สำหรับ 403/401
```javascript
if (error.response?.status === 403) {
  errorMessage = "ไม่ได้รับอนุญาต - กรุณาล็อกอินใหม่"
  localStorage.removeItem('currentToken')
  localStorage.removeItem('user')
  setTimeout(() => window.location.href = '/login', 2000)
}
```

## วิธีทดสอบ

### ขั้นตอนที่ 1: ตรวจสอบ CSRF Token
เปิด Browser Console (F12) แล้วพิมพ์:
```javascript
document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
```
ควรมีค่า (ไม่ undefined)

### ขั้นตอนที่ 2: ตรวจสอบ Auth Token
```javascript
localStorage.getItem('currentToken')
```
ควรมีค่า token

### ขั้นตอนที่ 3: ตรวจสอบ Network Request
1. เปิด Network Tab (F12 → Network)
2. กดบันทึกใน Script Editor
3. ดู request PUT `/api/forms/{uuid}`
4. ตรวจสอบ Headers:
   ```
   Authorization: Bearer {your-token}
   X-CSRF-TOKEN: {csrf-token}
   ```

### ขั้นตอนที่ 4: ตรวจสอบ Response
หากยังได้ 403:
```json
{
  "message": "Unauthenticated."
  // หรือ
  "message": "CSRF token mismatch."
}
```

## การแก้ไขปัญหา

### ปัญหา: Token หมดอายุ
**วิธีแก้:**
```bash
# Logout แล้ว login ใหม่
# หรือ clear localStorage
localStorage.clear()
# แล้ว login ใหม่
```

### ปัญหา: CSRF Token Mismatch
**วิธีแก้:**
1. Refresh หน้า (F5)
2. ลองบันทึกใหม่

### ปัญหา: Sanctum Configuration
**ตรวจสอบ:** `config/sanctum.php`
```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', '')),
```

**ตรวจสอบ:** `.env`
```env
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1,localhost:3000,localhost:5173
SESSION_DOMAIN=localhost
```

### ปัญหา: API Route ไม่ถูกต้อง
**ตรวจสอบ:** `routes/api.php`
```php
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/forms/{uuid}', [FormController::class, 'update']);
    // ...
});
```

## Debugging Steps

### 1. Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

### 2. Rebuild Frontend
```bash
npm run build
```

### 3. Check Laravel Logs
```bash
tail -f storage/logs/laravel.log
```

### 4. Test Auth Endpoint
```bash
curl -X GET http://localhost/api/test-auth \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Console Logs ที่ควรมี

เมื่อเปิดหน้า Script Editor:
```
[ScriptEditor] Token set: true
[ScriptEditor] CSRF Token: {csrf-token}
```

เมื่อกดบันทึก:
```
[ScriptEditor] Saving form info: {...}
[ScriptEditor] Form info saved: {success: true}
```

## ทางเลือกอื่น

หากปัญหายังไม่หาย ใช้วิธีนี้:

### วิธีที่ 1: ใช้ useAuth Hook
```javascript
import { useAuth } from "../../hooks/useAuth"

const { token } = useAuth()
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
```

### วิธีที่ 2: สร้าง Axios Instance
```javascript
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Add interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('currentToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken
  }
  return config
})
```

## สรุป

1. ✅ เพิ่ม CSRF token handling
2. ✅ เพิ่ม token validation
3. ✅ เพิ่ม error handling สำหรับ 403/401
4. ✅ เพิ่ม logging สำหรับ debugging

หากยังมีปัญหา:
1. ตรวจสอบ browser console
2. ตรวจสอบ network tab
3. ตรวจสอบ Laravel logs
4. ลอง logout แล้ว login ใหม่
