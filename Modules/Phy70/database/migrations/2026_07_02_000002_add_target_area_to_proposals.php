<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'sqlite_phy70';

    public function up(): void
    {
        Schema::table('phy70_proposals', function (Blueprint $table) {
            $table->string('target_province')->nullable();
            $table->string('target_district')->nullable();
            $table->string('target_subdistrict')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('phy70_proposals', function (Blueprint $table) {
            $table->dropColumn(['target_province', 'target_district', 'target_subdistrict']);
        });
    }
};
