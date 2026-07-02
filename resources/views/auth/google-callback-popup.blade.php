<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>กำลังล็อกอิน...</title>
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
        .success {
            color: #10b981;
            font-size: 48px;
            margin-bottom: 16px;
        }
        .error {
            color: #ef4444;
            font-size: 48px;
            margin-bottom: 16px;
        }
        h2 {
            margin: 0 0 10px;
            color: #1e293b;
        }
        p {
            color: #64748b;
            margin: 0;
        }
        .badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
        }
        .badge-internal {
            background: #dcfce7;
            color: #166534;
        }
        .badge-external {
            background: #fef3c7;
            color: #92400e;
        }
    </style>
</head>
<body>
    @if(isset($error))
        <div class="container">
            <div class="error">❌</div>
            <h2>ล็อกอินไม่สำเร็จ</h2>
            <p>{{ $error }}</p>
        </div>
        <script>
            // Close popup after 3 seconds
            setTimeout(() => {
                window.close();
            }, 3000);
        </script>
    @else
        <div class="container">
            <div class="spinner"></div>
            <h2>กำลังล็อกอิน...</h2>
            <p>กรุณารอสักครู่</p>
            
            @if(isset($is_internal))
                <div class="badge {{ $is_internal ? 'badge-internal' : 'badge-external' }}">
                    {{ $is_internal ? '🏢 ผู้ใช้ภายใน (PCRU)' : '🌐 ผู้ใช้ภายนอก' }}
                </div>
            @endif
        </div>
        
        <script>
            console.log('Popup callback - is_new_user:', {{ $is_new_user ? 'true' : 'false' }});
            console.log('Popup callback - token:', '{{ $token }}');
            console.log('Popup callback - user_id:', '{{ $user_id }}');
            
            // Send token to opener window
            if (window.opener && !window.opener.closed) {
                // Store token in localStorage of opener
                window.opener.localStorage.setItem('currentToken', '{{ $token }}');

                // Store user info
                window.opener.localStorage.setItem('userId', '{{ $user_id }}');
                window.opener.localStorage.setItem('isInternal', '{{ $is_internal ? 'true' : 'false' }}');
                window.opener.localStorage.setItem('isNewUser', '{{ $is_new_user ? 'true' : 'false' }}');

                console.log('Sending event to opener with is_new_user:', {{ $is_new_user ? 'true' : 'false' }});

                // Trigger a custom event in opener to notify login success
                const event = new window.opener.CustomEvent('google-login-success', {
                    detail: {
                        token: '{{ $token }}',
                        user_id: '{{ $user_id }}',
                        is_internal: {{ $is_internal ? 'true' : 'false' }},
                        is_new_user: {{ $is_new_user ? 'true' : 'false' }}
                    }
                });
                window.opener.dispatchEvent(event);
                console.log('Event dispatched successfully');
            } else {
                console.error('Window opener is not available or already closed');
            }

            // Close popup after 1 second
            setTimeout(() => {
                window.close();
            }, 1000);
        </script>
    @endif
</body>
</html>
