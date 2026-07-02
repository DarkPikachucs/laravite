# สรุปการแก้ไขปัญหา PUT Method ใน Form Builder

## ปัญหา
- **POST ทำงานได้** แต่ **PUT ไม่ได้** (403 Forbidden)
- เกิดจาก CSRF token และ browser ไม่รองรับ PUT โดยตรง

## การแก้ไขที่ทำ

### 1. ScriptEditor.jsx
✅ แก้ไขแล้ว - ใช้ POST + `_method: 'PUT'`

### 2. FormBuilder.jsx
✅ แก้ไขแล้ว - ใช้ POST + `_method: 'PUT'`

### 3. api.php
✅ แก้ไขแล้ว - เพิ่ม `Route::match(['put', 'post'])`

## สรุปการเปลี่ยนแปลง

### ScriptEditor.jsx
```javascript
// เดิม - ใช้ PUT
await axios.put(`/forms/${uuid}`, {
  title: title,
  ...
})

// ใหม่ - ใช้ POST + method spoofing
await axios.post(`/forms/${uuid}`, {
  _method: 'PUT',
  title: title,
  ...
})
```

### FormBuilder.jsx
```javascript
// เดิม - ใช้ PUT
const response = await axios.put(`/forms/${uuid}`, payload)

// ใหม่ - ใช้ POST + method spoofing
const response = await axios.post(`/forms/${uuid}`, {
  _method: 'PUT',
  ...payload
})
```

### api.php
```php
// เดิม
Route::put('/forms/{uuid}', [FormController::class, 'update']);

// ใหม่
Route::match(['put', 'post'], '/forms/{uuid}', [FormController::class, 'update']);
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
1. เปิดหน้า `/admin/forms/new`
2. สร้างแบบฟอร์มใหม่
3. บันทึก - ควรทำงานได้
4. แก้ไขแบบฟอร์ม
5. บันทึกอีกครั้ง - ควรทำงานได้

### 4. ตรวจสอบ Network Tab
```
Request Method: POST
Request URL: /forms/{uuid}
Request Payload: {
  _method: "PUT",
  title: "...",
  ...
}

Response: 200 OK
```

## ไฟล์ที่แก้ไข

1. ✅ `resources/js/pages/admin/ScriptEditor.jsx`
2. ✅ `resources/js/pages/admin/FormBuilder.jsx`
3. ✅ `routes/api.php`

## การทำงานของ Method Spoofing

```
Browser → POST /forms/{uuid}
          { _method: "PUT", ... }
              ↓
Laravel → เห็น _method = "PUT"
          ↓
Route → จับคู่ Route::match(['put', 'post'])
          ↓
Controller → FormController@update()
             (รับ Request เหมือนเป็น PUT)
```

## ข้อดีของวิธีนี้

1. ✅ **ไม่ต้องใช้ Bearer Token** - ใช้ cookie-based auth
2. ✅ **ทำงานกับ Browser ทุกตัว** - ไม่ต้องกังวลเรื่อง PUT support
3. ✅ **CSRF Token ทำงานได้** - Laravel จัดการอัตโนมัติ
4. ✅ **Code เดิมไม่ต้องแก้เยอะ** - แค่เปลี่ยนจาก PUT เป็น POST

## หมายเหตุ

### ห้ามใช้
```javascript
// ❌ หลีกเลี่ยง
axios.put('/forms/{uuid}', data)
```

### ใช้แทน
```javascript
// ✅ แนะนำ
axios.post('/forms/{uuid}', {
  _method: 'PUT',
  ...data
})
```

## การ Debug

### ใน Controller
```php
public function update(Request $request, $uuid)
{
    // ตรวจสอบ method
    dd($request->method()); // ควรเป็น "PUT"
    
    // ตรวจสอบ data
    dd($request->all()); // ควรมี data ที่ส่งมา
}
```

### ใน Browser Console
```javascript
// ตรวจสอบ CSRF token
document.querySelector('meta[name="csrf-token"]').content

// ตรวจสอบ cookies
document.cookie
```

## สรุป

| หน้า | สถานะ | วิธีแก้ |
|------|-------|---------|
| Script Editor | ✅ แก้แล้ว | POST + `_method: 'PUT'` |
| Form Builder | ✅ แก้แล้ว | POST + `_method: 'PUT'` |
| API Routes | ✅ แก้แล้ว | `Route::match(['put', 'post'])` |

## ขั้นตอนถัดไป

1. ✅ Run `npm run build`
2. ✅ Refresh browser (Ctrl+F5)
3. ✅ ทดสอบสร้างและแก้ไขแบบฟอร์ม
4. ✅ ทดสอบทั้ง Script Editor และ Form Builder

## หากยังมีปัญหา

1. **Logout แล้ว Login ใหม่**
2. **Clear browser cookies**
3. **ตรวจสอบ console errors**
4. **ดู network tab** (F12)

## Files Reference

- ScriptEditor: `resources/js/pages/admin/ScriptEditor.jsx`
- FormBuilder: `resources/js/pages/admin/FormBuilder.jsx`
- Routes: `routes/api.php`
- Controller: `app/Http/Controllers/FormController.php`
