# Dynamic Form Builder System

## Overview
A complete Google Forms-like system that allows administrators to create, manage, and distribute custom forms with dynamic fields. All form structures are stored as JSON schemas, and submissions are stored in a structured format for easy viewing and export.

## Features

### 🎨 Form Builder (Admin)
- **Visual Drag-and-Drop Interface** - Build forms with an intuitive UI
- **12 Field Types**:
  - Text (ข้อความสั้น)
  - Textarea (ข้อความยาว)
  - Number (ตัวเลข)
  - Email (อีเมล)
  - Phone (เบอร์โทร)
  - Date (วันที่)
  - DateTime (วันที่และเวลา)
  - Select/Dropdown (ตัวเลือกเดียว)
  - Radio (ตัวเลือกเดียว)
  - Checkbox (หลายตัวเลือก)
  - URL
  - File Upload
- **Field Settings**:
  - Required/Optional toggle
  - Placeholder text
  - Help text
  - Min/Max validation
  - Custom options for select/radio/checkbox
- **Form Settings**:
  - Custom theme color
  - Collect respondent info (name, email, phone)
  - Allow multiple submissions
  - Custom confirmation message
  - Redirect URL after submission
  - Show/hide progress bar
- **Form Management**:
  - Publish/Unpublish
  - Schedule start and end dates
  - Duplicate forms
  - Preview before publishing

### 📝 Dynamic Form Renderer (Public)
- **Responsive Design** - Works on all devices
- **Real-time Validation** - Client-side validation with Thai messages
- **Progress Indicator** - Shows completion status
- **Custom Theming** - Matches form creator's brand color
- **Success Page** - Custom confirmation with optional redirect

### 📊 Submissions Viewer (Admin)
- **Data Table** - View all submissions in organized table
- **Filtering**:
  - Search by name, email, phone
  - Filter by read/unread status
  - Date range filtering
- **Detail View Modal** - See complete submission details
- **Admin Notes** - Add internal notes to submissions
- **Export to CSV** - Download all responses for analysis
- **Statistics** - View submission counts and trends
- **Pagination** - Handle large datasets efficiently

## Database Structure

### Tables

#### 1. `forms`
Stores form definitions and schemas
```sql
- id: Primary key
- uuid: Unique identifier (for public URLs)
- title: Form title
- description: Form description
- schema: JSON - Form structure and fields
- settings: JSON - Form configuration
- is_active: Boolean - Publish status
- published_at: Timestamp - When form goes live
- expires_at: Timestamp - When form closes
- created_by: Foreign key to users
```

#### 2. `form_submissions`
Stores individual form responses
```sql
- id: Primary key
- form_id: Foreign key to forms
- responses: JSON - All field responses
- respondent_name: Optional respondent name
- respondent_email: Optional respondent email
- respondent_phone: Optional respondent phone
- ip_address: Submitter's IP
- user_agent: Browser information
- is_read: Boolean - Admin viewed status
- admin_notes: Text - Internal notes
```

#### 3. `form_analytics`
Tracks form interactions
```sql
- id: Primary key
- form_id: Foreign key to forms
- event_type: view, start, submit, abandon
- metadata: JSON - Additional data
- ip_address: Visitor's IP
```

## Installation

### Step 1: Run Database Migration

Execute the SQL file in phpMyAdmin:
```bash
# Option 1: Using MySQL CLI
mysql -u username -p database_name < database/migrations/forms_and_submissions.sql

# Option 2: Copy-paste content from forms_and_submissions.sql into phpMyAdmin SQL tab
```

### Step 2: Install Frontend Dependencies
```bash
npm install uuid
```

### Step 3: Build Frontend
```bash
npm run build
# or for development
npm run dev
```

## Usage Guide

### Creating a Form (Admin)

1. **Navigate to Forms Management**
   - Go to `/admin/forms`
   - Click "➕ สร้างแบบฟอร์มใหม่"

2. **Add Form Information**
   - Enter form title
   - Add description (optional)
   - Set start and end dates (optional)

