<?php

namespace App\CustomApps\Plan14\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pillar extends Model
{
    protected $connection = 'sqlite_plan14';

    protected $table = 'pillars';

    protected $fillable = ['uuid', 'tab_id', 'title', 'sort_order'];

    public function tab(): BelongsTo
    {
        return $this->belongsTo(Tab::class);
    }

    public function boxes(): HasMany
    {
        return $this->hasMany(Box::class, 'pillar_id', 'id');
    }
}
