<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    /**
     * Display a listing of permissions.
     */
    public function index(Request $request)
    {
        $query = Permission::with('roles')->latest();

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        // Filter by group (e.g., 'view', 'create', 'edit', 'delete')
        if ($request->filled('group')) {
            $group = $request->group;
            $query->where('name', 'like', "{$group}%");
        }

        $permissions = $query->paginate($request->per_page ?? 50);

        return response()->json([
            'success' => true,
            'data' => $permissions->items(),
            'meta' => [
                'current_page' => $permissions->currentPage(),
                'last_page' => $permissions->lastPage(),
                'per_page' => $permissions->perPage(),
                'total' => $permissions->total(),
            ],
        ]);
    }

    /**
     * Store a newly created permission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions'],
        ]);

        $permission = Permission::create(['name' => $validated['name']]);

        return response()->json([
            'success' => true,
            'message' => 'Permission created successfully',
            'data' => $permission,
        ], 201);
    }

    /**
     * Display the specified permission.
     */
    public function show(Permission $permission)
    {
        $permission->load('roles');

        return response()->json([
            'success' => true,
            'data' => $permission,
        ]);
    }

    /**
     * Update the specified permission.
     */
    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255', 'unique:permissions,name,' . $permission->id],
        ]);

        if (isset($validated['name'])) {
            $permission->name = $validated['name'];
            $permission->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Permission updated successfully',
            'data' => $permission->fresh(),
        ]);
    }

    /**
     * Remove the specified permission.
     */
    public function destroy(Permission $permission)
    {
        // Check if permission is assigned to any roles
        if ($permission->roles()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete permission assigned to roles',
            ], 422);
        }

        $permission->delete();

        return response()->json([
            'success' => true,
            'message' => 'Permission deleted successfully',
        ]);
    }

    /**
     * Get all permissions grouped by type.
     */
    public function grouped()
    {
        $allPermissions = Permission::with('roles')->get();

        $grouped = [
            'users' => $allPermissions->filter(fn($p) => str_contains($p->name, 'users')),
            'roles' => $allPermissions->filter(fn($p) => str_contains($p->name, 'roles')),
            'permissions' => $allPermissions->filter(fn($p) => str_contains($p->name, 'permissions')),
            'forms' => $allPermissions->filter(fn($p) => str_contains($p->name, 'forms')),
            'access_requests' => $allPermissions->filter(fn($p) => str_contains($p->name, 'access requests')),
            'settings' => $allPermissions->filter(fn($p) => str_contains($p->name, 'settings')),
            'reports' => $allPermissions->filter(fn($p) => str_contains($p->name, 'reports')),
            'other' => $allPermissions->filter(fn($p) => 
                !str_contains($p->name, 'users') &&
                !str_contains($p->name, 'roles') &&
                !str_contains($p->name, 'permissions') &&
                !str_contains($p->name, 'forms') &&
                !str_contains($p->name, 'access requests') &&
                !str_contains($p->name, 'settings') &&
                !str_contains($p->name, 'reports')
            ),
        ];

        return response()->json([
            'success' => true,
            'data' => $grouped,
        ]);
    }

    /**
     * Sync permissions with roles.
     */
    public function syncWithRoles(Request $request)
    {
        $validated = $request->validate([
            'permission' => ['required', 'exists:permissions,name'],
            'roles' => ['required', 'array'],
            'roles.*' => ['exists:roles,name'],
        ]);

        $permission = Permission::firstWhere('name', $validated['permission']);
        $roles = Role::whereIn('name', $validated['roles'])->get();

        foreach ($roles as $role) {
            $role->givePermissionTo($permission);
        }

        return response()->json([
            'success' => true,
            'message' => 'Permission synced with roles successfully',
            'data' => [
                'permission' => $permission->fresh(),
                'roles' => $roles,
            ],
        ]);
    }
}
