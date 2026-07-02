<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class Form extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'slug',
        'title',
        'tagline',
        'description',
        'form_type',
        'template',
        'schema',
        'script_content',
        'settings',
        'is_active',
        'published_at',
        'expires_at',
        'created_by',
    ];

    protected $appends = [
        'submission_count',
        'view_count',
        'collaborators',
    ];

    protected $casts = [
        'schema' => 'array',
        'script_content' => 'string',
        'settings' => 'array',
        'is_active' => 'boolean',
        'published_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
            if (empty($model->slug)) {
                $model->slug = $model->generateUniqueSlug($model->title);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('title') && !$model->isDirty('slug')) {
                $model->slug = $model->generateUniqueSlug($model->title, $model->id);
            }
        });
    }

    /**
     * Generate a unique slug from a title.
     */
    public function generateUniqueSlug(string $title, ?int $excludeId = null): string
    {
        $slug = Str::slug($title, '-', null);
        if (empty($slug)) {
            $slug = 'form-' . Str::random(8);
        }

        $baseSlug = $slug;
        $counter = 1;
        while ($this->slugExists($slug, $excludeId)) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Check if a slug already exists.
     */
    protected function slugExists(string $slug, ?int $excludeId = null): bool
    {
        $query = static::where('slug', $slug);
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }
        return $query->exists();
    }

    /**
     * Get form by slug
     */
    public static function findBySlug(string $slug): ?self
    {
        return Cache::remember("form.slug.{$slug}", 3600, function () use ($slug) {
            return static::where('slug', $slug)->first();
        });
    }

    /**
     * Get form by UUID
     */
    public static function findByUuid(string $uuid): ?self
    {
        return Cache::remember("form.uuid.{$uuid}", 3600, function () use ($uuid) {
            return static::where('uuid', $uuid)->first();
        });
    }

    /**
     * Check if form is currently accepting submissions
     */
    public function isAcceptingSubmissions(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        if ($this->published_at && $this->published_at->isFuture()) {
            return false;
        }

        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        return true;
    }

    /**
     * Get form status
     */
    public function getStatusAttribute(): string
    {
        if (!$this->is_active) {
            return 'inactive';
        }

        if ($this->published_at && $this->published_at->isFuture()) {
            return 'scheduled';
        }

        if ($this->expires_at && $this->expires_at->isPast()) {
            return 'expired';
        }

        return 'active';
    }

    /**
     * Get submissions relationship
     */
    public function submissions()
    {
        return $this->hasMany(FormSubmission::class);
    }

    /**
     * Get analytics relationship
     */
    public function analytics()
    {
        return $this->hasMany(FormAnalytics::class);
    }

    /**
     * Get access grants relationship
     */
    public function accessGrants()
    {
        return $this->hasMany(FormAccessGrant::class, 'form_id');
    }

    /**
     * Get collaborators (users with manage access to this form)
     */
    public function getCollaboratorsAttribute()
    {
        return $this->accessGrants()
            ->where('permission_level', 'manage')
            ->where(function ($q) {
                $q->whereNull('expires_at')->orWhere('expires_at', '>', now());
            })
            ->with('user:id,name,email')
            ->get()
            ->map(function ($grant) {
                return [
                    'id' => $grant->user->id,
                    'name' => $grant->user->name,
                    'email' => $grant->user->email,
                    'permission_level' => $grant->permission_level ?? 'manage',
                ];
            });
    }

    /**
     * Get creator relationship
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get form fields from schema
     */
    public function getFieldsAttribute(): array
    {
        return $this->schema['fields'] ?? [];
    }

    /**
     * Get form settings with defaults
     */
    public function getSettingsWithDefaultsAttribute(): array
    {
        return array_merge([
            'show_progress_bar' => true,
            'require_login' => false,
            'allow_multiple_submissions' => true,
            'show_confirmation' => true,
            'confirmation_message' => 'ขอบคุณที่ส่งแบบฟอร์ม',
            'redirect_url' => null,
            'collect_email' => false,
            'collect_phone' => false,
            'collect_name' => false,
            'theme_color' => '#3B82F6',
        ], $this->settings ?? []);
    }

    /**
     * Record analytics event
     */
    public function recordEvent(string $eventType, array $metadata = [], ?string $ipAddress = null)
    {
        $this->analytics()->create([
            'event_type' => $eventType,
            'metadata' => $metadata,
            'ip_address' => $ipAddress ?? request()->ip(),
        ]);
    }

    /**
     * Get submission count
     */
    public function getSubmissionCountAttribute(): int
    {
        return Cache::remember("form.{$this->id}.submission_count", 300, function () {
            return $this->submissions()->count();
        });
    }

    /**
     * Get view count
     */
    public function getViewCountAttribute(): int
    {
        return Cache::remember("form.{$this->id}.view_count", 300, function () {
            return $this->analytics()
                ->where('event_type', 'view')
                ->count();
        });
    }

    /**
     * Clear form cache
     */
    public function clearCache(): void
    {
        Cache::forget("form.uuid.{$this->uuid}");
        Cache::forget("form.slug.{$this->slug}");
        Cache::forget("form.{$this->id}.submission_count");
        Cache::forget("form.{$this->id}.view_count");
    }

    /**
     * Scope a query to only include active forms.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include published forms.
     */
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * Scope a query to only include non-expired forms.
     */
    public function scopeNotExpired($query)
    {
        return $query->whereNull('expires_at')
            ->orWhere('expires_at', '>', now());
    }
}