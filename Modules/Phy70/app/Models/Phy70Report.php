<?php

namespace Modules\Phy70\Models;

use Illuminate\Database\Eloquent\Model;

class Phy70Report extends Model
{
    protected $table = 'phy70_reports';

    protected $fillable = [
        'name',
        'template_id',
        'data_source',
        'filters',
        'selected_ids',
        'output_format',
        'creator_id',
    ];

    protected $casts = [
        'selected_ids' => 'array',
        'filters' => 'array',
    ];

    public function template()
    {
        return $this->belongsTo(Phy70DocumentBuilder::class, 'template_id');
    }

    public function creator()
    {
        return $this->belongsTo(Phy70User::class, 'creator_id');
    }
}
