<?php

namespace Modules\Phy70\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Phy70\Models\Phy70Proposal;

class Phy70Controller extends Controller
{
    /** Fiscal years (พ.ศ.) the plan spans — used to slice budgets by year. */
    private const FISCAL_YEARS = ['2571', '2572', '2573', '2574', '2575'];

    private function guard()
    {
        return Auth::guard('phy70');
    }

    public function index()
    {
        $user = $this->guard()->user();
        $proposals = collect();

        if ($user) {
            if ($user->role === 'superadmin') {
                $proposals = Phy70Proposal::orderBy('created_at', 'desc')->get();
            } else {
                $proposals = Phy70Proposal::where('organization_id', $user->organization_id)
                    ->orderBy('created_at', 'desc')
                    ->get();
            }
        }

        // Get all registered organizations with their coordinators (admins)
        $organizations = \Modules\Phy70\Models\Phy70Organization::with(['users'])->get()->map(function($org) {
            $admin = $org->users->where('role', 'admin')->first();
            $org->coordinator_name = $admin ? $admin->name : 'ไม่ระบุ';
            $org->coordinator_phone = $admin ? $admin->phone_number : 'ไม่ระบุ';
            return $org;
        });

        return view('phy70::index', compact('user', 'proposals', 'organizations'));
    }

    public function createProposal()
    {
        if (!$this->guard()->check()) {
            return redirect('/app/phy70/login')->with('info', 'กรุณาเข้าสู่ระบบก่อนกรอกข้อเสนอโครงการ');
        }

        return view('phy70::proposals.create');
    }

