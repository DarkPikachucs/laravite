# คู่มือระบบสิทธิ์การสร้างฟอร์ม

## ภาพรวม

ระบบมีการแบ่งสิทธิ์การสร้างและจัดการฟอร์มตามประเภทของผู้ใช้:

### ผู้ใช้ภายใน (@pcru.ac.th)
- ✅ **สร้างฟอร์มใหม่ได้**
- ✅ **แก้ไขฟอร์มที่สร้างได้**
- ✅ **ลบฟอร์มที่สร้างได้**
- ✅ **ทำสำเนาฟอร์มได้**
- ✅ **เผยแพร่ฟอร์มได้**
- ✅ **แก้ไขสคริปต์ฟอร์มได้**
- ✅ **ดูผลการตอบฟอร์มที่สร้างได้**
- ✅ **ให้สิทธิ์ผู้อื่นดูผลการตอบได้**
- ✅ **อนุมัติ/ปฏิเสธ คำขอเข้าถึงข้อมูล**

### ผู้ใช้ภายนอก (อีเมลอื่นๆ)
- ❌ **สร้างฟอร์มไม่ได้**
- ❌ **แก้ไขฟอร์มไม่ได้**
- ❌ **ลบฟอร์มไม่ได้**
- ❌ **ทำสำเนาฟอร์มไม่ได้**
- ❌ **เผยแพร่ฟอร์มไม่ได้**
- ❌ **แก้ไขสคริปต์ฟอร์มไม่ได้**
- ✅ **ขอสิทธิ์ดูผลการตอบฟอร์มได้**
- ✅ **ดูผลการตอบฟอร์มที่ได้รับสิทธิ์แล้วได้**

## การตรวจสอบสิทธิ์ใน Backend

### 1. สร้างฟอร์ม (POST /api/forms)

```php
// FormController::store()
public function store(Request $request)
{
    $user = $request->user();
    
    // Check if user is internal (can create forms)
    if (!$user || !$user->isInternal()) {
        return response()->json([
            'success' => false,
            'message' => 'เฉพาะผู้ใช้ภายใน (@pcru.ac.th) เท่านั้นที่สามารถสร้างแบบฟอร์มได้',
        ], 403);
    }
    
    // ... create form logic
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "เฉพาะผู้ใช้ภายใน (@pcru.ac.th) เท่านั้นที่สามารถสร้างแบบฟอร์มได้"
}
```

### 2. แก้ไขฟอร์ม (PUT/POST /api/forms/{uuid})

```php
// FormController::update()
public function update(Request $request, string $uuid)
{
    $form = Form::findByUuid($uuid);
    
    // Check if user is the creator
    $user = $request->user();
    if (!$user || $form->created_by !== $user->id) {
        return response()->json([
            'success' => false,
            'message' => 'คุณไม่มีสิทธิ์แก้ไขแบบฟอร์มนี้',
        ], 403);
    }
    
    // ... update form logic
}
```

### 3. ลบฟอร์ม (DELETE /api/forms/{uuid})

```php
// FormController::destroy()
public function destroy(string $uuid)
{
    $form = Form::findByUuid($uuid);
    
    // Check if user is the creator
    $user = auth()->user();
    if (!$user || $form->created_by !== $user->id) {
        return response()->json([
            'success' => false,
            'message' => 'คุณไม่มีสิทธิ์ลบแบบฟอร์มนี้',
        ], 403);
    }
    
    // ... delete form logic
}
```

### 4. ทำสำเนาฟอร์ม (POST /api/forms/{uuid}/duplicate)

```php
// FormController::duplicate()
public function duplicate(string $uuid)
{
    $form = Form::findByUuid($uuid);
    
    // Check if user is the creator
    $user = auth()->user();
    if (!$user || $form->created_by !== $user->id) {
        return response()->json([
            'success' => false,
            'message' => 'คุณไม่มีสิทธิ์ทำสำเนาแบบฟอร์มนี้',
        ], 403);
    }
    
    // ... duplicate form logic
}
```

### 5. เผยแพร่ฟอร์ม (POST /api/forms/{uuid}/publish)

```php
// FormController::publish()
public function publish(string $uuid, Request $request)
{
    $form = Form::findByUuid($uuid);
    
    // Check if user is the creator
    $user = auth()->user();
    if (!$user || $form->created_by !== $user->id) {
        return response()->json([
            'success' => false,
            'message' => 'คุณไม่มีสิทธิ์เผยแพร่แบบฟอร์มนี้',
        ], 403);
    }
    
    // ... publish form logic
}
```

### 6. แก้ไขสคริปต์ฟอร์ม (POST /api/forms/{uuid}/script)

```php
// FormController::updateScript()
public function updateScript(string $uuid, Request $request)
{
    $form = Form::findByUuid($uuid);
    
    // Check if user is the creator
    $user = auth()->user();
    if (!$user || $form->created_by !== $user->id) {
        return response()->json([
            'success' => false,
            'message' => 'คุณไม่มีสิทธิ์แก้ไขสคริปต์แบบฟอร์มนี้',
        ], 403);
    }
    
    // ... update script logic
}
```

