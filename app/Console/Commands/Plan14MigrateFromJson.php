<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\CustomApps\Plan14\Models\Tab;
use App\CustomApps\Plan14\Models\Pillar;
use App\CustomApps\Plan14\Models\Box;
use App\CustomApps\Plan14\Models\Item;

class Plan14MigrateFromJson extends Command
{
    protected $signature = 'plan14:migrate-from-json {--file= : Path to JSON file in storage/app/private}';

    protected $description = 'Import Plan14 data from a JSON file into normalized tables';

    public function handle()
    {
        $file = $this->option('file');
        if (!$file) {
            $this->error('Please specify a JSON file with --file');
            return 1;
        }

        if (!Storage::exists($file)) {
            $this->error("File not found: storage/app/private/{$file}");
            return 1;
        }

        $this->info("Reading from: storage/app/private/{$file}");
        $content = Storage::get($file);
        $data = json_decode($content, true);

        if (!$data || !isset($data['tabs'])) {
            $this->error('Invalid JSON: missing "tabs" array.');
            return 1;
        }

        $tabCount = count($data['tabs']);
        $this->info("Found {$tabCount} tab(s). Migrating to normalized tables...");

        DB::connection('sqlite_plan14')->transaction(function () use ($data) {
            Item::truncate();
            Box::truncate();
            Pillar::truncate();
            Tab::truncate();

            foreach ($data['tabs'] as $ti => $tabData) {
                $tab = Tab::create([
                    'uuid' => $tabData['id'] ?? ('t_' . uniqid()),
                    'name' => $tabData['name'] ?? 'Untitled',
                    'plan_title' => $tabData['planT'] ?? '',
                    'sort_order' => $ti,
                ]);
                $this->line("  Tab: {$tab->name}");

                $pillars = $tabData['pillars'] ?? [];
                foreach ($pillars as $pi => $pData) {
                    $pillar = Pillar::create([
                        'uuid' => $pData['id'] ?? ('p_' . uniqid()),
                        'tab_id' => $tab->id,
                        'title' => $pData['t'] ?? '',
                        'sort_order' => $pi,
                    ]);
                    $this->line("    Pillar: {$pillar->title}");
                }

                $boxes = $tabData['boxes'] ?? [];
                foreach ($boxes as $bi => $bData) {
                    $pillar = Pillar::where('uuid', $bData['pid'] ?? '')
                        ->where('tab_id', $tab->id)
                        ->first();

                    if (!$pillar) {
                        $this->warn("      Skipping box '{$bData['t']}' - pillar not found");
                        continue;
                    }

                    $box = Box::create([
                        'uuid' => $bData['id'] ?? ('b_' . uniqid()),
                        'pillar_id' => $pillar->id,
                        'title' => $bData['t'] ?? '',
                        'sort_order' => $bi,
                    ]);
                    $this->line("      Box: {$box->title}");

                    $items = $bData['items'] ?? [];
                    foreach ($items as $ii => $itemContent) {
                        Item::create([
                            'uuid' => 'i_' . uniqid(),
                            'box_id' => $box->id,
                            'content' => $itemContent,
                            'sort_order' => $ii,
                        ]);
                    }
                    $this->line("        Items: " . count($items));
                }
            }

            DB::connection('sqlite_plan14')
                ->table('settings')
                ->updateOrInsert(
                    ['key' => 'aid'],
                    ['value' => $data['aid'] ?? '', 'updated_at' => now()]
                );
        });

        $this->info("Migrated {$tabCount} tab(s) to normalized tables successfully!");
        $this->warn('Note: Old plan14_data table still exists. Run migration to drop it when ready.');

        return 0;
    }
}
