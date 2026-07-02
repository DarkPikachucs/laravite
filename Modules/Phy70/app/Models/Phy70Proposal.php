<?php

namespace Modules\Phy70\Models;

use Illuminate\Database\Eloquent\Model;

class Phy70Proposal extends Model
{
    protected $connection = 'sqlite_phy70';
    protected $table = 'phy70_proposals';

    protected $fillable = [
        'organization_id',
        'user_id',
        'national_strategy',
        'master_plan',
        'national_plan',
        'regional_development',
        'province_issue',
        'development_guideline',
        'main_plan',
        'plan',
        'project_name',
        'main_activity',
        'operating_agency',
        'responsible_person',
        'position',
        'contact_address',
        'phone_number',
        'attachments',
    ];

    protected $casts = [
        'attachments' => 'array',
    ];

    public function organization()
    {
        return $this->belongsTo(Phy70Organization::class, 'organization_id');
    }

    public function user()
    {
        return $this->belongsTo(Phy70User::class, 'user_id');
    }
}