3. **Build Form Fields**
   - Click on any field type from the left panel
   - Configure field settings:
     - Label (required)
     - Placeholder text
     - Help text
     - Required toggle
     - Min/Max values (for number/text)
     - Options (for select/radio/checkbox)
   - Reorder fields using up/down arrows
   - Duplicate or delete fields as needed

4. **Configure Form Settings**
   - Theme color
   - Collect respondent information
   - Allow multiple submissions
   - Custom confirmation message
   - Redirect URL after submission

5. **Preview and Publish**
   - Click "👁️ พรีวิว" to test the form
   - Click "📢 เผยแพร่" to make it live
   - Copy the form URL to share with respondents

### Sharing Forms

Public form URL format:
```
https://your-domain.com/forms/{form-uuid}
```

Example: `https://your-domain.com/forms/550e8400-e29b-41d4-a716-446655440000`

### Viewing Submissions (Admin)

1. **Access Submissions**
   - Go to `/admin/forms`
   - Find your form
   - Click "📋 ดูคำตอบ"

2. **Filter and Search**
   - Use search box to find specific respondents
   - Filter by read/unread status
   - Set date range for submissions

3. **View Details**
   - Click on any submission row
   - See all responses
   - View respondent information
   - Add admin notes
   - Mark as read/unread

4. **Export Data**
   - Click "📥 ส่งออก CSV"
   - File downloads with all responses
   - Open in Excel or Google Sheets

## API Endpoints

### Public Endpoints (No Authentication)

#### Get Form for Filling
```http
GET /api/forms/{uuid}/fill
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "title": "แบบฟอร์มลงทะเบียน",
    "description": "กรุณากรอกข้อมูลให้ครบถ้วน",
    "schema": {
      "fields": [...],
      "settings": {...}
    }
  }
}
```

#### Submit Form
```http
POST /api/forms/{uuid}/submit
Content-Type: application/json

{
  "responses": {
    "field-id-1": "value1",
    "field-id-2": "value2"
  },
  "respondent_name": "John Doe",
  "respondent_email": "john@example.com",
  "respondent_phone": "0812345678"
}
```

### Authenticated Endpoints (Requires Sanctum Token)

#### List All Forms
```http
GET /api/forms?status=active&search=keyword&page=1
```

#### Create Form
```http
POST /api/forms
Content-Type: application/json

{
  "title": "New Form",
  "description": "Form description",
  "schema": "{\"fields\": [...]}",
  "settings": "{\"theme_color\": \"#3B82F6\"}",
  "is_active": false
}
```

#### Update Form
```http
PUT /api/forms/{uuid}
Content-Type: application/json

{
  "title": "Updated Form Title",
  "schema": "{\"fields\": [...]}"
}
```

#### Delete Form
```http
DELETE /api/forms/{uuid}
```

#### Duplicate Form
```http
POST /api/forms/{uuid}/duplicate
```

#### Publish Form
```http
POST /api/forms/{uuid}/publish
Content-Type: application/json

{
  "published_at": "2025-03-16 00:00:00"
}
```

#### Get Form Statistics
```http
GET /api/forms/{uuid}/stats
```

#### Get Submissions
```http
GET /api/forms/{uuid}/submissions?page=1&read=false&search=john
```

#### Get Submission Detail
```http
GET /api/forms/{uuid}/submissions/{submissionId}
```

#### Add Note to Submission
```http
POST /api/forms/{uuid}/submissions/{submissionId}/notes
Content-Type: application/json

{
  "note": "Follow up required"
}
```

#### Delete Submission
```http
DELETE /api/forms/{uuid}/submissions/{submissionId}
```

#### Export Submissions to CSV
```http
GET /api/forms/{uuid}/submissions/export
```

## JSON Schema Format

