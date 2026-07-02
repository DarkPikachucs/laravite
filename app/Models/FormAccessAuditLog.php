<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormAccessAuditLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'access_request_id',
        'form_id',
        'user_id',
        'action',
        'old_values',
        'new_values',
        'reason',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
    ];

    /**
     * Get the access request (if applicable)
     */
    public function accessRequest()
    {
        return $this->belongsTo(FormAccessRequest::class);
    }

    /**
     * Get the form
     */
    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    /**
     * Get the user who performed the action
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get action label
     */
    public function getActionLabelAttribute(): string
    {
        $labels = [
            'created' => 'สร้างคำขอ',
            'approved' => 'อนุมัติ',
            'rejected' => 'ปฏิเสธ',
            'revoked' => 'เพิกถอน',
            'modified' => 'แก้ไข',
            'expired' => 'หมดอายุ',
            'granted' => 'มอบสิทธิ์',
        ];

        return $labels[$this->action] ?? $this->action;
    }

    /**
     * Scope for specific form
     */
    public function scopeForForm($query, int $formId)
    {
        return $query->where('form_id', $formId);
    }

    /**
     * Scope for specific user
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope for specific action
     */
    public function scopeAction($query, string $action)
    {
        return $query->where('action', $action);
    }
}
