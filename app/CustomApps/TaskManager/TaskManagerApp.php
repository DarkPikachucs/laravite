<?php

namespace App\CustomApps\TaskManager;

use App\CustomApps\CustomApp;

class TaskManagerApp extends CustomApp
{
    protected string $name = 'task-manager';

    protected string $description = 'จัดการงานและติดตามความคืบหน้าสำหรับโปรเจกต์เฉพาะกิจ';

    protected string $version = '1.0.0';

    protected string $icon = 'assignment';

    public function registerRoutes(): void
    {
        //
    }

    public function menu(): array
    {
        return [
            ['label' => 'ทั้งหมด', 'route' => 'app.task-manager.index'],
            ['label' => 'สร้างงาน', 'route' => 'app.task-manager.create'],
            ['label' => 'ติดตาม', 'route' => 'app.task-manager.progress'],
        ];
    }
}
