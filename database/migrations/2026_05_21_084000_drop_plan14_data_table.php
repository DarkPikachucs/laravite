<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'sqlite_plan14';

    public function up(): void
    {
        Schema::dropIfExists('plan14_data');
    }

    public function down(): void
    {
        Schema::create('plan14_data', function ($table) {
            $table->id();
            $table->json('data');
            $table->timestamps();
        });
    }
};
