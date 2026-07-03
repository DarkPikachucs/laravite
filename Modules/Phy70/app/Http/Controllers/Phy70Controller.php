<?php

namespace Modules\Phy70\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Phy70\Models\Phy70Proposal;

class Phy70Controller extends Controller
{
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
            'development_guideline' => $req . '|string',
            'main_plan' => $req . '|string',
            'plan' => $req . '|string',
            // Section 3
            'target_province' => $req . '|string|max:255',
            'target_district' => 'nullable|string|max:255',
            'target_subdistrict' => 'nullable|string|max:255',
            'project_name' => 'required|string|max:255',
            'main_activity' => $req . '|string',
            'operating_agency' => $req . '|string|max:255',
            'responsible_person' => $req . '|string|max:255',
            'position' => $req . '|string|max:255',
            'phone_number' => $req . '|string|max:50',
            'attachments.*' => 'nullable|file|max:10240', // Max 10MB per file
            'activities' => 'nullable|array',
            'activities.*.name' => $req . '|string|max:255',
            'activities.*.budget' => $req . '|numeric|min:0',
            'activities.*.responsible_person' => $req . '|string|max:255',
            'activities.*.operating_agency' => $req . '|string|max:255',
            'activities.*.involved_agencies' => $req . '|string|max:255',
            'activities.*.guideline' => $req . '|string|max:255',
        ], [
            'province_issue.required' => 'กรุณาเลือกประเด็นการพัฒนาของจังหวัด',
            'development_guideline.required' => 'กรุณาเลือกแนวทางการพัฒนาของจังหวัด',
            'main_plan.required' => 'กรุณาเลือกแผนงานหลักของจังหวัด',
            'plan.required' => 'กรุณาเลือกแผนงานของจังหวัด',
            'target_province.required' => 'กรุณาเลือกจังหวัดพื้นที่เป้าหมาย',
            'project_name.required' => 'กรุณากรอกชื่อโครงการ',
            'main_activity.required' => 'กรุณากรอกกิจกรรมหลัก',
            'operating_agency.required' => 'กรุณากรอกหน่วยดำเนินการ',
            'responsible_person.required' => 'กรุณากรอกผู้รับผิดชอบ',
            'position.required' => 'กรุณากรอกตำแหน่ง',
            'phone_number.required' => 'กรุณากรอกหมายเลขโทรศัพท์',
            'activities.*.name.required' => 'กรุณากรอกชื่อกิจกรรมในส่วนที่ 4',
            'activities.*.budget.required' => 'กรุณากรอกงบประมาณของกิจกรรมในส่วนที่ 4',
            'activities.*.budget.numeric' => 'งบประมาณในส่วนที่ 4 ต้องเป็นตัวเลขเท่านั้น',
            'activities.*.budget.min' => 'งบประมาณในส่วนที่ 4 ต้องมากกว่าหรือเท่ากับ 0',
            'activities.*.responsible_person.required' => 'กรุณากรอกผู้รับผิดชอบกิจกรรมในส่วนที่ 4',
            'activities.*.operating_agency.required' => 'กรุณากรอกหน่วยงานรับผิดชอบในส่วนที่ 4',
            'activities.*.involved_agencies.required' => 'กรุณากรอกหน่วยงานที่เกี่ยวข้องในส่วนที่ 4',
            'activities.*.guideline.required' => 'กรุณาเลือกแนวทางการพัฒนาจังหวัดในส่วนที่ 4',
        ]);

        $attachments = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                if ($file->isValid()) {
                    $path = $file->store('phy70/attachments', 'public');
                    $attachments[] = [
                        'name' => $file->getClientOriginalName(),
                        'path' => '/storage/' . $path,
                    ];
                }
            }
        }

        Phy70Proposal::create([
            'organization_id' => $user->organization_id,
            'user_id' => $user->id,
            'province_issue' => $request->province_issue,
            'development_guideline' => $request->development_guideline,
            'main_plan' => $request->main_plan,
            'plan' => $request->plan,
            'target_province' => $request->target_province,
            'target_district' => $request->target_district,
            'target_subdistrict' => $request->target_subdistrict,
            'project_name' => $request->project_name,
            'main_activity' => $request->main_activity,
            'operating_agency' => $request->operating_agency,
            'responsible_person' => $request->responsible_person,
            'position' => $request->position,
            'phone_number' => $request->phone_number,
            'attachments' => $attachments,
            'activities' => $request->activities,
            'status' => $request->input('status', 'submitted'),
        ]);

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

    /**
     * Executive dashboard (mockup) — summarises project & activity data
     * for an at-a-glance overview. Uses in-memory mock data for now.
     */
    public function dashboard()
    {
        // ---- Mock data: projects (ตารางโครงการ) ----------------------------
        $projects = collect($this->mockProjects());

        // ---- Mock data: project_detail (ตารางรายละเอียดกิจกรรม) -----------
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

        return view('phy70::dashboard', compact(
            'projects', 'details', 'kpi',
            'budgetByIssue', 'budgetByGuideline', 'budgetByAgency',
            'activitiesByArea', 'budgetByArea', 'budgetByTargetGroup', 'topProjects'
        ));
    }

    /**
     * Hard-coded mock dataset mirroring the intended `project` and
     * `project_detail` tables. Replace with real queries once the schema
     * is in place.
     */
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
