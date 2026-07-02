<?php

namespace App\CustomApps\Plan14\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Box extends Model
{
    protected $connection = 'sqlite_plan14';

    protected $table = 'boxes';

    protected $fillable = ['uuid', 'pillar_id', 'title', 'sort_order'];

    public function pillar(): BelongsTo
    {
        return $this->belongsTo(Pillar::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class, 'box_id', 'id');
    }
}
