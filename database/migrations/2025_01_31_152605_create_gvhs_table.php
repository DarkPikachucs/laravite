<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gvhs', function (Blueprint $table) {
            $table->id();
            $table->string('year' );
            $table->string('pp_project_code' );
            $table->string('pp_activity_code' );
            $table->enum('gender', ['male', 'female', 'none']);
            $table->integer('age' );
            $table->integer('career' );
            $table->string('career_other')->nullable();
            $table->integer('education' );
            $table->integer('province' );
            $table->string('district');
            $table->string('subDistrict');
            $table->string('subDistrictCode');
            $table->string('TownshipName');
            $table->string('Townshipcode');
            $table->integer('section_1_1');
            $table->integer('section_1_2');
            $table->integer('section_1_3');
            $table->integer('section_1_4');
            $table->integer('section_1_5');
            $table->integer('section_2_1');
            $table->integer('section_2_2');
            $table->integer('section_2_3');
            $table->integer('section_2_4');
            $table->integer('section_2_5');
            $table->integer('section_3_1');
            $table->integer('section_3_2');
            $table->integer('section_3_3');
            $table->integer('section_3_4');
            $table->integer('section_3_5');
            $table->integer('section_4_1');
            $table->integer('section_4_2');
            $table->integer('section_4_3');
            $table->integer('section_4_4');
            $table->integer('section_4_5');
            $table->integer('section_5_1');
            $table->integer('section_5_2');
            $table->integer('section_5_3');
            $table->integer('section_5_4');
            $table->integer('section_5_5');
            $table->integer('section_6_1');
            $table->integer('section_6_2');
            $table->integer('section_6_3');
            $table->integer('section_6_4');
            $table->integer('section_6_5');
            $table->integer('total_gvh');
            //$table->timestamp('' );
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gvhs');
    }
};
