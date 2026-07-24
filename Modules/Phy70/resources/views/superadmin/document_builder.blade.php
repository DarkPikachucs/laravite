<x-phy70::layouts.master>
  <!-- Tailwind CSS via CDN -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

  <style>
    .glass-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
    }

    .gradient-text {
      background: linear-gradient(90deg, #4f46e5, #9333ea);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .btn-gradient {
      background: linear-gradient(90deg, #4f46e5, #9333ea);
      transition: opacity 0.3s ease;
    }

    .btn-gradient:hover {
      opacity: 0.9;
    }
  </style>

  <div class="relative z-10 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8"
    style="color: #333; font-family: 'Prompt', sans-serif;">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 gradient-text">ศูนย์รวมรายงาน (Report Hub)</h2>
        <p class="mt-1 text-gray-500">จัดการและสร้างรายงานในรูปแบบต่างๆ จากข้อมูลระบบ</p>
      </div>
      <div>
        <button onclick="document.getElementById('createTemplateModal').classList.remove('hidden')"
          class="flex items-center px-6 py-2 font-bold text-white rounded-full shadow-lg btn-gradient">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          สร้าง Template ใหม่
        </button>
      </div>
    </div>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
      <div class="flex items-center p-6 glass-card rounded-2xl">
        <div class="p-4 mr-4 text-indigo-600 bg-indigo-100 rounded-full">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
            </path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-500">เทมเพลตทั้งหมด</p>
          <p class="text-3xl font-bold text-gray-800">{{ $templates->count() ?? 0 }}</p>
        </div>
      </div>
      <div class="flex items-center p-6 glass-card rounded-2xl">
        <div class="p-4 mr-4 text-purple-600 bg-purple-100 rounded-full">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
            </path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-500">โครงการที่พร้อมออกรายงาน</p>
          <p class="text-3xl font-bold text-gray-800">{{ $proposals->count() ?? 0 }}</p>
        </div>
      </div>
      <div class="flex items-center p-6 glass-card rounded-2xl">
        <div class="p-4 mr-4 text-green-600 bg-green-100 rounded-full">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-500">สร้างรายงานล่าสุด</p>
          <p class="text-lg font-bold text-gray-800">วันนี้ 10:45 น.</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">

      <!-- Report Generation Section -->
      <div class="p-8 glass-card rounded-2xl">
        <h3 class="pb-2 mb-6 text-xl font-bold text-gray-800 border-b">สร้างรายงาน (Generate Report)</h3>
        <form action="{{ route('phy70.superadmin.document_generate') }}" method="POST" target="_blank"
          class="space-y-5">
          @csrf

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อรายงานที่จะบันทึก
              (ระบุหากต้องการบันทึกเก็บไว้)</label>
            <input type="text" name="report_name"
              class="block w-full p-3 transition border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="เช่น รายงานสรุปงบประมาณไตรมาส 1">
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">1. เลือกข้อมูลต้นทาง (Data Source)</label>
            <select id="data_source" name="data_source"
              class="block w-full p-3 transition border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="proposals">ข้อมูลโครงการ (Proposals)</option>
              <option value="users">ข้อมูลผู้ใช้งาน (Users)</option>
              <option value="organizations">ข้อมูลหน่วยงาน (Organizations)</option>
              <option value="custom">คิวรี่ข้อมูลขั้นสูง (Advanced Query / API)</option>
            </select>
          </div>

          <!-- Advanced Filters Section -->
          <div id="advanced_filters" class="p-5 mt-2 space-y-4 border border-indigo-100 rounded-lg bg-indigo-50">
            <div class="flex items-center justify-between pb-2 mb-2 border-b border-indigo-200">
              <h4 class="flex items-center font-bold text-indigo-800">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                  </path>
                </svg>
                ตัวกรองข้อมูลขั้นสูง (Advanced Filters)
              </h4>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label class="block text-xs font-medium text-indigo-700">ปีงบประมาณ (Year)</label>
                <select name="filter_year"
                  class="block w-full p-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm">
                  <option value="">-- ทุกปีงบประมาณ --</option>
                  <option value="2567">2567</option>
                  <option value="2568">2568</option>
                  <option value="2569">2569</option>
                  <option value="2570">2570</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-indigo-700">สถานะ (Status)</label>
                <select name="filter_status"
                  class="block w-full p-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm">
                  <option value="">-- ทุกสถานะ --</option>
                  <option value="draft">ฉบับร่าง (Draft)</option>
                  <option value="submitted">ส่งข้อเสนอแล้ว (Submitted)</option>
                  <option value="approved">อนุมัติแล้ว (Approved)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-indigo-700">เรียงลำดับโดย (Order By)</label>
                <select name="order_by"
                  class="block w-full p-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm">
                  <option value="created_at_desc">วันที่สร้าง (ใหม่ -> เก่า)</option>
                  <option value="created_at_asc">วันที่สร้าง (เก่า -> ใหม่)</option>
                  <option value="budget_desc">งบประมาณ (มาก -> น้อย)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-indigo-700">จำกัดจำนวน (Limit)</label>
                <input type="number" name="limit" placeholder="เช่น 10, 50, 100 (ปล่อยว่าง = ทั้งหมด)"
                  class="block w-full p-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm">
              </div>
            </div>

            <div id="custom_query_box" class="hidden pt-4 mt-4 border-t border-indigo-200">
              <label class="block text-xs font-medium text-indigo-700">Custom JSON Query / SQL (สำหรับนักพัฒนา)</label>
              <textarea name="custom_query" rows="3"
                class="block w-full p-2 mt-1 font-mono text-sm text-green-400 bg-gray-900 border border-gray-300 rounded-md shadow-sm"
                placeholder='{"where": {"budget": {">": 1000000}}}'></textarea>
              <p class="mt-1 text-xs text-indigo-500">* หากกรอกช่องนี้ ระบบจะใช้เงื่อนไขนี้เป็นหลักในการดึงข้อมูล</p>
            </div>

            <!-- Custom Groups Field -->
            <div class="pt-4 mt-4 border-t border-indigo-200">
              <label class="block mb-2 text-xs font-medium text-indigo-700">จัดกลุ่มชื่อโครงการสำคัญ
                (ที่กำหนดเอง)</label>
              <p class="mb-2 text-xs text-gray-500">* สามารถสร้างกลุ่มและเลือกโครงการที่จะให้อยู่ภายใต้ชื่อโครงการนี้ได้
              </p>
              <div id="create_custom_groups_container" class="space-y-3"></div>
              <button type="button" onclick="addCustomGroup('create')"
                class="px-3 py-1 mt-2 text-xs text-indigo-600 transition border border-indigo-600 rounded hover:bg-indigo-50">+
                เพิ่มกลุ่มโครงการ</button>
              <input type="hidden" name="custom_groups" id="create_custom_groups_input">
            </div>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">2. เลือกข้อมูลแบบเจาะจง (Manual
              Selection)</label>
            <p class="mb-2 text-xs text-gray-500">* ระบบจะดึงข้อมูลตาม Filter ด้านบนโดยอัตโนมัติ
              แต่คุณสามารถเลือกเจาะจงเฉพาะรายการด้านล่างนี้ได้ (หากเลือก ระบบจะข้าม Filter นำมาเฉพาะที่ติ๊กเลือก)</p>
            <div class="p-3 space-y-2 overflow-y-auto border border-gray-300 rounded-lg max-h-48 bg-gray-50">
              @foreach($proposals as $p)
              <label class="flex items-start p-2 transition rounded cursor-pointer hover:bg-indigo-50">
                <div class="flex items-center h-5">
                  <input name="proposals[]" value="{{ $p->id }}" type="checkbox"
                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                </div>
                <div class="ml-3 text-sm">
                  <span class="block font-medium text-gray-700">{{ $p->project_name }}</span>
                  <span class="text-xs text-gray-400">รหัส: {{ $p->project_code ?? 'Draft' }} | งบประมาณ: {{
                    number_format(collect($p->activities)->sum('budget')) }} บาท</span>
                </div>
              </label>
              @endforeach
              @if($proposals->isEmpty())
              <p class="py-4 text-sm text-center text-gray-500">ไม่มีข้อมูลโครงการ</p>
              @endif
            </div>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">3. เลือกเทมเพลต (Template)</label>
            <select name="template_id"
              class="block w-full p-3 transition border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
              required>
              <option value="">-- กรุณาเลือกเทมเพลต --</option>
              @foreach($templates as $template)
              <option value="{{ $template->id }}">{{ $template->name }}</option>
              @endforeach
            </select>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">4. เลือกรูปแบบปลายทาง (Destination /
              Output)</label>
            <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
              <label
                class="p-3 text-center transition border rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50">
                <input type="radio" name="output_format" value="pdf" class="sr-only" checked>
                <span class="block mb-1 text-xl">📄</span>
                <span class="text-sm font-medium text-gray-700">PDF</span>
              </label>
              <label
                class="p-3 text-center transition border rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50">
                <input type="radio" name="output_format" value="word" class="sr-only">
                <span class="block mb-1 text-xl">📝</span>
                <span class="text-sm font-medium text-gray-700">Word</span>
              </label>
              <label
                class="p-3 text-center transition border rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50">
                <input type="radio" name="output_format" value="excel" class="sr-only">
                <span class="block mb-1 text-xl">📊</span>
                <span class="text-sm font-medium text-gray-700">Excel</span>
              </label>
              <label
                class="p-3 text-center transition border rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50">
                <input type="radio" name="output_format" value="json" class="sr-only">
                <span class="block mb-1 text-xl">{"}</span>
                <span class="text-sm font-medium text-gray-700">JSON</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">5. กำหนดทิศทางหน้ากระดาษ (Page
              Orientation)</label>
            <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
              <label
                class="p-3 text-center transition border border-indigo-500 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 create-orientation-label bg-indigo-50 ring-2 ring-indigo-300">
                <input type="radio" name="page_orientation" value="landscape" class="sr-only" checked>
                <span class="block mb-1 text-xl">🔲</span>
                <span class="text-sm font-medium text-gray-700">แนวนอน (Landscape)</span>
              </label>
              <label
                class="p-3 text-center transition border rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 create-orientation-label">
                <input type="radio" name="page_orientation" value="portrait" class="sr-only">
                <span class="block mb-1 text-xl">📱</span>
                <span class="text-sm font-medium text-gray-700">แนวตั้ง (Portrait)</span>
              </label>
            </div>
          </div>

          <div class="flex flex-col pt-4 space-y-3">
            <button type="submit"
              class="flex items-center justify-center w-full px-8 py-3 font-bold text-white transition bg-gray-800 shadow-lg hover:bg-gray-900 rounded-xl">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                </path>
              </svg>
              ดูตัวอย่าง / พิมพ์รายงาน (Preview)
            </button>

            <button type="submit" formaction="{{ route('phy70.superadmin.document_report.store') }}" formtarget="_self"
              class="flex items-center justify-center w-full px-8 py-3 font-bold text-white shadow-lg btn-gradient rounded-xl">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4">
                </path>
              </svg>
              บันทึกรายงานนี้ไว้ใช้งานภายหลัง (Save)
            </button>
          </div>
        </form>
      </div>

      <!-- Templates Management Section -->
      <div class="flex flex-col h-full p-8 glass-card rounded-2xl">
        <h3 class="pb-2 mb-6 text-xl font-bold text-gray-800 border-b">จัดการ Template (Template Manager)</h3>

        <div class="flex-1 space-y-4 overflow-y-auto">
          @foreach($templates as $template)
          <div class="p-4 transition bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
            <div class="flex items-start justify-between">
              <div>
                <h4 class="text-lg font-bold text-gray-800">{{ $template->name }}</h4>
                <p class="mt-1 text-sm text-gray-500">อัปเดตล่าสุด: {{ $template->updated_at ?
                  $template->updated_at->format('d/m/Y H:i') : '-' }}</p>
                <div class="flex mt-2 space-x-2">
                  <span class="px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded-md">Input: {{
                    is_array($template->input_schema) ? count($template->input_schema) : 0 }} fields</span>
                  <span class="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-md">Output: {{
                    is_array($template->output_schema) ? count($template->output_schema) : 0 }} fields</span>
                </div>
              </div>
              <div class="flex space-x-2">
                <a href="{{ route('phy70.superadmin.document_template.preview', $template->id) }}" target="_blank"
                  class="text-gray-400 transition hover:text-green-600" title="ดูตัวอย่าง (Preview)">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                    </path>
                  </svg>
                </a>
                <button
                  onclick="openEditModal({{ $template->id }}, '{{ addslashes($template->name) }}', '{{ addslashes(json_encode($template->input_schema)) }}', '{{ addslashes(json_encode($template->output_schema)) }}')"
                  class="text-gray-400 transition hover:text-indigo-600" title="แก้ไข">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                    </path>
                  </svg>
                </button>
                <form action="{{ route('phy70.superadmin.document_template.delete', $template->id) }}" method="POST"
                  onsubmit="return confirm('คุณต้องการลบ Template นี้ใช่หรือไม่?');" class="inline-block">
                  @csrf
                  @method('DELETE')
                  <button type="submit" class="text-gray-400 transition hover:text-red-600" title="ลบ">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                      </path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
          @endforeach
          @if($templates->isEmpty())
          <div class="py-10 text-center">
            <div class="inline-block p-4 mb-3 text-gray-400 bg-gray-100 rounded-full">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <p class="font-medium text-gray-500">ยังไม่มีเทมเพลตในระบบ</p>
          </div>
          @endif
        </div>
      </div>
    </div>

    <!-- Saved Reports Section -->
    <div class="mt-8">
      <div class="p-8 glass-card rounded-2xl">
        <h3 class="pb-2 mb-6 text-xl font-bold text-gray-800 border-b">รายงานที่บันทึกไว้ (Saved Reports)</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm">
            <thead class="text-gray-700 bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-sm font-semibold text-left">ชื่อรายงาน</th>
                <th class="px-4 py-3 text-sm font-semibold text-left">เทมเพลตที่ใช้</th>
                <th class="px-4 py-3 text-sm font-semibold text-left">แหล่งข้อมูล</th>
                <th class="px-4 py-3 text-sm font-semibold text-left">รูปแบบ</th>
                <th class="px-4 py-3 text-sm font-semibold text-left">วันที่สร้าง</th>
                <th class="px-4 py-3 text-sm font-semibold text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @foreach($reports as $report)
              <tr class="transition hover:bg-gray-50">
                <td class="px-4 py-3 font-medium text-gray-800">{{ $report->name }}</td>
                <td class="px-4 py-3 text-gray-600">{{ $report->template ? $report->template->name : '-' }}</td>
                <td class="px-4 py-3 text-gray-600">{{ $report->data_source }}</td>
                <td class="px-4 py-3 text-gray-600 uppercase">{{ $report->output_format }}</td>
                <td class="px-4 py-3 text-sm text-gray-500">{{ $report->created_at->format('d/m/Y H:i') }}</td>
                <td class="px-4 py-3 text-center">
                  <div class="flex justify-center space-x-3">
                    <a href="{{ route('phy70.superadmin.document_report.view', $report->id) }}" target="_blank"
                      class="text-indigo-600 hover:text-indigo-900" title="ดูรายงาน">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                        </path>
                      </svg>
                    </a>
                    @php
                    $reportData = [
                    'id' => $report->id,
                    'name' => $report->name,
                    'template_id' => $report->template_id,
                    'data_source' => $report->data_source,
                    'output_format' => $report->output_format,
                    'selected_ids' => $report->selected_ids ?? [],
                    'filters' => $report->filters ?? []
                    ];
                    @endphp
                    <button onclick="openEditReportModal(this)" data-report="{{ json_encode($reportData) }}"
                      class="text-gray-400 transition hover:text-indigo-600" title="แก้ไขรายงานอย่างละเอียด">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                        </path>
                      </svg>
                    </button>
                    <form action="{{ route('phy70.superadmin.document_report.delete', $report->id) }}" method="POST"
                      onsubmit="return confirm('ลบรายงานนี้ใช่หรือไม่?');" class="inline-block">
                      @csrf
                      @method('DELETE')
                      <button type="submit" class="text-red-500 hover:text-red-700" title="ลบ">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                          </path>
                        </svg>
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
              @endforeach
              @if($reports->isEmpty())
              <tr>
                <td colspan="6" class="py-6 text-center text-gray-500">
                  ยังไม่มีรายงานที่ถูกบันทึกไว้
                </td>
              </tr>
              @endif
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal for Creating Template -->
    <div id="createTemplateModal"
      class="fixed inset-0 z-50 flex items-center justify-center hidden w-full h-full overflow-y-auto bg-gray-900 bg-opacity-50">
      <div class="w-full max-w-2xl p-8 m-4 glass-card rounded-2xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-800">สร้าง Report Template</h3>
          <button onclick="document.getElementById('createTemplateModal').classList.add('hidden')"
            class="text-gray-500 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form action="{{ route('phy70.superadmin.document_template.store') }}" method="POST" class="space-y-4">
          @csrf
          <div>
            <label class="block text-sm font-medium text-gray-700">ชื่อ Template</label>
            <input type="text" name="name" class="block w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm"
              required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Schema ข้อมูลต้นทาง (JSON Array)</label>
            <textarea name="input_schema" rows="3"
              class="block w-full p-3 mt-1 font-mono text-sm border border-gray-300 rounded-lg shadow-sm"
              placeholder='[{"field": "project_name", "type": "string"}]'></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Schema การแสดงผลปลายทาง (JSON Layout/Mapping)</label>
            <textarea name="output_schema" rows="4"
              class="block w-full p-3 mt-1 font-mono text-sm border border-gray-300 rounded-lg shadow-sm"
              placeholder='{"layout": "table", "columns": ["project_name", "budget"]}'></textarea>
          </div>
          <div class="flex justify-end pt-4 space-x-3">
            <button type="button" onclick="document.getElementById('createTemplateModal').classList.add('hidden')"
              class="px-6 py-2 font-bold text-gray-800 transition bg-gray-200 shadow-sm rounded-xl hover:bg-gray-300">ยกเลิก</button>
            <button type="submit" class="px-6 py-2 font-bold text-white shadow-md btn-gradient rounded-xl">บันทึก
              Template</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal for Editing Template -->
  <div id="editTemplateModal"
    class="fixed inset-0 z-50 flex items-center justify-center hidden w-full h-full overflow-y-auto bg-gray-900 bg-opacity-50">
    <div class="w-full max-w-2xl p-8 m-4 glass-card rounded-2xl">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-2xl font-bold text-gray-800">แก้ไข Report Template</h3>
        <button onclick="document.getElementById('editTemplateModal').classList.add('hidden')"
          class="text-gray-500 hover:text-gray-800">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <form id="editTemplateForm" action="" method="POST" class="space-y-4">
        @csrf
        @method('PUT')
        <div>
          <label class="block text-sm font-medium text-gray-700">ชื่อ Template</label>
          <input type="text" id="edit_name" name="name"
            class="block w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Schema ข้อมูลต้นทาง (JSON Array)</label>
          <textarea id="edit_input_schema" name="input_schema" rows="3"
            class="block w-full p-3 mt-1 font-mono text-sm border border-gray-300 rounded-lg shadow-sm"
            placeholder='[{"field": "project_name", "type": "string"}]'></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Schema การแสดงผลปลายทาง (JSON Layout/Mapping)</label>
          <textarea id="edit_output_schema" name="output_schema" rows="4"
            class="block w-full p-3 mt-1 font-mono text-sm border border-gray-300 rounded-lg shadow-sm"
            placeholder='{"layout": "table", "columns": ["project_name", "budget"]}'></textarea>
        </div>
        <div class="flex justify-end pt-4 space-x-3">
          <button type="button" onclick="document.getElementById('editTemplateModal').classList.add('hidden')"
            class="px-6 py-2 font-bold text-gray-800 transition bg-gray-200 shadow-sm rounded-xl hover:bg-gray-300">ยกเลิก</button>
          <button type="submit" class="px-6 py-2 font-bold text-white shadow-md btn-gradient rounded-xl">อัปเดต
            Template</button>
        </div>
      </form>
    </div>
  </div>
  <!-- Modal for Editing Report (Detailed) -->
  <div id="editReportModal"
    class="fixed inset-0 z-50 flex items-center justify-center hidden w-full h-full overflow-y-auto bg-gray-900 bg-opacity-50">
    <div class="glass-card w-full max-w-4xl rounded-2xl p-8 m-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-2xl font-bold text-gray-800 gradient-text">แก้ไขรายงาน (Edit Report)</h3>
        <button onclick="document.getElementById('editReportModal').classList.add('hidden')"
          class="text-gray-500 hover:text-gray-800">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <form id="editReportForm" action="" method="POST" class="space-y-6">
        @csrf
        @method('PUT')

        <div class="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อรายงาน</label>
          <input type="text" id="edit_report_name" name="report_name"
            class="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">ข้อมูลต้นทาง (Data Source)</label>
            <select id="edit_data_source" name="data_source"
              class="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="proposals">ข้อมูลโครงการ (Proposals)</option>
              <option value="users">ข้อมูลผู้ใช้งาน (Users)</option>
              <option value="organizations">ข้อมูลหน่วยงาน (Organizations)</option>
              <option value="custom">คิวรี่ข้อมูลขั้นสูง (Advanced Query)</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">เทมเพลต (Template)</label>
            <select id="edit_template_id" name="template_id"
              class="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required>
              <option value="">-- กรุณาเลือกเทมเพลต --</option>
              @foreach($templates as $template)
              <option value="{{ $template->id }}">{{ $template->name }}</option>
              @endforeach
            </select>
          </div>
        </div>

        <!-- Edit Advanced Filters -->
        <div id="edit_advanced_filters" class="p-5 space-y-4 border border-indigo-100 rounded-lg bg-indigo-50">
          <h4 class="flex items-center pb-2 font-bold text-indigo-800 border-b border-indigo-200">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
              </path>
            </svg>
            ตั้งค่าตัวกรอง
          </h4>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block text-xs font-medium text-indigo-700">ปีงบประมาณ</label>
              <select id="edit_filter_year" name="filter_year"
                class="block w-full p-2 mt-1 text-sm border border-gray-300 rounded-md">
                <option value="">-- ทุกปีงบประมาณ --</option>
                <option value="2567">2567</option>
                <option value="2568">2568</option>
                <option value="2569">2569</option>
                <option value="2570">2570</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-indigo-700">สถานะ</label>
              <select id="edit_filter_status" name="filter_status"
                class="block w-full p-2 mt-1 text-sm border border-gray-300 rounded-md">
                <option value="">-- ทุกสถานะ --</option>
                <option value="draft">ฉบับร่าง</option>
                <option value="submitted">ส่งข้อเสนอแล้ว</option>
                <option value="approved">อนุมัติแล้ว</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-indigo-700">เรียงลำดับโดย</label>
              <select id="edit_order_by" name="order_by"
                class="block w-full p-2 mt-1 text-sm border border-gray-300 rounded-md">
                <option value="created_at_desc">วันที่สร้าง (ใหม่ -> เก่า)</option>
                <option value="created_at_asc">วันที่สร้าง (เก่า -> ใหม่)</option>
                <option value="budget_desc">งบประมาณ (มาก -> น้อย)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-indigo-700">จำกัดจำนวน (Limit)</label>
              <input type="number" id="edit_limit" name="limit"
                class="block w-full p-2 mt-1 text-sm border border-gray-300 rounded-md">
            </div>
          </div>

          <div id="edit_custom_query_box" class="hidden pt-4 mt-4 border-t border-indigo-200">
            <label class="block text-xs font-medium text-indigo-700">Custom JSON Query / SQL</label>
            <textarea id="edit_custom_query" name="custom_query" rows="2"
              class="block w-full p-2 mt-1 font-mono text-sm text-green-400 bg-gray-900 border border-gray-300 rounded-md"></textarea>
          </div>

          <!-- Custom Groups Field -->
          <div class="pt-4 mt-4 border-t border-indigo-200">
            <label class="block mb-2 text-xs font-medium text-indigo-700">จัดกลุ่มชื่อโครงการสำคัญ (ที่กำหนดเอง)</label>
            <div id="edit_custom_groups_container" class="space-y-3"></div>
            <button type="button" onclick="addCustomGroup('edit')"
              class="px-3 py-1 mt-2 text-xs text-indigo-600 transition border border-indigo-600 rounded hover:bg-indigo-50">+
              เพิ่มกลุ่มโครงการ</button>
            <input type="hidden" name="custom_groups" id="edit_custom_groups_input">
          </div>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">เลือกโครงการเป้าหมาย (เฉพาะเจาะจง)</label>
          <div class="p-3 space-y-2 overflow-y-auto bg-white border border-gray-300 rounded-lg max-h-48">
            @foreach($proposals as $p)
            <label class="flex items-start p-2 transition rounded cursor-pointer hover:bg-indigo-50">
              <div class="flex items-center h-5">
                <input name="proposals[]" value="{{ $p->id }}" type="checkbox"
                  class="w-4 h-4 text-indigo-600 border-gray-300 rounded edit-proposal-checkbox focus:ring-indigo-500">
              </div>
              <div class="ml-3 text-sm">
                <span class="block font-medium text-gray-700">{{ $p->project_name }}</span>
                <span class="text-xs text-gray-400">รหัส: {{ $p->project_code ?? 'Draft' }}</span>
              </div>
            </label>
            @endforeach
          </div>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">รูปแบบปลายทาง (Output)</label>
          <div class="grid grid-cols-4 gap-3">
            <label class="p-2 text-center border rounded-lg cursor-pointer hover:border-indigo-500 edit-output-label">
              <input type="radio" name="output_format" value="pdf" class="sr-only">
              <span class="block mb-1 text-lg">📄</span><span class="text-xs">PDF</span>
            </label>
            <label class="p-2 text-center border rounded-lg cursor-pointer hover:border-indigo-500 edit-output-label">
              <input type="radio" name="output_format" value="word" class="sr-only">
              <span class="block mb-1 text-lg">📝</span><span class="text-xs">Word</span>
            </label>
            <label class="p-2 text-center border rounded-lg cursor-pointer hover:border-indigo-500 edit-output-label">
              <input type="radio" name="output_format" value="excel" class="sr-only">
              <span class="block mb-1 text-lg">📊</span><span class="text-xs">Excel</span>
            </label>
            <label class="p-2 text-center border rounded-lg cursor-pointer hover:border-indigo-500 edit-output-label">
              <input type="radio" name="output_format" value="json" class="sr-only">
              <span class="block mb-1 text-lg">{"}</span><span class="text-xs">JSON</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ทิศทางหน้ากระดาษ (Page Orientation)</label>
          <div class="grid grid-cols-2 gap-3">
            <label
              class="p-2 text-center border rounded-lg cursor-pointer hover:border-indigo-500 edit-orientation-label">
              <input type="radio" name="page_orientation" value="landscape" class="sr-only">
              <span class="text-xs font-medium text-gray-700">แนวนอน</span>
            </label>
            <label
              class="p-2 text-center border rounded-lg cursor-pointer hover:border-indigo-500 edit-orientation-label">
              <input type="radio" name="page_orientation" value="portrait" class="sr-only">
              <span class="text-xs font-medium text-gray-700">แนวตั้ง</span>
            </label>
          </div>
        </div>

        <div class="flex justify-end pt-4 mt-6 space-x-3 border-t border-gray-200">
          <button type="button" onclick="document.getElementById('editReportModal').classList.add('hidden')"
            class="px-6 py-2 font-bold text-gray-800 transition bg-gray-200 rounded-xl hover:bg-gray-300">ยกเลิก</button>
          <button type="submit"
            class="px-8 py-2 font-bold text-white shadow-md btn-gradient rounded-xl">อัปเดตรายงานทั้งหมด</button>
        </div>
      </form>
    </div>
  </div>
  </div>

  <script>
    // Script for selecting report output format visually
    document.querySelectorAll('input[name="output_format"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const form = this.closest('form');
            form.querySelectorAll('input[name="output_format"]').forEach(r => {
                r.parentElement.classList.remove('border-indigo-500', 'bg-indigo-50', 'ring-2', 'ring-indigo-300');
            });
            if(this.checked) {
                this.parentElement.classList.add('border-indigo-500', 'bg-indigo-50', 'ring-2', 'ring-indigo-300');
            }
        });
    });

    document.querySelectorAll('input[name="page_orientation"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const form = this.closest('form');
            form.querySelectorAll('input[name="page_orientation"]').forEach(r => {
                r.parentElement.classList.remove('border-indigo-500', 'bg-indigo-50', 'ring-2', 'ring-indigo-300');
            });
            if(this.checked) {
                this.parentElement.classList.add('border-indigo-500', 'bg-indigo-50', 'ring-2', 'ring-indigo-300');
            }
        });
    });

    // Edit Modal logic
    function openEditModal(id, name, inputSchema, outputSchema) {
        document.getElementById('editTemplateModal').classList.remove('hidden');
        
        let updateRoute = "{{ url('app/phy70/superadmin/document-builder/template') }}/" + id;
        document.getElementById('editTemplateForm').action = updateRoute;
        
        document.getElementById('edit_name').value = name;
        
        // Handle schemas that might be encoded as JSON strings
        try {
            document.getElementById('edit_input_schema').value = inputSchema && inputSchema !== 'null' ? JSON.stringify(JSON.parse(inputSchema), null, 4) : '';
            document.getElementById('edit_output_schema').value = outputSchema && outputSchema !== 'null' ? JSON.stringify(JSON.parse(outputSchema), null, 4) : '';
        } catch (e) {
            document.getElementById('edit_input_schema').value = inputSchema;
            document.getElementById('edit_output_schema').value = outputSchema;
        }
    }

    // Edit Report Modal logic (Detailed)
    function openEditReportModal(btn) {
        let report = JSON.parse(btn.getAttribute('data-report'));
        document.getElementById('editReportModal').classList.remove('hidden');
        
        document.getElementById('editReportForm').action = "{{ url('app/phy70/superadmin/document-builder/report') }}/" + report.id;
        
        // Basic Info
        document.getElementById('edit_report_name').value = report.name || '';
        document.getElementById('edit_data_source').value = report.data_source || 'proposals';
        document.getElementById('edit_template_id').value = report.template_id || '';
        
        // Filters
        let filters = report.filters || {};
        document.getElementById('edit_filter_year').value = filters.year || '';
        document.getElementById('edit_filter_status').value = filters.status || '';
        document.getElementById('edit_order_by').value = filters.order_by || 'created_at_desc';
        document.getElementById('edit_limit').value = filters.limit || '';
        document.getElementById('edit_custom_query').value = filters.custom_query || '';
        
        // Render existing custom groups
        document.getElementById('edit_custom_groups_container').innerHTML = '';
        if (filters.custom_groups && Array.isArray(filters.custom_groups)) {
            filters.custom_groups.forEach(group => {
                addCustomGroup('edit', group.group_name, group.proposal_ids, group.strategy, group.master_plan, group.plan14, group.regional_goal, group.plan);
            });
        }
        updateCustomGroupsInput('edit');
        
        // Trigger data source change for custom query box
        document.getElementById('edit_data_source').dispatchEvent(new Event('change'));

        // Proposals checkboxes
        let selectedIds = report.selected_ids || [];
        document.querySelectorAll('.edit-proposal-checkbox').forEach(cb => {
            cb.checked = selectedIds.includes(cb.value) || selectedIds.includes(parseInt(cb.value));
        });

        // Output format
        let output = report.output_format || 'pdf';
        document.querySelectorAll('#editReportModal input[name="output_format"]').forEach(radio => {
            radio.checked = (radio.value === output);
            let label = radio.parentElement;
            if(radio.checked) {
                label.classList.add('border-indigo-500', 'bg-indigo-50', 'ring-2', 'ring-indigo-300');
            } else {
                label.classList.remove('border-indigo-500', 'bg-indigo-50', 'ring-2', 'ring-indigo-300');
            }
        });
        
        // Page orientation
        let orientation = report.filters?.page_orientation || 'landscape';
        document.querySelectorAll('#editReportModal input[name="page_orientation"]').forEach(radio => {
            radio.checked = (radio.value === orientation);
            let label = radio.parentElement;
            if(radio.checked) {
                label.classList.add('border-indigo-500', 'bg-indigo-50', 'ring-2', 'ring-indigo-300');
            } else {
                label.classList.remove('border-indigo-500', 'bg-indigo-50', 'ring-2', 'ring-indigo-300');
            }
        });
    }

    // Advanced filter toggle for Edit Modal
    document.getElementById('edit_data_source').addEventListener('change', function() {
        const val = this.value;
        const customBox = document.getElementById('edit_custom_query_box');
        if (val === 'custom') {
            customBox.classList.remove('hidden');
        } else {
            customBox.classList.add('hidden');
        }
    });

    // Output format styling for Edit Modal
    document.querySelectorAll('#editReportModal input[name="output_format"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('#editReportModal .edit-output-label').forEach(label => {
                label.classList.remove('border-indigo-500', 'bg-indigo-50', 'ring-2', 'ring-indigo-300');
            });
            if(this.checked) {
                this.parentElement.classList.add('border-indigo-500', 'bg-indigo-50', 'ring-2', 'ring-indigo-300');
            }
        });
    });
    // Advanced filter toggle logic
    document.getElementById('data_source').addEventListener('change', function() {
        const val = this.value;
        const customBox = document.getElementById('custom_query_box');
        
        if (val === 'custom') {
            customBox.classList.remove('hidden');
        } else {
            customBox.classList.add('hidden');
        }
    });
    
    // Custom Groups Logic
    const allProposals = @json($proposals);
    
    window.addCustomGroup = function(mode, groupName = '', selectedIds = [], strategy = '', masterPlan = '', plan14 = '', regionalGoal = '', selectedPlan = '') {
        const container = document.getElementById(mode + '_custom_groups_container');
        const groupId = 'group_' + Math.random().toString(36).substr(2, 9);
        const uniquePlans = [...new Set(allProposals.map(p => p.plan).filter(Boolean))];
        
        let html = `
            <div class="p-3 border rounded bg-gray-50 custom-group-item" id="${groupId}">
                <div class="flex items-start justify-between mb-2">
                    <div class="w-full mr-2 space-y-2">
                        <select class="block w-full p-2 text-sm font-semibold text-indigo-700 border border-indigo-300 rounded-md shadow-sm bg-indigo-50 group-plan-select" onchange="filterProposalsByPlan('${mode}', '${groupId}'); updateCustomGroupsInput('${mode}')">
                            <option value="">-- เลือกแผนงานย่อยของประเด็น (ต้องเลือกเพื่อกรองโครงการด้านล่าง) --</option>
                            ${uniquePlans.map(plan => `<option value="${plan.replace(/"/g, '&quot;')}" ${selectedPlan === plan ? 'selected' : ''}>แผนงาน: ${plan}</option>`).join('')}
                        </select>
                        <select class="block w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm group-strategy-select" onchange="updateCustomGroupsInput('${mode}')">
                            <option value="">-- เลือกยุทธศาสตร์ชาติ (ถ้ามี) --</option>
                            <option value="1" ${strategy === '1' ? 'selected' : ''}>1. ยุทธศาสตร์ชาติด้านความมั่นคง</option>
                            <option value="2" ${strategy === '2' ? 'selected' : ''}>2. ยุทธศาสตร์ชาติด้านการสร้าง ความสามารถในการแข่งขัน</option>
                            <option value="3" ${strategy === '3' ? 'selected' : ''}>3. ยุทธศาสตร์ชาติด้านการพัฒนา และเสริมสร้างศักยภาพมนุษย์</option>
                            <option value="4" ${strategy === '4' ? 'selected' : ''}>4. ยุทธศาสตร์ชาติด้านการสร้าง โอกาสและความเสมอภาคทาง สังคม</option>
                            <option value="5" ${strategy === '5' ? 'selected' : ''}>5. ยุทธศาสตร์ชาติด้านการสร้าง การเติบโตบนคุณภาพชีวิตที่ เป็นมิตรกับสิ่งแวดล้อม</option>
                            <option value="6" ${strategy === '6' ? 'selected' : ''}>6. ยุทธศาสตร์ชาติด้านการปรับ สมดุลและพัฒนาระบบการ บริหารจัดการภาครัฐ</option>
                        </select>
                        <select class="block w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm group-master-plan-select" onchange="updateCustomGroupsInput('${mode}')">
                            <option value="">-- เลือกแผนแม่บทภายใต้ยุทธศาสตร์ชาติ (ถ้ามี) --</option>
                            <option value="1" ${masterPlan === '1' ? 'selected' : ''}>1. ความมั่นคง</option>
                            <option value="2" ${masterPlan === '2' ? 'selected' : ''}>2. การต่างประเทศ</option>
                            <option value="3" ${masterPlan === '3' ? 'selected' : ''}>3. การเกษตร</option>
                            <option value="4" ${masterPlan === '4' ? 'selected' : ''}>4. อุตสาหกรรมและบริการแห่งอนาคต</option>
                            <option value="5" ${masterPlan === '5' ? 'selected' : ''}>5. การท่องเที่ยว</option>
                            <option value="6" ${masterPlan === '6' ? 'selected' : ''}>6. พื้นที่และเมืองน่าอยู่อัจฉริยะ</option>
                            <option value="7" ${masterPlan === '7' ? 'selected' : ''}>7. โครงสร้างพื้นฐาน ระบบโลจิสติกส์ และดิจิทัล</option>
                            <option value="8" ${masterPlan === '8' ? 'selected' : ''}>8. ผู้ประกอบการและวิสาหกิจขนาดกลางและขนาดย่อมยุคใหม่</option>
                            <option value="9" ${masterPlan === '9' ? 'selected' : ''}>9. เขตเศรษฐกิจพิเศษ</option>
                            <option value="10" ${masterPlan === '10' ? 'selected' : ''}>10. การปรับเปลี่ยนค่านิยมและวัฒนธรรม</option>
                            <option value="11" ${masterPlan === '11' ? 'selected' : ''}>11. การพัฒนาศักยภาพคนตลอดช่วงชีวิต</option>
                            <option value="12" ${masterPlan === '12' ? 'selected' : ''}>12. การพัฒนาการเรียนรู้</option>
                            <option value="13" ${masterPlan === '13' ? 'selected' : ''}>13. การเสริมสร้างให้คนไทยมีสุขภาวะที่ดี</option>
                            <option value="14" ${masterPlan === '14' ? 'selected' : ''}>14. ศักยภาพการกีฬา</option>
                            <option value="15" ${masterPlan === '15' ? 'selected' : ''}>15. พลังทางสังคม</option>
                            <option value="16" ${masterPlan === '16' ? 'selected' : ''}>16. เศรษฐกิจฐานราก</option>
                            <option value="17" ${masterPlan === '17' ? 'selected' : ''}>17. ความเสมอภาคและหลักประกันทางสังคม</option>
                            <option value="18" ${masterPlan === '18' ? 'selected' : ''}>18. การเติบโตอย่างยั่งยืน</option>
                            <option value="19" ${masterPlan === '19' ? 'selected' : ''}>19. การบริหารจัดการน้ำทั้งระบบ</option>
                            <option value="20" ${masterPlan === '20' ? 'selected' : ''}>20. การบริการประชาชนและประสิทธิภาพภาครัฐ</option>
                            <option value="21" ${masterPlan === '21' ? 'selected' : ''}>21. การต่อต้านการทุจริตและประพฤติมิชอบ</option>
                            <option value="22" ${masterPlan === '22' ? 'selected' : ''}>22. กฎหมายและกระบวนการยุติธรรม</option>
                            <option value="23" ${masterPlan === '23' ? 'selected' : ''}>23. การวิจัยและพัฒนานวัตกรรม</option>
                        </select>
                        <select class="block w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm group-plan14-select" onchange="updateCustomGroupsInput('${mode}')">
                            <option value="">-- เลือกแผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ ฉบับที่ ๑๔ (ถ้ามี) --</option>
                            <optgroup label="Transform เศรษฐกิจ">
                                <option value="1" ${plan14 === '1' ? 'selected' : ''}>1. การปรับโครงสร้างเศรษฐกิจรายสาขาและยกระดับเครื่องยนต์เศรษฐกิจใหม่</option>
                                <option value="2" ${plan14 === '2' ? 'selected' : ''}>2. การพัฒนาระบบนิเวศที่เอื้อต่อการปรับตัวของแรงงาน ธุรกิจ และภาครัฐ</option>
                                <option value="3" ${plan14 === '3' ? 'selected' : ''}>3. การลดสัดส่วนเศรษฐกิจนอกระบบ</option>
                                <option value="4" ${plan14 === '4' ? 'selected' : ''}>4. การพัฒนา SMEs ให้แข่งขันได้อย่างเป็นธรรม</option>
                                <option value="5" ${plan14 === '5' ? 'selected' : ''}>5. การรักษาเสถียรภาพทางเศรษฐกิจ</option>
                            </optgroup>
                            <optgroup label="Reform ภาครัฐ">
                                <option value="6" ${plan14 === '6' ? 'selected' : ''}>1. การปฏิรูปการบริหารจัดการภาครัฐ</option>
                                <option value="7" ${plan14 === '7' ? 'selected' : ''}>2. การปรับปรุงระเบียบ ขั้นตอน และกฎหมาย</option>
                                <option value="8" ${plan14 === '8' ? 'selected' : ''}>3. การแก้ไขปัญหาทุจริตคอร์รัปชัน</option>
                            </optgroup>
                            <optgroup label="Upgrade ทุนมนุษย์">
                                <option value="9" ${plan14 === '9' ? 'selected' : ''}>1. การส่งเสริมการมีจำนวนประชากร รองรับการพัฒนาประเทศ</option>
                                <option value="10" ${plan14 === '10' ? 'selected' : ''}>2. การปรับแนวคิดและรูปแบบการจัดการศึกษาและการเรียนรู้</option>
                                <option value="11" ${plan14 === '11' ? 'selected' : ''}>3. การปรับกลไกการพัฒนาทักษะแรงงานที่มุ่งผลสัมฤทธิ</option>
                                <option value="12" ${plan14 === '12' ? 'selected' : ''}>4. การวางรากฐานสวัสดิการที่มั่นคง</option>
                            </optgroup>
                            <optgroup label="Sustain ทรัพยากรและสิ่งแวดล้อม">
                                <option value="13" ${plan14 === '13' ? 'selected' : ''}>1. การบริหารจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อมให้เป็นฐานในการเติบโตทางเศรษฐกิจของประเทศอย่างยั่งยืน</option>
                                <option value="14" ${plan14 === '14' ? 'selected' : ''}>2. การรับมือกับการเปลี่ยนแปลงสภาพภูมิอากาศเพื่อสร้างภูมิคุ้มกันทางเศรษฐกิจและสังคม</option>
                                <option value="15" ${plan14 === '15' ? 'selected' : ''}>3. การมุ่งสู่สังคมคาร์บอนต่ำเพื่อเพิ่มความสามารถในการแข่งขัน</option>
                            </optgroup>
                            <optgroup label="Transfer เทคโนโลยีและนวัตกรรม">
                                <option value="16" ${plan14 === '16' ? 'selected' : ''}>1. การลงทุนพัฒนาเทคโนโลยีและนวัตกรรม</option>
                                <option value="17" ${plan14 === '17' ? 'selected' : ''}>2. การพัฒนาระบบนิเวศวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม</option>
                            </optgroup>
                        </select>
                        <select class="block w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm group-regional-goal-select" onchange="updateCustomGroupsInput('${mode}')">
                            <option value="">-- เลือกเป้าหมายและแนวทางการพัฒนาภาค (ถ้ามี) --</option>
                            <option value="N1" ${regionalGoal === 'N1' ? 'selected' : ''}>แนวทางการพัฒนาที่ 1 เกษตรมูลค่าสูงบนฐานนวัตกรรมสีเขียวที่ตรวจสอบได้</option>
                            <option value="N2" ${regionalGoal === 'N2' ? 'selected' : ''}>แนวทางการพัฒนาที่ 2 ท่องเที่ยวคุณภาพมูลค่าสูงและบริการสุขภาพระดับโลก</option>
                            <option value="N3" ${regionalGoal === 'N3' ? 'selected' : ''}>แนวทางการพัฒนาที่ 3 อุตสาหกรรมนวัตกรรมฐานชีวภาพและดิจิทัลสีเขียว</option>
                            <option value="N4" ${regionalGoal === 'N4' ? 'selected' : ''}>แนวทางการพัฒนาที่ 4 การค้าชายแดน และระบบโลจิสติกส์ที่เชื่อมโยงห่วงโซ่เศรษฐกิจภูมิภาค</option>
                            <option value="N5" ${regionalGoal === 'N5' ? 'selected' : ''}>แนวทางการพัฒนาที่ 5 การเพิ่มผลิตภาพแรงงานและยกระดับคุณภาพชีวิต</option>
                            <option value="N6" ${regionalGoal === 'N6' ? 'selected' : ''}>แนวทางการพัฒนาที่ 6 การจัดการทรัพยากรธรรมชาติและมลพิษเชิงรุก</option>
                        </select>
                        <input type="text" placeholder="ชื่อโครงการสำคัญ (ที่กำหนดเอง)..." class="block w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm group-name-input" value="${groupName.replace(/"/g, '&quot;')}" onchange="updateCustomGroupsInput('${mode}')" onkeyup="updateCustomGroupsInput('${mode}')">
                    </div>
                    <button type="button" onclick="document.getElementById('${groupId}').remove(); updateCustomGroupsInput('${mode}');" class="mt-2 text-red-500 hover:text-red-700 whitespace-nowrap">ลบ</button>
                </div>
                <div class="mb-1 text-xs text-gray-500">เลือกโครงการภายใต้ชื่อนี้:</div>
                <div class="p-2 space-y-1 overflow-y-auto bg-white border border-gray-200 rounded max-h-40">
        `;
        
        allProposals.forEach(p => {
            const isChecked = selectedIds.includes(p.id) || selectedIds.includes(p.id.toString()) ? 'checked' : '';
            const planValue = p.plan || '';
            const displayStyle = (selectedPlan === '' || planValue === selectedPlan) ? 'flex' : 'none';
            html += `
                <label class="items-start p-1 rounded cursor-pointer hover:bg-indigo-50 group-proposal-label" data-plan="${planValue.replace(/"/g, '&quot;')}" style="display: ${displayStyle};">
                    <input type="checkbox" value="${p.id}" ${isChecked} onchange="updateCustomGroupsInput('${mode}')" class="group-proposal-checkbox focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mt-0.5">
                    <div class="ml-2 text-xs">
                        <span class="font-medium text-gray-700">${p.project_name}</span>
                        <span class="text-gray-400"> (แผนงาน: ${planValue})</span>
                    </div>
                </label>
            `;
        });
        
        if (allProposals.length === 0) {
            html += `<div class="py-2 text-xs text-center text-gray-500">ไม่มีข้อมูลโครงการในระบบ</div>`;
        }
        
        html += `
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', html);
        updateCustomGroupsInput(mode);
    };

    window.filterProposalsByPlan = function(mode, groupId) {
        const item = document.getElementById(groupId);
        const selectedPlan = item.querySelector('.group-plan-select').value;
        const proposalLabels = item.querySelectorAll('.group-proposal-label');
        
        proposalLabels.forEach(label => {
            const plan = label.getAttribute('data-plan');
            const checkbox = label.querySelector('.group-proposal-checkbox');
            if (selectedPlan === '' || plan === selectedPlan) {
                label.style.display = 'flex';
            } else {
                label.style.display = 'none';
                if (checkbox.checked) {
                    checkbox.checked = false; // Uncheck if hidden
                }
            }
        });
    };
    
    window.updateCustomGroupsInput = function(mode) {
        const container = document.getElementById(mode + '_custom_groups_container');
        const groups = [];
        const allCheckedIds = new Set();
        
        container.querySelectorAll('.custom-group-item').forEach(item => {
            const groupName = item.querySelector('.group-name-input').value.trim();
            const strategy = item.querySelector('.group-strategy-select') ? item.querySelector('.group-strategy-select').value : '';
            const masterPlan = item.querySelector('.group-master-plan-select') ? item.querySelector('.group-master-plan-select').value : '';
            const plan14 = item.querySelector('.group-plan14-select') ? item.querySelector('.group-plan14-select').value : '';
            const regionalGoal = item.querySelector('.group-regional-goal-select') ? item.querySelector('.group-regional-goal-select').value : '';
            const selectedPlan = item.querySelector('.group-plan-select') ? item.querySelector('.group-plan-select').value : '';
            const checkedBoxes = item.querySelectorAll('.group-proposal-checkbox:checked');
            const proposalIds = Array.from(checkedBoxes).map(cb => {
                allCheckedIds.add(cb.value);
                return cb.value;
            });
            
            if (groupName || strategy || masterPlan || plan14 || regionalGoal || selectedPlan || proposalIds.length > 0) {
                groups.push({
                    group_name: groupName,
                    strategy: strategy,
                    master_plan: masterPlan,
                    plan14: plan14,
                    regional_goal: regionalGoal,
                    plan: selectedPlan,
                    proposal_ids: proposalIds
                });
            }
        });
        
        // Disable checkboxes in other groups if they are selected elsewhere
        container.querySelectorAll('.group-proposal-checkbox').forEach(cb => {
            if (!cb.checked && allCheckedIds.has(cb.value)) {
                cb.disabled = true;
                cb.parentElement.classList.add('opacity-50', 'cursor-not-allowed');
                cb.parentElement.classList.remove('hover:bg-indigo-50', 'cursor-pointer');
            } else {
                cb.disabled = false;
                cb.parentElement.classList.remove('opacity-50', 'cursor-not-allowed');
                cb.parentElement.classList.add('hover:bg-indigo-50', 'cursor-pointer');
            }
        });
        
        document.getElementById(mode + '_custom_groups_input').value = JSON.stringify(groups);
    };
    
    // Initialize forms before submit to ensure inputs are updated
    document.getElementById('createReportForm').addEventListener('submit', function() {
        updateCustomGroupsInput('create');
    });
    document.getElementById('editReportForm').addEventListener('submit', function() {
        updateCustomGroupsInput('edit');
    });

  </script>
</x-phy70::layouts.master>