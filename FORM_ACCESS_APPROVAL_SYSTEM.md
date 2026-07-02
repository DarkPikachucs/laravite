# Form Access Approval System Documentation

## Overview

ระบบการอนุมัติสิทธิ์เข้าถึงแบบฟอร์มช่วยให้เจ้าของแบบฟอร์มสามารถจัดการและมอบสิทธิ์การเข้าถึงข้อมูลการตอบแบบฟอร์มให้กับผู้ใช้อื่นๆ ได้อย่างปลอดภัยและมีความยืดหยุ่น

## คุณสมบัติหลัก

### 1. ระดับสิทธิ์ (Permission Levels)

ระบบมี 3 ระดับสิทธิ์:

| ระดับ | คำอธิบาย | สิทธิ์ |
|-------|----------|--------|
| `view` | ดูผลลัพธ์ | ดูข้อมูลการตอบแบบฟอร์ม |
| `export` | ดูและส่งออกข้อมูล | ดูข้อมูล + ส่งออกเป็น CSV |
| `manage` | จัดการทั้งหมด | ดูข้อมูล + ส่งออก + จัดการ (เพิ่มโน้ต, ลบ, แก้ไข) |

### 2. การขอสิทธิ์ (Access Request)

ผู้ใช้สามารถขอสิทธิ์เข้าถึงแบบฟอร์มได้โดย:
- ส่งคำขอพร้อมเหตุผล
- ระบุระดับสิทธิ์ที่ต้องการ
- รอเจ้าของแบบฟอร์มอนุมัติ

### 3. การมอบสิทธิ์โดยตรง (Direct Grant)

เจ้าของแบบฟอร์มสามารถมอบสิทธิ์ให้ผู้ใช้โดยไม่ต้องรอคำขอ:
- เลือกระดับสิทธิ์ที่ต้องการมอบ
- กำหนดวันหมดอายุ (ถ้าต้องการ)
- เพิ่มหมายเหตุ

### 4. การหมดอายุ (Expiration)

สิทธิ์สามารถกำหนดวันหมดอายุได้:
- ถ้าไม่ระบุ = ถาวร
- สามารถขยายเวลาได้
- ระบบจะตรวจสอบอัตโนมัติ

### 5. Audit Trail

ระบบบันทึกประวัติทุกการดำเนินการ:
- สร้างคำขอ
- อนุมัติ/ปฏิเสธ
- แก้ไขสิทธิ์
- เพิกถอนสิทธิ์
- หมดอายุ

## API Endpoints

### 1. ตรวจสอบสิทธิ์ (Check Access)

```http
GET /api/forms/{uuid}/access/check
Authorization: Bearer {token}
```

**Response:**
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
      "is_expired": false,
      "notify_on_submission": false
    },
    "existing_request": null
  }
}
```

---

### 2. ขอสิทธิ์เข้าถึง (Request Access)

```http
POST /api/forms/{uuid}/access/request
Authorization: Bearer {token}
Content-Type: application/json

{
  "permission_level": "view",
  "reason": "ต้องการดูข้อมูลเพื่อการวิเคราะห์"
}
```

**Parameters:**
- `permission_level` (optional): `view`, `export`, `manage` (default: `view`)
- `reason` (optional): เหตุผลที่ขอสิทธิ์

**Response:**
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

---

### 3. ดูคำขอทั้งหมด (Get All Requests) - สำหรับเจ้าของแบบฟอร์ม

```http
GET /api/forms/{uuid}/access/requests
Authorization: Bearer {token}
```

**Response:**
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
        "avatar": null,
        "department": "ฝ่าย IT",
        "position": "Developer"
      },
      "status": "pending",
      "permission_level": "view",
      "permission_label": "ดูผลลัพธ์",
      "reason": "ต้องการดูข้อมูลเพื่อการวิเคราะห์",
      "rejection_reason": null,
      "reviewer": null,
      "created_at": "2026-03-31T10:00:00.000000Z",
      "created_at_human": "2 นาทีที่แล้ว",
      "reviewed_at": null,
      "reviewed_at_human": null,
      "expires_at": null,
      "expires_at_human": null,
      "is_expired": false
    }
  ],
  "meta": {
    "total": 5,
    "pending": 2,
    "approved": 2,
    "rejected": 1
  }
}
```

---

### 4. ดูคำขอที่รออนุมัติ (Get Pending Requests) - สำหรับเจ้าของแบบฟอร์ม

