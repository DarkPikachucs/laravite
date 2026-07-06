<?php

namespace Modules\Phy70\Models;

use Illuminate\Database\Eloquent\Model;

class Phy70Proposal extends Model
{
    
    protected $table = 'phy70_proposals';

    protected $fillable = [
        'organization_id',
        'user_id',
        'province_issue',
        'development_guideline',
        'main_plan',
        'plan',
        'target_province',
        'target_district',
        'target_subdistrict',
        'target_group',
        'project_name',
        'principles',
        'objectives',
        'kpis',
        'output',
        'outcome',
        'main_activity',
        'operating_agency',
        'operating_year',
        'responsible_person',
        'position',
        'contact_address',
        'phone_number',
        'attachments',
        'documents',
        'activities',
        'status',
        'project_code',
        'yearly_budgets',
    ];

    protected $casts = [
        'attachments' => 'array',
        'documents' => 'array',
        'activities' => 'array',
        'kpis' => 'array',
        'target_district' => 'array',
        'target_subdistrict' => 'array',
        'yearly_budgets' => 'array',
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
