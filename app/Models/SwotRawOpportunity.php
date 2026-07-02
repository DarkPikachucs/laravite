<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SwotRawOpportunity extends Model
{
  protected $connection = 'mysql2';
  protected $table = 'raw_opportunities';
}