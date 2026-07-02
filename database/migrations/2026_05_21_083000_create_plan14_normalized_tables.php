<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'sqlite_plan14';

    public function up(): void
    {
        Schema::create('tabs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid', 32)->unique();
            $table->string('name');
            $table->string('plan_title')->default('');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('pillars', function (Blueprint $table) {
            $table->id();
            $table->string('uuid', 32)->unique();
            $table->foreignId('tab_id')->constrained('tabs')->cascadeOnDelete();
            $table->string('title');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('boxes', function (Blueprint $table) {
            $table->id();
            $table->string('uuid', 32)->unique();
            $table->foreignId('pillar_id')->constrained('pillars')->cascadeOnDelete();
            $table->string('title');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('uuid', 32)->unique();
            $table->foreignId('box_id')->constrained('boxes')->cascadeOnDelete();
            $table->string('content');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->text('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('items');
        Schema::dropIfExists('boxes');
        Schema::dropIfExists('pillars');
        Schema::dropIfExists('tabs');
    }
};
