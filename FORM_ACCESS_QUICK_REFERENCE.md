# Quick Reference: Form Access Approval API

## Permission Levels
- `view` - ดูผลลัพธ์เท่านั้น
- `export` - ดูและส่งออกข้อมูล
- `manage` - จัดการทั้งหมด (ดู, ส่งออก, เพิ่มโน้ต, ลบ)

---

## For Form Owners (เจ้าของแบบฟอร์ม)

### ดูคำขอที่รออนุมัติ
```http
GET /api/forms/{uuid}/access/requests/pending
```

### ดูคำขอทั้งหมด
```http
GET /api/forms/{uuid}/access/requests
```

### อนุมัติคำขอ (เดี่ยว)
```http
POST /api/forms/{uuid}/access/requests/{requestId}/approve
Content-Type: application/json

{
  "permission_level": "export",
  "expires_at": "2026-12-31T23:59:59Z"
}
```

### ปฏิเสธคำขอ (เดี่ยว)
```http
POST /api/forms/{uuid}/access/requests/{requestId}/reject
Content-Type: application/json

{
  "rejection_reason": "เหตุผลที่ปฏิเสธ"
}
```

### อนุมัติ/ปฏิเสธ แบบชุด
```http
POST /api/forms/{uuid}/access/requests/batch
Content-Type: application/json

{
  "action": "approve",
  "request_ids": [1, 2, 3],
  "permission_level": "view",
  "expires_at": "2026-12-31T23:59:59Z"
}
```

### มอบสิทธิ์โดยตรง (ไม่ต้องรอคำขอ)
```http
POST /api/forms/{uuid}/access/grant
Content-Type: application/json

{
  "user_id": 2,
  "permission_level": "view",
  "expires_at": "2026-12-31T23:59:59Z",
  "notes": "หมายเหตุ"
}
```

### แก้ไขระดับสิทธิ์
```http
PUT /api/forms/{uuid}/access/users/{userId}/permission
Content-Type: application/json

{
  "permission_level": "manage",
  "notes": "แก้ไขสิทธิ์"
}
```

### เพิกถอนสิทธิ์
```http
DELETE /api/forms/{uuid}/access/users/{userId}
```

### ดูผู้ใช้ที่มีสิทธิ์
```http
GET /api/forms/{uuid}/access/users
```

### ดูประวัติ Audit Log
```http
GET /api/forms/{uuid}/access/audit-log
```

---

## For Users Requesting Access (ผู้ขอสิทธิ์)

### ขอสิทธิ์เข้าถึง
```http
POST /api/forms/{uuid}/access/request
Content-Type: application/json

{
  "permission_level": "view",
  "reason": "เหตุผลที่ขอสิทธิ์"
}
```

### ตรวจสอบสิทธิ์
```http
GET /api/forms/{uuid}/access/check
```

### ดูคำขอของฉัน
```http
GET /api/forms/access-requests/my-requests
```

---

## Response Examples

### Request Access Response
```json
{
  "success": true,
  "message": "ส่งคำขอสิทธิ์เรียบร้อยแล้ว รอเจ้าของแบบฟอร์มอนุมัติ",
  "data": {
    "request_id": 1,
    "status": "pending",
    "permission_level": "view",
    "permission_label": "ดูผลลัพธ์",
    "created_at": "2 นาทีที่แล้ว"
  }
}
```

### Check Access Response
```json
{
  "success": true,
  "data": {
    "has_access": true,
    "is_owner": false,
    "access_details": {
      "permission_level": "export",
      "permission_label": "ดูและส่งออกข้อมูล",
      "expires_at": "2026-12-31T23:59:59.000000Z",
      "expires_at_human": "อีก 9 เดือน",
      "is_expired": false
    }
  }
}
```

### Get Pending Requests Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user": {
        "id": 2,
        "name": "สมชาย ใจดี",
        "email": "somchai@example.com",
        "department": "ฝ่าย IT",
        "position": "Developer"
      },
      "status": "pending",
      "permission_level": "view",
      "permission_label": "ดูผลลัพธ์",
      "reason": "ต้องการดูข้อมูล",
      "created_at_human": "2 นาทีที่แล้ว"
    }
  ],
  "meta": {
    "total": 2,
    "pending": 2,
    "approved": 0,
    "rejected": 0
  }
}
```

---

## Common Use Cases

### 1. อนุมัติคำขอทั้งหมดแบบเร็ว
```bash
POST /api/forms/{uuid}/access/requests/batch
{
  "action": "approve",
  "request_ids": [1, 2, 3, 4, 5],
  "permission_level": "view"
}
```

### 2. มอบสิทธิ์ให้ทีม
```bash
POST /api/forms/{uuid}/access/grant
{
  "user_id": 5,
  "permission_level": "export",
  "expires_at": "2026-12-31T23:59:59Z",
  "notes": "ทีมพัฒนา"
}
```

### 3. ตรวจสอบว่าใครมีสิทธิ์บ้าง
```bash
GET /api/forms/{uuid}/access/users
```

### 4. ดูประวัติการเปลี่ยนแปลง
```bash
GET /api/forms/{uuid}/access/audit-log
```

---

## Notes

- **Internal Users** (`@pcru.ac.th`): ได้สิทธิ์ `manage` อัตโนมัติ
- **Owner**: มีสิทธิ์เต็มเสมอ
- **Expiration**: ถ้าไม่ระบุ = ถาวร
- **Audit**: ทุกการดำเนินการถูกบันทึก
