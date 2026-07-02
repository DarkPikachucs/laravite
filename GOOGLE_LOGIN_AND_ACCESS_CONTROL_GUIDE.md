# คู่มือระบบ Login และสิทธิ์ผู้ใช้งาน

## ภาพรวมระบบ

ระบบมีการแบ่งประเภทผู้ใช้งานเป็น 2 ประเภทหลัก โดยพิจารณาจากอีเมลที่ใช้งาน:

### 1. ผู้ใช้ภายใน (Internal User)
- **อีเมล**: `@pcru.ac.th`
- **สิทธิ์**:
  - ✅ สร้างแบบฟอร์มของตัวเองได้
  - ✅ ดูผลการตอบแบบฟอร์มที่ตัวเองสร้างได้
  - ✅ ให้สิทธิ์ผู้อื่นดูผลการตอบแบบฟอร์มได้
  - ✅ อนุมัติ/ปฏิเสธ คำขอเข้าถึงข้อมูล

### 2. ผู้ใช้ภายนอก (External User)
- **อีเมล**: อื่นๆ ทั้งหมด (เช่น `@gmail.com`, `@hotmail.com`)
- **สิทธิ์**:
  - ✅ สร้างแบบฟอร์มของตัวเองได้
  - ✅ ดูผลการตอบแบบฟอร์มที่ตัวเองสร้างได้
  - ❌ ไม่สามารถให้สิทธิ์ผู้อื่นดูผลการตอบได้โดยตรง
  - ✅ ขอสิทธิ์ดูผลการตอบแบบฟอร์มจากผู้อื่นได้

## การทำงานของ Google Login

### ขั้นตอนการล็อกอิน

1. ผู้ใช้คลิกปุ่ม **"Sign in with Google"**
2. ระบบเปิด Popup ให้เลือก Google Account
3. Google ตรวจสอบและยืนยันตัวตน
4. ระบบตรวจสอบอีเมล:
   - ถ้าเป็น `@pcru.ac.th` → ตั้งค่าเป็น **ผู้ใช้ภายใน**
   - ถ้าเป็นอีเมลอื่น → ตั้งค่าเป็น **ผู้ใช้ภายนอก**
5. สร้าง User ใหม่ (ถ้ายังไม่มี) หรืออัปเดตข้อมูล (ถ้ามีอยู่แล้ว)
6. ส่ง Token กลับไปยังหน้าต่างหลัก
7. ปิด Popup อัตโนมัติ

### การสร้าง User ใหม่

```php
User::updateOrCreate(
    ['email' => $email],
    [
        'name' => $googleUser->getName(),
        'google_id' => $googleUser->getId(),
        'avatar' => $googleUser->getAvatar(),
        'user_type' => $isInternal ? 'internal' : 'external',
        'is_internal' => $isInternal,
        'email_verified_at' => now(),
    ]
);
```

## โครงสร้างฐานข้อมูล

### ตาราง `users`

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| name | string | ชื่อผู้ใช้ |
| email | string (unique) | อีเมล (ใช้เป็น username) |
| password | string | รหัสผ่าน (NULL สำหรับ Google Login) |
| google_id | string (nullable) | Google ID |
| avatar | string (nullable) | URL รูปโปรไฟล์ |
| user_type | string | 'internal' หรือ 'external' |
| is_internal | boolean | true = ผู้ใช้ภายใน |
| email_verified_at | timestamp | เวลายืนยันอีเมล |
| created_at | timestamp | เวลาสร้าง |
| updated_at | timestamp | เวลาอัปเดต |

## การตรวจสอบสิทธิ์

### ใน Backend (Laravel)

```php
// ตรวจสอบว่าเป็นผู้ใช้ภายในหรือไม่
if ($user->isInternal()) {
    // ผู้ใช้ภายในสามารถ...
}

// ตรวจสอบว่ามีสิทธิ์ดูฟอร์มหรือไม่
if ($user->hasFormAccess($formId)) {
    // มีสิทธิ์เข้าถึง
}

// ขอสิทธิ์เข้าถึงฟอร์ม
$user->requestFormAccess($formId, 'เหตุผลที่ต้องการดูข้อมูล');
```

### ใน Frontend (React)

```javascript
// ตรวจสอบจาก localStorage
const token = localStorage.getItem('currentToken');
const isInternal = localStorage.getItem('isInternal') === 'true';

if (isInternal) {
  // ผู้ใช้ภายในสามารถสร้างฟอร์มและให้สิทธิ์ผู้อื่น
} else {
  // ผู้ใช้ภายนอกต้องขอสิทธิ์
}
```

## การขอสิทธิ์เข้าถึงข้อมูล

### ขั้นตอนการขอสิทธิ์

