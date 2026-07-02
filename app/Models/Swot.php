<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Swot extends Model
{
  protected $connection = 'mysql2';
  protected $table = 'swot';

  protected $fillable = [
    'title',
    'tagline',
    'description',
    'status',
    'created_at',
    'updated_at'
  ];

  function user_progress()
  {
    return $this->hasMany(SwotUserProgress::class, 'swot_id', 'id');
  }
  function raw_strength()
  {
    return $this->hasMany(SwotRawStrength::class, 'swot_id', 'id');
  }
  function raw_weakness()
  {
    return $this->hasMany(SwotRawWeakness::class, 'swot_id', 'id');
  }
  function raw_opportunity()
  {
    return $this->hasMany(SwotRawOpportunity::class, 'swot_id', 'id');
  }
  function raw_threat()
  {
    return $this->hasMany(SwotRawThreat::class, 'swot_id', 'id');
  }
}