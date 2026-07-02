<?php

namespace App\CustomApps\Plan14\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use App\CustomApps\Plan14\Models\Tab;
use App\CustomApps\Plan14\Models\Pillar;
use App\CustomApps\Plan14\Models\Box;
use App\CustomApps\Plan14\Models\Item;

class Plan14Controller extends Controller
{
    private const CACHE_KEY = 'plan14-heartbeats';
    private const TTL = 120;

    public function index()
    {
        return view('app-plan14::index');
    }

    public function getData()
    {
        $tabs = Tab::orderBy('sort_order')
            ->with([
                'pillars' => function ($q) {
                    $q->orderBy('sort_order')->with([
                        'boxes' => function ($q) {
                            $q->orderBy('sort_order')->with([
                                'items' => function ($q) {
                                    $q->orderBy('sort_order');
                                },
                            ]);
                        },
                    ]);
                },
            ])
            ->get();

        $result = [
            'tabs' => $tabs->map(function ($tab) {
                $pillars = $tab->pillars;
                $boxes = $pillars->flatMap(fn($p) => $p->boxes);

                return [
                    'id' => $tab->uuid,
                    'name' => $tab->name,
                    'planT' => $tab->plan_title,
                    'pillars' => $pillars->map(fn($p) => [
                        'id' => $p->uuid,
                        't' => $p->title,
                    ])->values()->toArray(),
                    'boxes' => $boxes->map(fn($b) => [
                        'id' => $b->uuid,
                        'pid' => $b->pillar->uuid,
                        't' => $b->title,
                        'items' => $b->items->pluck('content')->values()->toArray(),
                    ])->values()->toArray(),
                ];
            })->values()->toArray(),
        ];

        $aid = DB::connection('sqlite_plan14')
            ->table('settings')
            ->where('key', 'aid')
            ->value('value');

        if ($aid && collect($result['tabs'])->contains('id', $aid)) {
            $result['aid'] = $aid;
        } elseif (!empty($result['tabs'])) {
            $result['aid'] = $result['tabs'][0]['id'];
        }

        return response()->json($result);
    }

    public function saveData(Request $request)
    {
        $data = $request->json()->all();

        if (!isset($data['tabs']) || !is_array($data['tabs'])) {
            return response()->json(['saved' => false, 'error' => 'Invalid data'], 400);
        }

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

                $pillars = $tabData['pillars'] ?? [];
                foreach ($pillars as $pi => $pData) {
                    Pillar::create([
                        'uuid' => $pData['id'] ?? ('p_' . uniqid()),
                        'tab_id' => $tab->id,
                        'title' => $pData['t'] ?? '',
                        'sort_order' => $pi,
                    ]);
                }

                $boxes = $tabData['boxes'] ?? [];
                foreach ($boxes as $bi => $bData) {
                    $pillar = Pillar::where('uuid', $bData['pid'] ?? '')
                        ->where('tab_id', $tab->id)
                        ->first();

                    if (!$pillar) continue;

                    $box = Box::create([
                        'uuid' => $bData['id'] ?? ('b_' . uniqid()),
                        'pillar_id' => $pillar->id,
                        'title' => $bData['t'] ?? '',
                        'sort_order' => $bi,
                    ]);

                    $items = $bData['items'] ?? [];
                    foreach ($items as $ii => $itemContent) {
                        Item::create([
                            'uuid' => 'i_' . uniqid(),
                            'box_id' => $box->id,
                            'content' => $itemContent,
                            'sort_order' => $ii,
                        ]);
                    }
                }
            }