## User Model Methods

### ตรวจสอบว่าเป็นผู้ใช้ภายในหรือไม่
```php
$user->isInternal(); // true/false
```

### ตรวจสอบว่าเป็นผู้ใช้ภายนอกหรือไม่
```php
$user->isExternal(); // true/false
```

### ตรวจสอบสิทธิ์การสร้างฟอร์ม
```php
$user->canCreateForms(); // true/false
```

### ตรวจสอบสิทธิ์ดูผลการตอบฟอร์ม
```php
$user->canViewFormSubmissions($formId); // true/false
```

### ตรวจสอบสิทธิ์เข้าถึงฟอร์ม
```php
$user->hasFormAccess($formId); // true/false
```

## การใช้งานใน Frontend

### ตรวจสอบสิทธิ์ก่อนแสดงปุ่ม "สร้างฟอร์ม"

```javascript
// ใน Component ที่แสดงปุ่มสร้างฟอร์ม
const { user } = useAuth();
const isInternal = localStorage.getItem('isInternal') === 'true';

{isInternal && (
  <button onClick={handleCreateForm}>
    + สร้างฟอร์มใหม่
  </button>
)}

{!isInternal && (
  <div className="text-yellow-600 text-sm">
    ⚠️ เฉพาะผู้ใช้ภายใน (@pcru.ac.th) เท่านั้นที่สามารถสร้างฟอร์มได้
  </div>
)}
```

### แสดงข้อความ Error เมื่อไม่มีสิทธิ์

```javascript
try {
  await axios.post('/api/forms', formData);
} catch (error) {
  if (error.response?.status === 403) {
    toast.error(error.response.data.message);
    // Redirect หรือซ่อนปุ่มสร้างฟอร์ม
  }
}
```

## API Response Codes

| Status Code | ความหมาย |
|------------|----------|
| 200 | สำเร็จ |
| 201 | สร้างสำเร็จ |
| 403 | ไม่มีสิทธิ์ (Forbidden) |
| 404 | ไม่พบฟอร์ม |
| 422 | ข้อมูลไม่ถูกต้อง (Validation Error) |

## ตัวอย่างการทดสอบ

### ทดสอบผู้ใช้ภายใน
```bash
# Login ด้วย @pcru.ac.th
curl -X POST /api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@pcru.ac.th","password":"password"}'

# สร้างฟอร์ม
curl -X POST /api/forms \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Form","schema":{...}}'

# Expected: 201 Created
```

### ทดสอบผู้ใช้ภายนอก
```bash
# Login ด้วย @gmail.com
curl -X POST /api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@gmail.com","password":"password"}'

# พยายามสร้างฟอร์ม
curl -X POST /api/forms \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Form","schema":{...}}'

# Expected: 403 Forbidden
# Response: {"success":false,"message":"เฉพาะผู้ใช้ภายใน (@pcru.ac.th) เท่านั้นที่สามารถสร้างแบบฟอร์มได้"}
```

## การแก้ไขปัญหายอดนิยม

### ปัญหา: ผู้ใช้ภายนอกสามารถสร้างฟอร์มได้
**สาเหตุ:** ไม่ได้ตรวจสอบ `isInternal()` ใน `store()` method

**แก้ไข:** เพิ่มการตรวจสอบใน `FormController::store()`
```php
if (!$user || !$user->isInternal()) {
    return response()->json([...], 403);
}
```

### ปัญหา: ผู้ใช้ภายนอกไม่สามารถขอสิทธิ์ดูข้อมูลได้
**สาเหตุ:** ตรวจสอบสิทธิ์เข้มเกินไปใน `FormAccessController`

**แก้ไข:** อนุญาตให้ external users ขอสิทธิ์ได้
```php
// อนุญาตให้ทุกคนที่ล็อกอินแล้วขอสิทธิ์ได้
public function requestAccess(Request $request, $formId)
{
    $user = $request->user();
    // ไม่ต้องตรวจสอบ isInternal()
    // ... request logic
}
```

### ปัญหา: ผู้ใช้ภายในไม่สามารถแก้ไขฟอร์มของตัวเองได้
**สาเหตุ:** ตรวจสอบ `created_by` ไม่ถูกต้อง

**แก้ไข:** ตรวจสอบว่า user เป็น creator
```php
if ($form->created_by !== $user->id) {
    return response()->json([...], 403);
}
```

## หมายเหตุ

- ✅ **ผู้ใช้ภายใน** สามารถสร้างฟอร์มได้ไม่จำกัด
- ✅ **ผู้ใช้ภายนอก** สามารถขอสิทธิ์ดูฟอร์มของผู้อื่นได้
- ✅ **เจ้าของฟอร์ม** เท่านั้นที่สามารถแก้ไข/ลบ/เผยแพร่ฟอร์มได้
- ❌ **ผู้ใช้ภายนอก** ไม่สามารถสร้างฟอร์มได้ (โดย design)

---

**เวอร์ชัน:** 1.0  
**วันที่:** 25 มีนาคม 2569  
**ผู้เขียน:** AI Assistant