```http
GET /api/forms/{uuid}/access/requests/pending
Authorization: Bearer {token}
```

**Response:** เหมือน Get All Requests แต่แสดงเฉพาะ `status = pending`

---

### 5. อนุมัติคำขอ (Approve Request) - สำหรับเจ้าของแบบฟอร์ม

```http
POST /api/forms/{uuid}/access/requests/{requestId}/approve
Authorization: Bearer {token}
Content-Type: application/json

{
  "permission_level": "export",
  "expires_at": "2026-12-31T23:59:59.000000Z"
}
```

**Parameters:**
- `permission_level` (optional): ระดับสิทธิ์ที่จะอนุมัติ (default: ตามที่ขอ)
- `expires_at` (optional): วันหมดอายุ (ISO 8601 format)

**Response:**
```json
{
  "success": true,
  "message": "อนุมัติสิทธิ์เรียบร้อยแล้ว",
  "data": {
    "id": 1,
    "user": {
      "id": 2,
      "name": "สมชาย ใจดี",
      "email": "somchai@example.com"
    },
    "status": "approved",
    "permission_level": "export",
    "permission_label": "ดูและส่งออกข้อมูล",
    "expires_at": "2026-12-31T23:59:59.000000Z",
    "is_expired": false
  }
}
```

---

### 6. ปฏิเสธคำขอ (Reject Request) - สำหรับเจ้าของแบบฟอร์ม

```http
POST /api/forms/{uuid}/access/requests/{requestId}/reject
Authorization: Bearer {token}
Content-Type: application/json

{
  "rejection_reason": "ไม่สามารถอนุมัติได้ในขณะนี้"
}
```

**Parameters:**
- `rejection_reason` (optional): เหตุผลที่ปฏิเสธ

**Response:**
```json
{
  "success": true,
  "message": "ปฏิเสธคำขอสิทธิ์แล้ว",
  "data": {
    "id": 1,
    "status": "rejected",
    "rejection_reason": "ไม่สามารถอนุมัติได้ในขณะนี้"
  }
}
```

---

### 7. อนุมัติ/ปฏิเสธ คำขอแบบชุด (Batch Process) - สำหรับเจ้าของแบบฟอร์ม

```http
POST /api/forms/{uuid}/access/requests/batch
Authorization: Bearer {token}
Content-Type: application/json

{
  "action": "approve",
  "request_ids": [1, 2, 3],
  "permission_level": "view",
  "expires_at": "2026-12-31T23:59:59.000000Z",
  "rejection_reason": "ไม่ผ่านการพิจารณา"
}
```

**Parameters:**
- `action` (required): `approve` หรือ `reject`
- `request_ids` (required): อาร์เรย์ของ request ID
- `permission_level` (required ถ้า action=approve): ระดับสิทธิ์
- `expires_at` (optional): วันหมดอายุ
- `rejection_reason` (required ถ้า action=reject): เหตุผลที่ปฏิเสธ

**Response:**
```json
{
  "success": true,
  "message": "อนุมัติสิทธิ์เรียบร้อยแล้ว"
}
```

---

### 8. มอบสิทธิ์โดยตรง (Grant Access) - สำหรับเจ้าของแบบฟอร์ม

```http
POST /api/forms/{uuid}/access/grant
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 2,
  "permission_level": "export",
  "expires_at": "2026-12-31T23:59:59.000000Z",
  "notify_on_submission": false,
  "notes": "มอบสิทธิ์พิเศษ"
}
```

**Parameters:**
- `user_id` (required): ID ของผู้ใช้ที่จะมอบสิทธิ์
- `permission_level` (required): `view`, `export`, `manage`
- `expires_at` (optional): วันหมดอายุ
- `notify_on_submission` (optional): แจ้งเตือนเมื่อมีการส่งแบบฟอร์ม
- `notes` (optional): หมายเหตุ

**Response:**
```json
{
  "success": true,
  "message": "มอบสิทธิ์เรียบร้อยแล้ว",
  "data": {
    "user": {
      "id": 2,
      "name": "สมชาย ใจดี",
      "email": "somchai@example.com"
    },
    "permission_level": "export",
    "permission_label": "ดูและส่งออกข้อมูล",
    "expires_at": "2026-12-31T23:59:59.000000Z"
  }
}
```

---

### 9. แก้ไขระดับสิทธิ์ (Update Permission) - สำหรับเจ้าของแบบฟอร์ม

