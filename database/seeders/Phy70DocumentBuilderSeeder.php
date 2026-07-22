<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Phy70DocumentBuilderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \Modules\Phy70\Models\Phy70DocumentBuilder::updateOrCreate(
            ['name' => 'แบบ จ.1'],
            [
                'input_schema' => [
                    'main_project_name' => [
                        'type' => 'string',
                        'label' => 'ชื่อโครงการสำคัญ (แผนงาน)'
                    ],
                    'proposals' => [
                        'type' => 'array',
                        'label' => 'เลือกโครงการที่จะ Map'
                    ]
                ],
                'output_schema' => [
                    'document_title' => 'แบบฟอร์มสรุปแผนงานและโครงการสำคัญของจังหวัด (พ.ศ. 2571 - 2575)',
                    'form_type' => 'แบบ จ.1',
                    'province' => 'เพชรบูรณ์',
                    'development_goal' => 'เป้าหมายการพัฒนาจังหวัด...',
                    'columns' => [
                        ['key' => 'issue', 'label' => 'ประเด็นการพัฒนา'],
                        ['key' => 'kpi', 'label' => 'ตัวชี้วัดของประเด็นการพัฒนา'],
                        ['key' => 'base_value', 'label' => 'ค่าฐาน'],
                        ['key' => 'target_2571', 'label' => 'พ.ศ. 2571'],
                        ['key' => 'target_2572', 'label' => 'พ.ศ. 2572'],
                        ['key' => 'target_2573', 'label' => 'พ.ศ. 2573'],
                        ['key' => 'target_2574', 'label' => 'พ.ศ. 2574'],
                        ['key' => 'target_2575', 'label' => 'พ.ศ. 2575'],
                        ['key' => 'target_total', 'label' => 'พ.ศ. 2571-2575']
                    ]
                ]
            ]
        );
    }
}
