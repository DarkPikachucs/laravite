<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FormAccessRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'form_id',
        'status',
        'permission_level',
        'reason',
        'rejection_reason',
        'reviewed_by',
        'reviewed_at',
        'expires_at',
        'notify_on_submission',
        'audit_log',
    ];

    protected $casts = [
        'reviewed_at' => 'datetime',
        'expires_at' => 'datetime',
        'notify_on_submission' => 'boolean',
        'audit_log' => 'array',
    ];

    /**
     * Get the user who requested access
     */
    public function requester()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the form that was requested
     */
    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    /**
     * Get the user who reviewed the request
     */
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Get audit logs
     */
    public function auditLogs()
    {
        return $this->hasMany(FormAccessAuditLog::class);
    }

    /**
     * Scope for pending requests
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for approved requests
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope for rejected requests
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Check if user has access to form
     */
    public static function hasAccess(int $userId, int $formId): bool
    {
        return self::where('user_id', $userId)
            ->where('form_id', $formId)
            ->where('status', 'approved')
            ->exists();
    }

    /**
     * Request access for user to form
     */
    public static function requestAccess(int $userId, int $formId, ?string $reason = null, ?string $permissionLevel = null): self
    {
        return self::updateOrCreate(
            [
                'user_id' => $userId,
                'form_id' => $formId,
            ],
            [
                'status' => 'pending',
                'reason' => $reason,
                'permission_level' => $permissionLevel ?? 'view',
                'rejection_reason' => null,
                'reviewed_by' => null,
                'reviewed_at' => null,
                'expires_at' => null,
            ]
        );
    }

    /**
     * Grant access directly without request (owner grants to user)
     */
    public static function directGrant(int $userId, int $formId, int $grantedBy, string $permissionLevel = 'view', ?\DateTime $expiresAt = null, ?string $notes = null): FormAccessGrant
    {
        return FormAccessGrant::updateOrCreate(
            [
                'form_id' => $formId,
                'user_id' => $userId,
            ],
            [
                'granted_by' => $grantedBy,
                'permission_level' => $permissionLevel,
                'expires_at' => $expiresAt,
                'notes' => $notes,
            ]
        );
    }

    /**
     * Check if request is pending
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if request is approved
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    /**
     * Check if request is rejected
     */
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    /**
     * Check if access has expired
     */
    public function isExpired(): bool
    {
        if (!$this->expires_at) {
            return false; // No expiration = permanent
        }
        return $this->expires_at->isPast();
    }

    /**
     * Get permission level label
     */
    public function getPermissionLabelAttribute(): string
    {
        $labels = [
            'view' => 'ดูผลลัพธ์',
            'export' => 'ดูและส่งออกข้อมูล',
            'manage' => 'จัดการทั้งหมด',
        ];

        return $labels[$this->permission_level ?? 'view'] ?? 'ดูผลลัพธ์';
    }

    /**
     * Check if user has specific permission level
     */
    public function hasPermission(string $level): bool
    {
        if ($this->status !== 'approved') {
            return false;
        }

        if ($this->isExpired()) {
            return false;
        }

        $levels = ['view' => 1, 'export' => 2, 'manage' => 3];
        $userLevel = $levels[$this->permission_level ?? 'view'] ?? 1;
        $requiredLevel = $levels[$level] ?? 1;

        return $userLevel >= $requiredLevel;
    }

    /**
     * Approve the request
     */
    public function approve(int $reviewedBy, ?string $permissionLevel = null, ?\DateTime $expiresAt = null): void
    {
        DB::transaction(function () use ($reviewedBy, $permissionLevel, $expiresAt) {
            $oldValues = [
                'status' => $this->status,
                'permission_level' => $this->permission_level,
                'expires_at' => $this->expires_at?->toIso8601String(),
            ];

            $this->update([
                'status' => 'approved',
                'reviewed_by' => $reviewedBy,
                'reviewed_at' => now(),
                'permission_level' => $permissionLevel ?? $this->permission_level ?? 'view',
                'expires_at' => $expiresAt,
                'rejection_reason' => null,
            ]);

            // Log audit trail
            FormAccessAuditLog::create([
                'access_request_id' => $this->id,
                'form_id' => $this->form_id,
                'user_id' => $reviewedBy,
                'action' => 'approved',
                'old_values' => $oldValues,
                'new_values' => [
                    'status' => 'approved',
                    'permission_level' => $this->permission_level,
                    'expires_at' => $this->expires_at?->toIso8601String(),
                ],
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);

            // Create or update access grant
            FormAccessGrant::updateOrCreate(
                [
                    'form_id' => $this->form_id,
                    'user_id' => $this->user_id,
                ],
                [
                    'granted_by' => $reviewedBy,
                    'permission_level' => $this->permission_level,
                    'expires_at' => $expiresAt,
                    'notify_on_submission' => $this->notify_on_submission,
                ]
            );
        });
    }

    /**
     * Reject the request
     */
    public function reject(int $reviewedBy, ?string $reason = null): void
    {
        DB::transaction(function () use ($reviewedBy, $reason) {
            $oldValues = [
                'status' => $this->status,
                'reason' => $this->reason,
            ];

            $this->update([
                'status' => 'rejected',
                'reviewed_by' => $reviewedBy,
                'reviewed_at' => now(),
                'rejection_reason' => $reason,
            ]);

            // Log audit trail
            FormAccessAuditLog::create([
                'access_request_id' => $this->id,
                'form_id' => $this->form_id,
                'user_id' => $reviewedBy,
                'action' => 'rejected',
                'old_values' => $oldValues,
                'new_values' => [
                    'status' => 'rejected',
                    'rejection_reason' => $reason,
                ],
                'reason' => $reason,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);

            // Delete any existing grant
            FormAccessGrant::where('form_id', $this->form_id)
                ->where('user_id', $this->user_id)
                ->delete();
        });
    }
}
