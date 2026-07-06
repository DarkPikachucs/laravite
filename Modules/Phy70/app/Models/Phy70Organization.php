<?php

namespace Modules\Phy70\Models;

use Illuminate\Database\Eloquent\Model;

class Phy70Organization extends Model
{
    
    protected $table = 'phy70_organizations';

    protected $fillable = [
        'name',
    ];

    public function users()
    {
        return $this->hasMany(Phy70User::class, 'organization_id');
    }

    public function proposals()
    {
        return $this->hasMany(Phy70Proposal::class, 'organization_id');
    }

    public function invitations()
    {
        return $this->hasMany(Phy70Invitation::class, 'organization_id');
    }
}
