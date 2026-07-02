<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormSubmission;
use App\Models\FormAnalytics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class FormSubmissionController extends Controller
{
    /**
     * Submit a form response.
     */
    public function submit(Request $request, string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        if (!$form->isAcceptingSubmissions()) {
            return response()->json([
                'success' => false,
                'message' => 'This form is not currently accepting submissions',
                'status' => $form->status,
            ], 403);
        }

        // Validate responses
        $responses = $request->input('responses', []);
        $validationRules = $this->buildValidationRules($form->schema, $responses);

        $validator = Validator::make($request->all(), $validationRules);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check for multiple submissions if not allowed
        $settings = $form->settingsWithDefaults;
        if (!$settings['allow_multiple_submissions'] && $request->has('respondent_email')) {
            $existingSubmission = FormSubmission::where('form_id', $form->id)
                ->where('respondent_email', $request->respondent_email)
                ->exists();

            if ($existingSubmission) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have already submitted this form',
                ], 409);
            }
        }

        // Create submission
        $submission = FormSubmission::create([
            'form_id' => $form->id,
            'responses' => $responses,
            'respondent_name' => $request->input('respondent_name'),
            'respondent_email' => $request->input('respondent_email'),
            'respondent_phone' => $request->input('respondent_phone'),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        // Record submission event
        FormAnalytics::recordSubmission($form, [
            'submission_id' => $submission->id,
        ]);

        // Clear form cache
        $form->clearCache();

        return response()->json([
            'success' => true,
            'message' => $settings['confirmation_message'] ?? 'Thank you for your submission',
            'data' => [
                'submission_id' => $submission->id,
                'redirect_url' => $settings['redirect_url'] ?? null,
            ],
        ], 201);
    }

    /**
     * Get all submissions for a form.
     */
    public function index(string $uuid, Request $request)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Check if user has access to view submissions
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Please login to view submissions.',
            ], 401);
        }

        // Check access: owner or approved access request
        if (!$user->hasFormAccess($form->id)) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to view submissions for this form. Please request access from the form owner.',
                'error_code' => 'ACCESS_DENIED',
            ], 403);
        }

        $query = FormSubmission::where('form_id', $form->id)
            ->latest();

        // Filter by read status
        if ($request->has('read')) {
            $query->where('is_read', $request->read);
        }

        // Search in responses
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('respondent_name', 'like', "%{$search}%")
                  ->orWhere('respondent_email', 'like', "%{$search}%")
                  ->orWhere('respondent_phone', 'like', "%{$search}%");
            });
        }

        // Date range filter
        if ($request->filled('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->filled('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $submissions = $request->get('per_page', 500) === 'all'
            ? $query->get()
            : $query->paginate($request->get('per_page', 500));

        return response()->json([
            'success' => true,
            'data' => $submissions,
            'form' => [
                'title' => $form->title,
                'fields' => $form->fields,
            ],
        ]);
    }

    /**
     * Display the specified submission.
     */
    public function show(string $uuid, string $submissionId)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Validate submission ID
        if (empty($submissionId) || (int)$submissionId === 0) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid submission ID',
            ], 400);
        }

        $submission = FormSubmission::where('form_id', $form->id)
            ->findOrFail((int)$submissionId);

        // Mark as read
        $submission->markAsRead();

        return response()->json([
            'success' => true,
            'data' => [
                'submission' => $submission,
                'form' => [
                    'title' => $form->title,
                    'fields' => $form->fields,
                ],
            ],
        ]);
    }

    /**
     * Update submission admin notes.
     */
    public function updateNotes(Request $request, string $uuid, string $submissionId)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Validate submission ID
        if (empty($submissionId) || (int)$submissionId === 0) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid submission ID',
            ], 400);
        }

        $submission = FormSubmission::where('form_id', $form->id)
            ->findOrFail((int)$submissionId);

        $validator = Validator::make($request->all(), [
            'admin_notes' => 'nullable|string',
            'is_read' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $updateData = [];

        if ($request->has('admin_notes')) {
            $updateData['admin_notes'] = $request->admin_notes;
        }

        if ($request->has('is_read')) {
            $updateData['is_read'] = $request->is_read;
        }

        $submission->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Submission updated successfully',
            'data' => $submission->fresh(),
        ]);
    }

    /**
     * Add a note to submission.
     */
    public function addNote(Request $request, string $uuid, string $submissionId)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Validate submission ID
        if (empty($submissionId) || (int)$submissionId === 0) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid submission ID',
            ], 400);
        }

        $submission = FormSubmission::where('form_id', $form->id)
            ->findOrFail((int)$submissionId);

        $validator = Validator::make($request->all(), [
            'note' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $submission->addNote($request->note);

        return response()->json([
            'success' => true,
            'message' => 'Note added successfully',
            'data' => $submission->fresh(),
        ]);
    }

    /**
     * Delete a submission.
     */
    public function destroy(string $uuid, string $submissionId)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Validate submission ID
        if (empty($submissionId) || (int)$submissionId === 0) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid submission ID',
            ], 400);
        }

        $submission = FormSubmission::where('form_id', $form->id)
            ->findOrFail((int)$submissionId);

        $submission->delete();

        return response()->json([
            'success' => true,
            'message' => 'Submission deleted successfully',
        ]);
    }

    /**
     * Export submissions to CSV.
     */
    public function export(string $uuid, Request $request)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        $submissions = FormSubmission::where('form_id', $form->id)->get();
        $fields = $form->fields;

        // Create CSV
        $csvData = [];

        // Header row
        $headers = ['ID', 'Submitted At', 'Name', 'Email', 'Phone'];
        foreach ($fields as $field) {
            $headers[] = $field['label'] ?? $field['id'];
        }
        $csvData[] = $headers;

        // Data rows
        foreach ($submissions as $submission) {
            $row = [
                $submission->id,
                $submission->created_at->format('Y-m-d H:i:s'),
                $submission->respondent_name ?? '',
                $submission->respondent_email ?? '',
                $submission->respondent_phone ?? '',
            ];

            foreach ($fields as $field) {
                $value = $submission->getResponse($field['id']);
                if (is_array($value)) {
                    $value = implode(', ', $value);
                }
                $row[] = $value ?? '';
            }

            $csvData[] = $row;
        }

        // Convert to CSV string
        $output = fopen('php://temp', 'r+');
        foreach ($csvData as $row) {
            fputcsv($output, $row);
        }
        rewind($output);
        $csvString = stream_get_contents($output);
        fclose($output);

        return response($csvString)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="' . preg_replace('/[^A-Za-z0-9_\-]/', '_', $form->title) . '_submissions_' . date('Y-m-d') . '.csv"');
    }

    /**
     * Get submission statistics.
     */
    public function stats(string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        $totalSubmissions = $form->submissions()->count();
        $unreadCount = $form->submissions()->unread()->count();

        // Submissions by date (last 30 days)
        $submissionsByDate = $form->submissions()
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Recent submissions
        $recentSubmissions = $form->submissions()
            ->latest()
            ->take(5)
            ->get(['id', 'respondent_name', 'respondent_email', 'created_at']);

        return response()->json([
            'success' => true,
            'data' => [
                'total_submissions' => $totalSubmissions,
                'unread_count' => $unreadCount,
                'submissions_by_date' => $submissionsByDate,
                'recent_submissions' => $recentSubmissions,
            ],
        ]);
    }

    /**
     * Get comprehensive dashboard statistics for all forms.
     */
    public function dashboard()
    {
        // Overall statistics
        $totalForms = Form::count();
        $activeForms = Form::where('is_active', true)->count();
        $totalSubmissions = FormSubmission::count();
        $unreadSubmissions = FormSubmission::where('is_read', false)->count();

        // Submissions by date (last 30 days)
        $submissionsByDate = FormSubmission::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Top forms by submissions
        $topForms = Form::withCount('submissions')
            ->orderBy('submissions_count', 'desc')
            ->take(5)
            ->get(['id', 'title', 'uuid', 'is_active']);

        // Submissions by form (for pie chart)
        $submissionsByForm = Form::withCount('submissions')
            ->having('submissions_count', '>', 0)
            ->orderBy('submissions_count', 'desc')
            ->get(['id', 'title', 'uuid']);

        // Recent submissions
        $recentSubmissions = FormSubmission::with('form')
            ->latest()
            ->take(10)
            ->get();

        // Analytics events (last 7 days)
        $analyticsByDate = FormAnalytics::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Form status breakdown
        $formStatus = [
            'active' => Form::where('is_active', true)
                ->whereNull('expires_at')
                ->orWhere('expires_at', '>', now())
                ->count(),
            'inactive' => Form::where('is_active', false)->count(),
            'expired' => Form::where('expires_at', '<', now())->count(),
            'scheduled' => Form::where('published_at', '>', now())->count(),
        ];

        // Average submissions per day (last 30 days)
        $avgSubmissionsPerDay = $totalSubmissions > 0 
            ? round($totalSubmissions / 30, 2) 
            : 0;

        // Response rate (submissions / views)
        $totalViews = FormAnalytics::where('event_type', 'view')->count();
        $responseRate = $totalViews > 0 
            ? round(($totalSubmissions / $totalViews) * 100, 2) 
            : 0;

        // Submissions by hour (today)
        $submissionsByHour = FormSubmission::selectRaw('HOUR(created_at) as hour, COUNT(*) as count')
            ->whereDate('created_at', today())
            ->groupBy('hour')
            ->orderBy('hour')
            ->get();

        // Device breakdown (if tracked)
        $deviceBreakdown = DB::table('form_analytics')
            ->selectRaw('JSON_EXTRACT(metadata, "$.device_type") as device, COUNT(*) as count')
            ->groupBy('device')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'overview' => [
                    'total_forms' => $totalForms,
                    'active_forms' => $activeForms,
                    'total_submissions' => $totalSubmissions,
                    'unread_submissions' => $unreadSubmissions,
                    'total_views' => $totalViews,
                    'response_rate' => $responseRate,
                    'avg_submissions_per_day' => $avgSubmissionsPerDay,
                ],
                'form_status' => $formStatus,
                'submissions_by_date' => $submissionsByDate,
                'submissions_by_hour' => $submissionsByHour,
                'analytics_by_date' => $analyticsByDate,
                'top_forms' => $topForms,
                'submissions_by_form' => $submissionsByForm,
                'recent_submissions' => $recentSubmissions,
                'device_breakdown' => $deviceBreakdown,
            ],
        ]);
    }

    /**
     * Build validation rules from form schema.
     */
    private function buildValidationRules(array $schema, array $responses): array
    {
        $rules = [];
        $fields = $schema['fields'] ?? [];

        foreach ($fields as $field) {
            $fieldId = $field['id'];
            $fieldRules = [];

            // Required validation
            if (!empty($field['required'])) {
                $fieldRules[] = 'required';

                // Check if value exists for array fields (checkboxes)
                if (($field['type'] ?? '') === 'checkbox' && is_array($responses[$fieldId] ?? [])) {
                    $fieldRules[] = 'min:1';
                }
            } else {
                $fieldRules[] = 'nullable';
            }

            // Type validation
            $type = $field['type'] ?? 'text';
            switch ($type) {
                case 'email':
                    $fieldRules[] = 'email';
                    break;
                case 'number':
                    $fieldRules[] = 'numeric';
                    break;
                case 'url':
                    $fieldRules[] = 'url';
                    break;
                case 'tel':
                    $fieldRules[] = 'string';
                    break;
            }

            // Min/Max validation
            if (isset($field['min'])) {
                if ($type === 'number') {
                    $fieldRules[] = 'min:' . $field['min'];
                } else {
                    $fieldRules[] = 'min:' . $field['min'];
                }
            }

            if (isset($field['max'])) {
                if ($type === 'number') {
                    $fieldRules[] = 'max:' . $field['max'];
                } else {
                    $fieldRules[] = 'max:' . $field['max'];
                }
            }

            // Custom validation message
            if (!empty($field['validation_message'])) {
                // Custom messages handled separately
            }

            $rules["responses.{$fieldId}"] = $fieldRules;
        }

        // Add respondent info validation if enabled
        $settings = $schema['settings'] ?? [];

        return $rules;
    }
}