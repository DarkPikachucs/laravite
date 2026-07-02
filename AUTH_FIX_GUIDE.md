# แก้ไขปัญหา Login และ Authentication

## ปัญหาที่พบ
Login แล้วไม่สามารถเข้าหน้า `/admin/forms` ได้

## สาเหตุ
1. `useAuth` hook ตรวจสอบ token จาก `localStorage` key `token` 
2. แต่ `LoginPage` เก็บ token ใน key `currentToken`
3. ไม่มี axios interceptor สำหรับจัดการ token อัตโนมัติ

## การแก้ไข

### 1. อัปเดต `useAuth.js`
- เปลี่ยนให้ตรวจสอบ `currentToken` แทน `token`
- เพิ่มการตรวจสอบ token กับ API `/api/user`
- เพิ่ม `logout` function
- เพิ่ม `loading` state

**ไฟล์**: `resources/js/hooks/useAuth.js`

### 2. อัปเดต `LoginPage.jsx`
- ตั้งค่า axios baseURL จาก `VITE_API_BASE_URL`
- เพิ่ม toast notification
- Redirect ไป `/admin/forms` หลัง login สำเร็จ
- เพิ่ม loading state

**ไฟล์**: `resources/js/pages/LoginPage.jsx`

### 3. อัปเดต `bootstrap.js`
- เพิ่ม axios interceptor สำหรับแนบ token อัตโนมัติ
- เพิ่ม response interceptor สำหรับจัดการ 401 (unauthorized)
- Redirect ไป login เมื่อ token หมดอายุ

**ไฟล์**: `resources/js/bootstrap.js`

### 4. อัปเดต `routes.jsx`
- เพิ่ม loading state ใน `PrivateRoute`
- แสดง loading spinner ขณะตรวจสอบ authentication

**ไฟล์**: `resources/js/routes.jsx`

### 5. อัปเดต `Sidebar.jsx`
- เพิ่มเมนู "แบบฟอร์ม" `/admin/forms`
- เพิ่มเมนู "ตั้งค่าการลงทะเบียน" `/admin/registration-settings`

**ไฟล์**: `resources/js/components/Layouts/Sidebar.jsx`

## วิธีทดสอบ

### 1. Build หรือ Run Development
```bash
npm run dev
# หรือ
npm run build
```

### 2. ทดสอบ Login
1. ไปที่ `/login`
2. กรอก email และ password
3. กด Login
4. ระบบจะ redirect ไป `/admin/forms`

### 3. ทดสอบ Authentication
1. เปิด Browser DevTools (F12)
2. ไปที่ Application > Local Storage
3. ตรวจสอบว่ามี `currentToken` และ `user`
4. ลอง refresh หน้าเว็บ
5. ระบบควรยังคง login อยู่

### 4. ทดสอบ Logout (เมื่อมีฟังก์ชัน)
1. กด logout
2. Token ถูกลบออกจาก localStorage
3. Redirect ไป `/login`

## โครงสร้าง Token

```javascript
// หลัง login สำเร็จ
localStorage.setItem("currentToken", "bearer-token-string");
localStorage.setItem("user", JSON.stringify({ id: 1, email: "..." }));

// Axios header
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

## API Endpoints ที่เกี่ยวข้อง

```http
POST /api/login
Response: { "currentToken": "...", "user": {...} }

GET /api/user
Headers: Authorization: Bearer {token}
Response: { "id": 1, "email": "...", ... }

POST /api/logout
Headers: Authorization: Bearer {token}
```

## การแก้ปัญหาเพิ่มเติม

### ถ้ายังเข้าหน้า admin ไม่ได้

1. **ตรวจสอบ API URL**:
   ```bash
   # ใน .env
   VITE_API_BASE_URL=https://survey.pcru.ac.th/api
   ```

2. **ตรวจสอบ Sanctum Domains**:
   ```env
   SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost,survey.pcru.ac.th
   ```

3. **Clear Cache**:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan route:clear
   ```

4. **ตรวจสอบ Database**:
   ```sql
   -- ตรวจสอบว่ามี user ในระบบ
   SELECT * FROM users LIMIT 10;
   ```

5. **ตรวจสอบ Laravel Logs**:
   ```bash
   tail -f storage/logs/laravel.log
   ```

### ถ้า Token ไม่ถูกส่งไปกับ Request

1. เปิด DevTools > Network
2. ดู request ไป `/api/admin/forms`
3. ตรวจสอบ Headers มี `Authorization: Bearer ...` หรือไม่
4. ถ้าไม่มี → ตรวจสอบ bootstrap.js interceptor

### ถ้าได้ 401 Unauthorized

1. Token อาจหมดอายุ
2. ลอง logout และ login ใหม่
3. ตรวจสอบ session lifetime ใน `.env`:
   ```env
   SESSION_LIFETIME=120
   ```

## Checklist

- [x] แก้ไข useAuth.js ให้ใช้ currentToken
- [x] แก้ไข LoginPage.jsx redirect ไป /admin/forms
- [x] เพิ่ม axios interceptors ใน bootstrap.js
- [x] เพิ่ม loading state ใน PrivateRoute
- [x] เพิ่มเมนู Forms ใน Sidebar
- [ ] ทดสอบ Login/Logout
- [ ] ทดสอบ Token Refresh
- [ ] ทดสอบ Access Control

## ไฟล์ที่แก้ไข

1. `resources/js/hooks/useAuth.js`
2. `resources/js/pages/LoginPage.jsx`
3. `resources/js/bootstrap.js`
4. `resources/js/routes.jsx`
5. `resources/js/components/Layouts/Sidebar.jsx`

## ขั้นตอนถัดไป

1. **เพิ่ม Logout Button**:
   - เพิ่มใน Sidebar หรือ Navbar
   - เรียกใช้ `logout()` function จาก `useAuth`

2. **เพิ่ม Role-Based Access**:
   - ตรวจสอบ user role ใน PrivateRoute
   - จำกัดการเข้าถึงตาม role

3. **เพิ่ม Loading States**:
   - แสดง skeleton screens แทน loading spinner ธรรมดา

4. **ปรับปรุง Error Handling**:
   - แสดง error messages ที่ชัดเจน
   - เพิ่ม retry logic

---

**วันที่แก้ไข**: 2025-03-16  
**เวอร์ชัน**: 1.0
