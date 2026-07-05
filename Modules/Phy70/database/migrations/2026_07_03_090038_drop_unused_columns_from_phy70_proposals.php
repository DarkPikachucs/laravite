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
        Schema::connection('sqlite_phy70')->table('phy70_proposals', function (Blueprint $table) {
            foreach (['national_strategy', 'master_plan', 'national_plan', 'regional_development'] as $column) {
                if (Schema::connection('sqlite_phy70')->hasColumn('phy70_proposals', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('sqlite_phy70')->table('phy70_proposals', function (Blueprint $table) {
            $table->string('national_strategy')->nullable();
            $table->string('master_plan')->nullable();
            $table->string('national_plan')->nullable();
            $table->string('regional_development')->nullable();
        });
    }
};
