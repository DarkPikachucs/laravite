<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'sqlite_phy70';

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::connection('sqlite_phy70')->hasColumn('phy70_proposals', 'documents')) {
            return;
        }

        Schema::table('phy70_proposals', function (Blueprint $table) {
            $table->json('documents')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('phy70_proposals', function (Blueprint $table) {
            $table->dropColumn('documents');
        });
    }
};