```http
PUT /api/forms/{uuid}/access/users/{userId}/permission
Authorization: Bearer {token}
Content-Type: application/json

{
  "permission_level": "manage",
  "notes": "เลื่อนระดับสิทธิ์"
}
```

**Parameters:**
- `permission_level` (required): ระดับสิทธิ์ใหม่
- `notes` (optional): หมายเหตุ

**Response:**
```json
{
  "success": true,
  "message": "อัปเดตสิทธิ์เรียบร้อยแล้ว",
  "data": {
    "permission_level": "manage",
    "permission_label": "จัดการทั้งหมด"
  }
}
```

---

### 10. เพิกถอนสิทธิ์ (Revoke Access) - สำหรับเจ้าของแบบฟอร์ม

```http
DELETE /api/forms/{uuid}/access/users/{userId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "เพิกถอนสิทธิ์เรียบร้อยแล้ว"
}
```

---

### 11. ดูผู้ใช้ที่มีสิทธิ์ (Get Users With Access) - สำหรับเจ้าของแบบฟอร์ม

```http
GET /api/forms/{uuid}/access/users
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "name": "สมชาย ใจดี",
      "email": "somchai@example.com",
      "avatar": null,
      "permission_level": "export",
      "permission_label": "ดูและส่งออกข้อมูล",
      "granted_at": "1 ชั่วโมงที่แล้ว",
      "expires_at": "2026-12-31T23:59:59.000000Z",
      "expires_at_human": "อีก 9 เดือน",
      "is_expired": false
    }
  ],
  "meta": {
    "total": 3
  }
}
```

---

### 12. ดูประวัติ Audit Log - สำหรับเจ้าของแบบฟอร์ม

```http
GET /api/forms/{uuid}/access/audit-log
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "action": "approved",
      "action_label": "อนุมัติ",
      "user": {
        "id": 1,
        "name": "เจ้าของแบบฟอร์ม",
        "email": "owner@example.com"
      },
      "old_values": {
        "status": "pending",
        "permission_level": "view"
      },
      "new_values": {
        "status": "approved",
        "permission_level": "export"
      },
      "reason": null,
      "created_at": "2026-03-31T10:00:00.000000Z",
      "created_at_human": "2 นาทีที่แล้ว"
    }
  ],
  "meta": {
    "total": 10
  }
}
```

---

### 13. ดูคำขอของฉัน (My Requests)

```http
GET /api/forms/access-requests/my-requests
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "form": {
        "id": 1,
        "uuid": "550e8400-e29b-41d4-a716-446655440000",
        "title": "แบบฟอร์มสำรวจ"
      },
      "status": "approved",
      "permission_level": "export",
      "permission_label": "ดูและส่งออกข้อมูล",
      "reason": "ต้องการดูข้อมูลเพื่อการวิเคราะห์",
      "rejection_reason": null,
      "created_at": "2026-03-31T10:00:00.000000Z",
      "reviewed_at": "2026-03-31T10:05:00.000000Z",
      "expires_at": null
    }
  ]
}
```

---

## การใช้งานในทางปฏิบัติ

### สำหรับเจ้าของแบบฟอร์ม

1. **ดูคำขอที่รออนุมัติ**
   ```bash
   GET /api/forms/{uuid}/access/requests/pending
   ```

2. **อนุมัติคำขอ**
   ```bash
   POST /api/forms/{uuid}/access/requests/{requestId}/approve
   {
     "permission_level": "export",
     "expires_at": "2026-12-31T23:59:59.000000Z"
   }
   ```

3. **มอบสิทธิ์โดยตรง**
   ```bash
   POST /api/forms/{uuid}/access/grant
   {
     "user_id": 2,
     "permission_level": "view"
   }
   ```

4. **ดูผู้ใช้ที่มีสิทธิ์**
   ```bash
   GET /api/forms/{uuid}/access/users
   ```

5. **เพิกถอนสิทธิ์**
   ```bash
   DELETE /api/forms/{uuid}/access/users/{userId}
   ```

### สำหรับผู้ต้องการสิทธิ์

1. **ขอสิทธิ์**
   ```bash
   POST /api/forms/{uuid}/access/request
   {
     "permission_level": "view",
     "reason": "ต้องการดูข้อมูล"
   }
   ```

2. **ตรวจสอบสถานะ**
   ```bash
   GET /api/forms/{uuid}/access/check
   ```

