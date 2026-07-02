# แก้ปัญหา: POST ได้ แต่ PUT ไม่ได้

## สาเหตุ

### 1. Laravel PUT/PATCH Method Issue
Laravel ไม่รองรับ PUT/PATCH โดยตรงผ่าน browser บางครั้ง ต้องใช้ **Method Spoofing**

### 2. CSRF Token Mismatch
PUT/PATCH ต้องการ CSRF token ที่ถูกต้อง

### 3. Route Order
Routes ที่กำหนดอาจไม่รองรับ POST method สำหรับ update

## การแก้ไขที่ทำแล้ว

### 1. ใช้ Method Spoofing
เปลี่ยนจาก:
```javascript
await axios.put(`/forms/${uuid}`, data)
```

เป็น:
```javascript
await axios.post(`/forms/${uuid}`, {
  _method: 'PUT',
  ...data
})
```

### 2. เพิ่ม Route Support
เปลี่ยนจาก:
```php
Route::put('/forms/{uuid}', [FormController::class, 'update']);
```

เป็น:
```php
Route::match(['put', 'post'], '/forms/{uuid}', [FormController::class, 'update']);
```

### 3. Laravel จะจัดการ _method อัตโนมัติ
เมื่อส่ง `_method: 'PUT'` ใน POST request
Laravel จะ treat เป็น PUT request โดยอัตโนมัติ

## วิธีใช้งาน

### ใน ScriptEditor:
```javascript
// ✅ ถูกต้อง - ใช้ POST + _method
await axios.post(`/forms/${uuid}`, {
  _method: 'PUT',
  title: title,
  description: description,
  is_active: isActive
})

// ❌ หลีกเลี่ยง - ใช้ PUT โดยตรง
await axios.put(`/forms/${uuid}`, {...})
```

## การทดสอบ

### 1. Clear Cache
```bash
php artisan cache:clear
php artisan route:clear
php artisan config:clear
```

### 2. Rebuild Frontend
```bash
npm run build
```

### 3. ทดสอบใน Browser
1. เปิด Network Tab (F12)
2. กดบันทึกใน Script Editor
3. ดู request:
   - Method: **POST**
   - Payload: มี `_method: "PUT"`
   - Status: **200 OK**

## ทำไมต้องใช้ Method Spoofing?

### ปัญหาของ PUT/PATCH:
1. **Browser Support** - บาง browser ไม่รองรับ
2. **CSRF Protection** - Laravel ต้องการ CSRF token สำหรับ PUT/PATCH
3. **Form Encoding** - HTML forms ไม่รองรับ method="PUT"

### วิธีแก้ของ Laravel:
```html
<!-- HTML Form -->
<form method="POST">
  <input type="hidden" name="_method" value="PUT">
</form>
```

```javascript
// Axios
axios.post('/api/resource', {
  _method: 'PUT',
  data: {...}
})
```

## ทางเลือกอื่น

### วิธีที่ 1: ใช้ PATCH แทน PUT
```javascript
await axios.patch(`/forms/${uuid}`, data)
```

### วิธีที่ 2: ใช้ Resource Controller
```php
Route::apiResource('forms', FormController::class);
// จะสร้าง routes ทั้งหมดอัตโนมัติ
```

### วิธีที่ 3: ใช้ Sanctum Token Auth
```javascript
const token = localStorage.getItem('token')
axios.put(`/forms/${uuid}`, data, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  }
})
```

## สรุป

| Method | ใช้เมื่อ | หมายเหตุ |
|--------|---------|----------|
| POST + `_method` | Cookie-based auth | ✅ แนะนำ |
| PUT | Token-based auth | ต้องมี Bearer token |
| PATCH | Token-based auth | เหมือน PUT |
| POST | Create only | สำหรับสร้างใหม่ |

## การ Debug

### ตรวจสอบ Route:
```bash
php artisan route:list | grep forms
```

### ตรวจสอบ Request:
```javascript
// ใน Controller
public function update(Request $request, $uuid) {
  dd($request->all()); // ดูว่ามี _method หรือไม่
  dd($request->method()); // ควรเป็น PUT
}
```

### ตรวจสอบ Response:
```javascript
try {
  const resp = await axios.post(...)
  console.log(resp.data)
} catch (error) {
  console.error(error.response.data)
  console.error(error.response.status)
}
```

## ตัวอย่างที่ถูกต้อง

### ScriptEditor.jsx:
```javascript
const handleSaveFormInfo = async () => {
  try {
    const response = await axios.post(`/forms/${uuid}`, {
      _method: 'PUT',
      title: title,
      description: description,
      is_active: isActive
    })
    toast.success("บันทึกสำเร็จ")
  } catch (error) {
    toast.error(error.response?.data?.message)
  }
}
```

### api.php:
```php
Route::match(['put', 'post'], '/forms/{uuid}', [FormController::class, 'update']);
```

## หมายเหตุสำคัญ

⚠️ **ห้ามใช้ PUT โดยตรง** เมื่อใช้ cookie-based authentication!

✅ **ใช้ POST + `_method: 'PUT'`** แทน

## การแก้ปัญหาเพิ่มเติม

หากยังมีปัญหา:

1. **ตรวจสอบ CSRF Token:**
   ```javascript
   console.log(document.querySelector('meta[name="csrf-token"]').content)
   ```

2. **ตรวจสอบ Session:**
   ```php
   // ใน Controller
   dd(session()->all());
   ```

3. **ลอง Logout แล้ว Login ใหม่**

4. **Clear Browser Cookies**
