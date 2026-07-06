<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    

    public function up(): void
    {
        Schema::table('phy70_proposals', function (Blueprint $table) {
            if (! Schema::hasColumn('phy70_proposals', 'target_province')) {
                $table->string('target_province')->nullable();
            }
            if (! Schema::hasColumn('phy70_proposals', 'target_district')) {
                $table->string('target_district')->nullable();
            }
            if (! Schema::hasColumn('phy70_proposals', 'target_subdistrict')) {
                $table->string('target_subdistrict')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('phy70_proposals', function (Blueprint $table) {
            $table->dropColumn(['target_province', 'target_district', 'target_subdistrict']);
        });
    }
};
