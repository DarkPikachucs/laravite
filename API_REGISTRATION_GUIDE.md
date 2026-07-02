# Registration Status API Documentation

## Base URL
```
/api/registration
```

---

## Endpoints

### 1. Get Registration Status
**Public endpoint** - No authentication required

**Request:**
```http
GET /api/registration/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "open",
    "message": "ลงทะเบียนได้ทันที",
    "start_date": "2025-03-16 00:00:00",
    "end_date": "2025-04-15 23:59:59"
  }
}
```

**Status Values:**
- `open` - Registration is active
- `closed` - Registration is disabled
- `not_started` - Registration hasn't started yet
- `ended` - Registration period has ended

---

### 2. Get All Settings
**Authenticated** - Requires Sanctum token

**Request:**
```http
GET /api/registration/settings
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "key": "registration_enabled",
      "value": "true",
      "type": "boolean",
      "label": "เปิด/ปิด การลงทะเบียน",
      "description": "ควบคุมการเปิดหรือปิดระบบลงทะเบียน"
    },
    {
      "key": "registration_start_date",
      "value": "2025-03-16 00:00:00",
      "type": "datetime",
      "label": "วันที่เริ่มต้นลงทะเบียน",
      "description": "วันที่และเวลาเริ่มต้นการลงทะเบียน"
    },
    {
      "key": "registration_end_date",
      "value": "2025-04-15 23:59:59",
      "type": "datetime",
      "label": "วันที่สิ้นสุดลงทะเบียน",
      "description": "วันที่และเวลาสิ้นสุดการลงทะเบียน"
    },
    {
      "key": "registration_closed_message",
      "value": "ขออภัย การลงทะเบียนได้สิ้นสุดลงแล้ว",
      "type": "text",
      "label": "ข้อความเมื่อปิดลงทะเบียน",
      "description": "ข้อความที่จะแสดงเมื่อการลงทะเบียนสิ้นสุดลง"
    },
    {
      "key": "registration_not_yet_message",
      "value": "การลงทะเบียนจะเปิดเร็วๆ นี้",
      "type": "text",
      "label": "ข้อความเมื่อ belum เปิดลงทะเบียน",
      "description": "ข้อความที่จะแสดงเมื่อการลงทะเบียนยังไม่เริ่มต้น"
    }
  ]
}
```

---

### 3. Update Setting
**Authenticated** - Requires Sanctum token

**Request:**
```http
PUT /api/registration/settings/{key}
Authorization: Bearer {token}
Content-Type: application/json

{
  "value": "2025-04-30 23:59:59"
}
```

**Example - Update End Date:**
```http
PUT /api/registration/settings/registration_end_date
{
  "value": "2025-04-30 23:59:59"
}
```

**Example - Toggle Enable/Disable:**
```http
PUT /api/registration/settings/registration_enabled
{
  "value": "false"
}
```

**Example - Update Message:**
```http
PUT /api/registration/settings/registration_closed_message
{
  "value": "ขออภัย การลงทะเบียนได้สิ้นสุดลงแล้ว กรุณาลงทะเบียนใหม่ในปีหน้า"
}
```

**Response:**
```json
{
  "success": true,
  "message": "อัปเดตการตั้งค่าสำเร็จ",
  "data": {
    "key": "registration_end_date",
    "value": "2025-04-30 23:59:59"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "รูปแบบวันที่และเวลาไม่ถูกต้อง (ใช้รูปแบบ Y-m-d H:i:s หรือ Y-m-d\\TH:i)"
}
```

---

### 4. Bulk Update Settings
**Authenticated** - Requires Sanctum token

**Request:**
```http
POST /api/registration/settings/bulk-update
Authorization: Bearer {token}
Content-Type: application/json

{
  "settings": [
    {
      "key": "registration_enabled",
      "value": "true"
    },
    {
      "key": "registration_start_date",
      "value": "2025-03-16 00:00:00"
    },
    {
      "key": "registration_end_date",
      "value": "2025-04-30 23:59:59"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "อัปเดตการตั้งค่าสำเร็จ",
  "data": {
    "updated": [
      "registration_enabled",
      "registration_start_date",
      "registration_end_date"
    ],
    "failed": []
  }
}
```

---

### 5. Refresh Cache
**Authenticated** - Requires Sanctum token

**Request:**
```http
POST /api/registration/settings/refresh-cache
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "ล้างแคชสำเร็จ"
}
```

---

## Error Codes

| HTTP Code | Description |
|-----------|-------------|
| 200 | Success |
| 404 | Setting not found |
| 422 | Validation error |
| 401 | Unauthorized (missing/invalid token) |

---

## JavaScript Usage Examples

### Check Registration Status
```javascript
import axios from 'axios';

// Check if registration is open
const checkRegistrationStatus = async () => {
  try {
    const response = await axios.get('/api/registration/status');
    const { status, message } = response.data.data;
    
    if (status === 'open') {
      console.log('Registration is open!');
      return true;
    } else {
      console.log('Registration closed:', message);
      return false;
    }
  } catch (error) {
    console.error('Error checking status:', error);
    return false;
  }
};
```

### Update Registration End Date
```javascript
const updateEndDate = async (newEndDate) => {
  try {
    const response = await axios.put(
      '/api/registration/settings/registration_end_date',
      { value: newEndDate },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    console.log('Updated successfully');
  } catch (error) {
    console.error('Update failed:', error);
  }
};

// Usage
updateEndDate('2025-05-01 23:59:59');
```

### Bulk Update All Settings
```javascript
const updateAllSettings = async () => {
  const settings = [
    { key: 'registration_enabled', value: 'true' },
    { key: 'registration_start_date', value: '2025-03-16 00:00:00' },
    { key: 'registration_end_date', value: '2025-04-30 23:59:59' },
    { 
      key: 'registration_closed_message', 
      value: 'การลงทะเบียนสิ้นสุดลงแล้ว' 
    }
  ];

  try {
    const response = await axios.post(
      '/api/registration/settings/bulk-update',
      { settings },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    console.log('Bulk update successful:', response.data);
  } catch (error) {
    console.error('Bulk update failed:', error);
  }
};
```

---

## cURL Examples

### Get Status
```bash
curl -X GET http://your-domain.com/api/registration/status
```

### Update Setting
```bash
curl -X PUT http://your-domain.com/api/registration/settings/registration_enabled \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value": "false"}'
```

### Bulk Update
```bash
curl -X POST http://your-domain.com/api/registration/settings/bulk-update \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "settings": [
      {"key": "registration_enabled", "value": "true"},
      {"key": "registration_end_date", "value": "2025-04-30 23:59:59"}
    ]
  }'
```

---

## PHP Usage Examples

### Using Laravel HTTP Client
```php
use Illuminate\Support\Facades\Http;

// Get status
$response = Http::get('/api/registration/status');
$status = $response->json()['data'];

// Update setting
$response = Http::withToken($token)
    ->put('/api/registration/settings/registration_end_date', [
        'value' => '2025-04-30 23:59:59'
    ]);
```

### Using Model Directly (in Laravel)
```php
use App\Models\RegistrationSetting;

// Check if open
if (RegistrationSetting::isRegistrationOpen()) {
    // Registration is open
}

// Get status
$status = RegistrationSetting::getRegistrationStatus();

// Get value
$endDate = RegistrationSetting::get('registration_end_date');

// Set value
RegistrationSetting::set('registration_enabled', 'false');
```
