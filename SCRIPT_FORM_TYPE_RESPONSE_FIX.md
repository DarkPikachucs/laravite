# แก้ไข: Script-based Form แสดงเป็น Schema

## ปัญหา
- Form มี `form_type = 'script'` 
- แต่เมื่อเข้า `/forms/{uuid}` กลับ redirect ไป schema renderer
- หรือแสดง error "This is not a script-based form"

## สาเหตุ
**FormController.php - `fill()` method** ไม่ได้ส่ง `form_type` และ `script_content` กลับไป!

### Response เดิม
```json
{
  "success": true,
  "data": {
    "uuid": "...",
    "title": "...",
    "description": "...",
    "schema": {...},
    "settings": {...}
    // ❌ ไม่มี form_type
    // ❌ ไม่มี script_content
  }
}
```

### Response ใหม่
```json
{
  "success": true,
  "data": {
    "uuid": "...",
    "title": "...",
    "description": "...",
    "form_type": "script", // ✅ เพิ่มแล้ว
    "schema": {...},
    "script_content": "...", // ✅ เพิ่มแล้ว
    "settings": {...}
  }
}
```

## การแก้ไข

### FormController.php
**เดิม:**
```php
public function fill(string $uuid)
{
    // ...
    return response()->json([
        'success' => true,
        'data' => [
            'uuid' => $form->uuid,
            'title' => $form->title,
            'description' => $form->description,
            'schema' => $form->schema,
            'settings' => $form->settingsWithDefaults,
            // ❌ ขาด form_type และ script_content
        ],
    ]);
}
```

**ใหม่:**
```php
public function fill(string $uuid)
{
    // ...
    return response()->json([
        'success' => true,
        'data' => [
            'uuid' => $form->uuid,
            'title' => $form->title,
            'description' => $form->description,
            'form_type' => $form->form_type, // ✅ เพิ่มแล้ว
            'schema' => $form->schema,
            'script_content' => $form->script_content, // ✅ เพิ่มแล้ว
            'settings' => $form->settingsWithDefaults,
        ],
    ]);
}
```

## การทำงานหลังแก้ไข

### ScriptFormRunner.jsx
```javascript
const loadForm = async () => {
  const response = await axios.get(`/forms/${uuid}/fill`)
  const formData = response.data.data

  console.log('[ScriptFormRunner] form_type:', formData.form_type)
  // ✅ ตอนนี้จะมี form_type แล้ว

  if (formData.form_type === 'script') {
    // ✅ จะทำงานสำหรับ script-based form
    await loadScriptForm(formData)
  } else {
    // ✅ จะ redirect สำหรับ schema-based form
    window.location.href = `/forms-schema/${uuid}`
  }
}
```

## การทดสอบ

### 1. ตรวจสอบ API Response
```bash
# เข้า URL
curl http://localhost/api/forms/{uuid}/fill

# ควรเห็น response มี:
{
  "form_type": "script",
  "script_content": "..."
}
```

### 2. ตรวจสอบ Browser Console
```javascript
// เปิด Console (F12)
// จะเห็น log:
[ScriptFormRunner] Loaded form: {...}
[ScriptFormRunner] form_type: script
[ScriptFormRunner] script_content exists: true
[ScriptFormRunner] This is a script-based form, loading script...
```

### 3. ทดสอบกับ Script-based Form
```
1. เข้า /forms/{script-based-uuid}
2. ตรวจสอบ console log
3. ควรเห็นแบบฟอร์ม script
4. ไม่ redirect ไป schema
```

### 4. ทดสอบกับ Schema-based Form
```
1. เข้า /forms/{schema-based-uuid}
2. ตรวจสอบ console log
3. ควร redirect ไป /forms-schema/{uuid}
4. ควรเห็นแบบฟอร์ม schema
```

## ไฟล์ที่แก้ไข

1. ✅ `app/Http/Controllers/FormController.php`
   - เพิ่ม `form_type` ใน response
   - เพิ่ม `script_content` ใน response

2. ✅ `resources/js/components/Forms/ScriptFormRunner.jsx`
   - เพิ่ม logging เพื่อ debug
   - ตรวจสอบ form_type อย่างถูกต้อง

## Debugging Steps

### หากยังไม่ทำงาน:

#### 1. ตรวจสอบ Database
```sql
SELECT uuid, title, form_type, LENGTH(script_content) as script_len
FROM forms
WHERE uuid = 'your-uuid';
```

ควรเห็น:
- `form_type = 'script'`
- `script_content` ไม่ว่าง

#### 2. ตรวจสอบ API Response
```bash
curl http://localhost/api/forms/{uuid}/fill | json_pp
```

ควรเห็น `form_type` และ `script_content`

#### 3. ตรวจสอบ Browser Console
```
F12 → Console

ควรมี log:
[ScriptFormRunner] form_type: script
[ScriptFormRunner] script_content exists: true
```

#### 4. Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
```

## สรุป

### ก่อนแก้ไข
| Form Type | API Response | Frontend | ผลลัพธ์ |
|-----------|-------------|----------|---------|
| Script | ไม่มี form_type | ไม่รู้จัก type | ❌ Error |
| Schema | ไม่มี form_type | ไม่รู้จัก type | ❌ Error |

### หลังแก้ไข
| Form Type | API Response | Frontend | ผลลัพธ์ |
|-----------|-------------|----------|---------|
| Script | มี form_type + script_content | โหลด script | ✅ ทำงาน |
| Schema | มี form_type | Redirect | ✅ ทำงาน |

## หมายเหตุ

⚠️ **สำคัญ:**
- ต้อง rebuild frontend หลังแก้ไข
- ต้อง clear cache
- ต้องทดสอบทั้ง script และ schema forms

✅ **ผลลัพธ์:**
- Script-based forms แสดงผลถูกต้อง
- Schema-based forms redirect ถูกต้อง
- ไม่เห็น error "This is not a script-based form" อีกต่อไป

## ขั้นตอนถัดไป

1. ✅ Run migration (ถ้ายังไม่ได้)
   ```bash
   php artisan migrate
   ```

2. ✅ Clear cache
   ```bash
   php artisan cache:clear
   ```

3. ✅ Rebuild frontend
   ```bash
   npm run build
   ```

4. ✅ ทดสอบ
   - Script-based form
   - Schema-based form

5. ✅ ตรวจสอบ console logs
   - form_type ถูกต้อง
   - script_content มีค่า
