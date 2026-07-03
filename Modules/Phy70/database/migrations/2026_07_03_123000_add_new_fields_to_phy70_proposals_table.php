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
        Schema::table('phy70_proposals', function (Blueprint $table) {
            $table->text('principles')->nullable()->after('project_name');
            $table->text('objectives')->nullable()->after('principles');
            $table->json('kpis')->nullable()->after('objectives');
            $table->text('target_group')->nullable()->after('target_subdistrict');
            $table->text('output')->nullable();
            $table->text('outcome')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('phy70_proposals', function (Blueprint $table) {
            $table->dropColumn([
                'principles',
                'objectives',
                'kpis',
                'target_group',
                'output',
                'outcome'
            ]);
        });
    }
};
