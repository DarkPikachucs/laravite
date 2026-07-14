<x-phy70::layouts.master>
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap"
    rel="stylesheet">

  <style>
    /* fallback fonts */
    .font-prompt { font-family: 'Prompt', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }
    :root.light-theme .info-val {
      background: rgba(0, 0, 0, 0.03);
      border-color: rgba(0, 0, 0, 0.05);
    }
  </style>

  <div class="bg-[#060913] text-slate-50 min-h-screen font-outfit relative">
      
    <div class="absolute w-[500px] h-[500px] rounded-full top-[10%] left-[5%] pointer-events-none z-0" style="background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);"></div>

    <div class="max-w-[900px] mx-auto relative z-10 py-8 px-4 sm:px-6">
      <header class="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <h2 class="text-2xl font-semibold font-prompt">รายละเอียดข้อเสนอโครงการ</h2>
        <div class="flex flex-wrap gap-3">
          <a href="{{ route('phy70.proposal.canvas', $proposal->id) }}" target="_blank"
            class="py-3 px-6 rounded-xl text-sm font-semibold cursor-pointer no-underline transition flex items-center gap-1.5"
            style="background: linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(79,70,229,0.1) 100%); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3);">
            📄 View Project Canvas
          </a>
          {{-- <button onclick="document.getElementById('ai-prompt-modal').style.display='flex'" class="bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 py-3 px-6 rounded-xl text-sm font-semibold cursor-pointer transition">
            ✨ Export AI Prompt
          </button> --}}
          @if($proposal->status === 'draft')
          <a href="{{ route('phy70.proposal.edit', $proposal->id) }}"
            class="py-3 px-6 rounded-xl text-sm font-semibold cursor-pointer no-underline transition flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500 text-indigo-500">
            ✏️ แก้ไขข้อเสนอ (ร่าง)
          </a>
          @endif
          <a href="/app/phy70" class="bg-white/5 border border-white/10 text-slate-50 py-3 px-6 rounded-xl text-sm font-semibold cursor-pointer no-underline hover:bg-white/10 transition flex items-center">← กลับสู่แดชบอร์ด</a>
        </div>
      </header>

      <!-- Project Detail Header Card -->
      <div class="bg-slate-900/60 backdrop-blur-md border border-indigo-500/15 rounded-3xl p-10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] mb-7"
        style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);">
        <div class="text-[13px] font-medium mb-1.5 font-prompt uppercase text-cyan-500">ชื่อโครงการ</div>
        <h1 class="text-2xl font-semibold font-prompt text-slate-50 leading-snug mb-3">
          {{ $proposal->project_name }}
        </h1>
        <div class="text-[13.5px] text-slate-400 flex flex-wrap gap-5">
          <span>หน่วยงานเสนอ: <strong>{{ $proposal->organization->name }}</strong></span>
          <span>ผู้จัดส่งข้อเสนอ: <strong>{{ $proposal->user->name }}</strong></span>
          <span>ส่งวันที่: <strong class="font-mono">{{
              $proposal->created_at->timezone('Asia/Bangkok')->addYears(543)->format('d/m/Y H:i') }} น.</strong></span>
        </div>
      </div>

      <div class="bg-slate-900/60 backdrop-blur-md border border-indigo-500/15 rounded-3xl p-10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] mb-7">
        <div class="border-b border-white/10 pb-3 mb-5">
          <h3 class="text-lg font-semibold text-cyan-500 font-prompt">ส่วนที่ 1: ข้อมูลโครงการ</h3>
        </div>

        <div class="mb-5">
          <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">ประเด็นการพัฒนาของจังหวัด</div>
          <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">{{ $proposal->province_issue ?: 'ไม่ระบุข้อมูล' }}</div>
        </div>

        <div class="mb-5">
          <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">ระยะเวลาดำเนินงาน (ปีงบประมาณ)</div>
          <div class="info-val">
            @php
            $years = ['2571', '2572', '2573', '2574', '2575'];
            $operatingYear = $proposal->operating_year;
            $selectedIndex = $operatingYear ? array_search($operatingYear, $years) : -1;
            $progressWidth = $selectedIndex >= 0 ? ($selectedIndex / (count($years) - 1) * 100) : 0;
            @endphp
            @if(!$operatingYear)
            <div class="py-3 px-4 bg-white/5 border border-white/5 rounded-xl text-slate-400 text-sm">
              ไม่ระบุข้อมูล</div>
            @else
            <div class="relative mt-4 mx-auto pb-7 w-full max-w-[600px]">
              <!-- Background line -->
              <div class="absolute top-3 left-0 w-full h-1 bg-slate-400/20 z-0 rounded"></div>

              <!-- Foreground (Active) line -->
              <div class="absolute top-3 left-0 h-1 bg-indigo-500 z-10 rounded transition-all" style="width: {{ $progressWidth }}%;"></div>

              <!-- Nodes -->
              <div class="flex justify-between relative z-20">
                @foreach($years as $year)
                @php
                $isActive = $operatingYear && $year <= $operatingYear; 
                @endphp 
                <div class="flex flex-col items-center relative">
                  <!-- Dot -->
                  <div class="w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all {{ $isActive ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]' : 'bg-[#060913] border-slate-400/40' }}">
                    <div class="w-2.5 h-2.5 rounded-full bg-white transition-opacity duration-200 {{ $isActive ? 'opacity-100' : 'opacity-0' }}"></div>
                  </div>

                  <!-- Label -->
                  <span class="text-[13px] font-semibold absolute top-[34px] whitespace-nowrap {{ $isActive ? 'text-indigo-500' : 'text-slate-400' }}">ปี {{ $year }}</span>
                </div>
                @endforeach
              </div>
            </div>
            @endif
          </div>
        </div>

        <div class="mb-5">
          <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">หลักการและเหตุผล</div>
          <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">{{ $proposal->principles ?: 'ไม่ระบุข้อมูล' }}</div>
        </div>

        <div class="mb-5">
          <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">วัตถุประสงค์ของโครงการ</div>
          <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">{{ $proposal->objectives ?: 'ไม่ระบุข้อมูล' }}</div>
        </div>

        <div class="mb-5">
          <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">กลุ่มเป้าหมาย</div>
          <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">{{ $proposal->target_group ?: 'ไม่ระบุข้อมูล' }}</div>
        </div>

        @if($proposal->kpis && is_array($proposal->kpis))
        <div class="mb-5">
          <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">ตัวชี้วัดและค่าเป้าหมาย (KPIs)</div>
          <div class="info-val">
            @foreach($proposal->kpis as $kpi)
            @if(isset($kpi['selected']) && $kpi['selected'])
            <div class="bg-white/5 border border-white/5 py-2 px-3 rounded-lg mb-1.5 flex items-center justify-between gap-3">
              <div class="flex items-center gap-2 flex-1">
                <span class="text-indigo-500 text-sm">🎯</span>
                <span class="font-medium text-[13.5px] text-slate-50">{{ $kpi['name'] }}</span>
              </div>
            </div>
            @endif
            @endforeach
          </div>
        </div>
        @endif

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

        <div class="mb-5 mt-6 pt-5 border-t border-dashed border-white/10">
          <div class="text-[15px] font-semibold text-cyan-500 mb-3">งบประมาณรวมทั้งโครงการ</div>
          <div class="text-[22px] font-bold text-indigo-500 mb-4">
            {{ number_format($totalBudget, 2) }} <span class="text-sm font-normal text-slate-400">บาท</span>
          </div>

          @if(!empty($totalYearlyBudgets))
          <div class="p-4 bg-black/5 border border-white/5 rounded-lg text-center">
            <div class="text-[13px] text-slate-400 mb-3 font-semibold">งบประมาณรวมแยกตามปีงบประมาณ</div>
            <div class="flex flex-wrap justify-center gap-3">
              @foreach($years as $year)
              @if($year <= $operatingYear && isset($totalYearlyBudgets[$year])) 
              <div class="flex-1 min-w-[100px] max-w-[150px] bg-white/5 p-3 rounded-lg border border-white/5">
                <div class="text-xs text-slate-400 mb-1.5">ปี {{ $year }}</div>
                <div class="font-semibold text-[15px] text-indigo-500">
                  {{ number_format($totalYearlyBudgets[$year], 2) }}
                </div>
              </div>
              @endif
              @endforeach
            </div>
          </div>
          @endif
        </div>

        @if($proposal->attachments && count($proposal->attachments) > 0)
        <div class="mb-5 mt-6 border-t border-white/5 pt-5">
          <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase text-cyan-500">ไฟล์แนบประกอบโครงการ</div>
          <div class="flex flex-col gap-2.5 mt-2.5">
            @foreach($proposal->attachments as $attachment)
            <a href="{{ $attachment['path'] }}" target="_blank"
              class="text-[15px] text-slate-50 leading-relaxed bg-indigo-500/10 border border-white/5 rounded-xl py-3 px-4 flex items-center gap-2.5 no-underline hover:bg-indigo-500/20 transition info-val">
              <span>📄 {{ $attachment['name'] }}</span>
            </a>
            @endforeach
          </div>
        </div>
        @endif
      </div>

      @if($proposal->activities && count($proposal->activities) > 0)
      @php
      $addressData = [
      "เมืองเพชรบูรณ์" => ["ในเมือง", "ตะเบาะ", "วังชมภู", "ตาดกลอย", "บ้านโตก", "ชอนไพร", "นาป่า", "นายม", "น้ำร้อน",
      "สะเดียง", "ท่าพล", "ดงมูลเหล็ก", "บ้านโคก", "ห้วยใหญ่", "ห้วยสะแก", "ระวิง"],
      "ชนแดน" => ["ชนแดน", "ดงขุย", "ท่าข้าม", "พุทธบาท", "ลาดแค", "บ้านกล้วย", "ซับพุทรา", "ตะกุดไร", "ศาลาลาย"],
      "หล่มสัก" => ["หล่มสัก", "วัดป่า", "ตาลเดี่ยว", "หนองสว่าง", "บ้านติ้ว", "หนองไขว่", "บ้านกลาง", "ช้างตะลูด",
      "น้ำชุน", "บ้านโสก", "น้ำก้อ", "ฝายนาแซง", "บุ่งคล้า", "บุ่งน้ำเต้า", "บ้านหวาย", "ลานบ่า", "ปากช่อง"],
      "หล่มเก่า" => ["หล่มเก่า", "นาแซง", "หนองอิเฒ่า", "หินฮาว", "บ้านเนิน", "ศิลา", "ตาดกลอย", "วังบาล", "นาซำ"],
      "วิเชียรบุรี" => ["ท่าโรง", "สระประดู่", "สามแยก", "โคกปรง", "น้ำร้อน", "บ่อรัง", "พุเตย", "พุขาม", "ภูน้ำหยด",
      "ซับสมบูรณ์", "บึงกระจับ", "วังใหญ่", "ยางสาว"],
      "ศรีเทพ" => ["ศรีเทพ", "สระกรวด", "คลองกระจัง", "นาสนุ่น", "โคกสะอาด", "หนองย่างทอย", "ประดู่งาม"],
      "หนองไผ่" => ["หนองไผ่", "นาเฉลียง", "กองทูล", "บ้านโภชน์", "เพชรละคร", "บ่อไทย", "ห้วยโป่ง", "วังท่าดี", "บัววัฒนา",
      "วังโบสถ์", "ท่าแดง", "ยางงาม"],
      "บึงสามพัน" => ["ซับสมอทอด", "ซับไม้แดง", "หนองแจง", "กันจุ", "วังพิกุล", "พญาวัง", "ศรีมงคล", "สระแก้ว",
      "บึงสามพัน"],
      "น้ำหนาว" => ["น้ำหนาว", "หลักด่าน", "วอแก้ว", "โคกมน"],
      "วังโป่ง" => ["วังโป่ง", "ท้ายดง", "ซับเปิบ", "วังหิน", "วังศาล"],
      "เขาค้อ" => ["เขาค้อ", "สะเดาะพง", "หนองแม่นา", "แคมป์สน", "ทุ่งสมอ", "ริมสีม่วง", "เข็กน้อย"]
      ];
      @endphp
      <div class="bg-slate-900/60 backdrop-blur-md border border-indigo-500/15 rounded-3xl p-10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] mb-7">
        <div class="border-b border-white/10 pb-3 mb-5">
          <h3 class="text-lg font-semibold text-cyan-500 font-prompt">ส่วนที่ 2: กิจกรรมย่อยภายใต้โครงการ</h3>
        </div>
        @foreach($proposal->activities as $index => $act)
        <div class="bg-white/5 border border-white/5 rounded-2xl p-6 mb-5">
          <h4 class="text-base font-semibold text-cyan-500 mb-4">
            🎯 กิจกรรมที่ {{ $index + 1 }}: {{ $act['name'] ?? '-' }}
          </h4>

          <div class="mb-3">
            <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">งบประมาณรวม (บาท)</div>
            <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 mb-3 info-val">{{ number_format($act['budget'] ?? 0, 2) }}</div>
            @if(!empty($act['yearly_budgets']) && is_array($act['yearly_budgets']))
            <div class="p-3 bg-black/5 border border-white/5 rounded-lg text-center">
              <div class="text-xs text-slate-400 mb-2 font-semibold">แยกตามปีงบประมาณ</div>
              <div class="flex flex-wrap justify-center gap-2">
                @foreach($years as $year)
                @if($year <= $operatingYear && isset($act['yearly_budgets'][$year]) &&
                  is_numeric($act['yearly_budgets'][$year])) 
                  <div class="flex-1 min-w-[80px] max-w-[120px]">
                    <div class="text-[11px] text-slate-400">ปี {{ $year }}</div>
                    <div class="font-medium text-[13px] text-indigo-500">
                      {{ number_format($act['yearly_budgets'][$year], 2) }}
                    </div>
                  </div>
                @endif
                @endforeach
              </div>
            </div>
            @endif
          </div>
          
          <div class="mb-3">
            <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">แนวทางการพัฒนาจังหวัด</div>
            <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">{{ $act['guideline'] ?? '-' }}</div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3">
            <div class="mb-3">
              <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">พื้นที่เป้าหมาย</div>
              <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">
                @if(isset($act['target_province']) || !empty($act['target_district']) || !empty($act['target_subdistrict']))
                จังหวัด{{ $act['target_province'] ?? $proposal->target_province ?? 'เพชรบูรณ์' }}
                @php
                $rawDistricts = !empty($act['target_district']) ? (is_array($act['target_district']) ?
                $act['target_district'] : explode(',', $act['target_district'])) : [];
                $rawSubdistricts = !empty($act['target_subdistrict']) ? (is_array($act['target_subdistrict']) ?
                $act['target_subdistrict'] : explode(',', $act['target_subdistrict'])) : [];

                $selectedDistricts = collect($rawDistricts)->flatMap(fn($d) => explode(',', $d))->map(fn($d) =>
                trim($d))->filter()->unique()->values()->all();
                $selectedSubdistricts = collect($rawSubdistricts)->flatMap(fn($d) => explode(',', $d))->map(fn($d) =>
                trim($d))->filter()->unique()->values()->all();
                @endphp
                @if(count($selectedDistricts) > 0)
                <div class="mt-2 pl-2.5 flex flex-col gap-1">
                  @foreach($selectedDistricts as $dist)
                  <div>
                    <span class="text-indigo-500">➔ อำเภอ{{ $dist }}</span>
                    @php
                    $subsInThisDist = [];
                    if (isset($addressData[$dist])) {
                    $subsInThisDist = array_intersect($selectedSubdistricts, $addressData[$dist]);
                    }
                    @endphp
                    @if(count($subsInThisDist) > 0)
                    <span class="text-slate-400 text-[13px] ml-1.5">
                      (ตำบล: {{ implode(', ', $subsInThisDist) }})
                    </span>
                    @endif
                  </div>
                  @endforeach
                </div>
                @endif
                @else
                {{ $act['target_area'] ?? '-' }}
                @endif
              </div>
            </div>
            <div class="mb-3">
              <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">กลุ่มเป้าหมาย</div>
              <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">{{ $act['target_group'] ?? '-' }}</div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3">
            <div class="mb-3">
              <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">ผู้รับผิดชอบ</div>
              <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">{{ $act['responsible_person'] ?? '-' }}</div>
            </div>
            <div class="mb-3">
              <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">หน่วยงานรับผิดชอบ</div>
              <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">{{ $act['responsible_agency'] ?? '-' }}</div>
            </div>
          </div>

          <div class="mb-3">
            <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">หน่วยงานที่เกี่ยวข้อง</div>
            <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">
              @if(!empty($act['co_agencies']) && is_array($act['co_agencies']))
              <ul class="m-0 pl-5">
                @foreach($act['co_agencies'] as $co)
                @if(!empty($co['name']))
                <li>{{ $co['name'] }}</li>
                @endif
                @endforeach
              </ul>
              @else
              -
              @endif
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3">
            <div class="mb-3">
              <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">ตัวชี้วัดโครงการที่กิจกรรมนี้ตอบสนอง</div>
              <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">
                @if(!empty($act['project_kpis']) && is_array($act['project_kpis']))
                <ul class="m-0 pl-5">
                  @foreach($act['project_kpis'] as $pkpi)
                  <li>{{ $pkpi }}</li>
                  @endforeach
                </ul>
                @else
                {{ is_string($act['project_kpis'] ?? null) ? $act['project_kpis'] : '-' }}
                @endif
              </div>
            </div>
            <div class="mb-3">
              <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">ตัวชี้วัดของกิจกรรม</div>
              <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">
                @if(!empty($act['activity_kpis']) && is_array($act['activity_kpis']))
                <table class="w-full border-collapse mt-2 text-sm">
                  <thead>
                    <tr class="bg-white/5 border-b border-white/10">
                      <th class="p-2 text-left text-slate-400 font-medium">ชื่อตัวชี้วัด</th>
                      <th class="p-2 text-left text-slate-400 font-medium w-1/4">ค่าเป้าหมาย</th>
                      <th class="p-2 text-left text-slate-400 font-medium w-1/4">หน่วยวัด</th>
                    </tr>
                  </thead>
                  <tbody>
                    @foreach($act['activity_kpis'] as $akpi)
                    @if(!empty($akpi['name']))
                    <tr class="border-b border-white/5">
                      <td class="p-2">{{ $akpi['name'] }}</td>
                      <td class="p-2">{{ $akpi['target'] ?? '-' }}</td>
                      <td class="p-2">{{ $akpi['unit'] ?? '-' }}</td>
                    </tr>
                    @endif
                    @endforeach
                  </tbody>
                </table>
                @else
                {{ is_string($act['activity_kpis'] ?? null) ? $act['activity_kpis'] : '-' }}
                @endif
              </div>
            </div>
          </div>
        </div>
        @endforeach
      </div>
      @endif

      <div class="bg-slate-900/60 backdrop-blur-md border border-indigo-500/15 rounded-3xl p-10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] mb-7">
        <div class="border-b border-white/10 pb-3 mb-5">
          <h3 class="text-lg font-semibold text-cyan-500 font-prompt">ส่วนที่ 3: ผลผลิตและผลลัพธ์</h3>
        </div>
        <div class="mb-5">
          <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">ผลผลิต (Output)</div>
          <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">{{ $proposal->output ?: 'ไม่ระบุข้อมูล' }}</div>
        </div>
        <div class="mb-5">
          <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">ผลลัพธ์ (Outcome)</div>
          <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">{{ $proposal->outcome ?: 'ไม่ระบุข้อมูล' }}</div>
        </div>
      </div>

      @if(!empty($proposal->documents) && is_array($proposal->documents))
      <div class="bg-slate-900/60 backdrop-blur-md border border-indigo-500/15 rounded-3xl p-10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] mb-7">
        <div class="border-b border-white/10 pb-3 mb-5">
          <h3 class="text-lg font-semibold text-cyan-500 font-prompt">ส่วนที่ 4: เอกสารโครงการ</h3>
        </div>
        <div class="mb-5">
          <div class="text-[13px] text-slate-400 font-medium mb-1.5 font-prompt uppercase">ไฟล์แนบ</div>
          <div class="text-[15px] text-slate-50 leading-relaxed bg-black/20 border border-white/5 rounded-xl py-3 px-4 info-val">
            <ul class="pl-5">
              @foreach($proposal->documents as $doc)
              @php
              $isOldFormat = is_string($doc);
              $docPath = $isOldFormat ? $doc : $doc['path'];
              $docName = $isOldFormat ? basename($doc) : $doc['name'];
              @endphp
              <li><a href="{{ Storage::url(preg_replace('~^/storage/~', '', $docPath)) }}" target="_blank"
                  class="text-cyan-500 underline">{{ $docName }}</a></li>
              @endforeach
            </ul>
          </div>
        </div>
      </div>
      @endif

    </div>

    <!-- AI prompt modal -->
    <div id="ai-prompt-modal"
      class="hidden fixed top-0 left-0 w-full h-full bg-black/80 z-[100] items-center justify-center backdrop-blur-sm">
      <div class="bg-[#060913] border border-indigo-500/15 rounded-[20px] p-8 w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-indigo-500 font-prompt">✨ AI Image Generation Prompt</h3>
          <button onclick="document.getElementById('ai-prompt-modal').style.display='none'"
            class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer hover:text-slate-200">&times;</button>
        </div>
        <p class="text-slate-400 text-sm mb-5">
          คัดลอกข้อความด้านล่างนี้ไปวางในเครื่องมือ AI (เช่น Midjourney, DALL-E) เพื่อสร้างรูปภาพ Project Canvas
          ได้เลยครับ</p>
        <div class="relative">
          <textarea id="prompt-text"
            class="w-full h-[400px] bg-black/30 border border-white/10 rounded-xl p-4 text-slate-50 font-mono text-sm resize-y leading-relaxed"
            readonly>High-resolution professional infographic poster in a clean project canvas layout, replicating the exact structure and color scheme of image_0.png (green, blue, and orange accents on a white background).

