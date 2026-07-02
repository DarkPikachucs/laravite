<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormAccessRequest;
use App\Models\FormAccessGrant;
use App\Models\FormAccessAuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FormAccessController extends Controller
{
    /**
     * Request access to view form submissions
     */
    public function requestAccess(Request $request, string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is already the owner
        if ($form->created_by === Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณเป็นเจ้าของแบบฟอร์มนี้',
            ], 400);
        }

        // Check if already has access
        if (Auth::user()->hasFormAccess($form->id)) {
            return response()->json([
                'success' => false,
                'message' => 'คุณมีสิทธิ์ดูผลลัพธ์แบบฟอร์มนี้แล้ว',
            ], 400);
        }

        // Validate permission level
        $permissionLevel = $request->permission_level ?? 'view';
        if (!in_array($permissionLevel, ['view', 'export', 'manage'])) {
            return response()->json([
                'success' => false,
                'message' => 'ระดับสิทธิ์ไม่ถูกต้อง',
            ], 400);
        }

        // Create or update access request
        $accessRequest = FormAccessRequest::requestAccess(
            Auth::id(),
            $form->id,
            $request->reason,
            $permissionLevel
        );

        return response()->json([
            'success' => true,
            'message' => 'ส่งคำขอสิทธิ์เรียบร้อยแล้ว รอเจ้าของแบบฟอร์มอนุมัติ',
            'data' => [
                'request_id' => $accessRequest->id,
                'status' => $accessRequest->status,
                'permission_level' => $accessRequest->permission_level,
                'permission_label' => $accessRequest->permission_label,
                'created_at' => $accessRequest->created_at->diffForHumans(),
            ],
        ], 201);
    }

    /**
     * Check access status for a form
     */
    public function checkAccess(string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        $user = Auth::user();

        // Check if user is the owner
        $isOwner = $form->created_by === $user->id;

        // Auto-approve for internal users who don't have access yet
        $isInternal = $user->isInternal();
        if ($isInternal && !$isOwner) {
            // Check if already has approved access
            $hasApprovedAccess = FormAccessRequest::hasAccess($user->id, $form->id);

            if (!$hasApprovedAccess) {
                // Auto-create approved access request for internal users
                FormAccessRequest::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'form_id' => $form->id,
                    ],
                    [
                        'status' => 'approved',
                        'reason' => 'Internal user - Auto-approved',
                        'permission_level' => 'manage',
                        'reviewed_by' => null,
                        'reviewed_at' => now(),
                    ]
                );

                \Log::info('Auto-approved access for internal user', [
                    'user_id' => $user->id,
                    'user_email' => $user->email,
                    'form_id' => $form->id,
                    'form_uuid' => $uuid,
                ]);
            }
        }

        // Owner always has access
        $hasAccess = $isOwner || $user->hasFormAccess($form->id);

        // Get detailed access info
        $accessDetails = null;
        if ($hasAccess && !$isOwner) {
            $accessRequest = FormAccessRequest::where('user_id', $user->id)
                ->where('form_id', $form->id)
                ->where('status', 'approved')
                ->first();

            if ($accessRequest) {
                $accessDetails = [
                    'permission_level' => $accessRequest->permission_level,
                    'permission_label' => $accessRequest->permission_label,
                    'expires_at' => $accessRequest->expires_at?->toIso8601String(),
                    'expires_at_human' => $accessRequest->expires_at?->diffForHumans(),
                    'is_expired' => $accessRequest->isExpired(),
                    'notify_on_submission' => $accessRequest->notify_on_submission,
                ];
            }
        }

        $existingRequest = FormAccessRequest::where('user_id', $user->id)
            ->where('form_id', $form->id)
            ->latest()
            ->first();

        return response()->json([
            'success' => true,
            'data' => [
                'has_access' => $hasAccess,
                'is_owner' => $isOwner,
                'access_details' => $accessDetails,
                'existing_request' => $existingRequest ? [
                    'id' => $existingRequest->id,
                    'status' => $existingRequest->status,
                    'permission_level' => $existingRequest->permission_level,
                    'permission_label' => $existingRequest->permission_label,
                    'reason' => $existingRequest->reason,
                    'rejection_reason' => $existingRequest->rejection_reason,
                    'created_at' => $existingRequest->created_at->diffForHumans(),
                    'reviewed_at' => $existingRequest->reviewed_at?->diffForHumans(),
                    'expires_at' => $existingRequest->expires_at?->toIso8601String(),
                ] : null,
            ],
        ]);
    }

    /**
     * Get pending access requests for form owner
     */
    public function getPendingRequests(string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is the owner
        if ($form->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์ดูคำขอสิทธิ์แบบฟอร์มนี้',
            ], 403);
        }

        $requests = FormAccessRequest::with(['requester', 'reviewer'])
            ->where('form_id', $form->id)
            ->where('status', 'pending')
            ->latest()
            ->get()
            ->map(fn($req) => $this->formatAccessRequest($req));

        return response()->json([
            'success' => true,
            'data' => $requests,
            'meta' => [
                'total' => $requests->count(),
            ],
        ]);
    }

    /**
     * Get all access requests for form owner
     */
    public function getAllRequests(string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is the owner
        if ($form->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์ดูคำขอสิทธิ์แบบฟอร์มนี้',
            ], 403);
        }

        $requests = FormAccessRequest::with(['requester', 'reviewer'])
            ->where('form_id', $form->id)
            ->latest()
            ->get()
            ->map(fn($req) => $this->formatAccessRequest($req));

        return response()->json([
            'success' => true,
            'data' => $requests,
            'meta' => [
                'total' => $requests->count(),
                'pending' => $requests->where('status', 'pending')->count(),
                'approved' => $requests->where('status', 'approved')->count(),
                'rejected' => $requests->where('status', 'rejected')->count(),
            ],
        ]);
    }

    /**
     * Approve access request
     */
    public function approveRequest(Request $request, string $uuid, int $requestId)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is the owner
        if ($form->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์อนุมัติคำขอสิทธิ์แบบฟอร์มนี้',
            ], 403);
        }

        $accessRequest = FormAccessRequest::where('id', $requestId)
            ->where('form_id', $form->id)
            ->first();

        if (!$accessRequest) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบคำขอสิทธิ์นี้',
            ], 404);
        }

        if (!$accessRequest->isPending()) {
            return response()->json([
                'success' => false,
                'message' => 'คำขอสิทธิ์นี้ไม่ได้รอการอนุมัติ',
            ], 400);
        }

        // Validate permission level
        $permissionLevel = $request->permission_level ?? $accessRequest->permission_level ?? 'view';
        if (!in_array($permissionLevel, ['view', 'export', 'manage'])) {
            return response()->json([
                'success' => false,
                'message' => 'ระดับสิทธิ์ไม่ถูกต้อง',
            ], 400);
        }

        // Parse expiration if provided
        $expiresAt = null;
        if ($request->expires_at) {
            $expiresAt = new \DateTime($request->expires_at);
        }

        $accessRequest->approve(Auth::id(), $permissionLevel, $expiresAt);

        // TODO: Send notification to requester

        return response()->json([
            'success' => true,
            'message' => 'อนุมัติสิทธิ์เรียบร้อยแล้ว',
            'data' => $this->formatAccessRequest($accessRequest->fresh(['requester'])),
        ]);
    }

    /**
     * Reject access request
     */
    public function rejectRequest(Request $request, string $uuid, int $requestId)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is the owner
        if ($form->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์ปฏิเสธคำขอสิทธิ์แบบฟอร์มนี้',
            ], 403);
        }

        $accessRequest = FormAccessRequest::where('id', $requestId)
            ->where('form_id', $form->id)
            ->first();

        if (!$accessRequest) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบคำขอสิทธิ์นี้',
            ], 404);
        }

        if (!$accessRequest->isPending()) {
            return response()->json([
                'success' => false,
                'message' => 'คำขอสิทธิ์นี้ไม่ได้รอการอนุมัติ',
            ], 400);
        }

        $accessRequest->reject(Auth::id(), $request->rejection_reason);

        // TODO: Send notification to requester

        return response()->json([
            'success' => true,
            'message' => 'ปฏิเสธคำขอสิทธิ์แล้ว',
            'data' => $this->formatAccessRequest($accessRequest->fresh(['requester'])),
        ]);
    }

    /**
     * Batch approve/reject requests
     */
    public function batchProcess(Request $request, string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is the owner
        if ($form->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์จัดการคำขอสิทธิ์แบบฟอร์มนี้',
            ], 403);
        }

        $request->validate([
            'action' => 'required|in:approve,reject',
            'request_ids' => 'required|array|min:1',
            'permission_level' => 'required_if:action,approve|in:view,export,manage',
            'expires_at' => 'nullable|date|after:now',
            'rejection_reason' => 'required_if:action,reject',
        ]);

        DB::transaction(function () use ($form, $request) {
            $action = $request->action;
            $requestIds = $request->request_ids;

            foreach ($requestIds as $requestId) {
                $accessRequest = FormAccessRequest::where('id', $requestId)
                    ->where('form_id', $form->id)
                    ->where('status', 'pending')
                    ->first();

                if ($accessRequest) {
                    if ($action === 'approve') {
                        $expiresAt = $request->expires_at ? new \DateTime($request->expires_at) : null;
                        $accessRequest->approve(Auth::id(), $request->permission_level, $expiresAt);
                    } else {
                        $accessRequest->reject(Auth::id(), $request->rejection_reason);
                    }
                }
            }
        });

        // TODO: Send batch notifications

        return response()->json([
            'success' => true,
            'message' => $request->action === 'approve' ? 'อนุมัติสิทธิ์เรียบร้อยแล้ว' : 'ปฏิเสธคำขอสิทธิ์แล้ว',
        ]);
    }

    /**
     * Revoke access
     */
    public function revokeAccess(string $uuid, int $userId)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is the owner
        if ($form->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์เพิกถอนสิทธิ์แบบฟอร์มนี้',
            ], 403);
        }

        $accessRequest = FormAccessRequest::where('user_id', $userId)
            ->where('form_id', $form->id)
            ->where('status', 'approved')
            ->first();

        if (!$accessRequest) {
            return response()->json([
                'success' => false,
                'message' => 'ผู้ใช้คนนี้ไม่มีสิทธิ์ดูผลลัพธ์',
            ], 404);
        }

        // Log audit before updating
        FormAccessAuditLog::create([
            'access_request_id' => $accessRequest->id,
            'form_id' => $form->id,
            'user_id' => Auth::id(),
            'action' => 'revoked',
            'old_values' => [
                'status' => 'approved',
                'permission_level' => $accessRequest->permission_level,
            ],
            'new_values' => [
                'status' => 'rejected',
                'reason' => 'Revoked by owner',
            ],
            'reason' => 'Revoked by form owner',
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        $accessRequest->update(['status' => 'rejected']);

        // Delete access grant
        FormAccessGrant::where('form_id', $form->id)
            ->where('user_id', $userId)
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'เพิกถอนสิทธิ์เรียบร้อยแล้ว',
        ]);
    }

    /**
     * Get users with access to form
     */
    public function getUsersWithAccess(string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is the owner
        if ($form->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์ดูรายการผู้ใช้แบบฟอร์มนี้',
            ], 403);
        }

        $usersWithAccess = FormAccessRequest::with(['requester'])
            ->where('form_id', $form->id)
            ->where('status', 'approved')
            ->where(function ($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->get()
            ->map(fn($req) => [
                'id' => $req->requester->id,
                'name' => $req->requester->name,
                'email' => $req->requester->email,
                'avatar' => $req->requester->avatar,
                'permission_level' => $req->permission_level,
                'permission_label' => $req->permission_label,
                'granted_at' => $req->reviewed_at?->diffForHumans(),
                'expires_at' => $req->expires_at?->toIso8601String(),
                'expires_at_human' => $req->expires_at?->diffForHumans(),
                'is_expired' => $req->isExpired(),
            ]);

        return response()->json([
            'success' => true,
            'data' => $usersWithAccess,
            'meta' => [
                'total' => $usersWithAccess->count(),
            ],
        ]);
    }

    /**
     * Grant access directly to user (without request)
     */
    public function grantAccess(Request $request, string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is the owner
        if ($form->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์มอบสิทธิ์แบบฟอร์มนี้',
            ], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'permission_level' => 'required|in:view,export,manage',
            'expires_at' => 'nullable|date|after:now',
            'notify_on_submission' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        $user = User::find($request->user_id);

        // Check if user is already the owner
        if ($form->created_by === $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'ผู้ใช้นี้เป็นเจ้าของแบบฟอร์มอยู่แล้ว',
            ], 400);
        }

        $expiresAt = $request->expires_at ? new \DateTime($request->expires_at) : null;

        $grant = FormAccessRequest::directGrant(
            $user->id,
            $form->id,
            Auth::id(),
            $request->permission_level,
            $expiresAt,
            $request->notes
        );

        // Update or create access request record for consistency
        FormAccessRequest::updateOrCreate(
            ['user_id' => $user->id, 'form_id' => $form->id],
            [
                'status' => 'approved',
                'permission_level' => $request->permission_level,
                'reviewed_by' => Auth::id(),
                'reviewed_at' => now(),
                'expires_at' => $expiresAt,
                'notify_on_submission' => $request->notify_on_submission ?? false,
            ]
        );

        // Log audit
        FormAccessAuditLog::create([
            'form_id' => $form->id,
            'user_id' => Auth::id(),
            'action' => 'granted',
            'new_values' => [
                'user_granted' => $user->name,
                'permission_level' => $request->permission_level,
                'expires_at' => $expiresAt?->toIso8601String(),
            ],
            'reason' => $request->notes,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        // TODO: Send notification to granted user

        return response()->json([
            'success' => true,
            'message' => 'มอบสิทธิ์เรียบร้อยแล้ว',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'permission_level' => $grant->permission_level,
                'permission_label' => $grant->permission_label,
                'expires_at' => $grant->expires_at?->toIso8601String(),
            ],
        ]);
    }

    /**
     * Update user's permission level
     */
    public function updatePermission(Request $request, string $uuid, int $userId)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is the owner
        if ($form->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์แก้ไขสิทธิ์แบบฟอร์มนี้',
            ], 403);
        }

        $request->validate([
            'permission_level' => 'required|in:view,export,manage',
            'notes' => 'nullable|string',
        ]);

        $grant = FormAccessGrant::where('form_id', $form->id)
            ->where('user_id', $userId)
            ->first();

        if (!$grant) {
            return response()->json([
                'success' => false,
                'message' => 'ผู้ใช้คนนี้ไม่มีสิทธิ์ดูผลลัพธ์',
            ], 404);
        }

        $grant->updatePermission($request->permission_level, $request->notes);

        // Update access request record for consistency
        FormAccessRequest::where('user_id', $userId)
            ->where('form_id', $form->id)
            ->update([
                'permission_level' => $request->permission_level,
            ]);

        return response()->json([
            'success' => true,
            'message' => 'อัปเดตสิทธิ์เรียบร้อยแล้ว',
            'data' => [
                'permission_level' => $grant->permission_level,
                'permission_label' => $grant->permission_label,
            ],
        ]);
    }

    /**
     * Get audit log for form access
     */
    public function getAuditLog(string $uuid)
    {
        $form = Form::findByUuid($uuid);

        if (!$form) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบแบบฟอร์มนี้',
            ], 404);
        }

        // Check if user is the owner
        if ($form->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'คุณไม่มีสิทธิ์ดูประวัติการใช้งานแบบฟอร์มนี้',
            ], 403);
        }

        $auditLogs = FormAccessAuditLog::with(['user'])
            ->forForm($form->id)
            ->latest()
            ->limit(100)
            ->get()
            ->map(fn($log) => [
                'id' => $log->id,
                'action' => $log->action,
                'action_label' => $log->action_label,
                'user' => [
                    'id' => $log->user_id,
                    'name' => $log->user?->name ?? 'System',
                    'email' => $log->user?->email ?? 'system',
                ],
                'old_values' => $log->old_values,
                'new_values' => $log->new_values,
                'reason' => $log->reason,
                'created_at' => $log->created_at->toIso8601String(),
                'created_at_human' => $log->created_at->diffForHumans(),
            ]);

        return response()->json([
            'success' => true,
            'data' => $auditLogs,
            'meta' => [
                'total' => $auditLogs->count(),
            ],
        ]);
    }

    /**
     * Get current user's access requests
     */
    public function myRequests()
    {
        $requests = FormAccessRequest::with(['form'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(fn($req) => [
                'id' => $req->id,
                'form' => [
                    'id' => $req->form->id,
                    'uuid' => $req->form->uuid,
                    'title' => $req->form->title,
                ],
                'status' => $req->status,
                'permission_level' => $req->permission_level,
                'permission_label' => $req->permission_label,
                'reason' => $req->reason,
                'rejection_reason' => $req->rejection_reason,
                'created_at' => $req->created_at->toIso8601String(),
                'reviewed_at' => $req->reviewed_at?->toIso8601String(),
                'expires_at' => $req->expires_at?->toIso8601String(),
            ]);

        return response()->json([
            'success' => true,
            'data' => $requests,
        ]);
    }

    /**
     * Format access request for response
     */
    private function formatAccessRequest($request)
    {
        return [
            'id' => $request->id,
            'user' => [
                'id' => $request->requester->id,
                'name' => $request->requester->name,
                'email' => $request->requester->email,
                'avatar' => $request->requester->avatar,
                'department' => $request->requester->department,
                'position' => $request->requester->position,
            ],
            'status' => $request->status,
            'permission_level' => $request->permission_level,
            'permission_label' => $request->permission_label,
            'reason' => $request->reason,
            'rejection_reason' => $request->rejection_reason,
            'reviewer' => $request->reviewer ? [
                'id' => $request->reviewer->id,
                'name' => $request->reviewer->name,
            ] : null,
            'created_at' => $request->created_at->toIso8601String(),
            'created_at_human' => $request->created_at->diffForHumans(),
            'reviewed_at' => $request->reviewed_at?->toIso8601String(),
            'reviewed_at_human' => $request->reviewed_at?->diffForHumans(),
            'expires_at' => $request->expires_at?->toIso8601String(),
            'expires_at_human' => $request->expires_at?->diffForHumans(),
            'is_expired' => $request->isExpired(),
        ];
    }
}
