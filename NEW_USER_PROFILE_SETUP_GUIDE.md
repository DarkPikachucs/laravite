# คู่มือระบบ New User Profile Setup

## ภาพรวม

หลังจากผู้ใช้ล็อกอินด้วย Google เป็นครั้งแรก ระบบจะตรวจสอบว่าเป็นผู้ใช้ใหม่หรือไม่ ถ้าใช่ จะ redirect ไปหน้า Profile Setup เพื่อให้กรอกข้อมูลเพิ่มเติมก่อนเริ่มใช้งาน

## Flow การทำงาน

### 1. ผู้ใช้ล็อกอินด้วย Google
```
คลิก "Sign in with Google"
         │
         ▼
┌─────────────────┐
│ Google OAuth   │
│ เลือก Account  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Callback Handler│
└─────────────────┘
```

### 2. ตรวจสอบผู้ใช้ใหม่
```php
// ใน GoogleAuthController
$existingUser = User::where('email', $email)->first();
$isNewUser = !$existingUser;

if ($isNewUser) {
    return redirect("/profile/setup?google_token={$token}&user_id={$user->id}");
} else {
    return redirect("/");
}
```

### 3. หน้า Profile Setup
```
/profile/setup
├── แสดง Badge ประเภทผู้ใช้
│   - 🏢 ผู้ใช้ภายใน (PCRU)
│   - 🌐 ผู้ใช้ภายนอก
├── ฟอร์มกรอกข้อมูล
│   - ชื่อ-นามสกุล (*)
│   - เบอร์โทรศัพท์
│   - หน่วยงาน/คณะ (*) สำหรับผู้ใช้ภายใน
│   - ตำแหน่ง (*) สำหรับผู้ใช้ภายใน
│   - เกี่ยวกับคุณ
└── ปุ่ม "เริ่มใช้งาน"
```

### 4. บันทึกข้อมูล
```
POST /api/user/profile
         │
         ▼
┌─────────────────┐
│ ProfileController│
│ update()        │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Update Database│
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Redirect to /  │
└─────────────────┘
```

## โครงสร้างฐานข้อมูล

### ตาราง `users` (เพิ่มเติม)

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | bigint | No | Primary Key |
| email | string | No | Email (ใช้เป็น username) |
| name | string | No | ชื่อผู้ใช้ |
| phone | string | Yes | เบอร์โทรศัพท์ |
| department | string | Yes | หน่วยงาน/คณะ |
| position | string | Yes | ตำแหน่ง |
| bio | text | Yes | ข้อมูลเกี่ยวกับคุณ |
| user_type | string | No | 'internal' หรือ 'external' |
| is_internal | boolean | No | true = ผู้ใช้ภายใน |
| google_id | string | Yes | Google ID |
| avatar | string | Yes | URL รูปโปรไฟล์ |

## การตรวจสอบสิทธิ์

### ผู้ใช้ภายใน (@pcru.ac.th)
- ✅ ต้องกรอก: ชื่อ, เบอร์, หน่วยงาน, ตำแหน่ง
- ✅ สามารถสร้างฟอร์มได้
- ✅ สามารถให้สิทธิ์ผู้อื่นดูผลการตอบได้

### ผู้ใช้ภายนอก
- ✅ ต้องกรอก: ชื่อ, เบอร์ (หน่วยงานและตำแหน่งไม่บังคับ)
- ✅ สามารถสร้างฟอร์มได้
- ✅ สามารถขอสิทธิ์ดูผลการตอบได้

## API Endpoints

### Profile Update
```
PUT /api/user/profile
Authorization: Bearer {token}

Request Body:
{
  "name": "นายสมชาย ใจดี",
  "phone": "081-234-5678",
  "department": "คณะวิทยาศาสตร์",
  "position": "นักวิชาการคอมพิวเตอร์",
  "bio": "ชอบพัฒนาเว็บแอปพลิเคชัน"
}

Response:
{
  "success": true,
  "message": "อัปเดตโปรไฟล์เรียบร้อยแล้ว",
  "user": { ... }
}
```

## การทำงานของ Popup Login

