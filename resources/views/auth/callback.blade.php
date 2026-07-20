<!DOCTYPE html>
<html lang="th">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>เข้าสู่ระบบสำเร็จ...</title>
  <style>
    body {
      font-family: 'Sarabun', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .container {
      text-align: center;
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
      max-width: 400px;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    h2 {
      margin: 0 0 10px;
      color: #1e293b;
    }

    p {
      color: #64748b;
      margin: 0;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="spinner"></div>
    <h2>เข้าสู่ระบบสำเร็จ</h2>
    <p>กำลังพากลับไปยังระบบ...</p>
  </div>

  <script>
    // Data from Controller
        const token = @json($token);
        const userId = @json($user_id);
        const userObj = @json($user);
        const isNewUser = @json($is_new_user);
        const isInternal = @json($is_internal);
        const redirect_url = @json($redirect_url);

        // Store token and user info in localStorage for React app to use
        if (token) {
            localStorage.setItem('currentToken', token);
        }
        if (userObj) {
            localStorage.setItem('user', JSON.stringify(userObj));
        }
        if (userId) {
            localStorage.setItem('userId', userId);
        }
        
        localStorage.setItem('isInternal', isInternal ? 'true' : 'false');
        localStorage.setItem('isNewUser', isNewUser ? 'true' : 'false');
        
        const from = @json($from);
        
        let finalUrl = (redirect_url && redirect_url !== '/dashboard') 
            ? redirect_url 
            : (isNewUser ? '/profile/setup' : '/dashboard');
            
        if (token) {
            const sep = finalUrl.includes('?') ? '&' : '?';
            finalUrl = finalUrl + sep + 'sso_token=' + token;
        }

        if (from === 'popup') {
            if (window.opener && !window.opener.closed) {
                window.opener.postMessage({
                    type: 'keycloak-login-success',
                    token: token,
                    user: userObj,
                    user_id: userId,
                    is_internal: isInternal,
                    is_new_user: isNewUser
                }, '*');
            }
            setTimeout(() => {
                window.close();
                // If it fails to close (not a popup despite from=popup), redirect
                setTimeout(() => {
                    console.log('[keycloak-callback] Redirecting to:', finalUrl);
                    window.location.replace(finalUrl);
                }, 200);
            }, 500);
        } else {
            console.log('[keycloak-callback] Redirecting to:', finalUrl);
            window.location.replace(finalUrl);
        }
  </script>
</body>

</html>