<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'keycloak_id',
        'avatar',
        'user_type',
        'is_internal',
        'phone',
        'department',
        'position',
        'bio',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_internal' => 'boolean',
        ];
    }

    /**
     * Get the forms created by this user
     */
    public function forms()
    {
        return $this->hasMany(Form::class, 'created_by');
    }

    /**
     * Get access requests made by this user
     */
    public function accessRequests()
    {
        return $this->hasMany(FormAccessRequest::class, 'user_id');
    }

    /**
     * Get access requests reviewed by this user
     */
    public function reviewedAccessRequests()
    {
        return $this->hasMany(FormAccessRequest::class, 'reviewed_by');
    }

    /**
     * Get access grants received by this user
     */
    public function accessGrants()
    {
        return $this->hasMany(FormAccessGrant::class, 'user_id');
    }

    /**
     * Get access grants given by this user
     */
    public function givenAccessGrants()
    {
        return $this->hasMany(FormAccessGrant::class, 'granted_by');
    }

    /**
     * Check if user has access to form
     */
    public function hasFormAccess(int $formId): bool
    {
        // Form creator always has access
        if ($this->forms()->where('id', $formId)->exists()) {
            return true;
        }

        // Check for approved access request
        $hasApprovedRequest = FormAccessRequest::where('user_id', $this->id)
            ->where('form_id', $formId)
            ->where('status', 'approved')
            ->where(function ($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->exists();

        if ($hasApprovedRequest) {
            return true;
        }

        // Check for active access grant
        return FormAccessGrant::where('form_id', $formId)
            ->where('user_id', $this->id)
            ->active()
            ->exists();
    }

    /**
     * Check if user has specific permission level for form
     */
    public function hasFormPermission(int $formId, string $level): bool
    {
        // Form creator has all permissions
        if ($this->forms()->where('id', $formId)->exists()) {
            return true;
        }

        // Check access request with permission level
        $accessRequest = FormAccessRequest::where('user_id', $this->id)
            ->where('form_id', $formId)
            ->where('status', 'approved')
            ->where(function ($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->first();

        if ($accessRequest && $accessRequest->hasPermission($level)) {
            return true;
        }

        // Check access grant with permission level
        $grant = FormAccessGrant::where('form_id', $formId)
            ->where('user_id', $this->id)
            ->active()
            ->first();

        return $grant && $grant->hasPermission($level);
    }

    /**
     * Get user's permission level for form
     */
    public function getFormPermissionLevel(int $formId): ?string
    {
        // Form creator has full permissions
        if ($this->forms()->where('id', $formId)->exists()) {
            return 'manage';
        }

        // Check access request
        $accessRequest = FormAccessRequest::where('user_id', $this->id)
            ->where('form_id', $formId)
            ->where('status', 'approved')
            ->where(function ($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->first();

        if ($accessRequest) {
            return $accessRequest->permission_level;
        }

        // Check access grant
        $grant = FormAccessGrant::where('form_id', $formId)
            ->where('user_id', $this->id)
            ->active()
            ->first();

        return $grant?->permission_level;
    }

    /**
     * Request access to form
     */
    public function requestFormAccess(int $formId, ?string $reason = null): FormAccessRequest
    {
        return FormAccessRequest::requestAccess($this->id, $formId, $reason);
    }

    /**
     * Check if user is internal (has @pcru.ac.th email)
     */
    public function isInternal(): bool
    {
        return $this->is_internal || str_ends_with($this->email, '@pcru.ac.th');
    }

    /**
     * Check if user is external
     */
    public function isExternal(): bool
    {
        return !$this->isInternal();
    }

    /**
     * Scope to get internal users only
     */
    public function scopeInternal($query)
    {
        return $query->where('is_internal', true)
            ->orWhere('email', 'like', '%@pcru.ac.th');
    }

    /**
     * Scope to get external users only
     */
    public function scopeExternal($query)
    {
        return $query->where('is_internal', false)
            ->where('email', 'not like', '%@pcru.ac.th');
    }

    /**
     * Check if user can create forms
     */
    public function canCreateForms(): bool
    {
        return $this->isInternal();
    }

    /**
     * Check if user can view form submissions
     */
    public function canViewFormSubmissions(int $formId): bool
    {
        // Internal users can view their own forms
        if ($this->forms()->where('id', $formId)->exists()) {
            return true;
        }
        
        // Check for approved access request
        return FormAccessRequest::hasAccess($this->id, $formId);
    }
}