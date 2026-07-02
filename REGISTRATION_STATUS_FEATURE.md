# Registration Status Feature Documentation

## Overview
This feature allows you to manage registration period status with customizable messages via API. You can control when registration opens/closes and display appropriate messages to users.

## Features Implemented

### Backend (Laravel)

#### 1. Database Migration
- **File**: `database/migrations/2025_03_16_000001_create_registration_settings_table.php`
- Creates `registration_settings` table with key-value storage
- Includes 5 default settings:
  - `registration_enabled` - Enable/disable registration
  - `registration_start_date` - Registration start datetime
  - `registration_end_date` - Registration end datetime
  - `registration_closed_message` - Message when registration is closed
  - `registration_not_yet_message` - Message when registration hasn't started

#### 2. Model
- **File**: `app/Models/RegistrationSetting.php`
- Key methods:
  - `RegistrationSetting::get($key)` - Get setting value
  - `RegistrationSetting::set($key, $value)` - Set setting value
  - `RegistrationSetting::isRegistrationOpen()` - Check if registration is currently available
  - `RegistrationSetting::getRegistrationStatus()` - Get full status with message
  - `RegistrationSetting::getAllSettings()` - Get all settings for admin panel

#### 3. API Controller
- **File**: `app/Http/Controllers/RegistrationSettingController.php`
- Endpoints:
  - `GET /api/registration/status` - Get current registration status (public)
  - `GET /api/registration/settings` - Get all settings (authenticated)
  - `PUT /api/registration/settings/{key}` - Update specific setting (authenticated)
  - `POST /api/registration/settings/bulk-update` - Update multiple settings (authenticated)
  - `POST /api/registration/settings/refresh-cache` - Clear cache (authenticated)

#### 4. Routes
- **File**: `routes/api.php`
- Public endpoint for status checking
- Authenticated endpoints for management (requires Sanctum token)

### Frontend (React)

#### 1. Registration Form with Status
- **File**: `resources/js/pages/forms/RegisterForm.jsx`
- Features:
  - Displays registration status banner (green/orange/red)
  - Shows countdown or time information
  - Disables form fields when registration is closed
  - Changes submit button text based on status
  - Auto-refreshes status every 30 seconds

#### 2. Admin Settings Page
- **File**: `resources/js/pages/admin/RegistrationSettings.jsx`
- Features:
  - View and edit all registration settings
  - Toggle enable/disable registration
  - Set start and end dates with datetime picker
  - Edit custom messages
  - Save individual settings or bulk save
  - Live status preview
  - Cache refresh button

#### 3. Routes
- **File**: `resources/js/routes/index2.jsx`
- Added route: `/admin/registration-settings`

## Installation

### Step 1: Run Migration
Execute the SQL file in phpMyAdmin or MySQL:
```bash
mysql -u your_username -p db_surway < database/migrations/registration_settings.sql
```

Or copy-paste the SQL content directly in phpMyAdmin SQL tab.

### Step 2: Access Admin Panel
Navigate to: `http://your-domain/admin/registration-settings`

Note: You may need to add authentication to the route if not already logged in.

## API Usage Examples

### Check Registration Status (Public)
```javascript
// GET /api/registration/status
const response = await axios.get('/api/registration/status');
console.log(response.data);
// Output:
// {
//   "success": true,
//   "data": {
//     "status": "open", // or "closed", "not_started", "ended"
//     "message": "ลงทะเบียนได้ทันที",
//     "start_date": "2025-03-16 00:00:00",
//     "end_date": "2025-04-15 23:59:59"
//   }
// }
```

### Update Registration End Date (Authenticated)
```javascript
// PUT /api/registration/settings/registration_end_date
const response = await axios.put('/api/registration/settings/registration_end_date', {
  value: '2025-04-30 23:59:59'
});
```

### Bulk Update Settings (Authenticated)
```javascript
// POST /api/registration/settings/bulk-update
const response = await axios.post('/api/registration/settings/bulk-update', {
  settings: [
    { key: 'registration_enabled', value: 'true' },
    { key: 'registration_end_date', value: '2025-04-30 23:59:59' },
    { key: 'registration_closed_message', value: 'ขออภัย การลงทะเบียนได้สิ้นสุดลงแล้ว' }
  ]
});
```

## Status Types

The system returns 4 possible statuses:

1. **open** - Registration is currently active
   - Message: "ลงทะเบียนได้ทันที"
   - Form is enabled
   - Green banner

2. **closed** - Registration is disabled by admin
   - Message: Custom message from `registration_closed_message`
   - Form is disabled
   - Red banner

3. **not_started** - Current time is before `registration_start_date`
   - Message: Custom message from `registration_not_yet_message`
   - Form is disabled
   - Orange banner
   - Shows start date

4. **ended** - Current time is after `registration_end_date`
   - Message: Custom message from `registration_closed_message`
   - Form is disabled
   - Red banner
   - Shows end date

## Admin Panel Features

### Setting Types
- **Boolean**: Checkbox toggle (Enable/Disable)
- **Datetime**: Date and time picker
- **Text**: Textarea for messages
- **Number**: Numeric input

### Visual Indicators
- Green dot: Setting is active/enabled
- Red dot: Setting is disabled
- Status preview section shows current configuration

## Customization

### Change Default Messages
Edit the values in database or use admin panel:
```sql
UPDATE registration_settings 
SET value = 'Your custom message here' 
WHERE key = 'registration_closed_message';
```

### Adjust Auto-refresh Interval
In `RegisterForm.jsx`, change the interval:
```javascript
const interval = setInterval(() => {
  loadCounts()
}, 30000) // Change 30000 to desired milliseconds
```

### Add More Settings
1. Add new record to `registration_settings` table
2. Update `RegistrationSetting` model if needed
3. Add UI in `RegistrationSettings.jsx` component

## Cache Management

The system uses Laravel cache for better performance. Cache is automatically cleared when:
- Settings are updated
- Bulk update is performed
- Manual refresh via admin panel

Manual cache clear:
```bash
POST /api/registration/settings/refresh-cache
```

## Troubleshooting

### Issue: Settings not updating
**Solution**: Clear cache via admin panel or API

### Issue: Form still enabled when closed
**Solution**: Check if `registration_status` API is accessible and returning correct status

### Issue: Database connection error
**Solution**: Check `.env` file for correct database credentials and run the SQL migration file

## Security Notes

- All management endpoints require Sanctum authentication
- Public can only check status (read-only)
- Consider adding role-based access control for admin panel
- Validate all inputs server-side (already implemented)

## Future Enhancements

Possible improvements:
- Email notifications when registration is about to close
- Quota management per department/role
- Registration analytics dashboard
- Export registration data
- Multi-language support for messages
