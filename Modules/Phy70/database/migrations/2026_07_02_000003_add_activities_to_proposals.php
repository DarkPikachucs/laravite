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
            if (! Schema::hasColumn('phy70_proposals', 'activities')) {
                $table->text('activities')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('phy70_proposals', function (Blueprint $table) {
            $table->dropColumn('activities');
        });
    }
};