Top Banner: Replace original text with {{ $proposal->project_code ?: 'PROJECT-CODE' }} [ใส่ชื่อหัวข้อหลักภาษาอังกฤษ เช่น SMART COMMUNITY FARMING & DIGITAL ECONOMY]. Below it, add the Thai title: {{ $proposal->project_name }}, with English subtitle: [ใส่ชื่อโครงการภาษาอังกฤษ เช่น Participatory Sustainable Community Agriculture & Digital Economy Project]. Add small icons below the title representing: [Smart Farm], [Digital Platform], [Eco-Logistics], [Stronger Community].

Column 1 (Green/Blue themes):

Top Card: หลักการและเหตุผล (Rationale / Background) with new bullet points tailored to the project (e.g., {{ \Illuminate\Support\Str::limit(strip_tags($proposal->principles), 150) }}). Add a small illustrative icon of a farmer using a tablet.

Middle Card: วัตถุประสงค์ของโครงการ (Objectives) with numbered points (blue circles) and relevant new icons (e.g., {{ \Illuminate\Support\Str::limit(strip_tags($proposal->objectives), 150) }}).

Bottom: Small illustrative scene of people collaborating on modern agricultural solutions.

Column 2 (Activity-based):

Top Card: กิจกรรมหลัก (Key Activities) with numbered green circles and unique illustrative icons for each step (e.g., @if($proposal->activities)@foreach($proposal->activities as $index => $act) {{ $index + 1 }}. {{ $act['name'] }}, @endforeach @endif ). Include sub-points with matching small icons.

