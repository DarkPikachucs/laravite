# Template Field Fix - ไม่บันทึกข้อมูล template

## ปัญหา
เลือก template แล้วกดบันทึก แต่ข้อมูล template ไม่ถูกบันทึกเข้า database

## สาเหตุ
FormController ไม่ได้รองรับฟิลด์ `template` ใน:
1. Validation rules
2. การสร้าง form (store method)
3. การอัปเดต form (update method)
4. การ return data (fill method)

## การแก้ไข

### 1. Database Migration
สร้าง migration เพื่อเพิ่มคอลัมน์ `template`:

**File:** `database/migrations/2026_03_24_030915_add_template_to_forms_table.php`

```php
public function up(): void
{
    Schema::table('forms', function (Blueprint $table) {
        $table->string('template')->default('default')->after('form_type');
    });
}

public function down(): void
{
    Schema::table('forms', function (Blueprint $table) {
        $table->dropColumn('template');
    });
}
```

Run migration:
```bash
php artisan migrate
```

### 2. FormController - store() method
เพิ่ม `template` ใน validation และ create:

```php
$validator = Validator::make($request->all(), [
    'title' => 'required|string|max:255',
    'description' => 'nullable|string',
    'form_type' => 'nullable|in:schema,script',
    'template' => 'nullable|in:default,survey', // เพิ่ม validation
    // ...
]);

$form = Form::create([
    'uuid' => Str::uuid()->toString(),
    'title' => $request->title,
    'description' => $request->description,
    'form_type' => $formType,
    'template' => $request->template ?? 'default', // เพิ่ม template
    // ...
]);
```

### 3. FormController - update() method
เพิ่ม `template` ใน validation และ update:

```php
$validator = Validator::make($request->all(), [
    'title' => 'sometimes|required|string|max:255',
    'description' => 'nullable|string',
    'form_type' => 'nullable|in:schema,script',
    'template' => 'nullable|in:default,survey', // เพิ่ม validation
    // ...
]);

// Handle template
if ($request->has('template')) {
    $updateData['template'] = $request->template;
}
```

### 4. FormController - fill() method
เพิ่ม `template` ใน response:

```php
return response()->json([
    'success' => true,
    'data' => [
        'uuid' => $form->uuid,
        'title' => $form->title,
        'description' => $form->description,
        'form_type' => $form->form_type,
        'template' => $form->template, // เพิ่ม template
        'schema' => $form->schema,
        'script_content' => $form->script_content,
        'settings' => $form->settingsWithDefaults,
    ],
]);
```

### 5. Form Model
ตรวจสอบว่า `$fillable` มี `template`:

```php
protected $fillable = [
    'uuid',
    'title',
    'description',
    'form_type',
    'template', // ต้องมี
    'schema',
    'script_content',
    'settings',
    'is_active',
    'published_at',
    'expires_at',
    'created_by',
];
```

## การทดสอบ

### 1. ทดสอบผ่าน API
```bash
# Create form with template
POST /forms
{
  "title": "Test Form",
  "description": "Test Description",
  "form_type": "schema",
  "template": "survey",
  "schema": "{\"fields\":[]}",
  "is_active": false
}

# Response ควรมี template
{
  "success": true,
  "data": {
    "uuid": "...",
    "title": "Test Form",
    "form_type": "schema",
    "template": "survey",
    ...
  }
}
```

### 2. ทดสอบผ่าน UI
1. ไปที่ `/admin/forms/new`
2. เลือก "📋 Schema Builder"
3. เลือก Template: "Survey (แบบสอบถาม)"
4. กรอกชื่อแบบฟอร์ม
5. กดบันทึก
6. ตรวจสอบใน database ว่า `template = 'survey'`

### 3. ตรวจสอบใน Database
```sql
SELECT id, uuid, title, form_type, template 
FROM forms 
ORDER BY created_at DESC 
LIMIT 1;
```

## ไฟล์ที่แก้ไข

1. `database/migrations/2026_03_24_030915_add_template_to_forms_table.php` (ใหม่)
2. `app/Http/Controllers/FormController.php`
   - `store()` method
   - `update()` method
   - `fill()` method
3. `app/Models/Form.php` (ตรวจสอบ `$fillable`)

## สรุป
หลังจากแก้ไขแล้ว:
- ✅ Validation รองรับ `template` field
- ✅ `store()` method บันทึก `template`
- ✅ `update()` method อัปเดต `template`
- ✅ `fill()` method return `template`
- ✅ Database มีคอลัมน์ `template`
- ✅ Frontend เลือก template และบันทึกได้
