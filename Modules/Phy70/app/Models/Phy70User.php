<?php

namespace Modules\Phy70\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Phy70User extends Authenticatable
{
    use HasFactory, Notifiable;

    
    protected $table = 'phy70_users';

    protected $fillable = [
        'organization_id',
        'name',
        'email',
        'password',
        'google_id',
        'avatar',
        'role',
        'phone_number',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function organization()
    {
        return $this->belongsTo(Phy70Organization::class, 'organization_id');
    }

    public function proposals()
    {
        return $this->hasMany(Phy70Proposal::class, 'user_id');
    }
}
