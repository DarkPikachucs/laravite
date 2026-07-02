<?php

namespace App\CustomApps\Plan14\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tab extends Model
{
    protected $connection = 'sqlite_plan14';

    protected $table = 'tabs';

    protected $fillable = ['uuid', 'name', 'plan_title', 'sort_order'];

    public function pillars(): HasMany
    {
        return $this->hasMany(Pillar::class, 'tab_id', 'id');
    }
}