### 1. เปิด Popup
```javascript
const handleGoogleLogin = () => {
  const popupUrl = `/auth/google?popup=1`;
  window.open(popupUrl, 'GoogleLogin', features);
};
```

### 2. Callback และส่ง Token
```php
// google-callback-popup.blade.php
<script>
  window.opener.localStorage.setItem('currentToken', '{{ $token }}');
  window.opener.localStorage.setItem('isInternal', '{{ $is_internal ? 'true' : 'false' }}');
  window.opener.localStorage.setItem('is_new_user', '{{ $is_new_user ? 'true' : 'false' }}');
  
  const event = new window.opener.CustomEvent('google-login-success', {
    detail: { token, user_id, is_internal, is_new_user }
  });
  window.opener.dispatchEvent(event);
  
  setTimeout(() => window.close(), 1000);
</script>
```

### 3. รับ Event และ Redirect
```javascript
// ใน SurveyFormRenderer.jsx หรือ component อื่นๆ
useEffect(() => {
  const handleLoginSuccess = (event) => {
    const { token, is_new_user } = event.detail;
    
    if (is_new_user) {
      navigate('/profile/setup');
    }
  };
  
  window.addEventListener('google-login-success', handleLoginSuccess);
  return () => window.removeEventListener('google-login-success', handleLoginSuccess);
}, []);
```

## การทดสอบ

### ทดสอบผู้ใช้ใหม่
1. ล็อกอินด้วย Google ที่ยังไม่เคยใช้งาน
2. ระบบ redirect ไป `/profile/setup`
3. กรอกข้อมูลให้ครบ
4. กด "เริ่มใช้งาน"
5. ระบบ redirect ไปหน้า Home

### ทดสอบผู้ใช้เก่า
1. ล็อกอินด้วย Google ที่เคยใช้งานแล้ว
2. ระบบ redirect ไปหน้า Home โดยตรง
3. ไม่แสดงหน้า Profile Setup

## การแก้ไขปัญหา

### ปัญหา: ไม่ redirect ไป Profile Setup
- ตรวจสอบ `$isNewUser` ใน GoogleAuthController
- ตรวจสอบ query parameters ใน URL
- ตรวจสอบ localStorage ว่ามี `is_new_user` หรือไม่

### ปัญหา: บันทึกข้อมูลไม่ได้
- ตรวจสอบ Sanctum token
- ตรวจสอบ middleware `auth:sanctum`
- ตรวจสอบ CSRF token

### ปัญหา: ฟอร์มไม่แสดงฟิลด์สำหรับผู้ใช้ภายใน
- ตรวจสอบ `isInternal` state
- ตรวจสอบ query parameter `is_internal`

## ไฟล์ที่เกี่ยวข้อง

| ไฟล์ | คำอธิบาย |
|------|---------|
| `app/Http/Controllers/GoogleAuthController.php` | ตรวจสอบผู้ใช้ใหม่และ redirect |
| `app/Http/Controllers/ProfileController.php` | อัปเดตข้อมูลโปรไฟล์ |
| `resources/js/pages/ProfileSetup.jsx` | หน้า Profile Setup |
| `resources/views/auth/google-callback-popup.blade.php` | Popup callback |
| `routes/api.php` | API route สำหรับ update profile |
| `routes/web.php` | Web route สำหรับหน้า Profile Setup |
| `database/migrations/*_add_profile_fields_to_users_table.php` | Migration เพิ่มฟิลด์โปรไฟล์ |

## Security

### ✅ สิ่งที่ควรทำ
- ตรวจสอบ authentication ก่อนอัปเดตโปรไฟล์
- Validate input ทุกฟิลด์
- ใช้ Sanctum token สำหรับ API
- Hash password (ถ้ามี)

### ❌ สิ่งที่ไม่ควรทำ
- อนุญาตให้แก้ไข email (เพราะใช้เป็น identifier)
- เก็บ sensitive data โดยไม่ encrypt
- อนุญาตให้เข้าถึงโปรไฟล์ผู้อื่น

---

**เวอร์ชัน:** 1.0  
**วันที่:** 25 มีนาคม 2569  
**ผู้เขียน:** AI Assistant
