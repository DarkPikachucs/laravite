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

        $existingDocsCount = !empty($proposal->documents) && is_array($proposal->documents) ? count($proposal->documents) : 0;
        $newDocsCount = $request->hasFile('documents') ? count($request->file('documents')) : 0;

        if (!$isDraft && ($existingDocsCount + $newDocsCount) < 2) {
            return back()->withErrors(['documents' => 'กรุณาแนบเอกสารโครงการอย่างน้อย 2 ไฟล์'])->withInput();
        }

        $request->validate([
            'documents' => 'nullable|array',
            'documents.*' => 'file|mimes:pdf,doc,docx,xls,xlsx,zip,rar|max:20480',
            'yearly_budgets' => 'nullable|array',
            'yearly_budgets.*' => 'nullable|numeric|min:0',
            'activities' => 'nullable|array',
            'province_issue' => $req . '|string',
            'operating_year' => $req . '|string',
            'development_guideline' => 'nullable|string',
            'main_plan' => 'nullable|string',
            'plan' => 'nullable|string',
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
            'activities' => 'nullable|array',
        ]);

        $documents = !empty($proposal->documents) && is_array($proposal->documents) ? $proposal->documents : [];
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
            'status' => $request->input('status', $proposal->status),
        ]);

        $this->generateCodesIfSubmitted($proposal);

        return redirect('/app/phy70/proposal/' . $proposal->id)->with('success', 'บันทึกการแก้ไขโครงการเรียบร้อยแล้ว');
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
