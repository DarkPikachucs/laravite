<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Canvas: {{ $proposal->project_code ?? $proposal->project_name }}</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Sarabun', sans-serif;
            background-color: #f3f4f6;
            color: #1f2937;
        }
        .canvas-container {
            width: 297mm;
            min-height: 210mm; /* A4 Landscape */
            margin: 0 auto;
            background: white;
            padding: 20mm;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        @media print {
            body { background: white; margin: 0; padding: 0; }
            .canvas-container { width: 100%; min-height: 100%; box-shadow: none; padding: 10mm; }
            @page { size: A4 landscape; margin: 0; }
            .print-hidden { display: none !important; }
        }
        .card {
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 1rem;
            background: #ffffff;
            height: 100%;
        }
        .card-header {
            font-size: 1.125rem;
            font-weight: 700;
            color: #2563eb;
            border-bottom: 2px solid #eff6ff;
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    </style>
</head>
<body class="py-8 print:py-0">

    <!-- Action Buttons -->
    <div class="max-w-[297mm] mx-auto mb-4 flex justify-end gap-4 print-hidden">
        <button onclick="window.print()" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print Canvas
        </button>
        <button onclick="window.close()" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition">
            Close
        </button>
    </div>

    @php
        $totalBudget = collect($proposal->activities)->sum(function($act) { return (float)($act['budget'] ?? 0); });
        $totalYearlyBudgets = [];
        if (!empty($proposal->activities)) {
            foreach ($proposal->activities as $act) {
                if (!empty($act['yearly_budgets']) && is_array($act['yearly_budgets'])) {
                    foreach ($act['yearly_budgets'] as $year => $budget) {
                        if (is_numeric($budget)) {
                            $totalYearlyBudgets[$year] = ($totalYearlyBudgets[$year] ?? 0) + (float)$budget;
                        }
                    }
                }
            }
        }
    @endphp

    <div class="canvas-container">
        <!-- Canvas Header -->
        <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-wide">Project Canvas</h1>
            <p class="text-sm text-gray-500 mt-1">รหัสโครงการ: {{ $proposal->project_code ?? 'ร่างข้อเสนอ' }}</p>
        </div>

        <!-- Grid Layout -->
        <div class="grid grid-cols-2 gap-4 h-[calc(100%-80px)]">
            
            <!-- Block 1: Project Overview (Top Left) -->
            <div class="card">
                <div class="card-header">
                    <span>📋</span> Project Overview
                </div>
                <div class="space-y-3">
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">Project Name</span>
                        <div class="font-semibold text-gray-800">{{ $proposal->project_name }}</div>
                    </div>
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">Agency</span>
                        <div class="text-gray-700">{{ $proposal->organization->name ?? '-' }}</div>
                    </div>
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">Rationale</span>
                        <div class="text-sm text-gray-600 mt-1 line-clamp-6">{!! nl2br(e(strip_tags($proposal->principles))) !!}</div>
                    </div>
                </div>
            </div>

            <!-- Block 2: Technical Scope & Target (Top Right) -->
            <div class="card">
                <div class="card-header">
                    <span>🎯</span> Technical Scope & Target
                </div>
                <div class="space-y-3">
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">Location</span>
                        <div class="text-gray-700 text-sm">
                            @php
                                $districts = is_array($proposal->target_district) ? $proposal->target_district : explode(',', $proposal->target_district ?? '');
                                $subdistricts = is_array($proposal->target_subdistrict) ? $proposal->target_subdistrict : explode(',', $proposal->target_subdistrict ?? '');
                                $validDist = array_filter($districts, fn($v) => !empty(trim($v)));
                                $validSub = array_filter($subdistricts, fn($v) => !empty(trim($v)));
                            @endphp
                            @if(!empty($validSub)) ต.{{ implode(', ต.', $validSub) }} @endif
                            @if(!empty($validDist)) อ.{{ implode(', อ.', $validDist) }} @endif
                            จ.{{ $proposal->target_province ?? 'เพชรบูรณ์' }}
                        </div>
                    </div>
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">Scope Details / Method / Activities</span>
                        <div class="text-sm text-gray-600 mt-1 max-h-[250px] overflow-hidden relative">
                            @if(!empty($proposal->main_activity))
                                <div class="mb-2">{!! nl2br(e(strip_tags($proposal->main_activity))) !!}</div>
                            @endif
                            
                            @if(!empty($proposal->activities) && is_array($proposal->activities))
                                <ul class="list-decimal pl-4 space-y-3 mt-2">
                                @foreach($proposal->activities as $index => $act)
                                    <li>
                                        <div class="font-semibold text-gray-800 leading-tight">{{ $act['name'] ?? 'กิจกรรม' }}</div>
                                        <div class="text-xs text-gray-500 mt-0.5">งบประมาณ: {{ number_format($act['budget'] ?? 0, 2) }} บาท</div>
                                        @if(!empty($act['activity_kpis']) && is_array($act['activity_kpis']))
                                            <div class="mt-1.5 pl-2 border-l-2 border-blue-200">
                                                <span class="text-[10px] font-bold text-gray-400 uppercase">ตัวชี้วัดกิจกรรม</span>
                                                <ul class="text-[11px] text-gray-600 space-y-0.5 mt-0.5">
                                                    @foreach($act['activity_kpis'] as $akpi)
                                                        @if(!empty($akpi['name']))
                                                            <li>- {{ $akpi['name'] }} @if(!empty($akpi['target']))<span class="text-blue-600">({{ $akpi['target'] }} {{ $akpi['unit'] ?? '' }})</span>@endif</li>
                                                        @endif
                                                    @endforeach
                                                </ul>
                                            </div>
                                        @endif
                                    </li>
                                @endforeach
                                </ul>
                            @endif
                        </div>
                    </div>
                </div>
            </div>

            <!-- Block 3: Budget Plan (Middle Left) -->
            <div class="card">
                <div class="card-header">
                    <span>💰</span> Budget Plan
                </div>
                <div class="space-y-4">
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">Total Budget</span>
                        <div class="text-xl font-bold text-green-600">{{ number_format($totalBudget, 2) }} บาท</div>
                    </div>
                    @if(!empty($totalYearlyBudgets))
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">Breakdowns</span>
                        <div class="mt-2 grid grid-cols-2 gap-2">
                            @foreach($totalYearlyBudgets as $year => $budget)
                            <div class="bg-gray-50 border border-gray-100 p-2 rounded">
                                <div class="text-xs text-gray-500">ปี {{ $year }}</div>
                                <div class="font-semibold text-gray-800">{{ number_format($budget, 2) }}</div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                    @endif
                </div>
            </div>

            <!-- Block 4: Objectives & KPIs (Middle Right) -->
            <div class="card">
                <div class="card-header">
                    <span>📈</span> Objectives & KPIs
                </div>
                <div class="space-y-4">
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">Objective</span>
                        <div class="text-sm text-gray-600 mt-1 line-clamp-4">
                            {!! nl2br(e(strip_tags($proposal->objectives))) !!}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <span class="text-xs font-bold text-gray-400 uppercase">Expected Output</span>
                            <div class="text-xs text-gray-600 mt-1 line-clamp-3">
                                {!! nl2br(e(strip_tags($proposal->output))) !!}
                            </div>
                        </div>
                        <div>
                            <span class="text-xs font-bold text-gray-400 uppercase">Expected Outcome</span>
                            <div class="text-xs text-gray-600 mt-1 line-clamp-3">
                                {!! nl2br(e(strip_tags($proposal->outcome))) !!}
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">KPIs</span>
                        <ul class="mt-1 space-y-1">
                            @if(!empty($proposal->kpis))
                                @foreach($proposal->kpis as $kpi)
                                    @if(isset($kpi['selected']) && $kpi['selected'])
                                        <li class="text-sm text-gray-700 flex items-start gap-2">
                                            <span class="text-blue-500 mt-0.5">•</span>
                                            <span>{{ $kpi['name'] }}</span>
                                        </li>
                                    @endif
                                @endforeach
                            @else
                                <li class="text-sm text-gray-500">ไม่มีข้อมูล KPI</li>
                            @endif
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Block 5: Target Audience & Alignment (Bottom Full Width) -->
            <div class="card col-span-2">
                <div class="card-header">
                    <span>🤝</span> Target Audience & Strategic Alignment
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">Target Audience</span>
                        <div class="text-sm text-gray-700 mt-1">{{ $proposal->target_group ?? 'ไม่ระบุ' }}</div>
                    </div>
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase">Strategic Alignment</span>
                        <div class="text-sm text-gray-700 mt-1">
                            {{ $proposal->main_plan ?? 'ไม่ระบุ' }}
                            @if($proposal->plan) <br><span class="text-gray-500">{{ $proposal->plan }}</span> @endif
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</body>
</html>
