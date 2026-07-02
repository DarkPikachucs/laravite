<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class FormAccessGrant extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_id',
        'granted_by',
        'user_id',
        'permission_level',
        'expires_at',
        'notify_on_submission',
        'notes',
        'audit_log',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'notify_on_submission' => 'boolean',
        'audit_log' => 'array',
    ];

    /**
     * Get the form
     */
    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    /**
     * Get the user who granted access
     */
    public function granter()
    {
        return $this->belongsTo(User::class, 'granted_by');
    }

    /**
     * Get the user who received access
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Check if access is still valid (not expired)
     */
    public function isValid(): bool
    {
        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }
        return true;
    }

    /**
     * Check if user has specific permission level
     */
    public function hasPermission(string $level): bool
    {
        if (!$this->isValid()) {
            return false;
        }

        $levels = ['view' => 1, 'export' => 2, 'manage' => 3];
        return $levels[$this->permission_level] >= $levels[$level];
    }

    /**
     * Update permission level
     */
    public function updatePermission(string $level, ?string $notes = null): void
    {
        $oldValues = [
            'permission_level' => $this->permission_level,
            'notes' => $this->notes,
        ];

        $this->update([
            'permission_level' => $level,
            'notes' => $notes ?? $this->notes,
        ]);

        $this->logAudit('modified', $oldValues, [
            'permission_level' => $level,
            'notes' => $notes,
        ]);
    }

    /**
     * Extend access expiration
     */
    public function extendExpiration(\DateTime $newExpiry): void
    {
        $oldValues = ['expires_at' => $this->expires_at?->toIso8601String()];

        $this->update(['expires_at' => $newExpiry]);

        $this->logAudit('modified', $oldValues, [
            'expires_at' => $newExpiry->toIso8601String(),
        ]);
    }

    /**
     * Revoke access
     */
    public function revoke(?string $reason = null): void
    {
        $this->logAudit('revoked', [
            'permission_level' => $this->permission_level,
            'expires_at' => $this->expires_at?->toIso8601String(),
        ], [
            'reason' => $reason,
        ]);

        $this->delete();
    }

    /**
     * Log audit trail
     */
    protected function logAudit(string $action, ?array $oldValues = null, ?array $newValues = null, ?string $reason = null): void
    {
        FormAccessAuditLog::create([
            'access_request_id' => null,
            'form_id' => $this->form_id,
            'user_id' => Auth::id() ?? $this->granted_by,
            'action' => $action,
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'reason' => $reason,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Scope for active (non-expired) grants
     */
    public function scopeActive($query)
    {
        return $query->whereNull('expires_at')
            ->orWhere('expires_at', '>', now());
    }

    /**
     * Scope for specific permission level
     */
    public function scopeWithPermission($query, string $level)
    {
        $levels = ['view' => 1, 'export' => 2, 'manage' => 3];
        $minLevel = $levels[$level] ?? 1;

        return $query->where(function ($q) use ($levels, $minLevel) {
            foreach ($levels as $level => $value) {
                if ($value >= $minLevel) {
                    $q->orWhere('permission_level', $level);
                }
            }
        });
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

        return $labels[$this->permission_level] ?? 'ดูผลลัพธ์';
    }
}
