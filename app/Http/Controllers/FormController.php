<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormSubmission;
use App\Models\FormAnalytics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class FormController extends Controller
{
    /**
     * Display a listing of forms.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Form::with('creator')->latest();

        // Filter by scope: mine | collaborated
        if ($request->scope === 'mine') {
            $query->where('created_by', $user->id);
        } elseif ($request->scope === 'collaborated') {
            $query->where('created_by', '!=', $user->id)
                ->whereHas('accessGrants', function ($q) use ($user) {
                    $q->where('user_id', $user->id)
                      ->where(function ($exp) {
                          $exp->whereNull('expires_at')->orWhere('expires_at', '>', now());
                      });
                });
        }

        // Filter by status
        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true)
                    ->where(function($q) {
                        $q->whereNull('expires_at')
                          ->orWhere('expires_at', '>', now());
                    });
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            } elseif ($request->status === 'expired') {
                $query->where('expires_at', '<', now());
            } elseif ($request->status === 'scheduled') {
                $query->where('published_at', '>', now());
            }
        }

        // Search by title
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Add submission count and collaborators
        $forms = $request->get('per_page', 15) === 'all'
            ? $query->withCount('submissions')->get()->map(function($form) {
                $form->submission_count = $form->submissions_count;
                $form->append('collaborators');
                return $form;
            })
            : $query->withCount('submissions')->paginate($request->get('per_page', 15))->through(function($form) {
                $form->submission_count = $form->submissions_count;
                $form->append('collaborators');
                return $form;
            });

        return response()->json([
            'success' => true,
            'data' => $forms,
        ]);
    }

    /**
     * Store a newly created form.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        
        // Check if user is internal (can create forms)
        if (!$user || !$user->isInternal()) {
            return response()->json([
                'success' => false,
                'message' => 'เฉพาะผู้ใช้ภายใน (@pcru.ac.th) เท่านั้นที่สามารถสร้างแบบฟอร์มได้',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:forms,slug',
            'description' => 'nullable|string',
            'form_type' => 'nullable|in:schema,script',
            'template' => 'nullable|in:default,survey',
            'schema' => 'nullable|json',
            'script_content' => 'nullable|string',
            'settings' => 'nullable|json',
            'is_active' => 'boolean',
            'published_at' => 'nullable|date',
            'expires_at' => 'nullable|date|after:published_at',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $formType = $request->form_type ?? 'schema';

        // Validate based on form type
        if ($formType === 'script') {
            if (empty($request->script_content)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Script content is required for script-based forms',
                ], 422);
            }
        } else {
            // Schema-based form validation
            if (empty($request->schema)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Schema is required for schema-based forms',
                ], 422);
            }

            $schema = json_decode($request->schema, true);
            if (!isset($schema['fields']) || !is_array($schema['fields'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Schema must contain a fields array',
                ], 422);
            }
        }

        $form = Form::create([
            'uuid' => Str::uuid()->toString(),
            'slug' => $request->slug,
            'title' => $request->title,
            'description' => $request->description,
            'form_type' => $formType,
            'template' => $request->template ?? 'default',
            'schema' => $request->has('schema') ? json_decode($request->schema, true) : null,
            'script_content' => $request->script_content,
            'settings' => $request->has('settings') ? json_decode($request->settings, true) : null,
            'is_active' => $request->is_active ?? false,
            'published_at' => $request->published_at,
            'expires_at' => $request->expires_at,
            'created_by' => auth()->id(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Form created successfully',
            'data' => $form->load('creator'),
        ], 201);
    }

    /**
     * Display the specified form.
     */
    public function show(string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Record view event
        $form->recordEvent('view', ['user_agent' => request()->userAgent()], request()->ip());

        return response()->json([
            'success' => true,
            'data' => $form->load('creator'),
        ]);
    }

    /**
     * Display a form for filling by UUID or slug (public).
     */
    public function fill(string $identifier)
    {
        $form = Form::findByUuid($identifier);
        if (!$form) {
            $form = Form::findBySlug($identifier);
        }

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

        return response()->json([
            'success' => true,
            'data' => [
                'uuid' => $form->uuid,
                'slug' => $form->slug,
                'title' => $form->title,
                'tagline' => $form->tagline,
                'description' => $form->description,
                'form_type' => $form->form_type,
                'template' => $form->template,
                'schema' => $form->schema,
                'script_content' => $form->script_content,
                'settings' => $form->settingsWithDefaults,
            ],
        ]);
    }

    /**
     * Update the specified form.
     */
    public function update(Request $request, string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Check if user is the creator
        $user = $request->user();
        if (!$user || $form->created_by !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์แก้ไขแบบฟอร์มนี้',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:forms,slug,' . $form->id,
            'description' => 'nullable|string',
            'form_type' => 'nullable|in:schema,script',
            'template' => 'nullable|in:default,survey',
            'schema' => 'nullable|json',
            'script_content' => 'nullable|string',
            'settings' => 'nullable|json',
            'is_active' => 'boolean',
            'published_at' => 'nullable|date',
            'expires_at' => 'nullable|date|after:published_at',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $updateData = [];

        if ($request->has('title')) {
            $updateData['title'] = $request->title;
        }

        if ($request->has('slug')) {
            $updateData['slug'] = $request->slug;
        }

        if ($request->has('description')) {
            $updateData['description'] = $request->description;
        }

        // Handle template
        if ($request->has('template')) {
            $updateData['template'] = $request->template;
        }

        // Handle form type
        if ($request->has('form_type')) {
            $formType = $request->form_type;

            // Validate based on form type
            if ($formType === 'script') {
                // Allow switching to script type without content initially
                // Content can be added later via script editor
                if ($request->has('script_content') && empty($request->script_content)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Script content cannot be empty for script-based forms',
                    ], 422);
                }
            } elseif ($formType === 'schema') {
                if (empty($request->schema)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Schema is required for schema-based forms',
                    ], 422);
                }

                $schema = json_decode($request->schema, true);
                if (!isset($schema['fields']) || !is_array($schema['fields'])) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Schema must contain a fields array',
                    ], 422);
                }
                $updateData['schema'] = $schema;
            }

            $updateData['form_type'] = $formType;
        }

        // Handle script content
        if ($request->has('script_content')) {
            $updateData['script_content'] = $request->script_content;
        }

        if ($request->has('settings')) {
            $updateData['settings'] = json_decode($request->settings, true);
        }

        if ($request->has('is_active')) {
            $updateData['is_active'] = $request->is_active;
        }

        if ($request->has('published_at')) {
            $updateData['published_at'] = $request->published_at;
        }

        if ($request->has('expires_at')) {
            $updateData['expires_at'] = $request->expires_at;
        }

        $form->update($updateData);
        $form->clearCache();

        return response()->json([
            'success' => true,
            'message' => 'Form updated successfully',
            'data' => $form->fresh()->load('creator'),
        ]);
    }

    /**
     * Remove the specified form.
     */
    public function destroy(string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Check if user is the creator
        $user = auth()->user();
        if (!$user || $form->created_by !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์ลบแบบฟอร์มนี้',
            ], 403);
        }

        $form->delete();

        return response()->json([
            'success' => true,
            'message' => 'Form deleted successfully',
        ]);
    }

    /**
     * Duplicate a form.
     */
    public function duplicate(string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Check if user is the creator
        $user = auth()->user();
        if (!$user || $form->created_by !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์ทำสำเนาแบบฟอร์มนี้',
            ], 403);
        }

        $newForm = $form->replicate();
        $newForm->uuid = Str::uuid()->toString();
        $newForm->title = $form->title . ' (Copy)';
        $newForm->is_active = false;
        $newForm->published_at = null;
        $newForm->created_by = auth()->id();
        $newForm->save();

        return response()->json([
            'success' => true,
            'message' => 'Form duplicated successfully',
            'data' => $newForm->fresh(),
        ], 201);
    }

    /**
     * Get script content for editing.
     */
    public function script(string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        if ($form->form_type !== 'script') {
            return response()->json([
                'success' => false,
                'message' => 'This form is not a script-based form',
            ], 400);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'uuid' => $form->uuid,
                'title' => $form->title,
                'script_content' => $form->script_content,
                'form_type' => $form->form_type,
            ],
        ]);
    }

    /**
     * Update script content.
     */
    public function updateScript(string $uuid, Request $request)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Check if user is the creator
        $user = auth()->user();
        if (!$user || $form->created_by !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์แก้ไขสคริปต์แบบฟอร์มนี้',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'script_content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $form->update([
            'script_content' => $request->script_content,
            'form_type' => 'script',
        ]);

        $form->clearCache();

        return response()->json([
            'success' => true,
            'message' => 'Script updated successfully',
            'data' => $form->fresh(),
        ]);
    }

    /**
     * Publish a form.
     */
    public function publish(string $uuid, Request $request)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'Form not found',
            ], 404);
        }

        // Check if user is the creator
        $user = auth()->user();
        if (!$user || $form->created_by !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์เผยแพร่แบบฟอร์มนี้',
            ], 403);
        }

        $form->update([
            'is_active' => true,
            'published_at' => $request->published_at ?? now(),
        ]);

        $form->clearCache();

        return response()->json([
            'success' => true,
            'message' => 'Form published successfully',
            'data' => $form->fresh(),
        ]);
    }

    /**
     * Get form statistics.
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
        $totalViews = $form->analytics()->where('event_type', 'view')->count();
        $unreadSubmissions = $form->submissions()->unread()->count();
        
        $conversionRate = $totalViews > 0 
            ? round(($totalSubmissions / $totalViews) * 100, 2) 
            : 0;

        // Submissions by date (last 7 days)
        $submissionsByDate = $form->submissions()
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_submissions' => $totalSubmissions,
                'total_views' => $totalViews,
                'unread_submissions' => $unreadSubmissions,
                'conversion_rate' => $conversionRate,
                'submissions_by_date' => $submissionsByDate,
                'status' => $form->status,
            ],
        ]);
    }

    /**
     * Search users for collaborator selection.
     */
    public function searchUsers(Request $request)
    {
        $query = $request->get('q');

        if (empty($query) || strlen($query) < 2) {
            return response()->json([
                'success' => true,
                'data' => [],
            ]);
        }

        $users = \App\Models\User::where(function ($q) use ($query) {
            $q->where('name', 'like', "%{$query}%")
              ->orWhere('email', 'like', "%{$query}%");
        })
            ->limit(20)
            ->get(['id', 'name', 'email']);

        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }
}