<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        // Create default admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@pcru.ac.th'],
            [
                'name' => 'System Administrator',
                'password' => Hash::make('admin123'),
                'user_type' => 'internal',
                'is_internal' => true,
                'phone' => '081-234-5678',
                'department' => 'IT',
                'position' => 'System Administrator',
            ]
        );

        // Assign admin role
        $admin->syncRoles([$adminRole]);

        $this->command->info('Admin user created successfully!');
        $this->command->info('Email: admin@pcru.ac.th');
        $this->command->info('Password: admin123');
        $this->command->warn('Please change the default password after first login!');
    }
}
