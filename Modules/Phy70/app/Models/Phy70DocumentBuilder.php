<?php

namespace Modules\Phy70\Models;

use Illuminate\Database\Eloquent\Model;

class Phy70DocumentBuilder extends Model
{
    protected $table = 'phy70_document_builders';

    protected $fillable = [
        'name',
        'input_schema',
        'output_schema',
    ];

    protected $casts = [
        'input_schema' => 'array',
        'output_schema' => 'array',
    ];
}
