<?php

namespace Modules\Phy70\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Phy70\Models\Phy70Organization;
use Modules\Phy70\Models\Phy70User;
use Modules\Phy70\Models\Phy70Proposal;

class Phy70SuperadminController extends Controller
{
    private function guard()
    {
        return Auth::guard('phy70');
    }

    private function checkSuperadmin()
    {
        $user = $this->guard()->user();
        if (!$user || $user->role !== 'superadmin') {
            abort(403, 'Unauthorized. Superadmin only.');
        }
        return $user;
    }

    public function index()
    {
        $this->checkSuperadmin();

        $organizations = Phy70Organization::withCount('users', 'proposals')->get();
        $users = Phy70User::with('organization')->get();
        $proposals = Phy70Proposal::with('organization', 'user')->orderBy('created_at', 'desc')->get();

        return view('phy70::superadmin.index', compact('organizations', 'users', 'proposals'));
    }

    public function updateOrganization(Request $request, $id)
    {
        $this->checkSuperadmin();
        $org = Phy70Organization::findOrFail($id);
        $request->validate(['name' => 'required|string|max:255']);
        $org->update(['name' => $request->name]);
        return back()->with('success', 'อัปเดตข้อมูลหน่วยงานสำเร็จ');
    }

    public function deleteOrganization($id)
    {
        $this->checkSuperadmin();
        Phy70Organization::findOrFail($id)->delete();
        return back()->with('success', 'ลบหน่วยงานสำเร็จ');
    }

    public function updateUserRole(Request $request, $id)
    {
        $this->checkSuperadmin();
        $user = Phy70User::findOrFail($id);
        $request->validate(['role' => 'required|in:user,admin,superadmin']);
        $user->update(['role' => $request->role]);
        return back()->with('success', 'อัปเดตสิทธิ์ผู้ใช้สำเร็จ');
    }

    public function deleteUser($id)
    {
        $this->checkSuperadmin();
        $user = Phy70User::findOrFail($id);
        if ($user->id === $this->guard()->id()) {
            return back()->withErrors(['error' => 'ไม่สามารถลบบัญชีตัวเองได้']);
        }
        $user->delete();
        return back()->with('success', 'ลบผู้ใช้งานสำเร็จ');
    }

    public function editProposal($id)
    {
        $this->checkSuperadmin();
        $proposal = Phy70Proposal::findOrFail($id);
        return view('phy70::proposals.create', compact('proposal'));
    }

    public function updateProposal(Request $request, $id)
    {
        $this->checkSuperadmin();
        $proposal = Phy70Proposal::findOrFail($id);

        $isDraft = $request->input('status') === 'draft';
        $req = $isDraft ? 'nullable' : 'required';

        $request->validate([
            'province_issue' => $req . '|string',
            'development_guideline' => $req . '|string',
            'main_plan' => $req . '|string',
            'plan' => $req . '|string',
            'target_province' => $req . '|string|max:255',
            'target_district' => 'nullable|string|max:255',
            'target_subdistrict' => 'nullable|string|max:255',
            'project_name' => 'required|string|max:255',
            'main_activity' => $req . '|string',
            'operating_agency' => $req . '|string|max:255',
            'responsible_person' => $req . '|string|max:255',
            'position' => $req . '|string|max:255',
            'phone_number' => $req . '|string|max:50',
            'activities' => 'nullable|array',
        ]);

        $proposal->update([
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
            'activities' => $request->activities,
            'status' => $request->input('status', $proposal->status),
        ]);

        $this->generateCodesIfSubmitted($proposal);

        return redirect('/app/phy70/superadmin')->with('success', 'บันทึกการแก้ไขโครงการเรียบร้อยแล้ว');
    }

    public function updateProposalStatus(Request $request, $id)
    {
        $this->checkSuperadmin();
        $proposal = Phy70Proposal::findOrFail($id);
        $request->validate(['status' => 'required|string']);
        $proposal->update(['status' => $request->status]);
        $this->generateCodesIfSubmitted($proposal);
        return back()->with('success', 'อัปเดตสถานะโครงการสำเร็จ');
    }

    public function deleteProposal($id)
    {
        $this->checkSuperadmin();
        Phy70Proposal::findOrFail($id)->delete();
        return back()->with('success', 'ลบโครงการสำเร็จ');
    }

    private function generateCodesIfSubmitted($proposal)
    {
        if ($proposal->status === 'submitted' && empty($proposal->project_code)) {
            $proposal->project_code = 'PRJ-2570-' . str_pad($proposal->id, 4, '0', STR_PAD_LEFT);
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
    }
}