Bottom Card: ทรัพยากรที่ต้องใช้ (Resources) with numbered green circles and icons representing technical experts, smart tech, budget, and infrastructure.

Column 3 (Outcome and Risk focus):

Top Card: ผลกระทบด้านต่างๆ (Impact Areas) with customized points and icons for Environment, Social, Economy, and Education impacts.

Middle Card: ความเสี่ยงและแนวทางจัดการความเสี่ยง (Risks & Mitigation) with red-orange text title and numbered orange points, each with relevant risk icons and mitigation icons (e.g., tech resistance, data security, high costs).

Bottom: Create two sub-cards with green titles: ผลลัพธ์ที่คาดหวัง (Expected Outputs / Outcomes) (e.g., {{ \Illuminate\Support\Str::limit(strip_tags($proposal->output), 100) }} and {{ \Illuminate\Support\Str::limit(strip_tags($proposal->outcome), 100) }}) and ตัวชี้วัดความสำเร็จ (Key Indicators), matching the table structure of image_0.png with project-specific data points (@if(!empty($proposal->kpis)) @foreach($proposal->kpis as $kpi) @if(isset($kpi['selected']) && $kpi['selected']) {{ $kpi['name'] }}, @endif @endforeach @endif).

Footer: Replicate the landscape scene with a stylized modern community and farm featuring solar panels and eco-friendly delivery vehicles. Include a new Thai tagline: [สร้างสรรค์อนาคตที่ยั่งยืนทีละก้าวทางดิจิทัล เพื่อชุมชนที่เข้มแข็งกว่า].

Style: Clean digital vector illustration, professional, organized, like a printed poster.</textarea>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('prompt-text').value); alert('คัดลอก Prompt เรียบร้อยแล้ว!');"
            class="absolute top-4 right-6 bg-indigo-500/20 border border-indigo-500 py-2 px-4 rounded-xl text-[13px] text-slate-50 cursor-pointer hover:bg-indigo-500/30 transition">
            📋 คัดลอก
          </button>
        </div>
      </div>
    </div>
  </div>
</x-phy70::layouts.master>