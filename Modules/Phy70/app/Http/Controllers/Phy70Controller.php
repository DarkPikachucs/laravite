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
            // Get proposals of the current user's organization
            $proposals = Phy70Proposal::where('organization_id', $user->organization_id)
                ->orderBy('created_at', 'desc')
                ->get();
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

        $request->validate([
            // Section 2
            'province_issue' => 'required|string',
            'development_guideline' => 'required|string',
            'main_plan' => 'required|string',
            'plan' => 'required|string',
            // Section 3
            'target_province' => 'required|string|max:255',
            'target_district' => 'nullable|string|max:255',
            'target_subdistrict' => 'nullable|string|max:255',
            'project_name' => 'required|string|max:255',
            'main_activity' => 'required|string',
            'operating_agency' => 'required|string|max:255',
            'responsible_person' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'phone_number' => 'required|string|max:50',
            'attachments.*' => 'nullable|file|max:10240', // Max 10MB per file
            'activities' => 'nullable|array',
            'activities.*.name' => 'required|string|max:255',
            'activities.*.budget' => 'required|numeric|min:0',
            'activities.*.responsible_person' => 'required|string|max:255',
            'activities.*.operating_agency' => 'required|string|max:255',
            'activities.*.involved_agencies' => 'required|string|max:255',
            'activities.*.guideline' => 'required|string|max:255',
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
        ]);

        return redirect('/app/phy70')->with('success', 'ส่งข้อเสนอโครงการเรียบร้อยแล้ว');
    }

    public function showProposal($id)
    {
        $user = $this->guard()->user();
        if (!$user) {
            return redirect('/app/phy70/login');
        }

        $proposal = Phy70Proposal::where('organization_id', $user->organization_id)->findOrFail($id);

        return view('phy70::proposals.show', compact('proposal'));
    }
}
