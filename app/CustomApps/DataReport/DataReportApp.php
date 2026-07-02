<?php

namespace App\CustomApps\DataReport;

use App\CustomApps\CustomApp;

class DataReportApp extends CustomApp
{
    protected string $name = 'data-report';

    protected string $description = 'สร้างรายงานและ Export ข้อมูลจากระบบ';

    protected string $version = '1.0.0';

    protected string $icon = 'assessment';

    public function registerRoutes(): void
    {
        //
    }

    public function menu(): array
    {
        return [
            ['label' => 'รายงาน', 'route' => 'app.data-report.index'],
            ['label' => 'Export CSV', 'route' => 'app.data-report.export'],
            ['label' => 'ประวัติ', 'route' => 'app.data-report.history'],
        ];
    }
}
