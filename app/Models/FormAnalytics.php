<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormAnalytics extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_id',
        'event_type',
        'metadata',
        'ip_address',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    /**
     * Get the form that owns the analytics record
     */
    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    /**
     * Scope a query to only include specific event type.
     */
    public function scopeEventType($query, string $eventType)
    {
        return $query->where('event_type', $eventType);
    }

    /**
     * Scope a query to only include today's records.
     */
    public function scopeToday($query)
    {
        return $query->whereDate('created_at', today());
    }

    /**
     * Record a view event
     */
    public static function recordView(Form $form, array $metadata = [])
    {
        return $form->recordEvent('view', $metadata);
    }

    /**
     * Record a submission event
     */
    public static function recordSubmission(Form $form, array $metadata = [])
    {
        return $form->recordEvent('submit', $metadata);
    }

    /**
     * Record a form start event
     */
    public static function recordStart(Form $form, array $metadata = [])
    {
        return $form->recordEvent('start', $metadata);
    }

    /**
     * Record an abandon event
     */
    public static function recordAbandon(Form $form, array $metadata = [])
    {
        return $form->recordEvent('abandon', $metadata);
    }
}
