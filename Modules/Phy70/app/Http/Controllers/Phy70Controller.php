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
            // Section 1
            'national_strategy' => 'nullable|string',
            'master_plan' => 'nullable|string',
            'national_plan' => 'nullable|string',
            'regional_development' => 'nullable|string',
            // Section 2
            'province_issue' => 'nullable|string',
            'development_guideline' => 'nullable|string',
            'main_plan' => 'nullable|string',
            'plan' => 'nullable|string',
            // Section 3
            'project_name' => 'required|string|max:255',
            'main_activity' => 'required|string',
            'operating_agency' => 'required|string|max:255',
            'responsible_person' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'contact_address' => 'required|string',
            'phone_number' => 'required|string|max:50',
            'attachments.*' => 'nullable|file|max:10240', // Max 10MB per file
        ], [
            'project_name.required' => 'กรุณากรอกชื่อโครงการ',
            'main_activity.required' => 'กรุณากรอกกิจกรรมหลัก',
            'operating_agency.required' => 'กรุณากรอกหน่วยดำเนินการ',
            'responsible_person.required' => 'กรุณากรอกผู้รับผิดชอบ',
            'position.required' => 'กรุณากรอกตำแหน่ง',
            'contact_address.required' => 'กรุณากรอกสถานที่ติดต่อ',
            'phone_number.required' => 'กรุณากรอกหมายเลขโทรศัพท์',
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
            'national_strategy' => $request->national_strategy,
            'master_plan' => $request->master_plan,
            'national_plan' => $request->national_plan,
            'regional_development' => $request->regional_development,
            'province_issue' => $request->province_issue,
            'development_guideline' => $request->development_guideline,
            'main_plan' => $request->main_plan,
            'plan' => $request->plan,
            'project_name' => $request->project_name,
            'main_activity' => $request->main_activity,
            'operating_agency' => $request->operating_agency,
            'responsible_person' => $request->responsible_person,
            'position' => $request->position,
            'contact_address' => $request->contact_address,
            'phone_number' => $request->phone_number,
            'attachments' => $attachments,
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
