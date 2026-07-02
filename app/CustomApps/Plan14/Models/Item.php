<?php

namespace App\CustomApps\Plan14\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    protected $connection = 'sqlite_plan14';

    protected $table = 'items';

    protected $fillable = ['uuid', 'box_id', 'content', 'sort_order'];

    public function box(): BelongsTo
    {
        return $this->belongsTo(Box::class);
    }
}
