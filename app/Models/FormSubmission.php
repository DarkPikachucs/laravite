<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_id',
        'responses',
        'respondent_name',
        'respondent_email',
        'respondent_phone',
        'ip_address',
        'user_agent',
        'is_read',
        'admin_notes',
    ];

    protected $casts = [
        'responses' => 'array',
        'is_read' => 'boolean',
    ];

    /**
     * Get the form that owns the submission
     */
    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    /**
     * Get specific response value
     */
    public function getResponse(string $fieldId)
    {
        return $this->responses[$fieldId] ?? null;
    }

    /**
     * Mark submission as read
     */
    public function markAsRead(): bool
    {
        $this->update(['is_read' => true]);
        return true;
    }

    /**
     * Add admin note
     */
    public function addNote(string $note): bool
    {
        $currentNotes = $this->admin_notes ?? '';
        $timestamp = now()->format('Y-m-d H:i:s');
        $newNote = "[{$timestamp}] {$note}\n";
        
        $this->update(['admin_notes' => $currentNotes . $newNote]);
        return true;
    }

    /**
     * Scope a query to only include unread submissions.
     */
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Scope a query to only include read submissions.
     */
    public function scopeRead($query)
    {
        return $query->where('is_read', true);
    }

    /**
     * Get submission data for export
     */
    public function getExportDataAttribute(): array
    {
        $data = [
            'id' => $this->id,
            'submitted_at' => $this->created_at->format('Y-m-d H:i:s'),
            'respondent_name' => $this->respondent_name,
            'respondent_email' => $this->respondent_email,
            'respondent_phone' => $this->respondent_phone,
        ];

        // Flatten responses
        foreach ($this->responses as $key => $value) {
            $data["response_{$key}"] = is_array($value) ? implode(', ', $value) : $value;
        }

        return $data;
    }
}
