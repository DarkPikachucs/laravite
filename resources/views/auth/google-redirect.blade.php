<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>กำลังเปลี่ยนหน้า...</title>
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
            box-shadow: 0 8px 30px rgba(0,0,0,0.2);
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
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
        <h2>กำลังเปลี่ยนหน้า...</h2>
        <p>กรุณารอสักครู่</p>
    </div>

    <script>
        // Parse the redirect URL to extract token and user info
        const redirectUrl = @json($redirectUrl);
        const urlParts = redirectUrl.split('?');
        const basePath = urlParts[0];
        const queryString = urlParts[1] || '';
        
        // Extract token and user info from query string
        const urlParams = new URLSearchParams(queryString);
        const googleToken = urlParams.get('google_token');
        const userId = urlParams.get('user_id');
        const isInternal = urlParams.get('is_internal');
        const isNewUser = urlParams.get('is_new_user');

        // Store token and user info in localStorage for React app to use
        if (googleToken) {
            localStorage.setItem('currentToken', googleToken);
            // Set axios default authorization header
            if (window.axios) {
                window.axios.defaults.headers.common['Authorization'] = `Bearer ${googleToken}`;
            }
        }
        if (userId) {
            localStorage.setItem('userId', userId);
        }
        if (isInternal) {
            localStorage.setItem('isInternal', isInternal);
        }
        if (isNewUser) {
            localStorage.setItem('isNewUser', isNewUser);
        }

        // Build clean URL without google_token params (they're now in localStorage)
        // But keep other query params (like form UUID) if present
        const otherParams = new URLSearchParams();
        for (const [key, value] of urlParams.entries()) {
            if (!['google_token', 'user_id', 'is_internal', 'is_new_user'].includes(key)) {
                otherParams.append(key, value);
            }
        }
        
        let finalUrl = basePath;
        const otherParamsString = otherParams.toString();
        if (otherParamsString) {
            finalUrl += '?' + otherParamsString;
        }

        // Redirect to the target page
        console.log('[google-redirect] Redirecting to:', finalUrl);
        window.location.replace(finalUrl);
    </script>
</body>
</html>
