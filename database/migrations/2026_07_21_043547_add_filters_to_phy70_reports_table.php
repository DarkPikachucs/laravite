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
        Schema::table('phy70_reports', function (Blueprint $table) {
            $table->json('filters')->nullable()->after('data_source');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('phy70_reports', function (Blueprint $table) {
            $table->dropColumn('filters');
        });
    }
};