3. **ดูคำขอของฉัน**
   ```bash
   GET /api/forms/access-requests/my-requests
   ```

## Database Schema

### ตาราง `form_access_requests`

| คอลัมน์ | ประเภท | คำอธิบาย |
|---------|--------|----------|
| `id` | bigint | Primary key |
| `user_id` | bigint | ผู้ขอสิทธิ์ |
| `form_id` | bigint | แบบฟอร์มที่ขอ |
| `status` | enum | `pending`, `approved`, `rejected` |
| `permission_level` | enum | `view`, `export`, `manage` |
| `reason` | text | เหตุผลที่ขอ |
| `rejection_reason` | text | เหตุผลที่ปฏิเสธ |
| `reviewed_by` | bigint | ผู้ตรวจสอบ |
| `reviewed_at` | timestamp | วันที่ตรวจสอบ |
| `expires_at` | timestamp | วันหมดอายุ |
| `notify_on_submission` | boolean | แจ้งเตือนเมื่อมีการส่ง |
| `audit_log` | json | ประวัติการเปลี่ยนแปลง |

### ตาราง `form_access_grants`

| คอลัมน์ | ประเภท | คำอธิบาย |
|---------|--------|----------|
| `id` | bigint | Primary key |
| `form_id` | bigint | แบบฟอร์ม |
| `granted_by` | bigint | ผู้มอบสิทธิ์ |
| `user_id` | bigint | ผู้ได้รับสิทธิ์ |
| `permission_level` | enum | ระดับสิทธิ์ |
| `expires_at` | timestamp | วันหมดอายุ |
| `notify_on_submission` | boolean | แจ้งเตือน |
| `notes` | text | หมายเหตุ |
| `audit_log` | json | ประวัติ |

### ตาราง `form_access_audit_logs`

| คอลัมน์ | ประเภท | คำอธิบาย |
|---------|--------|----------|
| `id` | bigint | Primary key |
| `access_request_id` | bigint | คำขอที่เกี่ยวข้อง |
| `form_id` | bigint | แบบฟอร์ม |
| `user_id` | bigint | ผู้กระทำ |
| `action` | string | `created`, `approved`, `rejected`, `revoked`, `modified`, `expired`, `granted` |
| `old_values` | json | ค่าเดิม |
| `new_values` | json | ค่าใหม่ |
| `reason` | text | เหตุผล |
| `ip_address` | string | IP |
| `user_agent` | string | User agent |

## การแจ้งเตือน (Notifications)

ระบบจะส่งการแจ้งเตือนในกรณีต่อไปนี้:

1. **มีผู้ขอสิทธิ์** - แจ้งเจ้าของแบบฟอร์ม
2. **คำขอได้รับการอนุมัติ** - แจ้งผู้ขอ
3. **คำขอถูกปฏิเสธ** - แจ้งผู้ขอ
4. **ได้รับสิทธิ์โดยตรง** - แจ้งผู้ได้รับสิทธิ์
5. **สิทธิ์ถูกเพิกถอน** - แจ้งผู้ถูกเพิกถอน

## ตัวอย่าง Code

### ตรวจสอบสิทธิ์ก่อนเข้าถึงข้อมูล

```php
use App\Models\Form;
use Illuminate\Support\Facades\Auth;

$form = Form::findByUuid($uuid);

// ตรวจสอบว่าผู้ใช้มีสิทธิ์ดูแบบฟอร์มหรือไม่
if (!Auth::user()->hasFormAccess($form->id)) {
    return response()->json([
        'success' => false,
        'message' => 'คุณไม่มีสิทธิ์เข้าถึงแบบฟอร์มนี้',
    ], 403);
}

// ตรวจสอบระดับสิทธิ์
if (!Auth::user()->hasFormPermission($form->id, 'export')) {
    return response()->json([
        'success' => false,
        'message' => 'คุณไม่มีสิทธิ์ส่งออกข้อมูล',
    ], 403);
}

// ดึงระดับสิทธิ์
$permissionLevel = Auth::user()->getFormPermissionLevel($form->id);
```

## หมายเหตุ

- ผู้ใช้ภายใน (`@pcru.ac.th`) จะได้รับสิทธิ์ `manage` อัตโนมัติ
- เจ้าของแบบฟอร์มมีสิทธิ์เต็มเสมอ
- สิทธิ์ที่หมดอายุจะถูกตรวจสอบอัตโนมัติ
- ทุกการดำเนินการจะถูกบันทึกใน audit log