    public function storeProposal(Request $request)
    {
        $user = $this->guard()->user();
        if (!$user) {
            return redirect('/app/phy70/login');
        }

        $isDraft = $request->input('status') === 'draft';
        $req = $isDraft ? 'nullable' : 'required';

        $request->validate([
            // Section 2
            'province_issue' => $req . '|string',
            'operating_year' => $req . '|string',
            'development_guideline' => 'nullable|string',
            'main_plan' => 'nullable|string',
            'plan' => 'nullable|string',
            // Section 3
            'target_province' => 'nullable|string|max:255',
            'target_district' => 'nullable|array',
            'target_district.*' => 'string|max:255',
            'target_subdistrict' => 'nullable|array',
            'target_subdistrict.*' => 'string|max:255',
            'target_group' => $req . '|string',
            'project_name' => 'required|string|max:255',
            'principles' => $req . '|string',
            'objectives' => $req . '|string',
            'kpis' => 'nullable|array',
            'output' => $req . '|string',
            'outcome' => $req . '|string',
            'main_activity' => 'nullable|string',
            'operating_agency' => $req . '|string|max:255',
            'responsible_person' => $req . '|string|max:255',
            'position' => 'nullable|string|max:255',
            'phone_number' => $req . '|string|max:50',
            'attachments.*' => 'nullable|file|max:10240',
            'documents' => $isDraft ? 'nullable|array' : 'required|array|min:2',
            'documents.*' => 'file|mimes:pdf,doc,docx,xls,xlsx,zip,rar|max:20480',
            'yearly_budgets' => 'nullable|array',
            'yearly_budgets.*' => 'nullable|numeric|min:0',
            'activities' => 'nullable|array',
            'activities.*.name' => $req . '|string',
            'activities.*.budget' => $req . '|numeric|min:0',
            'activities.*.yearly_budgets' => 'nullable|array',
            'activities.*.yearly_budgets.*' => 'nullable|numeric|min:0',
            'activities.*.responsible_person' => $req . '|string|max:255',
            'activities.*.operating_agency' => 'nullable|string|max:255',
            'activities.*.involved_agencies' => 'nullable|string|max:255',
            'activities.*.guideline' => $req . '|string|max:255',
        ], [
            'province_issue.required' => 'กรุณาเลือกประเด็นการพัฒนาของจังหวัด',
            'project_name.required' => 'กรุณากรอกชื่อโครงการ',
            'operating_agency.required' => 'กรุณากรอกหน่วยดำเนินการ',
            'responsible_person.required' => 'กรุณากรอกผู้รับผิดชอบ',
            'phone_number.required' => 'กรุณากรอกหมายเลขโทรศัพท์',
            'activities.*.name.required' => 'กรุณากรอกชื่อกิจกรรมในส่วนที่ 4',
            'activities.*.budget.required' => 'กรุณากรอกงบประมาณของกิจกรรมในส่วนที่ 4',
            'activities.*.budget.numeric' => 'งบประมาณในส่วนที่ 4 ต้องเป็นตัวเลขเท่านั้น',
            'activities.*.budget.min' => 'งบประมาณในส่วนที่ 4 ต้องมากกว่าหรือเท่ากับ 0',
            'activities.*.responsible_person.required' => 'กรุณากรอกผู้รับผิดชอบกิจกรรมในส่วนที่ 4',
            'activities.*.guideline.required' => 'กรุณาเลือกแนวทางการพัฒนาจังหวัดในส่วนที่ 4',
            'documents.required' => 'กรุณาแนบเอกสารโครงการอย่างน้อย 2 ไฟล์',
            'documents.min' => 'กรุณาแนบเอกสารโครงการอย่างน้อย 2 ไฟล์',
            'documents.*.mimes' => 'รองรับเฉพาะไฟล์ PDF, Word, Excel, ZIP, RAR เท่านั้น',
            'documents.*.max' => 'ขนาดไฟล์ต้องไม่เกิน 20MB',
        ]);

        $attachments = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                if ($file->isValid()) {
                    $path = $file->store('phy70/attachments', 'public');
                    $attachments[] = [
                        'name' => $file->getClientOriginalName(),
                        'path' => $path,
                    ];
                }
            }
        }

        $documents = [];
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                if ($file->isValid()) {
                    $path = $file->store('phy70/documents', 'public');
                    $documents[] = [
                        'name' => $file->getClientOriginalName(),
                        'path' => $path
                    ];
                }
            }
        }

        $proposal = Phy70Proposal::create([
            'organization_id' => $user->organization_id,
            'user_id' => $user->id,
            'province_issue' => $request->province_issue,
            'operating_year' => $request->operating_year,
            'development_guideline' => $request->development_guideline,
            'main_plan' => $request->main_plan,
            'plan' => $request->plan,
            'target_province' => $request->target_province,
            'target_district' => $request->target_district,
            'target_subdistrict' => $request->target_subdistrict,
            'target_group' => $request->target_group,
            'project_name' => $request->project_name,
            'principles' => $request->principles,
            'objectives' => $request->objectives,
            'kpis' => $request->kpis,
            'output' => $request->output,
            'outcome' => $request->outcome,
            'main_activity' => $request->main_activity,
            'operating_agency' => $request->operating_agency,
            'responsible_person' => $request->responsible_person,
            'position' => $request->position,
            'phone_number' => $request->phone_number,
            'attachments' => $attachments,
            'documents' => $documents,
            'yearly_budgets' => $request->yearly_budgets,
            'activities' => $request->activities,
            'status' => $request->input('status', 'submitted'),
        ]);

        if ($proposal->status === 'submitted' && empty($proposal->project_code)) {
            $proposal->project_code = 'PJ-2570-' . str_pad($proposal->id, 4, '0', STR_PAD_LEFT);
            $activities = $proposal->activities ?? [];
            if (is_array($activities)) {
                foreach ($activities as $index => &$activity) {
                    if (!isset($activity['activity_code'])) {
                        $activity['activity_code'] = 'ACT-2570-' . str_pad($proposal->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($index + 1, 2, '0', STR_PAD_LEFT);
                    }
                }
                $proposal->activities = $activities;
            }
            $proposal->save();
        }

        $msg = $isDraft ? 'บันทึกร่างข้อเสนอโครงการเรียบร้อยแล้ว' : 'ส่งข้อเสนอโครงการเรียบร้อยแล้ว';
        return redirect('/app/phy70')->with('success', $msg);
    }

    public function showProposal($id)
    {
        $user = $this->guard()->user();
        if (!$user) {
            return redirect('/app/phy70/login');
        }

        $query = Phy70Proposal::query();
        if ($user->role !== 'superadmin') {
            $query->where('organization_id', $user->organization_id);
        }
        $proposal = $query->findOrFail($id);

        return view('phy70::proposals.show', compact('proposal'));
    }

    public function showCanvas($id)
    {
        $user = $this->guard()->user();
        if (!$user) {
            return redirect('/app/phy70/login');
        }

        $query = Phy70Proposal::query();
        if ($user->role !== 'superadmin') {
            $query->where('organization_id', $user->organization_id);
        }
        $proposal = $query->findOrFail($id);

        return view('phy70::proposals.canvas', compact('proposal'));
    }

    public function editProposal($id)
    {
        $user = $this->guard()->user();
        if (!$user) {
            return redirect('/app/phy70/login');
        }

        $query = Phy70Proposal::query();
        if ($user->role !== 'superadmin') {
            $query->where('organization_id', $user->organization_id);
        }
        $proposal = $query->findOrFail($id);

        if ($proposal->status !== 'draft' && $user->role !== 'superadmin') {
            return redirect('/app/phy70')->with('error', 'ไม่สามารถแก้ไขโครงการที่ส่งแล้วได้');
        }

        $isEdit = true;
        return view('phy70::proposals.create', compact('proposal', 'isEdit'));
    }

    public function updateProposal(Request $request, $id)
    {
        $user = $this->guard()->user();
        if (!$user) {
            return redirect('/app/phy70/login');
        }

        $query = Phy70Proposal::query();
        if ($user->role !== 'superadmin') {
            $query->where('organization_id', $user->organization_id);
        }
        $proposal = $query->findOrFail($id);

        if ($proposal->status !== 'draft' && $user->role !== 'superadmin') {
            return redirect('/app/phy70')->with('error', 'ไม่สามารถแก้ไขโครงการที่ส่งแล้วได้');
        }

        $isDraft = $request->input('status') === 'draft';
        $req = $isDraft ? 'nullable' : 'required';

        $request->validate([
            // Section 2
            'province_issue' => $req . '|string',
            'operating_year' => $req . '|string',
            'development_guideline' => 'nullable|string',
            'main_plan' => 'nullable|string',
            'plan' => 'nullable|string',
            // Section 3
            'target_province' => 'nullable|string|max:255',
            'target_district' => 'nullable|array',
            'target_district.*' => 'string|max:255',
            'target_subdistrict' => 'nullable|array',
            'target_subdistrict.*' => 'string|max:255',
            'target_group' => $req . '|string',
            'project_name' => 'required|string|max:255',
            'principles' => $req . '|string',
            'objectives' => $req . '|string',
            'kpis' => 'nullable|array',
            'output' => $req . '|string',
            'outcome' => $req . '|string',
            'main_activity' => 'nullable|string',
            'operating_agency' => $req . '|string|max:255',
            'responsible_person' => $req . '|string|max:255',
            'position' => 'nullable|string|max:255',
            'phone_number' => $req . '|string|max:50',
            'attachments.*' => 'nullable|file|max:10240',
            'documents' => $isDraft ? 'nullable|array' : 'nullable|array', // Allow no new documents for edits
            'documents.*' => 'file|mimes:pdf,doc,docx,xls,xlsx,zip,rar|max:20480',
            'yearly_budgets' => 'nullable|array',
            'yearly_budgets.*' => 'nullable|numeric|min:0',
            'activities' => 'nullable|array',
            'activities.*.name' => $req . '|string',
            'activities.*.budget' => $req . '|numeric|min:0',
            'activities.*.yearly_budgets' => 'nullable|array',
            'activities.*.yearly_budgets.*' => 'nullable|numeric|min:0',
            'activities.*.responsible_person' => $req . '|string|max:255',
            'activities.*.operating_agency' => 'nullable|string|max:255',
            'activities.*.involved_agencies' => 'nullable|string|max:255',
            'activities.*.guideline' => $req . '|string|max:255',
        ]);

        $documents = is_array($proposal->documents) ? $proposal->documents : [];
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                if ($file->isValid()) {
                    $path = $file->store('phy70/documents', 'public');
                    $documents[] = [
                        'name' => $file->getClientOriginalName(),
                        'path' => $path
                    ];
                }
            }
        }

        // Only enforce minimum 2 files if it's not a draft and they haven't uploaded enough
        if (!$isDraft && count($documents) < 2) {
            return back()->withErrors(['documents' => 'กรุณาแนบเอกสารโครงการอย่างน้อย 2 ไฟล์'])->withInput();
        }

        $proposal->update([
            'province_issue' => $request->province_issue,
            'operating_year' => $request->operating_year,
            'development_guideline' => $request->development_guideline,
            'main_plan' => $request->main_plan,
            'plan' => $request->plan,
            'target_province' => $request->target_province,
            'target_district' => $request->target_district,
            'target_subdistrict' => $request->target_subdistrict,
            'target_group' => $request->target_group,
            'project_name' => $request->project_name,
            'principles' => $request->principles,
            'objectives' => $request->objectives,
            'kpis' => $request->kpis,
            'output' => $request->output,
            'outcome' => $request->outcome,
            'main_activity' => $request->main_activity,
            'operating_agency' => $request->operating_agency,
            'responsible_person' => $request->responsible_person,
            'position' => $request->position,
            'phone_number' => $request->phone_number,
            'documents' => $documents,
            'yearly_budgets' => $request->yearly_budgets,
            'activities' => $request->activities,
            'status' => $request->input('status', 'submitted'),
        ]);

        if ($proposal->status === 'submitted' && empty($proposal->project_code)) {
            $proposal->project_code = 'PJ-2570-' . str_pad($proposal->id, 4, '0', STR_PAD_LEFT);
            $activities = $proposal->activities ?? [];
            if (is_array($activities)) {
                foreach ($activities as $index => &$activity) {
                    if (!isset($activity['activity_code'])) {
                        $activity['activity_code'] = 'ACT-2570-' . str_pad($proposal->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($index + 1, 2, '0', STR_PAD_LEFT);
                    }
                }
                $proposal->activities = $activities;
            }
            $proposal->save();
        }

        $msg = $isDraft ? 'บันทึกร่างข้อเสนอโครงการเรียบร้อยแล้ว' : 'ส่งข้อเสนอโครงการเรียบร้อยแล้ว';
        return redirect('/app/phy70/proposal/' . $proposal->id)->with('success', $msg);
    }

    public function manual()
    {
        return view('phy70::manual');
    }

    /**
     * Executive dashboard — summarises project & activity data for an
     * at-a-glance overview. Reads live proposals from the database; sections
     * with no data render an explicit "ยังไม่มีข้อมูล" (no data yet) state.
     */
    public function dashboard()
    {
        // ---- Real data: proposals mapped to the dashboard shape -----------
        $projects = $this->realProjects();

        // ---- Activity rows (project_detail) flattened across all projects -
        $details = $projects->flatMap(fn ($p) => $p['details'])->values();

        // Derive total budget & activity count per project from its details
        $projects = $projects->map(function ($p) {
            $p['total_budget'] = collect($p['details'])->sum('budget');
            $p['activity_count'] = count($p['details']);
            return $p;
        });

        // ---- KPI summary ---------------------------------------------------
        $totalBudget = $details->sum('budget');
        $kpi = [
            'projects'        => $projects->count(),
            'activities'      => $details->count(),
            'total_budget'    => $totalBudget,
            'agencies'        => $projects->pluck('operating_agency')->unique()->count(),
            'avg_budget'      => $projects->count() ? round($projects->sum('total_budget') / $projects->count()) : 0,
            'target_areas'    => $details->pluck('target_area')->unique()->count(),
            'target_groups'   => $details->pluck('target_group')->unique()->count(),
            'related_agencies'=> $details->pluck('related_agency')->unique()->count(),
        ];

        // ---- Aggregations for charts --------------------------------------
        $budgetByIssue = $projects->groupBy('province_issue')
            ->map(fn ($g) => $g->sum('total_budget'))->sortDesc();

        $budgetByGuideline = $projects->groupBy('province_guideline')
            ->map(fn ($g) => $g->sum('total_budget'))->sortDesc();

        $budgetByAgency = $projects->groupBy('operating_agency')
            ->map(fn ($g) => $g->sum('total_budget'))->sortDesc();

        $activitiesByArea = $details->groupBy('target_area')
            ->map(fn ($g) => $g->count())->sortDesc();

        $budgetByArea = $details->groupBy('target_area')
            ->map(fn ($g) => $g->sum('budget'))->sortDesc();

        $budgetByTargetGroup = $details->groupBy('target_group')
            ->map(fn ($g) => $g->sum('budget'))->sortDesc();

        $topProjects = $projects->sortByDesc('total_budget')->take(5)->values();

        // Fiscal years for the year filter (ภาพรวม + รายปี) on the dashboard.
        $years = self::FISCAL_YEARS;

        return view('phy70::dashboard', compact(
            'projects', 'details', 'kpi',
            'budgetByIssue', 'budgetByGuideline', 'budgetByAgency',
            'activitiesByArea', 'budgetByArea', 'budgetByTargetGroup', 'topProjects',
            'years'
        ));
    }

    /**
     * Project brief (แบบ จ.1-1) — แสดงรายละเอียดโครงการรายตัวในรูปแบบฟอร์ม
     * โครงการแบบย่อ (Project Brief) ของจังหวัด. เข้าถึงได้จากการคลิกโครงการ
     * ในหน้าแดชบอร์ด (เปิดแบบสาธารณะเช่นเดียวกับแดชบอร์ด).
     */
    public function projectBrief($id)
    {
        $proposal = Phy70Proposal::findOrFail($id);
        $fiscalYears = self::FISCAL_YEARS;

        return view('phy70::project-brief', compact('proposal', 'fiscalYears'));
    }

    /**
     * ตัวชี้วัดและค่าเป้าหมายรายปี (พ.ศ. 2571–2575) ต่อ "ประเด็นการพัฒนา".
     * แหล่งข้อมูลเดียวกับ issuesData ในฟอร์มสร้างข้อเสนอ (proposals/create.blade.php)
     * ใช้เรนเดอร์แบบ จ.1 (เวอร์ชันโครงการ). คีย์ = ชื่อประเด็น (ตรงกับ province_issue).
     */
    private static function issuesKpiData(): array
    {
        return [
            'ประเด็นการพัฒนาที่ 1 การพัฒนาการท่องเที่ยวมูลค่าสูงเชิงสร้างสรรค์บนฐานอัตลักษณ์ของพื้นที่' => [
                ['name' => 'รายได้จากการท่องเที่ยวเพิ่มขึ้น', 'base_year' => 2568, 'base_value' => '9,981.97 ล้านบาท', 'target_unit' => 'ร้อยละ', 'targets' => [5, 5, 5, 5, 5]],
                ['name' => 'จำนวนของสถานประกอบการด้านการท่องเที่ยวได้รับมาตรฐานเพิ่มขึ้น', 'base_year' => 2568, 'base_value' => null, 'target_unit' => 'ร้อยละ', 'targets' => [10, 10, 10, 10, 10]],
            ],
            'ประเด็นการพัฒนาที่ 2 การพัฒนาการเกษตรมูลค่าสูงอย่างยั่งยืน' => [
                ['name' => 'GPP จังหวัดภาคเกษตรเพิ่มขึ้น', 'base_year' => 2567, 'base_value' => '32,564 ล้านบาท', 'target_unit' => 'ร้อยละ', 'targets' => [5, 5, 5, 5, 5]],
                ['name' => 'ผลิตภาพแรงงานภาคเกษตร เพิ่มขึ้น', 'base_year' => 2567, 'base_value' => '155,514.70 บาท/คน/ปี', 'target_unit' => 'ร้อยละ', 'targets' => [5, 5, 5, 5, 5]],
                ['name' => 'จำนวนเกษตรกรที่ได้รับมาตรฐานสินค้าเกษตรมูลค่าสูง เพิ่มขึ้น', 'base_year' => 2567, 'base_value' => '1,938 ราย', 'target_unit' => 'ร้อยละ', 'targets' => [5, 5, 5, 5, 5]],
            ],
            'ประเด็นการพัฒนาที่ 3 การพัฒนาความมั่นคง คุณภาพชีวิต การศึกษา และผลิตภาพคนทุกช่วงวัย' => [
                ['name' => 'ร้อยละผลิตภัณฑ์มวลรวมจังหวัดต่อคนเพิ่มขึ้น', 'base_year' => 2567, 'base_value' => '107,129 บาท', 'target_unit' => 'ร้อยละ', 'targets' => [5, 5, 5, 5, 5]],
                ['name' => 'จำนวนปีการศึกษาเฉลี่ยของประชากร', 'base_year' => 2567, 'base_value' => '9.70 ปี', 'target_unit' => 'ปี', 'targets' => [10.5, 10.5, 10.5, 11.5, 11.5]],
                ['name' => 'จำนวนคดียาเสพติดลดลง', 'base_year' => 2567, 'base_value' => '3,085 คดี', 'target_unit' => 'ร้อยละ', 'targets' => [5, 5, 5, 5, 5]],
                ['name' => 'อัตราส่วนแพทย์ต่อประชากร', 'base_year' => 2568, 'base_value' => '1:3,366', 'target_unit' => 'สัดส่วน', 'targets' => ['1:2,500', '1:2,500', '1:2,300', '1:2,300', '1:2,000']],
            ],
            'ประเด็นการพัฒนาที่ 4 การส่งเสริมการเจริญเติบโตทางเศรษฐกิจที่ยั่งยืน' => [
                ['name' => 'ผลิตภัณฑ์มวลรวมจังหวัด (GPP)', 'base_year' => 2567, 'base_value' => '95,455 ล้านบาท', 'target_unit' => 'ร้อยละ', 'targets' => [5, 5, 5, 5, 5]],
                ['name' => 'ผลิตภัณฑ์มวลรวมจังหวัด (GPP) ภาคอุตสาหกรรม', 'base_year' => 2567, 'base_value' => '.......ล้านบาท', 'target_unit' => 'ร้อยละ', 'targets' => [3, 3, 3, 3, 3]],
                ['name' => 'จำนวนสถานประกอบการที่ผ่านเกณฑ์อุตสาหกรรมสีเขียว ระดับ 2', 'base_year' => 2568, 'base_value' => '23 แห่ง', 'target_unit' => 'ร้อยละ', 'targets' => [3, 3, 3, 3, 3]],
            ],
            'ประเด็นการพัฒนาที่ 5 การบริหารจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อมเพื่อความสมดุล' => [
                ['name' => 'สัดส่วนปริมาณขยะที่กำจัดได้อย่างถูกต้องต่อปริมาณขยะที่เกิดขึ้นเพิ่มขึ้น', 'base_year' => 2568, 'base_value' => '19.53', 'target_unit' => 'ร้อยละ', 'targets' => [5, 5, 5, 5, 5]],
                ['name' => 'ร้อยละประชากรที่ประสบภัยพิบัติ (อัคคีภัย วาตภัย อุทกภัย ภัยแล้ง)', 'base_year' => 2568, 'base_value' => '9.42', 'target_unit' => 'ร้อยละ', 'targets' => [5, 5, 5, 5, 5]],
            ],
        ];
    }

    /**
     * แบบ จ.1 (เวอร์ชันโครงการ) — สรุปโครงการภายใต้ "ประเด็นการพัฒนา" ที่เลือก.
     * แต่ละแถว = โครงการ พร้อมตัวชี้วัดที่โครงการตอบสนอง และค่าเป้าหมายรายปี (2571–2575).
     * เข้าถึงจากปุ่มใน modal ประเด็นบนแดชบอร์ด (?issue=ชื่อประเด็น).
     */
    public function issueSummary(Request $request)
    {
        $issue = trim((string) $request->query('issue', ''));
        $fiscalYears = self::FISCAL_YEARS;

        // ตัวชี้วัดของประเด็นนี้ (ระดับประเด็น) — ใช้เป็นรายการ fallback ในคอลัมน์ตัวชี้วัด
        $issueKpis = self::issuesKpiData()[$issue] ?? [];

        // โครงการทั้งหมดในประเด็นนี้
        $proposals = $issue === ''
            ? collect()
            : Phy70Proposal::where('province_issue', $issue)->orderByDesc('id')->get();

        $projects = $proposals->map(function ($p) use ($issueKpis, $fiscalYears) {
            $activities = is_array($p->activities) ? $p->activities : [];

            // งบประมาณรายปี (พ.ศ. 2571–2575) รวมทุกกิจกรรม + งบรวมทั้งโครงการ
            $yearly = array_fill_keys($fiscalYears, 0.0);
            foreach ($activities as $a) {
                $a = is_array($a) ? $a : [];
                $ry = is_array($a['yearly_budgets'] ?? null) ? $a['yearly_budgets'] : [];
                foreach ($fiscalYears as $y) {
                    $yearly[$y] += (float) ($ry[$y] ?? 0);
                }
            }
            $total = collect($activities)->sum(fn ($a) => (float) (is_array($a) ? ($a['budget'] ?? 0) : 0));

            // ตชว.ที่โครงการเลือกตอบสนอง — ถ้าไม่มี → fallback แสดง ตชว. ทั้งหมดของประเด็น
            $selectedNames = collect(is_array($p->kpis) ? $p->kpis : [])
                ->filter(fn ($k) => is_array($k) && !empty($k['selected']) && !empty($k['name']))
                ->pluck('name')->values();
            $kpiNames = $selectedNames->isNotEmpty()
                ? $selectedNames->all()
                : collect($issueKpis)->pluck('name')->all();

            return [
                'name'   => $this->cleanValue($p->project_name, 'ไม่ระบุชื่อโครงการ'),
                'code'   => $this->cleanValue($p->project_code, 'PJ-' . $p->id),
                'agency' => $this->cleanValue($p->operating_agency, 'ไม่ระบุหน่วยงาน'),
                'yearly' => $yearly,
                'total'  => $total,
                'kpis'   => $kpiNames,
            ];
        })->values();

        return view('phy70::issue-summary', compact('issue', 'projects', 'issueKpis', 'fiscalYears'));
    }

    /**
     * Linkage view — วิเคราะห์ความเชื่อมโยง/ทับซ้อนของ "ประเด็นการพัฒนา"
     * ข้ามหน่วยงาน: หน่วยงานใดบ้างที่เสนอโครงการอยู่ในประเด็นเดียวกัน
     * (ทับซ้อนข้ามหน่วยงาน) และหน่วยงานใดเสนอซ้ำหลายโครงการในประเด็นเดียวกัน.
     * อ่านข้อมูลจริงจากฐานข้อมูลชุดเดียวกับ dashboard เพื่อให้ข้อมูลสอดคล้องกัน.
     */
    public function linkage()
    {
        $projects = $this->realProjects();

        // แต่ละโครงการ = 1 ข้อเสนอ (ประเด็น + หน่วยงานดำเนินการ + งบรวม)
        $proposals = $projects->map(fn ($p) => [
            'project_id'   => $p['project_id'],
            'project_name' => $p['project_name'],
            'issue'        => $p['province_issue'],
            'guideline'    => $p['province_guideline'],
            'agency'       => $p['operating_agency'],
            'budget'       => collect($p['details'])->sum('budget'),
        ])->values();

        $issueList  = $proposals->pluck('issue')->unique()->values();
        $agencyList = $proposals->pluck('agency')->unique()->sort()->values();

        // จัดกลุ่มตามประเด็น → ภายในประเด็นจัดกลุ่มตามหน่วยงาน
        $byIssue = $proposals->groupBy('issue')->map(function ($group, $issue) {
            $agencies = $group->groupBy('agency');
            return [
                'issue'          => $issue,
                'proposals'      => $group->values(),
                'agencies'       => $agencies,
                'agency_count'   => $agencies->count(),
                'proposal_count' => $group->count(),
                'total_budget'   => $group->sum('budget'),
                'cross_overlap'  => $agencies->count() > 1,               // ทับซ้อนข้ามหน่วยงาน
                'dup_agencies'   => $agencies->filter(fn ($ps) => $ps->count() > 1)->keys()->values(), // ซ้ำในหน่วยงานเดียว
            ];
        })->sortByDesc('proposal_count')->values();

        $overlapIssues = $byIssue->where('cross_overlap', true)->values();

        // คู่หน่วยงานที่เชื่อมโยงกันผ่านประเด็นเดียวกัน
        $pairs = collect();
        foreach ($byIssue as $row) {
            $ags = $row['agencies']->keys()->values();
            for ($i = 0; $i < $ags->count(); $i++) {
                for ($j = $i + 1; $j < $ags->count(); $j++) {
                    $pairs->push(['a' => $ags[$i], 'b' => $ags[$j], 'issue' => $row['issue']]);
                }
            }
        }

        // เมทริกซ์ หน่วยงาน × ประเด็น (จำนวนข้อเสนอในแต่ละช่อง)
        $matrix = [];
        foreach ($agencyList as $ag) {
            foreach ($issueList as $is) {
                $matrix[$ag][$is] = $proposals->where('agency', $ag)->where('issue', $is)->count();
            }
        }

        $kpi = [
            'issues'         => $issueList->count(),
            'agencies'       => $agencyList->count(),
            'proposals'      => $proposals->count(),
            'overlap_issues' => $overlapIssues->count(),
            'pairs'          => $pairs->count(),
        ];

        return view('phy70::linkage', compact(
            'proposals', 'issueList', 'agencyList',
            'byIssue', 'overlapIssues', 'pairs', 'matrix', 'kpi'
        ));
    }

    /**
     * Scorecard — ประเมินคุณภาพข้อเสนอโครงการอัตโนมัติจาก 5 เกณฑ์ถ่วงน้ำหนัก
     * แล้วจัดเกรด (A–D) และลำดับความสำคัญ. คะแนนคำนวณจากข้อมูลจริงในข้อเสนอ
     * (ความสอดคล้อง, ความคุ้มค่างบ, ความไม่ซ้ำซ้อน, ความชัดเจนผลลัพธ์, ความพร้อม).
     */
    public function scorecard()
    {
        $projects = collect($this->mockProjects());

        // สัญญาณความซ้ำซ้อน (ใช้ตรรกะเดียวกับหน้า linkage)
        $byIssueAgency = $projects->groupBy('province_issue')->map(fn ($g) => [
            'agency_count' => $g->pluck('operating_agency')->unique()->count(),
            'agency_props' => $g->groupBy('operating_agency')->map->count(),
        ]);

        // เมตริกดิบต่อโครงการ
        $base = $projects->map(function ($p) {
            $budget = collect($p['details'])->sum('budget');
            $acts   = count($p['details']);
            return [
                'p'                 => $p,
                'budget'            => $budget,
                'acts'              => $acts,
                'areas'             => collect($p['details'])->pluck('target_area')->unique()->count(),
                'groups'            => collect($p['details'])->pluck('target_group')->unique()->count(),
                'perAct'            => $acts ? $budget / $acts : $budget,
                'hasNumericOutcome' => (bool) preg_match('/[0-9๐-๙]/u', $p['outcome'] ?? ''),
            ];
        });

        $minPerAct = $base->min('perAct') ?: 1;
        $maxPerAct = $base->max('perAct') ?: 1;
        $maxAreas  = $base->max('areas') ?: 1;
        $maxGroups = $base->max('groups') ?: 1;
        $spanPerAct = ($maxPerAct - $minPerAct) ?: 1;

        // นิยามเกณฑ์ + น้ำหนัก (รวม 100%)
        $criteria = [
            ['key' => 'align',   'name' => 'ความสอดคล้องเชิงยุทธศาสตร์', 'weight' => 25, 'color' => '#6366f1'],
            ['key' => 'value',   'name' => 'ความคุ้มค่างบประมาณ',        'weight' => 20, 'color' => '#059669'],
            ['key' => 'dup',     'name' => 'ความไม่ซ้ำซ้อน/บูรณาการ',    'weight' => 20, 'color' => '#dc2626'],
            ['key' => 'outcome', 'name' => 'ความชัดเจนของผลลัพธ์',       'weight' => 20, 'color' => '#0891b2'],
            ['key' => 'ready',   'name' => 'ความพร้อม/ครอบคลุมพื้นที่',   'weight' => 15, 'color' => '#d97706'],
        ];

        $rows = $base->map(function ($b) use ($byIssueAgency, $minPerAct, $spanPerAct, $maxAreas, $maxGroups) {
            $p = $b['p'];

            // 1) ความสอดคล้องเชิงยุทธศาสตร์ — มีองค์ประกอบครบหรือไม่
            $align = 60
                + (!empty($p['province_issue']) ? 10 : 0)
                + (!empty($p['province_guideline']) ? 10 : 0)
                + (!empty($p['output']) ? 10 : 0)
                + (!empty($p['outcome']) ? 10 : 0);
            $align = min(100, $align);

            // 2) ความคุ้มค่างบประมาณ — งบต่อกิจกรรมยิ่งต่ำยิ่งคุ้ม (invert-normalize)
            $value = round(100 - (($b['perAct'] - $minPerAct) / $spanPerAct) * 60);
            $value = max(40, min(100, $value));

            // 3) ความไม่ซ้ำซ้อน — หักคะแนนถ้าประเด็นทับซ้อนข้ามหน่วยงาน/ซ้ำในหน่วยงาน
            $ia = $byIssueAgency[$p['province_issue']];
            $overlap = $ia['agency_count'] > 1;
            $dupInAgency = ($ia['agency_props'][$p['operating_agency']] ?? 1) > 1;
            $dup = 100 - ($overlap ? 30 : 0) - ($dupInAgency ? 25 : 0);
            $dup = max(30, $dup);

            // 4) ความชัดเจนของผลลัพธ์ — มีตัวเลขเป้าหมาย + รายละเอียดเพียงพอ
            $outcome = $b['hasNumericOutcome'] ? 90 : 65;
            if (mb_strlen($p['outcome'] ?? '') > 40) $outcome = min(100, $outcome + 8);

            // 5) ความพร้อม/ครอบคลุม — จำนวนพื้นที่ + กลุ่มเป้าหมายที่ครอบคลุม
            $ready = round(50 + ($b['areas'] / $maxAreas) * 30 + ($b['groups'] / $maxGroups) * 20);
            $ready = min(100, $ready);

            $scores = compact('align', 'value', 'dup', 'outcome', 'ready');
            $total  = round($align * 0.25 + $value * 0.20 + $dup * 0.20 + $outcome * 0.20 + $ready * 0.15);
            $grade  = $total >= 85 ? 'A' : ($total >= 75 ? 'B' : ($total >= 65 ? 'C' : 'D'));

            return [
                'project_id'   => $p['project_id'],
                'project_name' => $p['project_name'],
                'agency'       => $p['operating_agency'],
                'issue'        => $p['province_issue'],
                'budget'       => $b['budget'],
                'scores'       => $scores,
                'total'        => $total,
                'grade'        => $grade,
                'flags'        => ['overlap' => $overlap, 'dup' => $dupInAgency],
            ];
        })->sortByDesc('total')->values();

        $gradeDist = ['A' => 0, 'B' => 0, 'C' => 0, 'D' => 0];
        foreach ($rows as $r) { $gradeDist[$r['grade']]++; }

        $kpi = [
            'count'       => $rows->count(),
            'avg'         => $rows->count() ? round($rows->avg('total')) : 0,
            'gradeA'      => $gradeDist['A'],
            'needImprove' => $gradeDist['C'] + $gradeDist['D'],
        ];

        return view('phy70::scorecard', compact('rows', 'criteria', 'kpi', 'gradeDist'));
    }

    /**
     * Hard-coded mock dataset mirroring the intended `project` and
     * `project_detail` tables. Replace with real queries once the schema
     * is in place.
     */
    /**
     * Map live Phy70Proposal rows into the shape the dashboard view expects
     * (project header + flattened "details" per activity). Missing values fall
     * back to a readable placeholder so grouping/rendering never breaks.
     */
    private function realProjects(): \Illuminate\Support\Collection
    {
        return Phy70Proposal::orderByDesc('id')->get()->map(function ($p) {
            $activities = is_array($p->activities) ? $p->activities : [];
            $code = $this->cleanValue($p->project_code, 'PJ-' . $p->id);

            $details = [];
            foreach ($activities as $i => $a) {
                $a = is_array($a) ? $a : [];

                // Normalise the per-activity yearly budget split to all fiscal
                // years (2571–2575) so the dashboard can slice budgets by year.
                $rawYearly = is_array($a['yearly_budgets'] ?? null) ? $a['yearly_budgets'] : [];
                $yearlyBudgets = [];
                foreach (self::FISCAL_YEARS as $y) {
                    $yearlyBudgets[$y] = (float) ($rawYearly[$y] ?? 0);
                }

                $details[] = [
                    'activity_id'        => $code . '-' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                    'guideline'          => $this->cleanValue($a['guideline'] ?? null, $this->cleanValue($p->development_guideline, 'ไม่ระบุแนวทาง')),
                    'target_area'        => $this->deriveArea($a, $p),
                    'target_group'       => $this->cleanValue($a['target_group'] ?? null, $this->cleanValue($p->target_group, 'ไม่ระบุกลุ่มเป้าหมาย')),
                    'activity'           => $this->cleanValue($a['name'] ?? null, 'ไม่ระบุชื่อกิจกรรม'),
                    'budget'             => (float) ($a['budget'] ?? 0),
                    'yearly_budgets'     => $yearlyBudgets,
                    'responsible_person' => $this->cleanValue($a['responsible_person'] ?? null, $this->cleanValue($p->responsible_person, '—')),
                    'responsible_agency' => $this->cleanValue($a['responsible_agency'] ?? null, $this->cleanValue($p->operating_agency, '—')),
                    'related_agency'     => collect($a['co_agencies'] ?? [])->pluck('name')->filter()->implode(', ') ?: '—',
                ];
            }

            return [
                'db_id'              => $p->id,
                'project_id'         => $code,
                'project_name'       => $this->cleanValue($p->project_name, 'ไม่ระบุชื่อโครงการ'),
                'province_issue'     => $this->cleanValue($p->province_issue, 'ไม่ระบุประเด็น'),
                'province_guideline' => $this->cleanValue($p->development_guideline, 'ไม่ระบุแนวทาง'),
                'rationale'          => $this->cleanValue($p->principles, '—'),
                'objective'          => $this->cleanValue($p->objectives, '—'),
                'operating_agency'   => $this->cleanValue($p->operating_agency, 'ไม่ระบุหน่วยงาน'),
                'output'             => $this->cleanValue($p->output, '—'),
                'outcome'            => $this->cleanValue($p->outcome, '—'),
                'details'            => $details,
            ];
        })->values();
    }

    /**
     * Trim a value and return $fallback when it is null/empty/blank array.
     */
    private function cleanValue($value, $fallback)
    {
        if (is_array($value)) {
            $value = collect($value)->filter()->implode(', ');
        }
        $value = is_string($value) ? trim($value) : $value;

        return ($value === null || $value === '') ? $fallback : $value;
    }

    /**
     * Derive a single representative target area for an activity. Prefers the
     * activity's district list (first district), falls back to the province.
     */
    private function deriveArea(array $a, $p): string
    {
        $districts = collect($a['target_district'] ?? [])
            ->flatMap(fn ($d) => explode(',', (string) $d))
            ->map(fn ($d) => trim($d))
            ->filter()
            ->values();

        if ($districts->count()) {
            return $districts->count() > 1
                ? 'อ.' . $districts->first() . ' (+' . ($districts->count() - 1) . ')'
                : 'อ.' . $districts->first();
        }

        $province = $this->cleanValue($p->target_province, null);

        return $province ? 'จ.' . $province : 'ไม่ระบุพื้นที่';
    }

    private function mockProjects(): array
    {
        $issues = [
            'ยกระดับสุขภาวะและกิจกรรมทางกายของประชาชน',
            'พัฒนาการท่องเที่ยวเชิงสุขภาพและกีฬา',
            'พัฒนาคุณภาพชีวิตผู้สูงอายุและกลุ่มเปราะบาง',
            'ส่งเสริมพัฒนาการเด็กและเยาวชน',
        ];
        $guidelines = [
            'ส่งเสริมการออกกำลังกายในชุมชน',
            'พัฒนาพื้นที่สาธารณะเพื่อการเคลื่อนไหว',
            'สร้างเครือข่ายสุขภาพชุมชน',
            'ยกระดับระบบบริการสุขภาพปฐมภูมิ',
        ];
        $agencies = [
            'สำนักงานสาธารณสุขจังหวัดเพชรบูรณ์',
            'องค์การบริหารส่วนจังหวัดเพชรบูรณ์',
            'เทศบาลเมืองเพชรบูรณ์',
            'สำนักงานการท่องเที่ยวและกีฬาจังหวัดเพชรบูรณ์',
            'สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์จังหวัด',
        ];
        // พื้นที่เป้าหมายระดับตำบล (คงชื่ออำเภอในวงเล็บเพื่อไม่ให้ชื่อตำบลซ้ำกัน)
        $areas = [
            'ต.ในเมือง (อ.เมืองเพชรบูรณ์)',   // 0
            'ต.ท่าพล (อ.เมืองเพชรบูรณ์)',     // 1
            'ต.วังชมภู (อ.เมืองเพชรบูรณ์)',   // 2
            'ต.หล่มสัก (อ.หล่มสัก)',          // 3
            'ต.น้ำก้อ (อ.หล่มสัก)',           // 4
            'ต.หล่มเก่า (อ.หล่มเก่า)',        // 5
            'ต.วังบาล (อ.หล่มเก่า)',          // 6
            'ต.นาซำ (อ.หล่มเก่า)',            // 7
            'ต.ท่าโรง (อ.วิเชียรบุรี)',       // 8
            'ต.พุเตย (อ.วิเชียรบุรี)',        // 9
            'ต.ชนแดน (อ.ชนแดน)',             // 10
            'ต.ดงขุย (อ.ชนแดน)',             // 11
            'ต.ศรีเทพ (อ.ศรีเทพ)',           // 12
            'ต.ซับสมอทอด (อ.บึงสามพัน)',      // 13
        ];
        $groups = ['ประชาชนทั่วไป', 'ผู้สูงอายุ', 'เด็กและเยาวชน', 'วัยทำงาน', 'กลุ่มเปราะบาง'];

        $data = [
            [
                'project_id'   => 'PJ-2570-001',
                'project_name' => 'ส่งเสริมการเดิน-วิ่งเพื่อสุขภาพในชุมชนเมืองเพชรบูรณ์',
                'province_issue' => $issues[0],
                'province_guideline' => $guidelines[0],
                'rationale'    => 'ประชาชนมีพฤติกรรมเนือยนิ่งเพิ่มขึ้น ส่งผลต่ออัตราการเจ็บป่วยด้วยโรคไม่ติดต่อเรื้อรัง (NCDs)',
                'objective'    => 'เพิ่มสัดส่วนประชาชนที่มีกิจกรรมทางกายเพียงพอไม่น้อยกว่าร้อยละ 15 ภายในปีงบประมาณ',
                'operating_agency' => $agencies[0],
                'output'       => 'จัดกิจกรรมเดิน-วิ่ง 12 ครั้ง ครอบคลุม 6 ชุมชน',
                'outcome'      => 'ประชาชนกลุ่มเป้าหมายมีกิจกรรมทางกายเพิ่มขึ้นเฉลี่ยร้อยละ 18',
                'details' => [
                    ['activity_id' => 'AC-001-01', 'guideline' => $guidelines[0], 'target_area' => $areas[0], 'target_group' => $groups[0], 'activity' => 'จัดกิจกรรมเดิน-วิ่งการกุศลประจำเดือน', 'budget' => 350000, 'responsible_person' => 'นายสมชาย ใจดี', 'responsible_agency' => $agencies[0], 'related_agency' => 'เทศบาลเมืองเพชรบูรณ์'],
                    ['activity_id' => 'AC-001-02', 'guideline' => $guidelines[1], 'target_area' => $areas[1], 'target_group' => $groups[3], 'activity' => 'ปรับปรุงเส้นทางสุขภาพริมแม่น้ำป่าสัก', 'budget' => 780000, 'responsible_person' => 'นางสาวมาลี งามวงศ์', 'responsible_agency' => $agencies[2], 'related_agency' => 'สำนักงานโยธาธิการและผังเมือง'],
                    ['activity_id' => 'AC-001-03', 'guideline' => $guidelines[2], 'target_area' => $areas[10], 'target_group' => $groups[0], 'activity' => 'อบรมแกนนำสุขภาพชุมชน', 'budget' => 220000, 'responsible_person' => 'นายวิชัย พัฒนา', 'responsible_agency' => $agencies[0], 'related_agency' => 'อสม. ตำบล'],
                ],
            ],
            [
                'project_id'   => 'PJ-2570-002',
                'project_name' => 'ลานกีฬาชุมชนต้นแบบเพื่อสุขภาวะทุกวัย',
                'province_issue' => $issues[0],
                'province_guideline' => $guidelines[1],
                'rationale'    => 'ชุมชนขาดพื้นที่สาธารณะที่ปลอดภัยและเหมาะสมสำหรับการออกกำลังกาย',
                'objective'    => 'พัฒนาลานกีฬาชุมชนต้นแบบอย่างน้อย 4 แห่งใน 4 อำเภอ',
                'operating_agency' => $agencies[1],
                'output'       => 'ลานกีฬาชุมชนพร้อมอุปกรณ์ 4 แห่ง',
                'outcome'      => 'ประชาชนเข้าถึงพื้นที่ออกกำลังกายเพิ่มขึ้นกว่า 8,000 คน/ปี',
                'details' => [
                    ['activity_id' => 'AC-002-01', 'guideline' => $guidelines[1], 'target_area' => $areas[3], 'target_group' => $groups[0], 'activity' => 'ก่อสร้างลานกีฬาอเนกประสงค์', 'budget' => 1250000, 'responsible_person' => 'นายอนุชา มั่นคง', 'responsible_agency' => $agencies[1], 'related_agency' => 'องค์การบริหารส่วนตำบล'],
                    ['activity_id' => 'AC-002-02', 'guideline' => $guidelines[1], 'target_area' => $areas[5], 'target_group' => $groups[2], 'activity' => 'ติดตั้งเครื่องออกกำลังกายกลางแจ้ง', 'budget' => 640000, 'responsible_person' => 'นางสุดา แสงทอง', 'responsible_agency' => $agencies[1], 'related_agency' => 'เทศบาลตำบลหล่มเก่า'],
                ],
            ],
            [
                'project_id'   => 'PJ-2570-003',
                'project_name' => 'เส้นทางท่องเที่ยวเชิงสุขภาพเขาค้อ-ภูทับเบิก',
                'province_issue' => $issues[1],
                'province_guideline' => $guidelines[1],
                'rationale'    => 'จังหวัดมีศักยภาพด้านการท่องเที่ยวเชิงสุขภาพแต่ยังขาดการเชื่อมโยงเส้นทาง',
                'objective'    => 'พัฒนาเส้นทางเดิน-ปั่นจักรยานเชิงสุขภาพเชื่อมโยงแหล่งท่องเที่ยว',
                'operating_agency' => $agencies[3],
                'output'       => 'เส้นทางสุขภาพระยะทางรวม 25 กิโลเมตร',
                'outcome'      => 'นักท่องเที่ยวเชิงสุขภาพเพิ่มขึ้นร้อยละ 12',
                'details' => [
                    ['activity_id' => 'AC-003-01', 'guideline' => $guidelines[1], 'target_area' => $areas[6], 'target_group' => $groups[3], 'activity' => 'จัดทำเส้นทางปั่นจักรยานเชิงสุขภาพ', 'budget' => 1580000, 'responsible_person' => 'นายกิตติ ท่องเที่ยว', 'responsible_agency' => $agencies[3], 'related_agency' => 'การท่องเที่ยวแห่งประเทศไทย'],
                    ['activity_id' => 'AC-003-02', 'guideline' => $guidelines[2], 'target_area' => $areas[7], 'target_group' => $groups[0], 'activity' => 'อบรมมัคคุเทศก์สุขภาพชุมชน', 'budget' => 320000, 'responsible_person' => 'นางสาวปรีดา ภูเขียว', 'responsible_agency' => $agencies[3], 'related_agency' => 'วิทยาลัยชุมชนเพชรบูรณ์'],
                ],
            ],
            [
                'project_id'   => 'PJ-2570-004',
                'project_name' => 'โรงเรียนผู้สูงอายุ ส่งเสริมกิจกรรมทางกายเชิงป้องกัน',
                'province_issue' => $issues[2],
                'province_guideline' => $guidelines[2],
                'rationale'    => 'สัดส่วนผู้สูงอายุเพิ่มขึ้นและเสี่ยงภาวะพึ่งพิงจากการขาดกิจกรรมทางกาย',
                'objective'    => 'ส่งเสริมกิจกรรมทางกายและป้องกันการหกล้มในผู้สูงอายุ',
                'operating_agency' => $agencies[0],
                'output'       => 'โรงเรียนผู้สูงอายุ 10 แห่ง มีหลักสูตรกิจกรรมทางกาย',
                'outcome'      => 'ผู้สูงอายุมีสมรรถภาพทางกายดีขึ้นร้อยละ 22',
                'details' => [
                    ['activity_id' => 'AC-004-01', 'guideline' => $guidelines[2], 'target_area' => $areas[8], 'target_group' => $groups[1], 'activity' => 'จัดหลักสูตรออกกำลังกายสำหรับผู้สูงอายุ', 'budget' => 480000, 'responsible_person' => 'นางพิมพ์ใจ สุขสันต์', 'responsible_agency' => $agencies[0], 'related_agency' => 'โรงพยาบาลส่งเสริมสุขภาพตำบล'],
                    ['activity_id' => 'AC-004-02', 'guideline' => $guidelines[3], 'target_area' => $areas[12], 'target_group' => $groups[1], 'activity' => 'คัดกรองสุขภาพและประเมินภาวะหกล้ม', 'budget' => 260000, 'responsible_person' => 'นายแพทย์ธนา รักษ์ดี', 'responsible_agency' => $agencies[0], 'related_agency' => 'อสม. ตำบล'],
                    ['activity_id' => 'AC-004-03', 'guideline' => $guidelines[2], 'target_area' => $areas[9], 'target_group' => $groups[4], 'activity' => 'เยี่ยมบ้านผู้สูงอายุติดเตียง', 'budget' => 180000, 'responsible_person' => 'นางสาวกนก ดูแล', 'responsible_agency' => $agencies[4], 'related_agency' => 'ศูนย์บริการคนพิการจังหวัด'],
                ],
            ],
            [
                'project_id'   => 'PJ-2570-005',
                'project_name' => 'เด็กเพชรบูรณ์ ขยับเก่ง เล่นเป็น',
                'province_issue' => $issues[3],
                'province_guideline' => $guidelines[0],
                'rationale'    => 'เด็กและเยาวชนมีภาวะน้ำหนักเกินและใช้เวลาหน้าจอมากเกินไป',
                'objective'    => 'ส่งเสริมกิจกรรมทางกายในโรงเรียนและนอกเวลาเรียน',
                'operating_agency' => $agencies[1],
                'output'       => 'โรงเรียนนำร่อง 15 แห่ง จัดกิจกรรม Active Play',
                'outcome'      => 'เด็กมีภาวะน้ำหนักเกินลดลงร้อยละ 9',
                'details' => [
                    ['activity_id' => 'AC-005-01', 'guideline' => $guidelines[0], 'target_area' => $areas[11], 'target_group' => $groups[2], 'activity' => 'จัดค่ายกีฬาและนันทนาการภาคฤดูร้อน', 'budget' => 420000, 'responsible_person' => 'นายพงศ์ เยาวชน', 'responsible_agency' => $agencies[1], 'related_agency' => 'สำนักงานเขตพื้นที่การศึกษา'],
                    ['activity_id' => 'AC-005-02', 'guideline' => $guidelines[0], 'target_area' => $areas[13], 'target_group' => $groups[2], 'activity' => 'อบรมครูผู้นำกิจกรรมทางกายในโรงเรียน', 'budget' => 190000, 'responsible_person' => 'นางสาวรัตนา ครูดี', 'responsible_agency' => $agencies[1], 'related_agency' => 'มหาวิทยาลัยราชภัฏเพชรบูรณ์'],
                ],
            ],
            [
                'project_id'   => 'PJ-2570-006',
                'project_name' => 'เครือข่ายหมอครอบครัวส่งเสริมกิจกรรมทางกาย',
                'province_issue' => $issues[0],
                'province_guideline' => $guidelines[3],
                'rationale'    => 'ระบบบริการปฐมภูมิยังขาดการบูรณาการด้านการส่งเสริมกิจกรรมทางกาย',
                'objective'    => 'พัฒนาระบบให้คำปรึกษากิจกรรมทางกายในหน่วยบริการปฐมภูมิ',
                'operating_agency' => $agencies[0],
                'output'       => 'หน่วยบริการปฐมภูมิ 20 แห่ง มีคลินิกกิจกรรมทางกาย',
                'outcome'      => 'ผู้ป่วย NCDs เข้าถึงคำแนะนำกิจกรรมทางกายเพิ่มขึ้นร้อยละ 30',
                'details' => [
                    ['activity_id' => 'AC-006-01', 'guideline' => $guidelines[3], 'target_area' => $areas[4], 'target_group' => $groups[4], 'activity' => 'พัฒนาคลินิกกิจกรรมทางกายในรพ.สต.', 'budget' => 560000, 'responsible_person' => 'นายแพทย์สุริยา แสงไทย', 'responsible_agency' => $agencies[0], 'related_agency' => 'สปสช. เขต'],
                    ['activity_id' => 'AC-006-02', 'guideline' => $guidelines[2], 'target_area' => $areas[2], 'target_group' => $groups[3], 'activity' => 'พัฒนาแอปติดตามกิจกรรมทางกายชุมชน', 'budget' => 380000, 'responsible_person' => 'นายเทคโน ดิจิทัล', 'responsible_agency' => $agencies[0], 'related_agency' => 'สำนักงานสถิติจังหวัด'],
                ],
            ],
        ];

        return $data;
    }
}