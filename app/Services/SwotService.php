<?php

namespace App\Services;

use App\Models\Swot; 
class SwotService
{
  public $swot;
  public function __construct($id = null)
  {
      if ($id) {
          $this->swot = Swot::with([
            'user_progress',
            'raw_strength',
            'raw_weakness',
            'raw_opportunity',
            'raw_threat'])->find($id);
      } else {
          $this->swot = new Swot();
      }
  }
    public function getAllSwots()
    {
        return Swot::all();
    }
} 