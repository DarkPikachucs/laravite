<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'sqlite_plan14';

    public function up(): void
    {
        Schema::dropIfExists('plan14_heartbeats');
    }

    public function down(): void
    {
        Schema::create('plan14_heartbeats', function (Blueprint $table) {
            $table->id();
            $table->string('session_key')->unique();
            $table->string('ip', 45)->nullable();
            $table->timestamp('last_active')->useCurrent();
            $table->timestamps();
        });
    }
};
