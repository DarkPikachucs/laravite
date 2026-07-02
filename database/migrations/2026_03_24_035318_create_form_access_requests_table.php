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
        Schema::create('form_access_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ผู้ขอสิทธิ์
            $table->foreignId('form_id')->constrained()->onDelete('cascade'); // แบบฟอร์มที่ขอสิทธิ์
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('reason')->nullable(); // เหตุผลที่ขอสิทธิ์
            $table->text('rejection_reason')->nullable(); // เหตุผลที่ปฏิเสธ (ถ้ามี)
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null'); // ผู้ตรวจสอบคำขอ
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'form_id']); // ป้องกันการขอซ้ำ
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_access_requests');
    }
};
