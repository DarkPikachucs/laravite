<?php

namespace Modules\Phy70\Models;

use Illuminate\Database\Eloquent\Model;

class Phy70Invitation extends Model
{
    protected $connection = 'sqlite_phy70';
    protected $table = 'phy70_invitations';

    protected $fillable = [
        'organization_id',
        'email',
        'token',
        'used',
    ];

    public function organization()
    {
        return $this->belongsTo(Phy70Organization::class, 'organization_id');
    }
}
