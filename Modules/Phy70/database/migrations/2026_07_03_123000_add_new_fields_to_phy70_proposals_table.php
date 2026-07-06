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
            $has = fn ($column) => Schema::connection('sqlite_phy70')->hasColumn('phy70_proposals', $column);

            if (! $has('principles'))   $table->text('principles')->nullable()->after('project_name');
            if (! $has('objectives'))   $table->text('objectives')->nullable()->after('principles');
            if (! $has('kpis'))         $table->json('kpis')->nullable()->after('objectives');
            if (! $has('target_group')) $table->text('target_group')->nullable()->after('target_subdistrict');
            if (! $has('output'))       $table->text('output')->nullable();
            if (! $has('outcome'))      $table->text('outcome')->nullable();
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