            DB::connection('sqlite_plan14')
                ->table('settings')
                ->updateOrInsert(
                    ['key' => 'aid'],
                    ['value' => $data['aid'] ?? '', 'updated_at' => now()]
                );
        });

        return response()->json(['saved' => true]);
    }

    public function sync(Request $request)
    {
        $action = $request->input('action');
        $d = $request->input('data', []);

        if (!$action) {
            return response()->json(['saved' => false, 'error' => 'No action specified'], 400);
        }

        DB::connection('sqlite_plan14')->transaction(function () use ($action, $d) {
            switch ($action) {
                case 'renameTab':
                    Tab::where('uuid', $d['tabUuid'])->update(['name' => $d['name']]);
                    break;

                case 'renamePlanTitle':
                    Tab::where('uuid', $d['tabUuid'])->update(['plan_title' => $d['planT']]);
                    break;

                case 'setAid':
                    DB::connection('sqlite_plan14')->table('settings')->updateOrInsert(
                        ['key' => 'aid'],
                        ['value' => $d['aid'] ?? '', 'updated_at' => now()]
                    );
                    break;

                case 'addPillar':
                    $tab = Tab::where('uuid', $d['tabUuid'])->firstOrFail();
                    $maxSort = Pillar::where('tab_id', $tab->id)->max('sort_order') ?? -1;
                    Pillar::create([
                        'uuid' => $d['pillarUuid'] ?? ('p_' . uniqid()),
                        'tab_id' => $tab->id,
                        'title' => $d['title'] ?? '',
                        'sort_order' => $maxSort + 1,
                    ]);
                    break;

                case 'renamePillar':
                    Pillar::where('uuid', $d['pillarUuid'])->update(['title' => $d['title']]);
                    break;

                case 'deletePillar':
                    Pillar::where('uuid', $d['pillarUuid'])->delete();
                    break;

                case 'addBox':
                    $pillar = Pillar::where('uuid', $d['pillarUuid'])->firstOrFail();
                    $maxSort = Box::where('pillar_id', $pillar->id)->max('sort_order') ?? -1;
                    Box::create([
                        'uuid' => $d['boxUuid'] ?? ('b_' . uniqid()),
                        'pillar_id' => $pillar->id,
                        'title' => $d['title'] ?? '',
                        'sort_order' => $maxSort + 1,
                    ]);
                    break;

                case 'renameBox':
                    Box::where('uuid', $d['boxUuid'])->update(['title' => $d['title']]);
                    break;

                case 'deleteBox':
                    Box::where('uuid', $d['boxUuid'])->delete();
                    break;

                case 'addItem':
                    $box = Box::where('uuid', $d['boxUuid'])->firstOrFail();
                    $maxSort = Item::where('box_id', $box->id)->max('sort_order') ?? -1;
                    Item::create([
                        'uuid' => 'i_' . uniqid(),
                        'box_id' => $box->id,
                        'content' => $d['content'] ?? '',
                        'sort_order' => $maxSort + 1,
                    ]);
                    break;

                case 'editItem':
                    $box = Box::where('uuid', $d['boxUuid'])->firstOrFail();
                    $item = Item::where('box_id', $box->id)
                        ->orderBy('sort_order')
                        ->skip($d['index'] ?? 0)
                        ->first();
                    if ($item) {
                        $item->update(['content' => $d['content'] ?? '']);
                    }
                    break;

                case 'deleteItem':
                    $box = Box::where('uuid', $d['boxUuid'])->firstOrFail();
                    $item = Item::where('box_id', $box->id)
                        ->orderBy('sort_order')
                        ->skip($d['index'] ?? 0)
                        ->first();
                    if ($item) {
                        $item->delete();
                    }
                    break;

                case 'addTab':
                    $tab = Tab::create([
                        'uuid' => $d['tabUuid'] ?? ('t_' . uniqid()),
                        'name' => $d['name'] ?? 'Untitled',
                        'plan_title' => $d['planT'] ?? '',
                        'sort_order' => (Tab::max('sort_order') ?? -1) + 1,
                    ]);
                    foreach ($d['pillars'] ?? [] as $pi => $pData) {
                        $pillar = Pillar::create([
                            'uuid' => $pData['id'] ?? ('p_' . uniqid()),
                            'tab_id' => $tab->id,
                            'title' => $pData['t'] ?? '',
                            'sort_order' => $pi,
                        ]);
                    }
                    foreach ($d['boxes'] ?? [] as $bi => $bData) {
                        $pillar = Pillar::where('uuid', $bData['pid'] ?? '')
                            ->where('tab_id', $tab->id)
                            ->first();
                        if (!$pillar) continue;
                        $box = Box::create([
                            'uuid' => $bData['id'] ?? ('b_' . uniqid()),
                            'pillar_id' => $pillar->id,
                            'title' => $bData['t'] ?? '',
                            'sort_order' => $bi,
                        ]);
                        foreach ($bData['items'] ?? [] as $ii => $itemContent) {
                            Item::create([
                                'uuid' => 'i_' . uniqid(),
                                'box_id' => $box->id,
                                'content' => $itemContent,
                                'sort_order' => $ii,
                            ]);
                        }
                    }
                    break;

                case 'deleteTab':
                    $deletedTab = Tab::where('uuid', $d['tabUuid'])->first();
                    if ($deletedTab) {
                        $deletedTab->delete();
                    }
                    $remainingTabs = Tab::count();
                    if ($remainingTabs === 0) {
                        $tab = Tab::create([
                            'uuid' => 't_' . uniqid(),
                            'name' => 'แผน 14',
                            'plan_title' => 'แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ ฉบับที่ 14',
                            'sort_order' => 0,
                        ]);
                        DB::connection('sqlite_plan14')->table('settings')->updateOrInsert(
                            ['key' => 'aid'],
                            ['value' => $tab->uuid, 'updated_at' => now()]
                        );
                    }
                    break;

                case 'reorderBoxes':
                    foreach (($d['boxUuids'] ?? []) as $i => $uuid) {
                        Box::where('uuid', $uuid)->update(['sort_order' => $i]);
                    }
                    break;
            }
        });

        return response()->json(['saved' => true]);
    }

    public function heartbeat(Request $request)
    {
        $key = $request->ip() . '|' . ($request->userAgent() ?? '');
        $now = time();

        $heartbeats = Cache::get(self::CACHE_KEY, []);

        $heartbeats[$key] = $now;

        $heartbeats = array_filter($heartbeats, fn($ts) => $ts > $now - self::TTL);

        Cache::put(self::CACHE_KEY, $heartbeats, self::TTL);

        return response()->json(['online' => count($heartbeats)]);
    }
}
