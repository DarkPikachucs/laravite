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
        Schema::create('phy70_document_builders', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('ชื่อฟอร์ม/เทมเพลต');
            $table->json('input_schema')->nullable()->comment('โครงสร้างข้อมูลตั้งต้น');
            $table->json('output_schema')->nullable()->comment('โครงสร้างข้อมูล output');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phy70_document_builders');
    }
};
