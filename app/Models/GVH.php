<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GVH extends Model
{
    protected $table = 'gvhs';

    protected $fillable = [
        'year', 'pp_project_code', 'pp_activity_code','phrase', 'gender', 'age', 'career', 'career_other',
        'education', 'zipcode', 'province', 'amphoe', 'district',  'townshipName',
        'section_1_1', 'section_1_2', 'section_1_3', 'section_1_4', 'section_1_5',
        'section_2_1', 'section_2_2', 'section_2_3', 'section_2_4', 'section_2_5',
        'section_3_1', 'section_3_2', 'section_3_3', 'section_3_4', 'section_3_5',
        'section_4_1', 'section_4_2', 'section_4_3', 'section_4_4', 'section_4_5',
        'section_5_1', 'section_5_2', 'section_5_3', 'section_5_4', 'section_5_5',
        'section_6_1', 'section_6_2', 'section_6_3', 'section_6_4', 'section_6_5',
        'total_gvh'
    ];
}