### Form Schema Example
```json
{
  "fields": [
    {
      "id": "unique-field-id",
      "type": "text",
      "label": "ชื่อ-นามสกุล",
      "placeholder": "กรุณากรอกชื่อของคุณ",
      "required": true,
      "help_text": "กรอกชื่อจริงและนามสกุล",
      "min": null,
      "max": null,
      "validation_message": ""
    },
    {
      "id": "email-field-id",
      "type": "email",
      "label": "อีเมล",
      "placeholder": "example@email.com",
      "required": true,
      "help_text": "",
      "min": null,
      "max": null,
      "validation_message": ""
    },
    {
      "id": "options-field-id",
      "type": "select",
      "label": "หน่วยงาน",
      "required": false,
      "options": [
        "คณะครุศาสตร์",
        "คณะมนุษยศาสตร์",
        "คณะวิทยาการจัดการ"
      ]
    }
  ],
  "settings": {
    "show_progress_bar": true,
    "require_login": false,
    "allow_multiple_submissions": true,
    "show_confirmation": true,
    "confirmation_message": "ขอบคุณที่ส่งแบบฟอร์ม",
    "collect_email": "optional",
    "collect_phone": false,
    "collect_name": "optional",
    "theme_color": "#3B82F6",
    "redirect_url": null
  }
}
```

## Field Types Reference

| Type | Description | Validation Options |
|------|-------------|-------------------|
| `text` | Short text input | min, max (length) |
| `textarea` | Long text input | min, max (length) |
| `number` | Numeric input | min, max (value) |
| `email` | Email input | Email format |
| `tel` | Phone number | String |
| `date` | Date picker | - |
| `datetime-local` | Date and time picker | - |
| `select` | Dropdown selection | options array |
| `radio` | Single choice radio | options array |
| `checkbox` | Multiple choice checkboxes | options array |
| `url` | URL input | URL format |
| `file` | File upload | - |

## Features Comparison with Google Forms

| Feature | This System | Google Forms |
|---------|-------------|--------------|
| Form Builder | ✅ | ✅ |
| Multiple Field Types | ✅ (12 types) | ✅ (10+ types) |
| Required Fields | ✅ | ✅ |
| Validation | ✅ | ✅ |
| Custom Themes | ✅ (color) | ✅ (themes) |
| Collect Email | ✅ | ✅ |
| Export to CSV | ✅ | ✅ |
| Response Analytics | ✅ Basic | ✅ Advanced |
| Collaboration | ❌ | ✅ |
| Logic Branching | ❌ | ✅ |
| File Upload | ✅ (UI ready) | ✅ |
| Self-Hosted | ✅ | ❌ |

## Security Considerations

1. **Authentication**: All admin endpoints require Sanctum authentication
2. **CSRF Protection**: Laravel's built-in CSRF protection
3. **Input Validation**: Server-side validation for all submissions
4. **SQL Injection**: Protected by Eloquent ORM
5. **XSS Prevention**: Laravel's automatic escaping
6. **Rate Limiting**: Consider adding rate limiting for public form endpoints

## Customization

### Change Default Theme Color
In form settings, modify `theme_color` value (hex color code)

### Add Custom Field Type
1. Add field type to `fieldTypes` array in `FormBuilder.jsx`
2. Add renderer in `DynamicFormRenderer.jsx`
3. Add validation rules in `FormSubmissionController.php`

### Customize Validation Messages
Edit Thai validation messages in `DynamicFormRenderer.jsx`

### Add Export Formats
Extend `export()` method in `FormSubmissionController.php` to support Excel, PDF, etc.

## Troubleshooting

### Issue: Form not saving
**Solution**: Check that schema JSON is valid. Use JSONLint to validate.

### Issue: Submissions not showing
**Solution**: Clear browser cache and check API endpoint accessibility.

### Issue: CSV export empty
**Solution**: Ensure there are submissions and proper permissions.

### Issue: Fields not validating
**Solution**: Check field `required` property and validation rules in controller.

## Future Enhancements

Potential improvements:
- [ ] Logic branching (show/hide fields based on answers)
- [ ] File upload handling with cloud storage
- [ ] Email notifications on submission
- [ ] Form templates library
- [ ] Collaborative form editing
- [ ] Advanced analytics dashboard
- [ ] Multi-language forms
- [ ] Form versioning
- [ ] A/B testing for forms
- [ ] Custom CSS/JS injection
- [ ] Webhook integrations
- [ ] API rate limiting
- [ ] Spam protection (reCAPTCHA)

## Support

For issues or questions:
1. Check this documentation first
2. Review API endpoint responses for error messages
3. Check Laravel logs: `storage/logs/laravel.log`
4. Check browser console for frontend errors
