# User Role & Permission Management System

## Overview

This guide covers the complete implementation of the User Role and Permission Management system using Spatie Laravel Permission package.

## Features

- **User Management**: Create, edit, delete users and assign roles
- **Role Management**: Create, edit, delete roles and assign permissions
- **Permission Management**: Create, edit, delete permissions
- **Access Control**: Middleware-based protection for routes
- **React UI**: Full-featured admin interface with Ant Design

## Installation & Setup

### 1. Run Migrations

Ensure the permission tables are created:

```bash
php artisan migrate
```

### 2. Seed Roles and Permissions

Seed the database with default roles and permissions:

```bash
php artisan db:seed --class=RolePermissionSeeder
php artisan db:seed --class=AdminUserSeeder
```

### Default Admin Credentials

- **Email**: `admin@pcru.ac.th`
- **Password**: `admin123`

> ⚠️ **Important**: Change the default password after first login!

## Default Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **admin** | Full system access | All permissions |
| **manager** | Management access | Most permissions except role/permission management |
| **user** | Standard user | Basic form management |
| **viewer** | Read-only access | View forms and reports |

## Permissions List

### User Management
- `view users` - View user list
- `create users` - Create new users
- `edit users` - Edit user details
- `delete users` - Delete users
- `assign roles` - Assign roles to users

### Role Management
- `view roles` - View roles
- `create roles` - Create new roles
- `edit roles` - Edit roles
- `delete roles` - Delete roles
- `assign permissions` - Assign permissions to roles

### Permission Management
- `view permissions` - View permissions

### Form Management
- `view forms` - View forms
- `create forms` - Create forms
- `edit forms` - Edit forms
- `delete forms` - Delete forms
- `view form submissions` - View form submissions
- `delete form submissions` - Delete submissions

### Access Requests
- `view access requests` - View access requests
- `approve access requests` - Approve requests
- `reject access requests` - Reject requests

### Settings
- `view settings` - View settings
- `edit settings` - Edit settings

### Reports
- `view reports` - View reports
- `export reports` - Export reports

## API Endpoints

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List users |
| POST | `/api/admin/users` | Create user |
| GET | `/api/admin/users/{id}` | Get user details |
| PUT | `/api/admin/users/{id}` | Update user |
| DELETE | `/api/admin/users/{id}` | Delete user |
| POST | `/api/admin/users/{id}/roles` | Assign roles |
| DELETE | `/api/admin/users/{id}/roles` | Remove role |
| GET | `/api/admin/users/{id}/permissions` | Get user permissions |

### Role Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/roles` | List roles |
| POST | `/api/admin/roles` | Create role |
| GET | `/api/admin/roles/{id}` | Get role details |
| PUT | `/api/admin/roles/{id}` | Update role |
| DELETE | `/api/admin/roles/{id}` | Delete role |
| GET | `/api/admin/roles/{id}/permissions` | Get role permissions |
| POST | `/api/admin/roles/{id}/permissions` | Assign permissions |
| DELETE | `/api/admin/roles/{id}/permissions` | Remove permission |
| GET | `/api/admin/roles/{id}/users` | Get users with role |

### Permission Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/permissions` | List permissions |
| POST | `/api/admin/permissions` | Create permission |
| GET | `/api/admin/permissions/{id}` | Get permission details |
| PUT | `/api/admin/permissions/{id}` | Update permission |
| DELETE | `/api/admin/permissions/{id}` | Delete permission |
| GET | `/api/admin/permissions/grouped` | Get grouped permissions |

## Frontend Routes

Access the management pages through the admin panel:

- **Users Management**: `/admin/users`
- **Roles Management**: `/admin/roles`
- **Permissions Management**: `/admin/permissions`

## Usage Examples

### Assign Role to User (Programmatically)

```php
use App\Models\User;
use Spatie\Permission\Models\Role;

$user = User::find($userId);
$user->assignRole('admin');

// Assign multiple roles
$user->syncRoles(['admin', 'manager']);
```

### Check User Permission

```php
// In controller
if ($user->can('edit users')) {
    // User has permission
}

// In middleware
Route::middleware(['permission:edit users'])->group(function () {
    // Protected routes
});
```

### Check User Role

```php
// In controller
if ($user->hasRole('admin')) {
    // User is admin
}

// In middleware
Route::middleware(['role:admin|manager'])->group(function () {
    // Protected routes
});
```

## Middleware

Two middleware are available for protection:

### Role Middleware

```php
// Single role
Route::middleware(['role:admin'])->group(function () {
    // ...
});

// Multiple roles (OR)
Route::middleware(['role:admin|manager'])->group(function () {
    // ...
});
```

### Permission Middleware

```php
// Single permission
Route::middleware(['permission:edit users'])->group(function () {
    // ...
});

// Multiple permissions (OR)
Route::middleware(['permission:edit users|delete users'])->group(function () {
    // ...
});
```

## File Structure

### Backend

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Admin/
│   │       ├── UserController.php
│   │       ├── RoleController.php
│   │       └── PermissionController.php
│   └── Middleware/
│       ├── RoleMiddleware.php
│       └── PermissionMiddleware.php
└── Models/
    └── User.php (uses HasRoles trait)

database/
└── seeders/
    ├── RolePermissionSeeder.php
    └── AdminUserSeeder.php

routes/
└── api.php (admin routes)
```

### Frontend

```
resources/js/
├── pages/admin/
│   ├── UsersManagement.jsx
│   ├── RolesManagement.jsx
│   └── PermissionsManagement.jsx
├── components/Layouts/
│   └── AdminLayout.jsx (updated navigation)
└── routes.jsx (admin routes)
```

## Security Considerations

1. **Password Policy**: Minimum 8 characters for user passwords
2. **Role Protection**: Admin routes require `admin` or `manager` role
3. **Self-Deletion Prevention**: Cannot delete your own account
4. **Last Admin Protection**: Cannot delete the last admin user
5. **Protected Roles**: Cannot delete critical roles (admin, super-admin)

## Troubleshooting

### Permission Not Working

1. Clear permission cache:
```bash
php artisan cache:forget spatie.permission.cache
```

2. Re-seed permissions:
```bash
php artisan db:seed --class=RolePermissionSeeder
```

### User Cannot Access Admin Panel

1. Ensure user has `admin` or `manager` role
2. Check user is marked as `internal`
3. Verify token is valid in localStorage

### Routes Not Found

1. Clear route cache:
```bash
php artisan route:clear
```

2. Verify routes are registered:
```bash
php artisan route:list --path=admin
```

## Future Enhancements

- [ ] Role hierarchy support
- [ ] Permission groups/categories
- [ ] Audit logging for role/permission changes
- [ ] Bulk user role assignment
- [ ] Export user/role/permission reports
- [ ] Two-factor authentication for admin users

## Support

For issues or questions, please refer to:
- [Spatie Laravel Permission Documentation](https://spatie.be/docs/laravel-permission)
- Laravel Documentation: [Authorization](https://laravel.com/docs/authorization)
