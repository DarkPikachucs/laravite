<?php

namespace App\CustomApps\Plan14;

use App\CustomApps\CustomApp;

class Plan14App extends CustomApp
{
    protected string $name = 'plan14';

    protected string $description = 'แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ ฉบับที่ 14 - Strategic Linkage Diagram';

    protected string $version = '1.0.0';

    protected string $icon = 'account_tree';

    public function registerRoutes(): void
    {
        //
    }

    public function menu(): array
    {
        return [
            ['label' => 'Dashboard', 'route' => 'app.plan14.index'],
        ];
    }
}
