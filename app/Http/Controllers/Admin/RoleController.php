<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of roles.
     */
    public function index(Request $request)
    {
        $query = Role::with('permissions')->latest();

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        $roles = $query->paginate($request->per_page ?? 10);

        return response()->json([
            'success' => true,
            'data' => $roles->items(),
            'meta' => [
                'current_page' => $roles->currentPage(),
                'last_page' => $roles->lastPage(),
                'per_page' => $roles->perPage(),
                'total' => $roles->total(),
            ],
        ]);
    }

    /**
     * Store a newly created role.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles'],
            'permissions' => ['array'],
            'permissions.*' => ['exists:permissions,name'],
        ]);

        $role = Role::create(['name' => $validated['name']]);

        // Assign permissions
        if (!empty($validated['permissions'])) {
            $role->givePermissionTo($validated['permissions']);
        }

        return response()->json([
            'success' => true,
            'message' => 'Role created successfully',
            'data' => $role->load('permissions'),
        ], 201);
    }

    /**
     * Display the specified role.
     */
    public function show(Role $role)
    {
        $role->load('permissions', 'users');

        return response()->json([
            'success' => true,
            'data' => $role,
        ]);
    }

    /**
     * Update the specified role.
     */
    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255', 'unique:roles,name,' . $role->id],
            'permissions' => ['array'],
            'permissions.*' => ['exists:permissions,name'],
        ]);

        // Update role name
        if (isset($validated['name'])) {
            $role->name = $validated['name'];
            $role->save();
        }

        // Update permissions
        if (isset($validated['permissions'])) {
            $role->syncPermissions($validated['permissions']);
        }

        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully',
            'data' => $role->fresh()->load('permissions'),
        ]);
    }

    /**
     * Remove the specified role.
     */
    public function destroy(Role $role)
    {
        // Prevent deleting critical roles
        $protectedRoles = ['admin', 'super-admin'];
        if (in_array($role->name, $protectedRoles)) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete protected role: ' . $role->name,
            ], 422);
        }

        // Check if role has users
        if ($role->users()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete role with assigned users',
            ], 422);
        }

        $role->delete();

        return response()->json([
            'success' => true,
            'message' => 'Role deleted successfully',
        ]);
    }

    /**
     * Get all permissions for role.
     */
    public function permissions(Role $role)
    {
        $permissions = $role->permissions;

        return response()->json([
            'success' => true,
            'data' => $permissions,
        ]);
    }

    /**
     * Assign permissions to role.
     */
    public function assignPermissions(Request $request, Role $role)
    {
        $validated = $request->validate([
            'permissions' => ['required', 'array'],
            'permissions.*' => ['exists:permissions,name'],
        ]);

        $role->syncPermissions($validated['permissions']);

        return response()->json([
            'success' => true,
            'message' => 'Permissions assigned successfully',
            'data' => $role->fresh()->load('permissions'),
        ]);
    }

    /**
     * Remove permission from role.
     */
    public function removePermission(Request $request, Role $role)
    {
        $validated = $request->validate([
            'permission' => ['required', 'exists:permissions,name'],
        ]);

        $role->revokePermissionTo($validated['permission']);

        return response()->json([
            'success' => true,
            'message' => 'Permission removed successfully',
            'data' => $role->fresh()->load('permissions'),
        ]);
    }

    /**
     * Get users with role.
     */
    public function users(Role $role)
    {
        $users = $role->users()->with('roles')->get();

        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }
}
