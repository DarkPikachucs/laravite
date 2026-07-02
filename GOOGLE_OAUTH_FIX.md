# Google OAuth Setup - แก้ไขปัญหา Route ไม่พบ

## ปัญหา
Error: `No routes matched location "/auth/google"`

## สาเหตุ
Route `/auth/google` ถูกเพิ่มใน `routes/api.php` ซึ่งจะมี prefix `/api` โดยอัตโนมัติ
แต่ Google OAuth redirect ต้องเป็น **web route** (ไม่ใช่ API route)

## วิธีแก้ไข

### 1. เพิ่ม Route ใน `routes/web.php`

```php
// เพิ่ม import
use App\Http\Controllers\GoogleAuthController;

// เพิ่ม routes
Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);
```

### 2. อัปเดต `GoogleAuthController.php`

เปลี่ยนจาก return JSON เป็น redirect พร้อม token:

```php
public function handleGoogleCallback()
{
    try {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
            ]
        );

        // Create Sanctum token for API access
        $token = $user->createToken('google-auth-token')->plainTextToken;

        // Redirect back to frontend with token
        $frontendUrl = config('app.frontend_url', '/');
        
        return redirect("{$frontendUrl}?google_token={$token}&user_id={$user->id}");
    } catch (\Exception $e) {
        $frontendUrl = config('app.frontend_url', '/');
        return redirect("{$frontendUrl}?google_error=1");
    }
}
```

### 3. เพิ่ม Config ใน `.env`

```env
FRONTEND_URL=/
```

### 4. อัปเดต Frontend รับ Token

เพิ่มใน `SurveyFormRenderer.jsx`:

```javascript
// Handle Google OAuth callback
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const googleToken = urlParams.get('google_token');
  const userId = urlParams.get('user_id');
  const googleError = urlParams.get('google_error');

  if (googleError) {
    toast.error('ไม่สามารถล็อกอินด้วย Google ได้');
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }

  if (googleToken && userId) {
    // Save token to localStorage
    localStorage.setItem('currentToken', googleToken);
    localStorage.setItem('userId', userId);
    toast.success('ล็อกอินสำเร็จ');
    
    // Remove query params
    window.history.replaceState({}, document.title, window.location.pathname);
    
    // Re-check access with new token
    checkAccess();
  }
}, []);
```

### 5. อัปเดตปุ่ม Login ใน Frontend

เปลี่ยนจาก `window.location.href` เป็นใช้ API route แทน:

```javascript
<button
  onClick={() => window.location.href = '/auth/google'}
  style={{ ...S.btn("#ea4335", "#fff") }}
>
  <svg>...</svg>
  เข้าสู่ระบบด้วย Google
</button>
```

## ไฟล์ที่แก้ไข

1. ✅ `routes/web.php` - เพิ่ม Google OAuth routes
2. ✅ `app/Http/Controllers/GoogleAuthController.php` - เปลี่ยนเป็น redirect พร้อม token
3. ✅ `.env` - เพิ่ม `FRONTEND_URL`
4. ⏳ `resources/js/pages/forms/SurveyFormRenderer.jsx` - เพิ่ม handle OAuth callback

## การทดสอบ

1. ไปที่ `/forms/{uuid}`
2. กดปุ่ม "📊 ข้อมูลทั้งหมด"
3. ถ้ายังไม่ได้ล็อกอิน จะเห็นปุ่ม "เข้าสู่ระบบด้วย Google"
4. กดปุ่ม → Redirect ไป Google Login
5. Login สำเร็จ → Redirect กลับพร้อม token
6. Token ถูกเก็บใน localStorage
7. ตรวจสอบสิทธิ์อัตโนมัติ

## หมายเหตุสำหรับ Production

บน production server ต้อง:
1. ตั้งค่า `FRONTEND_URL` ให้ชี้ไปที่ domain จริง
   ```env
   FRONTEND_URL=https://survey.pcru.ac.th
   ```
2. Clear cache:
   ```bash
   php artisan route:clear
   php artisan config:clear
   php artisan route:cache
   ```

## API Endpoints ที่เกี่ยวข้อง

```
GET  /auth/google                    → Redirect to Google (Web Route)
GET  /auth/google/callback           → Handle Callback (Web Route)
POST /api/forms/{uuid}/access/request → Request Access (API Route)
GET  /api/forms/{uuid}/access/check   → Check Access (API Route)
```

## สรุป

- ✅ Web routes สำหรับ OAuth redirect
- ✅ API routes สำหรับ access control
- ✅ Token เก็บใน localStorage
- ✅ Frontend handle callback อัตโนมัติ
