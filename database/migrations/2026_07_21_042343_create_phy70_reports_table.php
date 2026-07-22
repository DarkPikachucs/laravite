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
        Schema::create('phy70_reports', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('template_id')->nullable();
            $table->string('data_source')->default('proposals');
            $table->json('selected_ids')->nullable();
            $table->string('output_format')->default('pdf');
            $table->unsignedBigInteger('creator_id')->nullable();
            $table->timestamps();
            
            $table->foreign('template_id')->references('id')->on('phy70_document_builders')->onDelete('set null');
            $table->foreign('creator_id')->references('id')->on('phy70_users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phy70_reports');
    }
};
