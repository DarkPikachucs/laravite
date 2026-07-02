<?php

namespace App\CustomApps\Plan14\Models;

use Illuminate\Database\Eloquent\Model;

class Plan14Data extends Model
{
    protected $connection = 'sqlite_plan14';

    protected $table = 'plan14_data';

    protected $fillable = ['data'];

    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }
}
