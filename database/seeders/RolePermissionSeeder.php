<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User management
            'view users',
            'create users',
            'edit users',
            'delete users',
            'assign roles',
            
            // Role management
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'assign permissions',
            
            // Permission management
            'view permissions',
            
            // Form management
            'view forms',
            'create forms',
            'edit forms',
            'delete forms',
            'view form submissions',
            'delete form submissions',
            
            // Access requests
            'view access requests',
            'approve access requests',
            'reject access requests',
            
            // Settings
            'view settings',
            'edit settings',
            
            // Reports
            'view reports',
            'export reports',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $viewerRole = Role::firstOrCreate(['name' => 'viewer']);

        // Assign permissions to admin role (all permissions)
        $adminRole->givePermissionTo(Permission::all());

        // Assign permissions to manager role
        $managerRole->givePermissionTo([
            'view users',
            'create users',
            'edit users',
            'view roles',
            'view permissions',
            'view forms',
            'create forms',
            'edit forms',
            'delete forms',
            'view form submissions',
            'delete form submissions',
            'view access requests',
            'approve access requests',
            'reject access requests',
            'view settings',
            'edit settings',
            'view reports',
            'export reports',
        ]);

        // Assign permissions to user role
        $userRole->givePermissionTo([
            'view forms',
            'create forms',
            'edit forms',
            'delete forms',
            'view form submissions',
            'view access requests',
            'approve access requests',
            'reject access requests',
        ]);

        // Assign permissions to viewer role
        $viewerRole->givePermissionTo([
            'view forms',
            'view form submissions',
            'view reports',
        ]);

        $this->command->info('Roles and permissions seeded successfully!');
        $this->command->info('Roles created: admin, manager, user, viewer');
        $this->command->info('Permissions created: ' . count($permissions));
    }
}
