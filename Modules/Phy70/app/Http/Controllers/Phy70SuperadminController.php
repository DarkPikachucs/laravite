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

    public function documentBuilder()
    {
        $this->checkSuperadmin();
        $proposals = Phy70Proposal::orderBy('created_at', 'desc')->get();
        $templates = \Modules\Phy70\Models\Phy70DocumentBuilder::all();
        $reports = \Modules\Phy70\Models\Phy70Report::with('template', 'creator')->orderBy('created_at', 'desc')->get();
        return view('phy70::superadmin.document_builder', compact('proposals', 'templates', 'reports'));
    }

    public function generateDocument(Request $request)
    {
        $this->checkSuperadmin();
        
        $template = \Modules\Phy70\Models\Phy70DocumentBuilder::findOrFail($request->input('template_id'));
        $payload = $template->output_schema;
        
        $dataSource = $request->input('data_source', 'proposals');
        $outputFormat = $request->input('output_format', 'pdf');
        
        $selectedProposalIds = $request->input('proposals', []);
        
        if (!empty($selectedProposalIds)) {
            // If user manually selected proposals, use them
            $proposals = Phy70Proposal::whereIn('id', $selectedProposalIds)->get();
        } else {
            // Otherwise, apply advanced filters on all proposals
            $query = Phy70Proposal::query();
            
            if ($dataSource === 'proposals') {
                if ($request->filled('filter_year')) {
                    $query->where('operating_year', $request->filter_year);
                }
                if ($request->filled('filter_status')) {
                    $query->where('status', $request->filter_status);
                }
                if ($request->filled('order_by')) {
                    switch ($request->order_by) {
                        case 'created_at_desc': $query->orderBy('created_at', 'desc'); break;
                        case 'created_at_asc': $query->orderBy('created_at', 'asc'); break;
                        // Budget requires joining or complex query, for now default to created_at
                        default: $query->orderBy('created_at', 'desc'); break;
                    }
                } else {
                    $query->orderBy('created_at', 'desc');
                }
                if ($request->filled('limit') && intval($request->limit) > 0) {
                    $query->limit(intval($request->limit));
                }
            }
            $proposals = $query->get();
        }
        
        return view('phy70::superadmin.document_preview', compact('payload', 'proposals', 'request', 'template', 'dataSource', 'outputFormat'));
    }

    public function storeTemplate(Request $request)
    {
        $this->checkSuperadmin();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'input_schema' => 'nullable|json',
            'output_schema' => 'nullable|json',
        ]);
        
        $inputSchema = $request->input_schema ? json_decode($request->input_schema, true) : [];
        $outputSchema = $request->output_schema ? json_decode($request->output_schema, true) : [];
        
        \Modules\Phy70\Models\Phy70DocumentBuilder::create([
            'name' => $request->name,
            'input_schema' => $inputSchema,
            'output_schema' => $outputSchema,
        ]);
        
        return back()->with('success', 'สร้าง Template ใหม่เรียบร้อยแล้ว');
    }

    public function updateTemplate(Request $request, $id)
    {
        $this->checkSuperadmin();
        $template = \Modules\Phy70\Models\Phy70DocumentBuilder::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255',
            'input_schema' => 'nullable|json',
            'output_schema' => 'nullable|json',
        ]);
        
        $inputSchema = $request->input_schema ? json_decode($request->input_schema, true) : [];
        $outputSchema = $request->output_schema ? json_decode($request->output_schema, true) : [];
        
        $template->update([
            'name' => $request->name,
            'input_schema' => $inputSchema,
            'output_schema' => $outputSchema,
        ]);
        
        return back()->with('success', 'อัปเดต Template เรียบร้อยแล้ว');
    }

    public function deleteTemplate($id)
    {
        $this->checkSuperadmin();
        \Modules\Phy70\Models\Phy70DocumentBuilder::findOrFail($id)->delete();
        
        return back()->with('success', 'ลบ Template เรียบร้อยแล้ว');
    }

    public function previewTemplate(Request $request, $id)
    {
        $this->checkSuperadmin();
        $template = \Modules\Phy70\Models\Phy70DocumentBuilder::findOrFail($id);
        
        $payload = $template->output_schema;
        
        // Mock a proposal for preview purposes
        $proposals = Phy70Proposal::take(1)->get();
        if ($proposals->isEmpty()) {
            // Create a fake proposal if none exist just for preview
            $proposals = collect([(object)[
                'id' => 0,
                'project_name' => 'โครงการตัวอย่าง (Preview)',
                'project_code' => 'PRJ-2570-0000',
                'province_issue' => 'ประเด็นการพัฒนาตัวอย่าง',
                'kpis' => [['name' => 'ตัวชี้วัดตัวอย่าง 1', 'selected' => true]],
                'activities' => [['name' => 'กิจกรรมตัวอย่าง 1', 'budget' => 100000]]
            ]]);
        }
        
        $dataSource = 'proposals';
        $outputFormat = 'pdf';
        
        return view('phy70::superadmin.document_preview', compact('payload', 'proposals', 'request', 'template', 'dataSource', 'outputFormat'));
    }

    public function saveReport(Request $request)
    {
        $this->checkSuperadmin();
        
        $request->validate([
            'report_name' => 'required|string|max:255',
            'template_id' => 'required|exists:phy70_document_builders,id',
            'data_source' => 'required|string',
            'output_format' => 'required|string',
            'proposals' => 'nullable|array',
        ]);
        
        \Modules\Phy70\Models\Phy70Report::create([
            'name' => $request->report_name,
            'template_id' => $request->template_id,
            'data_source' => $request->data_source,
            'filters' => [
                'year' => $request->filter_year,
                'status' => $request->filter_status,
                'order_by' => $request->order_by,
                'limit' => $request->limit,
                'custom_query' => $request->custom_query,
                'page_orientation' => $request->page_orientation,
                'custom_groups' => json_decode($request->custom_groups, true) ?? []
            ],
            'selected_ids' => $request->input('proposals', []),
            'output_format' => $request->output_format,
            'creator_id' => $this->guard()->id(),
        ]);
        
        return back()->with('success', 'บันทึกรายงานใหม่เรียบร้อยแล้ว');
    }

    public function viewReport(Request $request, $id)
    {
        $this->checkSuperadmin();
        
        $report = \Modules\Phy70\Models\Phy70Report::with('template')->findOrFail($id);
        
        $template = $report->template;
        $payload = $template ? $template->output_schema : [];
        
        $dataSource = $report->data_source;
        $outputFormat = $report->output_format;
        $filters = $report->filters ?? [];
        
        $selectedProposalIds = $report->selected_ids ?? [];
        
        if (!empty($selectedProposalIds)) {
            $proposals = Phy70Proposal::whereIn('id', $selectedProposalIds)->get();
        } else {
            $query = Phy70Proposal::query();
            if ($dataSource === 'proposals') {
                if (!empty($filters['year'])) {
                    $query->where('operating_year', $filters['year']);
                }
                if (!empty($filters['status'])) {
                    $query->where('status', $filters['status']);
                }
                if (!empty($filters['order_by'])) {
                    switch ($filters['order_by']) {
                        case 'created_at_desc': $query->orderBy('created_at', 'desc'); break;
                        case 'created_at_asc': $query->orderBy('created_at', 'asc'); break;
                        default: $query->orderBy('created_at', 'desc'); break;
                    }
                } else {
                    $query->orderBy('created_at', 'desc');
                }
                if (!empty($filters['limit']) && intval($filters['limit']) > 0) {
                    $query->limit(intval($filters['limit']));
                }
            }
            $proposals = $query->get();
        }
        
        // Merge custom_groups and page_orientation into request so it can be accessed in the view
        if (isset($filters['custom_groups'])) {
            $request->merge(['custom_groups' => $filters['custom_groups']]);
        }
        if (isset($filters['page_orientation'])) {
            $request->merge(['page_orientation' => $filters['page_orientation']]);
        }
        
        // Pass the request but we mock it if needed
        return view('phy70::superadmin.document_preview', compact('payload', 'proposals', 'request', 'template', 'dataSource', 'outputFormat'));
    }

    public function updateReport(Request $request, $id)
    {
        $this->checkSuperadmin();
        
        $report = \Modules\Phy70\Models\Phy70Report::findOrFail($id);
        
        $request->validate([
            'report_name' => 'required|string|max:255',
            'template_id' => 'required|exists:phy70_document_builders,id',
            'data_source' => 'required|string',
            'output_format' => 'required|string',
            'proposals' => 'nullable|array',
        ]);
        
        $report->update([
            'name' => $request->report_name,
            'template_id' => $request->template_id,
            'data_source' => $request->data_source,
            'filters' => [
                'year' => $request->filter_year,
                'status' => $request->filter_status,
                'order_by' => $request->order_by,
                'limit' => $request->limit,
                'custom_query' => $request->custom_query,
                'page_orientation' => $request->page_orientation,
                'custom_groups' => json_decode($request->custom_groups, true) ?? []
            ],
            'selected_ids' => $request->input('proposals', []),
            'output_format' => $request->output_format,
        ]);
        
        return back()->with('success', 'อัปเดตรายงานเรียบร้อยแล้ว');
    }

    public function deleteReport($id)
    {
        $this->checkSuperadmin();
        \Modules\Phy70\Models\Phy70Report::findOrFail($id)->delete();
        
        return back()->with('success', 'ลบรายงานเรียบร้อยแล้ว');
    }
}