1. ผู้ใช้ไม่มีสิทธิ์ดูผลการตอบแบบฟอร์ม
2. คลิกปุ่ม "ผลการตอบแบบสอบถาม"
3. ระบบแสดง Dialog "ขอสิทธิ์ดูผลลัพธ์"
4. กรอกเหตุผลที่ต้องการดูข้อมูล
5. ส่งคำขอ → เจ้าของฟอร์มได้รับแจ้ง
6. เจ้าของฟอร์มพิจารณา (อนุมัติ/ปฏิเสธ)
7. แจ้งผลให้ผู้ใช้ทราบ

### สถานะคำขอ

- **pending**: รออนุมัติ
- **approved**: อนุมัติแล้ว
- **rejected**: ถูกปฏิเสธ

## API Endpoints

### Authentication
```
GET  /auth/google              - เริ่มกระบวนการ Google OAuth
GET  /auth/google/callback     - รับผลลัพธ์จาก Google
POST /login                    - Login ด้วย email/password
POST /logout                   - Logout
GET  /user                     - ข้อมูลผู้ใช้ปัจจุบัน
```

### Form Access Control
```
GET  /forms/{uuid}/access/check          - ตรวจสอบสิทธิ์
POST /forms/{uuid}/access/request        - ขอสิทธิ์
POST /forms/{uuid}/access/respond        - ตอบกลับคำขอ (approve/reject)
GET  /forms/{uuid}/submissions           - ดูผลการตอบ (ต้องมีสิทธิ์)
```

## ตัวอย่างการใช้งาน

### ผู้ใช้ภายใน (@pcru.ac.th)

```javascript
// สร้างฟอร์มใหม่
const createForm = async () => {
  const response = await axios.post('/forms', {
    title: 'แบบสำรวจความพึงพอใจ',
    // ...
  });
  
  // เจ้าของฟอร์มสามารถ:
  // 1. ดูผลการตอบได้ทันที
  // 2. ให้สิทธิ์ผู้อื่นดูผลการตอบ
};

// ให้สิทธิ์ผู้อื่น
const grantAccess = async (userId, formId) => {
  await axios.post(`/forms/${formId}/access/grant`, {
    user_id: userId
  });
};
```

### ผู้ใช้ภายนอก (@gmail.com)

```javascript
// สร้างฟอร์มได้เหมือนผู้ใช้ภายใน
const createForm = async () => {
  // ... เหมือนกัน
};

// แต่ต้องขอสิทธิ์เพื่อดูฟอร์มของผู้อื่น
const requestAccess = async (formId, reason) => {
  await axios.post(`/forms/${formId}/access/request`, {
    reason: reason
  });
};
```

## Security Considerations

### ✅ สิ่งที่ควรทำ
- เก็บ Client ID และ Secret ใน `.env` เท่านั้น
- ใช้ HTTPS ใน Production
- ตรวจสอบสิทธิ์ทุกครั้งที่เข้าถึง API
- Rotate Google Client Secret เป็นระยะ

### ❌ สิ่งที่ไม่ควรทำ
- Hardcode credentials ใน code
- Commit `.env` ขึ้น Git
- อนุญาตให้เข้าถึงข้อมูลโดยไม่ตรวจสอบสิทธิ์
- ใช้ HTTP ใน Production

## การทดสอบ

### ทดสอบผู้ใช้ภายใน
1. Login ด้วยอีเมล `@pcru.ac.th`
2. สร้างฟอร์มใหม่
3. ตรวจสอบว่าสามารถดูผลการตอบได้
4. ตรวจสอบว่าสามารถให้สิทธิ์ผู้อื่นได้

### ทดสอบผู้ใช้ภายนอก
1. Login ด้วยอีเมล `@gmail.com`
2. สร้างฟอร์มใหม่ → ✅ ได้
3. พยายามดูฟอร์มของผู้อื่น → ❌ ไม่ได้
4. ขอสิทธิ์ → ✅ ได้
5. รอเจ้าของฟอร์มอนุมัติ

## Troubleshooting

### ปัญหา: Login แล้วไม่แสดง Badge
- ตรวจสอบว่า `is_internal` ถูกส่งมาจาก backend หรือไม่
- ตรวจสอบ localStorage ว่ามีค่า `isInternal` หรือไม่

### ปัญหา: ผู้ใช้ภายนอกสามารถดูฟอร์มได้
- ตรวจสอบ middleware ที่ตรวจสอบสิทธิ์
- ตรวจสอบ `hasFormAccess()` method

### ปัญหา: Google Login ไม่ทำงาน
- ตรวจสอบ Client ID และ Secret ใน `.env`
- ตรวจสอบ Redirect URI ใน Google Cloud Console
- ตรวจสอบว่า Socialite ติดตั้งแล้วหรือไม่

---

**เวอร์ชัน:** 1.0  
**วันที่:** 25 มีนาคม 2569  
**ผู้เขียน:** AI Assistant
